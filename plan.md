## Plan: API Integration Completion Across Backend and Frontend

Complete API parity between backend routes, frontend usage, and Interswitch payment requirements by: (1) fixing route/path mismatches and broken integrations, (2) implementing missing backend endpoints and payment verification/webhook correctness, and (3) replacing frontend mock actions with real API calls and robust UI states. Sequence backend stabilization first, then frontend wiring, then end-to-end payment hardening and docs.

**Steps**
1. Baseline and contract alignment
- Freeze canonical API contract from backend mounted routes and reconcile with backend.md/api.md naming mismatches.
- Decide whether to keep split auth registration endpoints or add a compatibility /auth/register adapter.
- Normalize withdrawal and verification-history paths in frontend API utility to match mounted backend routes.

2. Backend correctness and missing endpoints
- Implement missing endpoint POST /campaigns/:id/documents with multipart upload, type validation, storage integration, and persisted metadata (depends on 1).
- Implement missing endpoint POST /admin/funds/divert with permission checks, transactional movement records, and audit logging (depends on 1).
- Fix PaymentService to call real Interswitch collections endpoints instead of self-referential backend paths (depends on 1).
- Extend DonationService createDonation to initialize payment and return authoritative payment reference and redirect/checkout data (depends on payment service).
- Implement server-side payment status verification against Interswitch with amount/reference checks and persistent status transitions (depends on payment service).
- Implement webhook signature validation (HMAC-SHA512 over raw body), idempotency, and durable async processing for payment completion (depends on payment service).

3. Frontend API utility hardening
- Fix API utility path bugs: withdrawals list endpoint and verification-history endpoint.
- Add document upload function with FormData (multipart) and support mixed JSON/FormData request headers.
- Add payment endpoints wrappers for initiation and status polling/lookup.
- Normalize error mapping to backend response shape and expose actionable messages.

4. Frontend feature integration (replace mocks)
- Registration page: replace localStorage-only flow with real register-recipient/register-hospital calls and proper auth token persistence (depends on 3).
- Hospital verification detail page: fetch campaign data from API, submit verify/reject decisions via API, and handle optimistic/error states (depends on 3).
- Admin approvals page: wire approve/reject actions to backend and refresh list/state from server (depends on 3).
- Recipient create campaign flow: after campaign creation, upload selected documents to campaign documents endpoint and show per-file upload status (depends on 2+3).
- Campaign donation page: replace fake card form with Interswitch hosted/inline checkout initiation and callback-to-verify flow (depends on 2+3).
- Recipient withdrawals page: wire list/request actions to backend and add validation/error feedback (depends on 3).
- Admin recipients/hospitals/audit logs/withdrawal processing screens: replace hardcoded arrays with API-driven tables and actions (parallelizable after 3).

5. Payment flow completion and resilience
- Enforce backend as source of truth: browser callback never fulfills donation; only verified status/webhook completion updates campaign totals.
- Add retry-safe webhook processing and duplicate-event guards (idempotency keys).
- Add status reconciliation job or endpoint usage for stuck pending payments.
- Add failure UX in frontend for declined/pending/timeouts and recovery actions.

6. Verification and release readiness
- Backend tests: route validation, authz checks, payment status verification logic, webhook signature/idempotency tests.
- Frontend tests/manual QA: each integrated action path, error states, and role-based access.
- End-to-end sandbox payment test matrix (success, fail, timeout, duplicate webhook).
- Update docs: final API contract, env vars, payment setup, and integration runbook.

**Relevant files**
- backend/src/routes/index.ts - mounted route truth source for endpoint exposure.
- backend/src/routes/payments.ts - payment initiate/status/webhook routing and current signature gap.
- backend/src/services/PaymentService.ts - external provider call logic currently miswired.
- backend/src/services/DonationService.ts - donation lifecycle and payment initialization TODO.
- backend/src/helpers/apiCaller.ts - token/authenticated Interswitch calls and request execution.
- backend/src/routes/campaigns.ts - campaign CRUD and donation retrieval; anchor for document upload addition.
- backend/src/routes/withdraw.ts - mounted withdrawal request/approve paths and payout TODO.
- backend/src/routes/verify.ts - hospital/admin campaign verification transitions.
- frontend/lib/api.ts - frontend integration hub with current endpoint mismatches.
- frontend/app/(auth)/register/page.tsx - currently mock registration.
- frontend/app/(dashboard)/admin/approvals/page.tsx - fetch-only; approve/reject not wired.
- frontend/app/(dashboard)/hospital/verify/[id]/page.tsx - mock verification data/actions.
- frontend/app/(public)/campaign/[id]/page.tsx - mock payment flow and no backend donation call.
- frontend/app/(dashboard)/recipient/create/page.tsx - campaign create wired; document upload missing.
- frontend/app/(dashboard)/recipient/withdrawals/page.tsx - fully mock withdrawal UI.
- backend/docs/API_INTEGRATION_GUIDE.md - authoritative Interswitch flow and webhook requirements.

**Verification**
1. Route contract check
- Confirm final endpoint table from backend/src/routes and update contract docs.

2. Backend validation
- Run backend test suite and targeted route tests for auth, verification, donations, withdrawals, payments.
- Add and run webhook signature/idempotency unit tests.

3. Frontend validation
- Execute role-based manual journeys: recipient create+documents, hospital verify, admin approve, donor donate.
- Validate error states and fallback removal for integrated pages.

4. Payment sandbox validation
- Run Interswitch sandbox transactions across success/failure/pending paths.
- Confirm only verified server-side status triggers donation completion.

5. Regression checks
- Ensure API utility path consistency and no stale mock pathways remain in production flows.

**Decisions**
- Include in scope: endpoint parity, wiring of existing pages, and full donation payment correctness.
- Exclude from immediate scope: new product features not represented in backend.md/api.md.
- Recommendation: keep backend response envelope (statusCode/message/data) and adapt frontend parser consistently.

**Further Considerations**
1. Registration API compatibility
- Option A: Keep split endpoints and update docs/frontend accordingly.
- Option B: Add unified POST /auth/register adapter for spec compatibility and backward support.

2. Withdrawal path normalization
- Option A: Keep /withdraw paths and update specs/frontend.
- Option B: Introduce /campaigns/:id/withdraw alias and deprecate older path gradually.

3. Payment channel choice for MVP
- Option A: Interswitch inline checkout only (fastest, PCI-safer).
- Option B: API-first pay-bill plus redirect URL (more control, slightly more backend complexity).