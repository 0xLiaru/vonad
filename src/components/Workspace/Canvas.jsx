import { useRef, useEffect } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useApp } from '../../context/AppContext.jsx'
import CanvasBlock from './CanvasBlock'

export default function Canvas({ activeId, overId }) {
  const { canvasBlocks, removeBlockFromCanvas } = useApp()
  const lang = 'tr'
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })

  if (canvasBlocks.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className={`flex-1 flex items-center justify-center transition-colors ${
          isOver ? 'bg-purple-500/5' : ''
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-900/50">
            <span className="text-slate-600 text-xl">📥</span>
          </div>
          <p className="text-slate-500 text-sm">
            {lang === 'tr' ? 'Blokları buraya sürükleyin' : 'Drag blocks here'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={setNodeRef} className={`flex-1 overflow-y-auto p-6 ${isOver ? 'bg-purple-500/5' : ''}`}>
      <div className="max-w-sm mx-auto">
        {canvasBlocks.map((block, index) => (
          <div key={block.id} className="relative">
            <CanvasBlock
              block={block}
              index={index}
              onRemove={removeBlockFromCanvas}
              isActive={activeId === block.id}
              isOver={overId === block.id}
            />
            {index < canvasBlocks.length - 1 && (
              <div className="flex justify-center h-8">
                <div className="w-0.5 h-full bg-gradient-to-b from-purple-500/40 to-blue-500/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
