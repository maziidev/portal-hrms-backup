<template>
  <aside
    :class="[
      'w-70 z-3000 transition-all duration-200 ease-in-out fixed top-0 left-0 h-screen px-8.75 flex flex-col justify-between py-11.25 bg-orbit-bg md:translate-x-0 md:static md:block',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- logo -->
    <div>
      <p class="font-bold flex items-center text-orbit-cyan text-xl gap-2">
        {{ brandName }}
        <img :src="logo" :alt="altText" />
      </p>
    </div>

    <!-- navigation -->
    <nav class="flex-1 mt-10">
      <ul class="flex flex-col space-y-4">
        <li
          v-for="item in navItems"
          :key="item.path"
          @click="!item.disabled && navigate(item)"
          :class="[
            'flex items-center gap-3 cursor-pointer py-2 rounded-md px-2 transition hover:text-orbit-cyan',
            currentRoute === item.path ? 'text-orbit-cyan font-bold' : 'text-orbit-light font-medium',
            item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </li>
      </ul>
    </nav>

    <!-- bottom links -->
    <div class="bg-orbit-bgSec p-4 rounded-xl mt-13 text-white font-semibold space-y-8">
      <ul class="flex flex-col gap-4">
        <li
          class="flex items-center gap-2 cursor-pointer font-semibold hover:bg-orbit-bg hover:text-white p-3 rounded-md"
        >
          <Settings class="w-5 h-5" />
          Settings
        </li>
        <li
          class="flex items-center gap-2 cursor-pointer font-semibold hover:bg-orbit-bg hover:text-white p-3 rounded-md"
          @click="logout"
        >
          <LogOut class="w-5 h-5" />
          Logout
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { LogOut, Settings } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth.js';

// Props
const props = defineProps({
  isOpen: Boolean,
  navItems: { type: Array, required: true }, // dynamic navigation items
  brandName: { type: String, default: 'Orbit' },
  logo: { type: String, required: true },
  altText: { type: String, default: 'Logo' },
});

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const currentRoute = computed(() => route.path);

const navigate = (item) => {
  if (item.path === '/logout') return logout();
  router.push(item.path);
};

const logout = () => {
  auth.logout(); // make sure your Pinia store uses the correct method name
};
</script>