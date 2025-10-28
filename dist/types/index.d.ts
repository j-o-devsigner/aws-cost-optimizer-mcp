export interface EC2Instance {
    id: string;
    type: string;
    state: string;
    launch_time: Date;
    private_ip: string;
    public_ip: string;
    name: string;
    tags: Record<string, string>;
}
export interface EC2AnalysisResult {
    total_instances: number;
    running: number;
    stopped: number;
    instances: EC2Instance[];
}
export interface CPUMetrics {
    instance_id: string;
    period_analyzed: string;
    datapoints_count: number;
    average_cpu: string;
    max_cpu: string;
    recommendation: string;
    recent_datapoints: Array<{
        timestamp: Date;
        average: string;
        maximum: string;
    }>;
}
//# sourceMappingURL=index.d.ts.map