import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const res = await API.get('/auth/me');
          if (res.data && res.data.success) {
            setUser(res.data.data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem('authToken');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error('Failed to restore auth session:', error);
          localStorage.removeItem('authToken');
          setUser(null);
          setToken(null);
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data && res.data.success) {
        const { token: newToken, user: userData } = res.data.data;
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData);
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message || 'Login failed' };
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
