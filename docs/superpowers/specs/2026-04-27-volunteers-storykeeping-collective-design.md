# Volunteers — Storykeeping Collective Listing

**Date:** 2026-04-27
**Branch:** feat/add-volunteers-to-who-we-are
**File:** `components/who-we-are.tsx`

## Goal

Add a listing of Storykeeping Collective volunteers below the existing 4-photo collage in the Storykeeping Collective block on the Who We Are page. The listing uses the same card layout as the Strategic Advisory Board so the two sections share a consistent visual language.

## Scope

- Single file change: `components/who-we-are.tsx`
- No new components, no new interfaces, no new state
- No section reordering (deferred)

## Data

Add a `volunteerMembers: TeamMember[]` array inside the `WhoWeAre` component (same pattern as `teamMembers` and `boardMembers`). Populate with 3 placeholder entries:

| Field  | Value |
|--------|-------|
| name   | "Volunteer Placeholder 1 / 2 / 3" |
| title  | "Storykeeper" |
| photo  | Existing project image via `getImageUrl(...)` — swapped for real photos later |
| bio    | Short placeholder text describing the storykeeper role |
| linkedin | omitted |

## Layout

Directly below the closing `</div>` of the 4-photo collage block (~line 342 in current file), insert:

1. A subheading "Meet the Storykeepers" (same style as other subheadings)
2. A responsive grid — `grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8` — rendering one `MemberCard` per volunteer

Clicking any card opens the existing `BioModal` via the shared `selectedMember` state. No new modal logic needed.

## What is NOT changing

- Section order on the page
- `TeamMember` interface
- `MemberCard` component
- `BioModal` component
- `selectedMember` / `setSelectedMember` state
