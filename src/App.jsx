import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './components/icons.jsx';
import { ProfileColumn } from './components/ProfileColumn.jsx';
import { AboutSection } from './sections/About.jsx';
import { PublicationsSection } from './sections/Publications.jsx';
import { GroupSection } from './sections/Group.jsx';

const SECTIONS = ['about', 'publications'];

export default function App() {
  const [section, setSection] = useState(() => {
    const stored = localStorage.getItem('ac-section');
    return SECTIONS.includes(stored) ? stored : 'about';
  });
  const [dark, setDark] = useState(() => localStorage.getItem('ac-dark') === 'true');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('ac-dark', dark);
  }, [dark]);

  useEffect(() => {
    localStorage.setItem('ac-section', section);
  }, [section]);

  return (
    <>
      <nav className="topnav">
        <div className="topnav-links">
          {SECTIONS.map((s) => (
            <button
              key={s}
              className={`nav-link${section === s ? ' active' : ''}`}
              onClick={() => setSection(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="theme-toggle" onClick={() => setDark((d) => !d)} title="Toggle dark mode">
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>

      <div className="page">
        <ProfileColumn />
        <main className="content-col">
          {section === 'about' && <AboutSection />}
          {section === 'publications' && <PublicationsSection />}
          {section === 'group' && <GroupSection />}
        </main>
      </div>

      <footer className="site-footer">
        <span>
          Designed and Implemented by{' '}
          <a href="https://claude.ai/" target="_blank" rel="noreferrer">Claude</a>
        </span>
        <span className="footer-sep">·</span>
        <span>© {new Date().getFullYear()} Xinyu Wang</span>
      </footer>
    </>
  );
}
