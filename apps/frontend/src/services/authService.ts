import api from '../utils/api';
import { useAuthStore } from '../store/authStore';

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { access_token, refresh_token, user } = response.data;
      
      if (!access_token || !user) {
        throw new Error('Invalid response from server');
      }
      
      useAuthStore.getState().setAuth(user, access_token, refresh_token);
      return { user, access_token, refresh_token };
    } catch (error: any) {
      console.error('Auth service error:', error);
      
      // Handle network errors specifically
      if (error.networkError || error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        const networkError = new Error(
          'Cannot connect to the server. Please ensure the backend is running on http://localhost:3001'
        );
        (networkError as any).networkError = true;
        throw networkError;
      }
      
      throw error;
    }
  },

  logout: () => {
    useAuthStore.getState().logout();
  },

  getProfile: async () => {
    const response = await api.post('/auth/profile');
    return response.data;
  },
};

