<template>
  <div class="absolute top-[50%] left-[100%]" v-if="loading">
    <PulseLoader />
  </div>
  <aside
    :class="[
      `{ w-67 sidebar z-3000 transition-all duration-100 ease-in-out h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]`,
      !toggleState ? `hidden` : `md:flex lg:flex`,
    ]"
  >
    <div class="">
      <li
        class="text-[rgba(14,253,193,1)] font-bold text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
      >
        Orbit <img :src="Orbit" />
      </li>
    </div>
    <div class="flex flex-col gap-[25px]">
      <slot name="links"> </slot>
    </div>
    <div
      class="flex flex-col gap-6.25 bg-orbit-bgSec p-4 rounded-xl text-white font-semibold space-y-4"
    >
      <li>
        <a
          class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%] w-full"
          href="#"
          ><i class="fa fa-gear"></i> Settings</a
        >
      </li>
      <li>
        <button
          @click="logoutUser"
          class="flex items-center gap-2 cursor-pointer font-semibold hover:bg-orbit-bg hover:text-white p-3 rounded-md w-full"
          href="#"
        >
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </li>
      <li class="md:hidden lg:hidden items-center gap-[10px] flex">
        <i class="fa fa-bell text-(--pri-text)"></i>
        <span
          class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%]"
          >Notification</span
        >
      </li>
      <li class="md:hidden lg:hidden items-center gap-[10px] flex">
        <div class="user">
          <i class="fa fa-user text-(--pri-text)"></i>
        </div>
        <div class="user-id mbc text-(--pri-text)! break-words">
          {{ auth?.user && auth?.user?.email }}
        </div>
      </li>
    </div>
  </aside>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { ref } from "vue";
import Orbit from "@/assets/imgs/Orbit.png";
import { useAuthStore } from "@/store/auth.js";
import { useRouter } from "vue-router";
import { logOutStaff } from "@/apis/auth.js";
import { useMessage } from "naive-ui";

const auth = useAuthStore();
const message = useMessage();
const loading = ref(false);

const router = useRouter();

const props = defineProps({
  toggleState: {
    type: Boolean,
    required: true,
  },
});

// Logout Function
const logoutUser = async () => {
  loading.value = true;
  try {
    auth.logout();
    loading.value = false;
    message.success("You have been logged out successfully");
  } catch (error) {
    loading.value = false;

    message.error("You are not logged out");
  }
};
// const emits = defineEmits(["update:toggleState"]);
</script>
