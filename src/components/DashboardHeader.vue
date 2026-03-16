<template>
  <header class="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-md">
    <div class="px-8 py-3 flex justify-between items-center w-full">

      <div class="flex-1 min-w-0">
        <h2 class="text-xl md:text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-tight truncate">
          {{ displayTitle }}
        </h2>
        <p v-if="displaySubtitle" class="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate">
          {{ displaySubtitle }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-3 pl-4 border-l border-gray-100">
          <div class="flex flex-col items-end">
            <span class="text-xs font-black text-orbit-bg uppercase tracking-tight leading-none">
              {{ auth.user?.name || auth.user?.full_name || 'Staff Member' }}
            </span>
            <span class="text-[10px] font-bold text-gray-400 lowercase tracking-normal">
              {{ userEmail }}
            </span>
          </div>

          <div class="relative group cursor-pointer">
            <div class="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm group-hover:border-orbit-bg transition-all duration-300">
              <img
                :src="userProfileImage"
                alt="User profile"
                class="w-full h-full object-cover"
              >
            </div>
            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>

        <button
          @click="$emit('toggle')"
          class="md:hidden p-2 rounded-lg bg-gray-50 text-orbit-bg hover:bg-orbit-bg hover:text-white transition-all shadow-sm"
        >
          <Menu :size="20" stroke-width="3" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import defaultProfile from '@/assets/imgs/profile.jpg';
import { useAuthStore } from '@/store/auth.js';
import { Menu } from 'lucide-vue-next';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  title: { type: String, default: null },
  subtitle: { type: String, default: null }
});

const route = useRoute();
const auth = useAuthStore();

// WATCHER to see when user data loads
watch(
  () => auth.user,
  (val) => {
    // console.log('User loaded:', val); // for debugging
  },
  { immediate: true }
);

const displayTitle = computed(() => {
  if (props.title) return props.title;

  // scan all matched routes for title
  const metaTitle = route.matched.find(r => r.meta?.title)?.meta.title;
  if (metaTitle) return metaTitle;

  // fallback to user name
  const userName = auth.user?.name || auth.user?.full_name || 'User';
  return `Welcome, ${userName}`;
});

const displaySubtitle = computed(() => {
  if (props.subtitle) return props.subtitle;

  // scan all matched routes for subtitle
  const metaSubtitle = route.matched.find(r => r.meta?.subtitle)?.meta.subtitle;
  return metaSubtitle || '';
});

const userEmail = computed(() => auth.user?.email || 'user@example.com');
const userProfileImage = computed(() => auth.user?.profile_image || auth.user?.avatar || defaultProfile);

defineEmits(['toggle']);
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

/* Subtle entrance animation for titles */
h2 {
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>