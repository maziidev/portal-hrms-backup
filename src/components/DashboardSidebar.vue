<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
    @click="$emit('close')"
  ></div>

  <aside
    :class="[
      'fixed top-0 left-0 h-screen w-72 z-50 bg-orbit-bg flex flex-col justify-between px-6 py-10 transition-all duration-300 ease-in-out',
      isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
      'md:translate-x-0'
    ]"
  >
    <div class="px-3">
      <div class="flex items-center gap-3">
        <div class="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
          <img :src="logo" :alt="altText" class="w-8 h-8 object-contain">
        </div>
        <h1 class="font-black text-2xl text-white italic tracking-tighter uppercase">
          Orbit<span class="text-orbit-cyan">.</span>
        </h1>
      </div>
    </div>

    <nav class="flex-1 mt-12 overflow-y-auto custom-scrollbar px-1">
      <p class="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 px-3">Main Menu</p>
      <ul class="space-y-2">
        <li
          v-for="item in dynamicNavigation"
          :key="item.path || item.name"
          @click="handleNavigate(item)"
          :class="[
            'group relative flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300',
            isActiveRoute(item.path)
              ? 'bg-white/10 text-orbit-cyan shadow-inner'
              : 'text-white/60 hover:text-white hover:bg-white/5',
            item.disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
          ]"
        >
          <div
            v-if="isActiveRoute(item.path)"
            class="absolute left-0 w-1 h-6 bg-orbit-cyan rounded-r-full shadow-[0_0_15px_rgba(0,255,255,0.5)]"
          ></div>

          <component
            :is="item.icon"
            :class="['w-5 h-5 transition-transform duration-300 group-hover:scale-110', isActiveRoute(item.path) ? 'text-orbit-cyan' : '']"
          />
          <span class="text-sm font-bold uppercase tracking-tight italic">{{ item.name }}</span>
        </li>
      </ul>
    </nav>

    <div class="mt-auto pt-6 border-t border-white/5">
      <div v-if="auth.role" class="mb-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-center">
         <p class="text-[9px] font-black text-white/40 uppercase tracking-widest">Acting Role</p>
         <p class="text-[11px] font-bold text-orbit-cyan uppercase italic">{{ auth.role.replace('_', ' ') }}</p>
      </div>

      <div class="bg-white/5 rounded-2xl p-4 space-y-2 border border-white/5">
        <button
          class="flex items-center gap-3 w-full p-3 rounded-xl text-white/70 font-bold text-xs uppercase italic tracking-wider hover:bg-white/10 hover:text-white transition-all border-none cursor-pointer"
          @click="navigateToSettings"
        >
          <Settings class="w-4 h-4 text-orbit-cyan"/>
          Settings
        </button>
        <button
          class="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 font-bold text-xs uppercase italic tracking-wider hover:bg-red-500/10 transition-all border-none cursor-pointer"
          @click="logout"
        >
          <LogOut class="w-4 h-4"/>
          Logout
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import OrbitLogo from '@/assets/imgs/Orbit.png';
import { useAuthStore } from '@/store/auth.js';
import { LogOut, Settings } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Constants Import
import {
  DEAN_NAV,
  HOD_NAV,
  HOU_NAV,
  NON_ACADEMIC_NAV,
  VC_NAV
} from "@/constants/navigation";

const props = defineProps({
    isOpen: { type: Boolean, default: false },
    navigationItems: { type: Array, default: () => [] }
});

const emit = defineEmits(['close']);
const logo = ref(OrbitLogo);
const altText = ref('Orbit Logo');
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

// --- ROLE MAPPING ---
const dynamicNavigation = computed(() => {
    // Ensure we handle potential null/undefined roles gracefully
    const role = auth.role?.toLowerCase().trim();

    if (role === 'dean') return DEAN_NAV;
    if (role === 'head_of_division') return HOD_NAV;
    if (role === 'unit_head') return HOU_NAV;
    if (role === 'vc') return VC_NAV;
    if (role === 'non_academic') return NON_ACADEMIC_NAV;

    return props.navigationItems;
});

// --- IMPROVED ACTIVE ROUTE LOGIC ---
const isActiveRoute = (itemPath) => {
    if (!itemPath) return false;
    const current = route.path;

    // 1. Exact match
    if (current === itemPath) return true;

    // 2. Dashboard home exceptions (prevents "/" from matching everything)
    if (itemPath === '/dean' || itemPath === '/vc' || itemPath === '/head_of_division') {
        return current === itemPath;
    }

    // 3. Sub-route matching (e.g., /dean/staff/edit highlights /dean/staff)
    return current.startsWith(itemPath);
};

const handleNavigate = (item) => {
    if (!item.path || item.disabled) return;
    router.push(item.path);
    if (window.innerWidth < 768) emit('close');
};

const navigateToSettings = () => {
    router.push('/settings');
    if (window.innerWidth < 768) emit('close');
};

const logout = () => {
    auth.logout();
    // No need to redirect here if your store.logout handles it
};
</script>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-cyan { color: #00ffff; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

aside { scrollbar-gutter: stable; }
</style>