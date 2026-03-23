# CureLedger Backend

Health crowdfunding platform backend built with Node.js, Express, and TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Generate JWT keys (if needed):
```bash
openssl genrsa -out keys/private.pem 2048
openssl rsa -in keys/private.pem -pubout -out keys/public.pem
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── auth/              # Authentication utilities
├── config/            # Configuration management
├── core/              # Core utilities (error handling, logging, JWT)
├── database/          # Database models and repositories
├── helpers/           # Helper utilities
├── middlewares/       # Express middlewares
├── routes/            # API route handlers
├── types/             # TypeScript type definitions
├── app.ts             # Express app setup
└── server.ts          # Server entry point
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## API Documentation

See `backend.md` for complete API specifications.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Redis
- JWT
- Bcryptjs
- Joi validation
