import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { deleteSession } from "../apis/auth";
import router from "../router";
// import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const message = useMessage();

export const useAuthStore = defineStore("authstore", () => {



    // --- State ---
    const user = ref(JSON.parse(localStorage.getItem("user")) || null);
    const token = ref(localStorage.getItem("token") || null);
    const role = ref(localStorage.getItem("role") || null);
    const loading = ref(false);

    // --- Getters ---
    const isLoggedIn = computed(() => !!token.value);

    // --- Actions ---
    const login = () => {
        console.log(user.value);
        localStorage.setItem("token", token.value);
        localStorage.setItem("user", JSON.stringify(user.value));
        localStorage.setItem("role", role.value);
    };

    const logout = async () => {
        const userId = user.value?.id; // save id before clearing
        token.value = null;
        user.value = null;
        role.value = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        if (userId) await deleteSession(userId);

        router.push({ name: "login" });
    };

    const refreshSession = () => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role");

        if (storedToken && storedUser) {
            token.value = storedToken;
            user.value = JSON.parse(storedUser);
            role.value = storedRole;
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