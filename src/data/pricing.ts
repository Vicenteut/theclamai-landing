/**
 * Pricing tiers (USD, monthly).
 *
 * NOTE: Prices are PLACEHOLDERS pending user confirmation. All CTAs route
 * to WhatsApp (no external scheduler — coherent with the product).
 */

import type { VerticalId } from './demos';

export interface PricingPlan {
  id: 'starter' | 'pro' | 'custom';
  /** Optional badge label shown above the card (e.g. "Most popular"). */
  highlight?: 'most_popular';
  /** USD price displayed; null for "Custom" plans. */
  priceUSD: number | null;
  /** i18n key suffix — `pricing.plans.<id>.{name,tagline,cta,features[*]}`. */
  // (rendering pulls all copy from i18n by id)
  ctaHref: string;
  featured: boolean;
}

import { WA_NUMBER } from './demos';

const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// All tiers display "Contact us" until the user finalizes pricing.
// Re-introduce numeric priceUSD when ready; component already handles both modes.
export const plans: PricingPlan[] = [
  {
    id: 'starter',
    priceUSD: null,
    featured: false,
    ctaHref: wa("Hi! I'm interested in the Starter plan for my business."),
  },
  {
    id: 'pro',
    priceUSD: null,
    featured: true,
    highlight: 'most_popular',
    ctaHref: wa("Hi! I'm interested in the Pro plan for my business."),
  },
  {
    id: 'custom',
    priceUSD: null,
    featured: false,
    ctaHref: wa("Hi! I'd like to discuss a Custom plan for my business."),
  },
];

export type { VerticalId };
