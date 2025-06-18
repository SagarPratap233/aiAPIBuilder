// src/app/dashboard/components/DocsTab.tsx
import {
  Terminal,
  Code,
  Play,
  Sparkles,
  BookOpen,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react'
import { useState } from 'react'

export function DocsTab() {
  const [copiedExample, setCopiedExample] = useState<{
    [key: string]: boolean
  }>({})

  const copyExample = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedExample((prev) => ({ ...prev, [id]: true }))
      setTimeout(
        () => setCopiedExample((prev) => ({ ...prev, [id]: false })),
        2000
      )
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const examples = {
    basic: 'curl https://api.example.com',
    post: `curl -X POST https://api.example.com \\
  -H "Content-Type: application/json" \\
  -d '{"key": "value"}'`,
    square: `curl -X POST https://square-api.vercel.app/api \\
  -H "Content-Type: application/json" \\
  -d '{"number": 5}'`,
    auth: `curl -X POST https://auth-api.vercel.app/api \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@example.com", "password": "password123"}'`,
    calculator: `curl -X POST https://calc-api.vercel.app/api \\
  -H "Content-Type: application/json" \\
  -d '{"operation": "multiply", "a": 8, "b": 9}'`,
    headers: `curl -X POST https://api.example.com \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"data": "value"}'`,
    verbose: 'curl -v https://api.example.com',
    output: 'curl -o response.json https://api.example.com',
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">curl Command Guide</h2>
        <p className="text-lg text-gray-600">
          Learn how to use your generated APIs with curl
        </p>
      </div>

      {/* Quick Reference Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Terminal className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Basic GET Request
          </h3>
          <p className="text-gray-600 mb-4">
            Simple API call to retrieve information
          </p>
          <div className="bg-gray-900 rounded-lg p-3 relative">
            <button
              onClick={() => copyExample(examples.basic, 'basic')}
              className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
            >
              {copiedExample.basic ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-gray-300" />
              )}
            </button>
            <code className="text-green-400 text-sm">{examples.basic}</code>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            POST with JSON Data
          </h3>
          <p className="text-gray-600 mb-4">Send JSON data to your APIs</p>
          <div className="bg-gray-900 rounded-lg p-3 relative">
            <button
              onClick={() => copyExample(examples.post, 'post')}
              className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
            >
              {copiedExample.post ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-gray-300" />
              )}
            </button>
            <code className="text-green-400 text-sm whitespace-pre-wrap">
              {examples.post}
            </code>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Play className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Testing & Debugging
          </h3>
          <p className="text-gray-600 mb-4">
            Tips for testing your deployed APIs effectively
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">•</span>
              <span>Start with GET requests for API info</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">•</span>
              <span>Test with valid data first</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">•</span>
              <span>Try invalid data to test error handling</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">•</span>
              <span>Use -v flag for verbose output</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">•</span>
              <span>Check response status codes</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Advanced Options
          </h3>
          <p className="text-gray-600 mb-4">
            Additional curl flags for advanced usage
          </p>
          <div className="space-y-3">
            <div>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">-v</code>
              <span className="text-sm text-gray-600 ml-2">Verbose output</span>
            </div>
            <div>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                -o file.json
              </code>
              <span className="text-sm text-gray-600 ml-2">
                Save response to file
              </span>
            </div>
            <div>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                -w &quot;%{`{http_code}`}&quot;
              </code>
              <span className="text-sm text-gray-600 ml-2">
                Show status code
              </span>
            </div>
            <div>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                -H "Header: value"
              </code>
              <span className="text-sm text-gray-600 ml-2">
                Add custom headers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real API Examples */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Real API Examples
        </h3>
        <p className="text-gray-600 mb-6">
          Copy these examples and replace the URLs with your generated API URLs
        </p>

        <div className="grid gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              🧮 Square Calculator API
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyExample(examples.square, 'square')}
                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
              >
                {copiedExample.square ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-300" />
                )}
              </button>
              <code className="text-green-400 text-sm whitespace-pre-wrap">
                {examples.square}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Expected response: {'{'}"number": 5, "square": 25, "calculation":
              "5 × 5 = 25"{'}'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              🔐 Authentication API
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyExample(examples.auth, 'auth')}
                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
              >
                {copiedExample.auth ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-300" />
                )}
              </button>
              <code className="text-green-400 text-sm whitespace-pre-wrap">
                {examples.auth}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Expected response: {'{'}"success": true, "user": {'{'}"email":
              "..."{'}'}, "token": "..."{'}'}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              🧮 Calculator API
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyExample(examples.calculator, 'calculator')}
                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
              >
                {copiedExample.calculator ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-300" />
                )}
              </button>
              <code className="text-green-400 text-sm whitespace-pre-wrap">
                {examples.calculator}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Expected response: {'{'}"operation": "multiply", "a": 8, "b": 9,
              "result": 72{'}'}
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Examples */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Advanced curl Examples
        </h3>

        <div className="grid gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              With Authentication Headers
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyExample(examples.headers, 'headers')}
                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
              >
                {copiedExample.headers ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-300" />
                )}
              </button>
              <code className="text-green-400 text-sm whitespace-pre-wrap">
                {examples.headers}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Verbose Output for Debugging
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyExample(examples.verbose, 'verbose')}
                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
              >
                {copiedExample.verbose ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-300" />
                )}
              </button>
              <code className="text-green-400 text-sm">{examples.verbose}</code>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Save Response to File
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyExample(examples.output, 'output')}
                className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
              >
                {copiedExample.output ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-300" />
                )}
              </button>
              <code className="text-green-400 text-sm">{examples.output}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Start Guide
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              1
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Generate API</h4>
            <p className="text-sm text-gray-600">
              Describe what you want and click generate
            </p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              2
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Copy curl</h4>
            <p className="text-sm text-gray-600">
              Copy the curl command from the results
            </p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              3
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Run & Test</h4>
            <p className="text-sm text-gray-600">
              Paste in terminal and see it work!
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Common Issues & Solutions
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">❌ Connection refused</h4>
            <p className="text-sm text-gray-600">
              Check if the API URL is correct and the service is deployed
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">❌ 400 Bad Request</h4>
            <p className="text-sm text-gray-600">
              Verify your JSON data format and required fields
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              ❌ 500 Internal Server Error
            </h4>
            <p className="text-sm text-gray-600">
              The API encountered an error - try with different data
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">✅ Use -v flag</h4>
            <p className="text-sm text-gray-600">
              Add -v to your curl command to see detailed request/response info
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
