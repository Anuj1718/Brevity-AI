import React from 'react';
import './Services.css';

const services = [
  {
    id: 'content',
    title: 'Content Generation',
    desc: 'Create high‑quality content for blogs, social media, and marketing with AI‑powered writing.',
    bullets: ['Blog posts & articles', 'Social media content', 'Marketing copy', 'Email templates'],
    accent: 'acc-blue',
    Icon: PencilIcon,
  },
  {
    id: 'knowledge',
    title: 'Knowledge Management',
    desc: 'Organize, search, and extract insights from documents and knowledge bases.',
    bullets: ['Document analysis', 'Smart search', 'Insight extraction', 'Knowledge graphs'],
    accent: 'acc-violet',
    Icon: DBIcon,
  },
  {
    id: 'audio',
    title: 'Audio Processing',
    desc: 'Transcribe, summarize, and enhance audio with AI tools.',
    bullets: ['Audio transcription', 'Voice enhancement', 'Audio summarization', 'Speech analysis'],
    accent: 'acc-green',
    Icon: MicIcon,
  },
];

export default function Services() {
  return (
    <section className="services">
      <div className="services-bg" aria-hidden="true" />
      <div className="container">
        <header className="services-head">
          <h1 className="services-title">Services</h1>
          <p className="services-sub">Three focused capabilities to bring your documents and media to life.</p>
        </header>

        <div className="svc-grid">
          {services.map(({ id, title, desc, bullets, Icon, accent }) => (
            <article key={id} className="svc-card">
              <div className={`svc-icon ${accent}`}><Icon /></div>
              <h3 className="svc-title">{title}</h3>
              <p className="svc-desc">{desc}</p>
              <ul className="svc-list">
                {bullets.map((b) => (
                  <li key={b} className="svc-item">• {b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* inline icons */
function PencilIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 3l6 6L8 22l-6 1 1-6L15 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 6l6 6" stroke="currentColor" strokeWidth="1.5"/></svg>;}
function DBIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.5"/></svg>;}
function MicIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="8" y="3" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M5 12a7 7 0 0 0 14 0M12 19v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;}