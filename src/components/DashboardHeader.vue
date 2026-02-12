<template>
  <header class="bg-orbit-light shadow">
    <div class="px-6 py-3 items-center w-full flex justify-between top-0 z-100">
      <div class="w-[70%]">
        <h2 class="mb-1.75 font-semibold md:text-xl lg:text-2xl">{{ displayTitle }}</h2>
        <h5 v-if="displaySubtitle" class="lg:text-lg">{{ displaySubtitle }}</h5>
      </div>
      <div class="hidden md:flex lg:flex items-center gap-2.5">
        <div class="user">
          <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full object-cover">
        </div>
        <div class="user-id">{{ userEmail }}</div>
      </div>

      <button class="absolute md:hidden font-bold text-xl top-4 right-4" @click="$emit('toggle')">
        <Menu />
      </button>
    </div>
  </header>
</template>

<script setup>
import defaultProfile from '@/assets/imgs/profile.jpg';
import { useAuthStore } from '@/store/auth.js';
import { Menu } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  }
});

const route = useRoute();
const auth = useAuthStore();

// Display title - prop takes priority, then route meta, then default welcome message
const displayTitle = computed(() => {
  if (props.title) return props.title;
  if (route.meta?.title) return route.meta.title;

  // Default welcome message for dashboard home pages
  const userName = auth.user?.name || auth.user?.first_name || 'User';
  return `Welcome, ${userName}`;
});

// Display subtitle - prop takes priority, then route meta
const displaySubtitle = computed(() => {
  if (props.subtitle) return props.subtitle;
  return route.meta?.subtitle || null;
});

// User email from auth store
const userEmail = computed(() => {
  return auth.user?.email || 'user@example.com';
});

// User profile image with fallback
const userProfileImage = computed(() => {
  return auth.user?.profile_image || auth.user?.avatar || defaultProfile;
});

// Emit toggle event for mobile sidebar
defineEmits(['toggle']);
</script>