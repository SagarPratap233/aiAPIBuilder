// Use the updated_dashboard_main artifact - but it was cut off
// Here's the simple version:

'use client'

import { useState } from 'react'
import { Terminal, Settings, User, Plus, BookOpen } from 'lucide-react'
import { GenerateTab } from './components/GenerateTab'
import { HistoryTab } from './components/HistoryTab'
import { DocsTab } from './components/DocsTab'

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

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [name, setName] = useState('')
  const [autoDeploy, setAutoDeploy] = useState(true)
  const [loading, setLoading] = useState(false)
  const [generatedAPI, setGeneratedAPI] = useState<GeneratedAPI | null>(null)
  const [error, setError] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedSpec, setCopiedSpec] = useState(false)
  const [copiedCurl, setCopiedCurl] = useState<{ [key: string]: boolean }>({})
  const [activeTab, setActiveTab] = useState<'generate' | 'history' | 'docs'>(
    'generate'
  )

  const [apiHistory] = useState([
    {
      id: '1',
      name: 'Square Calculator API',
      endpoint: '/api',
      method: 'POST',
      createdAt: '2024-06-18',
      status: 'deployed',
      deployUrl: 'https://square-calc-abc.vercel.app/api',
      type: 'square',
    },
    {
      id: '2',
      name: 'User Auth API',
      endpoint: '/api',
      method: 'POST',
      createdAt: '2024-06-17',
      status: 'deployed',
      deployUrl: 'https://user-auth-xyz.vercel.app/api',
      type: 'auth',
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
        body: JSON.stringify({ prompt, name, autoDeploy }),
      })

      if (response.ok) {
        const result = await response.json()
        setGeneratedAPI(result)
        if (!autoDeploy || result.deployment?.success !== undefined) {
          setPrompt('')
          setName('')
        }
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

  const copyToClipboard = async (text: string, type: string, id?: string) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'code') {
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
      } else if (type === 'spec') {
        setCopiedSpec(true)
        setTimeout(() => setCopiedSpec(false), 2000)
      } else if (type === 'curl' && id) {
        setCopiedCurl((prev) => ({ ...prev, [id]: true }))
        setTimeout(
          () => setCopiedCurl((prev) => ({ ...prev, [id]: false })),
          2000
        )
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
                  <Terminal className="w-5 h-5 text-white" />
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
                  <Terminal className="w-4 h-4 inline mr-1" />
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
        {activeTab === 'generate' && (
          <GenerateTab
            prompt={prompt}
            setPrompt={setPrompt}
            name={name}
            setName={setName}
            loading={loading}
            error={error}
            generatedAPI={generatedAPI}
            handleGenerate={handleGenerate}
            copyToClipboard={copyToClipboard}
            copiedCode={copiedCode}
            copiedCurl={copiedCurl}
          />
        )}

        {activeTab === 'history' && (
          <HistoryTab
            apiHistory={apiHistory}
            setActiveTab={setActiveTab}
            copyToClipboard={copyToClipboard}
            copiedCurl={copiedCurl}
          />
        )}

        {activeTab === 'docs' && <DocsTab />}
      </div>
    </div>
  )
}
