import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle network errors (no response from server)
    if (!error.response) {
      let errorMessage = 'Network error';
      let networkError = true;

      // Check for specific network error types
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running on http://localhost:3001';
      } else if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
        errorMessage = 'Request timeout. The server is taking too long to respond.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      const networkErrorObj = {
        ...error,
        message: errorMessage,
        networkError: true,
        code: error.code,
      };
      return Promise.reject(networkErrorObj);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      // Don't redirect on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/';
      }
    }

    // Format error response for better handling
    const formattedError = {
      ...error,
      message: error.response?.data?.message || error.response?.data?.error || error.message || 'An error occurred',
      status: error.response?.status,
      data: error.response?.data,
      networkError: false,
    };

    return Promise.reject(formattedError);
  }
);

export default api;

