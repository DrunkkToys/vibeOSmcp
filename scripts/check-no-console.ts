import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SKIP_DIRS = new Set([
  "node_modules", "dist", "data", ".git",
  "scripts", "security", "tests",
]);
const SKIP_FILES = new Set<string>([]);

function* walk(dir: string, rel = ""): Generator<string> {
  try {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      const r = rel ? rel + "/" + e : e;
      if (SKIP_DIRS.has(e) || e.startsWith(".")) continue;
      if (statSync(p).isDirectory()) yield* walk(p, r);
      else if (/\.(js|mjs|ts|tsx)$/.test(e) && !SKIP_FILES.has(r)) yield r;
    }
  } catch { /* skip inaccessible */ }
}

let failed = 0;

for (const file of walk(process.cwd())) {
  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("//") || line.startsWith("*")) continue;
    if (/console\.(log|error|warn|info|debug|trace|dir|table|group|groupEnd|time|timeEnd|assert|count)\s*\(/.test(line)) {
      if (file.includes(".test.")) continue;
      console.error(`ERROR: console.* in ${file}:${i + 1}: ${line.slice(0, 120)}`);
      failed++;
    }
  }
}

if (failed > 0) {
  console.error(`\n\u2717 Found ${failed} console.* call(s). Use a proper logger instead.`);
  process.exit(1);
}

console.log("\u2713 No console.* calls in production code.");
