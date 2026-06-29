# M&B Services Rebuild - Developer Setup README

This README describes the recommended low-cost implementation path for the M&B Services website rebuild documented in `docs/PROJECT_DESIGN_DOCUMENT.md`.

## 1. Recommended Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS or a lightweight component system
- Postgres via Neon or Supabase
- Drizzle ORM or Prisma
- Auth.js Credentials provider or custom signed server session
- Argon2id or bcrypt password hashing
- Resend, Postmark, or SendGrid for transactional email
- Cloudflare Turnstile or hCaptcha for public form protection
- Google Tag Manager, GA4, and Google Ads conversion tracking

## 2. Required Environment Variables

Use `.env.local` for local development and configure the same values in production hosting.

```bash
DATABASE_URL="postgres://..."
APP_URL="http://localhost:3000"
SESSION_SECRET="replace-with-long-random-secret"

EMAIL_PROVIDER="resend"
EMAIL_API_KEY="..."
EMAIL_FROM="M&B Services <no-reply@mb-servicesllc.com>"
INQUIRY_TO_EMAIL="molly@mb-servicesllc.com"

TURNSTILE_SECRET_KEY="..."
NEXT_PUBLIC_TURNSTILE_SITE_KEY="..."

NEXT_PUBLIC_GA4_MEASUREMENT_ID="G-..."
NEXT_PUBLIC_GOOGLE_ADS_ID="AW-..."
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL="..."
```

## 3. Local Setup

```bash
npm install
npm run dev
```

Recommended scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "seed:admin": "tsx scripts/seed-admin.ts"
  }
}
```

## 4. Database Setup

Create a Postgres database in Neon or Supabase.

Minimum tables:

- `users`
- `inquiries`
- `inquiry_notes`
- `inquiry_events`
- `email_events`

The `users` table is for owner/admin login only. There must be no public API route that creates users.

Manual owner/admin setup flow:

1. Generate a password hash locally with Argon2id or bcrypt.
2. Insert the user directly through a seed script, database console, or protected admin-only script.
3. Set role to `OWNER` or `ADMIN`.
4. Set `is_active = true`.

Example seed command shape:

```bash
npm run seed:admin -- --email admin@example.com --password "temporary-password" --role ADMIN
```

The seed script must hash the password before insert. Never store plaintext passwords.

## 5. REST/API Connections

Public route:

- `POST /api/inquiries`

Expected body:

```json
{
  "firstName": "Jane",
  "lastName": "Customer",
  "email": "jane@example.com",
  "phone": "651-555-1234",
  "preferredContactMethod": "phone",
  "serviceAddress": "123 Main St",
  "city": "St. Paul",
  "state": "MN",
  "zip": "55116",
  "propertyType": "residential",
  "serviceNeeded": ["sewer-line-repair"],
  "urgency": "this-week",
  "message": "Slow drainage and recurring backup.",
  "consent": true,
  "turnstileToken": "...",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "sewer-line-repair"
  },
  "gclid": "..."
}
```

Server flow:

1. Validate body with Zod.
2. Verify Turnstile/hCaptcha token.
3. Rate-limit by IP hash and submitted email/phone.
4. Insert inquiry into database.
5. Send owner notification email.
6. Insert `email_events` row with success or failure status.
7. Return success to the browser.

Protected owner/admin routes:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET /api/admin/inquiries`
- `GET /api/admin/inquiries/:id`
- `PATCH /api/admin/inquiries/:id`
- `POST /api/admin/inquiries/:id/notes`

## 6. Email Setup

Use a verified sending domain when possible, such as `mb-servicesllc.com`.

Required DNS records depend on provider, but usually include:

- SPF
- DKIM
- DMARC

Owner notification subject:

```text
New M&B Services consultation inquiry - [Urgency] - [City]
```

Customer confirmation:

- Confirm receipt.
- Repeat emergency phone number: 651-248-1697.
- Do not promise appointment availability.

## 7. Google Ads and Analytics Setup

Install Google Tag Manager or Google tag.

Track:

- Consultation form successful submit
- Phone click
- Emergency phone click
- Ad landing page view

Persist attribution in cookies/local storage before submit:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- `gbraid`
- `wbraid`
- landing page URL
- referrer

Fire Google Ads conversion only after `POST /api/inquiries` returns success.

Keep the privacy policy visible from every page and linked near the form.

## 8. SEO and AI Search Setup

Required files/routes:

- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt` optional but recommended as an experimental AI-readable summary

Robots guidance:

- Allow Googlebot, Bingbot, and OAI-SearchBot unless business policy changes.
- Do not index owner/admin routes.

Structured data:

- `LocalBusiness`
- `Organization`
- `Service`
- `BreadcrumbList`
- `FAQPage` where visible FAQs exist

Important rule: structured data must match visible page content.

## 9. Deployment

Cheapest recommended deployment:

1. Push repository to GitHub.
2. Connect repository to Vercel.
3. Add production environment variables.
4. Run database migrations.
5. Seed owner/admin user manually.
6. Verify email provider DNS.
7. Deploy.
8. Test public form.
9. Test owner login.
10. Test Google Ads conversion event in preview/debug mode.
11. Submit sitemap in Google Search Console and Bing Webmaster Tools.

## 10. Launch Checklist

- Blog removed from navigation and sitemap.
- All core pages render on desktop and mobile.
- Contact form validates and submits.
- Inquiry appears in database.
- Email notification sends.
- Email failure logs correctly.
- Owner/admin login works.
- No public user creation exists.
- Dashboard search/filter works.
- Google Ads conversion only fires after successful submission.
- UTM/GCLID data is stored.
- Privacy policy, terms, and disclaimer are linked in footer.
- Sitemap and robots.txt are accessible.
- Structured data validates.
- Emergency phone number is visible and clickable.
