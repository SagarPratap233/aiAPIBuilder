import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'

const gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export const apiSpecSchema = z.object({
  endpoint: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  description: z.string(),
  parameters: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      required: z.boolean(),
    })
  ),
  responseExample: z.object({}).passthrough(),
})

export type ApiSpec = z.infer<typeof apiSpecSchema>

export async function generateAPI(prompt: string) {
  // Use gemini-1.5-flash instead of gemini-1.5-pro (much higher free limits)
  const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const apiPrompt = `Generate a REST API specification for: "${prompt}"

Return ONLY a JSON object with this exact structure:
{
  "endpoint": "/api/example",
  "method": "POST", 
  "description": "Brief description",
  "parameters": [
    {"name": "param1", "type": "string", "required": true}
  ],
  "responseExample": {"message": "success"}
}`

  const result = await model.generateContent(apiPrompt)
  const response = result.response.text()

  const cleanJson = response
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()
  const parsed = JSON.parse(cleanJson)

  return apiSpecSchema.parse(parsed)
}

export async function generateCode(spec: ApiSpec) {
  // Use flash model here too
  const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const codePrompt = `Generate a complete Next.js API route for this specification:
${JSON.stringify(spec, null, 2)}

Return ONLY the TypeScript code for the API route file.`

  const result = await model.generateContent(codePrompt)
  return result.response
    .text()
    .replace(/```typescript\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()
}
