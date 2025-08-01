import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  login as loginService, 
  logout as logoutService, 
  clearAuthTokens
} from '../services/authService';
import { message } from 'antd';

// User type that combines API and frontend properties
export interface User {
  // Core frontend properties
  id: number;
  email: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  isActive: boolean;
  isStaff: boolean;
  roles: string[];
  
  // Additional API properties (kept for reference)
  UserId?: number;
  UserName?: string;
  EmailAddress?: string;
  FirstName?: string | null;
  LastName?: string | null;
  Department?: string | null;
  Mobile?: string | null;
  CountryCode?: string | null;
  Gender?: string | null;
  UserStatus?: number;
  UserImage?: string | null;
  is_active?: boolean;
  is_staff?: boolean;
  CreatedOn?: string;
  UpdatedOn?: string;
}

interface LoginResponse {
  success: boolean;
  user: User | null;
  accessToken?: string;
  error?: Error;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, remember?: boolean) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  getAccessToken: () => string | null;
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
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getAccessToken = useCallback(() => {
    return token || localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  }, [token]);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password, remember = false }: { email: string; password: string; remember?: boolean }) => {
      try {
        const response = await loginService({ UserName: email, Password: password }, remember);
        return {
          success: true as const,
          user: {
            ...response.user,
            id: response.user.UserId || 0,
            email: response.user.EmailAddress || '',
            name: response.user.UserName || 'User',
            role: response.user.roles?.[0]?.toLowerCase() || 'user',
            department: response.user.Department || '',
            isActive: response.user.is_active || false,
            isStaff: response.user.is_staff || false,
            roles: response.user.roles || [],
          },
          accessToken: response.access
        };
      } catch (error) {
        return {
          success: false as const,
          error: error instanceof Error ? error : new Error('Login failed'),
          user: null
        };
      }
    },
    onSuccess: (data, variables) => {
      if (data.success && data.user) {
        const { user: apiUser, accessToken } = data;
        const userData: User = apiUser;

        setUser(userData);
        setIsAuthenticated(true);
        
        const storage = variables.remember ? localStorage : sessionStorage;
        if (accessToken) {
          storage.setItem('access_token', accessToken);
          setToken(accessToken);
        }
        storage.setItem('user', JSON.stringify(userData));
        
        queryClient.invalidateQueries({ queryKey: ['user'] });
        message.success('Login successful');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      message.error('Login failed. Please check your credentials and try again.');
    }
  });

  const login = useCallback(async (email: string, password: string, remember: boolean = false) => {
    try {
      setIsLoading(true);
      const result = await loginMutation.mutateAsync({ email, password, remember });
      if (result.success) {
        return { success: true as const, user: result.user };
      } else {
        throw result.error;
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false as const, user: null };
    } finally {
      setIsLoading(false);
    }
  }, [loginMutation]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data
      clearAuthTokens();
      
      // Clear user data from storage
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear react-query cache
      queryClient.clear();
      
      // Redirect to login
      navigate('/login');
    }
  }, [navigate, queryClient]);

  const value: AuthContextType = useMemo(() => ({
    user,
    token,
    login,
    logout: handleLogout,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending,
    error: error || (loginMutation.error as Error | null),
    getAccessToken,
  }), [
    user, 
    token, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    handleLogout, 
    loginMutation.isPending, 
    loginMutation.error, 
    getAccessToken
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
