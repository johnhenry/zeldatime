#!/usr/bin/env node
// Weekly link-rot check for every hotlinked image/keyArt URL in games.ts.
// Run via: node --experimental-strip-types scripts/check-image-health.mjs
import { games } from "../src/data/games.ts";

const MIN_BYTES = 2000; // catches a 200-status placeholder/error thumbnail, not just hard failures
const CONCURRENCY = 6;
const LOG_FILE = process.env.IMG_HEALTH_LOG ?? `${process.env.HOME}/logs/zeldatime-image-health.log`;

const urlToGames = new Map();
for (const g of games) {
  for (const url of [g.image, g.keyArt]) {
    if (!url) continue;
    if (!urlToGames.has(url)) urlToGames.set(url, []);
    urlToGames.get(url).push(g.title);
  }
}

async function checkUrl(url) {
  try {
    // No Referer header is sent by Node's fetch by default, matching the
    // site's own referrer:no-referrer policy — some hosts (Fandom's CDN)
    // silently degrade responses when a Referer is present.
    const res = await fetch(url, { redirect: "follow" });
    const buf = new Uint8Array(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") ?? "";
    if (!res.ok) {
      return { url, ok: false, reason: `HTTP ${res.status}` };
    }
    if (!contentType.startsWith("image/")) {
      return { url, ok: false, reason: `unexpected content-type "${contentType}"` };
    }
    if (buf.byteLength < MIN_BYTES) {
      return { url, ok: false, reason: `suspiciously small body (${buf.byteLength} bytes)` };
    }
    return { url, ok: true };
  } catch (err) {
    return { url, ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

async function runPool(urls, limit) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const idx = i++;
      results[idx] = await checkUrl(urls[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, urls.length) }, worker));
  return results;
}

const urls = [...urlToGames.keys()];
const results = await runPool(urls, CONCURRENCY);
const failures = results.filter((r) => !r.ok);

const timestamp = new Date().toISOString();
const lines = [
  `[${timestamp}] checked ${urls.length} image URLs, ${failures.length} failure(s)`,
  ...failures.map((f) => `  FAIL ${f.url} — ${f.reason} — used by: ${urlToGames.get(f.url).join(", ")}`),
];
const report = lines.join("\n");

console.log(report);

const fs = await import("node:fs/promises");
const path = await import("node:path");
await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
await fs.appendFile(LOG_FILE, report + "\n");

process.exit(failures.length > 0 ? 1 : 0);
