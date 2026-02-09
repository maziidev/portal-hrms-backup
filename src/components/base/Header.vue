<script setup>
import { useAuthStore } from '@/store/auth.js';
import { Menu } from 'lucide-vue-next';
import { computed } from 'vue';
import defaultProfile from '../../assets/imgs/profile.jpg';

// Props for dynamic header content
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  profileImg: { type: String, default: defaultProfile },
});

const auth = useAuthStore();

// Computed title: use prop if provided, else fallback
const computedTitle = computed(() => props.title || `Welcome ${auth.user?.email || 'User'}`);
const userEmail = computed(() => auth.user?.email || 'user@example.com');
</script>

<template>
  <header class="bg-orbit-light shadow">
    <div class="p-2 px-6  flex justify-between items-center w-full relative">

      <!-- Title & Subtitle -->
      <div class="w-[70%]">
        <h2 class="mb-1.75 font-semibold md:text-xl lg:text-2xl">{{ computedTitle }}</h2>
        <h5 class="lg:text-lg">{{ props.subtitle }}</h5>
      </div>

      <!-- Desktop User Info -->
      <div class="hidden md:flex lg:flex items-center gap-2.5">
        <div class="user">
          <img :src="props.profileImg" alt="Profile" class="w-10 h-10 rounded-full" />
        </div>
        <div class="user-id mbc">{{ userEmail }}</div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="absolute md:hidden top-4 right-4 text-xl font-bold" @click="$emit('toggle')">
        <Menu />
      </button>
    </div>
  </header>
</template>
