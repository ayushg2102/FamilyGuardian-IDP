// Use environment-based API URL
// Priority: Custom override > Environment-specific > Default
const getApiBaseUrl = () => {
  // Allow override via environment variable
  if (import.meta.env.VITE_OVERRIDE_API_URL) {
    return import.meta.env.VITE_OVERRIDE_API_URL;
  }
  
  // Production environment (Vercel deployment)
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_BASE_URL_PROD || '/api';
  }
  
  // Development environment
  return import.meta.env.VITE_API_BASE_URL || 'http://172.172.233.44:9000/api';
};

const API_BASE_URL = getApiBaseUrl();

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login/`,
    LOGOUT: `${API_BASE_URL}/auth/logout/`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot_password/`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password/`,
  },
  USERS: {
    GET_USER_BY_ID: `${API_BASE_URL}/users/`,
  },
  COUNTRY_CODES: {
    GET_ALL: `${API_BASE_URL}/country-codes/`,
  },
  PAYMENTS: {
    DASHBOARD_STATS: `${API_BASE_URL}/payment-requests/summary_counts/`,
    PAYMENT_REQUESTS: `${API_BASE_URL}/payment-requests/`,
    DASHBOARD_NOTIFICATIONS: `${API_BASE_URL}/payment-request-approvals/`
  },
};
