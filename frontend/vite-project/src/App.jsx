import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Network from './pages/Network';
import Profile from './pages/Profile';
import User from './pages/userProfile';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = not checked yet
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    // While checking auth status
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header setActiveTab={setActiveTab} activeTab={activeTab} setIsAuthenticated={setIsAuthenticated}  />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/network" element={isAuthenticated ? <Network /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/user/:userId" element={isAuthenticated ? <User /> : <Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLoginSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Register onSignupSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
