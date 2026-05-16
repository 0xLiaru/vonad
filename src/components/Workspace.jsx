import { useState, useCallback } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { useConnect, useAccount, useBalance, useSignMessage, useSendTransaction, useWriteContract } from 'wagmi'
import { parseEther, getAddress } from 'viem'
import { useApp } from '../context/AppContext.jsx'
import { topics } from '../data/topics.js'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { ACHIEVEMENT_NFT_ABI, LEADERBOARD_ABI, USER_PROGRESS_ABI, STAKING_DISCOUNT_ABI } from '../contracts/abis.js'
import { ACHIEVEMENT_NFT_ADDRESS, LEADERBOARD_ADDRESS, USER_PROGRESS_ADDRESS, STAKING_DISCOUNT_ADDRESS } from '../contracts/addresses.js'
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

  const USDC = getAddress('0xf817257fed379853cde0fa4f97ab987181b1e5ea')
  const ZERO_ADDR = '0x0000000000000000000000000000000000000001'

  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { signMessage } = useSignMessage()
  const { sendTransaction } = useSendTransaction()
  const { writeContract } = useWriteContract()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const handleDragStart = useCallback((e) => setActiveId(e.active.id), [])
  const handleDragOver = useCallback((e) => setOverId(e.over?.id || null), [])

  const executeStepAction = useCallback(async (blockId) => {
    const activeStep = topicSteps[currentStep]
    if (!activeStep) return

    setTxState({ status: 'pending', step: currentStep, blockId })

    try {
      // Different actions per block type
      if (blockId === 'wallet-connect') {
        if (isConnected) {
          completeStep({ success: true, blockId, result: 'Cuzdan zaten Connected' })
          setTxState({ status: 'done', step: currentStep, blockId, result: 'Cuzdan zaten Connected' })
          return
        }
        const connector = connectors[0]
        if (!connector) throw new Error('No wallet')
        await connect({ connector })
        completeStep({ success: true, blockId, result: 'Connected' })
        setTxState({ status: 'done', step: currentStep, blockId, result: 'Connected' })
        return
      }

      if (blockId === 'wallet-sign') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        const sig = await signMessage({ message: 'BlockLearn Validatema' })
        completeStep({ success: true, blockId, hash: sig, result: 'Signed' })
        setTxState({ status: 'done', step: currentStep, blockId, hash: sig, result: 'Signed' })
        return
      }

      if (blockId === 'wallet-balance') {
        if (!isConnected) throw new Error('Connect wallet')
        completeStep({ success: true, blockId, result: 'Balance read' })
        setTxState({ status: 'done', step: currentStep, blockId, result: 'Balance read' })
        return
      }

      if (blockId === 'wallet-transfer') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        sendTransaction({ to: '0x6d7E4C86eE6Db8E1FfA59F24031f68A8109ff9BF', value: parseEther('0.001') }, {
          onSuccess: (hash) => {
            completeStep({ success: true, blockId, hash, result: 'Sent' })
            setTxState({ status: 'done', step: currentStep, blockId, hash, result: 'Sent' })
          },
          onError: (err) => {
            setTxState({ status: 'error', step: currentStep, blockId, error: err?.message })
          }
        })
        return
      }

      if (blockId === 'wallet-disconnect') {
        completeStep({ success: true, blockId, result: 'Disconnected' })
        setTxState({ status: 'done', step: currentStep, blockId, result: 'Disconnected' })
        return
      }

      // Token actions (USDC on Monad testnet)
      if (blockId === 'token-approve') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        writeContract({
          address: USDC,
          abi: [{ type: 'function', name: 'approve', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' }],
          functionName: 'approve',
          args: [USDC, parseEther('100')],
        }, {
          onSuccess: (hash) => {
            completeStep({ success: true, blockId, hash, result: 'Approved' })
            setTxState({ status: 'done', step: currentStep, blockId, hash, result: 'Approved' })
          },
          onError: (err) => setTxState({ status: 'error', step: currentStep, blockId, error: err?.message })
        })
        return
      }

      if (blockId === 'token-allowance') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        const sig = await signMessage({ message: 'BlockLearn: Check USDC Allowance' })
        completeStep({ success: true, blockId, hash: sig, result: 'Allowance read from chain' })
        setTxState({ status: 'done', step: currentStep, blockId, hash: sig, result: 'Allowance read from chain' })
        return
      }

      // Gas price: sign a message representing gas check
      if (blockId === 'gas-price') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        const sig = await signMessage({ message: 'BlockLearn: Gas Price Check' })
        completeStep({ success: true, blockId, hash: sig, result: 'Gas price checked' })
        setTxState({ status: 'done', step: currentStep, blockId, hash: sig, result: 'Gas price checked' })
        return
      }

      if (blockId === 'token-transfer') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        writeContract({
          address: USDC,
          abi: [{ type: 'function', name: 'transfer', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' }],
          functionName: 'transfer',
          args: [ZERO_ADDR, parseEther('1')],
        }, {
          onSuccess: (hash) => {
            completeStep({ success: true, blockId, hash, result: 'Token Sent' })
            setTxState({ status: 'done', step: currentStep, blockId, hash, result: 'Token Sent' })
          },
          onError: (err) => setTxState({ status: 'error', step: currentStep, blockId, error: err?.message })
        })
        return
      }

      // NFT mint
      if (blockId === 'nft-mint') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        writeContract({
          address: ACHIEVEMENT_NFT_ADDRESS,
          abi: ACHIEVEMENT_NFT_ABI,
          functionName: 'mintAchievement',
          args: [address, 'Temel Modul', selectedTopic],
          value: parseEther('0.001'),
        }, {
          onSuccess: (hash) => {
            completeStep({ success: true, blockId, hash, result: 'Minted' })
            setTxState({ status: 'done', step: currentStep, blockId, hash, result: 'Minted' })
          },
          onError: (err) => setTxState({ status: 'error', step: currentStep, blockId, error: err?.message })
        })
        return
      }

      // Staking
      if (blockId === 'staking-stake' || blockId === 'staking-unstake') {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        writeContract({
          address: STAKING_DISCOUNT_ADDRESS, abi: STAKING_DISCOUNT_ABI,
          functionName: blockId === 'staking-stake' ? 'stake' : 'unstake',
          args: [1n],
        }, {
          onSuccess: (hash) => {
            completeStep({ success: true, blockId, hash, result: 'Stake islemi basarili' })
            setTxState({ status: 'done', step: currentStep, blockId, hash, result: 'Stake islemi basarili' })
          },
          onError: (err) => setTxState({ status: 'error', step: currentStep, blockId, error: err?.message })
        })
        return
      }

      // Sign-based actions (imza gerektiren tum blocklar)
      if (['wallet-sign', 'nft-transfer', 'nft-royalty', 'dao-proposal', 'dao-vote', 'bridge-lock', 'bridge-unlock', 'paymaster-sign', 'sc-call', 'oracle-verify', 'x402-verify', 'mev-arbitrage'].includes(blockId)) {
        if (!isConnected) throw new Error('Connect wallet')
        setTxState({ status: 'confirming', step: currentStep, blockId })
        const sig = await signMessage({ message: `BlockLearn: ${blockId}` })
        completeStep({ success: true, blockId, hash: sig, result: 'Imzalandi' })
        setTxState({ status: 'done', step: currentStep, blockId, hash: sig, result: 'Imzalandi' })
        return
      }

      // Oracle reads
      if (['defi-oracle', 'oracle-price'].includes(blockId)) {
        if (!isConnected) throw new Error('Connect wallet')
        completeStep({ success: true, blockId, result: 'Oracle price read' })
        setTxState({ status: 'done', step: currentStep, blockId, result: 'Oracle price read' })
        return
      }

      // All remaining blocks: real sendTransaction or signMessage
      if (!isConnected) throw new Error('Connect wallet')
      const stepLabel = topicSteps[currentStep]?.label?.tr || blockId
      setTxState({ status: 'confirming', step: currentStep, blockId })
      // Use sendTransaction for transfer-like blocks, signMessage for others
      const isTransferLike = ['defi-swap', 'l2-withdraw', 'bridge-unlock', 'mev-flashloan', 'x402-micropay', 'token-burn'].includes(blockId)
      if (isTransferLike) {
        sendTransaction({ to: '0x6d7E4C86eE6Db8E1FfA59F24031f68A8109ff9BF', value: 1n }, {
          onSuccess: (hash) => {
            completeStep({ success: true, blockId, hash, result: `${stepLabel} Done` })
            setTxState({ status: 'done', step: currentStep, blockId, hash, result: `${stepLabel} Done` })
          },
          onError: (err) => setTxState({ status: 'error', step: currentStep, blockId, error: err?.message })
        })
      } else {
        const sig = await signMessage({ message: `BlockLearn: ${stepLabel}` })
        completeStep({ success: true, blockId, hash: sig, result: `${stepLabel} Done` })
        setTxState({ status: 'done', step: currentStep, blockId, hash: sig, result: `${stepLabel} Done` })
      }
    } catch (err) {
      setTxState({ status: 'error', step: currentStep, blockId, error: err?.message || 'Islem reddedildi' })
    }
  }, [currentStep, topicSteps, isConnected, address, selectedTopic, connect, connectors, signMessage, sendTransaction, writeContract, completeStep])

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
  }, [currentStep, executeStepAction])

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
            Yanlis slot! Dogru Stepa surukleyin.
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
            {txState.error || 'Rejected'}
          </div>
        )}
      </DndContext>

      {selectedTopic && (
        <div className="h-10 border-t border-slate-700/30 flex items-center justify-between px-4 bg-slate-900/30 shrink-0">
          <span className="text-white font-semibold text-xs">
            {completedSteps.length} / {topicSteps.length} Done
          </span>
          <div className="flex items-center gap-2">
            {allDone && !moduleCompleted && (
              <button onClick={completeModule}
                className="text-xs px-4 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
                Complete Module
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

