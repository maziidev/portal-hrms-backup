import { defineStore } from "pinia";
import router from "../router";
import { computed, ref  } from "vue";
import { getSession, deleteSession, loginStaff } from "../apis/auth";
// import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const message = useMessage();

export const useAuthStore = defineStore("authstore", () => {

  let user = ref(JSON.parse(localStorage.getItem("user"))) || ref(null);
  let token = ref(localStorage.getItem("token")) || ref(null);
  let role = ref(localStorage.getItem("role")) || ref(null);

  const isLoggedIn = computed(() => {
    return !!token.value;
  })

  const login = (token, user, role) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
  }

  const  logout = async () => {
      token.value = null;
      user.value = null;
      role.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      router.push({ name: "login" });
    };

    const refreshSession = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storeRole = localStorage.getItem("role");

      if (token && user) {
       token.value = storedToken;
       user.value = JSON.parse(storedUser);
       role.value = storeRole;
      }
    };
  return {
    user,
    role,
    isLoggedIn,
    login,
    logout,
    refreshSession,
  }
})


