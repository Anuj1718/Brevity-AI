import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';  // add this

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-border" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">🧠</div>
          <div>
            <div className="brand-name">Brevity</div>
            <div className="made">Built with ❤️ for faster reading</div>
          </div>
        </div>

        <div className="footer-links">
          <div className="col">
            <div className="col-title">Product</div>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Log in</Link>
          </div>
          <div className="col">
            <div className="col-title">Company</div>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>
          <div className="col">
            <div className="col-title">Resources</div>
            <a href="#">Help Center</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
      <div className="foot-note">© {new Date().getFullYear()} SummarizePDF. All rights reserved.</div>
    </footer>
  );
}