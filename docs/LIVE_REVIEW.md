# Live review and corrections

Independent desktop/mobile review of the initial managed release covered all five
pages, 147 menu rows in 17 categories, keyboard/touch navigation, category history,
reduced motion, no-JavaScript fallback and external ordering/directions. The Maman
reference, company assets and separate-page design were retained. No customer
transactions were performed. Social browsing beyond identity remained login-gated.

The first review requested three corrections:

- Preserve reading position when opening/closing navigation, including native modal
  focus. Capture the position before opening, prevent explicit focus scrolling and
  restore immediately after opening and closing.
- Let navigation text wrap inside its own grid/flex track at narrow widths with
  enlarged text. Keep arrows visible and the dialog vertically scrollable.
- Serve a branded Page not found document for unknown routes, retaining HTTP 404
  and providing Home/Menu recovery links.

Local corrective checks passed: repeated Home navigation at 1440x1000 and 390x844
preserved exact positions at three depths. At 320x700 with each computed font size
doubled, the dialog remained 320px wide and all links/arrows fit its 276px column.
The rendered error page's Menu recovery link reached the real menu. Source checks
reconciled all 147 names/prices/links and the text-only menu. Container lifecycle
and actual Compose HTTP checks passed, including the new error status/body checks.
The local candidate was built from the corrective working tree before commit;
its inherited base-revision image label is not a deployment claim.

Fresh independent live recheck follows publication of these corrections. Physical
Safari/Android and a full screen-reader audit were not performed. Earlier transient
review access failures recovered; their cause remains unknown.
