const API_BASE_URL = 'http://172.172.233.44:9000/api';

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
  PAYMENTS: {
    DASHBOARD_STATS: `${API_BASE_URL}/payment-requests/summary_counts/`,
    PAYMENT_REQUESTS: `${API_BASE_URL}/payment-requests/`,
    DASHBOARD_NOTIFICATIONS: `${API_BASE_URL}/payment-request-approvals/`
  },
};
