# USA2BIH — US → Bosnia Vehicle Import Platform

A premium full-stack platform for browsing US auction vehicles, estimating the full landed cost
in **BAM & EUR**, and managing every step of importing a car to Bosnia & Herzegovina.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion ·
Prisma 7 · Neon PostgreSQL · Neon Auth (Better Auth) · Vercel Blob · Resend**.

## Features

- **Public** — animated home, advanced vehicle browse with URL-driven filters, rich vehicle detail
  (gallery, specs, landed-cost breakdown, inquiry), transparent import cost calculator, import
  guide, about/FAQ/contact, and a side-by-side comparison tool.
- **User dashboard** — saved vehicles, inquiries, calculation history, import tracking with a
  visual stage tracker + timeline, document upload, recently-viewed, and profile management.
- **Admin** — vehicle CRUD with multi-image uploads, featured/status controls, inquiry workflow,
  user role management, editable guide content, and an analytics overview.
- **Platform** — SEO (sitemap, robots, manifest, dynamic OG images), accessibility, error/404
  handling, and a transparent BiH duty + VAT cost model.

## Prerequisites

- **Node.js 20+**
- A **Neon** PostgreSQL project with **Neon Auth** enabled
- (Optional) **Vercel Blob** token — required for image/document uploads
- (Optional) **Resend** API key — required for inquiry/contact emails

## Environment setup

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Where to find it |
| --- | --- |
| `DATABASE_URL` | Neon → Connect → **pooled** connection string (host has `-pooler`) |
| `DIRECT_URL` | Neon → Connect → **direct** string (no `-pooler`); used for migrations |
| `NEON_AUTH_BASE_URL` | Neon → **Auth** tab → Configuration → "Auth URL" |
| `NEON_AUTH_COOKIE_SECRET` | Generate with `openssl rand -base64 32` (≥32 chars) |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob (optional) |
| `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` | Resend (optional) |
| `ADMIN_EMAILS` | Comma-separated emails auto-promoted to ADMIN on first sign-in |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used for SEO/OG) |

> Both Next.js and the Prisma CLI read `.env.local` (the Prisma CLI is configured to do so in
> `prisma.config.ts`).

## Local development

```bash
npm install              # also runs `prisma generate` via postinstall
npm run db:migrate       # apply migrations to your Neon database
npm run db:seed          # load demo vehicles + guide content
npm run dev              # http://localhost:3000
```

Sign in once with an email listed in `ADMIN_EMAILS`, then visit **/admin**.

### Useful scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js dev / production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:migrate` | `prisma migrate dev` |
| `npm run db:deploy` | `prisma migrate deploy` (production) |
| `npm run db:seed` | seed demo data |
| `npm run db:studio` | open Prisma Studio |

## Deployment (Vercel)

1. Import the repo into Vercel.
2. Add every variable from `.env.local` to the Vercel project (Production + Preview).
3. Build command: `prisma migrate deploy && next build` (apply migrations during build), or run
   `npm run db:deploy` as a release step.
4. Deploy. Neon Auth, Blob, and Resend work natively on Vercel.

## Project structure

```
app/
  (marketing)/   public site (home, cars, calculator, guide, about, faq, contact, compare)
  (dashboard)/   authenticated user dashboard
  admin/         role-gated admin panel
  auth/          sign-in / sign-up pages
  actions/       server actions (favorites, inquiries, calculations, documents, admin…)
  api/auth/      Neon Auth (Better Auth) route handler
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
components/      ui/ motion/ layout/ vehicle/ dashboard/ admin/ compare/ sections/
lib/             db, auth, queries, dashboard, admin, calculator, validation, email, utils
prisma/          schema.prisma, migrations, seed.ts
```

## Cost model

`lib/calculator.ts` computes the landed cost from purchase + auction fees + shipping, applying BiH
customs duty (5%) and VAT/PDV (17%), then converts to EUR and BAM (EUR pegged at 1.95583). Rates
are configurable constants, upgradeable to a live FX source.
