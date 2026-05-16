import { useEffect, useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'viem'
import { X, Crown, ShieldCheck, Loader2 } from 'lucide-react'
import { PREMIUM_SUBSCRIPTION_ABI, STAKING_DISCOUNT_ABI, ESCROW_ABI } from '../contracts/abis.js'
import { PREMIUM_SUBSCRIPTION_ADDRESS, STAKING_DISCOUNT_ADDRESS, ESCROW_ADDRESS } from '../contracts/addresses.js'
import { topics, allTopicKeys } from '../data/topics.js'

export default function PremiumModal({ open, onClose, onSuccess }) {
  const { address } = useAccount()
  const [step, setStep] = useState('confirm')
  const [txHash, setTxHash] = useState(null)

  const { data: priceWei } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'ESCROW_PRICE',
    query: { enabled: open },
  })

  const { data: priceInMon } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'getCurrentPriceInMON',
    query: { enabled: open },
  })

  const { data: priceInUsd } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'getCurrentPriceUSD',
    query: { enabled: open },
  })

  const { data: stakedCount } = useReadContract({
    address: STAKING_DISCOUNT_ADDRESS,
    abi: STAKING_DISCOUNT_ABI,
    functionName: 'stakedCount',
    args: address ? [address] : undefined,
    query: { enabled: open && !!address },
  })

  const { data: discount } = useReadContract({
    address: STAKING_DISCOUNT_ADDRESS,
    abi: STAKING_DISCOUNT_ABI,
    functionName: 'getDiscount',
    args: address ? [address] : undefined,
    query: { enabled: open && !!address },
  })

  const { writeContract, isPending, data: hash } = useWriteContract()

  const { isLoading: waiting, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  })

  useEffect(() => {
    if (isSuccess && txHash) {
      setStep('done')
      onSuccess?.()
    }
  }, [isSuccess, txHash])

  useEffect(() => {
    if (hash) setTxHash(hash)
  }, [hash])

  if (!open) return null

  const fullPrice = priceInMon ? Number(formatEther(priceInMon)) : 0.01
  const usdPrice = priceInUsd ? Number(priceInUsd) / 1e8 : 5
  const count = stakedCount ? Number(stakedCount) : 0
  const discountPct = discount ? Number(discount) : 0
  const discountedPrice = fullPrice * (1 - discountPct / 100)

  const premiumTopics = allTopicKeys.filter((k) => {
    const t = topics[k]
    return t.difficulty !== 'beginner' || t.blocks.some((b) => b.locked)
  })

  const handlePurchase = () => {
    setStep('pending')
    writeContract({
      address: ESCROW_ADDRESS,
      abi: ESCROW_ABI,
      functionName: 'depositForPremium',
      value: priceInMon || (priceWei || 10000000000000000n),
    })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <Crown size={18} className="text-yellow-400" />
              <h3 className="text-white font-semibold">Premium Uyelik</h3>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {step === 'confirm' && (
              <>
                <div className="bg-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Aylik standart fiyat</span>
                    <span className="text-slate-200 font-mono">
                      {fullPrice.toFixed(6)} MON
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">(~${usdPrice.toFixed(2)} USD karsiligi)</span>
                    <span className="text-slate-500">30 gun</span>
                  </div>
                  {count > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">
                        Stake indirimi ({count} NFT - %{discountPct})
                      </span>
                      <span className="text-green-400 font-mono">
                        -{(fullPrice - discountedPrice).toFixed(6)} MON
                      </span>
                    </div>
                  )}
                  <div className="border-t border-slate-700/50 pt-3 flex justify-between text-sm">
                    <span className="text-white font-medium">Odenecek tutar</span>
                    <span className="text-white font-bold font-mono">
                      {discountedPrice.toFixed(6)} MON
                    </span>
                  </div>
                  <div className="text-yellow-400/70 text-[10px]">
                    Odeme Escrow kontratinda 30 gun kilitli kalir.
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-slate-400 text-xs font-medium">
                    Premium ile acilacak konular:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {premiumTopics.slice(0, 10).map((key) => (
                      <div
                        key={key}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/5 text-xs text-purple-300"
                      >
                        <span>{topics[key].icon}</span>
                        <span>{topics[key].name.tr}</span>
                      </div>
                    ))}
                    {premiumTopics.length > 10 && (
                      <div className="text-slate-500 text-xs px-2 py-1">
                        +{premiumTopics.length - 10} konu daha
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={!address}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium text-sm hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {address ? 'Onayla ve Ode (Escrow)' : 'Once cuzdan baglayin'}
                </button>
              </>
            )}

            {step === 'pending' && (
              <div className="text-center py-6 space-y-3">
                <Loader2 size={32} className="animate-spin text-purple-400 mx-auto" />
                <p className="text-slate-300 text-sm">Islem onaylaniyor...</p>
                <p className="text-slate-500 text-xs">Cuzdaninda islemi onayla</p>
                {txHash && (
                  <p className="text-slate-600 text-xs font-mono truncate">
                    TX: {txHash.slice(0, 10)}...
                  </p>
                )}
              </div>
            )}

            {step === 'done' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                  <ShieldCheck size={28} className="text-green-400" />
                </div>
                <p className="text-green-400 font-medium">Premium Aktif!</p>
                <p className="text-slate-400 text-sm">
                  30 gun boyunca tum konulara ve bloklara erisebilirsin.
                </p>
                <p className="text-slate-500 text-xs">
                  Odemen 30 gun escrow'da kilitli, bu sure icinde iade talep edebilirsin.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors"
                >
                  Kapat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
