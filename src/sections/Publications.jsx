import { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { Badge } from '../components/Badge.jsx';
import { Authors } from '../components/Authors.jsx';
import { GithubIcon, DemoIcon } from '../components/icons.jsx';
import { PUBLICATIONS, TOP_VENUES } from '../data/publications.js';
import STARS from '../data/stars.json';

function isTopVenue(venue) {
  return TOP_VENUES.some((v) => venue.toUpperCase().includes(v.toUpperCase()));
}

// Shown by default in its year (and rendered in accent blue) when its venue is
// a top venue OR the entry is explicitly featured.
function isTop(pub) {
  return pub.featured || isTopVenue(pub.venue);
}

function formatStars(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
  return String(n);
}

// Star counts are baked into src/data/stars.json at build time (see
// scripts/fetch-stars.mjs), so the page never calls the GitHub API at runtime
// — no per-visitor rate limit, always renders. The count refreshes on each
// deploy (and via the daily scheduled rebuild in .github/workflows/deploy.yml).
function GhChip({ repo }) {
  const stars = typeof STARS[repo] === 'number' ? STARS[repo] : null;
  return (
    <a className="gh-chip" href={`https://github.com/${repo}`} target="_blank" rel="noreferrer">
      <GithubIcon />
      <span className="gh-name">GitHub</span>
      {stars != null && <span className="gh-stars">{formatStars(stars)} ★</span>}
    </a>
  );
}

function DemoChip({ href }) {
  return (
    <a className="gh-chip demo-chip" href={href} target="_blank" rel="noreferrer">
      <DemoIcon />
      <span>Demo</span>
    </a>
  );
}

function PubRow({ pub }) {
  return (
    <div className="pub-row">
      <div className="pub-title-line">
        <span className="pub-title">{pub.title}</span>
        {pub.badge && <Badge type={pub.badge} />}
      </div>

      <div className="pub-authors">
        <Authors authors={pub.authors} selfIdx={pub.selfIdx} corrIdx={pub.corrIdx} />
      </div>

      <div className={`pub-venue${isTop(pub) ? ' top' : ''}`}>{pub.venue}</div>

      <div className="pub-links">
        {pub.links.map(({ l, h }) => (
          <a key={l} className="chip-link" href={h}>
            {l}
          </a>
        ))}
        {pub.github && <GhChip repo={pub.github.repo} />}
        {pub.demo && <DemoChip href={pub.demo} />}
      </div>
    </div>
  );
}

// Papers from this year onward get their own year header (top venues shown,
// the rest behind a per-year toggle). Everything older is merged into a single
// fully-collapsed "Before <CUTOFF>" group.
const CUTOFF = 2020;

function YearGroup({ year, pubs }) {
  const [expanded, setExpanded] = useState(false);
  const top = pubs.filter(isTop);
  const more = pubs.filter((p) => !isTop(p));
  return (
    <div className="pub-year-group">
      <div className="pub-year-label">{year}</div>
      {top.map((p) => (
        <PubRow key={p.title} pub={p} />
      ))}
      {expanded && more.map((p) => <PubRow key={p.title} pub={p} />)}
      {more.length > 0 && (
        <button className="pub-more-btn" onClick={() => setExpanded((e) => !e)}>
          {expanded ? '− Show less' : `+ Show ${more.length} more`}
        </button>
      )}
    </div>
  );
}

function CollapsedGroup({ label, pubs }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="pub-year-group">
      <div className="pub-year-label">{label}</div>
      {expanded && pubs.map((p) => <PubRow key={p.title} pub={p} />)}
      <button className="pub-more-btn" onClick={() => setExpanded((e) => !e)}>
        {expanded ? '− Show less' : `+ Show ${pubs.length} more`}
      </button>
    </div>
  );
}

export function PublicationsSection() {
  const recent = PUBLICATIONS.filter((p) => p.year >= CUTOFF);
  const older = PUBLICATIONS.filter((p) => p.year < CUTOFF);
  const years = [...new Set(recent.map((p) => p.year))].sort((a, b) => b - a);
  return (
    <div className="fade-up">
      <SectionTitle>Publications</SectionTitle>
      {years.map((y) => (
        <YearGroup key={y} year={y} pubs={recent.filter((p) => p.year === y)} />
      ))}
      {older.length > 0 && <CollapsedGroup label={`Before ${CUTOFF}`} pubs={older} />}
    </div>
  );
}
