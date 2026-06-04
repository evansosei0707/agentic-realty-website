// Lightweight, provider-agnostic event tracking. No-ops until a provider
// (PostHog or Plausible) is present on window. See agent/docs/analytics-events.md
// for the canonical event plan.

type Props = Record<string, unknown>

export function trackEvent(name: string, props: Props = {}): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    posthog?: { capture?: (n: string, p?: Props) => void }
    plausible?: (n: string, opts?: { props?: Props }) => void
  }
  try {
    if (w.posthog?.capture) {
      w.posthog.capture(name, props)
    } else if (w.plausible) {
      w.plausible(name, { props })
    } else if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[track]', name, props)
    }
  } catch {
    // never let analytics break the page
  }
}
