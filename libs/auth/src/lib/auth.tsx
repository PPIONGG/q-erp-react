import React, { useState, useContext, createContext, useCallback, useEffect } from 'react';
import { authService } from './auth.service';
import type { User } from './types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await authService.login({ username, password });
      if (response.success && response.user) {
        setUser(response.user);
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch  {
      return { success: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};