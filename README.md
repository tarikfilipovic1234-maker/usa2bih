# USA2BIH: US to Bosnia vehicle import platform

Full-stack app for browsing US auction vehicles, estimating the landed cost in **BAM and EUR**,
and tracking an import through customs and registration in Bosnia and Herzegovina.

Live: https://usa2bih.vercel.app

Built with **Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Prisma 7,
Neon PostgreSQL, Neon Auth (Better Auth), Vercel Blob and Resend**, deployed on **Vercel**.

---

## Features

- **Public**: home, vehicle browse with URL-driven filters, vehicle detail (gallery, specs,
  landed-cost breakdown, inquiry form), the import cost calculator, the import guide,
  about / FAQ / contact, privacy and terms, and a side-by-side comparison tool.
- **Accounts**: email/password auth via Neon Auth, plus a dashboard with saved vehicles,
  inquiries, calculation history, import tracking (stage tracker and timeline), document
  uploads, recently-viewed and profile management.
- **Admin**: vehicle CRUD with multi-image uploads, featured/status controls, inquiry workflow,
  user role management, editable guide content and an overview page.
- **Platform**: SEO (sitemap, robots, manifest, generated OG images and icons), accessibility,
  error and 404 handling, and a documented BiH customs-duty and VAT cost model.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 (no runtime animation library) |
| Database | Neon PostgreSQL via Prisma 7 (Neon serverless driver adapter) |
| Auth | Neon Auth (Better Auth), `@neondatabase/auth` |
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
4. **Neon Auth, Domains tab:** add the production URL (e.g. `https://usa2bih.vercel.app`) to the
   trusted-domains list, or auth redirects are blocked.
5. Deploy. Blob and Resend work natively on Vercel.

## Project structure

```
app/
  (marketing)/   public site (home, cars, calculator, guide, about, faq, contact,
                 compare, privacy, terms)
  (dashboard)/   authenticated user dashboard
  admin/         role-gated admin panel
  auth/          sign-in / sign-up pages
  api/auth/      Neon Auth (Better Auth) route handler
  actions/       server actions (favorites, inquiries, calculations, documents, admin)
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.tsx apple-icon.tsx
components/      ui/ legal/ layout/ vehicle/ dashboard/ admin/ compare/ auth/ sections/
lib/             db, neon-auth, auth, auth-client, queries, dashboard, admin, calculator,
                 validation, email, icons, utils
prisma/          schema.prisma, migrations/, seed.ts
```

## Cost model

`lib/calculator.ts` computes the landed cost from purchase price plus auction fees plus shipping,
applying BiH customs duty (5%) and VAT/PDV (17%), then converting to EUR and BAM (EUR pegged at
1.95583). Rates are configurable constants and the USD to EUR rate is a maintained constant rather
than a live feed, so it needs reviewing periodically. The site presents these figures as estimates
and says so on the calculator, the vehicle pages, the footer and the terms page.

Number and date formatting in `lib/utils.ts` is done explicitly rather than through
`Intl.NumberFormat` locale data: Node and browser ICU builds disagree on the separators for
locales such as `bs-BA`, which caused a server/client hydration mismatch.
