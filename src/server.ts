import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { listEC2Instances, getInstanceCPUUsage } from './tools/index.js';

/**
 * Crea y configura el servidor MCP
 */
export function createServer() {
  const server = new Server(
    {
      name: 'aws-cost-optimizer',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  /**
   * Handler: Lista de herramientas disponibles
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'list_ec2_instances',
          description:
            'Lista todas las instancias EC2 en la región configurada, incluyendo ID, tipo, estado, IPs y tags. Útil para inventario y auditoría.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_instance_cpu_usage',
          description:
            'Analiza el uso de CPU de una instancia EC2 específica en las últimas 24 horas. Identifica instancias sub-utilizadas o sobre-utilizadas y proporciona recomendaciones de right-sizing.',
          inputSchema: {
            type: 'object',
            properties: {
              instance_id: {
                type: 'string',
                description: 'ID de la instancia EC2 (ejemplo: i-0abc123def456789)',
              },
            },
            required: ['instance_id'],
          },
        },
      ],
    };
  });

  /**
   * Handler: Ejecución de herramientas
   */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'list_ec2_instances':
        return await listEC2Instances();

      case 'get_instance_cpu_usage':
        if (!args?.instance_id) {
          throw new Error('instance_id es requerido');
        }
        return await getInstanceCPUUsage(args.instance_id as string);

      default:
        throw new Error(`Herramienta desconocida: ${name}`);
    }
  });

  return server;
}

/**
 * Inicia el servidor MCP con transporte STDIO
 */
export async function runServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  
  await server.connect(transport);
  
  console.error('✅ AWS Cost Optimizer MCP Server running');
}
