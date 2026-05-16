import { useDroppable } from '@dnd-kit/core'
import { useApp } from '../../context/AppContext.jsx'
import { getBlockIcon, getTopicColor } from '../../data/topicIcons.js'
import BlockPalette from './BlockPalette'
import { Check, Lock, ArrowDown, Blocks } from 'lucide-react'

export default function Canvas({ activeId, overId }) {
  const { selectedTopic, topicSteps, currentStep, completedSteps, stepResults } = useApp()

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

  const colors = getTopicColor(selectedTopic)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-3 border-b border-slate-700/30 shrink-0">
        <p className="text-white font-semibold text-sm">Calisma Alani</p>
      </div>
      <div className="flex-1 flex min-h-0">
        <BlockPalette />
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg space-y-2">
            {topicSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index)
              const isActive = index === currentStep && !isCompleted
              const isLocked = index > currentStep
              const result = stepResults[index]

              return (
                <StepSlot
                  key={index}
                  index={index}
                  step={step}
                  isCompleted={isCompleted}
                  isActive={isActive}
                  isLocked={isLocked}
                  result={result}
                  colors={colors}
                  activeId={activeId}
                  overId={overId}
                  isLast={index === topicSteps.length - 1}
                  totalSteps={topicSteps.length}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function StepSlot({ index, step, isCompleted, isActive, isLocked, result, colors, activeId, overId, isLast, totalSteps }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${index}`,
    data: { type: 'slot', slotIndex: index, targetId: step.id },
  })

  const isHovered = isOver || overId === `slot-${index}`
  const isActiveDrag = activeId === `palette-${step.id}`
  const isValidTarget = isActiveDrag && isHovered
  const StepIcon = getBlockIcon(step.id)

  return (
    <div ref={setNodeRef} className="flex flex-col items-center">
      <div
        className={`w-full rounded-xl border-2 transition-all min-h-[52px] ${
          isCompleted
            ? 'border-green-500/40 bg-green-500/5'
            : isActive && isValidTarget
            ? `border-solid ${colors.border} ${colors.bg} shadow-lg scale-[1.02]`
            : isActive
            ? 'border-dashed border-blue-500/40 bg-blue-500/5 animate-pulse'
            : isLocked
            ? 'border-dashed border-slate-700/20 bg-slate-900/10 opacity-50'
            : 'border-dashed border-slate-700/30 bg-slate-900/20'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            isCompleted ? 'bg-green-500/20' : isActive ? colors.bg : 'bg-slate-800/50'
          }`}>
            {isCompleted ? <Check size={15} className="text-green-400" />
              : isLocked ? <Lock size={13} className="text-slate-600" />
              : <StepIcon size={15} className={isActive ? colors.text : 'text-slate-500'} />}
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-sm font-medium block truncate ${
              isCompleted ? 'text-green-400' : isActive ? 'text-white' : 'text-slate-600'
            }`}>
              {index + 1}. {step.label?.tr || step.id}
            </span>
            {step.desc?.tr && !isLocked && (
              <span className="text-[10px] text-slate-500">{step.desc.tr}</span>
            )}
            {result?.hash && (
              <a
                href={`https://testnet.monadexplorer.com/tx/${result.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-purple-400 hover:text-purple-300 font-mono truncate block mt-0.5"
              >
                TX: {result.hash.slice(0, 10)}...
              </a>
            )}
          </div>
          <span className="text-[10px] text-slate-700 bg-slate-900/50 px-1.5 py-0.5 rounded font-mono shrink-0">
            {index + 1}/{totalSteps}
          </span>
        </div>
      </div>

      {!isLast && (
        <div className="flex justify-center py-1">
          <div className={`w-0.5 h-6 bg-gradient-to-b ${
            isCompleted ? 'from-green-500/40 to-green-500/10' :
            isActive ? 'from-blue-500/40 to-slate-700/10' :
            'from-slate-700/20 to-slate-700/10'
          }`} />
        </div>
      )}
    </div>
  )
}
