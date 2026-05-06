/**
 * Lightweight analytics helper. PostHog snippet loads in BaseLayout when
 * PUBLIC_POSTHOG_KEY is present. This module wires:
 *   - delegated click listener for [data-track] elements
 *   - explicit helpers for non-DOM events
 *
 * Custom events:
 *   cta_click_hero, cta_click_pricing, cta_click_finalcta, cta_click_navbar,
 *   vertical_switched, lang_toggle, faq_opened
 */

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void;
      identify: (id: string, props?: Record<string, unknown>) => void;
      opt_in_capturing: () => void;
      opt_out_capturing: () => void;
      onFeatureFlags: (cb: (flags: string[]) => void) => void;
      isFeatureEnabled: (flag: string) => boolean;
      getFeatureFlag: (flag: string) => string | boolean | undefined;
    };
  }
}

export function track(event: string, props: Record<string, unknown> = {}): void {
  try {
    window.posthog?.capture(event, props);
  } catch {
    /* swallow — analytics must never break the page */
  }
}

/** Wire the delegated [data-track] click listener. Called once on DOMContentLoaded. */
export function initAnalytics(): void {
  const lang =
    document.documentElement.lang === 'es' ? 'es' : 'en';

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null;
      if (!target) return;
      const el = target.closest<HTMLElement>('[data-track]');
      if (!el) return;
      const event = el.dataset.track;
      if (!event) return;
      const props: Record<string, unknown> = { lang };
      // Roll any data-track-* attributes (excluding data-track itself) into props.
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key === 'track' || value === undefined) continue;
        // dataset key already camelCased
        props[key] = value;
      }
      track(event, props);
    },
    { passive: true },
  );
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
  } else {
    initAnalytics();
  }
}
