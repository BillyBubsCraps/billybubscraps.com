# billybubscraps.com · production static site

`dist/` is the complete, deployable site: plain HTML, one CSS file and one tiny JS file (social-links config). No build step is needed to host it, no external requests, no cookies, no analytics.

## Deploy (GitHub Pages)
1. Publish the **contents** of `dist/` at the root of the Pages branch (for example `gh-pages`) or in `/docs`.
2. `dist/CNAME` contains exactly `billybubscraps.com`. Keep it at the published root so Pages keeps the custom domain.
3. `dist/.nojekyll` must stay, so Pages serves files as-is (no Jekyll processing).
4. DNS for `billybubscraps.com`: apex A/AAAA records for GitHub Pages (185.199.108-111.153) plus `www` CNAME to `<user>.github.io`, then turn on **Enforce HTTPS** in the Pages settings.
5. `404.html` at the root is picked up by Pages automatically.

Clean URLs are real folders: `/`, `/bubble-craps/`, `/table-craps/`, `/fair-dice/`, `/privacy/`, `/terms/`, `/support/`, `/press/` (each one is `folder/index.html`). All internal links and assets are root-relative (`/assets/...`), so the site must be served at the domain root, not a sub-path.

## billybubscraps.app redirect (Porkbun)
Handle it at Porkbun with **URL Forwarding**, not on Pages: forward `billybubscraps.app` and `www.billybubscraps.app` to `https://billybubscraps.com` as a **permanent (301)** redirect, with "include path" turned on if offered. `.app` is HSTS-preloaded, so the redirect has to work over HTTPS; Porkbun's forwarding issues the certificate. Don't add `.app` to the CNAME file.

## Social links: off by default
Every account lives in ONE block: `dist/assets/js/social.js` (`window.BB_SOCIAL`). Each entry ships with `enabled: false`, so no icons and no empty icon row are rendered (the footer container stays `hidden`).

**To turn on X once @billybubscraps exists:** open `assets/js/social.js`, change the `x` entry to `enabled: true` (check the URL `https://x.com/billybubscraps`), and redeploy. The footer on every page then shows the icon plus "@billybubscraps". Turn others on the same way, but only for accounts that really exist.

## Waitlist: disabled at launch
The form markup is kept on every page (`#waitlist`) inside a `<fieldset disabled>`, with no `action` and a non-interactive "Waitlist opening soon" status instead of the submit button. To wire it up later, follow the HTML comment above the form in `build/build.py` (`waitlist()`): add `action`/`method`, remove `disabled`, and swap the status span for the commented `<button type="submit">`. Update the Privacy page at the same time.

## Indexing and SEO
`robots.txt` allows everything and points to `sitemap.xml` (8 public pages). No page has `noindex`. Each page has its own title, description, canonical URL on `https://billybubscraps.com`, Open Graph and Twitter card tags. The share images are in `assets/og/` at 1200x630 (home, Bubble Craps, Table Craps).

## Content still pending
- Privacy and Terms are marked **"Draft · pending legal review before app launch"**.
- `support@billybubscraps.com` and `press@billybubscraps.com` are placeholders until the mailboxes exist.
- Premium: "One-time $4.99 unlock · per app" (price may vary by region/store).
- Store badges are generic "Coming soon · iPhone / Android" pills, not Apple or Google artwork. Swap in official badges and real store links only at launch, following each store's badge guidelines.

## Rebuild from source
`build/make.sh` regenerates `dist/` from `src/` assets and the app mockups (Python + Pillow, plus Playwright only at build time for the favicons and OG images). Fonts are self-hosted subset WOFF2 files of Fraunces, Archivo and Cinzel (SIL OFL 1.1; licenses are in `assets/fonts/`).
