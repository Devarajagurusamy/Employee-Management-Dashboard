import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import API from './services/api';

function HealthCheck() {
  const [status, setStatus] = useState('Checking backend connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/health')
      .then((res) => {
        if (res.data && res.data.success) {
          setStatus(res.data.message);
        } else {
          setStatus('Unexpected response structure');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to connect to backend');
      });
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'left', background: '#1e1e1e', borderRadius: '8px' }}>
      <h2>Phase 0 - Project Setup Status</h2>
      <p><strong>Frontend:</strong> React + Vite + React Router DOM + Axios</p>
      <p><strong>Backend API Health Check:</strong> {error ? <span style={{ color: '#ff6b6b' }}>Error: {error}</span> : <span style={{ color: '#51cf66' }}>{status}</span>}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Employee Management Dashboard</h1>
        <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" style={{ color: '#646cff' }}>Home (Setup Test)</Link>
          <Link to="/login" style={{ color: '#646cff' }}>Login Placeholder</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HealthCheck />} />
          <Route path="/login" element={<div><h3>Login Route Placeholder (Phase 2)</h3></div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
