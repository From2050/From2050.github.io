/**
 * Append an item to data/links.json from a GitHub issue-form submission.
 *
 * Run by .github/workflows/add-content.yml. The issue body arrives as
 * ISSUE_BODY; GitHub renders issue forms as `### Label` headings followed by
 * the value, with untouched optional fields rendered as `_No response_`.
 *
 * Ordering: Instagram posts and articles are prepended (newest first, matching
 * how the page reads); projects are appended, because the existing list is
 * hand-ordered by significance and a new entry should not jump to the front.
 */

import { readFile, writeFile } from "node:fs/promises";
import { appendFileSync } from "node:fs";

const LINKS = "data/links.json";

/* ---------------- issue-form parsing ---------------- */

function parseIssueForm(body) {
  const fields = {};
  const parts = String(body).replace(/\r\n/g, "\n").split(/^### /m);

  for (const part of parts) {
    const nl = part.indexOf("\n");
    if (nl === -1) continue;
    const key = part.slice(0, nl).trim();
    if (!key) continue;
    const value = part.slice(nl + 1).trim();
    fields[key] = value === "_No response_" ? "" : value;
  }
  return fields;
}

/* ---------------- validation ---------------- */

function requireHttpUrl(raw, label) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`${label}不是有效的網址:${raw}`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`${label}必須是 http(s) 網址,收到 ${url.protocol}`);
  }
  return url;
}

function requireInstagramUrl(raw) {
  const url = requireHttpUrl(raw, "Instagram 連結");
  if (!/(^|\.)instagram\.com$/i.test(url.hostname)) {
    throw new Error(`Instagram 貼文的網址必須在 instagram.com,收到 ${url.hostname}`);
  }
  // Drop tracking params so the same post is not stored twice under two URLs.
  return `${url.origin}${url.pathname}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

/* ---------------- main ---------------- */

const fields = parseIssueForm(process.env.ISSUE_BODY || "");

const kind = fields["內容類型"];
const rawUrl = fields["連結"];
const title = fields["標題"];
const description = fields["描述"];
const tags = (fields["標籤"] || "")
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);
const source = fields["出處"];
const date = fields["日期"] || today();

if (!kind) throw new Error("找不到「內容類型」欄位,issue 可能不是用範本開的。");
if (!rawUrl) throw new Error("找不到「連結」欄位。");

const links = JSON.parse(await readFile(LINKS, "utf8"));
let summary;

if (kind === "Instagram 貼文") {
  const url = requireInstagramUrl(rawUrl);
  links.instagramEmbeds = links.instagramEmbeds || [];

  if (links.instagramEmbeds.includes(url)) {
    throw new Error(`這則貼文已經在首頁上了:${url}`);
  }
  links.instagramEmbeds.unshift(url);
  summary = `已加入 Instagram 貼文:${url}`;
} else if (kind === "文章") {
  const url = requireHttpUrl(rawUrl, "文章連結").href;
  if (!title) throw new Error("「文章」需要填標題。");

  links.articles = links.articles || [];
  links.articles.unshift({ title, date, url, source: source || "" });
  summary = `已加入文章:${title}`;
} else if (kind === "作品") {
  const url = requireHttpUrl(rawUrl, "作品連結").href;
  if (!title) throw new Error("「作品」需要填標題。");

  links.projects = links.projects || [];
  links.projects.push({ title, description: description || "", tags, url });
  summary = `已加入作品:${title}`;
} else {
  throw new Error(`不認得的內容類型:${kind}`);
}

await writeFile(LINKS, JSON.stringify(links, null, 2) + "\n");

console.log(summary);
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `summary=${summary}\n`);
}
