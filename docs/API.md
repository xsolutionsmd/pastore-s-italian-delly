# Runtime and external action contract

Static landing site; no custom application backend or message handling.
The existing Dockerfile/runtime serves built static files on port 8080.

- GET /health returns a lightweight successful health response.
- GET /version.json reports the exact deployed source revision and is uncached.
- Home, Menu, Catering, Our Story and Visit must each load and refresh at their direct URL.
- Primary ordering link is the official Toast URL recorded in kb/contact-and-hours.md.
- Catering/call buttons use tel:+14108255316; directions use the verified store address.
- No cart, checkout, payment collection, account, booking or pretend message form.
- Toast owns availability, final prices, delivery/pickup selection and payment.
- Current example environments retain noindex. Actual customer-domain policy is outside this build.

## Runtime verification

Astra checked the populated application at source revision `63aed2adc778e612b1779ca1fb801b98602878f6` on 18 October 2026. The lifecycle container check passed, including the source label, exact revision and health response. A separate read-only runtime check passed for all five direct pages, 13 linked assets, noindex headers, uncached version data and real 404 responses for unknown routes/assets and private source paths. The local checked image was amd64; no Oracle/ARM64 release is claimed.

The first check completed its build but the isolated builder did not load the image into Docker. Explicitly loading that same cached artifact resolved the execution setup; the lifecycle check then passed. Disposable containers, synthetic volumes, test network, image and dedicated builder/cache were removed by exact identity and verified absent. Shared Docker resources were preserved.

The public action destinations reconcile to the accepted Toast, telephone and directions evidence. No orders, payments, calls or messages were submitted. The required REA analysis remains unavailable, so reconstruction/backend stage acceptance and downstream refinement/publication are pending coordinator resolution; these successful independent checks do not waive that requirement.
