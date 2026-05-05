# Sponsors & Partners — Home Page Section Design

**Date:** 2026-05-04
**Branch:** feat/add-volunteers-to-who-we-are

## Goal

Move the sponsors and partners display from the Who We Are page to the home page. Add tier-based visual hierarchy, framer-motion animations, and a "Become a Sponsor" CTA. Remove the section from Who We Are entirely.

## Files

| Action | Path |
|--------|------|
| Create | `lib/sponsors.ts` |
| Create | `components/sponsors-partners.tsx` |
| Modify | `app/page.tsx` |
| Modify | `components/who-we-are.tsx` |

## Data (`lib/sponsors.ts`)

Export a `Sponsor` interface and four named arrays:

```ts
export interface Sponsor {
  name: string;
  logo: string;
  website?: string;
}

export const goldSponsors: Sponsor[]
export const silverSponsors: Sponsor[]
export const bronzeSponsors: Sponsor[]
export const partners: Sponsor[]
```

Pre-populate from current `who-we-are.tsx` data:
- `goldSponsors`: Resilient Ventures (`getLogoUrl("RV Color Horizontal.jpg")`, `https://resilient-ventures.com`)
- `silverSponsors`: `[]`
- `bronzeSponsors`: `[]`
- `partners`: Mass Open Cloud (`getLogoUrl("MOCwordmark_RGB_small.png")`, `https://massopen.cloud`)

## Component (`components/sponsors-partners.tsx`)

### Section wrapper
- `"use client"` (needs framer-motion)
- `<section className="py-20 bg-gray-50">`
- `<div className="container mx-auto px-6">`
- `whileInView` fade-in on the whole section (`initial={{ opacity: 0, y: 20 }}`, `transition={{ duration: 0.6 }}`, `viewport={{ once: true }}`)

### Heading
```
Thank You to Our Sponsors & Partners
```
- `text-4xl font-bold text-center mb-12 text-gray-900`

### Sponsor tiers (Gold → Silver → Bronze)
Each tier only renders when its array is non-empty. Per tier:
- Tier label centered above logos, styled in tier color:
  - Gold: `text-yellow-600`
  - Silver: `text-gray-400`
  - Bronze: `text-orange-600`
- Logo cards: white background (`bg-white`), rounded-lg, shadow-lg, clickable `<a>` linking to `sponsor.website` (target `_blank`)
- Logo image sizes by tier:
  - Gold: `w-64 h-32`
  - Silver: `w-48 h-24`
  - Bronze: `w-32 h-16`
- Logos use Next.js `<Image>` with `fill` and `object-contain`
- `whileInView` staggered animation per logo: `initial={{ opacity: 0, scale: 0.9 }}`, `animate={{ opacity: 1, scale: 1 }}`, delay increments by `index * 0.1`
- `whileHover={{ scale: 1.05 }}`
- Cards centered horizontally with `flex flex-wrap justify-center gap-8`

### Divider
`<div className="border-t border-gray-200 my-12" />` — only rendered when both sponsors and partners are present.

### Partners
Only renders when `partners.length > 0`. Layout identical to a sponsor tier but:
- Label: "Our Partners" in `text-gray-600`
- Card size: `w-48 h-24` (same as Silver)

### Become a Sponsor CTA
Always rendered at the bottom:
```tsx
<div className="text-center mt-12">
  <a
    href="/#contact"
    className="inline-block border-2 border-[#AE2D24] text-[#AE2D24] px-8 py-3 rounded-lg font-semibold hover:bg-[#AE2D24] hover:text-white transition-colors duration-200"
  >
    Interested in sponsoring? Get in touch →
  </a>
</div>
```

## Home Page (`app/page.tsx`)

Add import and insert `<SponsorsPartners />` between `<Testimonials />` and `<ContactSection />`.

## Who We Are (`components/who-we-are.tsx`)

Remove:
- `interface Sponsor` declaration
- `goldSponsors`, `silverSponsors`, `bronzeSponsors`, `partners` arrays
- The Sponsors `<section>` block (conditional on sponsor arrays)
- The Partners `<section>` block (conditional on partners array)
- `getLogoUrl` from the import line (confirmed only used for sponsor/partner data)
