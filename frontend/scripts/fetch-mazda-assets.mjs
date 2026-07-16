// Downloads mazdausa.com assets listed in mazda-asset-manifest.json into frontend/public/.
// Usage: node scripts/fetch-mazda-assets.mjs   (run from frontend/, or via `npm run fetch:assets`)
// Extensionless URLs get an extension appended from the response Content-Type;
// the final url -> local path mapping is written to mazda-asset-resolved.json.
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "..", "public");
const manifest = JSON.parse(await readFile(join(here, "mazda-asset-manifest.json"), "utf8"));

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Referer: "https://www.mazdausa.com/",
  Accept: "*/*",
};

const EXT_BY_TYPE = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "video/mp4": ".mp4",
  "font/woff2": ".woff2",
  "font/woff": ".woff",
  "application/font-woff": ".woff",
  "application/pdf": ".pdf",
};

const exists = (p) => access(p).then(() => true, () => false);

async function fetchOne({ url, dest }) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = (res.headers.get("content-type") || "").split(";")[0].trim();
      let finalDest = dest;
      if (!extname(dest) && EXT_BY_TYPE[type]) finalDest = dest + EXT_BY_TYPE[type];
      const abs = join(publicDir, finalDest);
      if (await exists(abs)) return { url, dest: finalDest, skipped: true };
      const buf = Buffer.from(await res.arrayBuffer());
      await mkdir(dirname(abs), { recursive: true });
      await writeFile(abs, buf);
      return { url, dest: finalDest, bytes: buf.length };
    } catch (err) {
      if (attempt === 3) return { url, dest, error: String(err) };
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}

const results = [];
const queue = [...manifest];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) results.push(await fetchOne(queue.shift()));
});
await Promise.all(workers);

const ok = results.filter((r) => !r.error);
const failed = results.filter((r) => r.error);
const totalMB = (ok.reduce((s, r) => s + (r.bytes || 0), 0) / 1048576).toFixed(1);
await writeFile(
  join(here, "mazda-asset-resolved.json"),
  JSON.stringify(Object.fromEntries(ok.map((r) => [r.url, "/" + r.dest])), null, 1)
);
console.log(`done: ${ok.length} ok (${totalMB} MB new), ${failed.length} failed`);
for (const f of failed) console.log("FAILED:", f.url, f.error);
process.exitCode = failed.length ? 1 : 0;
