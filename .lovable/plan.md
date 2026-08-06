# Testimonials carousel with 30 reviews

Turn the "Real stories" section into a swipeable carousel containing the 3 existing testimonials plus 27 new ones (30 total), each with a 4- or 5-star rating.

## What changes

- **Star ratings**: `TestimonialCard` currently hardcodes 5 gold stars. Add a `rating` prop (4 or 5) that renders filled/empty stars, so 4-star reviews look genuine.
- **New review data**: a separate data file with 30 short, varied testimonials — different lengths, tones, first names + age (e.g. "Tom, 38", "R., 45"), and time-with-program values (2 weeks to 1 year). Mix of 5-star (majority) and 4-star (with mild, honest caveats like "took longer than I expected" or "wish there were more sessions") so they read authentically rather than uniformly glowing.
- **Carousel**: replace the 3-column static grid with the existing carousel component — 1 card per view on mobile, 2 on tablet, 3 on desktop, with previous/next arrows and drag/swipe support. Cards keep equal height and current styling.
- Copy stays free of medical claims and keeps the calm, discreet tone of the site.

## Technical notes

- Uses the already-installed `src/components/ui/carousel.tsx` (Embla) — no new dependencies.
- New file `src/data/testimonials.ts` exports the array; `src/routes/index.tsx` maps over it.
- `TestimonialCard` gains an optional `rating` prop defaulting to 5, so no other usage breaks.
- Accessibility: stars get an aria-label like "Rated 4 out of 5"; carousel arrows keep visible focus styles.
