// src/app/dashboard/components/GenerateTab.tsx
import { Terminal, Loader2, Copy, Check, Play } from 'lucide-react'

interface GeneratedAPI {
  id: string
  specification: any
  code: string
  message?: string
  deployment?: {
    success: boolean
    url?: string
    error?: string
  }
  deployUrl?: string
  status?: string
}

interface GenerateTabProps {
  prompt: string
  setPrompt: (value: string) => void
  name: string
  setName: (value: string) => void
  loading: boolean
  error: string
  generatedAPI: GeneratedAPI | null
  handleGenerate: () => void
  copyToClipboard: (text: string, type: string, id?: string) => void
  copiedCode: boolean
  copiedCurl: { [key: string]: boolean }
}

export function GenerateTab({
  prompt,
  setPrompt,
  name,
  setName,
  loading,
  error,
  generatedAPI,
  handleGenerate,
  copyToClipboard,
  copiedCode,
  copiedCurl,
}: GenerateTabProps) {
  const generateCurlCommands = (deployUrl: string) => {
    const baseUrl = deployUrl.replace('/api', '')

    const commands = {
      info: {
        title: '📋 API Info',
        command: `curl ${baseUrl}/api`,
      },
    }

    const type = detectAPIType(generatedAPI?.specification || {}, prompt)

    switch (type) {
      case 'square':
        return {
          ...commands,
          test: {
            title: '🧮 Calculate Square',
            command: `curl -X POST ${baseUrl}/api \\
    -H "Content-Type: application/json" \\
    -d '{"number": 7}'`,
          },
          example2: {
            title: '🔢 Try Another Number',
            command: `curl -X POST ${baseUrl}/api \\
    -H "Content-Type: application/json" \\
    -d '{"number": 15}'`,
          },
        }

      case 'auth':
        return {
          ...commands,
          login: {
            title: '🔐 User Login',
            command: `curl -X POST ${baseUrl}/api \\
    -H "Content-Type: application/json" \\
    -d '{"email": "test@example.com", "password": "password123"}'`,
          },
          invalid: {
            title: '❌ Invalid Login',
            command: `curl -X POST ${baseUrl}/api \\
    -H "Content-Type: application/json" \\
    -d '{"email": "invalid", "password": "123"}'`,
          },
        }

      case 'calculator':
        return {
          ...commands,
          add: {
            title: '➕ Add Numbers',
            command: `curl -X POST ${baseUrl}/api \\
    -H "Content-Type: application/json" \\
    -d '{"operation": "add", "a": 15, "b": 25}'`,
          },
          multiply: {
            title: '✖️ Multiply Numbers',
            command: `curl -X POST ${baseUrl}/api \\
    -H "Content-Type: application/json" \\
    -d '{"operation": "multiply", "a": 8, "b": 9}'`,
          },
        }

      default:
        return {
          ...commands,
          test: {
            title: '🧪 Test API',
            command: `curl -X POST ${baseUrl}/api \\
    -H "Content-Type: application/json" \\
    -d '{"key": "value", "test": true}'`,
          },
        }
    }
  }

  const detectAPIType = (specification: any, description: string): string => {
    const combined = (
      JSON.stringify(specification) +
      ' ' +
      description
    ).toLowerCase()

    if (combined.includes('square')) return 'square'
    if (combined.includes('auth') || combined.includes('login')) return 'auth'
    if (combined.includes('calculator') || combined.includes('math'))
      return 'calculator'
    if (combined.includes('user')) return 'user'

    return 'generic'
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
          <Terminal className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            Generate APIs with Ready-to-Use curl Commands
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Describe your API and get curl commands instantly
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our AI generates working APIs and provides you with curl commands you
          can use immediately.
        </p>
      </div>

      {/* Generation Form */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  API Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., square-calculator"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Describe your API
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create an API that calculates the square of a number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 text-gray-900 resize-none"
                  rows={3}
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>
                      💡 Examples: square calculator, user authentication, todo
                      list, weather API
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {prompt.length}/200
                  </span>
                </div>
              </div>

              {/* Auto-Deploy Section */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Instant curl Commands
                      </h3>
                      <p className="text-sm text-gray-600">
                        Get working curl commands you can copy and run
                        immediately
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    ✅ Always On
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-xs">!</span>
                    </div>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim() || !name.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating API & curl Commands...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Generate API with curl Commands</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated API Display */}
      {generatedAPI && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div
              className={`px-8 py-6 border-b border-gray-200 ${
                generatedAPI.deployUrl
                  ? 'bg-gradient-to-r from-green-50 to-blue-50'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      generatedAPI.deployUrl ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  >
                    <Terminal className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {generatedAPI.deployUrl
                        ? '🎉 API Ready! Here are your curl commands:'
                        : '✅ API Generated!'}
                    </h3>
                    <p
                      className={
                        generatedAPI.deployUrl
                          ? 'text-green-700'
                          : 'text-blue-700'
                      }
                    >
                      {generatedAPI.deployUrl
                        ? 'Copy and run these commands in your terminal'
                        : 'Your API is ready to deploy'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* curl Commands Display */}
              {generatedAPI.deployUrl && (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-blue-600" />
                    Ready-to-Use curl Commands
                  </h4>

                  <div className="grid gap-4">
                    {Object.entries(
                      generateCurlCommands(generatedAPI.deployUrl)
                    ).map(([key, cmd]) => (
                      <div
                        key={key}
                        className="bg-gray-900 rounded-xl overflow-hidden"
                      >
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
                          <h5 className="text-sm font-medium text-gray-200">
                            {cmd.title}
                          </h5>
                          <button
                            onClick={() =>
                              copyToClipboard(cmd.command, 'curl', key)
                            }
                            className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-sm transition-colors"
                          >
                            {copiedCurl[key] ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-4">
                          <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                            <code>{cmd.command}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Play className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">
                          How to use these curl commands:
                        </h4>
                        <ol className="text-blue-800 text-sm space-y-1">
                          <li>1. Copy any curl command above</li>
                          <li>2. Open your terminal</li>
                          <li>3. Paste and press Enter</li>
                          <li>4. See the API response instantly!</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Deployment Error */}
              {generatedAPI.deployment?.error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-xs">!</span>
                    </div>
                    <h4 className="font-semibold text-red-900">
                      Deployment Failed
                    </h4>
                  </div>
                  <p className="text-red-700 text-sm">
                    {generatedAPI.deployment.error}
                  </p>
                </div>
              )}

              {/* Generated Code - Collapsed by default */}
              <details className="bg-gray-50 rounded-xl">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 rounded-xl">
                  📝 View Generated Code (Optional)
                </summary>
                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Generated Code
                    </h4>
                    <button
                      onClick={() => copyToClipboard(generatedAPI.code, 'code')}
                      className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generatedAPI.code}</code>
                  </pre>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
