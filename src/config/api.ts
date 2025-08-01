const API_BASE_URL = 'http://172.172.233.44:9000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login/`,
    LOGOUT: `${API_BASE_URL}/auth/logout/`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot_password/`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password/`,
  },
};
