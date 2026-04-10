# SMM Panel Pro

A full-stack Social Media Marketing panel built with Next.js 15, TypeScript, Prisma, NextAuth v5, and Stripe.

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Framework    | Next.js 15 (App Router)                 |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS v3 + shadcn/ui             |
| Database     | PostgreSQL via Prisma ORM               |
| Auth         | NextAuth.js v5 (Credentials + Google)   |
| Payments     | Stripe Checkout + Webhooks              |
| Testing      | Vitest (8+ unit tests)                  |
| Deployment   | Vercel + Supabase/Neon                  |

---

## Quick Start (Local Dev)

### 1. Clone & Install

```bash
git clone <your-repo>
cd smm-panel-pro
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Fill in all values (see below)
```

### 3. Set Up Database

```bash
# Start local Postgres (Docker)
docker run -d \
  --name smm-db \
  -e POSTGRES_DB=smm_panel_pro \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16

# Run migrations
npm run db:migrate

# Seed sample data
npm run db:seed
```

### 4. Run Dev Server

```bash
npm run dev
# → http://localhost:3000
```

### 5. Run Tests

```bash
npm test
# Runs 20+ Vitest unit tests
```

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smm_panel_pro"

# NextAuth
NEXTAUTH_SECRET="openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (https://console.cloud.google.com)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe (https://dashboard.stripe.com)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/signin         # Sign in page
│   ├── (auth)/signup         # Sign up page
│   ├── admin/                # Admin panel (RBAC-protected)
│   │   ├── services/         # Service CRUD
│   │   ├── orders/           # Order management
│   │   └── users/            # User management
│   ├── api/
│   │   ├── auth/             # NextAuth handlers + register
│   │   ├── orders/           # Order CRUD
│   │   ├── payments/         # Stripe checkout session
│   │   ├── wallet/           # Balance & transactions
│   │   ├── webhook/stripe/   # Stripe webhook handler
│   │   ├── admin/            # Admin API routes
│   │   └── v2/               # Public API v2
│   ├── api-docs/             # Public API documentation
│   ├── dashboard/            # User dashboard
│   ├── faq/                  # FAQ page
│   ├── services/             # Services catalog
│   └── terms/                # Terms of Service
├── components/
│   ├── admin/                # Admin UI components
│   ├── dashboard/            # Dashboard components + modals
│   ├── layout/               # Navbar, Footer
│   ├── services/             # Services catalog + order modals
│   └── ui/                   # shadcn/ui base components
├── hooks/use-toast.ts
├── lib/
│   ├── auth.ts               # NextAuth config
│   ├── api-auth.ts           # API key validator + rate limiter
│   ├── order-utils.ts        # Business logic (tested)
│   ├── prisma.ts             # Prisma client singleton
│   └── stripe.ts             # Stripe client
└── middleware.ts             # Route protection
prisma/
├── schema.prisma             # Full DB schema
└── seed.ts                   # Sample data seeder
tests/
└── order-calculations.test.ts  # 20+ unit tests
```

---

## Deploy to Vercel

### 1. Create a Neon or Supabase PostgreSQL database

Get a `DATABASE_URL` connection string with `?pgbouncer=true&connect_timeout=15` appended.

### 2. Deploy

```bash
npm i -g vercel
vercel --prod
```

Set all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### 3. Configure Stripe Webhook

```bash
# Install Stripe CLI
stripe listen --forward-to https://your-domain.vercel.app/api/webhook/stripe

# Or set permanent webhook in Stripe Dashboard:
# https://dashboard.stripe.com/webhooks
# Endpoint: https://your-domain.vercel.app/api/webhook/stripe
# Events: checkout.session.completed
```

### 4. Run Migrations on Production

```bash
DATABASE_URL="your-prod-url" npx prisma migrate deploy
DATABASE_URL="your-prod-url" npx tsx prisma/seed.ts
```

---

## Default Credentials (After Seeding)

| Role  | Email                      | Password      |
|-------|----------------------------|---------------|
| Admin | admin@smmpanelpro.com      | Admin@123456  |
| User  | demo@smmpanelpro.com       | User@123456   |

---

## Public API v2

Authenticate with `x-api-key: YOUR_KEY` header.

| Method | Endpoint                    | Description        |
|--------|-----------------------------|--------------------|
| GET    | `/api/v2/services`          | List all services  |
| POST   | `/api/v2/orders`            | Place an order     |
| GET    | `/api/v2/orders/:id`        | Get order status   |
| GET    | `/api/v2/balance`           | Get wallet balance |

Rate limit: 60 requests/minute per API key.

---

## Running Tests

```bash
npm test
# ✓ calculateOrderPrice (6 tests)
# ✓ validateQuantity (6 tests)
# ✓ hasInsufficientBalance (3 tests)
# ✓ calculateDiscount (5 tests)
# ✓ getOrderStatusColor (3 tests)
# ✓ formatOrderStatus (1 test)
```
