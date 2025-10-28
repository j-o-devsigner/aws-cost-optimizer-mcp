# AWS Cost Optimizer MCP

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-green.svg)](https://nodejs.org/)

Servidor MCP (Model Context Protocol) para optimización de costos en AWS. Analiza tu infraestructura AWS y proporciona recomendaciones accionables para reducir gastos mediante conversación natural con Claude Desktop.

## Características

- **Análisis de instancias EC2**: Detecta instancias sub-utilizadas (<20% CPU)
- **Métricas de CPU**: Analiza últimas 24 horas con CloudWatch
- **Recomendaciones automáticas**: Right-sizing basado en utilización real
- **Integración nativa**: Funciona en Claude Desktop, Cursor, VS Code
- **Seguro**: Credenciales permanecen locales, sin envío a servidores externos

## Requisitos

- Node.js >= 18.0.0
- Cuenta AWS con credenciales configuradas
- Claude Desktop (o cualquier cliente MCP compatible)
- AWS CLI configurado con un profile

## 🔧 Instalación

### 1. Instalar desde npm (próximamente)

```
npm install -g aws-cost-optimizer-mcp
```

### 2. Configurar AWS

#### Si no tienes AWS CLI configurado

```
aws configure --profile mcp
```

#### Configurar región

```
export AWS_REGION=us-east-1
```

### 3. Configurar Claude Desktop

Edita `claude_desktop_config.json`:

**Mac/Linux**: `~/.config/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "aws-cost-optimizer": {
      "command": "node",
      "env": {
        "AWS_PROFILE": "mcp",
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```


### 4. Reiniciar Claude Desktop

Cierra y abre Claude Desktop. Las herramientas estarán disponibles automáticamente.

## Uso

### En Claude Desktop

Pregunta en lenguaje natural:

`"Lista mis instancias EC2"`

`"¿Cuáles instancias están desperdiciando recursos?"`

`"Analiza el CPU de la instancia i-0abc123"`

`"¿Tengo instancias sub-utilizadas?"`


Claude llamará automáticamente a las herramientas necesarias y presentará los resultados de forma legible.

### Herramientas disponibles

#### `list_ec2_instances`
Lista todas las instancias EC2 con estado, tipo, IPs y tags.

**Uso**: "Lista mis instancias EC2"

#### `get_instance_cpu_usage`
Analiza uso de CPU de una instancia en las últimas 24 horas.

**Parámetros**:
- `instance_id` (requerido): ID de la instancia (ej: i-0abc123)

**Uso**: "Analiza CPU de i-0abc123"

## Desarrollo

### Clonar repositorio

```bash
git clone https://github.com/j-o-devsigner/aws-cost-optimizer-mcp.git

cd aws-cost-optimizer-mcp
```

### Instalar dependencias

```
npm install
```

### Desarrollo con hot-reload

```
npm run dev
```

### Build para producción

```
npm run build
```

## Permisos IAM Requeridos

### Permisos Mínimos (MVP Actual)

Para usar las herramientas actuales (`list_ec2_instances`, `get_instance_cpu_usage`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EC2ReadOnly",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceTypes"
      ],
      "Resource": ""
    },
    {
      "Sid": "CloudWatchReadOnly",
      "Effect": "Allow",
      "Action": [
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:ListMetrics"
      ],
      "Resource": ""
    }
  ]
}
```


## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Completado)
- [x] Análisis básico EC2
- [x] Métricas CloudWatch
- [x] Arquitectura TypeScript

### 🚧 Fase 2 - Más herramientas (En progreso)
- [ ] Análisis de volúmenes EBS
- [ ] Análisis de instancias RDS
- [ ] Integración Cost Explorer
- [ ] Detección de recursos huérfanos

### 📅 Fase 3 - Features avanzadas
- [ ] Sistema de licencias
- [ ] Multi-región automático
- [ ] Reportes exportables
- [ ] Alertas configurables

## Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## Soporte

- Email: john.devsigner@gmail.com
- Issues: [GitHub Issues](https://github.com/j-o-devsigner/aws-cost-optimizer-mcp/issues)

## Créditos

Construido con:
- [Model Context Protocol](https://modelcontextprotocol.io/) por Anthropic
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [TypeScript](https://www.typescriptlang.org/)

---

**¿Encuentras útil este proyecto? Dale una ⭐ en GitHub!**
