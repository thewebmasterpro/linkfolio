import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import AdminDashboard from './pages/AdminDashboard';
import PublicProfile from './pages/PublicProfile';
import AuthGuard from './components/AuthGuard';
import AdminGuard from './components/AdminGuard';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
        <Route path="/:username" element={<PublicProfile />} />
      </Routes>
    </Router>
  );
}

export default App;