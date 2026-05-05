export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  featured: boolean;
  cta: string;
  ctaHref: string;
  features: string[];
  note?: string;
}

export const plans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$XXX",
    period: "/ month",
    tagline: "For a single location ready to automate guest messaging.",
    featured: false,
    cta: "Get started",
    ctaHref: "https://wa.me/501XXXXXXXX?text=essential",
    features: [
      "1 WhatsApp Business number",
      "Up to 1,000 conversations / month",
      "Order-taking & reservations",
      "FAQ answering in 20+ languages",
      "Handoff to human agent",
      "Basic analytics dashboard",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$XXX",
    period: "/ month",
    tagline: "For growing properties that need full AI coverage across channels.",
    featured: true,
    cta: "Talk to us →",
    ctaHref: "https://wa.me/501XXXXXXXX?text=pro",
    features: [
      "Up to 3 WhatsApp numbers",
      "Unlimited conversations",
      "Multi-property dashboard",
      "Custom AI persona & voice",
      "PMS / POS integration (API)",
      "Priority 24/7 support",
      "Monthly strategy call",
      "White-label option",
    ],
    note: "Most popular",
  },
];
