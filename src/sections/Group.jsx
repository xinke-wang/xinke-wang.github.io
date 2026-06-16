import { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { StudentSilhouette } from '../components/icons.jsx';
import { PROFILE } from '../data/profile.js';
import { CURRENT_STUDENTS, ALUMNI, PROSPECTIVE } from '../data/group.js';

function StudentCard({ person }) {
  return (
    <div className="student-card">
      <div className="student-avatar">
        {person.photo
          ? <img src={person.photo} alt={person.name} />
          : <StudentSilhouette size={22} />}
      </div>
      <div className="student-body">
        <div className="student-head">
          <span className="student-name">{person.name}</span>
          <span className="student-role">{person.role}</span>
        </div>
        {person.topic && <div className="student-topic">{person.topic}</div>}
        {person.links?.length > 0 && (
          <div className="student-links">
            {person.links.map(({ l, h }) => (
              <a key={l} className="chip-link" href={h}>
                {l}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AlumniRow({ person }) {
  const [open, setOpen] = useState(false);
  const hasAchievements = person.achievements && person.achievements.length > 0;

  return (
    <div className="alumni-row">
      <div className="alumni-head">
        <div className="alumni-info">
          <div className="alumni-name-line">
            <span className="alumni-name">{person.name}</span>
            <span className="alumni-role">{person.role}</span>
          </div>
          {person.topic && <div className="alumni-topic">{person.topic}</div>}
          {person.now && (
            <div className="alumni-now">
              Now: <span>{person.now}</span>
            </div>
          )}
        </div>

        {hasAchievements && (
          <button className="ach-btn" onClick={() => setOpen((o) => !o)}>
            {open ? '▲' : '▼'} {open ? 'Hide' : 'Achievements'}
          </button>
        )}
      </div>

      {hasAchievements && open && (
        <div className="ach-drawer">
          {person.achievements.map((a) => (
            <div key={a} className="ach-item">
              <span className="star">✦</span>
              {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function GroupSection() {
  return (
    <div className="fade-up">
      <SectionTitle>Current Students</SectionTitle>
      <div style={{ marginBottom: 52 }}>
        {CURRENT_STUDENTS.map((s) => (
          <StudentCard key={s.name} person={s} />
        ))}
      </div>

      <SectionTitle>Alumni</SectionTitle>
      <div style={{ marginBottom: 52 }}>
        {[...ALUMNI].sort((a, b) => b.year - a.year).map((a) => (
          <AlumniRow key={a.name} person={a} />
        ))}
      </div>

      <SectionTitle>Prospective Students</SectionTitle>
      {PROSPECTIVE.atCapacityNotice && (
        <div className="capacity-note">
          <span className="capacity-status">Currently at capacity</span>
          <span className="capacity-text">{PROSPECTIVE.atCapacityNotice}</span>
        </div>
      )}
      <div className="prospective-intro">{PROSPECTIVE.intro}</div>

      <div style={{ marginBottom: 36 }}>
        <div className="group-sub-label">General Requirements</div>
        <div className="req-list">
          {PROSPECTIVE.requirements.map((item) => (
            <div key={item} className="req-item">
              <span className="dash">—</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 36 }}>
        <div className="group-sub-label">PhD Scholarships</div>
        <div className="prospective-intro" style={{ marginBottom: 14 }}>
          {PROSPECTIVE.scholarship.body}
        </div>
        <div className="req-list">
          {PROSPECTIVE.scholarship.items.map((item) => (
            <div key={item} className="req-item">
              <span className="dash">—</span>
              {item}
            </div>
          ))}
        </div>
        <div className="scholarship-link">
          <a href={PROSPECTIVE.scholarship.link} target="_blank" rel="noreferrer">
            More details ↗
          </a>
        </div>
      </div>

      <div className="adelaide-card">
        <div className="adelaide-head">
          <span className="adelaide-emoji">🎓</span>
          <div className="adelaide-label">{PROSPECTIVE.adelaide.label}</div>
        </div>
        <div className="adelaide-body">{PROSPECTIVE.adelaide.body}</div>
        <div>
          {PROSPECTIVE.adelaide.requirements.map((item) => (
            <div key={item} className="adelaide-item">
              <span className="star">✦</span>
              {item}
            </div>
          ))}
        </div>
        <div className="adelaide-body" style={{ marginTop: 16 }}>
          If you are interested, please send me{' '}
          <a href={`mailto:${PROFILE.email}`}>an email</a> including:
        </div>
        <div>
          {PROSPECTIVE.adelaide.emailItems.map((item) => (
            <div key={item} className="adelaide-item">
              <span className="star">✦</span>
              {item}
            </div>
          ))}
        </div>
        <div className="adelaide-note">{PROSPECTIVE.adelaide.note}</div>
      </div>
    </div>
  );
}
