import React from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 499,
    popular: false,
    features: [
      'Up to 1,000 pages/month',
      'Basic summaries',
      'Limited Q&A',
      'OCR for simple scans',
      'Email support',
    ],
    cta: { text: 'Get Started', to: '/signup' },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 899,
    popular: true, // highlight card
    features: [
      'Up to 10,000 pages/month',
      'Citations & page refs',
      'Advanced Q&A mode',
      'OCR for scanned PDFs',
      'Priority support',
    ],
    cta: { text: 'Upgrade to Pro', to: '/signup' },
  },
];

const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function Pricing() {
  return (
    <section className="pricing-v2">
      <div className="pv2-bg" aria-hidden="true" />
      <div className="container">
        <header className="pv2-head">
          <h1 className="pv2-title">Choose your plan</h1>
          <p className="pv2-sub">Simple, transparent monthly pricing in INR.</p>
        </header>

        <div className="pv2-grid">
          {PLANS.map((p) => (
            <article key={p.id} className={`pv2-card ${p.popular ? 'is-popular' : ''}`}>
              {p.popular && <div className="pv2-badge">Most popular</div>}

              <div className="pv2-plan">{p.name}</div>

              <div className="pv2-priceRow">
                <div className="pv2-price">{formatINR(p.price)}</div>
                <div className="pv2-per">/ month</div>
              </div>

              <ul className="pv2-features">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>

              <Link to={p.cta.to} className={`btn ${p.popular ? 'gradient' : 'outline'} btn--lg pv2-cta`}>
                {p.cta.text}
              </Link>
            </article>
          ))}
        </div>

        <p className="pv2-fine">
          Need a custom plan or yearly billing? <Link to="/signup">Contact us</Link>.
        </p>
      </div>
    </section>
  );
}