# All-Star Utilities Rebuild TODO

## 1. Supabase database setup

1. Open the Supabase project at `https://pwzikcmxpcljhhhpjnad.supabase.co`.
2. In Supabase, get the Postgres connection string from Project Settings -> Database -> Connection string.
3. Create `.env.local` from `.env.example`.
4. Replace `DATABASE_URL` with the real Supabase Postgres URL. The placeholder is:
   - `postgres://postgres:[PASSWORD]@db.pwzikcmxpcljhhhpjnad.supabase.co:5432/postgres?sslmode=require`
5. Replace `[PASSWORD]` with the database password from Supabase.
6. Run `npm run db:migrate` to create:
   - `users`
   - `inquiries`
   - `inquiry_notes`
   - `inquiry_events`
   - `email_events`
7. Run `npm run seed:owner -- --email OWNER_EMAIL --password "TEMPORARY_PASSWORD" --role OWNER`.
8. Replace `OWNER_EMAIL` with the owner's actual login email.
9. Replace `TEMPORARY_PASSWORD` with a strong temporary password, then store it securely.

## 2. Required environment placeholders

1. Replace `SESSION_SECRET` with a long random value of at least 32 characters.
2. Replace `IP_HASH_SALT` with another long random value. Use a different value than `SESSION_SECRET`.
3. Replace `APP_URL` with the final production URL after deployment, likely `https://www.allstarutilities.com`.
4. Confirm `INQUIRY_TO_EMAIL`. It currently uses `CONTACT_EMAIL_PLACEHOLDER`.
5. Confirm `EMAIL_FROM`. It currently uses `All-Star Utilities <no-reply@allstarutilities.com>`.

## 3. Email provider setup

1. Create a Resend account. Resend has a free tier, but production sending requires domain verification.
2. Add and verify the final All-Star Utilities domain in Resend. The current placeholder is `allstarutilities.com`; replace it if the real domain is different.
3. Add the DNS records Resend gives you:
   - SPF
   - DKIM
   - DMARC, if not already configured
4. Put the Resend API key in `EMAIL_API_KEY`.
5. Submit a test inquiry and confirm:
   - The inquiry row appears in Supabase.
   - An `email_events` row is created.
   - The owner notification email arrives.

## 4. Cloudflare Turnstile setup

1. Create a free Cloudflare Turnstile site.
2. Add the production domain and localhost if testing locally.
3. Put the secret key in `TURNSTILE_SECRET_KEY`.
4. Put the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
5. Confirm the Turnstile widget appears on `/contact` after `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured.

## 5. Business information to confirm

1. Confirm the primary address: `27498 Olinda Trail, Lindstrom, MN 55045`.
2. Confirm the secondary address: `2038 Ford Parkway Ste. 322, St. Paul, MN 55116`.
3. Confirm primary phone: `651-900-9704`.
4. Confirm 24/7 emergency phone: `651-248-1697`.
5. Confirm fax: `612-460-9370`.
6. Confirm email: `CONTACT_EMAIL_PLACEHOLDER`.
7. Confirm business hours and replace the contact page placeholder.
8. Confirm the Boston Trucking relationship is still accurate.
9. Confirm the owner/operator on-site claim is still accurate.
10. Confirm the no-subcontractors claim is still accurate.
11. Confirm the 10-year workmanship guarantee wording.
12. Confirm whether the St. Paul tax assessment payment plan is still offered and legally accurate before publishing that financing language.

## 6. Images and branding

1. Replace `public/images/residential-utility-hero.png` with real All-Star Utilities project photography before launch if available.
2. Use photos of crews, excavation, pipe lining equipment, work sites, and finished repairs.
3. Avoid photos with readable license plates, unsafe practices, or customer-identifying details unless permission is documented.
4. Confirm the exact brand spelling. I used `All-Star Utilities` because that matches the uploaded logo, while the message text said `All Star Utilties`.

## 7. Analytics and Google Ads

1. Create or confirm the GA4 property.
2. Add the GA4 measurement ID to `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.
3. Create or confirm the Google Ads account.
4. Create a lead conversion action for successful consultation submissions.
5. Add the Google Ads ID to `NEXT_PUBLIC_GOOGLE_ADS_ID`.
6. Add the conversion label to `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`.
7. Confirm conversion firing after successful `/api/inquiries` response. The form dispatches `asu:consultation-submitted`, and the site fires Google Ads conversion when `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` are configured.
8. Test with Google Tag Assistant before launch.
9. Track phone click and emergency phone click events.

## 8. Legal pages

1. Review and replace the placeholder Privacy Policy.
2. Review and replace the placeholder Terms of Use.
3. Review and replace the placeholder Disclaimer.
4. Make sure the privacy policy discloses:
   - Stored form submissions
   - Email handling
   - Analytics and ads tags
   - Cookies and click identifiers
   - CAPTCHA provider, if Turnstile is enabled
   - Retention policy for inquiries

## 9. Deployment

1. Push this repository to GitHub.
2. Create a Vercel project from the repository. Vercel Hobby should be enough to start.
3. Add all production environment variables in Vercel.
4. Run Supabase migrations from a trusted local machine or CI job with `DATABASE_URL`.
5. Seed the owner/admin user.
6. Deploy.
7. Test:
   - `/`
   - `/contact`
   - `/owner/login`
   - `/owner/inquiries`
   - `/sitemap.xml`
   - `/robots.txt`
   - `/llms.txt`
8. Submit the sitemap to Google Search Console and Bing Webmaster Tools.

## 10. Known follow-up work

1. Add optional customer confirmation email if desired.
2. Add file uploads for photos/videos/docs in a later phase.
3. Add dashboard filters for status, urgency, property type, date range, and source.
4. Add CSV export if the owner wants reporting.
5. Add password reset only if the owner requests it.
