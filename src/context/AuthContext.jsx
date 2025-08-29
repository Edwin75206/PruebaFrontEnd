import React, { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (authToken) => {
    try {
      const profile = await apiService.get('/auth/profile', authToken);
      setUser(profile);
    } catch (error) {
      console.error('Failed to fetch profile', error);
      setToken(null);
      localStorage.removeItem('authToken');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const currentToken = localStorage.getItem('authToken');
    if (currentToken) {
      setToken(currentToken);
      fetchProfile(currentToken);
    }
    setLoading(false);
  }, [fetchProfile]);

  const login = async (email, password) => {
    const { access_token } = await apiService.post('/auth/login', { email, password });
    localStorage.setItem('authToken', access_token);
    setToken(access_token);
    await fetchProfile(access_token);
  };

  const register = async (name, email, password) => {
    const avatar = `https://i.pravatar.cc/150?u=${email}`;
    await apiService.post('/users/', { name, email, password, avatar });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated: !!token, login, logout, register, loading }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
