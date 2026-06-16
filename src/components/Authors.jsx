import { useState } from 'react';
import { EnvelopeIcon } from './icons.jsx';

// Author list with the design's truncation rule: long lists collapse to the
// first MIN_SHOWN authors — or everything up to your own name if you appear
// later — followed by a clickable "et al."; the ↑ button collapses back. Each
// corresponding author gets an envelope icon (corrIdx may be a single index or
// an array of indices for papers with multiple corresponding authors).
const MIN_SHOWN = 5;

export function Authors({ authors, selfIdx, corrIdx }) {
  const [expanded, setExpanded] = useState(false);
  const baseCount = Math.max(selfIdx + 1, MIN_SHOWN);
  // Only truncate if it would hide at least 2 authors — if a single author
  // would remain behind "et al.", just show their name instead.
  const needsTrunc = authors.length > baseCount + 1;
  const shown = !needsTrunc || expanded ? authors : authors.slice(0, baseCount);
  const corrSet = Array.isArray(corrIdx) ? corrIdx : corrIdx == null ? [] : [corrIdx];
  const isCorr = (i) => corrSet.includes(i);

  return (
    <span>
      {shown.map((a, i) => (
        <span key={i}>
          {i > 0 && ', '}
          {i === selfIdx ? (
            <strong className="self">
              {a}
              {isCorr(i) && <EnvelopeIcon />}
            </strong>
          ) : (
            <span>
              {a}
              {isCorr(i) && <EnvelopeIcon />}
            </span>
          )}
        </span>
      ))}
      {needsTrunc && !expanded && (
        <>
          ,{' '}
          <button className="etal-btn" onClick={() => setExpanded(true)}>
            et al.
          </button>
        </>
      )}
      {needsTrunc && expanded && (
        <>
          {' '}
          <button className="collapse-btn" onClick={() => setExpanded(false)} title="Collapse author list">
            ↑
          </button>
        </>
      )}
    </span>
  );
}
