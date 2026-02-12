<template>
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <DashboardSidebar
            :isOpen="sidebarOpen"
            :navigationItems="currentNavigation"
            @close="closeSidebar"
        />



        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col">
            <!-- Header -->
            <DashboardHeader @toggle="sidebarOpen = !sidebarOpen" />

            <!-- Page Content -->
            <main class="flex-1 p-6">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue';
import { DEAN_NAV, HOD_NAV, HOU_NAV, NON_ACADEMIC_NAV, VC_NAV } from '@/constants/navigation';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const sidebarOpen = ref(false);

// Determine navigation based on current route path
const currentNavigation = computed(() => {
    const path = route.path;

    if (path.startsWith('/dean')) {
        return DEAN_NAV;
    } else if (path.startsWith('/head_of_division')) {
        return HOD_NAV;
    } else if (path.startsWith('/unit_head')) {
        return HOU_NAV;
    } else if (path.startsWith('/vice_chancellor')) {
        return VC_NAV;
    } else if (path.startsWith('/non_academic')) {
        return NON_ACADEMIC_NAV;
    }

    return DEAN_NAV; // fallback
});

// Close sidebar (especially useful for mobile)
const closeSidebar = () => {
    sidebarOpen.value = false;
};
</script>