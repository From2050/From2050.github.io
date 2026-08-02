/**
 * Refresh data/feeds.json from YouTube, Instagram and Threads.
 *
 * Run by .github/workflows/refresh-feeds.yml. Credentials come from the
 * environment; nothing secret is ever written to the repository.
 *
 *   YOUTUBE_CHANNEL_ID   public channel id (UC...) — no key needed
 *   INSTAGRAM_TOKEN      Instagram Graph API long-lived access token
 *   THREADS_TOKEN        Threads API long-lived access token
 *
 * A platform with no credential is skipped; its previously fetched items are
 * kept so one broken token never empties the whole feed.
 */

import { readFile, writeFile } from "node:fs/promises";

const OUT = "data/feeds.json";
const PER_PLATFORM = 6;
const TOTAL = 12;

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    return { updatedAt: null, items: [] };
  }
}

function keepPrevious(previous, platform) {
  return (previous.items || []).filter((i) => i.platform === platform);
}

/* ---------------- YouTube (public RSS, no credentials) ---------------- */

async function fetchYouTube(channelId) {
  if (!channelId) return null;

  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`
  );
  if (!res.ok) throw new Error(`YouTube RSS responded ${res.status}`);
  const xml = await res.text();

  const items = [];
  for (const entry of xml.split("<entry>").slice(1)) {
    const pick = (tag) => {
      const m = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
      return m ? m[1].trim() : "";
    };
    const videoId = pick("yt:videoId");
    if (!videoId) continue;

    items.push({
      platform: "youtube",
      id: videoId,
      title: decodeEntities(pick("title")),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      date: pick("published"),
    });
    if (items.length >= PER_PLATFORM) break;
  }
  return items;
}

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

/* ---------------- Instagram (Graph API) ---------------- */

async function fetchInstagram(token) {
  if (!token) return null;

  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  const url =
    `https://graph.instagram.com/me/media?fields=${fields}` +
    `&limit=${PER_PLATFORM}&access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok) throw new Error(`Instagram API: ${body?.error?.message || res.status}`);

  return (body.data || []).map((m) => ({
    platform: "instagram",
    id: m.id,
    title: (m.caption || "").slice(0, 240),
    url: m.permalink,
    thumbnail: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url,
    date: m.timestamp,
  }));
}

/* ---------------- Threads (Threads API) ---------------- */

async function fetchThreads(token) {
  if (!token) return null;

  const fields =
    "id,media_type,media_url,permalink,text,timestamp,thumbnail_url,is_quote_post";
  const url =
    `https://graph.threads.net/v1.0/me/threads?fields=${fields}` +
    `&limit=${PER_PLATFORM}&access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok) throw new Error(`Threads API: ${body?.error?.message || res.status}`);

  return (body.data || []).map((m) => ({
    platform: "threads",
    id: m.id,
    title: (m.text || "").slice(0, 240),
    url: m.permalink,
    thumbnail: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url || null,
    date: m.timestamp,
  }));
}

/* ---------------- main ---------------- */

const previous = await readExisting();
const collected = [];
let failures = 0;

const sources = [
  ["youtube", () => fetchYouTube(process.env.YOUTUBE_CHANNEL_ID)],
  ["instagram", () => fetchInstagram(process.env.INSTAGRAM_TOKEN)],
  ["threads", () => fetchThreads(process.env.THREADS_TOKEN)],
];

for (const [platform, run] of sources) {
  try {
    const items = await run();
    if (items === null) {
      console.log(`- ${platform}: no credential configured, skipping`);
      collected.push(...keepPrevious(previous, platform));
    } else {
      console.log(`✓ ${platform}: ${items.length} items`);
      collected.push(...items);
    }
  } catch (err) {
    failures++;
    console.error(`✗ ${platform}: ${err.message} — keeping previously fetched items`);
    collected.push(...keepPrevious(previous, platform));
  }
}

const items = collected
  .filter((i) => i.url)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, TOTAL);

await writeFile(
  OUT,
  JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2) + "\n"
);

console.log(`\nWrote ${items.length} items to ${OUT}`);
if (failures) process.exitCode = 1;
