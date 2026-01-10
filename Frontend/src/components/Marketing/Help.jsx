import React, { useMemo, useState } from 'react';
import './Help.css';

const TABS = ['General', 'Billing', 'Technical', 'Account'];
const FAQS = {
  General: [
    { q: 'How do I get started?', a: 'Sign up, upload a PDF, and generate your first summary in seconds. The free plan lets you test the core features.' },
    { q: 'What file types are supported?', a: 'PDFs for now. OCR handles scanned documents; more formats are planned.' },
  ],
  Billing: [
    { q: 'Do you offer refunds?', a: 'Monthly plans can be cancelled anytime. Contact support for billing issues.' },
    { q: 'Do you support yearly billing?', a: 'Yes. Contact us for yearly invoices and team discounts.' },
  ],
  Technical: [
    { q: 'Is my data private?', a: 'Yes. Files are processed securely and never used to train models. You can request deletion anytime.' },
    { q: 'Max file size?', a: 'Up to 300MB by default. Higher limits are available on request.' },
  ],
  Account: [
    { q: 'I forgot my password.', a: 'Use the “Forgot password” link on the login page to reset it.' },
    { q: 'How do I change email?', a: 'Open Account settings and update your email address.' },
  ],
};

export default function Help() {
  const [tab, setTab] = useState('General');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ name: '', subject: '', phone: '', priority: 'Medium', message: '' });
  const [sent, setSent] = useState('');

  const items = useMemo(() => {
    const list = FAQS[tab] || [];
    if (!query.trim()) return list;
    const ql = query.toLowerCase();
    return list.filter(i => i.q.toLowerCase().includes(ql) || i.a.toLowerCase().includes(ql));
  }, [tab, query]);

  function onChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function onSubmit(e) {
    e.preventDefault();
    setSent('');
    if (!form.name || !form.subject || !form.message) return setSent('Please fill name, subject and message.');
    console.log('Help request:', form); // TODO: wire to backend/email
    setSent('Thanks! Your request has been submitted.');
    setForm({ name: '', subject: '', phone: '', priority: 'Medium', message: '' });
  }

  return (
    <section className="help">
      <div className="help-bg" aria-hidden="true" />
      <div className="container">
        <header className="help-head">
          <h1 className="help-title">Customer Help Center</h1>
          <p className="help-sub">Need a hand? Browse FAQs or contact us—we’re here to help.</p>
        </header>

        <div className="help-grid">
          {/* LEFT: three stacked cards (equal-height system) */}
          <div className="left-col">
            {/* 1) FAQ */}
            <div className="card faq-col">
              <div className="faq-search">
                <input
                  className="input"
                  placeholder="Search FAQs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="tabs">
                {TABS.map(t => (
                  <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
                ))}
              </div>
              <div className="qa-list">
                {items.map((it, idx) => (
                  <details key={idx} className="qa">
                    <summary className="qa-q">{it.q}</summary>
                    <div className="qa-a">{it.a}</div>
                  </details>
                ))}
              </div>
            </div>

            {/* 2) Support hours */}
            <div className="card support-card">
              <div className="support-title">Support Hours</div>
              <div className="support-rows">
                <div>Mon–Fri: 9:00 AM – 6:00 PM IST</div>
                <div>Sat: 10:00 AM – 4:00 PM • Sun: Closed</div>
              </div>
            </div>

            {/* 3) Contact email */}
            <div className="card support-card">
              <div className="support-title">Contact Email</div>
              <div><a href="mailto:support@brevity.app">support@brevity.app</a></div>
            </div>
          </div>

          {/* RIGHT: form (stretches to full column height) */}
          <div className="card form-col">
            <form className="help-form" onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <div className="field span-2">
                  <label className="label" htmlFor="name">Full Name</label>
                  <input id="name" name="name" className="input" placeholder="Enter your full name" value={form.name} onChange={onChange}/>
                </div>

                <div className="field">
                  <label className="label" htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" className="input" placeholder="Brief description of your inquiry" value={form.subject} onChange={onChange}/>
                </div>

                <div className="field">
                  <label className="label" htmlFor="phone">Contact Number</label>
                  <input id="phone" name="phone" className="input" placeholder="Enter your contact number" value={form.phone} onChange={onChange}/>
                </div>

                <div className="field">
                  <label className="label" htmlFor="priority">Priority</label>
                  <select id="priority" name="priority" className="input" value={form.priority} onChange={onChange}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div className="field span-2">
                  <label className="label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" className="input textarea" rows={6} placeholder="Describe your issue or question..." value={form.message} onChange={onChange}/>
                </div>
              </div>

              {sent && <div className={`note ${sent.startsWith('Thanks') ? 'ok' : 'err'}`}>{sent}</div>}

              <button className="btn gradient btn--lg" type="submit">Request Help</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}