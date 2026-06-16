// Build-time GitHub star baker.
//
// Runs as part of `npm run build` (see package.json). It reads every repo
// referenced in src/data/publications.js, fetches its current star count from
// the GitHub API, and writes the result to src/data/stars.json — which the app
// imports and renders directly. This means visitors never call the GitHub API:
// the counts are baked into the static bundle at deploy time.
//
// In CI, set GITHUB_TOKEN (the default Actions token works) to use the
// authenticated 5,000-req/hour limit. Locally it still runs unauthenticated.
// Any failure is non-fatal: the previous stars.json is kept so a transient
// network/rate-limit error never wipes good data or breaks the build.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PUBLICATIONS } from '../src/data/publications.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'stars.json');

const repos = [...new Set(PUBLICATIONS.filter((p) => p.github?.repo).map((p) => p.github.repo))];

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'star-baker' };
if (token) headers.Authorization = `Bearer ${token}`;

// Start from the existing file so a partial failure never drops known counts.
let stars = {};
if (existsSync(OUT)) {
  try { stars = JSON.parse(readFileSync(OUT, 'utf8')); } catch { stars = {}; }
}

let ok = 0;
let skipped = 0;
for (const repo of repos) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
    if (!res.ok) { skipped++; console.warn(`  skip ${repo}: HTTP ${res.status}`); continue; }
    const data = await res.json();
    if (typeof data.stargazers_count === 'number') { stars[repo] = data.stargazers_count; ok++; }
  } catch (err) {
    skipped++;
    console.warn(`  skip ${repo}: ${err.message}`);
  }
}

// Keep only repos that still exist in the publication list, sorted for stable diffs.
const pruned = Object.fromEntries(repos.filter((r) => r in stars).sort().map((r) => [r, stars[r]]));
writeFileSync(OUT, JSON.stringify(pruned, null, 2) + '\n');
console.log(`stars baked: ${ok} fetched, ${skipped} skipped, ${Object.keys(pruned).length} total → src/data/stars.json`);
