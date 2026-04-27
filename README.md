# Map Your Video Blog (Astro)

Astro blog app for `mapyourvideo.com/blog`, backed by Sanity.

## Environment Variables

Create `.env` with:

```bash
PUBLIC_SANITY_PROJECT_ID=d38rfkes
PUBLIC_SANITY_DATASET=production
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The Astro config sets `base: "/blog"` so generated routes and asset URLs are rooted at `/blog`.

## Netlify Deploy

This project includes `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`

Also includes `public/_redirects` with `/blog -> /blog/` canonical redirect.

## Serving under `mapyourvideo.com/blog`

The build output lives at the root of `dist/` (`dist/index.html`, `dist/<slug>/index.html`, etc.), but asset URLs use the Astro `base` path (`/blog/_astro/...`). Deploy by copying **everything inside `dist/`** into your host’s `/blog/` directory (or equivalent), so `https://mapyourvideo.com/blog/` loads `index.html` and `/blog/_astro/*` resolves.
