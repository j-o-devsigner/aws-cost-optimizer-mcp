export declare function listEC2Instances(): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
export declare function getInstanceCPUUsage(instanceId: string): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
//# sourceMappingURL=ec2.d.ts.map