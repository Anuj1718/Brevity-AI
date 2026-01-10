import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

import Home from './components/Home/Home.jsx';
import Upload from './components/Upload/Upload.jsx';
import Login from './components/Auth/login.jsx';
import Signup from './components/Auth/Signup.jsx';
import RequireAuth from './components/Auth/RequireAuth.jsx';

// NEW
import Pricing from './components/Marketing/Pricing.jsx';
import Services from './components/Marketing/Services.jsx';
import Help from './components/Marketing/Help.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={
          <RequireAuth><Upload /></RequireAuth>
          } />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}