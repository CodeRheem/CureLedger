# CureLedger Route Structure

## Public Routes (No Auth Required)

| Route            | Description                                                   | Assigned |
| ---------------- | ------------------------------------------------------------- | -------- |
| `/`              | Landing page - hero, how it works, featured campaigns         |          |
| `/campaigns`     | Browse all verified campaigns (donors can view without login) | ~        |
| `/campaign/[id]` | Campaign detail page - full info, donate button               |          |
| `/about`         | About page - mission, how funds work                          |          |
| `/faq`           | FAQ page                                                      |          |                                                      |          |

## Auth Routes

| Route       | Description                                    | Assigned |
| ----------- | ---------------------------------------------- | -------- |
| `/login`    | Login page with role selector                  |          |
| `/register` | Registration (for recipients, hospital, admin) |          |

## Recipient Dashboard (`/recipient`)

| Route                                | Description                              | Assigned |
| ------------------------------------ | ---------------------------------------- | -------- |
| `/recipient`                         | Dashboard overview - my campaigns, stats |          |
| `/recipient/create`                  | Create new campaign                      | ~        |
| `/recipient/campaign/[id]`           | Edit campaign details                    | ~        |
| `/recipient/campaign/[id]/documents` | Upload/manage documents                  | ~        |
| `/recipient/campaign/[id]/withdraw`  | Request fund withdrawal                  |          |
| `/recipient/profile`                 | Profile settings                         |          |
| `/recipient/settings`                | Account settings                         |          |

## Hospital Dashboard (`/hospital`)

| Route                   | Description                       | Assigned |
| ----------------------- | --------------------------------- | -------- |
| `/hospital`             | Dashboard - pending verifications |          |
| `/hospital/verify/[id]` | Verify recipient documents        | ~        |
| `/hospital/patients`    | List of patients they've verified |          |
| `/hospital/profile`     | Hospital profile settings         |          |

## Admin Dashboard (`/admin`)

| Route                 | Description                         | Assigned |
| --------------------- | ----------------------------------- | -------- |
| `/admin`              | Overview - stats, pending approvals |          |
| `/admin/approvals`    | All pending approvals queue         | ~        |
| `/admin/approve/[id]` | Final approval review               | ~        |
| `/admin/recipients`   | Manage all recipients               |          |
| `/admin/hospitals`    | Manage hospital accounts            |          |
| `/admin/campaigns`    | Manage all campaigns                |          |
| `/admin/funds`        | Fund management, divert funds       | ~        |
| `/admin/settings`     | System settings                     |          |

## API Routes (For Backend Reference)

| Endpoint                             | Description                 |
| ------------------------------------ | --------------------------- |
| `POST /api/auth/login`               | Authenticate user           |
| `POST /api/auth/register`            | Register new user           |
| `GET /api/campaigns`                 | List all campaigns          |
| `GET /api/campaigns/[id]`            | Get campaign details        |
| `POST /api/campaigns`                | Create campaign             |
| `PATCH /api/campaigns/[id]`          | Update campaign             |
| `POST /api/campaigns/[id]/documents` | Upload document             |
| `POST /api/campaigns/[id]/verify`    | Hospital verification       |
| `POST /api/campaigns/[id]/approve`   | Admin final approval        |
| `POST /api/donate`                   | Process donation            |
| `GET /api/donations`                 | List donations for campaign |

## Role-Based Access Matrix

```
Donor (public)
├── Browse campaigns
├── View campaign details
└── Donate

Recipient
├── All Donor permissions
├── Create campaign
├── Upload documents
├── View own campaigns
└── Request withdrawal

Hospital
├── Verify recipient documents
├── View assigned patients
└── Submit verification status

Admin
├── Approve/reject campaigns
├── Manage all users
├── View all campaigns
├── Divert funds
└── System settings
```

## Route Protection Rules

- `/recipient/**` → Requires `recipient` role
- `/hospital/**` → Requires `hospital` role
- `/admin/**` → Requires `admin` role
- `/browse`, `/campaign/*` → Public (no auth)

## Task Assignment Legend

- `~` = Complex/structural tasks (assigned to main developer)
- (blank) = Standard UI tasks (assigned to other frontend dev)
