# CureLedger

A health crowdfunding platform connecting patients, hospitals, donors, and administrators — with verified medical documentation and transparent fund management.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui, Prisma, Zod |
| Backend | Node.js, Express, TypeScript, MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Storage | Cloudinary (documents & images) |
| Payments | Interswitch API |
| Database | Supabase (via Prisma) |

---

## Project Structure

```
cureledger/
├── frontend/         # Next.js application (public, auth, dashboards)
├── backend/          # Express REST API (auth, routes, services, models)
├── AGENTS.md         # Developer guidelines
├── backend.md        # API specifications
├── layout.md         # Frontend route structure
└── README.md
```

---

## Getting Started

**Prerequisites:** Node.js 18+, MongoDB instance, `.env` files for both apps.

```bash
# Backend — runs on http://localhost:5000
cd backend && npm install && cp .env.example .env && npm run dev

# Frontend — runs on http://localhost:3000
cd frontend && npm install && npm run dev
```

---

## Environment Variables

**Frontend** (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_NAME=your_cloudinary_name
```

**Backend** (`.env`)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cureledger
JWT_SECRET=your_secret_key
INTERSWITCH_API_KEY=your_interswitch_key
```

---

## User Roles

- **Recipient** — Creates campaigns, uploads medical documents, tracks funds, requests withdrawals
- **Hospital** — Verifies medical cases and reviews uploaded documents
- **Donor** — Browses campaigns, donates, and tracks contribution history
- **Admin** — Approves campaigns, manages users, monitors platform activity

---

## Key Routes

| Area | Base Path |
|------|-----------|
| Public | `/`, `/campaigns`, `/campaign/[id]`, `/login`, `/register` |
| Recipient | `/recipient`, `/recipient/create`, `/recipient/campaign/[id]` |
| Hospital | `/hospital`, `/hospital/verify/[id]`, `/hospital/patients` |
| Admin | `/admin`, `/admin/campaigns`, `/admin/hospitals`, `/admin/recipients` |

---

## API Overview

Base URL: `https://api.cureledger.com/v1`

```
POST   /auth/register
POST   /auth/login
GET    /campaigns
POST   /campaigns
GET    /campaigns/:id
POST   /donate
POST   /verify
POST   /withdraw
```

See [backend.md](backend.md) for full endpoint documentation.

---

## Authentication

```typescript
POST /auth/register  →  { user, token }
POST /auth/login     →  { user, token }

// All protected routes require:
Authorization: Bearer <token>
```

---

## Status

- ✅ Frontend structure (Next.js 16)
- ✅ Backend API framework (Express + TypeScript)
- ✅ Database models defined
- ✅ Mock data for frontend demo
- 🔄 Interswitch payment integration
- 🔄 Cloudinary document storage
- 🔄 Production deployment

---

## Documentation

| File | Contents |
|------|----------|
| [AGENTS.md](AGENTS.md) | Developer guidelines & component conventions |
| [backend.md](backend.md) | Full API specifications |
| [layout.md](layout.md) | Frontend route structure |
| [TASKS.md](TASKS.md) | Project tasks & progress |

---

##Success

© 2026 CureLedger