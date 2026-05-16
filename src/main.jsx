import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config/wagmi.js'
import './i18n/index.js'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10000,
      refetchOnWindowFocus: false,
    },
  },
})

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </WagmiProvider>
      </ErrorBoundary>
    </StrictMode>,
  )
} else {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="color:white;background:#0f0a1a;padding:40px;text-align:center"><h1>Vonad</h1><p>Root elementi bulunamadi. Lutfen sayfayi yenileyin.</p></div>'
}
