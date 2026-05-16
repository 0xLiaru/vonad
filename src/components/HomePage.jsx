import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useApp } from '../context/AppContext.jsx'
import { topics, allTopicKeys, difficultyLabels, difficultyColors } from '../data/topics.js'
import { getTopicIcon } from '../data/topicIcons.js'
import { ArrowRight, Crown, Check, Lock, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  const { i18n } = useTranslation()
  const { selectTopic } = useApp()
  const { isConnected } = useAccount()
  const lang = i18n.language

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <HeroSection lang={lang} isConnected={isConnected} selectTopic={selectTopic} />
        <ComparisonSection lang={lang} />
        <TopicsSection lang={lang} selectTopic={selectTopic} />
      </div>
    </div>
  )
}

function HeroSection({ lang, isConnected, selectTopic }) {
  return (
    <div className="text-center space-y-5">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
        <Zap size={12} /> Monad Testnet
      </div>
      <h1 className="text-3xl font-bold text-white">{lang === 'tr' ? "Web3'u Bloklarla Ogren" : 'Learn Web3 with Blocks'}</h1>
      <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
        {lang === 'tr'
          ? 'Blockchain kavramlarini surukle-birak bloklarla ogrenin, simulasyonlarla pratik yapin.'
          : 'Learn blockchain concepts with drag-and-drop blocks and practice with simulations.'}
      </p>
      <button onClick={() => selectTopic('Wallet')}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium text-sm hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/20">
        {lang === 'tr' ? 'Hemen Basla' : 'Get Started'} <ArrowRight size={16} />
      </button>
    </div>
  )
}

function ComparisonSection({ lang }) {
  const features = [
    { label: lang === 'tr' ? 'Temel konular' : 'Basic topics', free: true, premium: true },
    { label: lang === 'tr' ? 'Ileri konular' : 'Advanced topics', free: false, premium: true },
    { label: lang === 'tr' ? 'Simulasyonlar' : 'Simulations', free: true, premium: true },
    { label: lang === 'tr' ? 'NFT rozetleri' : 'NFT badges', free: false, premium: true },
    { label: lang === 'tr' ? 'Gas sponsorlugu' : 'Gas sponsorship', free: false, premium: true },
    { label: lang === 'tr' ? 'Stake indirimi' : 'Staking discount', free: false, premium: true },
  ]

  return (
    <div>
      <h2 className="text-lg font-bold text-white text-center mb-4">{lang === 'tr' ? 'Ucretsiz vs Premium' : 'Free vs Premium'}</h2>
      <div className="overflow-x-auto">
        <table className="w-full max-w-xl mx-auto text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-2 text-slate-400 font-medium text-xs">{lang === 'tr' ? 'Ozellik' : 'Feature'}</th>
              <th className="text-center py-2 text-green-400 font-medium text-xs w-20">{lang === 'tr' ? 'Ucretsiz' : 'Free'}</th>
              <th className="text-center py-2 text-purple-400 font-medium text-xs w-20"><Crown size={11} className="inline mr-1" />Premium</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={i} className="border-b border-slate-700/20">
                <td className="py-2 text-slate-300 text-xs">{f.label}</td>
                <td className="text-center py-2">{f.free ? <Check size={13} className="text-green-400 mx-auto" /> : <Lock size={11} className="text-slate-600 mx-auto" />}</td>
                <td className="text-center py-2">{f.premium ? <Check size={13} className="text-purple-400 mx-auto" /> : <Lock size={11} className="text-slate-600 mx-auto" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TopicsSection({ lang, selectTopic }) {
  const freeTopics = ['Wallet', 'Token']
  const premiumTopics = (allTopicKeys || []).filter((k) => !freeTopics.includes(k))

  return (
    <div>
      <h2 className="text-lg font-bold text-white text-center mb-4">{lang === 'tr' ? 'Tum Konular' : 'All Topics'}</h2>
      <div className="space-y-5">
        <div>
          <h3 className="text-green-400 text-xs font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5"><Shield size={12} />{lang === 'tr' ? 'Ucretsiz' : 'Free'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {freeTopics.map((key) => <TopicCard key={key} topicKey={key} lang={lang} selectTopic={selectTopic} isFree />)}
          </div>
        </div>
        <div>
          <h3 className="text-purple-400 text-xs font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5"><Crown size={12} />Premium</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {premiumTopics.map((key) => <TopicCard key={key} topicKey={key} lang={lang} selectTopic={selectTopic} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function TopicCard({ topicKey, lang, selectTopic, isFree = false }) {
  const topic = topics[topicKey]
  if (!topic) return null
  const Icon = getTopicIcon(topicKey)

  return (
    <button onClick={() => selectTopic(topicKey)}
      className={`text-left p-3 rounded-xl border transition-all hover:scale-[1.01] h-20 flex flex-col justify-between ${
        isFree ? 'bg-slate-800/40 border-green-500/20 hover:border-green-500/40' : 'bg-slate-800/20 border-slate-700/30 hover:border-purple-500/30'
      }`}>
      <div className="flex items-center gap-2.5">
        <Icon size={18} className={isFree ? 'text-green-400' : 'text-purple-400 shrink-0'} />
        <div className="min-w-0 flex-1">
          <span className="text-white text-sm font-medium block truncate">{topic.name[lang]}</span>
          <p className="text-slate-500 text-[11px] truncate">{topic.shortDesc[lang]}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${difficultyColors[topic.difficulty]}`}>
          {difficultyLabels[topic.difficulty][lang]}
        </span>
        <span className="text-[10px] text-slate-600">{topic.blocks.length} blok</span>
      </div>
    </button>
  )
}
