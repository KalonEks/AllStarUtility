# All-Star Utilities Website Rebuild

Next.js App Router rebuild for All-Star Utilities based on the documents in `docs/`.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Supabase/Postgres via Drizzle ORM
- Resend for transactional email
- Custom owner/admin session auth with bcrypt password hashes
- Cloudflare Turnstile-ready form protection

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Database

Set `DATABASE_URL` in `.env.local`, then run:

```bash
npm run db:migrate
npm run seed:owner -- --email owner@example.com --password "temporary-password" --role OWNER
```

The migration lives in `drizzle/`.

## Useful Scripts

```bash
npm run lint
npm run build
npm run db:generate
npm run db:migrate
npm run db:studio
npm run seed:owner
```
