<template>
  <aside
    :class="[
      `{ w-[268px] sidebar z-[3000] transition-all duration-100 ease-in-out  fixed top-0 left-0 h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]`,
      !toggleState ? `hidden` : `md:flex lg:flex`,
    ]"
  >
    <div class="">
      <li
        class="text-[rgba(14,253,193,1)] font-[700] text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
      >
        Orbit <img :src="Orbit" />
      </li>
    </div>
    <div class="flex flex-col gap-[25px]">
      <slot name="links"> </slot>
    </div>
    <div class="flex flex-col gap-[25px]">
      <slot name="setting"></slot>
      <li>
        <button
          class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
          href="#"
          ><i class="fa-solid fa-right-from-bracket"></i> Logout</button
        >
      </li>
      <slot name="details"></slot>
    </div>
  </aside>
</template>

<script setup>
import Orbit from "@/assets/imgs/Orbit.png";
import { useAuthStore } from "@/store/auth.js";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const props = defineProps({
  toggleState: {
    type: Boolean,
    required: true,
  },
});

// Logout Function
const logoutUser =  () => {
  try {
    aut
  }
  catch(error) {
    message
  }
}
// const emits = defineEmits(["update:toggleState"]);
</script>
