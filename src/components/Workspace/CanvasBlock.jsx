import { X } from 'lucide-react'

export function PlacedBlock({ block, index, onRemove, topicKey }) {
  const Icon = getBlockIcon(block.id)
  const colors = getTopicColor(topicKey)

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${colors.border} ${colors.bg} animate-[fadeIn_0.3s_ease-out] group`}>
      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
        <Icon size={15} className={colors.text} />
      </div>
      <span className="flex-1 text-sm text-slate-200 font-medium truncate">{block.name?.tr || block.id}</span>
      <span className="text-[10px] text-slate-600 bg-slate-900/50 px-1.5 py-0.5 rounded font-mono shrink-0">
        {index + 1}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(block.id) }}
        className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  )
}


