# CureLedger Backend - Comprehensive Todo List

## 🔴 Critical Issues (Must Fix First)

### 1. Environment Configuration
- [ ] Create `.env` file in `/backend` directory with all required variables:
  ```
  NODE_ENV=development
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/cureledger
  DB_NAME=cureledger
  JWT_SECRET=your-secret-key-at-least-32-characters
  JWT_EXPIRATION=7d
  INTERSWITCH_BASE_URL=https://qa.interswitchng.com
  INTERSWITCH_CLIENT_ID=IKIAB23A4E2756605C1ABC33CE3C287E27267F660D61
  INTERSWITCH_SECRET_KEY=secret
  INTERSWITCH_MERCHANT_CODE=MX6072
  INTERSWITCH_PAY_ITEM_ID=9405967
  INTERSWITCH_WEBHOOK_SECRET=your-webhook-secret
  FRONTEND_CALLBACK_URL=http://localhost:3000/donate/callback
  GMAIL_USER=your-gmail@gmail.com
  GMAIL_APP_PASSWORD=your-gmail-app-password
  LOG_LEVEL=info
  ```
- [ ] Verify MongoDB is running locally or configure MongoDB Atlas connection
- [ ] Test that backend can start without errors: `npm run dev`

### 2. Database Connection Issues
- [ ] Ensure MongoDB connection string is correct
- [ ] Test MongoDB connection with `npm run dev` and check console output
- [ ] If using MongoDB Atlas, whitelist IP address or use 0.0.0.0
- [ ] Verify all Mongoose models are properly initialized
- [ ] Check for any connection timeout issues

### 3. Server Startup & Health Check
- [ ] Run backend server and confirm it logs: "✓ Server running on http://localhost:5000"
- [ ] Test health check endpoint: `GET http://localhost:5000/health`
- [ ] Verify CORS is properly configured for frontend origin
- [ ] Check that all middleware is properly mounted in order

### 4. Frontend API Base URL Configuration
- [ ] Update frontend `.env.local` with correct API URL:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
  ```
- [ ] Ensure frontend can reach backend API without CORS errors
- [ ] Test with `npm run dev` in frontend directory

---

## 🟠 High Priority Issues

### 5. Authentication Flow
- [ ] **Test Login endpoint**:
  - POST `/api/v1/auth/login` with valid credentials
  - Verify JWT token is returned
  - Check token is stored correctly in frontend localStorage (NOT as 'undefined' string)
  - Verify token is sent in Authorization header for protected routes

- [ ] **Test Registration endpoints**:
  - POST `/api/v1/auth/register-recipient` - test recipient creation
  - POST `/api/v1/auth/register-hospital` - test hospital creation
  - POST `/api/v1/auth/register-admin` - test admin creation
  - Verify users are created in MongoDB
  - Verify roles are assigned correctly

- [ ] **Fix token persistence issue**:
  - Frontend currently stores 'undefined' string in localStorage
  - Fix: ensure token is only stored if valid
  - Add validation to reject 'undefined' or 'null' strings

- [ ] **Test GET /auth/me endpoint**:
  - Should return current user profile
  - Should require valid Authorization header
  - Should work for all roles

### 6. Campaign Management API
- [ ] **GET /campaigns** (public list):
  - Test fetching approved campaigns
  - Verify pagination works (page, limit parameters)
  - Check sorting and filtering
  - Ensure only approved campaigns are returned

- [ ] **POST /campaigns** (create campaign - recipient only):
  - Test campaign creation with valid data
  - Verify recipient ID is correctly associated
  - Check campaign starts in "draft" status
  - Validate hospital selection
  - Test form validation

- [ ] **GET /campaigns/:id** (campaign details):
  - Test fetching campaign with documents
  - Verify documents are included in response
  - Check AI analysis fields are present

- [ ] **GET /campaigns/current-user** (recipient campaigns):
  - Should only show logged-in recipient's campaigns
  - Test with pagination
  - Verify authentication is required

- [ ] **GET /campaigns/pending** (hospital/admin view):
  - Should filter by hospital ID for hospital users
  - Should show all pending campaigns for admin
  - Test status filtering (pending_hospital, pending_admin, etc.)

- [ ] **PATCH /campaigns/:id** (update campaign):
  - Test that only owner or admin can update
  - Verify updates don't change campaign status incorrectly
  - Test field-level validation

### 7. Document Upload
- [ ] **Fix file upload endpoint**:
  - Verify multer is properly configured
  - Check upload directory exists: `backend/uploads/campaign-documents/`
  - Test PDF and image uploads (JPG, PNG)
  - Set file size limits (10MB max)
  - Verify uploaded files are saved to disk
  - Return file URLs in response

- [ ] **Process documents with AI**:
  - Current code has placeholder for AI analysis
  - Decide: use mock AI response or integrate real AI service (e.g., Claude API, OpenAI)
  - Implement or mock: `aiAnalyze()` function
  - Store AI confidence scores in database
  - Return analysis recommendation (approve/reject/review)

### 8. Hospital Verification Workflow
- [ ] **Test Hospital verification**:
  - POST `/campaigns/:id/verify` - hospital verifies campaign
  - Check that only hospital can verify their own campaigns
  - Verify campaign status changes to `pending_admin`
  - Store verification metadata (timestamp, notes)
  - Add verification record to audit trail

- [ ] **List verifications**:
  - GET `/verifications/history` - should show verification audit trail
  - Should be accessible to relevant users

### 9. Admin Approval Workflow
- [ ] **Test Admin approval**:
  - POST `/campaigns/:id/approve` - admin approves campaign
  - Should only be accessible to admin role
  - Should change campaign status to `approved`
  - Should record approval in verification/audit trail

- [ ] **Test Campaign rejection**:
  - POST `/campaigns/:id/reject` - reject at any stage
  - Should accept rejection reason
  - Should update campaign status to `rejected`
  - Should notify recipient (via email)

- [ ] **Admin stats endpoint**:
  - GET `/admin/stats` - should return dashboard statistics
  - Total users, campaigns, donations, withdrawals
  - Status breakdown
  - Should be admin-only

### 10. Donation Flow
- [ ] **Test donation creation**:
  - POST `/donate` - public endpoint
  - Should accept amount, campaign ID, donor email
  - Create donation record in database
  - Should not require authentication (public donors)
  - Return payment initialization data

- [ ] **Fix Interswitch payment integration**:
  - Test `PaymentService.initiatePayment()`
  - Call Interswitch API correctly with merchant code, pay item ID
  - Return payment URL to frontend
  - Frontend should redirect user to Interswitch checkout

- [ ] **Payment webhook handling**:
  - POST `/donate/webhook` - Interswitch payment confirmation
  - Verify webhook signature (HMAC-SHA512)
  - Update donation status when payment confirmed
  - Update campaign `raisedAmount` when donation confirmed
  - Update `donorCount` on campaign

- [ ] **Query donation status**:
  - GET `/campaigns/:id/donations` - list campaign donations
  - Should only show confirmed/completed donations
  - Include donor info (name, email) if available

### 11. Withdrawal System
- [ ] **Request withdrawal**:
  - POST `/withdraw` - recipient requests withdrawal
  - Should verify minimum withdrawal amount
  - Validate bank account details
  - Should store bank info securely
  - Update recipient profile with bank info

- [ ] **Approve/Reject withdrawals**:
  - POST `/withdraw/:id/approve` - admin approves
  - POST `/withdraw/:id/reject` - admin rejects
  - Should require admin role
  - Update withdrawal status

- [ ] **⚠️ CRITICAL TODO in code**: `backend/src/routes/withdraw.ts:134`
  - "TODO: Call payment API to process actual payout"
  - Implement actual payout to recipient's bank account
  - Need to integrate with payment provider (Interswitch, paystack, etc.)
  - Handle retry logic if payout fails
  - Add audit trail for payout attempts

- [ ] **List withdrawals**:
  - GET `/withdrawals` - admin view all withdrawals
  - GET `/withdrawals/pending` - admin view pending only
  - Include pagination and filtering

### 12. Profile Management
- [ ] **Test profile update endpoints**:
  - PATCH `/profile` - update current user profile
  - Should allow updating: firstName, lastName, phone, location, etc.
  - Should not allow changing email or role
  - Verify authorization (users can only update own profile)

- [ ] **Get profile**:
  - GET `/profile` or GET `/auth/me` should return user profile

### 13. Hospital Management
- [ ] **Hospital endpoints**:
  - GET `/hospitals` - list all hospitals (public or admin)
  - GET `/hospitals/:id` - hospital details
  - GET `/hospitals/:id/campaigns` - campaigns verified by hospital
  - POST `/admin/hospitals/:id/verify` - admin verifies hospital account

---

## 🟡 Medium Priority Issues

### 14. Email Service
- [ ] **Setup Gmail configuration**:
  - Create Gmail app password (not regular password)
  - Configure GMAIL_USER and GMAIL_APP_PASSWORD in .env
  - Test email sending

- [ ] **Implement verification emails**:
  - Email when user registers
  - Email when campaign status changes
  - Email when withdrawal is rejected/approved
  - Email when donation is received (for campaign owner)

- [ ] **Test email endpoints**:
  - POST `/auth/send-verification-email` - send verification code
  - POST `/auth/verify-email` - verify with code

### 15. Error Handling
- [ ] **Audit all error responses**:
  - Check all routes return proper ApiError format
  - Verify HTTP status codes are correct
  - Ensure error messages are user-friendly
  - Add error logging

- [ ] **Handle edge cases**:
  - Duplicate email registration
  - Campaign not found
  - Unauthorized access attempts
  - Invalid JWT tokens
  - Expired tokens

### 16. Request Validation
- [ ] **Review all Joi schemas**:
  - Ensure all request bodies are validated
  - Check parameter validation
  - Add validation for file uploads
  - Ensure error messages are clear

- [ ] **Frontend validation connection**:
  - Match frontend Zod schemas with backend Joi schemas
  - Ensure same validation rules on both sides

### 17. Data Consistency
- [ ] **Campaign status flow validation**:
  - draft → pending_hospital → pending_admin → approved
  - Rejected can happen at any stage
  - Ensure invalid status transitions are prevented

- [ ] **Donation-Campaign sync**:
  - When donation confirmed, update campaign totals
  - Handle concurrent donation updates
  - Prevent race conditions

- [ ] **Withdrawal-Campaign sync**:
  - Verify recipient can't withdraw more than raised amount
  - Track withdrawal in campaign history

### 18. Audit Trail & Logging
- [ ] **Implement audit logging**:
  - Log all state changes (campaign status, withdrawal approval, etc.)
  - GET `/admin/audit-logs` - retrieve audit trail
  - Include timestamp, user ID, action, changes
  - Store in database

- [ ] **Server logging**:
  - Add proper logging for errors, warnings, info
  - Use log levels (debug, info, warn, error)
  - Log API requests/responses (optional, in development)

---

## 🟢 Lower Priority / Nice to Have

### 19. Performance & Security
- [ ] **Database indexing**:
  - Verify indexes are created on frequently queried fields
  - Check campaigns collection has indexes on: status, recipientId, hospitalId, createdAt

- [ ] **Rate limiting**:
  - Add rate limiting on auth endpoints
  - Add rate limiting on donation endpoint

- [ ] **Input sanitization**:
  - Sanitize string inputs to prevent injection attacks
  - Validate email formats thoroughly

- [ ] **Password security**:
  - Verify bcrypt is used for password hashing
  - Ensure passwords are never returned in API responses
  - Add password reset functionality

### 20. Testing
- [ ] **Setup Jest testing framework** (already in package.json):
  - Write unit tests for services
  - Write integration tests for API endpoints
  - Test auth flows
  - Test campaign lifecycle
  - Test payment flows

- [ ] **Test coverage goals**:
  - Aim for 70%+ code coverage
  - Critical paths: auth, campaigns, donations, withdrawals

- [ ] **Manual testing checklist**:
  - Test each role (recipient, hospital, admin)
  - Test complete campaign lifecycle
  - Test payment webhook
  - Test error scenarios

### 21. Documentation
- [ ] **API documentation**:
  - Update API_INTEGRATION_GUIDE.md with tested endpoints
  - Document response formats
  - Document error codes
  - Add request/response examples

- [ ] **Setup instructions**:
  - Update README with clear setup steps
  - Document environment variables
  - Document MongoDB setup

### 22. Frontend API Proxy Routes
- [ ] **Optional: Setup Next.js API routes as proxy**:
  - Create `/app/api/proxy/[...path].ts` to proxy backend calls
  - Allows same-origin requests, simpler CORS handling
  - Currently using direct API calls (also works, but riskier in production)

---

## 📝 Testing Checklist

### Manual Test Scenarios

#### Scenario 1: Recipient Campaign Lifecycle
```
1. Register as recipient
2. Login as recipient
3. Create campaign
4. Upload documents
5. Submit for hospital verification
6. Login as hospital
7. Verify campaign
8. Login as admin
9. Approve campaign
10. Campaign appears in public browse
11. Donor donates
12. Payment processed
13. Recipient requests withdrawal
14. Admin approves withdrawal
15. Payout processed
```

#### Scenario 2: Hospital Registration & Verification
```
1. Register as hospital with license
2. Login as hospital
3. View pending campaigns
4. Verify campaign with notes
5. Campaign moves to admin queue
```

#### Scenario 3: Admin Functions
```
1. Login as admin
2. View dashboard stats
3. View pending approvals
4. Approve/reject campaign
5. View audit logs
6. Manage withdrawals
7. Generate reports
```

#### Scenario 4: Payment Flow
```
1. Browse approved campaigns
2. Click donate
3. Enter donation amount
4. Redirected to Interswitch checkout
5. Complete payment
6. Redirected back to confirmation
7. Donation appears in campaign
8. Recipient sees new donation
```

---

## 🔧 Quick Reference: Routes to Test

| Endpoint | Method | Auth | Status |
|----------|--------|------|--------|
| `/auth/register-recipient` | POST | No | ✅ Ready |
| `/auth/register-hospital` | POST | No | ✅ Ready |
| `/auth/register-admin` | POST | No | ✅ Ready |
| `/auth/login` | POST | No | ✅ Ready |
| `/auth/me` | GET | Yes | ✅ Ready |
| `/campaigns` | GET | No | ✅ Ready |
| `/campaigns` | POST | Yes (Recipient) | ✅ Ready |
| `/campaigns/pending` | GET | Yes (Hospital/Admin) | ❓ Test |
| `/campaigns/current-user` | GET | Yes (Recipient) | ✅ Ready |
| `/campaigns/:id` | GET | No | ✅ Ready |
| `/campaigns/:id/verify` | POST | Yes (Hospital) | ❓ Test |
| `/campaigns/:id/approve` | POST | Yes (Admin) | ❓ Test |
| `/campaigns/:id/reject` | POST | Yes (Admin) | ❓ Test |
| `/donate` | POST | No | ⚠️ Needs Interswitch |
| `/donate/webhook` | POST | No | ⚠️ Needs Interswitch |
| `/withdraw` | POST | Yes (Recipient) | ❓ Test |
| `/withdraw/:id/approve` | POST | Yes (Admin) | ⚠️ Needs Payout |
| `/profile` | PATCH | Yes | ❓ Test |
| `/hospitals` | GET | No | ❓ Test |
| `/admin/stats` | GET | Yes (Admin) | ❓ Test |
| `/admin/audit-logs` | GET | Yes (Admin) | ❓ Test |

---

## 📋 Notes

- **AI Analysis**: The document upload endpoint has placeholder for AI analysis. Currently commented/mocked. Decide whether to:
  - Use real AI API (Claude, OpenAI)
  - Mock with hardcoded responses
  - Leave for later (use 50% confidence placeholder)

- **Interswitch Integration**: Payment flow requires actual Interswitch testing credentials. Current code structure is ready, just needs testing with real environment variables.

- **Bank Payout**: Withdrawal approval missing actual payout logic. This is indicated by TODO comment in withdraw.ts. Need to implement actual bank transfer logic.

- **Email Notifications**: Email service exists but hasn't been fully integrated into workflow. Should add email notifications for key events.

- **Rate Limiting & Security**: Basic security is in place (bcrypt, JWT), but might need rate limiting and input sanitization for production.

---

## 🚀 Getting Started Steps

1. **Setup .env file** with correct MongoDB URI and other variables
2. **Start MongoDB** (local or connect to Atlas)
3. **Run backend**: `cd backend && npm run dev`
4. **Verify health check**: Visit `http://localhost:5000/health`
5. **Configure frontend .env**: Add `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1`
6. **Start frontend**: `cd frontend && npm run dev`
7. **Begin testing** from Manual Test Scenarios section above

---

## 🎯 Priority Execution Order

1. **Phase 1 (Immediate)**: Critical Issues (#1-4)
2. **Phase 2 (Today)**: Authentication & Basic API (#5-6)
3. **Phase 3 (This week)**: Core Features (#7-12)
4. **Phase 4 (Next week)**: Email & Logging (#14-15, #18)
5. **Phase 5 (Later)**: Testing, Optimization, Documentation (#19-21)
