# CureLedger - Project Status

## Overview

**Stack**: Next.js 16 + Tailwind 4 + shadcn/ui (Frontend) | Express + TypeScript + Mongoose (Backend)  
**Status**: ~70% Complete - UI scaffold done, functionality incomplete

---

## Completed

### Frontend Pages (30+ pages)

- Landing, About, FAQ
- Login, Register
- Browse campaigns, Campaign detail
- Recipient: dashboard, campaign, campaigns, create, profile, settings, withdrawals
- Hospital: dashboard, patients, profile, verify/[id], history
- Admin: dashboard, campaigns, hospitals, recipients, approvals, funds, settings, audit-logs

### Backend

- Express + TypeScript setup
- All Mongoose models
- JWT auth (register/login)
- All API routes (campaigns, donations, verify, withdraw, admin)
- Services and repositories

### Components

- shadcn/ui: button, input, card, badge, table, avatar, dialog, select, etc.
- Shared: toast, file-uploader, StatsCard

---

## What Actually Needs Work

### 1. Authentication Broken

- Role stored in localStorage (insecure)
- Login accepts any credentials
- No registration flow
- No JWT validation

### 2. All Forms Non-Functional

- Create campaign: no save, no validation, no file upload
- Profile pages: no save logic
- No form validation (Zod not used)

### 3. No API Integration

- Frontend uses mock data everywhere
- No API proxy routes to backend
- No env files configured

### 4. Missing Functionality

- No toast notifications (though component exists)
- Hospital verification workflow not connected
- Admin approval flow not connected
- No donation/payment flow

### 5. Minor Issues

- Wrong icon names in responsive layouts (Menu01Icon, Cancel01Icon→ use MenuSquareIcon, Cancel01Icon)

---

## Next Steps

1. **Fix auth** - Connect to backend, proper JWT, remove localStorage role
2. **Add API routes** - Create proxy routes to backend
3. **Make forms work** - Add save logic, validation
4. **Connect workflows** - Hospital verify → Admin approve → Donate → Withdraw
