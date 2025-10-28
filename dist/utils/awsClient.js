import { EC2Client } from '@aws-sdk/client-ec2';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
import { CostExplorerClient } from '@aws-sdk/client-cost-explorer';
import { ComputeOptimizerClient } from '@aws-sdk/client-compute-optimizer';
import { RDSClient } from '@aws-sdk/client-rds';
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
export const ec2Client = new EC2Client({ region: AWS_REGION });
export const cloudWatchClient = new CloudWatchClient({ region: AWS_REGION });
export const costExplorerClient = new CostExplorerClient({ region: AWS_REGION });
export const computeOptimizerClient = new ComputeOptimizerClient({ region: AWS_REGION });
export const rdsClient = new RDSClient({ region: AWS_REGION });
//# sourceMappingURL=awsClient.js.map