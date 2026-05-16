import { useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther, decodeEventLog } from 'viem'
import { Info, Terminal, Gift, AlertTriangle, ShieldCheck, Zap, Loader2, Coins, Layers } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { usePaymaster } from '../hooks/usePaymaster.js'
import { topics } from '../data/topics.js'
import { ACHIEVEMENT_NFT_ABI, LEADERBOARD_ABI, USER_PROGRESS_ABI } from '../contracts/abis.js'
import { ACHIEVEMENT_NFT_ADDRESS, LEADERBOARD_ADDRESS, USER_PROGRESS_ADDRESS } from '../contracts/addresses.js'
import TopicDetail from './RightPanel/TopicDetail'

export default function RightPanel() {
  const { t } = useTranslation()
  const {
    selectedTopic,
    isSimulating,
    simulationOutput,
    simulationComplete,
    moduleCompleted,
    completeModule,
    walletAddress,
    isDemoMode,
  } = useApp()
  const consoleRef = useRef(null)

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [simulationOutput])

  const { isPremium, paymasterReady, bundlerAvailable, paymasterAddress } = usePaymaster()

  return (
    <aside className="w-80 border-l border-slate-700/50 bg-slate-900/50 flex flex-col shrink-0">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-10 border-b border-slate-700/30 flex items-center px-4 gap-2 bg-slate-900/30 shrink-0">
          <Info size={14} className="text-blue-400" />
          <span className="text-slate-400 text-xs font-medium">{t('rightPanel.details')}</span>
        </div>

        {selectedTopic ? (
          <TopicDetail />
        ) : (
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-800 flex items-center justify-center">
                <Info size={20} className="text-slate-600" />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">
                {t('rightPanel.noSelection')}
              </p>
              <p className="text-slate-600 text-xs max-w-[200px]">
                {t('rightPanel.selectHint')}
              </p>
            </div>
          </div>
        )}
      </div>

      <SimulationConsole
        consoleRef={consoleRef}
        selectedTopic={selectedTopic}
        isSimulating={isSimulating}
        simulationOutput={simulationOutput}
        simulationComplete={simulationComplete}
        moduleCompleted={moduleCompleted}
        completeModule={completeModule}
        walletAddress={walletAddress}
        isDemoMode={isDemoMode}
        isPremium={isPremium}
        paymasterReady={paymasterReady}
        bundlerAvailable={bundlerAvailable}
        paymasterAddress={paymasterAddress}
        t={t}
      />
    </aside>
  )
}

function SimulationConsole({
  consoleRef,
  selectedTopic,
  isSimulating,
  simulationOutput,
  simulationComplete,
  moduleCompleted,
  completeModule,
  walletAddress,
  isDemoMode,
  isPremium,
  paymasterReady,
  bundlerAvailable,
  paymasterAddress,
  t,
}) {
  const { address } = useAccount()
  const { setShowShareModal, setShareData } = useApp()
  const gasSponsored = isPremium && paymasterReady && bundlerAvailable

  return (
    <div className="border-t border-slate-700/30 flex flex-col shrink-0" style={{ minHeight: '12rem' }}>
      <div className="h-9 border-b border-slate-700/30 flex items-center px-4 gap-2 bg-slate-900/50 shrink-0">
        <Terminal size={13} className="text-purple-400" />
        <span className="text-slate-400 text-xs font-medium">{t('rightPanel.console')}</span>
        {isSimulating && (
          <span className="ml-auto w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        )}
        {gasSponsored && (
          <span className="ml-auto w-2 h-2 rounded-full bg-green-400" title="Gas sponsoru aktif" />
        )}
      </div>
      <div
        ref={consoleRef}
        className="flex-1 p-3 font-mono text-xs overflow-y-auto bg-slate-950/50 min-h-0"
      >
        {selectedTopic ? (
          <div className="space-y-1.5">
            <div className="text-purple-400/80">
              $ vonad load --topic {selectedTopic}
            </div>
            {isDemoMode ? (
              <div className="flex items-center gap-2 text-yellow-400/80">
                <AlertTriangle size={12} />
                <span>Demo modu - {walletAddress}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-400/80">
                <ShieldCheck size={12} />
                <span>Bagli: {walletAddress}</span>
              </div>
            )}

            {gasSponsored && (
              <div className="flex items-center gap-2 text-green-400/80">
                <Zap size={12} />
                <span>Gas Sponsoru: {paymasterAddress.slice(0, 8)}...</span>
              </div>
            )}
            {isPremium && !paymasterReady && !isDemoMode && (
              <div className="flex items-center gap-2 text-yellow-400/80">
                <Zap size={12} />
                <span>Paymaster deposu bos, gas sponsorlugu kapali</span>
              </div>
            )}
            {!isDemoMode && !isPremium && (
              <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                <AlertTriangle size={10} />
                <span>Premium degilsiniz, gas kendiniz odersiniz</span>
              </div>
            )}

            {simulationOutput.length > 0 && (
              <>
                <div className="text-purple-400/80 mt-2">
                  $ vonad simulate{isDemoMode ? ' --demo' : ' --live'}{gasSponsored ? ' --paymaster' : ''}
                </div>
                {simulationOutput.map((line, i) => (
                  <div
                    key={i}
                    className="text-green-400/80 animate-[fadeIn_0.3s_ease-out]"
                  >
                    <span className="text-slate-600 mr-1">[{i + 1}]</span>
                    {line}
                  </div>
                ))}
                {isSimulating && (
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
                )}
              </>
            )}

            {simulationComplete && !moduleCompleted && (
              <div className="mt-3 pt-3 border-t border-slate-700/30">
                <div className="text-yellow-400/90 font-medium mb-2">
                  Simulasyon tamamlandi!
                </div>
                {gasSponsored && (
                  <div className="flex items-center gap-1.5 text-green-400 text-[10px] mb-2">
                    <Zap size={10} />
                    <span>Gas sponsorlugu: Platform tarafindan odenir (0 MON)</span>
                  </div>
                )}
                <button
                  onClick={completeModule}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  <Gift size={14} />
                  {isDemoMode
                    ? 'Modulu Tamamla (NFT Demo Modunda Devre Disi)'
                    : gasSponsored
                    ? 'Modulu Tamamla ve NFT Kazan (Gas Sponsoru)'
                    : 'Modulu Tamamla ve NFT Kazan'}
                </button>
              </div>
            )}

            {moduleCompleted && !isDemoMode && address && (
              <MintAction
                topicKey={selectedTopic}
                address={address}
                setShowShareModal={setShowShareModal}
                setShareData={setShareData}
              />
            )}

            {moduleCompleted && isDemoMode && (
              <div className="mt-3 pt-3 border-t border-slate-700/30">
                <div className="text-yellow-400/90 font-medium mb-1">Demo Tamamlandi!</div>
                <div className="text-green-400/70">
                  Demo rozeti kazanildi! Cuzdan baglayarak gercek NFT mint edebilirsin.
                </div>
              </div>
            )}

            {simulationOutput.length === 0 && !simulationComplete && (
              <div className="text-slate-500 mt-2">
                {t('rightPanel.consoleHint', 'Bloklari dogru sirada baglayin, dogrulayin ve calistirin.')}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-slate-500">$</span>
            <span>{t('rightPanel.consolePlaceholder')}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function MintAction({ topicKey, address, setShowShareModal, setShareData }) {
  const topic = topics[topicKey]
  const moduleName = topic?.modules?.tr?.[0] || topic?.name?.tr || topicKey
  const { setShowAccount } = useApp()

  const { data: mintFee } = useReadContract({
    address: ACHIEVEMENT_NFT_ADDRESS,
    abi: ACHIEVEMENT_NFT_ABI,
    functionName: 'mintFee',
  })

  const { writeContract, isPending, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess, data: receipt } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  })

  const { writeContract: writeLeaderboard, data: lbHash } = useWriteContract()
  const { writeContract: writeUserProgress } = useWriteContract()
  const scoreUpdated = useRef(false)

  const feeNumeric = mintFee ? Number(formatEther(mintFee)) : 0.001

  const mintedTokenId = useMemo(() => {
    if (!isSuccess || !receipt) return null
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: ACHIEVEMENT_NFT_ABI,
          data: log.data,
          topics: log.topics,
        })
        if (decoded.eventName === 'AchievementMinted') {
          return decoded.args.tokenId?.toString()
        }
      } catch { /* event parse error */ }
    }
    return null
  }, [isSuccess, receipt])

  const handleMint = () => {
    writeContract({
      address: ACHIEVEMENT_NFT_ADDRESS,
      abi: ACHIEVEMENT_NFT_ABI,
      functionName: 'mintAchievement',
      args: [address, moduleName, topicKey],
      value: mintFee || parseEther('0.001'),
    })
  }

  useEffect(() => {
    if (isSuccess && receipt && !scoreUpdated.current) {
      scoreUpdated.current = true
      writeLeaderboard({
        address: LEADERBOARD_ADDRESS,
        abi: LEADERBOARD_ABI,
        functionName: 'updateScore',
        args: [address, topicKey, moduleName],
      })
      writeUserProgress({
        address: USER_PROGRESS_ADDRESS,
        abi: USER_PROGRESS_ABI,
        functionName: 'completeModule',
        args: [topicKey, moduleName],
      })
    }
  }, [isSuccess, receipt])

  if (isSuccess && receipt) {
    return (
      <div className="mt-3 pt-3 border-t border-slate-700/30 space-y-2">
        <div className="text-green-400/90 font-medium text-xs">
          NFT basariyla mint edildi!
          {mintedTokenId && <span className="text-purple-400 ml-1">#{mintedTokenId}</span>}
        </div>
        <button
          onClick={() => {
            setShareData({ topicKey, moduleName, tokenId: mintedTokenId || '?', txHash: hash })
            setShowShareModal(true)
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-xs font-medium transition-colors"
        >
          <Gift size={14} />
          Paylas ve Devam Et
        </button>
        <button
          onClick={() => setShowAccount(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
        >
          <Layers size={14} />
          Hesabimda Stake Et
        </button>
      </div>
    )
  }

  if (isPending || isConfirming) {
    return (
      <div className="mt-3 pt-3 border-t border-slate-700/30">
        <div className="flex items-center gap-2 text-purple-400">
          <Loader2 size={14} className="animate-spin" />
          <span className="text-xs">
            {isConfirming ? 'Islem onaylaniyor...' : 'Cuzdanda onay bekleniyor...'}
          </span>
        </div>
        {hash && (
          <div className="text-slate-600 text-[10px] mt-1 font-mono truncate">
            TX: {hash.slice(0, 14)}...
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-3 pt-3 border-t border-slate-700/30">
      <div className="text-yellow-400/90 font-medium text-xs mb-1">
        Modul tamamlandi!
      </div>
      <div className="text-slate-400 text-[10px] mb-3">
        NFT mint etmek icin onay verin ({feeNumeric} MON mint ucreti)
      </div>
      <button
        onClick={handleMint}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium hover:from-yellow-600 hover:to-orange-600 transition-all"
      >
        <Coins size={14} />
        Gercek NFT Kazan
      </button>
    </div>
  )
}
