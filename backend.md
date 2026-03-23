# CureLedger - Backend API Specification

## Base URL

```
https://api.cureledger.com/v1
```

All endpoints return JSON. Include `Authorization: Bearer <token>` header for protected routes.

---

## Authentication

### POST /auth/register

Register new user (recipient, hospital, or admin).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "recipient", // recipient | hospital | admin
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348012345678",
  // If role is hospital:
  "hospitalName": "Lagos General Hospital",
  "hospitalLicense": "HOSP/2024/12345"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "recipient",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  "token": "jwt_token_here"
}
```

### POST /auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "recipient",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token_here"
}
```

### GET /auth/me

Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "recipient",
  "profile": {
    // Role-specific profile data
  }
}
```

---

## Campaigns

### GET /campaigns

List all approved campaigns (public endpoint for donors).

**Query Parameters:**
- `status` (optional): `approved` (default for public)
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `sortBy`: `createdAt` | `targetAmount` | `raisedAmount` (default: `createdAt`)
- `sortOrder`: `asc` | `desc` (default: `desc`)

**Response (200):**
```json
{
  "campaigns": [
    {
      "id": "uuid",
      "title": "Help John Pay for Heart Surgery",
      "description": "John needs urgent heart surgery...",
      "targetAmount": 5000000,
      "raisedAmount": 2500000,
      "recipient": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe",
        "location": "Lagos, Nigeria",
        "avatar": "https://..."
      },
      "images": ["https://..."],
      "createdAt": "2024-01-10T10:00:00Z",
      "endsAt": "2024-03-10T10:00:00Z"
    }
  ],
  "total": 150,
  "page": 1,
  "totalPages": 8
}
```

### GET /campaigns/pending

List pending campaigns for hospital/admin review. **Protected: requires hospital or admin role.**

**Query Parameters:**
- `status`: `pending_hospital` | `pending_admin`
- `page`, `limit`

**Response (200):**
```json
{
  "campaigns": [
    {
      "id": "uuid",
      "title": "Help John Pay for Heart Surgery",
      "status": "pending_hospital",
      "recipient": { ... },
      "documents": [
        {
          "id": "uuid",
          "type": "medical_report",
          "url": "https://...",
          "uploadedAt": "2024-01-10T10:00:00Z",
          "aiScore": 0.96
        }
      ],
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ],
  "total": 25,
  "page": 1
}
```

### GET /campaigns/:id

Get single campaign details.

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Help John Pay for Heart Surgery",
  "description": "Full description...",
  "targetAmount": 5000000,
  "raisedAmount": 2500000,
  "donorCount": 45,
  "status": "approved",
  "recipient": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "location": "Lagos, Nigeria",
    "verified": true,
    "avatar": "https://..."
  },
  "hospital": {
    "id": "uuid",
    "name": "Lagos General Hospital",
    "verified": true
  },
  "documents": [
    {
      "id": "uuid",
      "type": "medical_report",
      "url": "https://...",
      "aiScore": 0.96,
      "hospitalVerified": true,
      "adminApproved": true
    }
  ],
  "images": ["https://..."],
  "createdAt": "2024-01-10T10:00:00Z",
  "endsAt": "2024-03-10T10:00:00Z",
  "timeLeft": "15 days"
}
```

### POST /campaigns

Create new campaign. **Protected: requires recipient role.**

**Request:**
```json
{
  "title": "Help John Pay for Heart Surgery",
  "description": "John is a 35-year-old father who needs urgent heart surgery...",
  "targetAmount": 5000000,
  "condition": "Heart Surgery",
  "hospitalId": "hospital-uuid",
  "endsAt": "2024-03-10T10:00:00Z"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "title": "Help John Pay for Heart Surgery",
  "status": "pending_hospital",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### PATCH /campaigns/:id

Update campaign details. **Protected: recipient owns campaign OR admin.**

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description..."
}
```

### POST /campaigns/:id/documents

Upload document for campaign. **Protected: recipient role.**

**Request (multipart/form-data):**
- `file`: PDF, JPG, PNG (max 10MB)
- `type`: `medical_report` | `diagnosis` | `prescription` | `id_card` | `other`

**Response (201):**
```json
{
  "id": "uuid",
  "type": "medical_report",
  "url": "https://cloudinary-url...",
  "aiScore": 0.85,
  "uploadedAt": "2024-01-15T10:00:00Z"
}
```

**AI Document Analysis Response:**

When document is uploaded, AI processes it and returns:
```json
{
  "aiScore": 0.85,
  "flags": ["text_blur_detected"],
  "recommendation": "human_review"
}
```

- `aiScore`: 0.0 - 1.0 (legitimacy confidence)
- `flags`: Array of detected issues
- `recommendation`: `approved` | `rejected` | `human_review`

---

## Verification Workflow

### POST /campaigns/:id/verify

Hospital verifies recipient documents. **Protected: requires hospital role.**

**Request:**
```json
{
  "verified": true,
  "notes": "Documents appear authentic. Patient is admitted."
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "pending_admin",
  "verifiedBy": {
    "hospitalId": "uuid",
    "hospitalName": "Lagos General Hospital",
    "verifiedAt": "2024-01-15T10:00:00Z"
  }
}
```

### POST /campaigns/:id/approve

Admin final approval. **Protected: requires admin role.**

**Request:**
```json
{
  "approved": true,
  "notes": "Verified and approved for public listing."
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "status": "approved",
  "approvedBy": {
    "adminId": "uuid",
    "adminName": "Admin User",
    "approvedAt": "2024-01-15T10:00:00Z"
  }
}
```

### POST /campaigns/:id/reject

Reject campaign at any stage. **Protected: requires hospital or admin role.**

**Request:**
```json
{
  "reason": "Documents appear fraudulent",
  "rejectedBy": "hospital" // or "admin"
}
```

---

## Donations

### POST /donate

Process donation. **Public endpoint.**

**Request:**
```json
{
  "campaignId": "uuid",
  "amount": 5000,
  "donorName": "Anonymous Donor",
  "donorEmail": "donor@example.com",
  "message": "Get well soon!"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "campaignId": "uuid",
  "amount": 5000,
  "status": "pending",
  "paymentReference": "interswitch_ref_123",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### GET /campaigns/:id/donations

Get donations for a campaign. **Protected: recipient (own campaign) OR admin.**

**Response (200):**
```json
{
  "donations": [
    {
      "id": "uuid",
      "amount": 5000,
      "donorName": "Anonymous Donor",
      "message": "Get well soon!",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 45000
}
```

---

## Withdrawals

### POST /campaigns/:id/withdraw

Request fund withdrawal. **Protected: recipient (own campaign).**

**Request:**
```json
{
  "amount": 2500000,
  "bankAccount": "0123456789",
  "bankName": "First Bank",
  "accountName": "John Doe"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "amount": 2500000,
  "status": "pending_approval",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### POST /admin/withdrawals/:id/approve

Admin approves withdrawal. **Protected: admin role.**

---

## Admin Functions

### GET /admin/recipients

List all recipients.

### GET /admin/hospitals

List all hospitals. Include verification status.

### POST /admin/hospitals/:id/verify

Verify hospital account. **Admin only.**

### POST /admin/funds/divert

Divert funds from one campaign to another. **Admin only.**

**Request:**
```json
{
  "fromCampaignId": "uuid",
  "toCampaignId": "uuid",
  "amount": 500000,
  "reason": "Original recipient passed away"
}
```

---

## Interswitch Integration

### Payment Flow

1. Client requests payment → Backend calls Interswitch `initiatePayment`
2. Backend returns payment link → Client redirects
3. Interswitch redirects back with status → Backend verifies
4. Webhook updates donation status

### Required Interswitch Endpoints (to be implemented by backend)

- `POST /payments/initiate` - Create payment transaction
- `GET /payments/:reference` - Check payment status
- Webhook handler for payment confirmation

---

## Webhook Events

Backend should send webhooks for:

- `campaign.status_changed`
- `document.ai_analyzed`
- `donation.received`
- `withdrawal.approved`

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": { ... }
  }
}
```

Common error codes:
- `UNAUTHORIZED` - 401
- `FORBIDDEN` - 403 (role not permitted)
- `NOT_FOUND` - 404
- `VALIDATION_ERROR` - 422
- `SERVER_ERROR` - 500

---

## Notes for Backend Dev

1. **AI Document Analysis**: Need external AI service integration. Could use:
   - AWS Textract for document text extraction
   - Custom ML model for authenticity scoring
   - Or mock the AI response for now

2. **Payment**: Interswitch requires merchant credentials. Get keys from dashboard.

3. **File Storage**: Use Cloudinary or similar. Need:
   - Upload endpoint returning URL
   - Download/access URL
   - File type restrictions

4. **Real-time**: Consider adding WebSockets for:
   - Live donation notifications
   - Status change updates

5. **Email/Notifications**: Not in MVP but plan for:
   - Verification notifications
   - Donation receipts
   - Status updates
