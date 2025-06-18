import { NextRequest, NextResponse } from 'next/server'
import { generateAPI, generateCode } from '../../../lib/db/ai'
import deploymentService from '../../../lib/deployment'

export async function POST(req: NextRequest) {
  try {
    const { prompt, name, autoDeploy = false } = await req.json()

    if (!prompt || !name) {
      return NextResponse.json(
        { error: 'Missing prompt or name' },
        { status: 400 }
      )
    }

    console.log('Generating API for:', prompt, 'autoDeploy:', autoDeploy)

    // Generate API specification
    const specification = await generateAPI(prompt)
    console.log('Generated specification:', specification)

    // Generate code
    const code = await generateCode(specification)
    console.log('Generated code length:', code.length)

    // Create API ID
    const apiId = `api-${Date.now()}`

    let deploymentResult = null

    // Auto-deploy if requested
    if (autoDeploy) {
      console.log(`Starting auto-deployment for API: ${apiId}`)

      try {
        deploymentResult = await deploymentService.deployToVercel({
          apiId,
          code,
          name: name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-'),
          description: prompt,
        })

        console.log(
          `Deployment ${
            deploymentResult.success ? 'successful' : 'failed'
          } for API: ${apiId}`
        )
      } catch (deployError) {
        console.error('Deployment error:', deployError)

        deploymentResult = {
          success: false,
          error:
            deployError instanceof Error
              ? deployError.message
              : 'Deployment failed',
        }
      }
    }

    const response = {
      id: apiId,
      specification,
      code,
      message: autoDeploy
        ? deploymentResult?.success
          ? 'API generated and deployed successfully!'
          : 'API generated successfully but deployment failed.'
        : 'API generated successfully! Copy the code below.',
      deployment: deploymentResult,
      // Add deployment info to response
      deployUrl: deploymentResult?.url,
      deploymentId: deploymentResult?.deploymentId,
      status: autoDeploy
        ? deploymentResult?.success
          ? 'deployed'
          : 'failed'
        : 'generated',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      {
        error: `Failed to generate API: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      },
      { status: 500 }
    )
  }
}
