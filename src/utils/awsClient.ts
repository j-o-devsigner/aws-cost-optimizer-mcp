import { EC2Client } from '@aws-sdk/client-ec2';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
import { CostExplorerClient } from '@aws-sdk/client-cost-explorer';
import { ComputeOptimizerClient } from '@aws-sdk/client-compute-optimizer';
import { RDSClient } from '@aws-sdk/client-rds';

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

/**
 * Cliente EC2 configurado
 */
export const ec2Client = new EC2Client({ region: AWS_REGION });

/**
 * Cliente CloudWatch configurado
 */
export const cloudWatchClient = new CloudWatchClient({ region: AWS_REGION });

/**
 * Cliente Cost Explorer configurado
 */
export const costExplorerClient = new CostExplorerClient({ region: AWS_REGION });

/**
 * Cliente Compute Optimizer configurado
 */
export const computeOptimizerClient = new ComputeOptimizerClient({ region: AWS_REGION });

/**
 * Cliente RDS configurado
 */
export const rdsClient = new RDSClient({ region: AWS_REGION });
