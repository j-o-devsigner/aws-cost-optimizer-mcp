/**
 * Convierte un objeto a respuesta MCP formateada
 */
export function formatMCPResponse(data: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * Crea respuesta de error MCP
 */
export function formatMCPError(error: Error | string) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return {
    content: [
      {
        type: 'text' as const,
        text: `❌ Error: ${errorMessage}`,
      },
    ],
    isError: true,
  };
}

/**
 * Formatea porcentaje con 2 decimales
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
