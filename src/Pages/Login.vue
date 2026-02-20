<script setup>
import { loginStaff } from "@/apis/auth"; // FIX 1: Missing Import added
import { useAuthStore } from "@/store/auth";
import { Eye, EyeOff, Lock, Mail } from 'lucide-vue-next';
import { NSpin, useMessage } from "naive-ui"; // Added NSpin import
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const message = useMessage();

const formData = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

const userRole = ref(null);
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true; // Start loading
  try {
    // FIX 2: Ensure we send 'email' and 'password' as the backend requested
    const payload = {
      email: formData.email,
      password: formData.password
    };

    const res = await loginStaff(payload);

    if (!res || !res.staff) {
      loading.value = false;
      return;
    }

    // Find the active role object
    const activeRoleObj = res.staff.staff_roles?.find(
      (role) => role.is_active === true
    );

    if (!activeRoleObj) {
      message.error("No active role assigned to this account.");
      loading.value = false;
      return;
    }

    // FIX 3: Format the role name for the URL (e.g., "Vice Chancellor" -> "vice_chancellor")
    const formattedRole = activeRoleObj.role.toLowerCase().replace(/\s+/g, '_');

    // Update Store
    auth.login(formattedRole, res.staff, res.access);

    message.success("You have logged in successfully");

    // Redirect using the formatted role
    router.push(`/${formattedRole}`);

  } catch (err) {
    // Log the actual backend error so you can see it
    console.error("Login Error:", err.response?.data);
    const errorMsg = err.response?.data?.message || err.response?.data?.detail || "Login failed";
    message.error(errorMsg);
  } finally {
    loading.value = false; // Stop loading regardless of outcome
  }
};
</script>

<template>
  <div class="h-screen overflow-hidden bg-orbit-bg">
    <div class="flex flex-col md:flex-row h-full">
      <div class="relative hidden md:flex w-1/2 h-full items-center justify-center p-12">
        <img
          src="@/assets/imgs/login_img.jpg"
          alt="University Staff"
          class="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-tr from-orbit-bg via-orbit-bg/40 to-transparent"></div>

        <div class="relative z-10 max-w-lg">
          <div class="mb-8 flex items-center gap-3">
             <div class="bg-white/10 p-3 rounded-2xl backdrop-blur-xl border border-white/20">
                <div class="w-8 h-8 bg-orbit-cyan rounded-full animate-pulse shadow-[0_0_15px_rgba(0,255,255,0.5)]"></div>
             </div>
             <h1 class="text-4xl font-black text-white italic tracking-tighter uppercase">Orbit<span class="text-orbit-cyan">.</span></h1>
          </div>

          <div class="space-y-6">
            <h2 class="text-5xl font-black text-white leading-none uppercase italic tracking-tighter">
              Streamlining <br/> <span class="text-orbit-cyan">Excellence.</span>
            </h2>
            <p class="text-gray-300 text-lg font-medium leading-relaxed italic border-l-4 border-orbit-cyan pl-6">
              "OrbitHR provides a single source of truth for your university’s lifecycle, from recruitment to retirement."
            </p>
          </div>
        </div>

        <div class="absolute bottom-10 left-12 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
          © 2026 Orbit Human Resources Management System
        </div>
      </div>

      <div class="flex items-center justify-center w-full md:w-1/2 px-6 lg:px-20 bg-white md:rounded-l-[40px] shadow-2xl z-20">
        <div class="w-full max-w-md">
          <div class="mb-10">
            <h1 class="text-4xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">Account Login</h1>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Enter your credentials to access the portal</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-orbit-bg uppercase tracking-widest ml-1">E-mail Address</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-gray-400 group-focus-within:text-orbit-bg transition-colors" />
                </div>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="name@university.edu"
                  class="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-orbit-bg font-bold placeholder-gray-400 focus:bg-white focus:border-orbit-bg focus:outline-none transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center px-1">
                <label class="text-[10px] font-black text-orbit-bg uppercase tracking-widest">Password</label>
                <a href="#" class="text-[10px] font-bold text-orbit-bg/50 hover:text-orbit-bg uppercase tracking-widest transition-colors">Forgot?</a>
              </div>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400 group-focus-within:text-orbit-bg transition-colors" />
                </div>
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-12 text-orbit-bg font-bold placeholder-gray-400 focus:bg-white focus:border-orbit-bg focus:outline-none transition-all duration-300 shadow-sm"
                  required
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orbit-bg transition-colors border-none bg-transparent cursor-pointer"
                >
                  <Eye v-if="!showPassword" class="h-5 w-5" />
                  <EyeOff v-else class="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full bg-orbit-bg py-5 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/20 active:scale-[0.98] disabled:opacity-70 border-none cursor-pointer"
            >
              <div v-if="loading" class="flex justify-center">
                <n-spin size="small" stroke="#00ffff" />
              </div>
              <div v-else class="flex items-center justify-center gap-2">
                <span class="text-white font-black uppercase italic tracking-[0.2em]">Sign In</span>
                <div class="w-0 group-hover:w-5 overflow-hidden transition-all duration-300">
                   <svg class="w-5 h-5 text-orbit-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </div>
              </div>
            </button>
          </form>

          <div class="mt-12 md:hidden text-center">
             <p class="text-[9px] font-black text-gray-300 uppercase tracking-widest">Orbit HR Management System</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }
.text-orbit-cyan { color: #00ffff; }
.border-orbit-cyan { border-color: #00ffff; }

form {
  animation: formEntrance 0.6s ease-out;
}

@keyframes formEntrance {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>