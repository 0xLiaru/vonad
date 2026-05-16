import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useApp } from '../context/AppContext.jsx'
import { topics, allTopicKeys, difficultyLabels, difficultyColors } from '../data/topics.js'
import { ArrowRight, Crown, Check, Lock, Zap, Shield } from 'lucide-react'
import { getTopicIcon } from '../data/topicIcons.js'

export default function HomePage() {
  const { i18n } = useTranslation()
  const { selectTopic } = useApp()
  const { isConnected } = useAccount()
  const lang = i18n.language

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Hero */}
        <HeroSection lang={lang} isConnected={isConnected} selectTopic={selectTopic} />

        {/* Comparison */}
        <ComparisonSection lang={lang} />

        {/* Topic Cards */}
        <TopicsSection lang={lang} selectTopic={selectTopic} />
      </div>
    </div>
  )
}

function HeroSection({ lang, isConnected, selectTopic }) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
        <Zap size={12} />
        Monad Testnet uzerinde
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
        {lang === 'tr'
          ? 'Web3\'ü Bloklarla Öğren'
          : 'Learn Web3 with Blocks'}
      </h1>
      <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
        {lang === 'tr'
          ? 'Blockchain kavramlarını sürükle-bırak bloklarla öğrenin, simülasyonlarla pratik yapın ve başarı rozetleri kazanın.'
          : 'Learn blockchain concepts with drag-and-drop blocks, practice with simulations, and earn achievement badges.'}
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={() => selectTopic('Wallet')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium text-sm hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/20"
        >
          {lang === 'tr' ? 'Hemen Başla' : 'Get Started'}
          <ArrowRight size={16} />
        </button>
        {!isConnected && (
          <span className="text-slate-500 text-xs">
            {lang === 'tr' ? 'Cüzdan bağlamadan demo modunda başlayabilirsiniz' : 'Start in demo mode without a wallet'}
          </span>
        )}
      </div>
    </div>
  )
}

function ComparisonSection({ lang }) {
  const features = [
    { label: lang === 'tr' ? 'Temel konulara erişim' : 'Basic topic access', free: true, premium: true },
    { label: lang === 'tr' ? 'İleri seviye konular' : 'Advanced topics', free: false, premium: true },
    { label: lang === 'tr' ? 'Premium bloklar' : 'Premium blocks', free: false, premium: true },
    { label: lang === 'tr' ? 'Simülasyonlar' : 'Simulations', free: true, premium: true },
    { label: lang === 'tr' ? 'NFT rozetleri (on-chain)' : 'NFT badges (on-chain)', free: false, premium: true },
    { label: lang === 'tr' ? 'Gas sponsorluğu' : 'Gas sponsorship', free: false, premium: true },
    { label: lang === 'tr' ? 'Stake indirimi (%40\'a kadar)' : 'Staking discount (up to 40%)', free: false, premium: true },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white text-center">
        {lang === 'tr' ? 'Ücretsiz vs Premium' : 'Free vs Premium'}
      </h2>
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full max-w-2xl mx-auto text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 text-slate-400 font-medium text-xs">
                {lang === 'tr' ? 'Özellik' : 'Feature'}
              </th>
              <th className="text-center py-3 text-slate-400 font-medium text-xs w-24">
                {lang === 'tr' ? 'Ücretsiz' : 'Free'}
              </th>
              <th className="text-center py-3 text-purple-400 font-medium text-xs w-24">
                <span className="flex items-center justify-center gap-1">
                  <Crown size={12} /> Premium
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={i} className="border-b border-slate-700/20">
                <td className="py-2.5 text-slate-300 text-xs">{f.label}</td>
                <td className="text-center py-2.5">
                  {f.free ? <Check size={14} className="text-green-400 mx-auto" /> : <XCircle />}
                </td>
                <td className="text-center py-2.5">
                  {f.premium ? <Check size={14} className="text-purple-400 mx-auto" /> : <XCircle />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function XCircle() {
  return <Lock size={12} className="text-slate-600 mx-auto" />
}

function TopicsSection({ lang, selectTopic }) {
  const freeTopics = ['Wallet', 'Token']
  const premiumTopics = (allTopicKeys || []).filter((k) => !freeTopics.includes(k))

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white text-center">
        {lang === 'tr' ? 'Tüm Konular' : 'All Topics'}
      </h2>

      <div className="space-y-4">
        <h3 className="text-green-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5">
          <Shield size={12} /> {lang === 'tr' ? 'Ücretsiz Konular' : 'Free Topics'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {freeTopics.map((key) => (
            <TopicCard key={key} topicKey={key} lang={lang} selectTopic={selectTopic} isFree />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-purple-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1.5">
          <Crown size={12} /> {lang === 'tr' ? 'Premium Konular' : 'Premium Topics'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {premiumTopics.map((key) => (
            <TopicCard key={key} topicKey={key} lang={lang} selectTopic={selectTopic} />
          ))}
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
    <button
      onClick={() => selectTopic(topicKey)}
      className={`text-left p-4 rounded-xl border transition-all hover:scale-[1.02] ${
        isFree
          ? 'bg-slate-800/50 border-green-500/20 hover:border-green-500/40'
          : 'bg-slate-800/30 border-slate-700/30 hover:border-purple-500/30'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={24} className="text-slate-400" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">{topic.name[lang]}</span>
            {!isFree && <Crown size={10} className="text-purple-400 shrink-0" />}
          </div>
          <p className="text-slate-500 text-xs truncate mt-0.5">{topic.shortDesc[lang]}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${difficultyColors[topic.difficulty]}`}>
          {difficultyLabels[topic.difficulty][lang]}
        </span>
        <span className="text-[10px] text-slate-600">
          {topic.blocks.length} {lang === 'tr' ? 'blok' : 'blocks'}
        </span>
      </div>
    </button>
  )
}
