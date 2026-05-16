import { useState, useCallback } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { useTranslation } from 'react-i18next'
import { Blocks, CheckCircle, XCircle, Play } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import BlockPalette from './Workspace/BlockPalette'
import Canvas from './Workspace/Canvas'

export default function Workspace() {
  const { t } = useTranslation()
  const {
    selectedTopic,
    canvasBlocks,
    addBlockToCanvas,
    reorderCanvasBlocks,
    validation,
    validateCanvas,
    isSimulating,
    simulationComplete,
    startSimulation,
  } = useApp()
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)

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

      if (activeData?.type === 'palette') {
        if (over.id === 'canvas') {
          addBlockToCanvas(activeData.blockId)
        }
        return
      }

      if (activeData?.type === 'canvas') {
        const overData = over.data.current
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
              {t('workspace.validate') || 'Doğrula'}
            </button>
            {canRun && (
              <button
                onClick={startSimulation}
                className="text-xs px-3 py-1 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-1.5"
              >
                <Play size={12} />
                Çalıştır
              </button>
            )}
            {isSimulating && (
              <span className="text-xs px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 animate-pulse">
                Çalışıyor...
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
          {selectedTopic && <BlockPalette />}
          <Canvas activeId={activeId} overId={overId} />
        </div>
      </DndContext>

      {validation && (
        <div
          className={`mx-4 mb-3 p-3 rounded-lg flex items-start gap-2 text-sm ${
            validation.valid
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {validation.valid ? <CheckCircle size={16} className="shrink-0 mt-0.5" /> : <XCircle size={16} className="shrink-0 mt-0.5" />}
          <span>{validation.text.tr}</span>
        </div>
      )}
    </main>
  )
}
