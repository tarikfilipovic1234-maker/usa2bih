# USA2BIH — US → Bosnia Vehicle Import Platform

A premium full-stack platform for browsing US auction vehicles, estimating the full landed cost
in **BAM & EUR**, and managing every step of importing a car to Bosnia & Herzegovina.

**🔗 Live:** https://usa2bih.vercel.app

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion ·
Prisma 7 · Neon PostgreSQL · Neon Auth (Better Auth) · Vercel Blob · Resend**, deployed on **Vercel**.

---

## Features

- **Public** — animated home, advanced vehicle browse with URL-driven filters, rich vehicle detail
  (gallery, full specs, landed-cost breakdown, inquiry), a live import cost calculator, the import
  guide, about / FAQ / contact, and a side-by-side comparison tool.
- **Accounts** — email/password auth via Neon Auth, a user dashboard with saved vehicles,
  inquiries, calculation history, import tracking (visual stage tracker + timeline), document
  uploads, recently-viewed, and profile management.
- **Admin** — vehicle CRUD with multi-image uploads, featured/status controls, inquiry workflow,
  user role management, editable guide content, and an analytics overview.
- **Platform** — SEO (sitemap, robots, manifest, dynamic OG images), accessibility, error/404
  handling, and a transparent BiH customs-duty + VAT cost model.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| Database | Neon PostgreSQL via Prisma 7 (Neon serverless driver adapter) |
| Auth | Neon Auth (Better Auth) — `@neondatabase/auth` |
| File storage | Vercel Blob |
| Email | Resend |
| Hosting | Vercel |

## Local development

### 1. Environment

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Where to find it |
| --- | --- |
| `DATABASE_URL` | Neon → Connect → **pooled** connection string (host has `-pooler`) |
| `DIRECT_URL` | Neon → Connect → **direct** string (no `-pooler`); used for migrations |
| `NEON_AUTH_BASE_URL` | Neon → **Auth** tab → Configuration → "Auth URL" |
| `NEON_AUTH_COOKIE_SECRET` | Generate with `openssl rand -base64 32` (≥32 chars) |
| `ADMIN_EMAILS` | Comma-separated emails auto-promoted to ADMIN on first sign-in |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used for SEO/OG) |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob (optional) |
| `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` | Resend (optional) |

> Both Next.js and the Prisma CLI read `.env.local` (the Prisma CLI is configured to in
> `prisma.config.ts`).

### 2. Run

```bash
npm install              # also runs `prisma generate` via postinstall
npm run db:migrate       # apply migrations to your Neon database
npm run db:seed          # load demo vehicles + guide content
npm run dev              # http://localhost:3000
```

Sign up, then sign in with an email listed in `ADMIN_EMAILS` to access **/admin**.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js dev / production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:migrate` | `prisma migrate dev` |
| `npm run db:deploy` | `prisma migrate deploy` (production) |
| `npm run db:seed` | seed demo data |
| `npm run db:studio` | open Prisma Studio |

## Deployment (Vercel)

The app is deployed on Vercel from the `main` branch. To reproduce:

1. Import the repo at **vercel.com/new** (Next.js is auto-detected).
2. **Build Command:** `prisma migrate deploy && next build` (runs pending migrations on deploy).
3. Add the environment variables above to the Vercel project (Production + Preview). The easiest
   way is to paste the contents of `.env.local` into Vercel's env import, then set
   `NEXT_PUBLIC_SITE_URL` to the production URL.
4. **Neon Auth → Domains:** add the production URL (e.g. `https://usa2bih.vercel.app`) to the
   trusted-domains list, or auth redirects are blocked.
5. Deploy. Blob and Resend work natively on Vercel.

## Project structure

```
app/
  (marketing)/   public site (home, cars, calculator, guide, about, faq, contact, compare)
  (dashboard)/   authenticated user dashboard
  admin/         role-gated admin panel
  auth/          sign-in / sign-up pages
  api/auth/      Neon Auth (Better Auth) route handler
  actions/       server actions (favorites, inquiries, calculations, documents, admin…)
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
components/      ui/ motion/ layout/ vehicle/ dashboard/ admin/ compare/ auth/ sections/
lib/             db, neon-auth, auth, auth-client, queries, dashboard, admin, calculator,
                 validation, email, icons, utils
prisma/          schema.prisma, migrations/, seed.ts
```

## Cost model

`lib/calculator.ts` computes the landed cost from purchase + auction fees + shipping, applying BiH
customs duty (5%) and VAT/PDV (17%), then converts to EUR and BAM (EUR pegged at 1.95583). Rates
are configurable constants, upgradeable to a live FX source.
