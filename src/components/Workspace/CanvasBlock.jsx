import { useDraggable } from '@dnd-kit/core'
import { GripVertical, X } from 'lucide-react'

export default function CanvasBlock({ block, index, onRemove, blockRef, isActive, isOver }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: block.id,
    data: { type: 'canvas', blockId: block.id, index },
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined

  return (
    <div
      ref={(el) => {
        setNodeRef(el)
        if (blockRef) blockRef(el)
      }}
      style={style}
      className={`relative group rounded-xl border transition-all ${
        isActive
          ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10 scale-105'
          : 'border-slate-700/50 bg-slate-800/80 hover:border-slate-600'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          {...listeners}
          {...attributes}
          className="text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} />
        </button>
        <span className="text-lg">{block.icon}</span>
        <span className="flex-1 text-sm text-slate-200 font-medium">{block.name?.tr}</span>
        <span className="text-[10px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">
          #{index + 1}
        </span>
        <button
          onClick={() => onRemove(block.id)}
          className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
