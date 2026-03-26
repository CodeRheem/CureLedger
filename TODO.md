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

## Frontend API mock replacements

[] admin/campaigns, admin/funds, admin/ ( system stats)
[] recipient/profile
[] all hospital/ routes
[] protected dashboard routes
[] campaigns/
[] campaigns/[id]

# Backend

[] return user's available balance ( linked to the withdrawals page)
[] in /hospital/history return pending reviews ( to be used in line 108 )
