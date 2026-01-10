import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';
import { signInWithEmail, signInWithGoogle } from '../../../firebase/Auth';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { currentUser, useLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState(location.state?.msg || '');

  // Redirect if already logged in
  useEffect(() => {
    if (useLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [useLoggedIn, navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    setError('');
    setInfo('');

    if (!email || !password) {
      return setError('Please enter your email and password.');
    }

    try {
      setIsSignIn(true);
      await signInWithEmail(email, password);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No account found. Please sign up.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsSignIn(false);
    }
  };

  const handleGoogle = async() => {
    try {
      setIsSignIn(true);
      await signInWithGoogle();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsSignIn(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-orb auth-orb--violet" />
      <div className="auth-orb auth-orb--cyan" />

      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to continue summarizing.</p>

        {info ? <div className="success">{info}</div> : null}
        {error ? <div className="error">{error}</div> : null}

        <div className="row" style={{ marginBottom: 10 }}>
          <button className="btn btn-google" onClick={handleGoogle} style={{ width: '100%' }}>
            <GoogleIcon /> Continue with Google
          </button>
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12, margin: '8px 0 4px' }}>
          — or —
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="auth-input"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            <div className="auth-input-wrap">
              <input
                id="password"
                className="auth-input"
                placeholder="••••••••"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <span className="eye" onClick={() => setShowPw(v => !v)}>{showPw ? 'Hide' : 'Show'}</span>
            </div>
          </div>

          <div className="row">
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#cbd5e1' }}>
              <input type="checkbox" style={{ accentColor: '#8b5cf6' }} /> Remember me
            </label>
            <a href="#" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Forgot password?</a>
          </div>

          <button className="btn btn-gradient" type="submit" style={{ width: '100%', marginTop: 10 }}>
            Log in
          </button>

          <div className="auth-footer">
            New here? <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" style={{ marginRight: 6 }}>
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.676 32.66 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.758 6.053 29.652 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.651-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.815C14.379 16.108 18.798 12 24 12c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.758 6.053 29.652 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.2 35.091 26.714 36 24 36c-5.202 0-9.611-3.109-11.116-7.479l-6.56 5.051C9.653 39.609 16.315 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303C34.873 31.258 29.222 36 24 36c-5.202 0-9.611-3.109-11.116-7.479l-6.56 5.051C9.653 39.609 16.315 44 24 44c11.046 0 20-8.954 20-20 0-1.341-.138-2.651-.389-3.917z"/>
    </svg>
  );
}