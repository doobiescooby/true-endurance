# Increase spacing between last pricing feature and CTA button

## Goal
Add a consistent, slightly larger gap between the last bullet point in each pricing card and the CTA button below it.

## Scope
All three pricing cards (Free, Pro, Elite) in the landing page Pricing section.

## What will change
- In `src/components/site/Cards.tsx`, add bottom margin to the `<ul>` inside the `PricingCard` component so the CTA button is visually separated from the last feature bullet.

## Implementation
- Append `mb-8` to the existing `<ul>` className in `PricingCard`.
- No changes to colors, typography, card padding, responsive behavior, or component structure.
- Verify the component still type-checks and renders correctly across breakpoints.

## Expected result
Each pricing card shows a clear gap between the last listed feature and the CTA button, making the layout feel less cramped.
