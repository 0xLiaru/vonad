import { X } from 'lucide-react'
import { getBlockIcon } from '../../data/topicIcons.js'
import { getTopicColor } from '../../data/topicIcons.js'
import { useApp } from '../../context/AppContext.jsx'

export default function CanvasBlock({ block, index, onRemove, isActive, isOver, topicKey }) {
  const Icon = getBlockIcon(block.id)
  const colors = getTopicColor(topicKey)

  return (
    <div
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing group ${
        isActive
          ? `${colors.border} ${colors.bg} scale-105 ${colors.glow}`
          : 'border-slate-700/50 bg-slate-800/80 hover:border-slate-600'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
        <Icon size={16} className={colors.text} />
      </div>
      <span className="flex-1 text-sm text-slate-200 font-medium">{block.name?.tr || block.id}</span>
      <span className="text-[10px] text-slate-600 bg-slate-900/50 px-1.5 py-0.5 rounded font-mono">
        #{index + 1}
      </span>
      {onRemove && (
        <button
          onClick={() => onRemove(block.id)}
          className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export function PlacedBlock({ block, index, onRemove, topicKey }) {
  const Icon = getBlockIcon(block.id)
  const colors = getTopicColor(topicKey)

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${colors.border} ${colors.bg} ${colors.glow} group animate-[fadeIn_0.3s_ease-out]`}
    >
      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
        <Icon size={16} className={colors.text} />
      </div>
      <span className="flex-1 text-sm text-slate-200 font-medium">{block.name?.tr || block.id}</span>
      <span className="text-[10px] text-slate-600 bg-slate-900/50 px-1.5 py-0.5 rounded font-mono">
        #{index + 1}
      </span>
      <button
        onClick={() => onRemove(block.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all"
      >
        <X size={14} />
      </button>
    </div>
  )
}
