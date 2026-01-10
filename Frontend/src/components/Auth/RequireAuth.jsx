import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ClipLoader } from "react-spinners";

export default function RequireAuth({ children }) {
  const { useLoggedIn, loading } = useAuth();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);

  // When user is not logged in (after loading), show spinner briefly before redirect
  useEffect(() => {
    if (!loading && !useLoggedIn) {
      setRedirecting(true);
      const timer = setTimeout(() => setRedirecting(false), 1000); // 1 second delay
      return () => clearTimeout(timer);
    }
  }, [loading, useLoggedIn]);

  // Show loader when authentication is checking
  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <ClipLoader color="#3b82f6" size={45} />
    </div>
  );

  // Show spinner for a sec before redirecting to login
  if (redirecting) return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'radial-gradient(circle at 30% 50%, rgba(128, 90, 213, 0.1), transparent), radial-gradient(circle at 70% 80%, rgba(56, 189, 248, 0.1), transparent)',
      backdropFilter: 'blur(12px)',
      color: '#E0E7FF',
    }}>
      <ClipLoader color="#8b5cf6" size={50} />
      <p style={{ marginTop: '1rem', color: '#E0E7FF' }}>Redirecting to login...</p>
    </div>
  );

  // Finally, redirect to login when spinner stops
  if (!useLoggedIn && !loading && !redirecting) {
    return <Navigate to="/login" replace state={{ from: location.pathname || '/upload' }} />;
  }

  return children;
}