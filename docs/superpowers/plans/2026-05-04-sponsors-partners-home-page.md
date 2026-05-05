# Sponsors & Partners Home Page Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move sponsors/partners from the Who We Are page to the home page as a styled "thank you" section with tier hierarchy, framer-motion animations, and a "Become a Sponsor" CTA.

**Architecture:** Extract sponsor/partner data into `lib/sponsors.ts`, build a new `components/sponsors-partners.tsx` client component, wire it into `app/page.tsx`, and strip the duplicate sections from `components/who-we-are.tsx`.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Framer Motion, Playwright (e2e tests)

---

## File Map

| Action | Path |
|--------|------|
| Create | `lib/sponsors.ts` |
| Create | `components/sponsors-partners.tsx` |
| Modify | `app/page.tsx` |
| Modify | `components/who-we-are.tsx` |
| Modify | `tests/e2e/home.spec.ts` |

---

### Task 1: Write the failing Playwright test

**Files:**
- Modify: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Add the failing test to `tests/e2e/home.spec.ts`**

Open `tests/e2e/home.spec.ts` and append these two tests inside the existing `test.describe` block:

```typescript
  test('shows sponsors and partners section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Thank You to Our Sponsors & Partners')).toBeVisible();
  });

  test('shows become a sponsor CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Interested in sponsoring?')).toBeVisible();
  });
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- tests/e2e/home.spec.ts
```

Expected: the two new tests FAIL — the heading and CTA don't exist on the home page yet.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/e2e/home.spec.ts
git commit -m "test: add failing e2e tests for sponsors & partners home page section"
```

---

### Task 2: Create sponsor/partner data module

**Files:**
- Create: `lib/sponsors.ts`

- [ ] **Step 1: Create `lib/sponsors.ts`**

```typescript
import { getLogoUrl } from '@/lib/cdn';

export interface Sponsor {
    name: string;
    logo: string;
    website?: string;
}

export const goldSponsors: Sponsor[] = [
    {
        name: "Resilient Ventures",
        logo: getLogoUrl("RV Color Horizontal.jpg"),
        website: "https://resilient-ventures.com"
    }
];

export const silverSponsors: Sponsor[] = [];

export const bronzeSponsors: Sponsor[] = [];

export const partners: Sponsor[] = [
    {
        name: "Mass Open Cloud",
        logo: getLogoUrl("MOCwordmark_RGB_small.png"),
        website: "https://massopen.cloud"
    }
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/sponsors.ts
git commit -m "feat: add sponsors/partners data module"
```

---

### Task 3: Create the SponsorsPartners component

**Files:**
- Create: `components/sponsors-partners.tsx`

- [ ] **Step 1: Create `components/sponsors-partners.tsx`**

```tsx
"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { goldSponsors, silverSponsors, bronzeSponsors, partners, Sponsor } from '@/lib/sponsors';

const logoCard = (sponsor: Sponsor, width: string, height: string, index: number) => (
    <motion.a
        key={sponsor.name}
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center"
    >
        <div className={`relative ${width} ${height}`}>
            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
        </div>
    </motion.a>
);

const SponsorsPartners = () => {
    const hasSponsors = goldSponsors.length > 0 || silverSponsors.length > 0 || bronzeSponsors.length > 0;
    const hasPartners = partners.length > 0;

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                        Thank You to Our Sponsors &amp; Partners
                    </h2>

                    {goldSponsors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-yellow-600">Gold Sponsors</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {goldSponsors.map((s, i) => logoCard(s, "w-64", "h-32", i))}
                            </div>
                        </div>
                    )}

                    {silverSponsors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-gray-400">Silver Sponsors</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {silverSponsors.map((s, i) => logoCard(s, "w-48", "h-24", i))}
                            </div>
                        </div>
                    )}

                    {bronzeSponsors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-orange-600">Bronze Sponsors</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {bronzeSponsors.map((s, i) => logoCard(s, "w-32", "h-16", i))}
                            </div>
                        </div>
                    )}

                    {hasSponsors && hasPartners && (
                        <div className="border-t border-gray-200 my-12" />
                    )}

                    {hasPartners && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-center mb-8 text-gray-600">Our Partners</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {partners.map((s, i) => logoCard(s, "w-48", "h-24", i))}
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <a
                            href="/#contact"
                            className="inline-block border-2 border-[#AE2D24] text-[#AE2D24] px-8 py-3 rounded-lg font-semibold hover:bg-[#AE2D24] hover:text-white transition-colors duration-200"
                        >
                            Interested in sponsoring? Get in touch →
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SponsorsPartners;
```

- [ ] **Step 2: Commit**

```bash
git add components/sponsors-partners.tsx
git commit -m "feat: add SponsorsPartners component with tier hierarchy and CTA"
```

---

### Task 4: Add SponsorsPartners to the home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update `app/page.tsx`**

Add the import and insert the component between `<Testimonials />` and `<ContactSection />`:

```tsx
import About, { CollectionCTA } from '@/components/about'
import ContactSection from '@/components/contact'
import GoFundMe from '@/components/gofundme'
import Hero from '@/components/hero'
import MediaCoverage from '@/components/media-coverage'
import Nav from '@/components/nav'
import Services from '@/components/services'
import SponsorsPartners from '@/components/sponsors-partners'
import Testimonials from '@/components/testimonials'
import Works from '@/components/works'
import { loadVideoMetadata } from '@/lib/load-metadata'
import { getGoFundMeConfig } from '@/lib/feature-flags'
import React from 'react'

const page = () => {
    const videoMetadata = loadVideoMetadata();
    const goFundMeConfig = getGoFundMeConfig();

    return (
        <>
            <div id="home"></div>
            <Nav />
            <Hero />
            <CollectionCTA />
            <Works videos={videoMetadata.videos} />
            <About />
            <Services />
            {/* <Stats /> */}
            {goFundMeConfig.enabled && goFundMeConfig.campaignId && (
                <GoFundMe
                    campaignId={goFundMeConfig.campaignId}
                    useEmbedded={goFundMeConfig.useEmbedded}
                    showTracker={goFundMeConfig.showTracker}
                />
            )}
            <MediaCoverage />
            <Testimonials />
            <SponsorsPartners />
            <ContactSection />
        </>
    )
}

export default page
```

- [ ] **Step 2: Run the e2e tests to confirm the home page tests pass**

```bash
npm test -- tests/e2e/home.spec.ts
```

Expected: ALL tests pass, including the two new ones.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add SponsorsPartners section to home page"
```

---

### Task 5: Remove sponsors/partners from Who We Are

**Files:**
- Modify: `components/who-we-are.tsx`

- [ ] **Step 1: Remove `getLogoUrl` from the import**

Change line 7 from:
```typescript
import { getBioImageUrl, getImageUrl, getLogoUrl } from '@/lib/cdn';
```
To:
```typescript
import { getBioImageUrl, getImageUrl } from '@/lib/cdn';
```

- [ ] **Step 2: Remove the `Sponsor` interface**

Remove lines 30–34:
```typescript
interface Sponsor {
    name: string;
    logo: string;
    website?: string;
}
```

- [ ] **Step 3: Remove the sponsor/partner data arrays**

Remove these lines from inside the `WhoWeAre` component body (currently around lines 151–169):
```typescript
    const goldSponsors: Sponsor[] = [
        {
            name: "Resilient Ventures",
            logo: getLogoUrl("RV Color Horizontal.jpg"),
            website: "https://resilient-ventures.com"
        }
    ];

    const silverSponsors: Sponsor[] = [];

    const bronzeSponsors: Sponsor[] = [];

    const partners: Sponsor[] = [
        {
            name: "Mass Open Cloud",
            logo: getLogoUrl("MOCwordmark_RGB_small.png"),
            website: "https://massopen.cloud"
        }
    ];
```

- [ ] **Step 4: Remove the Sponsors section JSX**

Remove the entire block (currently lines 421–519):
```tsx
            {/* Sponsors Section */}
            {(goldSponsors.length > 0 || silverSponsors.length > 0 || bronzeSponsors.length > 0) && (
                <section className="py-20 bg-gray-100">
                    ...
                </section>
            )}
```

- [ ] **Step 5: Remove the Partners section JSX**

Remove the entire block (currently lines 521–556):
```tsx
            {/* Partners Section */}
            {partners.length > 0 && (
                <section className="py-20 bg-white">
                    ...
                </section>
            )}
```

- [ ] **Step 6: Run all e2e tests to confirm nothing broke**

```bash
npm test
```

Expected: ALL tests pass. In particular, `who-we-are.spec.ts` and `home.spec.ts` both pass.

- [ ] **Step 7: Commit**

```bash
git add components/who-we-are.tsx
git commit -m "refactor: remove sponsors/partners from Who We Are page (moved to home)"
```
