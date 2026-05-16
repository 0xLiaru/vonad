import { useMemo } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useAccount, useReadContract } from 'wagmi'
import { Lock, Unlock } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { topics } from '../../data/topics.js'
import { PREMIUM_SUBSCRIPTION_ABI } from '../../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS } from '../../contracts/addresses.js'

export default function BlockPalette() {
  const { selectedTopic } = useApp()
  const { address } = useAccount()
  const lang = 'tr'

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const blocks = useMemo(() => {
    if (!selectedTopic) return []
    return topics[selectedTopic].blocks
  }, [selectedTopic])

  if (!selectedTopic) return null

  return (
    <div className="w-52 border-r border-slate-700/30 bg-slate-900/20 flex flex-col shrink-0">
      <div className="h-9 border-b border-slate-700/30 flex items-center px-3 bg-slate-900/30">
        <span className="text-slate-400 text-xs font-medium">
          {lang === 'tr' ? 'Blok Paleti' : 'Block Palette'}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {blocks.map((block) => (
          <PaletteBlock key={block.id} block={block} isPremium={isPremium} />
        ))}
      </div>
    </div>
  )
}

function PaletteBlock({ block, isPremium }) {
  const isLocked = block.locked && !isPremium

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${block.id}`,
    data: { type: 'palette', blockId: block.id },
    disabled: isLocked,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm cursor-grab active:cursor-grabbing transition-colors ${
        isLocked
          ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
          : isDragging
          ? 'bg-purple-500/20 text-purple-300 shadow-lg ring-1 ring-purple-500/50'
          : 'bg-slate-800 hover:bg-slate-700/80 text-slate-300'
      }`}
    >
      <span className="text-base">{block.icon}</span>
      <span className="flex-1 text-xs">{block.name.tr}</span>
      {isLocked && <Lock size={10} className="text-slate-600 shrink-0" />}
      {block.locked && isPremium && <Unlock size={10} className="text-green-400 shrink-0" />}
    </div>
  )
}
