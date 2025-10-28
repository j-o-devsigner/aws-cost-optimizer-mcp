export declare function formatMCPResponse(data: unknown): {
    content: {
        type: "text";
        text: string;
    }[];
};
export declare function formatMCPError(error: Error | string): {
    content: {
        type: "text";
        text: string;
    }[];
    isError: boolean;
};
export declare function formatPercentage(value: number): string;
//# sourceMappingURL=formatters.d.ts.map