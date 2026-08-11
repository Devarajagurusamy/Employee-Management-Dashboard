import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Login() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated and done initializing, redirect to dashboard
  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setApiError(result.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Theme Toggle Pill */}
      <div style={styles.themePosition}>
        <button onClick={toggleTheme} style={styles.themeToggleBtn} type="button">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.brandHeader}>
          <div style={styles.logoBadge}>
            <div style={styles.logoIcon}></div>
            <span style={styles.logoText}>EMD</span>
          </div>
        </div>

        <h2 style={styles.title}>Employee Management Login</h2>
        <p style={styles.subtitle}>Enter your admin credentials to access the dashboard</p>

        {apiError && <div style={styles.alertError}>{apiError}</div>}

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. admin@example.com"
              style={{
                ...styles.input,
                borderColor: errors.email ? 'var(--accent-red)' : 'var(--border-color)',
              }}
              disabled={isSubmitting}
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={{
                ...styles.input,
                borderColor: errors.password ? 'var(--accent-red)' : 'var(--border-color)',
              }}
              disabled={isSubmitting}
            />
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '700', color: 'var(--text-primary)' }}>
            Demo Test Credentials:
          </p>
          <code style={styles.code}>admin@example.com / password123</code>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '85vh',
    position: 'relative',
    width: '100%',
  },
  themePosition: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  themeToggleBtn: {
    padding: '0.45rem 0.85rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '2.5rem',
    borderRadius: '24px',
    backgroundColor: 'var(--bg-card)',
    boxShadow: 'var(--card-shadow)',
    textAlign: 'left',
    border: '1px solid var(--border-color)',
  },
  brandHeader: {
    marginBottom: '1.5rem',
  },
  logoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-input)',
    padding: '0.4rem 0.85rem',
    borderRadius: '20px',
    border: '1px solid var(--border-color)',
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
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.6rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  subtitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  alertError: {
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--accent-red)',
    borderRadius: '10px',
    color: 'var(--accent-red)',
    fontSize: '0.875rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
  },
  errorText: {
    color: 'var(--accent-red)',
    fontSize: '0.8rem',
  },
  button: {
    padding: '0.85rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(21, 94, 239, 0.3)',
    cursor: 'pointer',
  },
  demoCredentials: {
    marginTop: '1.75rem',
    padding: '0.85rem',
    backgroundColor: 'var(--bg-card-muted)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    fontSize: '0.825rem',
    color: 'var(--text-secondary)',
  },
  code: {
    color: 'var(--accent-green)',
    fontFamily: 'monospace',
    fontWeight: '700',
  },
};

export default Login;
