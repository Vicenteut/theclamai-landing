/**
 * Pricing tiers (USD, monthly).
 *
 * NOTE: Prices and Calendly link are PLACEHOLDERS. The user must confirm
 * the real numbers in Phase 4 before launch (see plan).
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

const WA = '501XXXXXXXX'; // TODO: real demo number
const CALENDLY = 'https://calendly.com/theclamai/intro'; // TODO: real Calendly

export const plans: PricingPlan[] = [
  {
    id: 'starter',
    priceUSD: 99, // TODO: confirm
    featured: false,
    ctaHref: `https://wa.me/${WA}?text=starter`,
  },
  {
    id: 'pro',
    priceUSD: 299, // TODO: confirm
    featured: true,
    highlight: 'most_popular',
    ctaHref: `https://wa.me/${WA}?text=pro`,
  },
  {
    id: 'custom',
    priceUSD: null,
    featured: false,
    ctaHref: CALENDLY,
  },
];

export type { VerticalId };
