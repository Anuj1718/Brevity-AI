import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { signUpWithEmailAndPassword, signInWithGoogle } from '../../../firebase/Auth';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const { useLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const rules = useMemo(() => {
    const length = password.length >= 8;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[^A-Za-z0-9]/.test(password);
    const noSpace = !/\s/.test(password);
    return { length, upper, lower, number, special, noSpace };
  }, [password]);

  const allGood = Object.values(rules).every(Boolean);
  const match = password && confirm && password === confirm;

  // Redirect if already logged in
  useEffect(() => {
    if (useLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [useLoggedIn, navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    setError('');
    setSuccessMsg('');

    if (!name) return setError('Please enter your name.');
    if (!email) return setError('Please enter your email.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter a valid email address.');
    if (!allGood) return setError('Please meet all password requirements.');
    if (!match) return setError('Passwords do not match.');

    try {
      setIsSignUp(true);
      await signUpWithEmailAndPassword(email, password, name);
      setSuccessMsg('Account created! You can now log in.');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    }
  };

  const handleGoogle = async() => {
    try {
      setIsSignUp(true);
      await signInWithGoogle();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsSignUp(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-orb auth-orb--violet" />
      <div className="auth-orb auth-orb--cyan" />

      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Join and start summarizing smarter.</p>

        {successMsg ? <div className="success">{successMsg}</div> : null}
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
            <label className="auth-label" htmlFor="name">Full Name</label>
            <input
              id="name"
              className="auth-input"
              placeholder="John Doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

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
                autoComplete="new-password"
                required
              />
              <span className="eye" onClick={() => setShowPw(v => !v)}>{showPw ? 'Hide' : 'Show'}</span>
            </div>

            <div className="rules">
              <div className={`rule ${rules.length ? 'ok' : ''}`}><span className="dot" /> 8+ characters</div>
              <div className={`rule ${rules.upper ? 'ok' : ''}`}><span className="dot" /> At least one uppercase letter</div>
              <div className={`rule ${rules.lower ? 'ok' : ''}`}><span className="dot" /> At least one lowercase letter</div>
              <div className={`rule ${rules.number ? 'ok' : ''}`}><span className="dot" /> At least one number</div>
              <div className={`rule ${rules.special ? 'ok' : ''}`}><span className="dot" /> At least one special character</div>
              <div className={`rule ${rules.noSpace ? 'ok' : ''}`}><span className="dot" /> No spaces</div>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="confirm">Confirm password</label>
            <div className="auth-input-wrap">
              <input
                id="confirm"
                className="auth-input"
                placeholder="••••••••"
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                required
              />
              <span className="eye" onClick={() => setShowConfirm(v => !v)}>{showConfirm ? 'Hide' : 'Show'}</span>
            </div>
            {!match && confirm ? <div className="error">Passwords do not match.</div> : null}
          </div>

          <button className="btn btn-gradient" type="submit" style={{ width: '100%', marginTop: 6 }}>
            Create account
          </button>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
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