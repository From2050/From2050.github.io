# chiehnengwu.dev

Personal résumé / portfolio site for **Jay Wu (Chieh-Neng Wu)** — a static single-page
site hosted on GitHub Pages at [chiehnengwu.dev](https://chiehnengwu.dev).

## Structure

| File | Purpose |
|---|---|
| `index.html` | All content (hero, experience, case studies, debug stories, skills, contact) |
| `assets/style.css` | Visual design (dark theme, responsive, print styles) |
| `assets/site.js` | Mobile nav toggle, scroll-reveal, footer year |
| `assets/favicon.svg` | Chip-icon favicon |
| `CNAME` | Custom domain for GitHub Pages |
| `.nojekyll` | Skip Jekyll processing |

No build step, no frameworks, no trackers.

## Deploy (GitHub Pages)

1. Merge to `main`.
2. **Settings → Pages → Build and deployment**: Deploy from a branch → `main` / `/ (root)`.
3. **Settings → Pages → Custom domain**: enter `chiehnengwu.dev`, save.
4. After the DNS check passes, enable **Enforce HTTPS**.

## DNS records

At the DNS provider for `chiehnengwu.dev`:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `from2050.github.io` |

If using Cloudflare, keep the records **DNS-only (grey cloud)** at least until GitHub
finishes issuing the TLS certificate.

## Email forwarding (`jay@chiehnengwu.dev`)

A static site can't host a mailbox; use the DNS provider's email forwarding instead.
With **Cloudflare Email Routing** (free):

1. Cloudflare dashboard → the `chiehnengwu.dev` zone → **Email → Email Routing**.
2. Enable it and let Cloudflare add the required `MX` and `TXT` (SPF) records.
3. Create a routing rule: `jay@chiehnengwu.dev` → your personal inbox, then verify
   the destination address from the confirmation email.

(Alternatives: ImprovMX or Forward Email, also free for a single alias.)

The destination mailbox is configured at the provider — never commit it to this
public repository.
