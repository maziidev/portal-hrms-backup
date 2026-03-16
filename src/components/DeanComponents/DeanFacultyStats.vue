<script setup>
import { useDeanStats } from "@/composables/Dean/useDeanStats.js";
import { useAuthStore } from '@/store/auth.js';
import { NAlert, NSpin } from "naive-ui";
import { watch } from "vue";

const { loading, error, stats, fetchStats } = useDeanStats();

const authStore = useAuthStore()

watch(
  () => authStore.facultyId,
  (val) => {
    if (val) fetchStats();
  },
  { immediate: true } // will also run if facultyId already exists
);
</script>

<template>
  <div class="w-full p-6">
    <n-spin :show="loading">

      <n-alert v-if="error" type="error" class="mb-6">{{ error }}</n-alert>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-5">

        <div class="md:col-span-4 bg-orbit-bg rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] font-bold opacity-70">Faculty Overview</p>
            <h2 class="text-4xl font-black mt-2">{{ stats.total_departments }}</h2>
            <p class="text-sm opacity-90 font-medium">Total Departments</p>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold uppercase opacity-60">Total Staff Force</span>
              <span class="text-xl font-bold">{{ stats.total_staff }}</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-orbit-blue transition-colors">
            <div class="flex justify-between items-start">
              <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Pending Reviews</span>
              <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            </div>
            <div class="mt-4">
              <span class="text-4xl font-bold text-orbit-bg">{{ stats.pending_reviews }}</span>
              <p class="text-xs text-gray-500 font-medium mt-1">Awaiting Dean's Approval</p>
            </div>
          </div>

          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Promotion Requests</span>
            <div class="mt-4">
              <span class="text-4xl font-bold text-orbit-bg">{{ stats.promotion_requests }}</span>
              <div class="mt-2 h-1 w-12 bg-orbit-blue rounded"></div>
            </div>
          </div>

          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Leave Requests</span>
            <div class="mt-4 flex items-baseline space-x-2">
              <span class="text-4xl font-bold text-orbit-bg">{{ stats.total_leaves }}</span>
              <span class="text-xs font-bold text-gray-400">Active</span>
            </div>
          </div>

          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Ongoing Appraisals</span>
            <div class="mt-4">
              <span class="text-4xl font-bold text-orbit-bg">{{ stats.active_appraisals }}</span>
              <p class="text-[10px] text-green-600 font-bold uppercase mt-1">In Progress</p>
            </div>
          </div>

        </div>

      </div>
    </n-spin>
  </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }

/* Subtle entrance for the cards */
.grid > div, .md\:col-span-8 > div {
    animation: slideUp 0.5s ease-out forwards;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>