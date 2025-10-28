import { DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import { GetMetricStatisticsCommand } from '@aws-sdk/client-cloudwatch';
import { ec2Client, cloudWatchClient } from '../utils/awsClient.js';
import { formatMCPResponse, formatMCPError, formatPercentage } from '../utils/formatters.js';
export async function listEC2Instances() {
    try {
        const command = new DescribeInstancesCommand({});
        const response = await ec2Client.send(command);
        const instances = [];
        for (const reservation of response.Reservations || []) {
            for (const instance of reservation.Instances || []) {
                const tags = {};
                if (instance.Tags) {
                    for (const tag of instance.Tags) {
                        if (tag.Key && tag.Value) {
                            tags[tag.Key] = tag.Value;
                        }
                    }
                }
                instances.push({
                    id: instance.InstanceId || 'unknown',
                    type: instance.InstanceType || 'unknown',
                    state: instance.State?.Name || 'unknown',
                    launch_time: instance.LaunchTime || new Date(),
                    private_ip: instance.PrivateIpAddress || 'N/A',
                    public_ip: instance.PublicIpAddress || 'N/A',
                    name: tags['Name'] || 'Sin nombre',
                    tags,
                });
            }
        }
        const result = {
            total_instances: instances.length,
            running: instances.filter((i) => i.state === 'running').length,
            stopped: instances.filter((i) => i.state === 'stopped').length,
            instances,
        };
        return formatMCPResponse(result);
    }
    catch (error) {
        return formatMCPError(error);
    }
}
export async function getInstanceCPUUsage(instanceId) {
    try {
        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
        const command = new GetMetricStatisticsCommand({
            Namespace: 'AWS/EC2',
            MetricName: 'CPUUtilization',
            Dimensions: [
                {
                    Name: 'InstanceId',
                    Value: instanceId,
                },
            ],
            StartTime: startTime,
            EndTime: endTime,
            Period: 3600,
            Statistics: ['Average', 'Maximum'],
        });
        const response = await cloudWatchClient.send(command);
        if (!response.Datapoints || response.Datapoints.length === 0) {
            return formatMCPResponse({
                message: `No hay datos de CPU para ${instanceId}. La instancia puede estar apagada o es muy reciente.`,
            });
        }
        const datapoints = response.Datapoints.sort((a, b) => (a.Timestamp?.getTime() || 0) - (b.Timestamp?.getTime() || 0));
        const avgCPU = datapoints.reduce((sum, dp) => sum + (dp.Average || 0), 0) / datapoints.length;
        const maxCPU = Math.max(...datapoints.map((dp) => dp.Maximum || 0));
        let recommendation;
        if (avgCPU < 20) {
            recommendation = '⚠️ Instancia SUB-UTILIZADA. Considera reducir el tamaño para ahorrar costos.';
        }
        else if (avgCPU > 80) {
            recommendation = '🔥 Instancia SOBRE-UTILIZADA. Considera aumentar el tamaño.';
        }
        else {
            recommendation = '✅ Utilización NORMAL.';
        }
        const result = {
            instance_id: instanceId,
            period_analyzed: '24 horas',
            datapoints_count: datapoints.length,
            average_cpu: formatPercentage(avgCPU),
            max_cpu: formatPercentage(maxCPU),
            recommendation,
            recent_datapoints: datapoints.slice(-5).map((dp) => ({
                timestamp: dp.Timestamp || new Date(),
                average: formatPercentage(dp.Average || 0),
                maximum: formatPercentage(dp.Maximum || 0),
            })),
        };
        return formatMCPResponse(result);
    }
    catch (error) {
        return formatMCPError(error);
    }
}
//# sourceMappingURL=ec2.js.map