import { useMessage } from "naive-ui";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { deleteSession } from "../apis/auth";
import router from "../router";

export const useAuthStore = defineStore("authstore", () => {
  // --- State ---
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const token = ref(localStorage.getItem("token") || null);
  const role = ref(localStorage.getItem("role") || null);
  const loading = ref(false);

  // --- Getters ---
  const isLoggedIn = computed(() => !!token.value);

  // --- Actions ---
  const login = (role, user, token) => {
    console.log(user.value);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", role);
  };

  const logout = async () => {
    const userId = user.value?.id; // save id before clearing
    token.value = null;
    user.value = null;
    role.value = null;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    router.push({ name: "login" });
  };

  const refreshSession = () => {
    const storedToken = ref(localStorage.getItem("token"));
    const storedUser = ref(localStorage.getItem("user"));
    const storedRole = ref(localStorage.getItem("role"));

    if (storedToken && storedUser) {
      token.value = storedToken.value;
      user.value = JSON.parse(storedUser.value);
      role.value = storedRole.value;
    }
  };

  // --- Return ---
  return {
    user,
    token,
    role,
    loading,
    isLoggedIn,
    login,
    logout,
    refreshSession,
  };
});
