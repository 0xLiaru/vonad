import { useTranslation } from 'react-i18next'
import { useAccount, useReadContract } from 'wagmi'
import { Globe, FlaskConical, Crown, User, Home, Trophy } from 'lucide-react'
import WalletButton from './WalletButton'
import { PREMIUM_SUBSCRIPTION_ABI } from '../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS } from '../contracts/addresses.js'
import { useApp } from '../context/AppContext.jsx'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { isConnected, address } = useAccount()
  const { setShowPremiumModal, setShowAccount, showHomePage, setShowHomePage, setShowLeaderboard } = useApp()

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  })

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')
  }

  return (
    <header className="h-14 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowHomePage(true)}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <span className="text-white font-bold text-sm">V</span>
        </button>
        <div className="hidden sm:block">
          <h1 className="text-white font-semibold text-sm leading-tight">{t('app.title')}</h1>
          <p className="text-slate-500 text-xs">{t('app.subtitle')}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        {!isConnected && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20">
            <FlaskConical size={12} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium">Demo Modunda</span>
          </div>
        )}
        {isConnected && !isPremium && (
          <button
            onClick={() => setShowPremiumModal(true)}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium hover:bg-yellow-500/20 transition-colors"
          >
            <Crown size={12} />
            <span className="hidden sm:inline">Premium Al</span>
          </button>
        )}
        {isConnected && isPremium && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
            <Crown size={12} className="text-purple-400" />
            <span className="text-purple-400 text-xs font-medium">Premium</span>
          </div>
        )}
        {!showHomePage && (
          <button
            onClick={() => setShowHomePage(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 border border-slate-700/50 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
          >
            <Home size={12} />
            Anasayfa
          </button>
        )}
        <button
          onClick={() => setShowLeaderboard(true)}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md bg-slate-800 border border-slate-700/50 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
        >
          <Trophy size={12} />
          <span className="hidden sm:inline">Liderlik</span>
        </button>
        {isConnected && (
          <button
            onClick={() => setShowAccount(true)}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md bg-slate-800 border border-slate-700/50 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
          >
            <User size={12} />
            <span className="hidden sm:inline">Hesabim</span>
          </button>
        )}
        <WalletButton />
        <div className="w-px h-6 bg-slate-700/50 hidden sm:block" />
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
        >
          <Globe size={16} />
          <span className="hidden sm:inline">{i18n.language === 'tr' ? 'EN' : 'TR'}</span>
        </button>
      </div>
    </header>
  )
}
