# Interswitch API Integration Guide

This is the primary backend reference for integrating Interswitch payments. It consolidates all prior docs into one focused implementation guide.

## 1. Quick Start

Use these sandbox credentials to get started quickly:

- Merchant Code: MX6072
- Pay Item ID (Payable Code): 9405967
- Client ID: IKIAB23A4E2756605C1ABC33CE3C287E27267F660D61
- Secret: secret
- Mode: TEST

Core flow:

1. Initialize payment (inline, redirect, or API-first).
2. Customer completes payment.
3. Confirm outcome server-side before giving value.

## 2. Environment and Base URLs

Sandbox defaults (normalized):

- Hosted checkout script (main): https://newwebpay.qa.interswitchng.com/inline-checkout.js
- Hosted redirect form action (main): https://newwebpay.qa.interswitchng.com/collections/w/pay
- Collections API (sandbox): https://qa.interswitchng.com

Production defaults:

- Hosted checkout script (main): https://newwebpay.interswitchng.com/inline-checkout.js
- Hosted redirect form action (main): https://newwebpay.interswitchng.com/collections/w/pay
- Collections API (production): https://webpay.interswitchng.com

Regional note (DRC):

- DRC docs also reference: https://webpay-ui.k8.isw.la for sandbox-like hosted checkout.
- Treat DRC URLs and payable setup as environment-specific overrides from your account manager or dashboard configuration.

## 3. Authentication

For API endpoints that require auth, generate an access token and send:

- Authorization: Bearer <access_token>
- Content-Type: application/json

Token generation is required before card APIs, wallet APIs, USSD generation, and similar protected calls.

## 4. Integration Methods

### 4.1 Inline Checkout

Use when you want checkout inside your page.

Required fields:

- merchant_code
- pay_item_id
- txn_ref (unique per payment)
- amount (minor unit)
- currency (ISO numeric, NGN = 566)
- cust_email
- mode (TEST or LIVE)
- onComplete callback

Important:

- Customer callback indicates flow completion, not final settlement certainty.
- Always requery transaction status on your server before fulfillment.

### 4.2 Web Redirect Checkout

Use when you want a simple HTML form post to hosted payment page.

Minimum fields:

- merchant_code
- pay_item_id
- txn_ref
- amount (minor unit)
- currency
- site_redirect_url

Important:

- Redirect payload is browser-side and non-authoritative.
- Do not fulfill based on redirect response alone.
- Perform server-side transaction status verification.

### 4.3 API-First Pay Bill

Use when you want to generate payment URLs server-side and control delivery channel.

Endpoint:

- POST /collections/api/v1/pay-bill (under your selected base URL)

Typical request fields:

- merchantCode
- payableCode
- amount
- redirectUrl
- customerId
- customerEmail
- currencyCode

Response includes paymentUrl. Redirect customer to paymentUrl and then verify status server-side.

## 5. Transaction Verification (Mandatory)

After every checkout completion, verify status from server:

- GET /collections/api/v1/gettransaction.json

Query params:

- merchantcode
- transactionreference
- amount

Validation rules:

1. ResponseCode must indicate success (typically 00).
2. Returned amount must match your expected amount.
3. Transaction reference must match your original request.

Only fulfill after all checks pass.

## 6. Card Payments API Flow

Purchase endpoint:

- POST /api/v3/purchases

Core request fields:

- customerId
- amount
- currency
- authData
- transactionRef

Possible outcomes:

- Immediate authorization response.
- T0: OTP required.
- S0: 3D Secure required.

### 6.1 OTP Branch (T0)

Authenticate OTP endpoint:

- POST /api/v3/purchases/otps/auths

Typical fields:

- paymentId
- otp
- transactionId
- eciFlag (optional)

Then perform transaction verification.

### 6.2 3D Secure Branch (S0)

When S0 is returned, use values such as JWT, MD, ACSUrl, and transactionId.

Flow:

1. Submit JWT and MD to ACSUrl (iframe or redirect).
2. Customer completes bank authentication.
3. Authorize with 3D Secure authorization endpoint using paymentId, transactionId, eciFlag.
4. Verify final transaction status server-side.

Normalization note:

- deviceChannel appears as both Browser and browser in source docs. Treat as provider-defined and keep consistent with the API contract in your chosen SDK or endpoint version.

## 7. Non-Card Payments

Supported non-card channels include:

- USSD
- Bank transfer (dynamic and static)
- QR
- Wallet providers (for example OPAY, MOMO, PalmPay, Pocket)

### 7.1 USSD

Endpoint:

- POST /collections/api/v1/sdk/ussd/generate

Typical fields:

- amount
- bankCode
- surcharge
- currencyCode
- merchantTransactionReference

### 7.2 Transfer

Dynamic transfer:

- Tied to single transaction and amount.

Static transfer (virtual account):

- Generate permanent account for repeated inbound payments.
- Match incoming webhook/transaction data to your customer using account reference fields.

### 7.3 QR

Use the Generate QR endpoint for QR-based payment collection.

### 7.4 Wallet

Wallet flow usually includes:

1. Initialize transaction.
2. Customer authorizes in wallet app/provider flow.
3. Query status endpoint.

## 8. OPAY-Specific Flow

Initialize endpoint:

- POST /collections/api/v1/opay/initialize

Two supported initialization variants:

- Variant A: pass amount with transactionReference.
- Variant B: pass paymentId with transactionReference.

Initialize response typically includes:

- redirectUrl
- transactionReference
- responseCode

Then:

1. Redirect customer to redirectUrl.
2. After completion, call status endpoint.

Status endpoint:

- POST /collections/api/v1/opay/status
- Field: reference (transaction reference)

Normalized interpretation note:

- Source docs show initialize responseCode as 09 and status responseCode as 00 in examples.
- Treat 00 as successful completion signal after status check, and rely on final status query for decisioning.

## 9. Payment Links

Payment links support:

- Single payments
- Recurring/subscription payments

Typical use cases:

- No-website merchants
- Invoice collection
- Subscription billing

Operational note:

- Payment-link events can be delivered through webhooks for automation.

## 10. Webhooks

Configure webhook URL and event types in Quickteller Business dashboard.

Common event families:

- TRANSACTION.*
- SUBSCRIPTION.*
- LINK.*
- INVOICE.*

Receiver requirements:

1. Validate X-Interswitch-Signature.
2. Signature algorithm: HMAC-SHA512 over raw request body using your webhook secret.
3. Return HTTP 200 quickly.
4. Process asynchronously to avoid retries.
5. Implement idempotency using unique event identifiers (for example uuid).

Retry behavior:

- Non-200 responses can trigger retries (up to the documented retry count in source materials).

## 11. Testing

Recommended test coverage:

- Successful card and wallet payment.
- OTP-required path.
- 3D Secure path.
- Failure scenarios (insufficient funds, issuer timeout, invalid card).
- Webhook signature verification and duplicate-event handling.

Use minor currency units consistently:

- NGN 100.00 should be sent as 10000.

## 12. Response and Error Handling

Operational rules:

1. Never trust browser callback or redirect payload as final truth.
2. Always verify status server-side.
3. Match amount and transaction reference before fulfillment.
4. Record provider references (paymentId, retrievalReferenceNumber, paymentReference).
5. Design idempotent fulfillment and webhook consumers.

Common response cues from source docs:

- 00: success
- T0: OTP required
- S0: 3D Secure required
- T1 (example): no response received / pending-like state

Treat final status endpoints as authoritative.

## 13. Implementation Checklist

1. Select integration mode (inline, redirect, API-first, or mixed).
2. Configure sandbox credentials and environment URLs.
3. Build unique txn_ref/transactionReference generation.
4. Implement protected API calls with bearer token.
5. Implement server-side status verification.
6. Implement webhook endpoint with signature validation and idempotency.
7. Add failure, timeout, and retry-safe logic.
8. Switch to production URLs and credentials only after full sandbox validation.

## 14. Scope and Source Consolidation Notes

This guide consolidates prior backend docs into one primary integration reference and removes duplicated sections that previously existed across:

- Web checkout variants
- OPAY initialize variants
- Status and quick-reference pages
- Repeated test and verification instructions

Where source docs conflicted, this guide uses normalized defaults and keeps concise regional/provider annotations.
