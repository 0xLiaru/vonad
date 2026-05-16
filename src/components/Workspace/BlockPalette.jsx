import { useDraggable } from '@dnd-kit/core'
import { useAccount, useReadContract } from 'wagmi'
import { Lock, AlertTriangle, CheckCircle } from 'lucide-react'
import { PREMIUM_SUBSCRIPTION_ABI, USER_PROGRESS_ABI } from '../../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS, USER_PROGRESS_ADDRESS } from '../../contracts/addresses.js'
import { getBlockIcon } from '../../data/topicIcons.js'


export default function BlockPalette({ selectedTopic, topicSteps, currentStep, completedSteps }) {
  const { address, isConnected } = useAccount()

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  })

  const { data: progressCount } = useReadContract({
    address: USER_PROGRESS_ADDRESS,
    abi: USER_PROGRESS_ABI,
    functionName: 'getProgressCount',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 10000 },
  })

  const totalCompleted = Number(progressCount || 0) + completedSteps.length
  const freeLimitReached = !isPremium && totalCompleted >= 5

  if (!selectedTopic || !topicSteps.length) return null

  const activeStep = topicSteps[currentStep]
  if (!activeStep || completedSteps.includes(currentStep)) return null

  const stepBlock = {
    id: activeStep.id,
    name: activeStep.label,
    desc: activeStep.desc?.tr,
    locked: (activeStep.premium && !isPremium) || freeLimitReached,
    alreadyDone: activeStep.id === 'wallet-connect' && isConnected,
    freeLimitReached,
  }

  return (
    <div className="w-52 border-r border-slate-700/30 bg-slate-900/20 flex flex-col shrink-0">
      <div className="h-8 border-b border-slate-700/30 flex items-center px-3 bg-slate-900/30">
        <span className="text-slate-400 text-[11px] font-medium">Adim {currentStep + 1}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <PaletteBlock block={stepBlock} />
        {activeStep.premium && !isPremium && (
          <p className="text-yellow-400 text-[10px] mt-2 text-center">Premium gerekiyor</p>
        )}
        {freeLimitReached && (
          <p className="text-yellow-400 text-[10px] mt-2 text-center flex items-center justify-center gap-1">
            <AlertTriangle size={10} />
            Ucretsiz limit (5) doldu. Premium alin.
          </p>
        )}
      </div>
    </div>
  )
}

function PaletteBlock({ block }) {
  const isLocked = block.locked
  const isAlreadyDone = block.alreadyDone
  const Icon = getBlockIcon(block.id)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${block.id}`,
    data: { type: 'palette', blockId: block.id },
    disabled: isLocked,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined

  if (isAlreadyDone) {
    return (
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-500/10 border-2 border-green-500/40 cursor-grab active:cursor-grabbing hover:bg-green-500/20 transition-all min-w-[180px]">
        <CheckCircle size={24} className="text-green-400" />
        <span className="text-sm text-green-400 font-medium">Cuzdan zaten bagli!</span>
        <span className="text-[10px] text-slate-400 text-center">Surukleyin, otomatik tamamlanir</span>
      </div>
    )
  }

  if (isLocked) {
    return (
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/20 border border-slate-700/20 text-slate-600">
        <Lock size={24} className="text-slate-600" />
        <span className="text-xs text-center text-slate-500">{block.name?.tr || block.id}</span>
        {block.freeLimitReached && (
          <span className="text-[10px] text-yellow-400">Ucretsiz limit doldu</span>
        )}
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all border-2 min-w-[180px] ${
        isDragging
          ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/10 scale-105'
          : 'bg-slate-800/50 border-slate-700/30 hover:border-blue-500/40 hover:bg-slate-700/50'
      }`}
    >
      <Icon size={28} className={isDragging ? 'text-purple-400' : 'text-slate-300'} />
      <span className="text-sm text-white font-medium text-center">{block.name?.tr || block.id}</span>
      {block.desc && (
        <span className="text-[10px] text-slate-400 text-center leading-tight">{block.desc}</span>
      )}
    </div>
  )
}



