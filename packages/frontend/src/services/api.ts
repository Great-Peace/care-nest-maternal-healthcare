import axios from 'axios';

// Backend API URL from environment variable
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if not already on a public page
      if (!['/register', '/login', '/'].includes(window.location.pathname)) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
