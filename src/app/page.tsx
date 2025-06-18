import Link from 'next/link'
import {
  Zap,
  Code,
  Cloud,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  Play,
  Star,
  ChevronRight,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                AI API Builder
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#docs"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Docs
              </a>
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                AI-Powered API Generation
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Build APIs with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Natural Language
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into production-ready APIs in seconds. No
              coding required - just describe what you need and watch AI
              generate complete, tested endpoints.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Start Building for Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Play className="w-5 h-5" />
                <span className="text-lg">Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>5 free APIs per month</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>Production ready</span>
              </div>
            </div>
          </div>

          {/* Demo Visual */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-600">
                    AI API Builder
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700">
                      Generating: "Create a user authentication API with JWT
                      tokens"
                    </span>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400 text-sm">
                      ✓ API specification generated
                      <br />
                      ✓ TypeScript code generated
                      <br />
                      ✓ Documentation created
                      <br />✓ Ready for deployment
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Everything you need to build APIs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From idea to production in minutes, not days. Our AI handles the
              complexity so you can focus on building.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AI-Powered Generation
              </h3>
              <p className="text-gray-600 mb-6">
                Describe your API in plain English and watch our AI generate
                production-ready TypeScript code with proper validation and
                error handling.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Natural language processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Clean, documented code</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Best practices built-in</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Instant Deployment
              </h3>
              <p className="text-gray-600 mb-6">
                Deploy your APIs to production with one click. Auto-scaling
                infrastructure, SSL certificates, and global CDN included.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Global edge deployment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Auto-scaling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>99.9% uptime SLA</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Team Collaboration
              </h3>
              <p className="text-gray-600 mb-6">
                Share APIs with your team, manage permissions, and collaborate
                on API development with built-in version control.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Team workspaces</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Permission management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>API versioning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Trusted by developers worldwide
            </h2>
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900">4.9/5</span>
                <span>on Product Hunt</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">10K+</span>
                <span>APIs generated</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">500+</span>
                <span>happy developers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <div className="text-4xl font-bold text-gray-900">
                  $0
                  <span className="text-xl text-gray-500 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-gray-600">
                  Perfect for trying out the platform
                </p>
              </div>
              <ul className="space-y-4 mt-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>5 API generations per month</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Basic templates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Community support</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <span className="w-5 h-5"></span>
                  <span>APIs expire after 7 days</span>
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="w-full mt-8 bg-gray-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors block text-center"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                <div className="text-4xl font-bold text-gray-900">
                  $29
                  <span className="text-xl text-gray-500 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-gray-600">For professional developers</p>
              </div>
              <ul className="space-y-4 mt-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>100 API generations per month</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Permanent API hosting</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Custom domains</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Advanced AI models</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Start Pro Trial
              </button>
            </div>

            {/* Business Tier */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Business</h3>
                <div className="text-4xl font-bold text-gray-900">
                  $99
                  <span className="text-xl text-gray-500 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-gray-600">For growing teams</p>
              </div>
              <ul className="space-y-4 mt-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>500 API generations per month</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Team collaboration (5 users)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>API versioning</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Analytics dashboard</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>White-label options</span>
                </li>
              </ul>
              <button className="w-full mt-8 bg-gray-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to build your first API?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are building 10x faster with AI
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Start Building for Free</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI API Builder</span>
            </div>
            <p className="text-gray-400">
              &copy; 2024 AI API Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
