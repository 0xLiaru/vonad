import { useCallback, useEffect, useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { useAccount, useSwitchChain } from 'wagmi'
import { ToastProvider } from './components/Toast'
import Header from './components/Header'
import LeftPanel from './components/LeftPanel'
import Workspace from './components/Workspace'
import RightPanel from './components/RightPanel'
import PremiumModal from './components/PremiumModal'
import AccountPage from './components/AccountPage'
import ShareModal from './components/ShareModal'
import HomePage from './components/HomePage'
import LeaderboardPage from './components/LeaderboardPage'
import OnboardingModal from './components/OnboardingModal'
import { isOnboardingDone, markOnboardingDone } from './utils/onboarding.js'
import { monadTestnet } from './config/wagmi.js'
import { Menu, Terminal } from 'lucide-react'

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

  const [mobileLeftOpen, setMobileLeftOpen] = useState(false)
  const [mobileRightOpen, setMobileRightOpen] = useState(false)

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
    <div className="h-[100dvh] flex flex-col bg-slate-950 text-slate-200 overflow-hidden">
      <Header />
      {wrongChain && (
        <div className="shrink-0 bg-red-500/10 border-b border-red-500/20 px-4 py-2 flex items-center justify-between">
          <span className="text-red-400 text-xs">Yanlis ag. Monad Testnet'e gecmeniz gerekiyor.</span>
          <button
            onClick={handleSwitchChain}
            className="text-xs px-3 py-1 rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
          >
            Agi Degistir
          </button>
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        {showHomePage ? (
          <HomePage />
        ) : (
          <>
            <div className="hidden sm:block">
              <LeftPanel />
            </div>
            <Workspace />
            <div className="hidden sm:block">
              <RightPanel />
            </div>
          </>
        )}
      </div>

      {!showHomePage && (
        <MobileNav
          mobileLeftOpen={mobileLeftOpen}
          setMobileLeftOpen={setMobileLeftOpen}
          mobileRightOpen={mobileRightOpen}
          setMobileRightOpen={setMobileRightOpen}
        />
      )}

      <PremiumModal
        open={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSuccess={handlePremiumSuccess}
      />
      <AccountPage
        open={showAccount}
        onClose={() => setShowAccount(false)}
      />
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        data={shareData}
      />
      <LeaderboardPage
        open={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />
      <OnboardingModal
        open={showOnboarding}
        onClose={() => {
          markOnboardingDone()
          setShowOnboarding(false)
        }}
      />

      {/* Mobile overlay: Left Panel */}
      {mobileLeftOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileLeftOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 animate-[slideInLeft_0.2s_ease-out]">
            <LeftPanel />
          </div>
        </div>
      )}

      {/* Mobile overlay: Right Panel */}
      {mobileRightOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileRightOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 animate-[slideInRight_0.2s_ease-out]">
            <RightPanel />
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNav({ mobileLeftOpen, setMobileLeftOpen, mobileRightOpen, setMobileRightOpen }) {
  return (
    <div className="sm:hidden shrink-0 border-t border-slate-700/50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-around h-14">
      <button
        onClick={() => { setMobileLeftOpen(!mobileLeftOpen); setMobileRightOpen(false) }}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${mobileLeftOpen ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
      >
        <Menu size={18} />
        <span className="text-[10px]">Konular</span>
      </button>
      <button
        onClick={() => { setMobileRightOpen(!mobileRightOpen); setMobileLeftOpen(false) }}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${mobileRightOpen ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
      >
        <Terminal size={18} />
        <span className="text-[10px]">Konsol</span>
      </button>
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
