import { FUNDINGS, TEACHING } from '../data/about.js';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { TextLink } from '../components/TextLink.jsx';

// News section temporarily disabled — see commented block below.

export function AboutSection() {
  return (
    <div>
      <SectionTitle className="fade-up d1">About Me</SectionTitle>

      <p className="about-body fade-up d2">
        I am a Lecturer at the School of Computer Science and Information Technology,{' '}
        <TextLink href="https://adelaide.edu.au/">Adelaide University</TextLink>. I received
        my PhD from the University of Adelaide, advised by{' '}
        <TextLink href="https://cshen.github.io/">Prof. Chunhua Shen</TextLink>, and
        subsequently worked as a Research Fellow at{' '}
        <TextLink href="https://adelaide.edu.au/research/australian-institute-for-machine-learning/">AIML</TextLink>,
        collaborating with <TextLink href="https://v3alab.github.io/">A/Prof. Qi Wu</TextLink>.
        My work has been recognized with the{' '}
        <TextLink href="https://aclanthology.org/2024.acl-long.831/">Best Paper Award</TextLink>{' '}
        at ACL 2024 and the{' '}
        <TextLink href="https://conf.researchr.org/details/icse-2026/icse-2026-research-track/178/ProxyWar-Dynamic-Assessment-of-LLM-Code-Generation-in-Game-Arenas">ACM SIGSOFT Distinguished Paper Award</TextLink>{' '}
        at ICSE 2026.
      </p>
      <p className="about-body fade-up d2">
        My research spans multimodal machine learning, with a recent focus on building
        reliable Large Multimodal Models (LMMs) under low-resource scenarios. I am also
        interested in AI for knowledge discovery, exploring interdisciplinary applications
        across document analysis, paleography, game theory, and computational social science.
      </p>

      {/* News (temporarily disabled) */}
      {/* <div className="fade-up d3" style={{ marginTop: 44 }}>
        <SectionTitle>News</SectionTitle>
        {visibleNews.map((item) => (
          <div key={item.date} className="news-row">
            <span className="news-date">{item.date}</span>
            <span className="news-text">
              <NewsText {...item} />
            </span>
          </div>
        ))}
        {hiddenNewsCount > 0 && (
          <button
            className="pub-more-btn"
            aria-expanded={newsExpanded}
            onClick={() => setNewsExpanded((expanded) => !expanded)}
          >
            {newsExpanded ? '− Show less' : `+ Show ${hiddenNewsCount} more`}
          </button>
        )}
      </div> */}

      {/* Fundings */}
      <div className="fade-up d4" style={{ marginTop: 44 }}>
        <SectionTitle>Fundings</SectionTitle>
        {FUNDINGS.map((f) => (
          <div key={f.title} className="funding-row">
            <div className="funding-head">
              <span className="funding-title">{f.title}</span>
              <span className="funding-amount">{f.amount}</span>
            </div>
            <div className="funding-meta">
              <span>{f.agency}</span>
              <span className="funding-sep">·</span>
              <span className="funding-period">{f.period}</span>
              <span className="role-chip">{f.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Teaching */}
      <div className="fade-up d5" style={{ marginTop: 44 }}>
        <SectionTitle>Teaching</SectionTitle>
        {TEACHING.map((t) => (
          <div key={`${t.year}-${t.sem}-${t.code}`} className="teaching-row">
            <span className="teaching-when">
              <span className="teaching-year">{t.year}</span>
              <span className="teaching-term">{t.sem}</span>
            </span>
            <span className="teaching-main">
              <span className="teaching-code">{t.code}</span>
              <span className="teaching-titleline">
                <span className="teaching-name">{t.name}</span>
                <span className="teaching-levels">
                  {t.level.split('/').map((lv) => (
                    <span key={lv} className={`level-chip ${lv === 'PG' ? 'pg' : 'ug'}`}>{lv}</span>
                  ))}
                </span>
              </span>
            </span>
            <span className="teaching-school">{t.school}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
