import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useReadContract } from 'wagmi'
import { Search, ArrowLeft, Lock, Unlock } from 'lucide-react'
import { topics, allTopicKeys, difficultyLabels, difficultyColors } from '../data/topics.js'
import { useApp } from '../context/AppContext.jsx'
import { getBlockIcon } from '../data/topicIcons.js'
import { PREMIUM_SUBSCRIPTION_ABI } from '../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS } from '../contracts/addresses.js'

export default function LeftPanel() {
  const { i18n } = useTranslation()
  const { selectedTopic, selectTopic, clearTopic } = useApp()
  const [search, setSearch] = useState('')
  const lang = i18n.language || 'tr'
  const { address } = useAccount()

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  })

  const filteredTopics = useMemo(() => {
    const keys = allTopicKeys || []
    if (!search.trim()) return keys
    const q = search.toLowerCase()
    return keys.filter((key) => {
      const topic = topics[key]
      return (
        (topic.name.tr || '').toLowerCase().includes(q) ||
        (topic.name.en || '').toLowerCase().includes(q) ||
        (topic.shortDesc.tr || '').toLowerCase().includes(q) ||
        (topic.shortDesc.en || '').toLowerCase().includes(q)
      )
    })
  }, [search])

  const isFree = (k) => k === 'Wallet' || k === 'Token'
  const isUnlocked = (k) => isFree(k) || isPremium

  if (selectedTopic) {
    const topic = topics[selectedTopic]
    return (
      <aside className="w-72 border-r border-slate-600/50 bg-slate-900/60 flex flex-col shrink-0">
        <div className="p-3 border-b border-slate-700/30 flex items-center gap-2">
          <button onClick={clearTopic} className="text-white hover:text-purple-400 transition-colors p-1" title="Back">
            <ArrowLeft size={16} />
          </button>
          <span className="text-white font-bold text-sm">{topic.name[lang] || selectedTopic}</span>
          <span className="ml-auto text-white text-[10px] px-1.5 py-0.5 rounded-full border border-slate-600 bg-slate-800">
            {difficultyLabels[topic.difficulty]?.[lang] || ''}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-slate-300 text-xs leading-relaxed mb-4">{topic.shortDesc[lang]}</p>
          <p className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Blocks</p>
          <div className="space-y-1.5">
            {(topic.blocks || []).map((block) => {
              const locked = block.locked && !isPremium
              const Icon = getBlockIcon(block.id)
              return (
                <div key={block.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs ${
                    locked ? 'bg-slate-800/30 text-slate-500' : 'bg-slate-800/70 text-white border border-slate-600/30'
                  }`}>
                  <Icon size={14} className={locked ? 'text-slate-500' : 'text-purple-400 shrink-0'} />
                  <span className="flex-1 truncate font-medium">{block.name[lang] || block.id}</span>
                  {locked && <Lock size={10} className="text-slate-500 shrink-0" />}
                  {block.locked && isPremium && <Unlock size={10} className="text-green-400 shrink-0" />}
                </div>
              )
            })}
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-72 border-r border-slate-600/50 bg-slate-900/60 flex flex-col shrink-0">
      <div className="p-3 border-b border-slate-700/30">
        <p className="text-white font-bold text-sm mb-2">Topics</p>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 border border-slate-600/50" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {filteredTopics.map((key) => {
          const topic = topics[key]
          return (
            <button key={key} onClick={() => selectTopic(key)}
              className="w-full text-left px-3 py-2.5 rounded-lg transition-colors border border-transparent mb-1 hover:bg-slate-800 hover:border-slate-600/50">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-lg w-8 text-center">{key[0]}{key.length > 3 ? key[1] : ''}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold">{topic.name[lang] || key}</span>
                    {!isUnlocked(key) && <Lock size={10} className="text-yellow-400 shrink-0" />}
                  </div>
                  <p className="text-slate-300 text-xs truncate mt-0.5">{topic.shortDesc[lang]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1.5 ml-12">
                <span className="text-white text-[10px] px-1.5 py-0.5 rounded-full border border-slate-600 bg-slate-800">
                  {difficultyLabels[topic.difficulty]?.[lang] || ''}
                </span>
                {!isUnlocked(key) && (
                  <span className="text-yellow-300 text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30">Premium</span>
                )}
                {isFree(key) && (
                  <span className="text-green-300 text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 border border-green-500/30">Free</span>
                )}
              </div>
            </button>
          )
        })}
        {filteredTopics.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No topics</p>}
      </div>
    </aside>
  )
}

