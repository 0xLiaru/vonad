import { useDroppable } from '@dnd-kit/core'
import { useApp } from '../../context/AppContext.jsx'
import { topics } from '../../data/topics.js'
import { getBlockIcon, getTopicColor } from '../../data/topicIcons.js'
import { PlacedBlock } from './CanvasBlock'
import BlockPalette from './BlockPalette'
import { ArrowDown } from 'lucide-react'

export default function Canvas({ activeId, overId }) {
  const { selectedTopic, canvasBlocks, removeBlockFromCanvas } = useApp()

  if (!selectedTopic) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-900/50">
            <ArrowDown size={24} className="text-slate-600" />
          </div>
          <p className="text-slate-500 text-sm">Sol panelden bir konu secin</p>
        </div>
      </div>
    )
  }

  const topic = topics[selectedTopic]
  const solution = topic?.solution || []
  const colors = getTopicColor(selectedTopic)

  return (
    <div className="flex-1 flex min-h-0">
      <BlockPalette />
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg space-y-4">
          {solution.map((targetId, index) => {
            const placedBlock = canvasBlocks.find((b) => b?.id === targetId)
            const targetBlock = topic.blocks.find((b) => b.id === targetId)
            const isSlotFilled = Boolean(placedBlock)

            return (
              <SlotItem
                key={index}
                slotIndex={index}
                targetId={targetId}
                targetBlock={targetBlock}
                placedBlock={placedBlock}
                isSlotFilled={isSlotFilled}
                colors={colors}
                activeId={activeId}
                overId={overId}
                selectedTopic={selectedTopic}
                onRemove={() => removeBlockFromCanvas(targetId)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function SlotItem({ slotIndex, targetId, targetBlock, placedBlock, isSlotFilled, colors, activeId, overId, selectedTopic, onRemove }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${slotIndex}`,
    data: { type: 'slot', slotIndex, targetId },
  })

  const TargetIcon = targetBlock ? getBlockIcon(targetBlock.id) : null
  const isHovered = isOver || overId === `slot-${slotIndex}`
  const isActiveDrag = activeId === `palette-${targetId}`
  const isValidTarget = isActiveDrag && isHovered

  return (
    <div ref={setNodeRef} className="flex flex-col items-center">
      <div
        className={`w-full rounded-xl border-2 transition-all min-h-[56px] flex items-center ${
          isSlotFilled
            ? `border-dashed ${colors.border} bg-transparent`
            : isValidTarget
            ? `border-solid ${colors.border} ${colors.bg} shadow-lg ${colors.glow} scale-[1.02]`
            : isHovered && !isActiveDrag
            ? 'border-dashed border-red-500/40 bg-red-500/5'
            : 'border-dashed border-slate-700/30 bg-slate-900/20'
        }`}
      >
        {isSlotFilled && placedBlock ? (
          <div className="w-full">
            <PlacedBlock block={placedBlock} index={slotIndex} onRemove={onRemove} topicKey={selectedTopic} />
          </div>
        ) : (
          <div className="flex items-center gap-3 px-4 py-3 w-full">
            <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0 opacity-40`}>
              {TargetIcon && <TargetIcon size={16} className={colors.text} />}
            </div>
            <div className="flex-1">
              <span className="text-slate-500 text-xs">
                Buraya <span className={colors.text}>{targetBlock?.name?.tr || targetId}</span> blogunu surukle
              </span>
            </div>
            <span className="text-[10px] text-slate-700 bg-slate-900/50 px-1.5 py-0.5 rounded font-mono">
              #{slotIndex + 1}
            </span>
          </div>
        )}
      </div>

      {slotIndex < (topics[selectedTopic]?.solution?.length || 1) - 1 && (
        <div className="flex justify-center py-1">
          <div className={`w-0.5 h-6 bg-gradient-to-b ${isSlotFilled ? colors.text + '/40' : 'from-slate-700/30 to-slate-700/10'}`} />
        </div>
      )}
    </div>
  )
}
