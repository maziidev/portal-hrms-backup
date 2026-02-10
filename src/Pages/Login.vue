<script setup>
import { loginStaff } from "@/apis/auth.js";
import { useAuthStore } from "@/store/auth.js";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

// Login form data
const formData = reactive({
  email: "",
  password: "",
});

// Password toggle
const showPassword = ref(false);
const togglePassword = () => (showPassword.value = !showPassword.value);

// Toast state
const toast = ref({ message: "", type: "", visible: false });
const showToast = (message, type = "success") => {
  toast.value = { message, type, visible: true };
  setTimeout(() => (toast.value.visible = false), 3000);
};

// Handle login
const handleLogin = async () => {
  try {
    const res = await loginStaff(formData);

    if (!res || !res.access || !res.staff) {
      // showToast("Invalid credentials", "error");
      return;
    }

    auth.token = res?.access;
    auth.user = res?.staff;
    // auth.role = res?.staff.staff_roles?.find((role) => role.is_active).role.toLowerCase();

    userRole.value = res?.staff.staff_roles?.find(
      (role) => role.is_active === true,
    );

    auth.role = userRole.value.role.toLowerCase();

    console.log(auth);

    auth.login( userRole.value.role.toLowerCase(), res?.staff, res?.access );
    // const sessionData = await getSession();
    // this.user = sessionData.data.authenticated
    //   ? sessionData.data.user
    //   : null;

    message.success("You have logged in successfully");
    loading.value = false;
    // console.log(this.token, this.user, this.role);
    router.push(`/${auth.role}`);
  } catch (err) {
    // showToast("Login failed. Please try again.", "error");
  }
};
</script>

<template>
  <div class="h-screen">
    <Toast v-if="toast.visible" :type="toast.type" :message="toast.message" />

    <div class="flex flex-col md:flex-row h-full bg-orbit-bg">
      <!-- left image section -->
      <div class="relative w-full h-64 md:w-1/2 md:h-full">
        <img
          src="@/assets/imgs/login_img.jpg"
          alt="Lady sitting in front of a laptop"
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-5 left-5 right-5 md:bottom-10 md:left-10 md:right-10 bg-black/50 p-4 md:p-8 text-center rounded-xl font-bold">
          <p class="text-white text-sm md:text-base leading-relaxed">
            OrbitHR streamlines staff management, giving your university a single source of truth. From recruitment to retirement, we follow every staff member's journey with precision.
          </p>
        </div>
      </div>

      <!-- login form -->
      <div class="flex items-center justify-center md:w-1/2 w-full px-6 md:px-16 py-8 md:py-0">
        <div class="w-full max-w-md">
          <div class="mb-6 md:mb-8 text-center">
            <h1 class="text-white text-2xl md:text-3xl font-semibold mb-2">Login</h1>
            <p class="text-gray-400 text-sm">Please login to access your account</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
            <!-- Email -->
            <div>
              <label for="email" class="block text-white text-sm font-medium mb-1 md:mb-2">
                E-mail address
              </label>
              <input
                v-model="formData.email"
                type="email"
                id="email"
                placeholder="Please enter your e-mail address"
                class="w-full border text-white border-[#1a3a5f] rounded-lg py-2.5 px-3 placeholder-gray-500 focus:outline-none focus:border-[#2a5a8f] text-sm md:text-base"
              />
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-white text-sm font-medium mb-1 md:mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  placeholder="Please enter your password"
                  class="w-full border border-[#1a3a5f] rounded-lg py-2.5 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2a5a8f] text-sm md:text-base"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    v-if="!showPassword"
                    class="w-5 h-5 text-gray-400 hover:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59M12 5c4.478 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z"/>
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5 text-gray-400 hover:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="text-right">
              <a href="#" class="text-orbit-blue cursor-pointer text-sm underline"
                >Forgot Password?</a
              >
            </div>

            <button
              type="submit"
              class="w-full block cursor-pointer btn btn-blue-main font-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
