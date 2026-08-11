import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
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
      <div style={styles.card}>
        <h2 style={styles.title}>Employee Management Login</h2>
        <p style={styles.subtitle}>Enter your credentials to access the dashboard</p>

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
                borderColor: errors.email ? '#ff6b6b' : '#333',
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
                borderColor: errors.password ? '#ff6b6b' : '#333',
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
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>Demo Test Credentials:</p>
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
    minHeight: '75vh',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '2.5rem',
    borderRadius: '12px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    textAlign: 'left',
    border: '1px solid #333',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '0.9rem',
    color: '#888',
  },
  alertError: {
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    border: '1px solid #ff6b6b',
    borderRadius: '6px',
    color: '#ff6b6b',
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
    fontWeight: '500',
    color: '#ccc',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: '0.8rem',
  },
  button: {
    padding: '0.85rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4c6ef5',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  demoCredentials: {
    marginTop: '1.5rem',
    padding: '0.75rem',
    backgroundColor: '#25262b',
    borderRadius: '6px',
    border: '1px solid #373a40',
    fontSize: '0.825rem',
    color: '#aaa',
  },
  code: {
    color: '#51cf66',
    fontFamily: 'monospace',
  },
};

export default Login;
