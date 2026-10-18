# Frontend reconstruction blueprint

## Evidence and limits

Selected reference: [Maman home](https://mamannyc.com/), [catering](https://mamannyc.com/catering) and [Soho menu](https://mamannyc.com/locations/soho), inspected 18 October 2026. The coordinator supplied desktop 1440×1000 and phone 390×844 captures and observed navigation/menu flows. The implementation specialist also inspected the live home/catering through T3 and viewed all five supplied reference captures. These are ordinary browser observations.

The dedicated REA browser startup was unavailable. No REA Evidence ID, passive capture or runtime reconciliation was produced. Under the owner's October 18, 2026 correction, REA availability is not an acceptance gate: the completed browser/developer-tools evidence supports reconstruction and continuation through refinement, deployment and live review without a waiver or repair wait. The actual method used rendered desktop/mobile reference views, DOM/computed style measurements and browser-visible behavior. This does not claim REA ran. Reference server rules, private code and inaccessible transaction states remain unknown. The coordinator retains captures and interaction evidence outside this public repository.

## Observed reference structure

- Canvas approximately #f9faf8, blue text, a slim fixed centered logo masthead and left navigation toggle. Desktop home uses roughly 34% text / 66% photography; text sits low in the left column. Phone puts the photograph first and text below.
- Light uppercase sans headings; runtime home heading measurement 28px, catering heading 42px. Catering body measured 15.75px EB Garamond in a centered 546px column at 1440px. Thin rectangular outline buttons; no rounded card grid.
- Sections alternate centered text with paired, staggered photographs and generous gaps. Catering begins with a narrow centered introduction and wide button, followed by paired imagery and explanatory text.
- The Soho food menu is text-only: horizontally selected categories, serif names/descriptions, aligned prices and fine separators. No per-item images. The supplied mobile capture shows selected-category content. Reference newsletter, promotional popup, multi-location choice and decorative art are excluded.

## Implementation tokens and geometry

- Paper #f9f8f4; oxblood #692d38; body #503d3d; rule #d7c9c7. This is a design adaptation to the genuine red/gold badge, not an asserted official brand standard.
- Two self-hosted OFL font families: Jost 300/400/500 for display/controls, EB Garamond 400/500 for body/menu. Main headings 30–42px; section headings 27–34px; body 19–21px; outline controls use 12px spaced uppercase text.
- Header 80px desktop / approximately 75px phone, centered genuine badge, left menu toggle, right Toast action. Its slightly taller height accommodates the badge. Live measurement keeps sticky controls below the header when enlarged text changes its height.
- Home desktop grid 34/66; left gutter 5vw (28–76px), low-aligned copy. Hero photography retains the complete 4:3 composition. Its height follows the real photograph instead of forcing the reference's taller viewport crop and cutting off roll halves. Phone stacks image before copy with a 55px text inset.
- Editorial grid 38/62, reversed in the next section. Image pair gap 36px desktop / 20px phone; second image offset 75px / 40px. Native ratios preserve food and embedded branding instead of cropping to the reference's portrait frames. Muffalettini stays below 500 CSS px at reviewed widths; archive images remain bounded by source quality.
- Section gaps 140px desktop / 95px phone. Introductions max 550px. Menu max 1120px with two desktop columns and one phone column. Story max 1160px; Visit max 1060px. At 700px, editorial/story/visit content stacks; 320px additionally simplifies the footer.

## Page and company mapping

- `/`: Porchetta Verde hero, genuine badge; deli/grocery introduction; Burrata Bella and Muffalettini signatures; Italian Cold Cut and filled cannoli beside catering copy; real Loch Raven exterior. Food examples are accurately labeled, not represented as catering-platter photographs. [S1][S2]
- `/menu/`: all 147 current Toast prepared-food purchase rows in 17 stable-ID categories, including bread/serving variants. The accepted asset index normalizes these to 98 dish/product groups; the interface preserves every purchase row rather than implying 147 distinct dishes. Names, prices and exact Toast item URLs reconcile to `menu-source.json`. Current Toast overrides older official/PDF menus. Five Cheese Lasagna keeps name/price and a call-confirm description; contradictory beef ingredients are omitted. No inferred dietary badges. Grocery/drinks/deli stock link to Toast. [S2][S7][S8]
- `/catering/`: narrow introduction, phone CTA, paired food photographs, Standard $10.95/person and Deluxe $13.95/person; 10-person minimum, 48-hour notice and $25 advance payment stated as published standard platter terms. Custom selections and availability require phone confirmation. No inquiry/payment form. [S4]
- `/our-story/`: genuine 1926 shop archive, published family Italian-food importing history, 1979 retail move, owner Vince Pastore, archival counter image. No inferred founding year or claim that the archival counter is a new photo. [S1][S3]
- `/visit/`: September 2026 real exterior, verified address/phone, Tuesday–Saturday 9am–4pm; Sunday/Monday closed; official holiday link, directions and business social links. Venice artwork is not used as a storefront. [S1][S5][S6]

Source keys resolve in [sources.md](sources.md). Asset provenance and selected paths are in [media.md](media.md). Authentic originals and documented asset gaps remain with the coordinator; no generated business photography is used.

## Visible behavior and integration boundaries

Navigation opens a native full-screen dialog, with a desktop photograph and five direct links. It focuses Close, explicitly traps Tab in both directions, closes on Escape/Close and restores trigger focus. Without JavaScript, a normal navigation list remains available.

Desktop categories are horizontally scrollable ARIA tabs with Left/Right/Home/End selection. Phone uses a labeled native selector with short labels that remain legible at 200% typography. Both update the same stable hash/panel; back/forward and direct category URLs restore selection. All 147 rows are static HTML and remain readable without JavaScript; printing shows every category. Each item links to its exact Toast page. There is no local cart, search, loading request, empty-result state or form.

Toast owns ordering, availability, fulfillment and payment. Catering uses `tel:+14108255316`; directions use the verified Google Maps address. No custom backend inputs, records, secrets or speculative APIs are introduced. Runtime health/version acceptance belongs to the coordinator under [API.md](../docs/API.md).

Motion is limited to a 220ms dialog entrance and control hover changes. `prefers-reduced-motion: reduce` disables transitions/animation and switches scrolling to instant. No continuous decorative motion needs a pause control. OS preference emulation was unavailable in T3; CSS/JS support was inspected, not claimed as an OS-emulated pass.

Every direct page has a distinct static title/description and `noindex, nofollow` on all XS environments. No customer-domain canonical or social-image URL is guessed before hosting is verified.

## Reproduction and verification

`app/scripts/generate.mjs` owns five HTML entries; `app/src/menu.json` is the sanitized public menu snapshot. `npm run build` regenerates entries and builds the existing Vite stack. `npm run check` checks links/resources/noindex, five direct outputs, exact menu names/prices/URLs, catering terms and source-authority parity when the KB is present. The starter's blanket dollar-price prohibition was replaced by explicit sourced-menu reconciliation; other claim guards remain.

Built pages were inspected through T3 at 1440×1000, 390×844 and 320×844, including lower imagery/content and footer. All five pages were also checked at 200% typography on 320/390px. Category switching, keyboard tabs, history, dialog focus/close and direct page navigation were exercised. Narrow-text reflow, mobile linebreak spacing and dialog Tab wrapping were repaired/rechecked. No real order, call, message or payment was submitted. Backend runtime, refinement, publication and acceptance remain coordinator-owned.
