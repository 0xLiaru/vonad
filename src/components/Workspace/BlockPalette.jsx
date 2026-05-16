import { useMemo } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useAccount, useReadContract } from 'wagmi'
import { Lock, Unlock } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { topics } from '../../data/topics.js'
import { getBlockIcon } from '../../data/topicIcons.js'
import { PREMIUM_SUBSCRIPTION_ABI } from '../../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS } from '../../contracts/addresses.js'

export default function BlockPalette() {
  const { selectedTopic, canvasBlocks } = useApp()
  const { address } = useAccount()

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const blocks = useMemo(() => {
    if (!selectedTopic) return []
    return topics[selectedTopic]?.blocks || []
  }, [selectedTopic])

  const placedIds = new Set(canvasBlocks.filter(Boolean).map((b) => b.id))

  if (!selectedTopic) return null

  return (
    <div className="w-48 border-r border-slate-700/30 bg-slate-900/20 flex flex-col shrink-0">
      <div className="h-8 border-b border-slate-700/30 flex items-center px-3 bg-slate-900/30">
        <span className="text-slate-400 text-[11px] font-medium">Bloklar</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {blocks.map((block) => {
          if (placedIds.has(block.id)) return null
          return <PaletteBlock key={block.id} block={block} isPremium={isPremium} />
        })}
      </div>
    </div>
  )
}

function PaletteBlock({ block, isPremium }) {
  const isLocked = block.locked && !isPremium
  const Icon = getBlockIcon(block.id)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${block.id}`,
    data: { type: 'palette', blockId: block.id },
    disabled: isLocked,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50, opacity: 0.9 }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing transition-all border min-w-0 ${
        isLocked
          ? 'bg-slate-800/20 border-slate-700/20 text-slate-600 cursor-not-allowed'
          : isDragging
          ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
          : 'bg-slate-800/50 border-slate-700/30 text-slate-300 hover:border-slate-600 hover:bg-slate-700/50'
      }`}
    >
      <Icon size={14} className={isLocked ? 'text-slate-600' : 'text-slate-400 shrink-0'} />
      <span className="text-[11px] leading-tight truncate">{block.name?.tr || block.id}</span>
      {isLocked && <Lock size={10} className="text-slate-600 shrink-0" />}
      {block.locked && isPremium && <Unlock size={10} className="text-green-400 shrink-0" />}
    </div>
  )
}
