import { inject } from '@vercel/analytics'

function loadAnalytics(): void {
  try {
    inject()
  } catch (error) {
    console.error('Failed to load analytics', error)
  }
}

export default defineNuxtPlugin(() => {
  if (!import.meta.client || !import.meta.env.PROD) return

  onNuxtReady(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => void loadAnalytics())
      return
    }
    setTimeout(() => void loadAnalytics(), 0)
  })
})
