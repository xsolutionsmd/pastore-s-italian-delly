# Frontend refinement r1 — 18 October 2026

Claude Opus 5.5 High refined the existing reconstructed frontend (base `8e3565a`, app
revision `63aed2a`). No new reference, layout system, font family or backend. The
Maman-derived structure, proportions, spacing, type scale and responsive behavior are
unchanged. Method: local build plus ordinary browser inspection at 1440, 390 and 320px.

## Changes and reasons

- **Home hero copy.** "Your next lunch order" closely echoed the reference's own hero
  line. Replaced with "Lunch from the delly." and a Pastore's-specific sentence (cold
  cuts, specialty sandwiches, take-home dinners, family deli and grocery on Loch Raven).
- **Catering photos.** Home and Catering repeated the same Italian Cold Cut + cannoli
  pair. Catering now uses two other authentic Toast originals: Turkey Club and the
  Family Servings Baked Ziti tray. They're labeled with their real item names, not
  presented as platter photos. They pair with the custom sandwich platter and
  take-home dinner copy.
- **Accurate captions.** "Something sweet to finish" and "Ask about dessert options"
  implied cannoli were a catering option; both captions now read "Filled cannoli" or
  were replaced.
- **Natural wording.** "Published standard platter terms:" became "Platters have a
  10-person minimum and need 48-hour notice with a $25 advance payment." Same facts.
  The phone button now reads "Call 410-825-5316". The story copy drops "In the family
  account shared by…" and keeps only sourced facts (Little Italy importing, the 1979
  move to Loch Raven, owner Vince Pastore). Menu and category notes are shorter, and
  the family-dinner note follows Toast's take-home-and-bake wording.
- **Desktop category strip.** With 17 categories the strip cut off mid-label with no
  cue that it scrolls. Edge fades now appear only while more categories are off-screen.
  Tabs get 4px side padding (the gap drops 32→24px, same visual rhythm) so the focus
  ring no longer crosses the label. The selected tab is revealed 48px in from the faded
  edge.

## Preserved

All 147 Toast rows across 17 stable-ID groups, with exact names, prices and item URLs.
The menu stays text-only. The Five Cheese Lasagna omission is kept. Toast, phone,
directions and holiday links are unchanged. Every page stays noindex. No form, cart or
custom backend.

## Checks

`npm run check` passes (build, static checks, Toast authority reconciliation, content
checks). In the browser: all five pages at 1440, 390 and 320px show no document
overflow, no broken images and no controls escaping their containers. The same holds
with every element's computed type size doubled. Also checked: menu tabs
(End/Home/ArrowLeft), back/forward, direct-hash refresh, phone selector across all 17
categories (147 rows), and navigation dialog focus, Tab wrap, Escape and focus return.
OS reduced-motion emulation was not available. The CSS/JS reduced-motion rules are
unchanged and were not exercised.
