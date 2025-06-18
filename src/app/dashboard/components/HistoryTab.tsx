// src/app/dashboard/components/HistoryTab.tsx
import { Terminal, Copy, Check, Plus } from 'lucide-react'

interface ApiHistoryItem {
  id: string
  name: string
  endpoint: string
  method: string
  createdAt: string
  status: string
  deployUrl: string
  type: string
}

interface HistoryTabProps {
  apiHistory: ApiHistoryItem[]
  setActiveTab: (tab: 'generate' | 'history' | 'docs') => void
  copyToClipboard: (text: string, type: string, id?: string) => void
  copiedCurl: { [key: string]: boolean }
}

export function HistoryTab({
  apiHistory,
  setActiveTab,
  copyToClipboard,
  copiedCurl,
}: HistoryTabProps) {
  const generateHistoryCurl = (api: ApiHistoryItem) => {
    switch (api.type) {
      case 'square':
        return `curl -X POST ${api.deployUrl} -H "Content-Type: application/json" -d '{"number": 5}'`
      case 'auth':
        return `curl -X POST ${api.deployUrl} -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password123"}'`
      case 'calculator':
        return `curl -X POST ${api.deployUrl} -H "Content-Type: application/json" -d '{"operation": "add", "a": 10, "b": 20}'`
      case 'user':
        return `curl -X POST ${api.deployUrl} -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'`
      default:
        return `curl ${api.deployUrl}`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My APIs</h2>
          <p className="text-gray-600">Your deployed APIs with curl commands</p>
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
        {apiHistory.length === 0 ? (
          <div className="text-center py-12">
            <Terminal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No APIs Generated Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first API to see it here with curl commands.
            </p>
            <button
              onClick={() => setActiveTab('generate')}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Your First API</span>
            </button>
          </div>
        ) : (
          apiHistory.map((api) => (
            <div
              key={api.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {api.name}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-mono text-xs">
                          {api.method}
                        </span>
                        <span>•</span>
                        <span>Created {api.createdAt}</span>
                        <span>•</span>
                        <span className="text-blue-600">{api.endpoint}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        api.status === 'deployed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {api.status === 'deployed' ? 'Live' : 'Deploying'}
                    </span>
                  </div>
                </div>

                {/* API URL Display */}
                {api.deployUrl && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          API URL:
                        </p>
                        <code className="text-sm text-blue-600 font-mono">
                          {api.deployUrl}
                        </code>
                      </div>
                      <button
                        onClick={() => window.open(api.deployUrl, '_blank')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Open →
                      </button>
                    </div>
                  </div>
                )}

                {/* curl Command for History */}
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <h5 className="text-sm font-medium text-gray-200">
                      curl Command
                    </h5>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          generateHistoryCurl(api),
                          'curl',
                          api.id
                        )
                      }
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs transition-colors"
                    >
                      {copiedCurl[api.id] ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3">
                    <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                      <code>{generateHistoryCurl(api)}</code>
                    </pre>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>API Type:</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium capitalize">
                      {api.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        copyToClipboard(api.deployUrl, 'curl', `url-${api.id}`)
                      }
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="View Details"
                    >
                      <Terminal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {apiHistory.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            API Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {apiHistory.length}
              </div>
              <div className="text-sm text-blue-800">Total APIs</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {apiHistory.filter((api) => api.status === 'deployed').length}
              </div>
              <div className="text-sm text-green-800">Live APIs</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(apiHistory.map((api) => api.type)).size}
              </div>
              <div className="text-sm text-purple-800">API Types</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
