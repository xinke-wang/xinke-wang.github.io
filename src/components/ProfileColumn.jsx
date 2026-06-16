import { PROFILE } from '../data/profile.js';
import { ICONS } from './icons.jsx';

export function ProfileColumn() {
  return (
    <div className="profile-col fade-up d1">
      <div className="profile-card">
        <div className="profile-name">{PROFILE.name}</div>
        <div className="profile-email">{PROFILE.email}</div>

        <div className="profile-socials">
          {PROFILE.socials.map(({ icon, href, title }) => (
            <a key={icon} className="icon-link" href={href} title={title}>
              {ICONS[icon]}
            </a>
          ))}
        </div>
      </div>

      <div className="profile-affil">
        {PROFILE.affiliation.map((line, i) => (
          <span key={line}>
            {i === 0 ? line : <span className="muted">{line}</span>}
            {i < PROFILE.affiliation.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
