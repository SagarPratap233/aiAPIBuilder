'use client'

import { useState } from 'react'
import {
  Zap,
  Code,
  Copy,
  Check,
  Sparkles,
  Play,
  BookOpen,
  Settings,
  User,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  ExternalLink,
} from 'lucide-react'

interface GeneratedAPI {
  id: string
  specification: any
  code: string
  message?: string
}

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedAPI, setGeneratedAPI] = useState<GeneratedAPI | null>(null)
  const [error, setError] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedSpec, setCopiedSpec] = useState(false)
  const [activeTab, setActiveTab] = useState<'generate' | 'history' | 'docs'>(
    'generate'
  )

  // Mock data for history
  const [apiHistory] = useState([
    {
      id: '1',
      name: 'User Authentication API',
      endpoint: '/api/auth',
      method: 'POST',
      createdAt: '2024-06-18',
      status: 'active',
    },
    {
      id: '2',
      name: 'Product Catalog API',
      endpoint: '/api/products',
      method: 'GET',
      createdAt: '2024-06-17',
      status: 'active',
    },
  ])

  const handleGenerate = async () => {
    if (!prompt.trim() || !name.trim()) return

    setLoading(true)
    setError('')
    setGeneratedAPI(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, name }),
      })

      if (response.ok) {
        const result = await response.json()
        setGeneratedAPI(result)
        setPrompt('')
        setName('')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Generation failed')
      }
    } catch (error) {
      setError('Network error occurred')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, type: 'code' | 'spec') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'code') {
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
      } else {
        setCopiedSpec(true)
        setTimeout(() => setCopiedSpec(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  AI API Builder
                </h1>
              </div>
              <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('generate')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'generate'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Generate
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'history'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Code className="w-4 h-4 inline mr-1" />
                  My APIs
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'docs'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Docs
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  Free Plan
                </span>
                <span className="text-xs text-gray-500">4/5 APIs left</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    Demo User
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  AI-Powered API Generation
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Describe your API in plain English
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI will generate production-ready code, complete with
                validation, error handling, and documentation.
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
                        placeholder="e.g., User Authentication API"
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
                        placeholder="e.g., Create a REST API for user registration with email and password validation, JWT token generation, and proper error handling..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 text-gray-900 resize-none"
                        rows={4}
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            💡 Be specific about parameters, responses, and
                            functionality
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {prompt.length}/500
                        </span>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-xs">!</span>
                          </div>
                          <p className="text-red-700 text-sm font-medium">
                            {error}
                          </p>
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
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Generating API...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Sparkles className="w-5 h-5" />
                          <span>Generate API</span>
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
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            API Generated Successfully!
                          </h3>
                          <p className="text-green-700">
                            Your production-ready API is ready to use
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* API Specification */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          API Specification
                        </h4>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              JSON.stringify(
                                generatedAPI.specification,
                                null,
                                2
                              ),
                              'spec'
                            )
                          }
                          className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                        >
                          {copiedSpec ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span>{copiedSpec ? 'Copied!' : 'Copy JSON'}</span>
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-gray-500">
                                Endpoint
                              </span>
                              <div className="mt-1 flex items-center space-x-2">
                                <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                                  {generatedAPI.specification.endpoint}
                                </code>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">
                                Method
                              </span>
                              <div className="mt-1">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono font-semibold">
                                  {generatedAPI.specification.method}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">
                              Description
                            </span>
                            <p className="mt-1 text-gray-900">
                              {generatedAPI.specification.description}
                            </p>
                          </div>
                        </div>

                        {generatedAPI.specification.parameters?.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">
                              Parameters
                            </span>
                            <div className="mt-2 space-y-2">
                              {generatedAPI.specification.parameters.map(
                                (param: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-3 bg-white p-3 rounded-lg"
                                  >
                                    <code className="text-sm font-mono text-purple-600">
                                      {param.name}
                                    </code>
                                    <span className="text-sm text-gray-500">
                                      •
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {param.type}
                                    </span>
                                    {param.required && (
                                      <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Generated Code */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Generated Code
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {generatedAPI.code.length} characters
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(generatedAPI.code, 'code')
                            }
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            {copiedCode ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                            <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
                          <code>{generatedAPI.code}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Usage Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Play className="w-3 h-3 text-white" />
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-blue-900">
                            How to deploy this API
                          </h4>
                          <ol className="text-blue-800 text-sm space-y-2">
                            <li className="flex items-start space-x-2">
                              <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                1
                              </span>
                              <span>Copy the generated code above</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                2
                              </span>
                              <span>
                                Create:{' '}
                                <code className="bg-blue-100 px-1 rounded">
                                  src/app/api
                                  {generatedAPI.specification.endpoint}/route.ts
                                </code>
                              </span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                3
                              </span>
                              <span>Paste the code and save the file</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                4
                              </span>
                              <span>
                                Your API will be available at:{' '}
                                <code className="bg-blue-100 px-1 rounded">
                                  localhost:3000
                                  {generatedAPI.specification.endpoint}
                                </code>
                              </span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My APIs</h2>
                <p className="text-gray-600">
                  Manage and view your generated APIs
                </p>
              </div>
              <button
                onClick={() => setActiveTab('generate')}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New API</span>
              </button>
            </div>

            <div className="grid gap-4">
              {apiHistory.map((api) => (
                <div
                  key={api.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {api.name}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-mono text-xs">
                            {api.method}
                          </span>
                          <code className="text-blue-600">{api.endpoint}</code>
                          <span>•</span>
                          <span>Created {api.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Active
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Docs Tab */}
        {activeTab === 'docs' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Documentation
              </h2>
              <p className="text-lg text-gray-600">
                Learn how to make the most of AI API Builder
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Getting Started
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn the basics of generating APIs with natural language
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                  <span>Read guide</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  API Reference
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete reference for all generated API patterns
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                  <span>View reference</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
