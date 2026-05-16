import { useState, useCallback } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { useTranslation } from 'react-i18next'
import { Blocks, Play, CheckCircle, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { topics } from '../data/topics.js'
import BlockPalette from './Workspace/BlockPalette'
import Canvas from './Workspace/Canvas'

export default function Workspace() {
  const { t } = useTranslation()
  const {
    selectedTopic,
    canvasBlocks,
    addBlockToCanvas,
    reorderCanvasBlocks,
    removeBlockFromCanvas,
    validation,
    validateCanvas,
    isSimulating,
    simulationComplete,
    startSimulation,
  } = useApp()
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)
  const [wrongDrop, setWrongDrop] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id)
  }, [])

  const handleDragOver = useCallback((event) => {
    setOverId(event.over?.id || null)
  }, [])

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event
      setActiveId(null)
      setOverId(null)

      if (!over) return

      const activeData = active.data.current
      const overData = over.data.current

      if (activeData?.type === 'palette') {
        const blockId = activeData.blockId

        if (overData?.type === 'slot') {
          const slotTargetId = overData.targetId
          if (blockId === slotTargetId) {
            addBlockToCanvas(blockId)
          } else {
            setWrongDrop(blockId)
            setTimeout(() => setWrongDrop(null), 600)
          }
        }
        return
      }

      if (activeData?.type === 'canvas') {
        if (overData?.type === 'canvas') {
          const fromIndex = activeData.index
          const toIndex = overData.index
          if (fromIndex !== toIndex) {
            reorderCanvasBlocks(fromIndex, toIndex)
          }
        }
      }
    },
    [addBlockToCanvas, reorderCanvasBlocks]
  )

  const canRun = validation?.valid && !isSimulating && !simulationComplete

  return (
    <main className="flex-1 flex flex-col bg-slate-950 min-w-0">
      <div className="h-10 border-b border-slate-700/30 flex items-center justify-between px-4 bg-slate-900/30 shrink-0">
        <div className="flex items-center gap-2">
          <Blocks size={14} className="text-purple-400" />
          <span className="text-slate-400 text-xs font-medium">{t('workspace.title')}</span>
        </div>
        {canvasBlocks.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={validateCanvas}
              disabled={isSimulating}
              className="text-xs px-3 py-1 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {t('workspace.validate') || 'Dogrula'}
            </button>
            {canRun && (
              <button
                onClick={startSimulation}
                className="text-xs px-3 py-1 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-1.5"
              >
                <Play size={12} />
                Calistir
              </button>
            )}
            {isSimulating && (
              <span className="text-xs px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 animate-pulse">
                Calisiyor...
              </span>
            )}
          </div>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex min-h-0">
          {selectedTopic ? <Canvas activeId={activeId} overId={overId} /> : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-900/50">
                  <Blocks size={24} className="text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">Sol panelden bir konu secin</p>
              </div>
            </div>
          )}
        </div>
      </DndContext>

      {wrongDrop && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs px-4 py-2 rounded-lg animate-[fadeIn_0.3s_ease-out] z-50">
          Yanlis slot! Bu blogu dogru slota surukleyin.
        </div>
      )}

      {validation && (
        <div
          className={`mx-4 mb-3 p-3 rounded-lg flex items-start gap-2 text-sm ${
            validation.valid
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {validation.valid ? <CheckCircle size={16} className="shrink-0 mt-0.5" /> : <XCircle size={16} className="shrink-0 mt-0.5" />}
          <span>{validation.text?.tr || ''}</span>
        </div>
      )}
    </main>
  )
}
