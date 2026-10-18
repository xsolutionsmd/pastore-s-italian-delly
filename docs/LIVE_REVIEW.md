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

## Accepted independent recheck ? 18 October 2026

Corrections were published through protected PR2 at merged revision
`1a6633b375a0c4bab2f7cdd047c186bb60783b80` (product commit
`a66657653293a88608577280cf673e00e5ccc661`). All six release and CI workflows
succeeded. Independent all-three HTTP/source parity was captured at 17:44:25 UTC.
Navigation reading position/focus restore, 320px/200% text containment, vertical
dialog scrolling, branded HTTP404 recovery, five-page navigation and menu
category/history interactions passed the scoped live recheck.

The coordinator accepted 31 current product passes and explicitly reused the prior
actual Chrome CDP reduced-motion case for unchanged preference rules. This round's
temporary authored-rule test was narrower than OS preference emulation. Four
diagnostic attempts remain preserved: locator prescroll, unavailable T3 OS emulator,
an absent local branch ref corrected with remote heads, and an incomplete capture
after a restored override corrected in a fresh tab. None is silently called a pass.

All three actionable findings are resolved. This is dated product acceptance,
separate from current availability during the later shared-host incident. Final
availability verification and documentation publication remain subject to the
release hold. No physical Safari/Android review, full screen-reader audit, fresh OS
preference emulation or blanket clean-console pass is claimed. Earlier transient
access failures and their unknown cause remain documented.
