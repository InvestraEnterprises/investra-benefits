# INVESTRA ENTERPRISES LTD — Guest Benefits V1

Simple mobile-first guest offers system built for GitHub + Vercel + PostgreSQL.

## V1 includes
- Guest website with categories and offers
- Property/source QR entry URLs
- Affiliate redirect with click tracking
- Offline digital voucher QR
- Voucher verification and redemption tracking
- Password-protected admin
- Add partners
- Add offers
- Centralized INVESTRA colours and replaceable logo

## Environment variables
See `.env.example`:
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Local

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Guest: http://localhost:3000
Admin: http://localhost:3000/admin/login

## Vercel

Push to GitHub and import into Vercel. Add the four environment variables. The build command is:

```text
prisma generate && prisma migrate deploy && next build
```

V1 uses PostgreSQL rather than SQLite because the production database must be persistent and suitable for Vercel/serverless deployment.

## Branding

Brand colours:
- Dark Blue `#103B56`
- Gold `#D2B06A`
- Light `#F7F9FA`

Replace `public/brand/investra-logo.svg` with the official logo using the same filename. You do not need to edit components.

## Photos

V1 uses image URLs in the admin panel, so adding offer photos does not require changing code. Direct uploads can be added later using Vercel Blob, Cloudinary or Supabase Storage.

## Routes
- `/` guest page
- `/guest/[source]` property-specific guest page
- `/offer/[slug]` offer detail
- `/go/[slug]` tracked affiliate redirect
- `/voucher/[slug]` digital voucher
- `/verify?voucher=...` partner verification/redemption
- `/admin/login` admin login
- `/admin` admin dashboard
