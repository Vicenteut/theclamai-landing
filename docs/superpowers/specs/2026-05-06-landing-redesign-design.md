# The Clam AI — Landing Redesign Design Doc
**Date:** 2026-05-06
**Owner:** Vicente
**Status:** Approved (user greenlit on 2026-05-06)

## Context

The current landing (`https://theclamai.com`, Astro v6 + Cloudflare Workers) is positioned 100% for hospitality. The product has expanded to 5 verticals (restaurants, hotels, pharmacies, real estate, car dealers) and is pre-launch with no public clients yet, but with working demos.

## Goals

- Reposition the brand as a multi-vertical conversational AI (keep "The Clam AI" name, re-narrate as abstract).
- Make the live WhatsApp demo the centerpiece of the page (no clients yet → the demo IS the proof).
- Support EN + ES from day one. USD pricing.
- Vercel-style aesthetic: dark, monochrome with single accent, tight grid, terminal vibes.

## Audience

Owners/managers of: restaurants, hotels, pharmacies, real estate offices, car dealerships. Mixed tech sophistication. EN + ES.

## Approach: Demo-First

The page is built around getting visitors to message the bot RIGHT NOW. Hero shows a QR + WhatsApp deep-link, and a vertical switcher changes the demo number/context. Pricing and FAQ go below; they're secondary. Optional vertical sub-pages (`/restaurants`, etc.) deferred to Phase 2.

## Information Architecture

```
1. Navbar           — logo, How it works, Pricing, FAQ, lang toggle EN/ES, CTA "Try the demo"
2. Hero             — statement + vertical switcher + LIVE DEMO (QR + wa.me link)
3. Demo Strip       — 3-step micro-explainer of what just happened
4. How It Works     — 3 steps: Connect WhatsApp → Train on your data → Live in 72h
5. Verticals        — 5-card grid (rest, hotels, pharma, real estate, dealers); each links to future /vertical page
6. Capabilities     — bullet grid: orders, bookings, FAQ, handoff, multi-language, integrations
7. Pricing          — Starter / Pro / Custom (USD)
8. FAQ              — Alpine.js accordion (existing pattern)
9. Final CTA        — "Try it now" + "Book a call" side-by-side
10. Footer          — legal, contact, lang
```

### Removed from current landing
- `Problem.astro` — generic, removed.
- `TrustStrip.astro` — no real clients yet.
- `ProductPreview.astro` — replaced by live demo + capabilities grid.

### Added
- `VerticalSwitcher.astro` (in Hero)
- `LiveDemo.astro` (QR + deep-link, vertical-aware)
- `DemoStrip.astro`
- `Verticals.astro`
- `Capabilities.astro`
- `LangToggle.astro` (in Navbar)

## Visual System

**Mood:** Vercel-style — dark mode, monochrome with one accent, tight typography, geometric, lots of whitespace.

**Tokens (CSS vars on `:root`):**
- `--bg: #0a0a0a`
- `--surface: #111`
- `--surface-2: #1a1a1a`
- `--border: rgba(255,255,255,0.08)`
- `--text: #ededed`
- `--text-muted: #888`
- `--text-dim: #555`
- `--accent: #d4af37` (current gold) — to validate. Vercel-pure would be a single hue (white). Decision in Phase 2.
- Type scale: clamp() based, fluid.
- Font: Geist (Vercel's typeface) — to add via CDN or `@fontsource`.

**Spacing:** 4/8/12/16/24/32/48/64/96 (8pt grid).

## Demo Infrastructure (technical)

Each vertical has:
- A WhatsApp Business number (or shared number with vertical-specific entry context).
- A pre-filled deep-link: `https://wa.me/{number}?text={prefilled}`.
- A QR pointing to that link.

The `VerticalSwitcher` toggles the active vertical and updates the QR + link in the hero. Numbers/links live in `src/data/demos.ts`.

If only one number exists for now, the prefill changes per vertical (e.g., "Hi, I'd like to order pizza" vs "Hi, I'm looking for a 2-bedroom apartment") and the bot routes by intent.

## i18n

- Strategy: Astro's content collections OR a simple `src/i18n/{en,es}.json` with a helper.
- URL: `/` = English (default), `/es/` = Spanish.
- `LangToggle` swaps locale, persists in localStorage.
- All copy lives in i18n dictionaries, not hardcoded in components.

## CTAs (priority order)

1. **Primary** — "Try the demo" → opens WhatsApp (wa.me deep-link or QR scan).
2. **Secondary** — "Book a call" → Calendly/Cal.com link.
3. **Tertiary** — "Start trial" → signup form (later phase, can be a "Coming soon" / waitlist for now).

## Pricing

Three public tiers (USD/month), plus Custom. Exact numbers TBD with user before Pricing phase. Tier names: Starter, Pro, Custom. Differentiators: message volume, integrations (POS/PMS), languages, support SLA.

## Non-Goals

- No new logo/wordmark in this iteration (keeping current).
- No backend changes (the bot infra in `chatbots-bz` is not touched).
- No vertical sub-pages in Phase 1 (Phase 2).
- No analytics/A-B framework in Phase 1.

## Success Criteria

- New landing deployed to `https://theclamai.com` via Cloudflare Workers.
- All 10 sections rendered, EN + ES, no broken links.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95.
- Live WhatsApp demo functional from at least one vertical.
- User signs off visually before merge to main.

## Open Questions (resolved before relevant phase)

- Final pricing numbers per tier.
- Single demo number vs per-vertical numbers.
- Calendly/Cal.com URL for "Book a call".
- Keep gold accent (#d4af37) or shift to pure white (Vercel-pure)?
