<script setup>
import { useAuthStore } from '@/store/auth.js';
import { Menu } from 'lucide-vue-next';
import { computed, ref } from 'vue';


import profile from '../../assets/imgs/profile.jpg';

const props = defineProps({
  subtitle: { type: String, default: '' },
});

// Pinia store
const auth = useAuthStore();

// computed values for header
const title = computed(() => `Welcome ${auth.user?.firstName || 'User'}`);

const userEmail = computed(() => auth.user?.email || 'user@example.com');

const profileImg = ref(profile);




</script>



<template>
  <header class="bg-orbit-light shadow">
    <div class="p-2 items-center w-full flex justify-between  top-0 z-100">
      <div class="w-[70%]">
        <h2 class="mb-1.75 font-semibold md:text-xl lg:text-2xl">{{ title }}</h2>
        <h5 class="lg:text-lg">{{ subtitle }}</h5>
      </div>
      <div class="hidden md:flex lg:flex items-center gap-2.5">
        <div class="user">
          <img :src="profileImg" alt="" class="w-10 h-10 rounded-full">
        </div>
        <div class="user-id mbc">{{ userEmail }}</div>
      </div>

      <button class="absolute md:hidden font-bold text-xl top-4 right-4" @click="$emit('toggle')">
        <Menu/>
      </button>
    </div>
  </header>
</template>