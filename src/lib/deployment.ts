import axios from 'axios'

export interface DeploymentConfig {
  apiId: string
  code: string
  name: string
  description: string
}

export interface DeploymentResult {
  success: boolean
  url?: string
  deploymentId?: string
  error?: string
}

class DeploymentService {
  private vercelToken: string

  constructor() {
    this.vercelToken = process.env.VERCEL_TOKEN!
    if (!this.vercelToken) {
      throw new Error('VERCEL_TOKEN environment variable is required')
    }
  }

  async deployToVercel(config: DeploymentConfig): Promise<DeploymentResult> {
    try {
      console.log(`🚀 Starting deployment for API: ${config.name}`)

      const projectFiles = this.createSimpleAPI(config)
      const deployment = await this.createVercelDeployment(
        config.name,
        projectFiles
      )

      const deployUrl = `https://${deployment.url}`
      console.log(`✅ Deployment successful: ${deployUrl}`)

      return {
        success: true,
        url: deployUrl,
        deploymentId: deployment.uid,
      }
    } catch (error) {
      console.error('❌ Deployment failed:', error)

      let errorMessage = 'Unknown deployment error'
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data
        console.error('Vercel API Response:', responseData)

        if (responseData?.error) {
          errorMessage = `Vercel API Error: ${
            responseData.error.message || responseData.error
          }`
        } else {
          errorMessage = `HTTP ${error.response?.status}: ${error.message}`
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  private createSimpleAPI(
    config: DeploymentConfig
  ): Array<{ file: string; data: string }> {
    const apiType = this.detectAPIType(config.code, config.description)

    return [
      {
        file: 'package.json',
        data: JSON.stringify(
          {
            name:
              config.name.toLowerCase().replace(/[^a-z0-9-]/g, '-') ||
              'simple-api',
            version: '1.0.0',
            description: config.description,
            main: 'api/index.js',
            dependencies: {},
            engines: {
              node: '18.x',
            },
          },
          null,
          2
        ),
      },
      {
        file: 'vercel.json',
        data: JSON.stringify(
          {
            version: 2,
            functions: {
              'api/*.js': {
                runtime: '@vercel/node@3.0.0',
              },
            },
            headers: [
              {
                source: '/api/(.*)',
                headers: [
                  {
                    key: 'Access-Control-Allow-Origin',
                    value: '*',
                  },
                  {
                    key: 'Access-Control-Allow-Methods',
                    value: 'GET, POST, PUT, DELETE, OPTIONS',
                  },
                  {
                    key: 'Access-Control-Allow-Headers',
                    value: 'Content-Type, Authorization',
                  },
                ],
              },
            ],
          },
          null,
          2
        ),
      },
      {
        file: 'api/index.js',
        data: this.createAPIFunction(apiType, config.description),
      },
      {
        file: 'public/index.html',
        data: `<!DOCTYPE html>
<html>
<head>
  <title>${config.name} - API</title>
</head>
<body>
  <h1>${config.name}</h1>
  <p>${config.description}</p>
  <div><strong>Endpoint:</strong> <code>/api</code></div>
  <div>${this.getUsageExamples(apiType)}</div>
</body>
</html>`,
      },
    ]
  }

  private getUsageExamples(apiType: string): string {
    const examples: Record<
      string,
      { title: string; request: string; response: string }
    > = {
      square: {
        title: 'Square Example',
        request: `curl -X POST /api -H "Content-Type: application/json" -d '{"number": 4}'`,
        response: `{"number": 4, "square": 16}`,
      },
      auth: {
        title: 'Auth Example',
        request: `curl -X POST /api -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "123456"}'`,
        response: `{"success": true, "token": "..."}`,
      },
      calculator: {
        title: 'Calculator Example',
        request: `curl -X POST /api -H "Content-Type: application/json" -d '{"operation": "add", "a": 10, "b": 5}'`,
        response: `{"result": 15}`,
      },
      generic: {
        title: 'Generic Example',
        request: `curl /api`,
        response: `{"message": "API is working"}`,
      },
    }

    const example = examples[apiType] ?? examples.generic

    return `
      <h3>${example.title}</h3>
      <p><strong>Request:</strong><br><code>${example.request}</code></p>
      <p><strong>Response:</strong><br><code>${example.response}</code></p>
    `
  }

  private detectAPIType(code: string, description: string): string {
    const combined = (code + ' ' + description).toLowerCase()
    if (combined.includes('square')) return 'square'
    if (combined.includes('auth') || combined.includes('login')) return 'auth'
    if (combined.includes('calculator') || combined.includes('math'))
      return 'calculator'
    return 'generic'
  }

  private createAPIFunction(apiType: string, description: string): string {
    const logic: Record<string, string> = {
      square: `
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { number } = req.body || {}
  if (typeof number !== 'number') {
    return res.status(400).json({ error: 'Number is required' })
  }
  return res.json({ number, square: number * number })
};`,
      auth: `
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }
  return res.json({ success: true, token: 'mock-token' })
};`,
      calculator: `
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { operation, a, b } = req.body || {}
  let result
  switch(operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': result = b !== 0 ? a / b : null; break;
    default: return res.status(400).json({ error: 'Invalid operation' });
  }
  return res.json({ operation, result })
};`,
      generic: `
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json({ message: "API is working", method: req.method })
};`,
    }

    return logic[apiType] || logic['generic']
  }

  private async createVercelDeployment(
    name: string,
    files: Array<{ file: string; data: string }>
  ) {
    const projectName =
      name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50) || 'simple-api'

    const validProjectName = /^[a-z0-9-]+$/.test(projectName)
      ? projectName
      : 'simple-api'

    const deploymentData = {
      name: validProjectName,
      files,
      target: 'production',
      public: true,
    }

    const headers = {
      Authorization: `Bearer ${this.vercelToken}`,
      'Content-Type': 'application/json',
    }

    console.log(`Creating public Vercel deployment for: ${validProjectName}`)
    console.log(
      'Files:',
      files.map((f) => f.file)
    )

    const response = await axios.post(
      'https://api.vercel.com/v13/deployments',
      deploymentData,
      { headers, timeout: 60000 }
    )

    console.log('✅ Deployment created:', response.data.uid)
    return response.data
  }
}

export default new DeploymentService()
