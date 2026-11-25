import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(appRoot, "out");
const indexPath = path.join(outputRoot, "index.html");

assert.ok(existsSync(indexPath), "Missing out/index.html. Run the production build first.");

const html = readFileSync(indexPath, "utf8");
const site = JSON.parse(readFileSync(path.join(appRoot, "src/content/site.json"), "utf8"));
const pageIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const references = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((match) => match[1]);

function outputPathFor(reference) {
  const pathname = reference.split(/[?#]/, 1)[0];
  if (pathname === "/") return path.join(outputRoot, "index.html");
  if (pathname.endsWith("/")) return path.join(outputRoot, pathname, "index.html");
  return path.join(outputRoot, pathname);
}

for (const reference of references) {
  if (reference.startsWith("#")) {
    assert.ok(pageIds.has(reference.slice(1)), `Broken same-page link: ${reference}`);
    continue;
  }

  if (!reference.startsWith("/") || reference.startsWith("//")) continue;
  assert.ok(existsSync(outputPathFor(reference)), `Missing exported target: ${reference}`);
}

for (const required of ["404.html", "robots.txt", "sitemap.xml", "og-image.png", "favicon.svg"]) {
  assert.ok(existsSync(path.join(outputRoot, required)), `Missing exported file: ${required}`);
}

assert.match(html, /<link rel="canonical" href="https:\/\/wequer\.cn\/"/);
assert.ok(html.includes(`property="og:title" content="${site.meta.title}"`));
assert.match(html, /name="twitter:card" content="summary"/);

for (const component of ["t-button", "t-link"]) {
  assert.ok(html.includes(component), `Missing official TDesign component: ${component}`);
}
assert.equal(
  existsSync(path.join(outputRoot, "api")),
  false,
  "Personal site must not export an API surface",
);
for (const section of ["contact", "work", "links"]) {
  assert.ok(pageIds.has(section), `Missing homepage section: ${section}`);
}
for (const { href } of site.socialLinks) {
  assert.ok(references.includes(href), `Missing public account: ${href}`);
}
assert.doesNotMatch(html, /href="tel:|现在在天津|真正做出来的东西/);
for (const line of [site.profile.headline, ...site.profile.paragraphs]) {
  assert.ok(html.includes(line), "Missing homepage copy");
}
assert.match(html, /复制微信号/);
assert.match(html, /复制 QQ 号/);
assert.ok(html.includes(site.contact.qq));
assert.ok(html.includes(site.footer.icp.href));

const manifest = JSON.parse(readFileSync(path.join(outputRoot, "manifest.webmanifest"), "utf8"));
for (const { src } of manifest.icons) {
  assert.ok(existsSync(outputPathFor(src)), `Missing manifest icon: ${src}`);
}
assert.match(readFileSync(path.join(outputRoot, "404.html"), "utf8"), /页面不存在/);

const robots = readFileSync(path.join(outputRoot, "robots.txt"), "utf8");
const sitemap = readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");
assert.match(robots, /Sitemap: https:\/\/wequer\.cn\/sitemap\.xml/);
assert.match(sitemap, /<loc>https:\/\/wequer\.cn\/<\/loc>/);

console.log(`Static export verified: ${references.length} references, ${pageIds.size} anchors.`);
