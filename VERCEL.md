# Deploy to Vercel (prototype / preview)

Use this for stakeholder demos of design and copy. Backend features (form saves, admin dashboard, email) are optional until production.

## One-time setup (about 5 minutes)

1. Open **[Import AllStarUtility on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKalonEks%2FAllStarUtility&project-name=all-star-utilities&repository-name=AllStarUtility)** and sign in with GitHub.
2. On the import screen, expand **Environment Variables** and add:

   | Variable | Value | Required for demo? |
   |---|---|---|
   | `NEXT_PUBLIC_DEMO_MODE` | `true` | **Yes** — form UI works without a database |
   | `APP_URL` | Your Vercel URL (e.g. `https://all-star-utilities.vercel.app`) | Recommended |

3. Click **Deploy**.
4. Share the production URL (and preview URLs on each PR) with your team.

### Demo mode

With `NEXT_PUBLIC_DEMO_MODE=true`:

- All four form steps work visually.
- Submit shows a success message; nothing is saved or emailed.
- No `DATABASE_URL`, Resend, or Turnstile keys are required.

Remove or set `NEXT_PUBLIC_DEMO_MODE` to `false` when you connect the real backend.

## Production environment variables

When you are ready for live inquiries and the admin dashboard, add these in **Vercel → Project → Settings → Environment Variables**:

```
DATABASE_URL=
APP_URL=
SESSION_SECRET=
IP_HASH_SALT=
EMAIL_API_KEY=
EMAIL_FROM=
INQUIRY_TO_EMAIL=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

See `.env.example` and `todo.md` for details.

After adding `DATABASE_URL`, run migrations locally:

```bash
npm run db:migrate
npm run seed:admin -- --email you@example.com --password "your-temp-password" --role ADMIN
```

## CLI deploy (optional)

If you prefer the Vercel CLI after logging in:

```bash
npx vercel login
npx vercel link
npx vercel env add NEXT_PUBLIC_DEMO_MODE
npx vercel --prod
```

## What works on a demo deploy

| Page | Demo (no DB) | Production |
|---|---|---|
| Home, services, about, contact UI | Yes | Yes |
| Multi-step form UI | Yes | Yes |
| Form submission / email | No | Yes |
| Admin login / dashboard | No | Yes |

## Custom domain (later)

Vercel → Project → Settings → Domains → add `www.allstarutilities.com` and follow DNS instructions.
