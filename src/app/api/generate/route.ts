import { NextRequest, NextResponse } from 'next/server'
import { generateAPI, generateCode } from '../../../lib/db/ai'

export async function POST(req: NextRequest) {
  try {
    const { prompt, name } = await req.json()

    if (!prompt || !name) {
      return NextResponse.json(
        { error: 'Missing prompt or name' },
        { status: 400 }
      )
    }

    console.log('Generating API for:', prompt)

    // Generate API specification
    const specification = await generateAPI(prompt)
    console.log('Generated specification:', specification)

    // Generate code
    const code = await generateCode(specification)
    console.log('Generated code length:', code.length)

    // For MVP, return without saving to database
    // You can add database saving later when you implement proper user authentication
    return NextResponse.json({
      id: `api-${Date.now()}`, // Simple ID for now
      specification,
      code,
      message: 'API generated successfully! Copy the code below.',
    })
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
