// libs/auth/src/lib/auth.service.ts
import type { User, LoginDto, LoginResponse } from './types';

class AuthService {
private apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  async login(credentials: LoginDto): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        return {
          success: false,
          message: 'Login failed',
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await fetch(`${this.apiUrl}/api/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${this.apiUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
