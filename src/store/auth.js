import { useMessage } from "naive-ui";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { deleteSession } from "../apis/auth";
import router from "../router";

export const useAuthStore = defineStore("authstore", () => {
    const user = ref(JSON.parse(localStorage.getItem("user")) || null);
    const token = ref(localStorage.getItem("token") || null);
    const role = ref(localStorage.getItem("role") || null);
    const loading = ref(false);

    const isLoggedIn = computed(() => !!token.value);

    const login = async ({ token: newToken, user: newUser, role: newRole }) => {
        try {
            if (!newToken || !newUser) throw new Error("Invalid login data");

            token.value = newToken;
            user.value = newUser;
            role.value = newRole || null;

            localStorage.setItem("token", newToken);
            localStorage.setItem("user", JSON.stringify(newUser));
            if (newRole) localStorage.setItem("role", newRole);

        } catch (err) {
            const message = useMessage();
            message.error(err.message || "Login failed");
        }
    };

    const logout = async () => {
        try {
            const message = useMessage();
            const userId = user.value?.id;

            token.value = null;
            user.value = null;
            role.value = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");

            if (userId) {
                try {
                    await deleteSession(userId);
                } catch (err) {
                    // session delete failed, show message but continue logout
                    message.warning("Could not delete session on server.");
                }
            }

            router.push({ name: "login" });
        } catch (err) {
            const message = useMessage();
            message.error("Logout failed.");
        }
    };

    const refreshSession = () => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role");

        if (storedToken && storedUser) {
            token.value = storedToken;
            user.value = JSON.parse(storedUser);
            role.value = storedRole || null;
        }
    };

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
