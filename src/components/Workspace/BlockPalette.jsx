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
    <div className="w-52 border-r border-slate-700/30 bg-slate-900/20 flex flex-col shrink-0">
      <div className="h-9 border-b border-slate-700/30 flex items-center px-3 bg-slate-900/30">
        <span className="text-slate-400 text-xs font-medium">Blok Paleti</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {blocks.map((block) => {
          if (placedIds.has(block.id)) return null
          return (
            <PaletteBlock key={block.id} block={block} isPremium={isPremium} />
          )
        })}
        {blocks.length === 0 && (
          <p className="text-slate-600 text-xs text-center py-4">Blok yok</p>
        )}
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
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm cursor-grab active:cursor-grabbing transition-all border ${
        isLocked
          ? 'bg-slate-800/20 border-slate-700/20 text-slate-600 cursor-not-allowed'
          : isDragging
          ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 scale-105 shadow-lg shadow-purple-500/10'
          : 'bg-slate-800/50 border-slate-700/30 text-slate-300 hover:border-slate-600 hover:bg-slate-700/50'
      }`}
    >
      <Icon size={15} className={isLocked ? 'text-slate-600' : isDragging ? 'text-purple-400' : 'text-slate-400'} />
      <span className="flex-1 text-[11px] leading-tight">{block.name?.tr || block.id}</span>
      {isLocked && <Lock size={10} className="text-slate-600 shrink-0" />}
      {block.locked && isPremium && <Unlock size={10} className="text-green-400 shrink-0" />}
    </div>
  )
}
