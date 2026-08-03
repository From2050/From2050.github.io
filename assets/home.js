/* chiehnengwu.dev — the only client-side work the homepage still does.
   Profile, socials, projects, Instagram embeds and articles are rendered at
   build time by 11ty. What is left is the auto-refreshed social feed
   (data/feeds.json, updated by a scheduled workflow) and Instagram's own
   embed widget, which can only run in the browser. */

(function () {
  "use strict";

  var ICONS = {
    youtube: '<path d="M23 12s0-3.6-.46-5.33a2.78 2.78 0 0 0-1.94-1.94C18.88 4.25 12 4.25 12 4.25s-6.88 0-8.6.48A2.78 2.78 0 0 0 1.46 6.67C1 8.4 1 12 1 12s0 3.6.46 5.33a2.78 2.78 0 0 0 1.94 1.94c1.72.48 8.6.48 8.6.48s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94C23 15.6 23 12 23 12z" fill="currentColor"/><path d="m10 15.5 5-3.5-5-3.5z" fill="var(--bg)"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>',
    threads: '<path d="M16.3 11.4c-.1-.05-.2-.1-.3-.14-.17-3.16-1.9-4.97-4.8-4.99h-.04c-1.74 0-3.18.74-4.07 2.09l1.6 1.1c.66-1 1.7-1.22 2.47-1.22h.03c.96.01 1.68.29 2.15.83.34.4.57.94.68 1.62a12.4 12.4 0 0 0-2.76-.13c-2.78.16-4.57 1.78-4.45 4.03.06 1.14.63 2.12 1.6 2.76.83.54 1.89.8 3 .75 1.46-.08 2.6-.64 3.4-1.66.6-.77.98-1.77 1.15-3.03.7.42 1.21.98 1.5 1.65.48 1.14.51 3.01-1.01 4.53-1.34 1.33-2.94 1.91-5.36 1.93-2.68-.02-4.7-.88-6.02-2.55C4.83 15.9 4.19 13.87 4.17 12c.02-1.87.66-3.9 1.9-5.47C7.39 4.86 9.42 4 12.1 3.98c2.7.02 4.76.89 6.13 2.57.67.83 1.18 1.87 1.51 3.08l1.9-.5c-.4-1.5-1.04-2.79-1.9-3.85C18.01 3.13 15.4 2 12.1 2h-.02C8.8 2.01 6.2 3.14 4.5 5.3 3 7.22 2.2 9.9 2.18 11.99v.02c.02 2.1.82 4.77 2.32 6.69C6.2 20.86 8.8 21.99 12.08 22h.02c2.92-.02 4.98-.78 6.68-2.47 2.22-2.22 2.16-5 1.43-6.71-.53-1.23-1.53-2.23-2.9-2.9zm-4.5 5.02c-1.23.07-2.5-.48-2.57-1.63-.05-.85.6-1.8 2.64-1.92.23-.01.46-.02.68-.02.74 0 1.44.07 2.07.21-.24 2.94-1.61 3.3-2.82 3.36z" fill="currentColor"/>'
  };

  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function formatDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var days = Math.floor((Date.now() - d) / 86400000);
    if (days < 1) return "今天";
    if (days < 7) return days + " 天前";
    return d.toLocaleDateString("zh-TW", { year: "numeric", month: "numeric", day: "numeric" });
  }

  /* ---------- Instagram's embed widget ----------
     Only loaded when the page actually has embeds, so a site with none stays
     free of third-party scripts. */

  if (document.querySelector("blockquote.instagram-media")) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
  }

  /* ---------- auto-refreshed feed ---------- */

  var grid = document.getElementById("feed-grid");
  if (!grid) return;

  fetch("/data/feeds.json", { cache: "no-cache" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; })
    .then(function (feed) {
      var items = (feed && feed.items) || [];
      grid.innerHTML = "";

      if (!items.length) {
        grid.appendChild(el("p", "feed-empty",
          "社群自動同步尚未設定 — 設定好 API token 後,這裡會自動顯示最新貼文。"));
        return;
      }

      if (feed.updatedAt) {
        document.getElementById("feed-updated").textContent = "更新於 " + formatDate(feed.updatedAt);
      }

      items.forEach(function (item) {
        var card = el("a", "feed-card");
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener";

        if (item.thumbnail) {
          var img = el("img", "feed-thumb");
          img.src = item.thumbnail;
          img.alt = "";
          img.loading = "lazy";
          img.addEventListener("error", function () {
            var fb = el("div", "feed-thumb-fallback");
            fb.innerHTML = icon(item.platform);
            img.replaceWith(fb);
          });
          card.appendChild(img);
        } else {
          var fb = el("div", "feed-thumb-fallback");
          fb.innerHTML = icon(item.platform);
          card.appendChild(fb);
        }

        var body = el("div", "feed-body");
        var meta = el("div", "feed-meta");
        var badge = el("span", "platform-badge");
        badge.innerHTML = icon(item.platform) + "<span>" + (item.platform || "") + "</span>";
        meta.appendChild(badge);
        if (item.date) meta.appendChild(el("span", "feed-date", formatDate(item.date)));
        body.appendChild(meta);
        body.appendChild(el("p", "feed-text", item.title || item.text || ""));
        card.appendChild(body);

        grid.appendChild(card);
      });
    });
})();
