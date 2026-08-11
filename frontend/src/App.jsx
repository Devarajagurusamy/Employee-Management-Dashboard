import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AOS from 'aos';

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-600 dark:text-slate-300">
        <h3 className="text-lg font-bold">Loading application...</h3>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
        }
      />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <AuthProvider>
      <div className="w-full min-h-screen">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
