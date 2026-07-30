/**
 * Extend the Instagram and Threads long-lived tokens by another 60 days.
 *
 * Meta long-lived tokens expire 60 days after they are issued, but calling the
 * refresh endpoint resets that clock. Running this weekly keeps them alive
 * indefinitely without any manual work.
 *
 * The refreshed token is written to $RUNNER_TEMP so the workflow can push it
 * back into GitHub Secrets — it is never printed or committed.
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const TMP = process.env.RUNNER_TEMP || "/tmp";

const targets = [
  {
    name: "INSTAGRAM_TOKEN",
    token: process.env.INSTAGRAM_TOKEN,
    endpoint: (t) =>
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(t)}`,
  },
  {
    name: "THREADS_TOKEN",
    token: process.env.THREADS_TOKEN,
    endpoint: (t) =>
      `https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${encodeURIComponent(t)}`,
  },
];

let failures = 0;

for (const { name, token, endpoint } of targets) {
  if (!token) {
    console.log(`- ${name}: not configured, skipping`);
    continue;
  }

  try {
    const res = await fetch(endpoint(token));
    const body = await res.json();
    if (!res.ok || !body.access_token) {
      throw new Error(body?.error?.message || `HTTP ${res.status}`);
    }

    await writeFile(join(TMP, `${name}.txt`), body.access_token, { mode: 0o600 });

    const days = body.expires_in ? Math.round(body.expires_in / 86400) : "?";
    console.log(`✓ ${name}: refreshed, valid for ~${days} more days`);
  } catch (err) {
    failures++;
    console.error(`✗ ${name}: ${err.message}`);
  }
}

if (failures) process.exitCode = 1;
