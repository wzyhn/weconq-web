#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const commit = (process.argv[2] || "").trim().toLowerCase();
if (!/^[0-9a-f]{40}$/.test(commit)) {
  throw new Error("write-release-manifest requires a full 40-character Git commit SHA");
}

const contentFile = path.join(appRoot, "src", "content", "site.json");
const outputDir = path.join(appRoot, "out");
if (!fs.existsSync(path.join(outputDir, "index.html"))) {
  throw new Error("static export is missing out/index.html; run the build first");
}
const content = fs.readFileSync(contentFile);
const manifest = {
  schemaVersion: 1,
  commit,
  contentSha256: crypto.createHash("sha256").update(content).digest("hex"),
};
fs.writeFileSync(
  path.join(outputDir, ".weconq-release.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  { encoding: "utf8", mode: 0o644 },
);
console.log(`release manifest written for ${commit.slice(0, 12)}`);
