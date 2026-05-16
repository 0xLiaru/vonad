import { useDroppable } from '@dnd-kit/core'
import { useApp } from '../../context/AppContext.jsx'
import { topics } from '../../data/topics.js'
import { getBlockIcon, getTopicColor } from '../../data/topicIcons.js'
import BlockPalette from './BlockPalette'
import { PlacedBlock } from './CanvasBlock'
import { Blocks } from 'lucide-react'

export default function Canvas({ activeId, overId }) {
  const { selectedTopic, canvasBlocks, removeBlockFromCanvas } = useApp()

  if (!selectedTopic) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-xs">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-900/30">
            <Blocks size={22} className="text-slate-600" />
          </div>
          <p className="text-slate-400 text-sm font-medium mb-1">Calisma Alani</p>
          <p className="text-slate-600 text-xs">Bloklari surukleyip dogru slotlara yerlestirin</p>
        </div>
      </div>
    )
  }

  const topic = topics[selectedTopic]
  const solution = topic?.solution || []
  const colors = getTopicColor(selectedTopic)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-3 border-b border-slate-700/30 shrink-0">
        <p className="text-white font-semibold text-sm">Calisma Alani</p>
      </div>
      <div className="flex-1 flex min-h-0">
        <BlockPalette />
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg space-y-3">
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
                  isLast={index === solution.length - 1}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function SlotItem({ slotIndex, targetId, targetBlock, placedBlock, isSlotFilled, colors, activeId, overId, selectedTopic, onRemove, isLast }) {
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
        className={`w-full rounded-xl border-2 transition-all min-h-[52px] ${
          isSlotFilled
            ? 'border-dashed border-slate-700/20 bg-transparent'
            : isValidTarget
            ? `border-solid ${colors.border} ${colors.bg} shadow-lg ${colors.glow} scale-[1.02]`
            : isHovered && !isActiveDrag
            ? 'border-dashed border-red-500/40 bg-red-500/5'
            : 'border-dashed border-slate-700/30 bg-slate-900/20'
        }`}
      >
        {isSlotFilled && placedBlock ? (
          <PlacedBlock block={placedBlock} index={slotIndex} onRemove={onRemove} topicKey={selectedTopic} />
        ) : (
          <div className="flex items-center gap-3 px-4 py-3">
            <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0 opacity-50`}>
              {TargetIcon && <TargetIcon size={15} className={colors.text} />}
            </div>
            <span className="text-slate-500 text-xs leading-tight">
              <span className={colors.text + ' font-medium'}>{targetBlock?.name?.tr || targetId}</span>
              {' '}blogunu surukleyin
            </span>
            <span className="text-[10px] text-slate-700 bg-slate-900/50 px-1.5 py-0.5 rounded font-mono ml-auto shrink-0">
              {slotIndex + 1}
            </span>
          </div>
        )}
      </div>

      {!isLast && (
        <div className="flex justify-center py-1">
          <div className={`w-0.5 h-6 bg-gradient-to-b ${isSlotFilled ? colors.text + '/40' : 'from-slate-700/30 to-slate-700/10'}`} />
        </div>
      )}
    </div>
  )
}
