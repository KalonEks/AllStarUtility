# All-Star Utilities — Production Launch Plan

**Live preview:** [https://all-star-utility.vercel.app/](https://all-star-utility.vercel.app/)

Your site is already deployed on Vercel as a **demo/preview**. Marketing pages work; real leads (save + email + spam protection) do not until you flip config and finish a few content items.

This plan excludes deep owners-portal feature work. It only includes portal-adjacent env (`SESSION_SECRET`, etc.) when the public form needs it.

---

## Phase 0 — Confirm where you are

1. Open [https://all-star-utility.vercel.app/contact](https://all-star-utility.vercel.app/contact). If you see a **demo preview** banner, submissions are fake.
2. In Vercel → your project → **Settings → Environment Variables**, note what’s set. Per `VERCEL.md`, demo setup usually only has `NEXT_PUBLIC_DEMO_MODE=true` and maybe `APP_URL`.
3. Footer still shows **“Email pending confirmation”** because `src/lib/site.ts` has `CONTACT_EMAIL_PLACEHOLDER`.

**Goal of later phases:** turn this into a real lead channel, then put it on your custom domain.

---

## Phase 1 — Make the backend real (do this first)

### 1. Turn off demo mode

- Vercel → Environment Variables → set `NEXT_PUBLIC_DEMO_MODE` to `false` (or delete it)
- **Deployments → Redeploy**
- Confirm `/contact` no longer shows the demo banner

### 2. Set `APP_URL` for now

```
APP_URL=https://all-star-utility.vercel.app
```

Change this again when the custom domain is live. It drives sitemap, robots, Open Graph, and `/llms.txt`.

### 3. Connect Supabase + migrate

Your project is already referenced in the repo: `pwzikcmxpcljhhhpjnad.supabase.co`.

1. Supabase → **Project Settings → Database → Connection string**
2. Locally: copy `.env.example` → `.env.local`, put the real `DATABASE_URL` in
3. Run:

```bash
npm run db:migrate
```

4. Put the **same** `DATABASE_URL` in Vercel Production env
5. In Supabase Table Editor, confirm tables exist (`inquiries`, `consultation_sessions`, etc.)

### 4. Security salts (required for the public form)

Generate two different random strings (≥32 chars), add to Vercel:

- `IP_HASH_SALT` — **required** for form IP hashing
- `SESSION_SECRET` — only needed when you want the owners portal later

PowerShell example:

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

### 5. Resend (owner notification emails)

1. Create a [Resend](https://resend.com) account
2. Verify your sending domain (ideally `allstarutilities.com`) — add SPF/DKIM DNS records Resend gives you
3. Vercel env:

```
EMAIL_PROVIDER=resend
EMAIL_API_KEY=re_...
EMAIL_FROM=All-Star Utilities <no-reply@your-verified-domain.com>
INQUIRY_TO_EMAIL=the-real-inbox@your-domain.com
```

Without a verified domain, production sending is unreliable. You can do a private smoke test first, but don’t launch public leads on an unverified sender.

### 6. Cloudflare Turnstile (spam protection)

1. Cloudflare → Turnstile → Add widget
2. Hostnames: `all-star-utility.vercel.app`, later your real domain, plus `localhost` for local testing
3. Vercel env:

```
TURNSTILE_SECRET_KEY=...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
```

4. Redeploy → confirm the widget appears on **step 4** of `/contact`

### 7. Smoke test on vercel.app

Submit one real consultation end-to-end. You should see:

- Success message (not demo text)
- New rows in Supabase (`consultation_sessions` → submitted, `inquiries`)
- `email_events` status `sent`
- Email in `INQUIRY_TO_EMAIL`

**If that works, the site can take real leads on the Vercel URL.**

---

## Phase 2 — Content & legal (code changes → push → auto-deploy)

| Task | Where | What to do |
|---|---|---|
| Real public email | `src/lib/site.ts` → `business.email` | Replace `CONTACT_EMAIL_PLACEHOLDER` so footer / JSON-LD / `/llms.txt` stop showing placeholder |
| Confirm NAP & claims | `site.ts`, About page | Addresses, phones, guarantee, Boston Trucking, owner-on-site, credentials |
| Fix FAQ | `src/lib/faqs.ts` | Remove or rewrite the St. Paul tax-assessment answer that still says “confirm before launch” |
| Business hours | Contact and/or footer | Add confirmed hours (missing today) |
| Legal | `/privacy-policy`, `/terms-of-use`, `/disclaimer` | Replace **Draft** copy; privacy must mention form storage, email, analytics, cookies, Turnstile, retention |
| Photos (if you have them) | `public/images/` | Prefer real job photos for hero/OG over stock |

Then commit, push to the branch Vercel watches, and verify the Production deploy.

---

## Phase 3 — Custom domain

1. Decide canonical host (repo assumes something like `https://www.allstarutilities.com`)
2. Vercel → **Settings → Domains** → add apex + `www` → follow DNS instructions
3. Wait until both show **Valid**
4. Update Vercel:

```
APP_URL=https://www.allstarutilities.com
```

5. Redeploy
6. Add the new hostnames to Turnstile (and finish Resend domain verify if not done)
7. Retest `/contact` on the **custom domain**

Keep `*.vercel.app` for internal checks; don’t use it as the public SEO URL.

---

## Phase 4 — Analytics & SEO

1. **GA4:** create property → put `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-...` in Vercel → redeploy → check Realtime
2. **Google Ads** (if advertising): `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` (form already fires `asu:consultation-submitted`; GA4 gtag must be loaded first)
3. **Search Console / Bing:** verify the custom domain, submit `https://your-domain/sitemap.xml`
4. Confirm `/robots.txt` and `/llms.txt` show the final host and real email
5. Align Google Business Profile website/phone with the new site

---

## Phase 5 — Harden & polish (after leads work)

- Keep Turnstile on; watch `email_events` for `failed` / `skipped`
- Separate Production vs Preview env so preview deploys don’t email the real inbox
- Footer links to Privacy / Terms / Disclaimer / FAQ
- Put phones, address, hours on `/contact` (page is form-heavy today)
- Later: phone-click tracking, customer confirmation email, stronger API rate limiting

**Defer:** owners portal, admin seed, CSV export, file uploads.

---

## Suggested order

| When | What |
|---|---|
| **Today** (backend live on vercel.app) | Demo off → DB migrate → salts → Resend → Turnstile → one real form test |
| **This week** (content) | Email + FAQ + legal + hours → push |
| **When domain is ready** | Attach domain → flip `APP_URL` → retest form |
| **Launch week** | GA4 + Search Console + Ads (if needed) |

---

## Production env checklist (Vercel)

| Variable | Action |
|---|---|
| `NEXT_PUBLIC_DEMO_MODE` | `false` / unset |
| `DATABASE_URL` | Supabase Postgres URL |
| `APP_URL` | Final `https://…` (vercel.app first, then custom domain) |
| `SESSION_SECRET` | Random ≥32 chars (portal later; optional for public form if `IP_HASH_SALT` is set) |
| `IP_HASH_SALT` | Different random ≥32 chars |
| `EMAIL_PROVIDER` | `resend` |
| `EMAIL_API_KEY` / `EMAIL_FROM` / `INQUIRY_TO_EMAIL` | Resend + real inbox |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 (Phase 4) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` / `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Ads conversion (if advertising) |

Also see `.env.example`, `VERCEL.md`, and `todo.md`.

---

## Final smoke checklist

- [ ] `/contact` — no demo banner; Turnstile on step 4
- [ ] Submit works → Supabase row + email received
- [ ] Footer — real email, not “pending confirmation”
- [ ] Legal pages — no “Draft”
- [ ] FAQ — no “confirm before launch”
- [ ] `/sitemap.xml` / `/robots.txt` / `/llms.txt` use final URL
- [ ] Custom domain HTTPS valid; form still works there
- [ ] GA4 Realtime (if configured)

---

## Bottom line

You’re past “build the site.” Next is wire Supabase / Resend / Turnstile, turn demo mode off, prove one inquiry, then finish email / legal / content and move off `vercel.app` to your real domain.
