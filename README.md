# chiehnengwu.dev

Personal site for **Jay Wu (Chieh-Neng Wu)**, hosted on GitHub Pages at
[chiehnengwu.dev](https://chiehnengwu.dev).

- **`/`** — homepage hub: intro, projects, latest social posts, articles
- **`/resume/`** — full engineering résumé

## Structure

| File | Purpose |
|---|---|
| `index.html` | Homepage shell; content comes from `data/*.json` at runtime |
| `resume/index.html` | Résumé (experience, case studies, debug stories, skills) |
| `assets/style.css` | Design for both pages (light/dark, responsive, print) |
| `assets/home.js` | Renders the homepage from the JSON data files |
| `assets/favicon.svg` | Chip-icon favicon |
| `data/links.json` | **Edit this** — profile, social links, projects, articles |
| `data/feeds.json` | Auto-generated social posts; do not edit by hand |
| `scripts/fetch-feeds.mjs` | Fetches YouTube / Instagram / Threads posts |
| `scripts/refresh-tokens.mjs` | Extends the Meta tokens before they expire |
| `.github/workflows/` | Scheduled jobs that run the two scripts |
| `CNAME` | Custom domain for GitHub Pages |
| `.nojekyll` | Skip Jekyll processing |

No build step, no frameworks, no trackers.

## Editing the homepage

Everything visible on the homepage except the auto-fetched feed lives in
`data/links.json`: profile text, avatar, which social links appear
(`"enabled": true/false`), project cards, and the article list. Commit a change
to that file and the page updates — no code changes needed.

Empty sections hide themselves, so an empty `articles` array simply removes the
文章 heading.

## Social feeds

`.github/workflows/refresh-feeds.yml` runs every 6 hours, fetches the latest
posts, and commits `data/feeds.json` when something changed. Each platform is
independent: one missing credential or failing API never empties the others,
and the previous items are kept on error.

### YouTube — no credentials needed

Find the channel ID (Settings → Advanced, a `UC…` string) and add it as a
repository **variable** (not a secret): Settings → Secrets and variables →
Actions → **Variables** → New variable, named `YOUTUBE_CHANNEL_ID`.

### Instagram and Threads — Meta setup required

Both need a long-lived access token from Meta. Instagram additionally requires
a **Business or Creator** account.

1. Create an app at [developers.facebook.com](https://developers.facebook.com/apps).
2. Add the *Instagram* and/or *Threads* product and complete the OAuth flow to
   obtain a long-lived access token for your own account.
3. Store each token as a repository **secret** named `INSTAGRAM_TOKEN` and
   `THREADS_TOKEN` (Settings → Secrets and variables → Actions → Secrets).

Meta long-lived tokens expire after 60 days, so
`.github/workflows/refresh-tokens.yml` runs weekly and calls the refresh
endpoint, which resets that clock. To let it write the new value back, add one
more secret, `GH_PAT`: a fine-grained personal access token scoped to this
repository with **Secrets: read and write** permission. Without `GH_PAT` the
workflow still runs but only reports — the tokens would then need replacing by
hand every 60 days.

Run either workflow immediately from the **Actions** tab via *Run workflow*.

### Testing the fetcher locally

```sh
YOUTUBE_CHANNEL_ID=UCxxxxxxxx node scripts/fetch-feeds.mjs
```

The homepage reads its JSON with `fetch`, so previewing needs a real server —
`python3 -m http.server 8000` — rather than opening the file directly.

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
