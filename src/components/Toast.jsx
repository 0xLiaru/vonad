import { createContext, useContext, useState, useCallback } from 'react'
import { AlertTriangle, XCircle, CheckCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ type = 'error', title, message, duration = 6000 }) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, type, title, message }])
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }) {
  const { type, title, message } = toast

  const colors = {
    error: 'border-slate-600 bg-slate-800 text-slate-200',
    warning: 'border-slate-600 bg-slate-800 text-slate-200',
    success: 'border-slate-600 bg-slate-800 text-slate-200',
    info: 'border-slate-600 bg-slate-800 text-slate-200',
  }

  const icons = {
    error: XCircle,
    warning: AlertTriangle,
    success: CheckCircle,
    info: CheckCircle,
  }

  const Icon = icons[type]

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-3 rounded-xl border bg-slate-900 shadow-xl animate-[slideIn_0.3s_ease-out] ${colors[type]}`}
    >
      <Icon size={16} className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <p className="text-xs font-semibold">{title}</p>}
        {message && <p className="text-xs opacity-80 mt-0.5">{message}</p>}
      </div>
      <button onClick={onClose} className="opacity-50 hover:opacity-100 shrink-0">
        <X size={14} />
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

