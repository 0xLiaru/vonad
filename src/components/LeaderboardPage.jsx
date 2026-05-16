import { useMemo, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { X, Trophy, Medal, Layers, Gift, BookOpen, TrendingUp } from 'lucide-react'
import { LEADERBOARD_ABI } from '../contracts/abis.js'
import { LEADERBOARD_ADDRESS } from '../contracts/addresses.js'
import { SkeletonLine } from './Skeleton.jsx'

const TABS = [
  { key: 0, icon: Layers, label: { tr: 'Modules', en: 'Most Modules' } },
  { key: 1, icon: Gift, label: { tr: 'NFTs', en: 'Most NFTs' } },
  { key: 2, icon: BookOpen, label: { tr: 'Topics', en: 'Most Topics' } },
]

export default function LeaderboardPage({ open, onClose }) {
  const [tab, setTab] = useState(0)
  const { address } = useAccount()

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl h-[85vh] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50 shrink-0">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-yellow-400" />
              <h2 className="text-white font-semibold">Leaderboard</h2>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex border-b border-slate-700/50 shrink-0">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                  tab === t.key
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <t.icon size={13} />
                {t.label.tr}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <TopList category={tab} address={address} />
          </div>
        </div>
      </div>
    </>
  )
}

function TopList({ category, address }) {
  const { data: topUsers } = useReadContract({
    address: LEADERBOARD_ADDRESS,
    abi: LEADERBOARD_ABI,
    functionName: 'getTopUsers',
    args: [20n, category],
  })

  const { data: userRank } = useReadContract({
    address: LEADERBOARD_ADDRESS,
    abi: LEADERBOARD_ABI,
    functionName: 'getUserRank',
    args: address ? [address, category] : undefined,
    query: { enabled: !!address },
  })

  const users = topUsers?.[0] || []
  const scores = topUsers?.[1] || []
  const rank = userRank?.[0] ? Number(userRank[0]) : 0
  const score = userRank?.[1] ? Number(userRank[1]) : 0

  const medals = ['🥇', '🥈', '🥉']

  if (!topUsers) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <SkeletonLine className="w-6" />
            <SkeletonLine className="w-20" />
            <SkeletonLine className="w-12 ml-auto" />
          </div>
        ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy size={32} className="text-slate-600 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Henuz kimse modul tamamlamadi.</p>
        <p className="text-slate-600 text-xs mt-1">Be first!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        {users.map((userAddr, i) => (
          <LeaderboardRow
            key={userAddr}
            rank={i + 1}
            address={userAddr}
            score={Number(scores[i] || 0)}
            isMe={address && userAddr.toLowerCase() === address.toLowerCase()}
            medal={i < 3 ? medals[i] : null}
          />
        ))}
      </div>

      {address && rank > 0 && rank > users.length && (
        <div className="pt-4 border-t border-slate-700/30">
          <p className="text-slate-500 text-xs mb-2 text-center">Your Rank</p>
          <LeaderboardRow
            rank={rank}
            address={address}
            score={score}
            isMe
          />
        </div>
      )}

      {address && rank === 0 && (
        <div className="pt-4 border-t border-slate-700/30 text-center">
          <p className="text-slate-500 text-xs">
            No score yet
          </p>
        </div>
      )}
    </div>
  )
}

function LeaderboardRow({ rank, address: userAddr, score, isMe, medal }) {
  const shortAddr = `${userAddr.slice(0, 6)}...${userAddr.slice(-4)}`

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        isMe ? 'bg-purple-500/10 border border-purple-500/20' : 'hover:bg-slate-800/50'
      }`}
    >
      <span className="w-8 text-center font-mono text-xs text-slate-500 shrink-0">
        {medal || `#${rank}`}
      </span>
      <div className="flex-1 min-w-0">
        <span className={`font-mono text-xs ${isMe ? 'text-purple-400' : 'text-slate-300'}`}>
          {shortAddr}
        </span>
        {isMe && <span className="text-purple-400 text-[10px] ml-1.5">(You)</span>}
      </div>
      <span className="font-mono text-xs font-bold text-slate-200 shrink-0">
        {score}
      </span>
    </div>
  )
}

