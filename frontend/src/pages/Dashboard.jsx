import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Employee Management Dashboard</h2>
          <p style={styles.subtitle}>
            Phase 2 — Protected Route Verified & Authenticated
          </p>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginTop: 0 }}>User Session Info</h3>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>User ID:</strong> {user?.id}
        </p>
        <div style={styles.badge}>
          ✓ Authenticated & Protected Route Active
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #333',
  },
  title: {
    margin: 0,
    fontSize: '1.75rem',
    color: '#fff',
  },
  subtitle: {
    margin: '0.25rem 0 0 0',
    fontSize: '0.9rem',
    color: '#51cf66',
  },
  logoutBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid #333',
  },
  badge: {
    marginTop: '1.5rem',
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(81, 207, 102, 0.15)',
    color: '#51cf66',
    border: '1px solid #51cf66',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.875rem',
  },
};

export default Dashboard;
