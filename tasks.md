## Tasks: API Integration Completion Checklist

### Backend tasks
- [ ] Finalize canonical API contract and resolve naming/path mismatches against backend.md/api.md.
- [x] Add POST /campaigns/:id/documents with multipart upload, type validation, and persisted metadata.
- [x] Add POST /admin/funds/divert with authorization, validation, and audit record.
- [x] Fix PaymentService initiation/status to call Interswitch collections endpoints directly.
- [x] Update DonationService.createDonation to initialize payment and return provider-ready payload.
- [x] Implement payment status verification rules (response code, amount, reference consistency).
- [x] Implement webhook signature verification using HMAC-SHA512 over raw body.
- [x] Add webhook idempotency guard and duplicate-event handling.
- [ ] Complete withdrawal payout execution path currently marked TODO.
- [ ] Add automated tests for payment + webhook + authorization edge cases.

### Frontend tasks
- [x] Fix frontend API utility path bugs for verification history and withdrawals list.
- [x] Add multipart/FormData support in API utility for document upload.
- [x] Integrate register page with backend auth registration endpoints.
- [x] Integrate hospital verify detail page with verify/reject APIs.
- [x] Integrate admin approvals actions with approve/reject APIs.
- [x] Integrate recipient withdrawals page with list/request APIs.
- [x] Integrate admin recipients/hospitals/audit logs pages with backend APIs.
- [ ] Remove mock fallback pathways from critical action flows.
- [ ] Align frontend error parsing with backend statusCode/message/data envelope.

### Payment integration tasks
- [ ] Choose and lock MVP payment mode: Interswitch inline checkout or pay-bill redirect.
- [x] Add frontend payment initiation call and provider checkout launch.
- [ ] Implement post-checkout verification UI state that waits for backend authoritative result.
- [ ] Handle failure/pending/timeout/retry UX paths.
- [x] Persist and display payment reference for donation traceability.
- [ ] Validate webhook-to-donation completion and campaign raisedAmount updates.
- [ ] Run sandbox matrix: success, decline, timeout, duplicate webhook.

### Documentation and delivery
- [x] Publish plan.md and tasks.md in repository root as execution source of truth.
- [ ] Update API docs to match real mounted routes and response envelope.
- [ ] Add payment setup guide with env vars and webhook signature instructions.
- [ ] Add runbook for local end-to-end integration verification.