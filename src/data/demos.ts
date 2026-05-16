/**
 * Demo configuration per vertical.
 * Single WhatsApp number, prefilled message routes the bot.
 * Replace WA_NUMBER with the real production demo number when ready.
 */

export const WA_NUMBER = '5016105086'; // Belize — TheClam AI demo bot (production)

export const GENERIC_DEMO_PREFILL = {
  en: 'Show me a demo for my business',
  es: 'Muéstrame un demo para mi negocio',
} as const;

export type VerticalId =
  | 'hotel'
  | 'airbnb'
  | 'restaurant'
  | 'real_estate'
  | 'pharmacy'
  | 'car_sales'
  | 'doctores';

export type VerticalStatus = 'live' | 'pilot' | 'soon';

export interface VerticalDemo {
  id: VerticalId;
  status: VerticalStatus;
  prefill_en: string;
  prefill_es: string;
  /** Inline SVG icon glyph (kept simple — Lucide-style strokes). */
  icon: string;
}

/** Verticals that have a dedicated sub-page (used by [vertical] dynamic routes). */
export const PAGE_ENABLED_VERTICALS: VerticalId[] = [
  'hotel',
  'airbnb',
  'restaurant',
  'real_estate',
  'pharmacy',
  'car_sales',
  'doctores',
];

/** URL slug ↔ vertical id. URL slugs are friendlier (plural, hyphenated). */
export const VERTICAL_SLUGS: Record<VerticalId, string> = {
  hotel: 'hotel',
  airbnb: 'airbnb',
  restaurant: 'restaurant',
  real_estate: 'real_estate',
  pharmacy: 'pharmacy',
  car_sales: 'car_sales',
  doctores: 'doctores',
};

export function slugToVerticalId(slug: string): VerticalId | null {
  const entry = (Object.entries(VERTICAL_SLUGS) as [VerticalId, string][]).find(
    ([, s]) => s === slug,
  );
  return entry?.[0] ?? null;
}

export const VERTICALS: VerticalDemo[] = [
  {
    id: 'hotel',
    status: 'live',
    prefill_en: "Hi! I'd like to check availability for a room this weekend.",
    prefill_es: '¡Hola! Quiero saber si hay habitación disponible este fin de semana.',
    icon: 'bed',
  },
  {
    id: 'restaurant',
    status: 'live',
    prefill_en: "Hi! I'd like to see your menu and place an order.",
    prefill_es: '¡Hola! Quiero ver el menú y hacer un pedido.',
    icon: 'utensils',
  },
  {
    id: 'airbnb',
    status: 'pilot',
    prefill_en: "Hi! I'm interested in your Airbnb and want to check availability.",
    prefill_es: '¡Hola! Me interesa tu Airbnb y quiero revisar disponibilidad.',
    icon: 'key',
  },
  {
    id: 'real_estate',
    status: 'pilot',
    prefill_en: "Hi! I'm looking for a 2-bedroom apartment to rent.",
    prefill_es: '¡Hola! Estoy buscando un apartamento de 2 habitaciones en renta.',
    icon: 'home',
  },
  {
    id: 'car_sales',
    status: 'pilot',
    prefill_en: "Hi! I'd like to book a test drive — what do you have available?",
    prefill_es: '¡Hola! Quiero agendar una prueba de manejo, ¿qué tienen disponible?',
    icon: 'car',
  },
  {
    id: 'pharmacy',
    status: 'pilot',
    prefill_en: "Hi! I'm looking for a product and would like to know if you have it in stock.",
    prefill_es: '¡Hola! Estoy buscando un producto, ¿lo tienen disponible?',
    icon: 'pill',
  },
  {
    id: 'doctores',
    status: 'pilot',
    prefill_en: "Hi! I'd like to book a doctor's appointment.",
    prefill_es: '¡Hola! Quiero agendar una cita médica.',
    icon: 'stethoscope',
  },
];

/** Generic "book a call" prefill — used by secondary CTAs that don't switch verticals. */
export const BOOK_CALL_PREFILL = {
  en: "Hi! I'd like to book a call to learn more about The Clam AI for my business.",
  es: '¡Hola! Quiero agendar una llamada para saber más sobre The Clam AI para mi negocio.',
} as const;

/** Build a generic wa.me demo link when no vertical has been selected. */
export function waGenericDemoLink(lang: 'en' | 'es'): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(GENERIC_DEMO_PREFILL[lang])}`;
}

/** Build a wa.me link with a prefilled message for a vertical + locale. */
export function waLink(verticalId: VerticalId, lang: 'en' | 'es'): string {
  const v = VERTICALS.find((x) => x.id === verticalId) ?? VERTICALS[0];
  const text = encodeURIComponent(lang === 'es' ? v.prefill_es : v.prefill_en);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

/** Build a wa.me link for the "book a call" CTA. */
export function waBookCallLink(lang: 'en' | 'es'): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(BOOK_CALL_PREFILL[lang])}`;
}
