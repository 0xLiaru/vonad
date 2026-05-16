import { useState, useCallback, useEffect } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { useConnect, useAccount, useBalance, useSignMessage, useSendTransaction, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useApp } from '../context/AppContext.jsx'
import { topics } from '../data/topics.js'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { ACHIEVEMENT_NFT_ABI, LEADERBOARD_ABI, USER_PROGRESS_ABI } from '../contracts/abis.js'
import { ACHIEVEMENT_NFT_ADDRESS, LEADERBOARD_ADDRESS, USER_PROGRESS_ADDRESS } from '../contracts/addresses.js'
import Canvas from './Workspace/Canvas'

export default function Workspace() {
  const {
    selectedTopic, topicSteps, currentStep, completedSteps,
    completeStep, stepResults, validateCanvas, startSimulation,
    isSimulating, validation, simulationComplete, moduleCompleted, completeModule,
  } = useApp()
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)
  const [txState, setTxState] = useState(null) // { status: 'pending'|'confirming'|'done'|'error', hash?, step? }
  const [wrongDrop, setWrongDrop] = useState(null)

  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { signMessage } = useSignMessage()
  const { sendTransaction } = useSendTransaction()
  const { writeContract } = useWriteContract()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const handleDragStart = useCallback((e) => setActiveId(e.active.id), [])
  const handleDragOver = useCallback((e) => setOverId(e.over?.id || null), [])

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event
    setActiveId(null)
    setOverId(null)
    if (!over) return

    const ad = active.data.current
    const od = over.data.current
    if (ad?.type === 'palette' && od?.type === 'slot') {
      if (ad.blockId === od.targetId && od.slotIndex === currentStep) {
        executeStepAction(ad.blockId)
      } else {
        setWrongDrop(ad.blockId)
        setTimeout(() => setWrongDrop(null), 700)
      }
    }
  }, [currentStep])

  const executeStepAction = useCallback(async (blockId) => {
    const activeStep = topicSteps[currentStep]
    if (!activeStep) return

    setTxState({ status: 'pending', step: currentStep, blockId })

    try {
      // Different actions per block type
      if (blockId === 'wallet-connect') {
        const connector = connectors[0]
        if (!connector) throw new Error('Cuzdan bulunamadi')
        await connect({ connector })
        completeStep({ success: true, blockId, result: 'Cuzdan baglandi' })
        setTxState({ status: 'done', step: currentStep, blockId, result: 'Cuzdan baglandi' })
        return
      }

      if (blockId === 'wallet-sign') {
        if (!isConnected) throw new Error('Once cuzdan baglayin')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        const sig = await signMessage({ message: 'BlockLearn dogrulama' })
        completeStep({ success: true, blockId, hash: sig, result: 'Imza atildi' })
        setTxState({ status: 'done', step: currentStep, blockId, hash: sig, result: 'Imza atildi' })
        return
      }

      if (blockId === 'wallet-balance') {
        if (!isConnected) throw new Error('Once cuzdan baglayin')
        completeStep({ success: true, blockId, result: 'Bakiye okundu' })
        setTxState({ status: 'done', step: currentStep, blockId, result: 'Bakiye okundu' })
        return
      }

      if (blockId === 'wallet-transfer') {
        if (!isConnected) throw new Error('Once cuzdan baglayin')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        sendTransaction({ to: '0x0000000000000000000000000000000000000000', value: parseEther('0.001') }, {
          onSuccess: (hash) => {
            completeStep({ success: true, blockId, hash, result: 'Transfer basarili' })
            setTxState({ status: 'done', step: currentStep, blockId, hash, result: 'Transfer basarili' })
          },
          onError: (err) => {
            setTxState({ status: 'error', step: currentStep, blockId, error: err?.message })
          }
        })
        return
      }

      if (blockId === 'wallet-disconnect') {
        completeStep({ success: true, blockId, result: 'Baglanti kesildi' })
        setTxState({ status: 'done', step: currentStep, blockId, result: 'Baglanti kesildi' })
        return
      }

      // Generic simulation for other blocks
      completeStep({ success: true, blockId, result: 'Tamamlandi' })
      setTxState({ status: 'done', step: currentStep, blockId, result: 'Tamamlandi' })
    } catch (err) {
      setTxState({ status: 'error', step: currentStep, blockId, error: err?.message || 'Islem reddedildi' })
    }
  }, [currentStep, topicSteps, isConnected, connect, connectors, signMessage, sendTransaction, completeStep])

  const allDone = completedSteps.length >= topicSteps.length

  return (
    <main className="flex-1 flex flex-col bg-slate-950 min-w-0 relative">
      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="flex-1 flex min-h-0">
          <Canvas activeId={activeId} overId={overId} />
        </div>

        {wrongDrop && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs px-4 py-2 rounded-lg z-50">
            Yanlis slot! Dogru adima surukleyin.
          </div>
        )}

        {txState?.status === 'pending' && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-blue-500/90 text-white text-xs px-4 py-2 rounded-lg z-50 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Islem baslatiliyor...
          </div>
        )}
        {txState?.status === 'confirming' && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-blue-500/90 text-white text-xs px-4 py-2 rounded-lg z-50 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Cuzdan onayi bekleniyor...
          </div>
        )}
        {txState?.status === 'done' && txState.result && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-green-500/90 text-white text-xs px-4 py-2 rounded-lg z-50 flex items-center gap-2">
            <CheckCircle size={14} />
            {txState.hash
              ? <a href={`https://testnet.monadexplorer.com/tx/${txState.hash}`} target="_blank" rel="noopener noreferrer" className="underline">TX: {txState.hash.slice(0, 10)}...</a>
              : txState.result}
          </div>
        )}
        {txState?.status === 'error' && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs px-4 py-2 rounded-lg z-50 flex items-center gap-2">
            <XCircle size={14} />
            {txState.error || 'Islem reddedildi, tekrar dene'}
          </div>
        )}
      </DndContext>

      {selectedTopic && (
        <div className="h-10 border-t border-slate-700/30 flex items-center justify-between px-4 bg-slate-900/30 shrink-0">
          <span className="text-slate-500 text-xs">
            Tamamlanan: {completedSteps.length} / {topicSteps.length}
          </span>
          <div className="flex items-center gap-2">
            {allDone && !moduleCompleted && (
              <button onClick={completeModule}
                className="text-xs px-4 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
                Modulu Tamamla
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
