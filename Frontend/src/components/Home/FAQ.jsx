import React from 'react';
import './FAQ.css';

const ITEMS = [
  {
    q: 'Is my data private?',
    a: 'Yes. Documents are processed securely and never used to train models. You can add a Privacy page later with retention/deletion details.',
  },
  {
    q: 'What file sizes are supported?',
    a: 'Large PDFs are supported. For the MVP, aim for up to 150–300 MB depending on your backend and plan.',
  },
  {
    q: 'Can I ask questions about the PDF?',
    a: 'Yes. A Q&A mode can answer with quoted snippets and page references.',
  },
  {
    q: 'Do you support other languages?',
    a: 'Absolutely. Summaries can be generated in Multi-languages.',
  },
];

export default function FAQ({ defaultOpen = -1 }) {
  return (
    <section className="faq-block">
      <div className="container">
        <h2 className="faq-title">FAQs</h2>

        <div className="faq-list" role="list">
          {ITEMS.map((it, idx) => (
            <details
              key={it.q}
              className="faq-row"
              role="listitem"
              {...(defaultOpen === idx ? { open: true } : {})}
            >
              <summary className="faq-q">
                <span className="q">{it.q}</span>
                {/* Icon is CSS-drawn; keep empty */}
                <span className="icon" aria-hidden="true" />
              </summary>
              <div className="faq-a">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}