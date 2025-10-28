export function formatMCPResponse(data) {
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(data, null, 2),
            },
        ],
    };
}
export function formatMCPError(error) {
    const errorMessage = typeof error === 'string' ? error : error.message;
    return {
        content: [
            {
                type: 'text',
                text: `❌ Error: ${errorMessage}`,
            },
        ],
        isError: true,
    };
}
export function formatPercentage(value) {
    return `${value.toFixed(2)}%`;
}
//# sourceMappingURL=formatters.js.map