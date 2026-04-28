# Storykeeping Collective Volunteer Listing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clickable volunteer card grid (3 placeholders) below the Storykeeping Collective photo collage on the Who We Are page.

**Architecture:** Single-file change to `components/who-we-are.tsx`. Add a `volunteerMembers: TeamMember[]` array and render it with the existing `MemberCard` component and `selectedMember`/`BioModal` state — no new components or interfaces needed.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Framer Motion, Playwright (e2e tests)

---

## File Map

| Action | Path |
|--------|------|
| Modify | `components/who-we-are.tsx` |
| Create | `tests/e2e/who-we-are.spec.ts` |

---

### Task 1: Write the failing Playwright test

**Files:**
- Create: `tests/e2e/who-we-are.spec.ts`

- [ ] **Step 1: Create the test file**

```typescript
// tests/e2e/who-we-are.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Who We Are page', () => {
  test('shows Storykeeping Collective volunteer cards', async ({ page }) => {
    await page.goto('/who-we-are');

    const section = page.locator('text=Meet the Storykeepers');
    await expect(section).toBeVisible();
  });

  test('volunteer card opens bio modal on click', async ({ page }) => {
    await page.goto('/who-we-are');

    await page.locator('text=Volunteer Placeholder 1').first().click();

    const modal = page.locator('text=A dedicated volunteer');
    await expect(modal).toBeVisible();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- tests/e2e/who-we-are.spec.ts
```

Expected: Both tests FAIL — "Meet the Storykeepers" heading and volunteer cards don't exist yet.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/e2e/who-we-are.spec.ts
git commit -m "test: add failing e2e tests for Storykeeping Collective volunteer listing"
```

---

### Task 2: Add volunteer data and render the card grid

**Files:**
- Modify: `components/who-we-are.tsx`

- [ ] **Step 1: Add the `volunteerMembers` array**

Inside the `WhoWeAre` component body, directly after the `boardMembers` array (around line 116), add:

```typescript
const volunteerMembers: TeamMember[] = [
    {
        name: "Volunteer Placeholder 1",
        title: "Storykeeper",
        photo: getImageUrl("crew2.png"),
        bio: "A dedicated volunteer and member of the Griot & Grits Storykeeping Collective. This placeholder will be replaced with the volunteer's full biography and photo when available."
    },
    {
        name: "Volunteer Placeholder 2",
        title: "Storykeeper",
        photo: getImageUrl("crew2.png"),
        bio: "A dedicated volunteer and member of the Griot & Grits Storykeeping Collective. This placeholder will be replaced with the volunteer's full biography and photo when available."
    },
    {
        name: "Volunteer Placeholder 3",
        title: "Storykeeper",
        photo: getImageUrl("crew2.png"),
        bio: "A dedicated volunteer and member of the Griot & Grits Storykeeping Collective. This placeholder will be replaced with the volunteer's full biography and photo when available."
    }
];
```

- [ ] **Step 2: Add the volunteer grid below the collage**

Inside the Storykeeping Collective `<div className="p-8">` block, directly after the closing `</div>` of the collage (the `flex flex-col md:relative md:w-full md:h-[500px]` div, around line 342), add:

```tsx
<div className="mt-12">
    <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Meet the Storykeepers
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {volunteerMembers.map((member) => (
            <MemberCard
                key={member.name}
                member={member}
                onClick={() => setSelectedMember(member)}
            />
        ))}
    </div>
</div>
```

- [ ] **Step 3: Run the e2e tests to confirm they pass**

Start the dev server in one terminal:
```bash
npm run dev
```

In another terminal:
```bash
npm test -- tests/e2e/who-we-are.spec.ts
```

Expected: Both tests PASS.

- [ ] **Step 4: Verify visually in the browser**

Open `http://localhost:3000/who-we-are`, scroll to the Storykeeping Collective section, and confirm:
- "Meet the Storykeepers" heading appears below the 4-photo collage
- 3 volunteer cards render in a responsive grid (2 columns on mobile, 3 on desktop)
- Clicking a card opens the bio modal with the placeholder text
- Closing the modal works correctly

- [ ] **Step 5: Commit**

```bash
git add components/who-we-are.tsx
git commit -m "feat: add Storykeeping Collective volunteer listing with 3 placeholder members"
```
