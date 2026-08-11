import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogIn, AlertCircle } from 'lucide-react';

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
    <div className="min-h-[85vh] flex justify-center items-center relative w-full p-4">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#3e3e42] bg-white dark:bg-[#2d2d30] text-slate-800 dark:text-slate-100 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#3e3e42] transition-colors shadow-sm"
          type="button"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light</span>
            </>
          )}
        </button>
      </div>

      <div
        data-aos="fade-up"
        className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#252526] border border-slate-200 dark:border-[#3e3e42] shadow-sm text-left"
      >
        <div className="mb-6">
          <div className="inline-flex items-center gap-2.5 bg-slate-100 dark:bg-[#2d2d30] px-4 py-2 rounded-full border border-slate-200 dark:border-[#3e3e42]">
            <div className="w-5 h-5 rounded-full bg-[#007acc] flex items-center justify-center text-white text-xs font-black">
              E
            </div>
            <span className="font-extrabold text-base tracking-wide text-slate-900 dark:text-white">
              EMD
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          Employee Management Login
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Enter your admin credentials to access the dashboard
        </p>

        {apiError && (
          <div className="flex items-center gap-2 p-3.5 mb-5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. admin@example.com"
              className={`p-3 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
              }`}
              disabled={isSubmitting}
            />
            {errors.email && <span className="text-xs text-rose-500">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`p-3 rounded-xl border bg-slate-100 dark:bg-[#1e1e1e] text-slate-900 dark:text-white text-sm outline-none transition-colors ${
                errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-[#3e3e42] focus:border-[#007acc]'
              }`}
              disabled={isSubmitting}
            />
            {errors.password && <span className="text-xs text-rose-500">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 p-3 mt-2 rounded-xl bg-[#007acc] hover:bg-[#005fb8] text-white font-bold text-base transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <LogIn className="w-5 h-5" />
            <span>{isSubmitting ? 'Logging in...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        <div className="mt-7 p-3.5 bg-slate-100 dark:bg-[#2d2d30] rounded-xl border border-slate-200 dark:border-[#3e3e42] text-xs text-slate-500 dark:text-slate-400">
          <p className="font-bold text-slate-900 dark:text-white mb-1">
            Demo Test Credentials:
          </p>
          <code className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            admin@example.com / password123
          </code>
        </div>
      </div>
    </div>
  );
}

export default Login;
