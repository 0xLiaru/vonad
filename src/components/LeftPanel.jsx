import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useReadContract } from 'wagmi'
import { Search, ChevronRight, ArrowLeft, Lock, Unlock } from 'lucide-react'
import { topics, allTopicKeys, difficultyLabels, difficultyColors } from '../data/topics.js'
import { useApp } from '../context/AppContext.jsx'
import { PREMIUM_SUBSCRIPTION_ABI } from '../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS } from '../contracts/addresses.js'

export default function LeftPanel() {
  const { t, i18n } = useTranslation()
  const { selectedTopic, selectTopic, clearTopic, canvasBlocks } = useApp()
  const [search, setSearch] = useState('')
  const lang = i18n.language
  const { address } = useAccount()

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const filteredTopics = useMemo(() => {
    if (!search.trim()) return allTopicKeys || []
    const q = search.toLowerCase()
    return (allTopicKeys || []).filter((key) => {
      const topic = topics[key]
      return (
        topic.name.tr.toLowerCase().includes(q) ||
        topic.name.en.toLowerCase().includes(q) ||
        topic.shortDesc.tr.toLowerCase().includes(q) ||
        topic.shortDesc.en.toLowerCase().includes(q)
      )
    })
  }, [search])

  const isFree = (topicKey) => topicKey === 'Wallet' || topicKey === 'Token'

  const isUnlocked = (topicKey) => isFree(topicKey) || isPremium

  if (selectedTopic) {
    const topic = topics[selectedTopic]
    return (
      <aside className="w-72 border-r border-slate-700/50 bg-slate-900/50 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-700/30">
          <button
            onClick={clearTopic}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-3"
          >
            <ArrowLeft size={14} />
            {lang === 'tr' ? 'Geri Dön' : 'Back'}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">{topic.icon}</span>
            <h3 className="text-white font-semibold text-sm">{topic.name[lang]}</h3>
          </div>
          <span
            className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${difficultyColors[topic.difficulty]}`}
          >
            {difficultyLabels[topic.difficulty][lang]}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-slate-400 text-xs leading-relaxed">{topic.shortDesc[lang]}</p>
          <div className="mt-4">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
              {lang === 'tr' ? 'Bloklar' : 'Blocks'}
            </p>
            <div className="space-y-1.5">
              {(topic.blocks || []).map((block) => (
                <div
                  key={block.id}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs ${
                    block.locked && !isPremium
                      ? 'bg-slate-800/50 text-slate-600'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{block.icon}</span>
                  <span className="flex-1">{block.name[lang]}</span>
                  {block.locked && !isPremium && <Lock size={10} className="text-slate-600" />}
                  {block.locked && isPremium && <Unlock size={10} className="text-green-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-72 border-r border-slate-700/50 bg-slate-900/50 flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-700/30">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('leftPanel.search')}
            className="w-full bg-slate-800 text-slate-200 placeholder-slate-500 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 border border-slate-700/50"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3 px-2">
          {t('leftPanel.categories')}
        </p>
        <nav className="space-y-1">
          {filteredTopics.map((key) => {
            const topic = topics[key]
            return (
              <button
                key={key}
                onClick={() => selectTopic(key)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200 text-sm font-medium">{topic.name[lang]}</span>
                      {!isUnlocked(key) && <Lock size={10} className="text-slate-600 shrink-0" />}
                    </div>
                    <p className="text-slate-500 text-xs truncate mt-0.5">{topic.shortDesc[lang]}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-600 group-hover:text-purple-400 transition-colors shrink-0" />
                </div>
                <div className="flex items-center gap-2 mt-2 ml-8">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${difficultyColors[topic.difficulty]}`}>
                    {difficultyLabels[topic.difficulty][lang]}
                  </span>
                  {!isUnlocked(key) && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
                      Premium
                    </span>
                  )}
                </div>
              </button>
            )
          })}
          {filteredTopics.length === 0 && (
            <p className="text-slate-600 text-sm text-center py-8">
              {lang === 'tr' ? 'Konu bulunamadı' : 'No topics found'}
            </p>
          )}
        </nav>
      </div>
    </aside>
  )
}
