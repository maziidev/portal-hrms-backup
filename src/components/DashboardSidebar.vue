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
                Orbit
                <img :src="logo" :alt="altText">
            </p>
        </div>

        <!-- navigation -->
        <nav class="flex-1 mt-10">
            <ul class="flex flex-col space-y-4">
                <li
                    v-for="item in navigationItems"
                    :key="item.path || item.name"
                    @click="handleNavigate(item)"
                    :class="[
                        'flex items-center gap-3 py-2 rounded-md px-2 transition hover:text-orbit-cyan',
                        isActiveRoute(item.path) ? 'text-orbit-cyan font-bold bg-orbit-bgSec' : 'text-orbit-light font-medium',
                        item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                    ]"
                >
                    <component :is="item.icon" class="w-5 h-5"/>
                    {{ item.name }}
                </li>
            </ul>
        </nav>

        <!-- bottom links -->
        <div class="bg-orbit-bgSec p-4 rounded-xl mt-13 text-white font-semibold space-y-8">
            <ul class="flex flex-col gap-4">
                <li
                    class="flex items-center gap-2 cursor-pointer font-semibold hover:bg-orbit-bg hover:text-white p-3 rounded-md"
                    @click="navigateToSettings"
                >
                    <Settings class="w-5 h-5"/>
                    Settings
                </li>
                <li
                    class="flex items-center gap-2 cursor-pointer font-semibold hover:bg-orbit-bg hover:text-white p-3 rounded-md"
                    @click="logout"
                >
                    <LogOut class="w-5 h-5"/>
                    Logout
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import Orbit from '@/assets/imgs/Orbit.png';
import { useAuthStore } from '@/store/auth.js';
import { LogOut, Settings } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    navigationItems: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['close']);

const logo = ref(Orbit);
const altText = ref('Orbit Logo');

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const currentRoute = computed(() => route.path);

// Check if a route is active - PROPERLY FIXED VERSION
const isActiveRoute = (itemPath) => {
    if (!itemPath) return false;

    const current = currentRoute.value;

    // Exact match - this is the active route
    if (current === itemPath) return true;

    // For child routes: check if current path starts with item path
    // BUT exclude the dashboard route (base route without any suffix)
    // Dashboard routes typically end with the role name like /unit_head, /dean, etc.
    const isDashboardRoute = itemPath.split('/').length === 2; // e.g., /unit_head has 2 parts

    if (!isDashboardRoute && current.startsWith(itemPath + '/')) {
        return true;
    }

    return false;
};

// Handle navigation and close sidebar on mobile
const handleNavigate = (item) => {
    if (!item.path || item.disabled) return;

    navigate(item);

    // Close sidebar on mobile after navigation
    closeSidebarOnMobile();
};

const navigate = (item) => {
    if (item.path === '/logout') {
        return logout();
    }

    router.push(item.path);
};

const navigateToSettings = () => {
    router.push('/settings');
    closeSidebarOnMobile();
};

const logout = () => {
    auth.logout();
};

// Close sidebar only on mobile screens
const closeSidebarOnMobile = () => {
    // Check if screen is mobile (less than md breakpoint - 768px)
    if (window.innerWidth < 768) {
        emit('close');
    }
};
</script>