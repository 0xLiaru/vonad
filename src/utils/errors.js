/**
 * Maps common wallet/contract errors to user-friendly messages
 */
export function translateError(error, lang = 'tr') {
  const msg = error?.message || error?.shortMessage || String(error)

  const patterns = [
    { match: /user rejected|user denied|rejected by user/i, tr: 'İşlem cüzdanda reddedildi.', en: 'Transaction rejected in wallet.' },
    { match: /insufficient funds|not enough funds|insufficient balance/i, tr: 'Yetersiz bakiye. Cüzdanınızda yeterli MON yok.', en: 'Insufficient balance. Not enough MON in wallet.' },
    { match: /network mismatch|wrong chain|unsupported chain/i, tr: 'Yanlış ağ. Lütfen Monad Testnet\'e geçin.', en: 'Wrong network. Please switch to Monad Testnet.' },
    { match: /underpriced|replacement fee too low/i, tr: 'Gas ücreti çok düşük. Lütfen tekrar deneyin.', en: 'Gas fee too low. Please try again.' },
    { match: /nonce too low|nonce.*already used/i, tr: 'İşlem zaten gönderildi. Lütfen bekleyin.', en: 'Transaction already submitted. Please wait.' },
    { match: /execution reverted|revert/i, tr: 'İşlem başarısız oldu. Sözleşme tarafından reddedildi.', en: 'Transaction failed. Rejected by contract.' },
    { match: /timeout|timed out/i, tr: 'İşlem zaman aşımına uğradı. Ağ yoğun olabilir.', en: 'Transaction timed out. Network may be congested.' },
    { match: /rate limit|too many requests/i, tr: 'Çok fazla istek. Lütfen biraz bekleyin.', en: 'Too many requests. Please wait a moment.' },
  ]

  for (const p of patterns) {
    if (p.match.test(msg)) return lang === 'tr' ? p.tr : p.en
  }

  return lang === 'tr'
    ? `Bir hata oluştu: ${msg.slice(0, 100)}`
    : `An error occurred: ${msg.slice(0, 100)}`
}
