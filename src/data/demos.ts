/**
 * Demo configuration per vertical.
 * Single WhatsApp number, prefilled message routes the bot.
 * Replace WA_NUMBER with the real production demo number when ready.
 */

export const WA_NUMBER = '501XXXXXXXX'; // TODO: replace with real demo number

export type VerticalId =
  | 'restaurant'
  | 'hotel'
  | 'pharmacy'
  | 'real_estate'
  | 'car_dealer';

export interface VerticalDemo {
  id: VerticalId;
  prefill_en: string;
  prefill_es: string;
  /** Inline SVG icon glyph (kept simple — Lucide-style strokes). */
  icon: string;
}

export const VERTICALS: VerticalDemo[] = [
  {
    id: 'restaurant',
    prefill_en: "Hi! I'd like to see your menu and place an order.",
    prefill_es: '¡Hola! Quiero ver el menú y hacer un pedido.',
    icon: 'utensils',
  },
  {
    id: 'hotel',
    prefill_en: "Hi! I'd like to check availability for a room this weekend.",
    prefill_es: '¡Hola! Quiero saber si hay habitación disponible este fin de semana.',
    icon: 'bed',
  },
  {
    id: 'pharmacy',
    prefill_en: "Hi! I'm looking for a product and would like to know if you have it in stock.",
    prefill_es: '¡Hola! Estoy buscando un producto, ¿lo tienen disponible?',
    icon: 'pill',
  },
  {
    id: 'real_estate',
    prefill_en: "Hi! I'm looking for a 2-bedroom apartment to rent.",
    prefill_es: '¡Hola! Estoy buscando un apartamento de 2 habitaciones en renta.',
    icon: 'home',
  },
  {
    id: 'car_dealer',
    prefill_en: "Hi! I'd like to book a test drive — what do you have available?",
    prefill_es: '¡Hola! Quiero agendar una prueba de manejo, ¿qué tienen disponible?',
    icon: 'car',
  },
];

/** Generic "book a call" prefill — used by secondary CTAs that don't switch verticals. */
export const BOOK_CALL_PREFILL = {
  en: "Hi! I'd like to book a call to learn more about The Clam AI for my business.",
  es: '¡Hola! Quiero agendar una llamada para saber más sobre The Clam AI para mi negocio.',
} as const;

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
