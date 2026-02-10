import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BaseUrl,
});
export const setUpInterceptors = (pinia, router) => {
  api.interceptors.request.use(
    (config) => {
      const { token } = useAuthStore(pinia);
      // console.log(useAuthStore(pinia)?.token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error.response) {
        // Network error
        return Promise.reject(error);
      }
      const { status } = error.response;
      const authStore = useAuthStore(pinia);
      // if (status === 401) {
      //   router.push({ name: "login" });
      //   authStore.logout();
      // }

      // if (status === 403) {
      //   router.push({ name: "login" });
      //   authStore.logout();
      // }

      return Promise.reject(error);
    },
  );
};

export { BaseUrl, api };
