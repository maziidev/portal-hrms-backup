import { defineStore } from "pinia";
import router from "../router";
import { getSession, deleteSession, loginStaff } from "../apis/auth";
// import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const message = useMessage();

export const useAuthStore = defineStore("authstore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.token;
    },
  },
  actions: {
    login() {
      console.log(this.user);
      localStorage.setItem("token", this.token);
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("role", this.role);
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
      const role = localStorage.getItem("role");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.role = role;
      }
    },
  },
});
