import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 6000,
});

// Attach JWT token from localStorage to all outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('docutrust_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Global response error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login on 401 if it's a real API endpoint failure with an explicit token rejection
    if (error.response?.status === 401) {
      const token = localStorage.getItem('docutrust_token');
      if (token && !token.startsWith('jwt_session_') && !token.startsWith('jwt_fallback_') && !token.startsWith('jwt_face_')) {
        localStorage.removeItem('docutrust_token');
        localStorage.removeItem('docutrust_user');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
