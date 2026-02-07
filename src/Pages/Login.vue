<script setup>
import { loginStaff } from "@/apis/auth.js";
import login_img from "@/assets/imgs/login_img.jpg";
import { useAuthStore } from "@/store/auth.js";
import { useMessage } from "naive-ui";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const loginImage = login_img;
const router = useRouter();
const loading = ref(false);

const message = useMessage();
const userRole = ref("");
const altText = ref("Lady siting in front of a laptop");

const overLayedText = ref(
  "OrbitHR streamlines staff management, giving your university a single source of truth. From recruitment to retirement, we follow every staff member's journey with precision.",
);

const formData = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  loading.value = true;
  try {
    const res = await loginStaff(formData);
    if (!res) {
      message.error("Login failed");
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

    auth.login();
    // const sessionData = await getSession();
    // this.user = sessionData.data.authenticated
    //   ? sessionData.data.user
    //   : null;

    message.success("You have logged in successfully")
    loading.value = false;
    // console.log(this.token, this.user, this.role);
    router.push(`/${auth.role}`);
    return;
  } catch (error) {
    loading.value = false;
    throw error;
  }
};
</script>

<template>
  <div class="h-screen relative">
    
    <div class="flex flex-col md:flex-row h-full bg-orbit-bg">
      <!-- left section -->
      <div class="relative w-full h-64 md:w-1/2 md:h-full">
        <img
          :src="loginImage"
          :alt="altText"
          class="w-full h-full object-cover"
        />

        <div
          class="absolute bottom-5 left-5 right-5 md:bottom-10 md:left-10 md:right-10 bg-black/50 p-4 md:p-8 text-center rounded-xl font-bold"
        >
          <p class="text-white text-sm md:text-base leading-relaxed">
            {{ overLayedText }}
          </p>
        </div>
      </div>

      <!-- right section login form -->

      <div
        class="flex items-center justify-center md:w-1/2 w-full px-6 md:px-16 py-8 md:py-0"
      >
        <div class="w-full max-w-md">
          <div class="mb-6 md:mb-8 text-center">
            <h1 class="text-white text-2xl md:text-3xl font-semibold mb-2">
              Login
            </h1>
            <p class="text-gray-400 text-sm">
              Please login to access your account
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-white text-sm font-medium mb-1 md:mb-2"
              >
                E-mail address
              </label>

              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <input
                  v-model="formData.email"
                  type="email"
                  id="email"
                  placeholder="Please enter your e-mail address"
                  class="w-full border text-white border-[#1a3a5f] rounded-lg py-2.5 pl-10 pr-10 placeholder-gray-500 focus:outline-none focus:border-[#2a5a8f] transition-colors text-sm md:text-base"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label
                for="password"
                class="block text-white text-sm font-medium mb-1 md:mb-2"
              >
                Password
              </label>

              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  placeholder="Please enter your password"
                  class="w-full border border-[#1a3a5f] rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2a5a8f] transition-colors text-sm md:text-base"
                />

                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 hover:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />

                    <path
                      v-else
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 0c0-1.657 1.343-3 3-3m6 6c-1.657 0-3-1.343-3-3m0-7c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Forgot -->
            <div class="text-right">
              <a href="#" class="text-orbit-blue text-sm underline"
                >Forgot Password?</a
              >
            </div>

            <button
              type="submit"
              class="w-full block btn btn-blue-main font-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
