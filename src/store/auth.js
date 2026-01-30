import { defineStore } from "pinia";
import router from "../router";

export const useAuthStore = defineStore("authstore", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    role: JSON.parse(localStorage.getItem("user"))?.role || null
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.token;
    },
    isAdmin: (state) => state.role === "admin",
    isHod: (state) => state.role === "hod",
    isDap: (state) => state.role === "dap",
    isAcademicStaff: (state) => (state.role = "academic-staff"),
    isExternalAccess: (state) => state.role === "external-accessor",
  },
  actions: {
    login: function (data) {
      this.user = data.user;
      this.token = data.token;
      this.role = data.user.role;

      localStorage.setItem("token", this.token);
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    logout: function () {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push({ name: "login" });
    },
    refreshSession() {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("user");

      if(token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.role = this.user.role;
      }
      
    },
  },
});
