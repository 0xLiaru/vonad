import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'viem'
import { Shield, TrendingUp, Layers, Gift, Wallet, Crown, Clock, Loader2, Circle, X, Zap } from 'lucide-react'
import {
  ACHIEVEMENT_NFT_ABI, STAKING_DISCOUNT_ABI, PREMIUM_SUBSCRIPTION_ABI,
  GAS_SPONSOR_PAYMASTER_ABI, LEADERBOARD_ABI, ESCROW_ABI, USER_PROGRESS_ABI
} from '../contracts/abis.js'
import {
  ACHIEVEMENT_NFT_ADDRESS, STAKING_DISCOUNT_ADDRESS, PREMIUM_SUBSCRIPTION_ADDRESS,
  GAS_SPONSOR_PAYMASTER_ADDRESS, LEADERBOARD_ADDRESS, ESCROW_ADDRESS, USER_PROGRESS_ADDRESS
} from '../contracts/addresses.js'
import { topics, allTopicKeys } from '../data/topics.js'
import { getTopicIcon } from '../data/topicIcons.js'

export { AccountPage as default }

function AccountPage({ open, onClose }) {
  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl h-[90vh] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50 shrink-0">
            <h2 className="text-white font-semibold text-lg">Hesabim</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <AccountTabs />
        </div>
      </div>
    </>
  )
}

function AccountTabs() {
  const { address } = useAccount()
  const [tab, setTab] = useState('account')

  const { data: owner } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'owner',
  })

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase()

  return (
    <>
      <div className="flex border-b border-slate-700/50 shrink-0">
        <TabButton active={tab === 'account'} onClick={() => setTab('account')}>
          Hesabim
        </TabButton>
        {isOwner && (
          <TabButton active={tab === 'admin'} onClick={() => setTab('admin')}>
            <Shield size={12} className="mr-1 inline" />
            Admin
          </TabButton>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {tab === 'account' && <AccountContent />}
        {tab === 'admin' && <AdminPanel />}
      </div>
    </>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-xs font-medium transition-colors ${
        active ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      {children}
    </button>
  )
}

function AccountContent() {
  const { address } = useAccount()
  if (!address) {
    return <EmptyState text="Cuzdan baglayarak hesap sayfanizi goruntuleyin." />
  }
  return (
    <>
      <PremiumSection address={address} />
      <NftGrid address={address} />
      <StakingPanel address={address} />
      <ProgressSection address={address} />
    </>
  )
}

function EmptyState({ text }) {
  return <div className="text-slate-500 text-sm text-center py-8">{text}</div>
}

function PremiumSection({ address }) {
  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS, abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium', args: [address],
  })
  const { data: expiry } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS, abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'premiumExpiry', args: [address],
  })

  const expiryDate = expiry ? new Date(Number(expiry) * 1000) : null
  const isActive = isPremium && expiry && Number(expiry) > Date.now() / 1000

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-200 text-sm font-semibold">Premium Durumu</h3>
        <span className="font-mono text-xs text-slate-500">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {isActive ? (
          <>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Crown size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-purple-400 text-sm font-medium">Premium Aktif</p>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                <Clock size={12} />
                <span>Bitis: {expiryDate?.toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <Crown size={20} className="text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm">Premium uyelik aktif degil</p>
          </>
        )}
      </div>
    </div>
  )
}

function NftGrid({ address }) {
  const { data: tokenIds } = useReadContract({
    address: ACHIEVEMENT_NFT_ADDRESS, abi: ACHIEVEMENT_NFT_ABI,
    functionName: 'getUserTokens', args: [address],
  })

  const tokens = (tokenIds || [])

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
      <div className="flex items-center gap-2 mb-4">
        <Gift size={16} className="text-yellow-400" />
        <h3 className="text-slate-200 text-sm font-semibold">NFT'ler ({tokens.length})</h3>
      </div>
      {tokens.length === 0 ? (
        <p className="text-slate-500 text-sm">Henuz NFT yok.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tokens.map((tokenId) => (
            <NftCard key={tokenId.toString()} tokenId={tokenId} />
          ))}
        </div>
      )}
    </div>
  )
}

function NftCard({ tokenId }) {
  const { data: achievement } = useReadContract({
    address: ACHIEVEMENT_NFT_ADDRESS, abi: ACHIEVEMENT_NFT_ABI,
    functionName: 'getAchievement', args: [tokenId],
  })

  const date = achievement?.completedAt
    ? new Date(Number(achievement.completedAt) * 1000).toLocaleDateString('tr-TR')
    : ''
  const topicKey = achievement?.topicName || ''
  const topicIcon = topics[topicKey]?.icon || '🏆'

  return (
    <div className="bg-slate-800 rounded-lg p-3 border border-slate-700/30 hover:border-purple-500/30 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{topicIcon}</span>
        <span className="text-purple-400 text-xs font-medium">#{tokenId.toString()}</span>
      </div>
      <p className="text-slate-300 text-xs font-medium truncate">{achievement?.moduleName || '...'}</p>
      <p className="text-slate-500 text-xs mt-0.5">{topicKey || '...'}</p>
      {date && <p className="text-slate-600 text-[10px] mt-2">{date}</p>}
    </div>
  )
}

function StakingPanel({ address }) {
  const { data: stakedCount } = useReadContract({
    address: STAKING_DISCOUNT_ADDRESS, abi: STAKING_DISCOUNT_ABI,
    functionName: 'stakedCount', args: [address],
  })
  const { data: discount } = useReadContract({
    address: STAKING_DISCOUNT_ADDRESS, abi: STAKING_DISCOUNT_ABI,
    functionName: 'getDiscount', args: [address],
  })
  const { data: stakedIds } = useReadContract({
    address: STAKING_DISCOUNT_ADDRESS, abi: STAKING_DISCOUNT_ABI,
    functionName: 'getUserStakes', args: [address],
  })
  const { data: tokenIds } = useReadContract({
    address: ACHIEVEMENT_NFT_ADDRESS, abi: ACHIEVEMENT_NFT_ABI,
    functionName: 'getUserTokens', args: [address],
  })
  const { data: isApproved } = useReadContract({
    address: ACHIEVEMENT_NFT_ADDRESS, abi: ACHIEVEMENT_NFT_ABI,
    functionName: 'isApprovedForAll',
    args: [address, STAKING_DISCOUNT_ADDRESS],
  })

  const count = stakedCount ? Number(stakedCount) : 0
  const discPct = discount ? Number(discount) : 0
  const stakedSet = new Set((stakedIds || []).map(String))
  const unstakedTokens = (tokenIds || []).filter((id) => !stakedSet.has(id.toString()))

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={16} className="text-blue-400" />
        <h3 className="text-slate-200 text-sm font-semibold">Staking</h3>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <StatBox label="Stake" value={String(count)} />
        <StatBox label="Indirim" value={`%${discPct}`} color="text-green-400" />
        <p className="text-slate-500 text-xs">
          {count < 1 && '1 NFT = %10 indirim'}
          {count >= 1 && count < 3 && '1/3 gecildi → %25 icin 2 NFT daha'}
          {count >= 3 && count < 5 && '3/5 gecildi → %40 icin 2 NFT daha'}
          {count >= 5 && 'Maksimum %40 indirim aktif!'}
        </p>
      </div>

      {!isApproved && unstakedTokens.length > 0 && <TxApproveButton />}

      {isApproved && unstakedTokens.length > 0 && (
        <div className="space-y-2">
          <p className="text-slate-500 text-xs">Stake edilebilir:</p>
          <div className="flex flex-wrap gap-2">
            {unstakedTokens.map((id) => (
              <TxActionButton key={id.toString()} tokenId={id} label={`Stake #${id}`} color="green"
                contractAddr={STAKING_DISCOUNT_ADDRESS} abi={STAKING_DISCOUNT_ABI} func="stake" />
            ))}
          </div>
        </div>
      )}

      {stakedIds && stakedIds.length > 0 && (
        <div className={unstakedTokens.length > 0 ? 'mt-4 space-y-2' : 'space-y-2'}>
          <p className="text-slate-500 text-xs">Stake edilmis:</p>
          <div className="flex flex-wrap gap-2">
            {stakedIds.map((id) => (
              <TxActionButton key={id.toString()} tokenId={id} label={`Unstake #${id}`} color="red"
                contractAddr={STAKING_DISCOUNT_ADDRESS} abi={STAKING_DISCOUNT_ABI} func="unstake" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatBox({ label, value, color = 'text-white' }) {
  return (
    <div className="bg-slate-800 rounded-lg px-4 py-2 text-center">
      <p className="text-slate-400 text-xs">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  )
}

function TxApproveButton() {
  const { writeContract, isPending, data: hash } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } })
  if (isSuccess) return null
  return (
    <button onClick={() => writeContract({ address: ACHIEVEMENT_NFT_ADDRESS, abi: ACHIEVEMENT_NFT_ABI, functionName: 'setApprovalForAll', args: [STAKING_DISCOUNT_ADDRESS, true] })}
      disabled={isPending}
      className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 flex items-center gap-1.5 disabled:opacity-50">
      {isPending && <Loader2 size={12} className="animate-spin" />}
      Staking icin Onayla
    </button>
  )
}

function TxActionButton({ tokenId, label, color, contractAddr, abi, func }) {
  
  const { writeContract, isPending, data: hash } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } })
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (isSuccess) { const t = setTimeout(() => setHidden(true), 1000); return () => clearTimeout(t) }
  }, [isSuccess])

  if (hidden) return null

  const colors = { green: 'bg-green-500/10 text-green-400 hover:bg-green-500/20', red: 'bg-red-500/10 text-red-400 hover:bg-red-500/20' }

  return (
    <button onClick={() => writeContract({ address: contractAddr, abi, functionName: func, args: [tokenId] })}
      disabled={isPending}
      className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 disabled:opacity-50 transition-colors ${colors[color]}`}>
      {isPending && <Loader2 size={11} className="animate-spin" />}
      {label}
    </button>
  )
}

function ProgressSection({ address }) {
  
  const { data: progress } = useReadContract({
    address: USER_PROGRESS_ADDRESS, abi: USER_PROGRESS_ABI,
    functionName: 'getUserProgress', args: [address],
  })

  const completions = progress || []
  const topicCounts = {}
  completions.forEach((c) => {
    if (c.topicName) topicCounts[c.topicName] = (topicCounts[c.topicName] || 0) + 1
  })

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-green-400" />
        <h3 className="text-slate-200 text-sm font-semibold">
          Ilerleme ({completions.length} modul tamamlandi)
        </h3>
      </div>

      {completions.length === 0 ? (
        <p className="text-slate-500 text-sm">Henuz modul tamamlanmadi.</p>
      ) : (
        <div className="space-y-3">
          {Object.entries(topicCounts).map(([topicKey, completed]) => {
            const topic = topics[topicKey]
            if (!topic) return null
            const moduleCount = topic.modules?.tr?.length || 4
            const pct = Math.min((completed / moduleCount) * 100, 100)
            return (
              <div key={topicKey} className="flex items-center gap-3">
                {(() => { const Icon = getTopicIcon(topicKey); return <Icon size={20} className="text-slate-400 shrink-0" /> })()}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{topic.name.tr}</span>
                    <span className="text-slate-500">{completed}/{moduleCount}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-700/30">
        <div className="flex items-center gap-1.5 text-yellow-400 text-xs mb-2">
          <Circle size={10} className="fill-yellow-400" />
          <span>Onerilen Siradaki Konu</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Wallet', 'Token', 'DeFi', 'SmartContract'].map((key) => {
            const t = topics[key]; if (!t) return null
            return (
              <span key={key} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700/50">
                <span>{t.icon}</span>{t.name.tr}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function AdminPanel() {
  const { data: activePremiums } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS, abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'totalActivePremiums',
  })

  const { data: totalLocked } = useReadContract({
    address: ESCROW_ADDRESS, abi: ESCROW_ABI,
    functionName: 'getTotalLocked',
  })

  const { data: paymasterDeposit } = useReadContract({
    address: GAS_SPONSOR_PAYMASTER_ADDRESS, abi: GAS_SPONSOR_PAYMASTER_ABI,
    functionName: 'getEntryPointDeposit',
  })

  const { data: owner } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS, abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'owner',
  })

  const { data: userCount } = useReadContract({
    address: USER_PROGRESS_ADDRESS, abi: USER_PROGRESS_ABI,
    functionName: 'getUserCount',
  })

  const { data: topUsers } = useReadContract({
    address: LEADERBOARD_ADDRESS, abi: LEADERBOARD_ABI,
    functionName: 'getTopUsers',
    args: [5n, 0],
  })

  const { data: platformBalance } = useBalance({ address: owner })

  const locked = totalLocked ? Number(formatEther(totalLocked)) : 0
  const platform = platformBalance ? Number(formatEther(platformBalance.value)) : 0
  const paymaster = paymasterDeposit ? Number(formatEther(paymasterDeposit)) : 0

  const topAddresses = topUsers?.[0] || []
  const topScores = topUsers?.[1] || []

  return (
    <div className="space-y-6">
      <h3 className="text-white font-semibold flex items-center gap-2">
        <Shield size={16} className="text-purple-400" />
        Admin Panel
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <AdminCard icon={<Crown size={16} className="text-yellow-400" />} label="Aktif Premium" value={String(activePremiums || 0)} />
        <AdminCard icon={<Wallet size={16} className="text-green-400" />} label="Toplam Kullanici" value={String(userCount || 0)} />
        <AdminCard icon={<Zap size={16} className="text-blue-400" />} label="Paymaster Deposu" value={`${paymaster.toFixed(4)} MON`} />
        <AdminCard icon={<Layers size={16} className="text-purple-400" />} label="Escrow Kilitli" value={`${locked.toFixed(4)} MON`} />
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
        <h4 className="text-slate-200 text-sm font-semibold mb-3">Gelir Ozeti</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Toplam Gelir</span>
            <span className="text-white font-mono font-bold">{(platform + locked).toFixed(4)} MON</span>
          </div>
          <div className="flex justify-between text-xs ml-4">
            <span className="text-green-400">Platform (cekilebilir)</span>
            <span className="text-green-400 font-mono">{platform.toFixed(4)} MON</span>
          </div>
          <div className="flex justify-between text-xs ml-4">
            <span className="text-purple-400">Escrow (kilitli)</span>
            <span className="text-purple-400 font-mono">{locked.toFixed(4)} MON</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
        <h4 className="text-slate-200 text-sm font-semibold mb-3">En Cok Modul Tamamlayan</h4>
        {topAddresses.length === 0 ? (
          <p className="text-slate-500 text-xs">Henuz veri yok.</p>
        ) : (
          <div className="space-y-2">
            {topAddresses.map((addr, i) => (
              <div key={addr} className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">{addr.slice(0, 6)}...{addr.slice(-4)}</span>
                <span className="text-slate-200 font-mono">{topScores[i]?.toString() || '0'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AdminCard({ icon, label, value }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-slate-400 text-xs">{label}</span></div>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  )
}

