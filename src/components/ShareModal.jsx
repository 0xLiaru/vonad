import { Gift, X, Share2 } from 'lucide-react'
import { topics } from '../data/topics.js'

export default function ShareModal({ open, onClose, data }) {
  if (!open || !data) return null

  const { topicKey, moduleName, tokenId } = data
  const topic = topics[topicKey]
  const topicName = topic?.name?.tr || topicKey
  const icon = topic?.icon || '🏆'

  const tweetText = encodeURIComponent(
    `Monad üzerinde ${topicName} modülünü tamamladım ve NFT kazandım! \n\n@MonadBlockchain #MonadHackathon #BlockLearn`
  )
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl">
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <Gift size={18} className="text-yellow-400" />
              <h3 className="text-white font-semibold text-sm">NFT Earned!</h3>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700/50">
              <span className="text-5xl mb-3 block">{icon}</span>
              <p className="text-purple-400 text-xs font-mono mb-2">#{tokenId}</p>
              <p className="text-white font-semibold text-sm">{topicName}</p>
              <p className="text-slate-400 text-xs mt-1">{moduleName}</p>
            </div>

            <div className="flex gap-2">
              <a
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-sm font-medium transition-colors"
              >
                <Share2 size={16} />
                Share on X
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

