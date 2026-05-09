# Plan: Audit P0/P1 Fixes

Repository: `/root/theclamai-landing`
Stack: Astro + Cloudflare adapter + Tailwind + Alpine CDN + Rive + PostHog

This plan intentionally stops before implementation. After approval, work will continue on a new branch named `audit-p0-fixes`.

## Constraints

- Do not rewrite strategic hero/pricing copy beyond required P0/P1 correctness fixes.
- Do not add fake testimonials, logos, or social proof.
- Do not merge to `main`.
- Keep commits atomic: one finding per commit where practical.
- Run `npm run build` after each implementation block.
- Capture before/after screenshots for visual changes before final handoff.
- Put any newly discovered unrelated issues in the PR description under `Out of scope / follow-ups`.

## Skill Coverage

- `writing-plans`: this file is the implementation plan artifact and must be reviewed before coding.
- `test-driven-development`: use focused checks where behavior changes; at minimum `npm run build` must pass after each block.
- `verification-before-completion`: final handoff requires green build, dist checks, screenshots, and text scans.
- `brand`: preserve the dark/gold premium-minimal voice and avoid adding unapproved strategic claims.
- `ui-ux-pro-max`: apply to CTA hierarchy, consent banner ergonomics, accessibility, and localized navigation.
- `frontend-design`: apply to vertical cards, segmented controls, OG image, and demo poster quality.
- `code-review-excellence`: compare each changed file against the original before committing.

## Implementation Blocks

### Block 1: Branch + Baseline

1. Create branch: `git checkout -b audit-p0-fixes`.
2. Run baseline `npm run build`.
3. Save baseline screenshots for:
   - `/`
   - `/es/`
   - `/restaurants/`
   - existing legal pages
   - existing vertical pages

Commit:
- None unless the plan file itself is committed as a docs-only setup commit.

### Block 2: CTA State Inheritance

Goal: Navbar, Hero, VerticalSwitcher, and FinalCTA use the selected vertical prefill when a vertical is selected; otherwise use generic demo prefill.

Files:
- `src/data/demos.ts`
- `src/components/VerticalSwitcher.astro`
- `src/components/Hero.astro`
- `src/components/Navbar.astro`
- `src/components/FinalCTA.astro`
- `src/i18n/en.json`
- `src/i18n/es.json`

Approach:
- Verify every vertical has a correct WhatsApp prefill in EN/ES.
- Add generic demo prefill:
  - EN: `Show me a demo for my business`
  - ES: `Muéstrame un demo para mi negocio`
- Store selected vertical in shared browser state, likely `localStorage` key plus a `clamai:vertical-changed` event.
- Navbar and FinalCTA render generic server-side links, then enhance client-side after hydration if a selected vertical exists.
- Hero and VerticalSwitcher update immediately from existing client state.
- Handle missing/invalid stored vertical by falling back to the generic CTA.

Verification:
- Build passes.
- Selecting Hotel changes navbar/hero/final CTA WhatsApp prefill to hotel.
- Selecting Doctores changes navbar/hero/final CTA WhatsApp prefill to doctores.
- No JS error if `localStorage` is unavailable.

Commit:
- `fix(cta): inherit selected vertical in WhatsApp demo links`

### Block 3: Seven Verticals + Production Status Labels

Goal: Add all backend-supported verticals and remove `Coming soon` from active product verticals.

Files:
- `src/data/demos.ts`
- `src/components/Verticals.astro`
- `src/components/VerticalSwitcher.astro`
- `src/i18n/en.json`
- `src/i18n/es.json`

Approach:
- Use backend-aligned ids:
  - `hotel`
  - `airbnb`
  - `restaurant`
  - `real_estate`
  - `pharmacy`
  - `car_sales`
  - `doctores`
- Add `status: live | pilot | soon`.
- Set status:
  - `restaurant`: `live`
  - `hotel`: `live`
  - `airbnb`: `pilot`
  - `real_estate`: `pilot`
  - `pharmacy`: `pilot`
  - `car_sales`: `pilot`
  - `doctores`: `pilot`
- Localized labels:
  - `live`: `Available now` / `Disponible ahora`
  - `pilot`: `Pilot available` / `Piloto disponible`
  - `soon`: reserved for future unbuilt verticals.
- Ensure VerticalSwitcher has 7 options and Verticals grid has 7 cards.
- Keep copy changes limited to required labels, demos, examples, and i18n strings.

Verification:
- Build passes.
- Landing shows 7 vertical cards.
- VerticalSwitcher shows 7 options.
- No active vertical renders `Coming soon` / `Muy pronto`.

Commit:
- `fix(verticals): show all active product verticals`

### Block 4: Unify Vertical Routes Under `/verticals/`

Goal: Move from the old `/restaurants/` pattern to one consistent route family before 7 URLs exist in production.

Files:
- `src/pages/verticals/hotel.astro`
- `src/pages/verticals/airbnb.astro`
- `src/pages/verticals/restaurant.astro`
- `src/pages/verticals/real_estate.astro`
- `src/pages/verticals/pharmacy.astro`
- `src/pages/verticals/car_sales.astro`
- `src/pages/verticals/doctores.astro`
- matching `src/pages/es/verticals/<vertical>.astro` pages
- old `src/pages/restaurants.astro` and `src/pages/es/restaurants.astro`, if present
- `src/components/VerticalPage.astro`
- `src/data/demos.ts`
- `src/i18n/en.json`
- `src/i18n/es.json`
- `public/_redirects`
- navbar/footer/internal link sources if they reference old vertical routes

Approach:
- Create `/verticals/{hotel,airbnb,restaurant,real_estate,pharmacy,car_sales,doctores}/`.
- Create the same route pattern under `/es/verticals/<vertical>/`.
- Move `/restaurants/` to `/verticals/restaurant/`.
- Add Cloudflare Pages 301 redirect in `public/_redirects`:
  - `/restaurants/ /verticals/restaurant/ 301`
  - `/es/restaurants/ /es/verticals/restaurant/ 301`
- Update sitemap-visible routes through real Astro pages, not static sitemap patches.
- Update internal links in navbar/footer/vertical cards to the new route family.
- Keep visual/layout implementation on the existing `VerticalPage.astro` pattern.

Verification:
- Build passes.
- All 14 vertical pages render in `dist/client`.
- `public/_redirects` contains the old restaurant redirects.
- No internal links point to `/restaurants/` except the redirect file.
- Sitemap output from `@astrojs/sitemap` includes the new routes.

Commit:
- `fix(verticals): unify vertical pages under verticals routes`

### Block 5: Spanish Legal Pages + Localized Footer/LangToggle

Goal: `/es/legal/privacy` and `/es/legal/terms` exist and footer/language links route correctly.

Files:
- `src/pages/es/legal/privacy.astro`
- `src/pages/es/legal/terms.astro`
- `src/components/Footer.astro`
- `src/components/LangToggle.astro`
- `src/i18n/index.ts`
- `src/i18n/en.json`
- `src/i18n/es.json`

Approach:
- Translate existing legal pages into neutral LATAM Spanish.
- Localize Footer legal links based on current locale.
- Make `LangToggle` route legal pages to existing translated pages.
- For pages that still lack ES translation in the future, hide the unavailable option or route to a safe EN fallback rather than creating a 404.

Verification:
- Build passes.
- `/es/legal/privacy/` and `/es/legal/terms/` exist in build output.
- Footer on `/es/` points to `/es/legal/...`.
- EN legal pages toggle to ES legal pages without 404.

Commit:
- `fix(i18n): add spanish legal pages and localized legal links`

### Block 6: OG Image + Sitemap Redirect

Goal: `og-image.png` exists and `/sitemap.xml` redirects to Astro's generated sitemap index without static-file collision.

Files:
- `public/og-image.png`
- `public/_redirects`
- `public/robots.txt`
- `astro.config.mjs`, only if sitemap config needs route inclusion fixes

Approach:
- Generate a 1200x630 PNG with brand dark/gold, WhatsApp chat mock, and dashboard mock.
- Keep `BaseLayout.astro` reference to `/og-image.png` unless a current reference is wrong.
- Do not create `public/sitemap.xml`.
- Add Cloudflare redirect:
  - `/sitemap.xml /sitemap-index.xml 301`
- Keep `robots.txt` pointing at the canonical sitemap index unless there is a concrete SEO reason to change it.
- Verify `@astrojs/sitemap` includes new `/verticals/*` and `/es/legal/*` pages through normal Astro route discovery/config.

Verification:
- Build passes.
- `dist/client/og-image.png` exists.
- `dist/client/_redirects` includes `/sitemap.xml /sitemap-index.xml 301`.
- Built sitemap index/output includes new vertical and legal routes.

Commit:
- `fix(seo): add og image and sitemap redirect`

### Block 7: PostHog Consent Gate + EU Host

Goal: Align analytics behavior with privacy expectations and disable session replay by default.

Files:
- `src/layouts/BaseLayout.astro`
- `src/components/ConsentBanner.astro`
- `src/pages/legal/privacy.astro`
- `src/pages/es/legal/privacy.astro`
- `src/i18n/en.json`
- `src/i18n/es.json`

Approach:
- Add minimal bottom consent banner:
  - one line of copy
  - `Accept` / `Reject`
  - localized EN/ES strings
  - privacy link localized to `/legal/privacy` or `/es/legal/privacy`
- Store state in `localStorage` key `clamai:analytics-consent` with values `granted` or `denied`.
- If `granted`, load PostHog.
- If `denied` or no decision, load no PostHog script and send no analytics.
- Disable session recording by default in PostHog config.
- Force EU host if privacy policy says EU; if implementation must use another host, update the policy so it is not ambiguous.
- Keep content accessible; no modal, overlay, or blocking interaction.

Verification:
- Build passes.
- Fresh browser load makes no PostHog request before consent.
- Reject persists and still makes no PostHog request on reload.
- Accept persists and loads PostHog with session recording off.
- Privacy policy matches the actual host and recording behavior.

Commit:
- `fix(privacy): gate posthog behind consent and disable replay`

### Block 8: Lazy-load Rive + Separate Demo Poster + Localized LiveDemo Text

Goal: Reduce mobile TTI and remove the hardcoded `You` label.

Files:
- `src/components/LiveDemo.astro`
- `src/i18n/en.json`
- `src/i18n/es.json`
- `public/demo-poster.webp` or `public/demo-poster.png`

Approach:
- Add localized `you_label`.
- Create a dedicated demo poster asset sized to the real LiveDemo container/aspect ratio, not reused from `og-image.png`.
- Prefer capturing the first frame of the `.riv` if practical.
- If first-frame capture is not practical, generate a high-quality static mock consistent with the product UI.
- Render poster first.
- Load `.riv` and Rive runtime only after IntersectionObserver sees the demo area or after explicit user interaction.
- Respect reduced motion by keeping poster and avoiding autoplay where appropriate.

Verification:
- Build passes.
- `dist/client/demo-poster.webp` or `.png` exists.
- Initial page load does not fetch `.riv` before the demo intersects or is clicked.
- ES renders localized label instead of `You`.

Commit:
- `fix(perf): lazy-load rive demo and localize live demo labels`

### Block 9: P1 Cleanup

Goal: Small maintainability/a11y fixes after P0 scope is complete.

Files:
- `src/components/Logo.astro`
- `src/components/Navbar.astro`
- `src/components/Footer.astro`
- `src/components/VerticalSwitcher.astro`
- `src/styles/globals.css`

Approach:
- Extract duplicated logo SVG to `Logo.astro`.
- Delete unused `.plan-card` and `.step-card` styles after confirming no references.
- Replace `role="tablist"`/`role="tab"` with segmented buttons unless real tabs with `aria-controls` and `tabpanel` are implemented.

Verification:
- Build passes.
- No visual regression in navbar/footer/switcher.
- `rg "plan-card|step-card|role=\"tab"` confirms cleanup.

Commit:
- `refactor(ui): extract logo and clean unused landing styles`

## Final Verification

- `npm run build` passes.
- `git status --short` shows only intended tracked changes.
- Check built output:
  - `dist/client/og-image.png`
  - `dist/client/demo-poster.webp` or `dist/client/demo-poster.png`
  - `dist/client/_redirects`
  - `dist/client/es/legal/privacy/index.html`
  - `dist/client/es/legal/terms/index.html`
  - all EN vertical pages under `dist/client/verticals/<vertical>/index.html`
  - all ES vertical pages under `dist/client/es/verticals/<vertical>/index.html`
- Run route/link scans:
  - no internal `/restaurants/` links outside `public/_redirects`
  - sitemap output includes `/verticals/*` and `/es/legal/*`
  - no active `Coming soon` / `Muy pronto`
  - no hardcoded `You` in LiveDemo ES path
- Capture after screenshots for:
  - `/`
  - `/es/`
  - `/verticals/restaurant/`
  - `/verticals/airbnb/`
  - `/verticals/doctores/`
  - `/es/legal/privacy/`
  - `/es/legal/terms/`
- Draft PR description with:
  - checklist by block
  - screenshots before/after
  - verification commands
  - `Out of scope / follow-ups`
