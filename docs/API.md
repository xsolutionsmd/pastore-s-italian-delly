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

This is the intended contract. Astra will verify the populated frontend, runtime and links after reconstruction before accepting backend/integrations.
