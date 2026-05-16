import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useReadContract } from 'wagmi'
import { Globe, Crown, Menu, X, Home, BookOpen, Trophy, User } from 'lucide-react'
import WalletButton from './WalletButton'
import { PREMIUM_SUBSCRIPTION_ABI } from '../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS } from '../contracts/addresses.js'
import { useApp } from '../context/AppContext.jsx'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { isConnected, address } = useAccount()
  const { setShowPremiumModal, setShowAccount, showHomePage, setShowHomePage, setShowLeaderboard } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  })

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')

  const navItems = [
    { icon: Home, label: 'Home', action: () => { setShowHomePage(true); setMenuOpen(false) } },
    { icon: BookOpen, label: 'Learn', action: () => { setShowHomePage(false); setMenuOpen(false) } },
    { icon: Trophy, label: 'Leaderboard', action: () => { setShowLeaderboard(true); setMenuOpen(false) } },
    { icon: User, label: 'Account', action: () => { setShowAccount(true); setMenuOpen(false) } },
  ]

  return (
    <header className="h-14 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 relative z-50">
      {/* Logo */}
      <button onClick={() => setShowHomePage(true)} className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
        <div className="w-8 h-8 rounded-lg overflow-hidden">
          <img src="/logo.svg" alt="Vonad" className="w-full h-full" />
        </div>
        <span className="text-white font-semibold text-sm hidden sm:inline">{t('app.title')}</span>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
          >
            <item.icon size={15} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        {isConnected && !isPremium && (
          <button
            onClick={() => setShowPremiumModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium hover:bg-yellow-500/20 transition-colors"
          >
            <Crown size={12} />
            Premium
          </button>
        )}
        {isConnected && isPremium && (
          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
            <Crown size={12} /> Premium
          </span>
        )}
        <WalletButton />
        <button onClick={toggleLang} className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm">
          <Globe size={15} />
          <span className="hidden sm:inline">{i18n.language === 'tr' ? 'EN' : 'TR'}</span>
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-full right-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 py-1 mr-2 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
            {isConnected && !isPremium && (
              <button
                onClick={() => { setShowPremiumModal(true); setMenuOpen(false) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-yellow-400 hover:bg-slate-700 transition-colors border-t border-slate-700/50 mt-1 pt-2.5"
              >
                <Crown size={15} />
                Get Premium
              </button>
            )}
          </div>
        </>
      )}
    </header>
  )
}

