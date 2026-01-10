import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from '../icons/Logo.jsx';
import { useAuth } from '../../context/AuthContext';
import { signOutUser } from '../../../firebase/Auth.js';
import UserShowcase from './UserShowcase.jsx';

export default function Navbar() {
  const isHome = useLocation().pathname === '/';
  const { useLoggedIn, userProfile, currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={`navbar ${isHome ? 'navbar--transparent' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="brevity home">
          <Logo src="/lottie/ai-loading.lottie" size={26} />
          <span className="brand-name">Brevity</span>
        </Link>

        {/* Centered links */}
        <nav className="nav-center" aria-label="Primary">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Pricing</NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Services</NavLink>
          <NavLink to="/help" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Help</NavLink>
        </nav>

        {/* Auth actions on the right */}
        <nav className="nav-auth">
        {
          useLoggedIn ? (
            <div className="user-profile-section">
              <UserShowcase />
              <button 
                className="btn ghost logout-btn" 
                onClick={() => {
                  signOutUser();
                  navigate('/');
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link className="btn ghost" to="/login">Log in</Link>
              <Link className="btn primary" to="/signup">Sign up</Link>
            </>
          )
        }
        </nav>
      </div>
    </header>
  );
}