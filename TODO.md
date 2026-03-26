<!-- # TODO

## Backend - Missing Endpoints (7 items - COMMENTED OUT, AWAITING REVIEW)

All 7 endpoints have been implemented but commented out for backend dev review:
- GET /hospitals
- PATCH /profile
- GET /withdrawals
- GET /admin/stats
- GET /verifications/history
- GET /admin/audit-logs
- GET /campaigns/pending (hospital filtering)

## Frontend - API Integration (COMPLETED)

- [x] Created lib/api.ts with all API utility functions
- [x] Connected /campaigns (browse page) to API with mock fallback
- [x] Connected /campaign/[id] (detail page) to API with mock fallback
- [x] Connected /recipient/create to API (hospitals dropdown, campaign creation)
- [x] Connected /hospital (dashboard) to API
- [x] Connected /admin (dashboard) to API

## Frontend - Completed

- [x] Add form validation - login form with email/password validation
- [x] Modify admin approval - detailed modal with campaign details, recipient info, hospital info, documents, AI confidence
- [x] Refactor responsiveness - added mobile menu to header, fixed icons in layouts, improved login page

# Completed items removed from previous list -->


## Frontend{DONE}
Converted 4 frontend pages from mock data to real API calls:
`app/(dashboard)/recipient/page.tsx`, `app/(dashboard)/recipient/campaigns/page.tsx`,,`app/(dashboard)/recipient/campaign/page.tsx`,- `app/(dashboard)/admin/approvals/page.tsx`
Added new getRecipientCampaigns() API method
Implemented loading states and error fallback pattern across all pages

## Backend{DONE}
Installed backend dependencies (npm install)
Updated TypeScript configuration

### ⚠️ Next Priority{}
- Test that backend API actually works (`npm run dev`)
- Fix remaining TypeScript errors
- Deploy and validate data flows
- Uncomment commented backend endpoints when stable

### ⏳ To Do
- Connect remaining dashboard pages (hospital)
- Remove mock data entirely once API fully stable
- Test all API endpoints end-to-end
- Implement document upload endpoint
- Set up error tracking/logging