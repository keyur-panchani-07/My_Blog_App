import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  const saveAuthData = (authToken, authUser) => {
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(authUser));
  };

  const clearAuthData = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        const { token: t, user: u } = res.data.data;
        saveAuthData(t, u);
        toast.success('Logged in successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message =
        error.response?.data?.message || 'Failed to login. Please check your credentials.';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data?.success) {
        const { token: t, user: u } = res.data.data;
        saveAuthData(t, u);
        toast.success('Account created successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Register error:', error);
      const message =
        error.response?.data?.message || 'Failed to register. Please try again.';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  useEffect(() => {
    // Token validation / refresh point, if needed
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

