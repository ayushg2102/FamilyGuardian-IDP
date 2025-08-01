import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, logout as logoutService, LoginCredentials, AuthResponse } from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('accessToken');
  });
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse user data', e);
        handleLogout();
      }
    }
  }, []);

  const handleLoginSuccess = useCallback((data: AuthResponse) => {
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
    navigate('/dashboard'); // Redirect to dashboard after successful login
  }, [navigate]);

  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: handleLoginSuccess,
  });

  const handleLogout = useCallback(async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear all queries from cache
      await queryClient.clear();
      
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      // Redirect to login
      navigate('/login');
    }
  }, [navigate, queryClient]);

  return {
    isAuthenticated,
    user,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    logout: handleLogout,
  };
};
