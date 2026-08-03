# chiehnengwu.dev

Personal site for **Jay Wu (Chieh-Neng Wu)**, hosted on GitHub Pages at
[chiehnengwu.dev](https://chiehnengwu.dev).

- **`/`** — homepage hub: intro, projects, latest social posts, articles
- **`/resume/`** — full engineering résumé

## Structure

Two layers, per the service's design principle: the **display system** is fixed
and clients never touch it; **user content** is all a curation Agent ever edits.

| Path | Layer | Purpose |
|---|---|---|
| `src/_includes/` | display | Layouts, partials, SEO — the part that must not break |
| `src/content/*.yaml` | content | profile, socials, projects, articles, instagram |
| `src/content/cases/*.md` | content | One file per full case-study page |
| `src/index.njk`, `src/resume/` | display | Page shells |
| `assets/` | display | CSS, JS, favicon, OG image |
| `data/feeds.json` | generated | Auto-refreshed social posts; never edited by hand |
| `scripts/` | — | Content intake, feed fetching, token refresh |
| `.github/` | — | Issue form + workflows |
| `eleventy.config.mjs` | — | Build config |

Built with [Eleventy](https://www.11ty.dev/). Pages are rendered to real HTML at
build time, so content is visible to crawlers and to anyone reading view-source.
The only client-side JavaScript is the auto-refreshed feed and Instagram's embed
widget.

```sh
npm ci
npm run build     # → _site/
npm run serve     # local preview with live reload
```

The build runs in CI, never on a content editor's machine — nobody updating the
site needs Node installed, and a failed build leaves the last good deployment
live instead of breaking the site for visitors.

## Adding content (the normal way)

**Open a new issue using the "新增內容到首頁" template.** Pick a type, paste a
link, submit. A workflow validates it, commits the change, redeploys the
site, then comments and closes the issue — usually under a minute. It works from
a phone, which is the point: curation that requires a laptop and hand-edited JSON
doesn't survive contact with real life.

If something is wrong with the submission — a duplicate post, a non-Instagram
URL in the Instagram field, a missing title — nothing is committed and the issue
gets a comment explaining why.

Only issues opened by the repository owner are acted on. This repo is public, so
without that check anyone could push content onto the live site.

Ordering follows how the page reads: Instagram posts and articles are prepended
(newest first), projects are appended, since that list is hand-ordered by
significance.

## Editing the homepage directly

Everything on the homepage except the auto-fetched feed lives in
`src/content/`: `profile.yaml`, `socials.yaml` (each entry has `enabled:`),
`projects.yaml`, `articles.yaml`, `instagram.yaml`, and `cases/*.md`. Edit these
directly when you need to reorder, reword, or delete — the issue form only
appends.

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

## 精選 Instagram 貼文

The auto-fetched feed above needs `INSTAGRAM_TOKEN` to show Instagram posts.
Until that's set up — or for posts worth pinning even after it is — add the
post's plain URL to `src/content/instagram.yaml`:

```yaml
- https://www.instagram.com/p/POST_SHORTCODE/
- https://www.instagram.com/reel/REEL_SHORTCODE/
```

This uses Instagram's official oEmbed widget (the same thing their own
"Embed" button on a post produces) — no API, no token, no app review, works
for any public post immediately. The trade-off: it only shows the exact posts
listed here, it never updates itself when you post something new, and the
card is Instagram's own fixed white-background design (framed here in a
themed card so it doesn't look like a mismatch in dark mode).

It also loads `instagram.com/embed.js` — a Meta-controlled script — but only
on pages where the file is non-empty; leave the array empty and the
page stays script-free.

Once `INSTAGRAM_TOKEN` is live, real posts start appearing in the automated
`最新動態` feed above with no further action. `instagram.yaml` is independent
of that — keep it as a pinned/curated shelf, or empty the array; either way
needs no code change.

### Testing the fetcher locally

```sh
YOUTUBE_CHANNEL_ID=UCxxxxxxxx node scripts/fetch-feeds.mjs
```

Use `npm run serve` to preview the built site locally.

## Deploy (GitHub Pages)

1. Merge to `main`.
2. **Settings → Pages → Build and deployment**: source must be **GitHub Actions**
   (not "Deploy from a branch") — `.github/workflows/deploy.yml` publishes the build.
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
