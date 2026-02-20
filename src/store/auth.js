import { defineStore } from "pinia";
import { computed, ref } from "vue";
import router from "@/router";

export const useAuthStore = defineStore("authstore", () => {
  // --- State ---
  const showSessionDateAndSemesterComponent = ref(true);
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const token = ref(localStorage.getItem("token") || null);
  const role = ref(localStorage.getItem("role") || null);
  const loading = ref(false);

  // --- Getters ---
  const isLoggedIn = computed(() => !!token.value);

  const facultyId = computed(() => user.value?.staff?.faculty || user.value?.faculty || null);
  const departmentId = computed(() => user.value?.staff?.department || user.value?.department || null);
  const staffId = computed(() => user.value?.staff?.id || user.value?.id || null);

  // --- Actions ---
  const login = (roleParam, userParam, tokenParam) => {
    // update reactive refs
    user.value = userParam;
    token.value = tokenParam;
    role.value = roleParam;
    localStorage.setItem("token", tokenParam);
    localStorage.setItem("user", JSON.stringify(userParam));
    localStorage.setItem("role", roleParam);
  };

  const logout = async () => {
    const userId = user.value?.id;
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
    showSessionDateAndSemesterComponent,
    role,
    loading,
    isLoggedIn,
    login,
    logout,
    refreshSession,
    facultyId,
    departmentId,
    staffId,
  };
});