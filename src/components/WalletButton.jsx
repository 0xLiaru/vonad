import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, LogOut, ChevronDown, Circle } from 'lucide-react'

const walletIcons = {
  metaMask: '🦊',
  metaMaskSDK: '🦊',
  ioMetamask: '🦊',
  okxWallet: '🆗',
  comOkex: '🆗',
  rabby: '🦝',
  ioRabby: '🦝',
  trust: '🛡️',
  comTrustwallet: '🛡️',
  coinbaseWallet: '🔵',
  comCoinbase: '🔵',
  phantom: '👻',
  appPhantom: '👻',
}

function getWalletIcon(id) {
  const key = (id || '').replace(/[^a-zA-Z]/g, '').toLowerCase()
  for (const [k, icon] of Object.entries(walletIcons)) {
    if (key.includes(k.toLowerCase())) return icon
  }
  return '🔌'
}

export default function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [open, setOpen] = useState(false)

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ''

  if (isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/50 text-sm hover:border-slate-600 transition-colors"
        >
          <Circle size={8} className="text-green-400 fill-green-400" />
          <span className="text-slate-300 font-mono text-xs">{shortAddress}</span>
          <ChevronDown size={14} className="text-slate-500" />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-1">
              <div className="px-3 py-2 border-b border-slate-700/50">
                <p className="text-slate-400 text-xs">Bağlı Cüzdan</p>
                <p className="text-slate-200 text-xs font-mono mt-0.5 truncate">{address}</p>
              </div>
              <button
                onClick={() => { disconnect(); setOpen(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={14} />
                Bağlantıyı Kes
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50"
      >
        <Wallet size={14} />
        {isPending ? 'Bağlanıyor...' : 'Cüzdan Bağla'}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-1 max-h-64 overflow-y-auto">
            {connectors.length > 0 ? (
              connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => { connect({ connector }); setOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <span className="text-base">{getWalletIcon(connector.id)}</span>
                  <span>{connector.name}</span>
                </button>
              ))
            ) : (
              <div className="px-3 py-3 text-sm text-slate-500 text-center">
                Cüzdan bulunamadı.
                <br />
                <span className="text-xs text-slate-600 mt-1 block">
                  MetaMask, Rabby veya OKX yükleyin.
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
