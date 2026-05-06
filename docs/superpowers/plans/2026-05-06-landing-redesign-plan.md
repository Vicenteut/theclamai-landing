# The Clam AI — Landing Redesign Implementation Plan
**Spec:** [`docs/superpowers/specs/2026-05-06-landing-redesign-design.md`](../specs/2026-05-06-landing-redesign-design.md)
**Date:** 2026-05-06
**Branch strategy:** all work on `redesign/v2`, merge to `main` only after Phase 7 sign-off.

---

## Phase 0 — Branch + Audit (baseline)

**Goal:** Snapshot current state, create work branch, document findings.

- Create branch `redesign/v2`.
- Run Lighthouse on production (`https://theclamai.com`) — record baseline scores.
- Take a full-page screenshot of current landing for before/after.
- List dependencies in `package.json`. Note current Astro version, integrations.
- Commit: `chore: baseline before v2 redesign`.

**Done when:** branch exists, baseline file at `docs/superpowers/specs/2026-05-06-baseline.md`.

---

## Phase 1 — Foundations: tokens, type, i18n scaffold

**Goal:** Replace ad-hoc inline styles with a token system; add i18n.

- Create `src/styles/tokens.css` with all CSS vars from spec.
- Add Geist font via `@fontsource-variable/geist` or CDN preload.
- Create `src/i18n/{en,es}.json` with all current copy keys + new copy keys.
- Create `src/i18n/index.ts` helper: `t(key, locale)`, `useLocale()`.
- Create `src/layouts/BaseLayout.astro` updates: locale prop, `<html lang>`, font preload.
- Create `[lang]/index.astro` route OR `/es/index.astro` mirror.
- Add `LangToggle.astro` to Navbar.
- Verify EN+ES routes render with placeholder content.

**Done when:** `/` (EN) and `/es/` (ES) both render the existing page with copy pulled from i18n dictionaries.

---

## Phase 2 — Hero + LiveDemo + VerticalSwitcher

**Goal:** Rebuild the hero around the live demo, with vertical switching.

- Create `src/data/demos.ts` exporting `VERTICALS` array: `{id, label_en, label_es, wa_number, prefill_en, prefill_es, accent_emoji}`.
- Create `src/components/VerticalSwitcher.astro` — pill-tabs (rest, hotels, pharmacies, real estate, dealers). Alpine.js for state.
- Create `src/components/LiveDemo.astro` — QR (generated client-side via lib like `qrcode.js` from CDN OR static SVG per vertical) + WhatsApp link button + prefilled message preview.
- Rewrite `src/components/Hero.astro`:
  - H1 abstract: "The conversational AI your business already needs."
  - Sub: "Connect WhatsApp. Train on your data. Live in 72 hours."
  - VerticalSwitcher below sub.
  - LiveDemo on the right (desktop) / below (mobile).
- All copy via i18n.

**Done when:** hero shows switcher; toggling a vertical changes the QR + link + prefill; works on mobile.

---

## Phase 3 — Demo Strip + How It Works + Capabilities

**Goal:** Build the explanatory body of the page.

- Create `src/components/DemoStrip.astro` — 3 numbered cards: "1. You scanned. 2. Bot replies in your language. 3. Real handoff if needed."
- Update `src/components/HowItWorks.astro` — 3 steps with vertical-agnostic copy: Connect WhatsApp / Train / Go live.
- Create `src/components/Capabilities.astro` — 6-cell grid: Orders, Bookings, FAQ, Handoff, Multi-language (20+), Integrations (POS, PMS, CRM).
- Wire into `src/pages/index.astro` and `/es/index.astro`.

**Done when:** sections render with i18n copy, mobile-responsive.

---

## Phase 4 — Verticals grid + Pricing + Final CTA

**Goal:** Build commercial sections.

- Create `src/components/Verticals.astro` — 5 cards (icon, vertical name, 1-line use case, "Coming soon" or `→` link). Cards link to `/restaurants`, `/hotels`, etc. (future Phase 8).
- Refactor `src/components/Pricing.astro` to spec: Starter / Pro / Custom (USD). Pull amounts from `src/data/pricing.ts`. **Pause here to confirm pricing numbers with user.**
- Update `src/components/FinalCTA.astro` — two CTAs side-by-side: "Try the demo" (primary, → wa.me) and "Book a call" (secondary, → Calendly URL TBD with user).

**Done when:** all 3 sections done, pricing tiers reflect user's decision, Calendly URL wired.

---

## Phase 5 — Polish: FAQ + Footer + Navbar

**Goal:** Bring remaining sections to spec.

- Refactor `FAQ.astro` — keep Alpine accordion, swap copy for new vertical-agnostic Q's, add 2 new questions covering non-hospitality verticals.
- Refactor `Footer.astro` — links to legal, language toggle, contact, copyright.
- Refactor `Navbar.astro` — add `LangToggle`, ensure CTA "Try the demo" scrolls to hero or opens WhatsApp directly.
- Remove deleted components: `Problem.astro`, `TrustStrip.astro`, `ProductPreview.astro`. Remove `Preloader.astro` if not used.

**Done when:** every component matches spec, no dead files.

---

## Phase 6 — i18n complete + accessibility + perf pass

**Goal:** Production-quality finish.

- Verify every string in both languages — no English leaking into `/es/`.
- Run a11y check: contrast, focus states, alt text, aria-labels on interactive elements (switcher, accordion, lang toggle).
- Run Lighthouse on local build. Fix until Performance ≥ 90, A11y ≥ 95.
- Check on real mobile (responsive panel + actual phone if possible).
- Optimize images (Astro `<Image>` + WebP/AVIF where applicable).

**Done when:** both LH scores hit; no a11y violations; mobile usable.

---

## Phase 7 — Deploy + sign-off

**Goal:** Ship to production.

- Deploy to a Cloudflare Workers preview URL (`wrangler deploy --env preview` or `npx wrangler pages deploy`).
- User reviews preview URL. Iterates until happy.
- Merge `redesign/v2` → `main`.
- Promote preview to production (`https://theclamai.com`).
- Verify live: EN, ES, demo link works, all CTAs.

**Done when:** new landing live on production, user signs off.

---

## Phase 8 — DEFERRED — Vertical sub-pages

`/restaurants`, `/hotels`, `/pharmacies`, `/real-estate`, `/car-dealers`. Each with vertical-specific copy, screenshots, integration mentions, vertical demo. Out of scope for v2 launch; tracked for next iteration.

---

## Risks

- **Single demo number:** if there's only one bot, vertical switcher may feel cosmetic. Mitigation: prefill messages strongly differentiated per vertical so the bot demonstrably routes correctly.
- **Calendly/Pricing decisions blocking Phase 4:** keep placeholders, ask user inline at start of Phase 4.
- **Geist font licensing:** verify license allows web use (it does — OFL).

## Verification per phase

After each phase, run `npm run build` and `npm run dev`, sanity-check the affected pages in the browser, commit.
