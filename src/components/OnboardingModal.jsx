import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X, ArrowRight, ArrowLeft, Check, Wallet, Blocks, Play } from 'lucide-react'
import { markOnboardingDone } from '../utils/onboarding.js'

export default function OnboardingModal({ open, onClose }) {
  const { i18n } = useTranslation()
  const [step, setStep] = useState(0)
  const lang = i18n.language
  const prevOpen = useRef(open)

  useEffect(() => {
    if (open && !prevOpen.current) setStep(0)
    prevOpen.current = open
  }, [open])

  if (!open) return null

  const steps = [
    {
      icon: <Blocks size={32} className="text-purple-400" />,
      title: lang === 'tr' ? 'Bu platform ne?' : 'What is this platform?',
      desc: lang === 'tr'
        ? 'Vonad, Web3 ve blockchain kavramlarını sürükle-bırak Blocksla öğrenmenizi sağlayan interaktif bir öğrenme platformudur. Her konu için Blocksı doğru sıralayın, simülasyonu çalıştırın ve öğrenin.'
        : 'Vonad is an interactive learning platform that lets you learn Web3 and blockchain concepts with drag-and-drop blocks. Arrange blocks in the correct order, run simulations, and learn.',
    },
    {
      icon: <Wallet size={32} className="text-purple-400" />,
      title: lang === 'tr' ? 'Bir konu seç' : 'Choose a topic',
      desc: lang === 'tr'
        ? 'Sol panelden öğrenmek istediğiniz konuyu seçin. Cüzdan bağlamadan Demo Mode başlayabilir, gerçek NFT kazanmak için cüzdan bağlayabilirsiniz.'
        : 'Pick a topic you want to learn from the left panel. Start in demo mode without a wallet, or connect your wallet to earn real NFTs.',
    },
    {
      icon: <Play size={32} className="text-purple-400" />,
      title: lang === 'tr' ? 'Blocksı birleştir ve simüle et' : 'Connect blocks & simulate',
      desc: lang === 'tr'
        ? 'Blok paletinden Blocksı orta alana sürükleyin, doğru sıralayın, doğrulayın ve simülasyonu çalıştırın. Modülü tamamlayınca NFT kazanabilirsiniz!'
        : 'Drag blocks from the palette to the canvas, arrange them correctly, validate, and run the simulation. Complete the module to earn an NFT!',
    },
  ]

  const current = steps[step]
  const isLast = step === steps.length - 1

  const handleFinish = () => {
    const cb = document.getElementById('onboarding-skip-forever')
    if (cb?.checked) markOnboardingDone()
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500">
                <img src="/logo.svg" alt="Vonad" className="w-full h-full" />
              </div>
              <span className="text-slate-400 text-xs">{step + 1} / {steps.length}</span>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center">
              {current.icon}
            </div>
            <h3 className="text-white font-bold text-lg">{current.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{current.desc}</p>
          </div>

          <div className="p-5 border-t border-slate-700/50 space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors text-sm"
              >
                <ArrowLeft size={14} />
                {lang === 'tr' ? 'Back' : 'Back'}
              </button>

              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === step ? 'bg-purple-400' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {isLast ? (
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  <Check size={14} />
                  {lang === 'tr' ? 'Başla' : 'Start'}
                </button>
              ) : (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                >
                  {lang === 'tr' ? 'İleri' : 'Next'}
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

            {isLast && (
              <label className="flex items-center gap-2 cursor-pointer text-slate-500 text-xs justify-center">
                <input type="checkbox" id="onboarding-skip-forever" className="rounded border-slate-600 bg-slate-800" />
                {lang === 'tr' ? 'Bir daha gösterme' : 'Don\'t show again'}
              </label>
            )}

            {step < steps.length - 1 && (
              <button
                onClick={onClose}
                className="w-full text-center text-slate-600 hover:text-slate-400 text-xs transition-colors"
              >
                {lang === 'tr' ? 'Atla' : 'Skip'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

