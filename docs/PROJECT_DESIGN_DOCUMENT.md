# M&B Services Website Rebuild - Project Design Document

Last updated: 2026-05-14

## 1. Project Summary

This project is a full rebuild of the existing M&B Services website at https://www.mb-servicesllc.com/. The new site should remain a business website, but it should also become a practical service resource for customers researching sewer, water, excavation, and sewer pipe lining work in the Twin Cities metro area.

The blog section should be removed. The home page should become a general overview page that explains who M&B Services is, what they do, why customers can trust them, and gives short summaries of each major service. Each service summary should link to a deeper educational service page so customers can treat the site as a one-stop shop before requesting a free consultation.

Primary conversion goal: free consultation / free site evaluation inquiries through a modernized form.

Secondary business goal: give the owner a secure private dashboard where consultation inquiries can be reviewed, searched, filtered, and historically preserved.

Visibility goal: make the site compatible with Google Ads and technically strong for traditional search and AI-assisted search surfaces such as ChatGPT, Claude, Gemini, Google AI Overviews, and Microsoft Copilot.

## 2. Current Website Research

Source site reviewed: https://www.mb-servicesllc.com/

Observed public navigation:

- Home
- About Us
- Residential Sewer & Water
- Commercial Sewer & Water
- Sewer Pipe Lining
- Blog
- Contact Us
- Terms of Use
- Disclaimer
- Privacy Policy

Required change: remove Blog from primary navigation, sitemap, and rebuild scope.

Current business positioning:

- Business name: M&B Services
- Tagline: Your Twin Cities Utility Specialists
- Family-owned and operated sewer and water company serving the Twin Cities metro area
- Services residential and commercial clients
- Specializes in excavation, sewer pipe lining, and deep tunnel work
- Offers 24/7 emergency services for sewer and water customers
- Offers a 10-year workmanship / craftsmanship warranty
- Founded by Mike Boston in 2014
- Works alongside subsidiary Boston Trucking
- Utility specialists have over 20 years of sewer, water, and excavation experience
- Owner/operator on site for every job
- Does work in-house without subcontractors

Current contact details:

- Primary address: 27498 Olinda Trail, Lindstrom, MN 55045
- Secondary address: 2038 Ford Parkway Ste. 322, St. Paul, MN 55116
- Phone: 651-900-9704
- 24/7 emergency service: 651-248-1697
- Fax: 612-460-9370
- Email: molly@mb-servicesllc.com

Current service area language:

- Twin Cities metro area
- Minneapolis neighborhoods: Calhoun Isles, Camden, Central, Uptown, Southwest, University, Nokomis, Longfellow, Near North, Powderhorn
- St. Paul neighborhoods: Highwood Hills, Greater East Side, West Side, Dayton's Bluff, Payne-Phalen, North End, Frogtown, Summit-University, West 7th/Fort Road, Como Park, Hamline Midway, Saint Anthony Park, Union Park, Macalester-Groveland, Highland Park, Summit Hill, Downtown

Current credentials and trust signals:

- Perma-Liner Certification #701271
- Confined Space Certification
- State of Minnesota Plumbing Bond #PB735090
- State of Minnesota Licensed Pipe Layer #8308
- St. Paul Right of Way License #20140000887
- BBB A+
- 10-year workmanship guarantee
- Family-owned and operated
- Owner/operator on site
- No subcontractors claim

Current service list:

- Deep sewer excavation
- Sewer line excavation
- Water pipe excavation
- Water line excavation
- Sand rock / deep tunnel work
- Sewer line installation, replacement, and repair
- Water line installation and replacement
- Manholes
- Catch basins
- Storm sewers
- Fire hydrants
- Pipe repairs and pipe segment replacement
- Sewer pipe lining / CIPP
- 24/7 emergency services

Research notes:

- The contact page currently introduces a "Schedule Your Free Consultation" section, but the form fields were not exposed in the static crawled text. The new build should not depend on the old form implementation.
- Google Ads lead form assets require a business name, call-to-action type, headline/description, privacy policy URL, and can include standard fields plus up to five custom questions. Source: Google Ads API LeadFormAsset documentation.
- Google's LocalBusiness structured data guidance recommends structured data that matches visible page content and can communicate business details such as hours and departments. Source: Google Search Central LocalBusiness structured data.
- Google says the same SEO fundamentals apply to AI features in Search, including helpful visible content, crawlability, and structured data that matches page text. Source: Google Search Central AI features guidance.
- OpenAI says sites that want to be included in ChatGPT search summaries/snippets should avoid blocking OAI-SearchBot in robots.txt. Source: OpenAI Publishers and Developers FAQ.
- Google Business Profile guidance says service-area businesses should use one profile for a central office or location with a designated service area, and should use a phone number and website controlled by the business. Source: Google Business Profile guidelines.

## 3. Target Audience

Primary users:

- Homeowners with sewer or water line issues
- Property owners planning utility replacement or repair
- Builders and developers needing residential utility work
- Commercial property owners and managers
- Businesses with sewer/water infrastructure concerns
- People comparing excavation, replacement, and pipe lining options
- Emergency customers needing fast phone contact

Internal users:

- Owner
- Admin staff
- Future employee/staff roles

## 4. Product Goals

1. Replace the dated brochure site with a modern, mobile-first service website.
2. Remove the blog and focus navigation around conversion and educational service content.
3. Make the home page a clear general overview of the company and services.
4. Add deeper service pages with plain-language explanations, customer questions, process, benefits, constraints, and free consultation calls to action.
5. Modernize the consultation form.
6. Email inquiries to the business and store every inquiry in a database.
7. Provide a private owner/admin dashboard for reviewing inquiries.
8. Prepare the site for Google Ads, Google conversion tracking, and campaign landing pages.
9. Improve search and AI visibility with structured content, schema, local signals, crawlability, and answer-ready service pages.
10. Keep operating cost low and avoid unnecessary infrastructure.

## 5. Non-Goals

- No blog rebuild.
- No public account registration.
- No customer portal.
- No online payment processing in phase one.
- No customer self-scheduling calendar in phase one unless the business later requests it.
- No CMS requirement in phase one; content can be maintained in code/MDX for lower cost and fewer moving parts.

## 6. Recommended Low-Cost Architecture

Recommended stack:

- Frontend and backend: Next.js with App Router
- Hosting: Vercel Hobby or low-cost equivalent
- Database: Neon Postgres free/low-cost tier or Supabase Postgres free/low-cost tier
- ORM/migrations: Drizzle ORM or Prisma
- Email delivery: Resend, Postmark, or SendGrid
- Authentication: custom credential login using server-side password hashing, or Auth.js Credentials provider backed by the `users` table
- Password hashing: Argon2id or bcrypt
- Bot protection: Turnstile or hCaptcha on public forms
- Analytics: Google Analytics 4
- Ads: Google Ads conversion tracking, enhanced conversions for leads, UTM/GCLID capture
- Error logging: Sentry free tier or Vercel logs in early phase

Rationale:

- Vercel + managed Postgres + transactional email keeps infrastructure cheap and simple.
- A serverless backend is enough for inquiry capture, owner login, and dashboard queries.
- Managed Postgres gives durable historical records without running a server.
- Avoiding a CMS lowers cost and security exposure during the first build.

## 7. Information Architecture

Primary navigation:

- Home
- About
- Residential Sewer & Water
- Commercial Sewer & Water
- Sewer Pipe Lining
- Service Areas
- Contact

Private routes:

- `/owner/login`
- `/owner/inquiries`
- `/owner/inquiries/[id]`
- `/owner/settings` future-ready, optional in phase one

Utility pages:

- `/privacy-policy`
- `/terms-of-use`
- `/disclaimer`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt` optional experimental AI-readable site summary

Ad landing pages:

- `/lp/sewer-line-repair`
- `/lp/water-line-replacement`
- `/lp/sewer-pipe-lining`
- `/lp/emergency-sewer-water`

Ad landing pages should be focused, fast, and conversion-oriented, but must avoid thin duplicate content. Each should include local trust signals, service area, proof, phone CTA, form CTA, and privacy-policy access.

## 8. Page Requirements

### Home

Purpose: general overview page.

Required content:

- Clear hero: "M&B Services" and "Twin Cities sewer, water, excavation, and pipe lining specialists"
- Short statement that M&B is family-owned and operated
- Explain residential and commercial service coverage
- Highlight 24/7 emergency sewer/water service
- Highlight 10-year workmanship guarantee
- Highlight owner/operator on site and no subcontractors
- Brief service cards or sections:
  - Residential Sewer & Water
  - Commercial Sewer & Water
  - Sewer Pipe Lining / CIPP
  - Excavation and Deep Tunnel Work
  - Repairs and Replacements
  - Emergency Sewer & Water Service
- Each brief service explanation must link to a deeper page.
- Free consultation CTA near top, middle, and bottom.
- Phone CTA visible on desktop and sticky/clickable on mobile.
- Service area summary.
- Trust/credential strip.

### About

Required content:

- Founded by Mike Boston in 2014.
- Family-owned and operated.
- Over 20 years of utility specialist experience.
- Relationship with Boston Trucking if still accurate.
- Owner/operator on site.
- No subcontractors claim if still accurate.
- Certifications, license numbers, BBB A+.
- Explanation of why this matters for sewer/water work.

### Residential Sewer & Water

Required content:

- Explain what residential sewer and water services include.
- Installation and replacement.
- Repair and pipe segment replacement.
- Water line work.
- Sewer lateral work.
- Manholes, catch basins, storm sewers, water mains, fire hydrants where applicable.
- CIPP pipe lining as a lower-disruption option where appropriate.
- Signs a homeowner should request evaluation: slow drains, pooling water, sewer smell, backups, old clay/cast iron lines, known root intrusion, city notice, visible sinkholes, recurring clogs.
- Explain free site evaluation process.
- Financing note: St. Paul tax assessment payment plan, if still offered and legally/currently accurate.

### Commercial Sewer & Water

Required content:

- Explain commercial utility installation, repair, replacement, and emergency work.
- Emphasize minimizing business disruption.
- Cover property managers, business owners, developers, general contractors, and facilities teams.
- Include urgency and access constraints.
- Include CIPP as a potential lower-disruption option.
- Include CTA for project consultation.

### Sewer Pipe Lining

Required content:

- Explain CIPP in plain language.
- Explain sewer lateral pipe lining.
- Explain when lining may be appropriate and when excavation may still be necessary.
- Explain Perma-Liner system and certification if still accurate.
- Include benefits: lower disruption, extends pipe life, avoids some excavation, helps prevent cracks/breaks.
- Include limitations: not every damaged/collapsed pipe is a candidate; evaluation required.

### Service Areas

Required content:

- Twin Cities metro overview.
- Minneapolis and St. Paul neighborhood list.
- Optional suburb/city service-area pages later if there is enough unique content and true service coverage.
- Avoid doorway pages with duplicated city names and no substance.

### Contact

Required content:

- Consultation form.
- Primary phone.
- 24/7 emergency phone.
- Email.
- Addresses.
- Business hours if the owner confirms them.
- Privacy/disclaimer copy near form.
- Clear "for emergencies, call" message.

## 9. Consultation Form Requirements

The current site asks users to schedule a free consultation, but the visible crawl did not expose detailed form fields. The new form should collect enough information to help the owner triage and prepare while keeping the form short enough to convert.

Required fields:

- First name
- Last name
- Email
- Phone
- Preferred contact method: phone, email, text
- Service address
- City
- State
- ZIP code
- Property type: residential, commercial, builder/developer, property manager, other
- Service needed:
  - Sewer line repair
  - Sewer line replacement
  - Water line repair
  - Water line replacement
  - Sewer pipe lining / CIPP
  - Excavation / deep tunnel work
  - Manhole / catch basin / storm sewer
  - Fire hydrant / water main
  - Emergency sewer/water issue
  - Not sure
- Urgency:
  - Emergency now
  - Within 24 hours
  - This week
  - Planning / quote only
- Message / project description
- Consent checkbox for contact and recordkeeping

Recommended optional fields:

- Is water/sewer service currently working?
- Is there an active backup, leak, pooling water, sinkhole, or city notice?
- Is the property owner, tenant, contractor, or manager submitting?
- Best time to contact
- How did you hear about us?
- Upload photos/videos/docs, phase two
- Existing Google Maps place/address normalization, phase two

Difference from the existing site:

- The new form should capture structured job context, not only contact details and a freeform message.
- The new form should capture lead source data for Google Ads and analytics.
- The new form should store a durable database record before sending email.
- The new form should support owner/admin review, status updates, notes, and historical search.

Anti-spam and quality:

- Add a honeypot field.
- Add Turnstile or hCaptcha.
- Rate-limit by IP and email/phone.
- Validate phone, email, ZIP, and required fields server-side.
- Store raw user agent, IP hash, referrer, UTM fields, GCLID/GBRAID/WBRAID when available.

## 10. Owner/Admin Dashboard

Login:

- Route: `/owner/login`
- Fields: email address and password
- No public sign-up.
- No password reset in phase one unless specifically requested.
- Owner/admin users are manually inserted into the database by a developer or trusted operator.
- Credentials must be stored as salted password hashes, never plaintext.

Roles:

- `Owner`
- `Admin`

Authorization:

- In phase one, Owner and Admin have the same permissions.
- The role system must be modular so future roles can be added, such as Staff, Estimator, Dispatcher, or ReadOnly.

Dashboard:

- Route: `/owner/inquiries`
- Show all free consultation inquiries.
- Search by name, phone, email, address, service type, city, status.
- Filter by status, urgency, property type, date range, source, assigned user future-ready.
- Sort by newest, oldest, urgency.
- Inquiry statuses:
  - New
  - Contacted
  - Scheduled
  - Estimate Sent
  - Won
  - Lost
  - Spam
  - Archived
- Detail page:
  - Full submitted form data
  - Source tracking
  - Email delivery status
  - Internal notes
  - Status history
  - Timestamps
  - IP hash / user agent for abuse review

Audit/history:

- Every status change and note should be recorded.
- Do not delete inquiries through the UI in phase one; use archive/spam status.

## 11. Database Design

Recommended tables:

### `users`

- `id` UUID primary key
- `email` text unique not null
- `password_hash` text not null
- `role` enum: `OWNER`, `ADMIN`
- `is_active` boolean default true
- `created_at` timestamp
- `updated_at` timestamp
- `last_login_at` timestamp nullable

No public route should create or update this table.

### `inquiries`

- `id` UUID primary key
- `first_name` text
- `last_name` text
- `email` text
- `phone` text
- `preferred_contact_method` enum
- `service_address` text
- `city` text
- `state` text
- `zip` text
- `property_type` enum
- `service_needed` enum or text array
- `urgency` enum
- `message` text
- `current_issue` text nullable
- `best_contact_time` text nullable
- `how_heard` text nullable
- `status` enum default `NEW`
- `source` text nullable
- `landing_page` text nullable
- `referrer` text nullable
- `utm_source` text nullable
- `utm_medium` text nullable
- `utm_campaign` text nullable
- `utm_term` text nullable
- `utm_content` text nullable
- `gclid` text nullable
- `gbraid` text nullable
- `wbraid` text nullable
- `ip_hash` text nullable
- `user_agent` text nullable
- `created_at` timestamp
- `updated_at` timestamp

### `inquiry_notes`

- `id` UUID primary key
- `inquiry_id` foreign key
- `author_user_id` foreign key nullable
- `note` text
- `created_at` timestamp

### `inquiry_events`

- `id` UUID primary key
- `inquiry_id` foreign key
- `event_type` text
- `old_value` text nullable
- `new_value` text nullable
- `created_by_user_id` foreign key nullable
- `created_at` timestamp

### `email_events`

- `id` UUID primary key
- `inquiry_id` foreign key nullable
- `provider` text
- `message_id` text nullable
- `to_email` text
- `from_email` text
- `subject` text
- `status` text
- `error` text nullable
- `created_at` timestamp

## 12. Backend/API Requirements

Public endpoints:

- `POST /api/inquiries`
  - Validates form.
  - Verifies CAPTCHA.
  - Rate-limits.
  - Stores inquiry in database.
  - Sends notification email to the business.
  - Sends optional confirmation email to customer.
  - Returns generic success message.

Auth endpoints:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

Protected owner/admin endpoints:

- `GET /api/admin/inquiries`
- `GET /api/admin/inquiries/:id`
- `PATCH /api/admin/inquiries/:id`
- `POST /api/admin/inquiries/:id/notes`

Security:

- Server-side session cookies must be `HttpOnly`, `Secure`, `SameSite=Lax` or stricter.
- Use CSRF protection where appropriate.
- Never expose password hash values in API responses.
- Validate all input with a schema validator such as Zod.
- Use parameterized queries through ORM/query builder.
- Store secrets only in environment variables.

## 13. Email Requirements

Owner notification email:

- Sent after successful inquiry database insert.
- Include name, phone, email, service address, property type, service needed, urgency, message, source, and dashboard link.
- Subject format: `New M&B Services consultation inquiry - [Urgency] - [City]`

Customer confirmation email:

- Optional but recommended.
- Confirm receipt.
- For emergencies, instruct them to call 651-248-1697.
- Avoid guaranteeing appointment time.

Historical record:

- Every inquiry must be stored in the database.
- Every attempted email send should create an `email_events` record.
- Email failures should not delete the inquiry.

## 14. Google Ads Compatibility

Requirements:

- Install Google Tag Manager or Google tag.
- Configure GA4.
- Configure Google Ads conversion action for successful consultation submissions.
- Fire conversion only on successful server-accepted inquiry submissions.
- Capture and store UTM parameters, GCLID, GBRAID, and WBRAID.
- Support enhanced conversions for leads if enabled, using normalized customer data only according to Google policy.
- Maintain an accessible privacy policy URL for Google Ads lead forms.
- Build landing pages for high-intent ad groups.
- Make phone numbers clickable and track call clicks.
- Make emergency phone CTA prominent.
- Avoid misleading claims or unverifiable guarantees.

Suggested ad groups:

- Sewer line repair Twin Cities
- Water line replacement Twin Cities
- Sewer pipe lining Minneapolis / St. Paul
- Emergency sewer water service
- Commercial sewer water contractor
- Residential sewer excavation

## 15. Search and AI Visibility Strategy

Important constraint: no website can guarantee it will be the first business shown by ChatGPT, Claude, Gemini, Google, or any AI system. The practical goal is to make M&B Services easy for search engines and AI systems to crawl, understand, trust, cite, and recommend.

Technical requirements:

- Clean semantic HTML.
- Server-rendered pages.
- Fast load times and strong Core Web Vitals.
- XML sitemap.
- Robots.txt that allows major search crawlers and does not block OAI-SearchBot unless policy changes.
- Canonical URLs.
- LocalBusiness, Organization, Service, BreadcrumbList, FAQPage where appropriate.
- Structured data must match visible page content.
- Clear NAP consistency: name, address, phone.
- Dedicated service pages with direct answers to common customer questions.
- FAQ sections on service pages.
- Cite licenses, certifications, and service areas plainly.
- Use descriptive title tags and meta descriptions.
- Use original project photos where possible.
- Add alt text that describes the actual service work shown.
- Optional `/llms.txt` with a concise business/entity summary and links to key pages. Treat this as experimental, not a replacement for SEO.

Content requirements:

- Explain what M&B Services does in direct language.
- Create answer-ready sections for questions like:
  - "Who repairs sewer lines in the Twin Cities?"
  - "What is CIPP sewer pipe lining?"
  - "When is excavation required instead of pipe lining?"
  - "Does M&B Services handle commercial sewer and water projects?"
  - "Does M&B Services offer emergency sewer and water service?"
- Build trust through specific credentials, dates, service area, phone number, and owner/operator claim.
- Keep content useful rather than keyword-stuffed.

Local SEO:

- Confirm and update Google Business Profile.
- Use one controlled phone number and website.
- If M&B is primarily service-area based, follow Google's service-area business guidance.
- Ensure the public website and Google profile use consistent service categories and service areas.

## 16. Design Principles

Visual direction:

- Modern utility contractor website.
- Professional, local, practical, and trustworthy.
- Avoid generic corporate stock imagery where real crew/equipment/project photos exist.
- Use service photography: excavation, pipe lining equipment, crews, work sites, finished repairs.
- Mobile-first layout because emergency and local service searches are often mobile.

UX priorities:

- Emergency phone access must be immediate.
- Free consultation form must be available from every main page.
- Service pages must educate without overwhelming.
- CTAs should be clear: call now, request free consultation, view service details.
- Owner dashboard should be dense, searchable, and operational, not decorative.

Accessibility:

- WCAG 2.2 AA target.
- Keyboard-accessible forms and dashboard.
- Visible focus states.
- Sufficient color contrast.
- Proper labels and error messages.

## 17. Privacy, Compliance, and Data Handling

Required:

- Privacy policy updated to disclose form storage, email handling, analytics, ads tracking, and cookies.
- Terms/disclaimer updated for new site and business operations.
- Form consent checkbox.
- CAPTCHA disclosure if using Turnstile/hCaptcha.
- Retention policy for inquiries.
- Admin access limited to authenticated Owner/Admin users.

Recommended retention:

- Keep inquiries indefinitely for historical business record unless the owner sets a deletion policy.
- Archive instead of deleting in UI.

## 18. Implementation Phases

### Phase 1 - Foundation

- Build Next.js app.
- Create core pages.
- Remove blog.
- Add database.
- Add consultation form.
- Add email notification.
- Add owner/admin login and inquiry dashboard.
- Add privacy/terms/disclaimer pages.
- Add sitemap, robots.txt, structured data.

### Phase 2 - Ads and Analytics

- Add GTM/GA4/Google Ads conversion tracking.
- Add ad landing pages.
- Validate privacy policy and consent copy.
- Store all attribution fields.
- Test form conversion events.

### Phase 3 - Content Expansion

- Expand service pages with FAQs.
- Add service area pages only where there is true, unique local content.
- Add original project photos and case-study style project pages if approved.

### Phase 4 - Operational Enhancements

- Add file uploads.
- Add inquiry assignment.
- Add staff roles.
- Add email reply templates.
- Add export to CSV.
- Add dashboard metrics.

## 19. Acceptance Criteria

The rebuild is ready for launch when:

- Blog is removed.
- All primary public pages are live and mobile responsive.
- Contact form validates and submits.
- Inquiry is stored in database before or along with email send.
- Owner/admin can log in and review inquiries.
- Owner/admin users cannot be created publicly.
- Email notification works.
- Failed email sends are logged.
- Google Ads conversion event fires only after successful submission.
- UTM/GCLID fields are captured.
- Sitemap and robots.txt are live.
- LocalBusiness structured data validates.
- Privacy policy is reachable from forms and footer.
- Emergency phone number is prominent.
- Lighthouse/Core Web Vitals are acceptable for launch.

## 20. Source Links

- Existing site: https://www.mb-servicesllc.com/
- Existing contact page: https://www.mb-servicesllc.com/contact-us/
- Existing about page: https://www.mb-servicesllc.com/about-us/
- Existing residential page: https://www.mb-servicesllc.com/residential-sewer-water/
- Existing commercial page: https://www.mb-servicesllc.com/commercial-sewer-water/
- Existing sewer pipe lining page: https://www.mb-servicesllc.com/sewer-pipe-lining/
- Google Ads LeadFormAsset documentation: https://developers.google.com/google-ads/api/reference/rpc/v20/LeadFormAsset
- Google Ads lead forms help: https://support.google.com/google-ads/answer/16726829
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google AI features and website guidance: https://developers.google.com/search/docs/appearance/ai-overviews
- OpenAI publishers/developers FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Google Business Profile guidelines: https://support.google.com/business/answer/3038177
