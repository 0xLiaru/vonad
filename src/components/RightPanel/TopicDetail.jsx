import { useTranslation } from 'react-i18next'
import { topics, difficultyLabels, difficultyColors } from '../../data/topics.js'
import { useApp } from '../../context/AppContext.jsx'
import { BookOpen, TrendingUp, Layers, Lightbulb } from 'lucide-react'
import { getTopicIcon } from '../../data/topicIcons.js'


export default function TopicDetail() {
  const { t, i18n } = useTranslation()
  const { selectedTopic } = useApp()
  const lang = i18n.language

  if (!selectedTopic) return null

  const topic = topics[selectedTopic]
  const nextTopic = topics[topic.nextTopic]
  const TopicIcon = getTopicIcon(selectedTopic)

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-5">
        <div className="flex items-start gap-3">
          <TopicIcon size={24} className="text-slate-400 shrink-0 mt-1" />
          <div>
            <h3 className="text-white font-semibold">{topic.name[lang]}</h3>
            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${difficultyColors[topic.difficulty]}`}>
              {difficultyLabels[topic.difficulty][lang]}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-purple-400">
            <Lightbulb size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">
              {lang === 'tr' ? 'Detailslı Açıklama' : 'Detailed Description'}
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">{topic.longDesc[lang]}</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-blue-400">
            <TrendingUp size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">
              {lang === 'tr' ? 'Gerçek Dünya Örneği' : 'Real World Example'}
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">{topic.realWorldExample[lang]}</p>
        </div>

        {nextTopic && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-yellow-400">
              <BookOpen size={14} />
              <span className="text-xs font-medium uppercase tracking-wider">
                {lang === 'tr' ? 'Önerilen Sonraki Konu' : 'Recommended Next Topic'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/30">
              <span>{nextTopic.icon}</span>
              <span className="text-slate-300 text-sm">{nextTopic.name[lang]}</span>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-green-400">
            <Layers size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">
              {lang === 'tr' ? 'Modüller' : 'Modules'}
            </span>
          </div>
          <div className="space-y-1">
            {(topic.modules?.[lang] || []).map((mod, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/30 text-slate-400 text-xs"
              >
                <span className="w-5 h-5 rounded bg-gradient-to-br bg-slate-700/30 flex items-center justify-center text-[10px] text-purple-400 font-medium">
                  {i + 1}
                </span>
                {mod}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}





