# isaacgriffiths.com

Source for [isaacgriffiths.com](https://isaacgriffiths.com), my personal site and CV. Next.js 16 as a static export, React 19, Tailwind CSS 4, served from Cloudflare Pages with one Pages Function for the contact form.

The earlier hand-written version of this site lives in [old-website](https://github.com/isaacgriffiths/old-website).

## How it is put together

- **One source of truth for content.** Every fact on the page comes from `content/profile.ts`. Components decide how a fact is presented, never what it says, so updating the CV is a data edit.
- **Two-column layout** with a fixed sidebar and a scrolling main column, a scroll-spied section nav, and a cursor spotlight that respects `prefers-reduced-motion`.
- **Triage demo.** A small animated walkthrough of an agent triaging a request, driven from the same content file, that stops animating when the OS asks for reduced motion.
- **Contact form** backed by `functions/api/contact.ts`, a Cloudflare Pages Function that sends through Resend, optionally verifies Cloudflare Turnstile, and emails a branded confirmation. If a visitor asks for a copy of the CV, the function reads it from a private R2 bucket and attaches it, so the PDF is never a public asset.
- **Search and crawler plumbing.** Generated `sitemap.xml` and `robots.txt`, Open Graph and Twitter cards, ProfilePage JSON-LD, an `llms.txt`, an IndexNow key, and a `_headers` file for immutable static assets and security headers.
- **Performance.** The portrait ships as AVIF and WebP through a `<picture>` element. The last Lighthouse mobile run scored 99 performance, 100 accessibility, 100 best practices and 100 SEO.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into out/
```

`next dev` does not run Pages Functions. To exercise the contact endpoint locally, build and serve the output with the Workers runtime:

```bash
npm run build
npx wrangler pages dev out --compatibility-date=2026-01-01
```

## Checks

Three scripts drive a real Chrome (set `BROWSER_BIN` if it is not in the default Windows location) or inspect the source directly:

```bash
npm run test:scrollspy          # section nav highlights the right entry while scrolling
npm run test:contact-fallback   # form degrades to a mailto link when the API is unavailable
npm run test:email-outlook      # confirmation email template stays Outlook-safe
```

## Contact form configuration

Set these in the Pages project under Settings, Environment variables:

| Variable               | Required | Purpose                                |
| ---------------------- | -------- | -------------------------------------- |
| `RESEND_API_KEY`       | yes      | Resend API key                         |
| `CONTACT_TO`           | yes      | Inbox that receives the message        |
| `CONTACT_FROM`         | yes      | Verified Resend sender on the domain   |
| `TURNSTILE_SECRET_KEY` | no       | Turns on bot verification when present |

Without them the endpoint returns a clear 503 and the form tells the visitor to email directly instead. The CV attachment needs the `CV_BUCKET` R2 binding declared in `wrangler.jsonc`. Upload a replacement with:

```bash
npx wrangler r2 object put isaacgriffiths-private-assets/documents/<file>.pdf \
  --file path/to/CV.pdf --content-type application/pdf --remote
```

and update `CV_OBJECT_KEY` in the function to match.

## Making it your own

- **Your facts.** `content/profile.ts` holds the name, role, tagline, email, photo path, experience, education, skills and the triage demo script. Edit that one file and the whole page follows.
- **Your face.** Replace `public/isaac.jpg`, `isaac.avif` and `isaac.webp` and update `photo` in the profile file. The AVIF and WebP copies are what actually ship; regenerate them from your JPEG with any image tool.
- **Your domain.** Search the repo for `isaacgriffiths.com`. It appears in `app/layout.tsx` (metadata base, Open Graph URL, JSON-LD identifiers), `app/sitemap.ts`, `app/robots.ts` and `public/llms.txt`. Update the JSON-LD `dateCreated` and `addressRegion` there too, or remove them.
- **Search engine bits.** Delete `public/fc99d738e7afc58e1d57a217e2360e12.txt`; that is my IndexNow key. Generate your own if you want IndexNow, otherwise skip it. Rewrite `public/llms.txt` in your own words.
- **Contact form.** Create a Resend account and a verified sender on your domain, set the environment variables above in your Pages project, and optionally add Turnstile. Point `CV_BUCKET` in `wrangler.jsonc` at your own R2 bucket and change `CV_OBJECT_KEY` in `functions/api/contact.ts`. Without any of that the form still degrades cleanly to a mailto link.
- **Headers.** `public/_headers` sets caching and security headers; nothing in it is personal.

No secrets are committed anywhere. Every key is read from Pages environment variables at request time, and `.env*` files are gitignored.

## Deploying

Production is a direct upload of the static export to the Pages project `website`:

```bash
npm run build
npx wrangler pages deploy out --branch main
```

`isaacgriffiths.co.uk`, `www.isaacgriffiths.com` and `aiwithisaac.com` redirect here at the Cloudflare edge.
