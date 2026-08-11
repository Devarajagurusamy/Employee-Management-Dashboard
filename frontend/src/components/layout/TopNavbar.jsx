import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

function TopNavbar({ activeTab = 'Dashboard', onTabChange }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={styles.navbar}>
      {/* Brand Logo */}
      <div style={styles.brand}>
        <div style={styles.logoBadge}>
          <div style={styles.logoIcon}></div>
          <span style={styles.logoText}>EMD</span>
        </div>
      </div>

      {/* Navigation Tabs (Matching reference image pills) */}
      <div style={styles.tabsContainer}>
        <button
          onClick={() => onTabChange && onTabChange('Dashboard')}
          style={{
            ...styles.tabBtn,
            ...(activeTab === 'Dashboard' ? styles.tabBtnActive : {}),
          }}
          type="button"
        >
          <span style={styles.tabIcon}>📊</span> Dashboard
        </button>
        <button
          onClick={() => onTabChange && onTabChange('Employees')}
          style={{
            ...styles.tabBtn,
            ...(activeTab === 'Employees' ? styles.tabBtnActive : {}),
          }}
          type="button"
        >
          <span style={styles.tabIcon}>👥</span> Employees
        </button>
        <button
          onClick={() => onTabChange && onTabChange('Analytics')}
          style={{
            ...styles.tabBtn,
            ...(activeTab === 'Analytics' ? styles.tabBtnActive : {}),
          }}
          type="button"
        >
          <span style={styles.tabIcon}>📈</span> Analytics
        </button>
      </div>

      {/* Right Controls */}
      <div style={styles.rightGroup}>
        {/* Theme Switcher Toggle Button */}
        <button
          onClick={toggleTheme}
          style={styles.themeToggleBtn}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          type="button"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* User Profile Info & Logout */}
        <div style={styles.userProfile}>
          <div style={styles.avatar}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div style={styles.userDetails}>
            <span style={styles.userName}>{user?.name || 'Admin User'}</span>
            <span style={styles.userRole}>Administrator</span>
          </div>
          <button onClick={logout} style={styles.logoutBtn} title="Logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.85rem 1.25rem',
    backgroundColor: 'var(--bg-card-muted)',
    borderRadius: '16px',
    border: '1px solid var(--border-soft)',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
    boxShadow: 'var(--card-shadow)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  logoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-shell)',
    padding: '0.4rem 0.85rem',
    borderRadius: '20px',
    border: '1px solid var(--border-color)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  },
  logoIcon: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #155EEF 50%, #0284C7 50%)',
  },
  logoText: {
    fontWeight: '800',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    letterSpacing: '0.5px',
  },
  tabsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: 'var(--bg-shell)',
    padding: '0.3rem 0.4rem',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
  },
  tabBtn: {
    padding: '0.45rem 1rem',
    borderRadius: '18px',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    transition: 'all 0.2s',
  },
  tabBtnActive: {
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(21, 94, 239, 0.3)',
  },
  tabIcon: {
    fontSize: '0.9rem',
  },
  rightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  themeToggleBtn: {
    padding: '0.45rem 0.85rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-shell)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'var(--bg-shell)',
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    border: '1px solid var(--border-color)',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--primary)',
    fontWeight: '700',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
  },
  userRole: {
    fontSize: '0.725rem',
    color: 'var(--text-muted)',
  },
  logoutBtn: {
    padding: '0.35rem 0.65rem',
    backgroundColor: 'transparent',
    color: 'var(--accent-red)',
    border: '1px solid var(--accent-red)',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginLeft: '0.25rem',
  },
};

export default TopNavbar;
