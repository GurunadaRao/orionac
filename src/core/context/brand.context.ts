/**
 * brand.context.ts
 * Core brand identity constants for Orionac.
 * Source: Company Overview PDF
 */

export const BRAND = {
  name: "Orionac",
  tagline: "Beyond Intelligence",
  founded: 2025,
  industry: "Artificial Intelligence Research",
  hq: {
    address: "Kodambakkam, Chennai, Tamil Nadu – 600024, India",
    city: "Chennai",
    country: "India",
  },
  contact: {
    email: "hello@orionac.io",
    website: "https://orionac.io",
  },
} as const;

export type Brand = typeof BRAND;
