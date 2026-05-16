const STORAGE_KEY = 'vonad_onboarding_done'

export function isOnboardingDone() {
  try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { /* ignore */ }
  return false
}

export function markOnboardingDone() {
  try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
  return false
}
