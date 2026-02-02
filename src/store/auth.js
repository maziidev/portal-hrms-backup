import { defineStore } from "pinia";
import router from "../router";
import { getSession, deleteSession,loginStaff } from "../apis/auth";
// import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const message = useMessage();

export const useAuthStore = defineStore("authstore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.user;
    },
    role: (state) => state?.user.role,
    userId: (state) => state?.user.id,
  },
  actions: {
    async login(data) {
      this.loading = true;
      try {
        const res = await loginStaff(data);
        if (!res.ok) {
          message.error(res.message || "Login failed");
          return;
        }
        const sessionData = await getSession();
        this.user = sessionData.data.authenticated
          ? sessionData.data.user
          : null;

        router.push(`/${this.user.role}`);
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      await deleteSession(this.user.id);
      router.push({ name: "login" });
    },
    refreshSession() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.role = this.user.role;
      }
    },
  },
});
