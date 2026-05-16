import { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { ToastProvider } from './components/Toast'
import { AppProvider, useApp } from './context/AppContext'
import { monadTestnet } from './config/wagmi.js'
import { isOnboardingDone, markOnboardingDone } from './utils/onboarding.js'
import Header from './components/Header'
import LeftPanel from './components/LeftPanel'
import Workspace from './components/Workspace'
import RightPanel from './components/RightPanel'
import PremiumModal from './components/PremiumModal'
const AccountPage = lazy(() => import('./components/AccountPage.jsx'))
import ShareModal from './components/ShareModal'
import HomePage from './components/HomePage'
import LeaderboardPage from './components/LeaderboardPage'
import OnboardingModal from './components/OnboardingModal'

function AppContent() {
  const {
    showPremiumModal, setShowPremiumModal,
    showAccount, setShowAccount,
    showShareModal, setShowShareModal,
    shareData,
    showHomePage,
    showOnboarding, setShowOnboarding,
    showLeaderboard, setShowLeaderboard,
  } = useApp()

  const { isConnected, chainId } = useAccount()
  const { switchChain } = useSwitchChain()

  const handlePremiumSuccess = useCallback(() => {
    setTimeout(() => setShowPremiumModal(false), 2500)
  }, [setShowPremiumModal])

  const wrongChain = isConnected && chainId && chainId !== monadTestnet.id

  const handleSwitchChain = useCallback(() => {
    switchChain({ chainId: monadTestnet.id })
  }, [switchChain])

  useEffect(() => {
    const done = isOnboardingDone()
    if (!done) {
      const t = setTimeout(() => setShowOnboarding(true), 800)
      return () => clearTimeout(t)
    }
  }, [setShowOnboarding])

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-200 overflow-hidden">
      <Header />
      {wrongChain && (
        <div className="shrink-0 bg-red-500/10 border-b border-red-500/20 px-4 py-2 flex items-center justify-between">
          <span className="text-red-400 text-xs">Yanlis ag. Monad Testnete gecin.</span>
          <button onClick={handleSwitchChain}
            className="text-xs px-3 py-1 rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors">
            Agi Degistir
          </button>
        </div>
      )}
      <div className="flex-1 flex min-h-0">
        {showHomePage ? <HomePage /> : (
          <>
            <div className="hidden sm:block"><LeftPanel /></div>
            <Workspace />
            <div className="hidden sm:block"><RightPanel /></div>
          </>
        )}
      </div>
      <PremiumModal open={showPremiumModal} onClose={() => setShowPremiumModal(false)} onSuccess={handlePremiumSuccess} />
      <Suspense fallback={null}><AccountPage open={showAccount} onClose={() => setShowAccount(false)} /></Suspense>
      <ShareModal open={showShareModal} onClose={() => setShowShareModal(false)} data={shareData} />
      <LeaderboardPage open={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
      <OnboardingModal open={showOnboarding} onClose={() => { markOnboardingDone(); setShowOnboarding(false) }} />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AppProvider>
  )
}

export default App

