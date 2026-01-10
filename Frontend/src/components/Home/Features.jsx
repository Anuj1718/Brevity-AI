import React from 'react';
import './Home.css';

const features = [
  { title: 'OCR for scanned PDFs', text: 'Extract text from images and scans with high accuracy.', accent: 'accent-violet', Icon: ScanIcon },
  { title: 'Citations & page refs', text: 'Summaries include page numbers for quick verification.', accent: 'accent-orange', Icon: CiteIcon },
  { title: 'Multi-language', text: 'Summarize and output in 25+ languages.', accent: 'accent-green', Icon: GlobeIcon },
  { title: 'Ask questions', text: 'Chat with your document and get quoted answers.', accent: 'accent-cyan', Icon: ChatIcon },
  { title: 'Bulk upload', text: 'Queue multiple PDFs and process them together.', accent: 'accent-pink', Icon: StackIcon },
  { title: 'Export & share', text: 'Download summaries as TXT/MD or copy to clipboard.', accent: 'accent-blue', Icon: ExportIcon },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Power features, simple UX</h2>
        <p className="section-subtitle">Everything you need to go from long PDF to clear insight—fast.</p>
        <div className="feature-grid">
          {features.map(({ title, text, accent, Icon }) => (
            <div key={title} className="feature-card">
              <div className={`feature-icon ${accent}`}><Icon /></div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* small inline icons */
function ScanIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M14 18h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;}
function CiteIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 6h9M8 10h9M8 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="5" cy="6" r="1" fill="currentColor"/><circle cx="5" cy="10" r="1" fill="currentColor"/><circle cx="5" cy="14" r="1" fill="currentColor"/></svg>;}
function GlobeIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M3 12h18M12 3c-3 3.5-3 14.5 0 18 3-3.5 3-14.5 0-18z" stroke="currentColor" strokeWidth="1.5"/></svg>;}
function ChatIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 17l-3 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;}
function StackIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.5"/><path d="M21 13l-9 5-9-5" stroke="currentColor" strokeWidth="1.5"/></svg>;}
function ExportIcon(){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="4" y="14" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>;}