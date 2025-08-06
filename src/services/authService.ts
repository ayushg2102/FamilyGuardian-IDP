import axios from 'axios';
import { ENDPOINTS } from '../config/api';

// Add axios instance with default config
const api = axios.create({
  baseURL: 'http://172.172.233.44:9000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface LoginCredentials {
  UserName: string;
  Password: string;
}

export interface User {
  UserId: number;
  UserName: string;
  EmailAddress: string;
  FirstName: string | null;
  LastName: string | null;
  Department: string | null;
  Mobile: string | null;
  CountryCode: string | null;
  Gender: string | null;
  UserStatus: number;
  UserImage: string | null;
  is_active: boolean;
  is_staff: boolean;
  CreatedOn: string;
  UpdatedOn: string;
  roles: string[];
}

export interface AuthResponse {
  code: number;
  message: string;
  data: {
    access: string;
    refresh: string;
    user: User;
  };
  errors: any | null;
}

export interface ErrorResponse {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Secure storage for tokens (in-memory)
let authToken: string | null = null;
let refreshToken: string | null = null;

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return authToken || localStorage.getItem('accessToken');
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return refreshToken || localStorage.getItem('refreshToken');
};

export const setAuthTokens = (access: string, refresh: string, remember: boolean = false): void => {
  authToken = access;
  refreshToken = refresh;
  
  if (remember) {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  } else {
    sessionStorage.setItem('accessToken', access);
    sessionStorage.setItem('refreshToken', refresh);
  }
};

export const clearAuthTokens = (): void => {
  authToken = null;
  refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

// Check if API response indicates token is invalid and handle logout
export const handleTokenValidationError = (error: any): boolean => {
  // Check if the error response matches the token expiration format
  if (error?.response?.data) {
    const errorData = error.response.data;
    
    // Check for the specific token expiration response format
    if (errorData.detail === "Given token not valid for any token type" && 
        errorData.code === "token_not_valid") {
      
      console.log('Token expired, logging out user');
      
      // Clear all authentication data
      clearAuthTokens();
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      return true; // Indicates that logout was triggered
    }
  }
  
  // Also check for direct error object format (for fetch-based requests)
  if (error?.detail === "Given token not valid for any token type" && 
      error?.code === "token_not_valid") {
    
    console.log('Token expired, logging out user');
    
    // Clear all authentication data
    clearAuthTokens();
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    
    return true; // Indicates that logout was triggered
  }
  
  return false; // No logout was triggered
};

export const login = async (credentials: LoginCredentials, remember: boolean = false): Promise<AuthResponse['data']> => {
  try {
    const response = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data.code === 200 && response.data.data) {
      const { access, refresh, user } = response.data.data;
      setAuthTokens(access, refresh, remember);
      return { access, refresh, user };
    }
    throw new Error(response.data.message || 'Login failed');
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw new Error(errorData.message || 'Login failed');
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const refreshToken = getRefreshToken();
  
  try {
    if (refreshToken) {
      await api.post(ENDPOINTS.AUTH.LOGOUT, { refresh: refreshToken });
    }
  } catch (error: unknown) {
    console.error('Logout error:', error);
  } finally {
    // Clear tokens from storage regardless of API call success/failure
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ErrorResponse;
    }
    throw { message: 'An unexpected error occurred' } as ErrorResponse;
  }
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
  const accessToken = getAuthToken();
  
  if (!accessToken) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await api.post<{ message: string }>(
      ENDPOINTS.AUTH.CHANGE_PASSWORD,
      { current_password: currentPassword, new_password: newPassword },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ErrorResponse;
    }
    throw { message: 'An unexpected error occurred' } as ErrorResponse;
  }
};
