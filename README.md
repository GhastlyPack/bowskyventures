# bowskyventures.com

Marketing site for [Bowsky Ventures](https://www.linkedin.com/company/bowsky-ventures), a venture studio led by Brandon Bowsky.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Deploys to Vercel
- Contact form posts to Customer.io Track API

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in Customer.io credentials
npm run dev
```

Open http://localhost:3000.

## Environment variables

Set these in Vercel (Production + Preview) and in `.env.local` for development:

| Variable | Required | Notes |
| --- | --- | --- |
| `CUSTOMERIO_SITE_ID` | yes | Customer.io → Settings → API Credentials → Track API |
| `CUSTOMERIO_API_KEY` | yes | Same place as above |
| `CUSTOMERIO_REGION` | no | `us` (default) or `eu` |
| `CUSTOMERIO_EVENT_NAME` | no | Defaults to `contact_form_submitted` |

## How the contact form works

1. The form in [`src/components/Contact.tsx`](src/components/Contact.tsx) POSTs JSON to `/api/contact`.
2. [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts) validates the payload, then calls Customer.io:
   - `PUT /api/v1/customers/{email}` to identify the person
   - `POST /api/v1/customers/{email}/events` with event name `contact_form_submitted` and the form fields as event data
3. In Customer.io, configure a **transactional message** (or campaign) triggered by the `contact_form_submitted` event. Use the `data.*` properties (name, email, company, message) in the email template. Add `brandon@bowskyventures.com` and any team recipients as the send-to addresses.

If `CUSTOMERIO_SITE_ID` / `CUSTOMERIO_API_KEY` are missing, the route responds with 503 instead of crashing, so the form stays visible without spam.

## Deploy

Vercel will pick up the framework automatically. Domain `bowskyventures.com` is registered with GoDaddy — point the apex A record to Vercel's `76.76.21.21` (or use Vercel-managed nameservers) and add `www` as a CNAME to `cname.vercel-dns.com`. Vercel will provision TLS.

## Brand assets

The site's favicon, Apple touch icon, and Open Graph / Twitter share cards are derived from `brand/logo.png` (gold BB wreath on white). The generator strips the white to transparent, composites the logo onto the brand-dark background, and writes the four assets Next.js picks up by convention from `src/app/`:

| File | Purpose |
| --- | --- |
| `src/app/icon.png` | Browser favicon (512×512) |
| `src/app/apple-icon.png` | iOS home-screen icon (180×180) |
| `src/app/opengraph-image.png` | OG share card (1200×630) |
| `src/app/twitter-image.png` | Twitter card (1200×630, copy of OG) |

To regenerate (e.g. after swapping the logo):

```bash
node scripts/generate-brand-assets.mjs
```

## Replacing the placeholder portraits

- **Brandon:** drop a real photo at `public/brandon.jpg` (or similar) and update the `<Image src=...>` in [`src/components/About.tsx`](src/components/About.tsx).
- **Team (Matthew Melzer, Cole Roemer, Michael Kuczynski, Matthew Allison):** the cards in [`src/components/Team.tsx`](src/components/Team.tsx) currently render an inline SVG monogram. Replace `<Avatar initials=... />` with `<Image src=... fill ... />` once photos arrive, and fill in the `linkedin` field on each member when you have URLs.
