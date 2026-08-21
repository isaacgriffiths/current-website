# isaacgriffiths.com

Personal CV site for Isaac Griffiths — AI and agentic engineer.

Next.js (static export) + Tailwind CSS 4, served from Cloudflare Pages.
`isaacgriffiths.co.uk` redirects here at the Cloudflare edge.

## Editing content

Everything on the page comes from `content/profile.ts`. Change the facts there,
not in the components — the components only decide how a fact is presented.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into out/
```

To exercise the contact endpoint locally, the Pages Function needs the Workers
runtime rather than `next dev`:

```bash
npm run build
npx wrangler pages dev out --compatibility-date=2026-01-01
```

## Contact form

`functions/api/contact.ts` runs as a Cloudflare Pages Function and sends through
Resend. Set these in the Pages project (Settings → Environment variables):

| Variable               | Required | Purpose                                          |
| ---------------------- | -------- | ------------------------------------------------ |
| `RESEND_API_KEY`       | yes      | Resend API key                                   |
| `CONTACT_TO`           | yes      | Inbox that receives the message                  |
| `CONTACT_FROM`         | yes      | Verified Resend sender on the domain             |
| `TURNSTILE_SECRET_KEY` | no       | Turns on bot verification when present           |

Without them the endpoint returns a clear 503 and the form tells the visitor to
email directly instead.

## Deploying

The Pages project `website` builds from this repository.

- Build command: `npm run build`
- Output directory: `out`
