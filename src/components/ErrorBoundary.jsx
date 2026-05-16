import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-slate-950 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <span className="text-red-400 text-2xl">!</span>
            </div>
            <h1 className="text-white font-bold text-lg mb-2">Bir hata olustu</h1>
            <p className="text-slate-400 text-sm mb-4">
              Uygulama beklenmeyen bir hatayla karsilasti. Lutfen sayfayi yenileyin.
            </p>
            <p className="text-slate-600 text-xs font-mono bg-slate-800 rounded-lg p-3 mb-4 break-all">
              {this.state.error?.message || 'Bilinmeyen hata'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              Yeniden Yukle
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
