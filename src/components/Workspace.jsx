import { useState, useCallback } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { useApp } from '../context/AppContext.jsx'
import { topics } from '../data/topics.js'
import { CheckCircle, XCircle } from 'lucide-react'
import Canvas from './Workspace/Canvas'

export default function Workspace() {
  const {
    selectedTopic,
    canvasBlocks,
    addBlockToCanvas,
    validation,
    validateCanvas,
    isSimulating,
    simulationComplete,
    startSimulation,
  } = useApp()
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)
  const [wrongDrop, setWrongDrop] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const handleDragStart = useCallback((event) => setActiveId(event.active.id), [])
  const handleDragOver = useCallback((event) => setOverId(event.over?.id || null), [])

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event
    setActiveId(null)
    setOverId(null)
    if (!over) return

    const ad = active.data.current
    const od = over.data.current
    if (ad?.type === 'palette' && od?.type === 'slot') {
      if (ad.blockId === od.targetId) {
        addBlockToCanvas(ad.blockId)
      } else {
        setWrongDrop(ad.blockId)
        setTimeout(() => setWrongDrop(null), 700)
      }
    }
  }, [addBlockToCanvas])

  const allFilled = selectedTopic && canvasBlocks.filter(Boolean).length === (topics[selectedTopic]?.solution?.length || 0)

  return (
    <main className="flex-1 flex flex-col bg-slate-950 min-w-0 relative">
      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="flex-1 flex min-h-0">
          <Canvas activeId={activeId} overId={overId} />
        </div>

        {wrongDrop && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs px-4 py-2 rounded-lg z-50 animate-[fadeIn_0.3s_ease-out]">
            Yanlis slot! Dogru slota surukleyin.
          </div>
        )}

        {validation && (
          <div className={`mx-4 mb-3 p-3 rounded-lg flex items-start gap-2 text-sm ${validation.valid ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
            {validation.valid ? <CheckCircle size={16} className="shrink-0 mt-0.5" /> : <XCircle size={16} className="shrink-0 mt-0.5" />}
            <span className="text-xs">{validation.text?.tr || ''}</span>
          </div>
        )}
      </DndContext>

      {selectedTopic && (
        <div className="h-10 border-t border-slate-700/30 flex items-center justify-between px-4 bg-slate-900/30 shrink-0">
          <span className="text-slate-500 text-xs">
            {canvasBlocks.filter(Boolean).length} / {topics[selectedTopic]?.solution?.length || 0} blok yerlestirildi
          </span>
          <div className="flex items-center gap-2">
            <button onClick={validateCanvas} disabled={!allFilled || isSimulating}
              className="text-xs px-3 py-1 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Dogrula
            </button>
            {allFilled && validation?.valid && !simulationComplete && (
              <button onClick={startSimulation} disabled={isSimulating}
                className="text-xs px-4 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50">
                {isSimulating ? 'Calisiyor...' : 'Calistir'}
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
