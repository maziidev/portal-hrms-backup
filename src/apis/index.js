import axios from "axios";
import { useAuthStore } from "@/store/auth";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setUpInterceptors = (pinia, router) => {
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore(pinia);

      // Public endpoints that don't need authentication
      const publicEndpoints = [
        '/core/login/',
        '/core/register/',
        '/core/forgot-password/',
        '/core/reset-password/',
      ];

      // Check if current request is to a public endpoint
      const isPublicEndpoint = publicEndpoints.some(endpoint =>
        config.url?.includes(endpoint)
      );

      // Only add token if user is authenticated and endpoint is not public
      if (authStore.token && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Network error (no response from server)
      if (!error.response) {
        console.error('Network error:', error.message);
        return Promise.reject(error);
      }

      const { status } = error.response;
      const authStore = useAuthStore(pinia);

      // Handle authentication errors
      if (status === 401) {
        // Token expired or invalid - only logout if not on login page
        if (router.currentRoute.value.name !== 'login') {
          authStore.logout();
          router.push({
            name: 'login',
            query: { redirect: router.currentRoute.value.fullPath }
          });
        }
      } else if (status === 403) {
        // Forbidden - user doesn't have permission
        console.error('Access forbidden:', error.response.data);
        router.push({ name: 'forbidden' });
      } else if (status === 404) {
        // Not found
        console.error('Resource not found:', error.response.data);
      } else if (status === 500) {
        // Server error
        console.error('Server error:', error.response.data);
      } else if (status === 422) {
        // Validation error
        console.error('Validation error:', error.response.data);
      }

      return Promise.reject(error);
    }
  );
};

export { BaseUrl, api };