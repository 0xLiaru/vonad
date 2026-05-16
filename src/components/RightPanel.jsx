import { useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther, decodeEventLog } from 'viem'
import { Terminal, Gift, AlertTriangle, ShieldCheck, Zap, Loader2, Coins, Layers, ExternalLink } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { topics } from '../data/topics.js'
import { ACHIEVEMENT_NFT_ABI, LEADERBOARD_ABI, USER_PROGRESS_ABI } from '../contracts/abis.js'
import { ACHIEVEMENT_NFT_ADDRESS, LEADERBOARD_ADDRESS, USER_PROGRESS_ADDRESS } from '../contracts/addresses.js'
import TopicDetail from './RightPanel/TopicDetail'

// Inline paymaster check to avoid TDZ circular import issues
function useSafePaymaster() {
  const { address, isConnected } = useAccount()
  const { data: isPremium } = useReadContract({
    address: '0x094dd9d6b7d729f14e218728680f058b9949abe3',
    abi: [{ type: 'function', name: 'isPremium', inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'bool' }], stateMutability: 'view' }],
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  })
  return { isPremium: Boolean(isConnected && isPremium), paymasterReady: false, bundlerAvailable: false, paymasterAddress: '' }
}

export default function RightPanel() {
  const { t } = useTranslation()
  const { selectedTopic, moduleCompleted, completeModule, walletAddress, isDemoMode, completedSteps, stepResults, currentStep, topicSteps } = useApp()
  const consoleRef = useRef(null)

  const { isPremium, paymasterReady, bundlerAvailable, paymasterAddress } = useSafePaymaster()

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight
  }, [completedSteps, stepResults])

  return (
    <aside className="w-80 border-l border-slate-600/50 bg-slate-900/60 flex flex-col shrink-0">
      <div className="p-3 border-b border-slate-700/30 shrink-0">
        <p className="text-white font-semibold text-sm">Console</p>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          {selectedTopic ? <TopicDetail /> : (
            <div className="p-4 flex items-center justify-center h-full">
              <p className="text-slate-500 text-sm text-center">Select topic</p>
            </div>
          )}
        </div>
        <ConsoleOutput
          consoleRef={consoleRef}
          selectedTopic={selectedTopic}
          completedSteps={completedSteps}
          stepResults={stepResults}
          currentStep={currentStep}
          topicSteps={topicSteps}
          moduleCompleted={moduleCompleted}
          completeModule={completeModule}
          walletAddress={walletAddress}
          isDemoMode={isDemoMode}
          isPremium={isPremium}
        />
      </div>
    </aside>
  )
}

function ConsoleOutput({ consoleRef, selectedTopic, completedSteps, stepResults, currentStep, topicSteps, moduleCompleted, completeModule, walletAddress, isDemoMode, isPremium }) {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address, query: { enabled: !!address } })
  const { setShowShareModal, setShareData, setShowAccount } = useApp()

  const allDone = selectedTopic && completedSteps.length >= (topicSteps?.length || 0)

  if (!selectedTopic) {
    return (
      <div className="border-t border-slate-700/30 p-3 bg-slate-950/30 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={13} className="text-slate-300" />
          <span className="text-slate-400 text-xs font-medium">Console</span>
        </div>
        <p className="text-slate-600 text-xs">$</p>
      </div>
    )
  }

  return (
    <div ref={consoleRef} className="border-t border-slate-700/30 p-3 bg-slate-950/30 shrink-0 overflow-y-auto" style={{ maxHeight: '40%' }}>
      <div className="flex items-center gap-2 mb-3">
        <Terminal size={13} className="text-slate-300" />
        <span className="text-slate-400 text-xs font-medium">Console</span>
      </div>
      <div className="space-y-1.5 font-mono text-xs">
        <div className="text-slate-300">$ vonad load --topic {selectedTopic}</div>
        {isDemoMode ? (
          <div className="flex items-center gap-2 text-slate-300"><AlertTriangle size={12} /><span>Demo - {walletAddress}</span></div>
        ) : (
          <div className="flex items-center gap-2 text-slate-300"><ShieldCheck size={12} /><span>Connected: {walletAddress}</span></div>
        )}

        {balance && (
          <div className="text-slate-400/80">Bakiye: {Number(formatEther(balance.value || 0n)).toFixed(4)} MON</div>
        )}

        {/* Step results */}
        {completedSteps.map((stepIdx) => {
          const result = stepResults[stepIdx]
          if (!result) return null
          const step = topicSteps?.[stepIdx]
          return (
            <div key={stepIdx} className="text-slate-300 flex items-center gap-1.5">
              <span className="text-white">✓</span>
              <span>{step?.label?.tr || stepIdx + 1}</span>
              {result.hash && (
                <a href={`https://testnet.monadexplorer.com/tx/${result.hash}`} target="_blank" rel="noopener noreferrer"
                  className="text-slate-300 hover:text-purple-300 ml-auto flex items-center gap-1">
                  <ExternalLink size={10} /> TX
                </a>
              )}
            </div>
          )
        })}

        {currentStep < (topicSteps?.length || 0) && !completedSteps.includes(currentStep) && (
          <div className="text-slate-300 animate-pulse">
            → {topicSteps?.[currentStep]?.label?.tr || 'Sonraki Step'} block
          </div>
        )}

        {allDone && !moduleCompleted && (
          <div className="mt-3 pt-3 border-t border-slate-700/30">
            <div className="text-white text-xs mb-2">Tum Steplar Done!</div>
            <button onClick={completeModule}
              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium hover:from-purple-600 hover:to-blue-600">
              <Gift size={12} className="inline mr-1" />
              {isDemoMode ? 'Complete Module' : 'Complete & Earn NFT'}
            </button>
          </div>
        )}

        {moduleCompleted && !isDemoMode && address && (
          <MintAction topicKey={selectedTopic} address={address} setShowShareModal={setShowShareModal} setShareData={setShareData} setShowAccount={setShowAccount} />
        )}
      </div>
    </div>
  )
}

function MintAction({ topicKey, address, setShowShareModal, setShareData, setShowAccount }) {
  const topic = topics[topicKey]
  const moduleName = topic?.modules?.tr?.[0] || topic?.name?.tr || topicKey

  const { data: mintFee } = useReadContract({
    address: ACHIEVEMENT_NFT_ADDRESS, abi: ACHIEVEMENT_NFT_ABI, functionName: 'mintFee',
  })

  const { writeContract, isPending, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } })
  const { writeContract: writeLeaderboard } = useWriteContract()
  const { writeContract: writeUserProgress } = useWriteContract()
  const scoreUpdated = useRef(false)

  const feeNumeric = mintFee ? Number(formatEther(mintFee)) : 0.001

  const mintedTokenId = useMemo(() => {
    if (!isSuccess || !receipt) return null
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({ abi: ACHIEVEMENT_NFT_ABI, data: log.data, topics: log.topics })
        if (decoded.eventName === 'AchievementMinted') return decoded.args.tokenId?.toString()
      } catch { /* ignore */ }
    }
    return null
  }, [isSuccess, receipt])

  useEffect(() => {
    if (isSuccess && receipt && !scoreUpdated.current) {
      scoreUpdated.current = true
      writeLeaderboard({ address: LEADERBOARD_ADDRESS, abi: LEADERBOARD_ABI, functionName: 'updateScore', args: [address, topicKey, moduleName] })
      writeUserProgress({ address: USER_PROGRESS_ADDRESS, abi: USER_PROGRESS_ABI, functionName: 'completeModule', args: [topicKey, moduleName] })
    }
  }, [isSuccess, receipt])

  if (isSuccess && receipt) {
    return (
      <div className="mt-2 space-y-2">
        <div className="text-white text-xs">Minted!{mintedTokenId && <span className="text-slate-300 ml-1">#{mintedTokenId}</span>}</div>
        <button onClick={() => { setShareData({ topicKey, moduleName, tokenId: mintedTokenId || '?', txHash: hash }); setShowShareModal(true) }}
          className="w-full px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium">Share</button>
      </div>
    )
  }

  if (isPending || isConfirming) {
    return <div className="mt-2 flex items-center gap-2 text-slate-300 text-xs"><Loader2 size={12} className="animate-spin" />{isConfirming ? 'Onaylaniyor...' : 'Approving...'}</div>
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="text-white text-xs">Modul Done!</div>
      <div className="text-slate-400 text-[10px]">NFT mint ({feeNumeric} MON)</div>
      <button onClick={() => writeContract({ address: ACHIEVEMENT_NFT_ADDRESS, abi: ACHIEVEMENT_NFT_ABI, functionName: 'mintAchievement', args: [address, moduleName, topicKey], value: mintFee || parseEther('0.001') })}
        className="w-full px-3 py-2 rounded-lg bg-gradient-to-r bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium hover:from-yellow-600 hover:to-orange-600">
        <Coins size={12} className="inline mr-1" />Earn NFT
      </button>
    </div>
  )
}



