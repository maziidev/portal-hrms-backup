<script setup>
import { getVCDashboardStats } from "@/apis/management/vc";
import { NAlert, NSpin } from "naive-ui";
import { onMounted, ref } from "vue";

const loading = ref(true);
const error = ref(null);
const stats = ref(null);

const fetchStats = async () => {
    loading.value = true;
    try {
        const res = await getVCDashboardStats();
        stats.value = res.data || res;
    } catch (err) {
        error.value = "Failed to load VC dashboard statistics";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchStats);

// Strict API fallbacks: 0 for numbers, N/A for strings
const val = (value) => (value !== undefined && value !== null ? value.toLocaleString() : '0');
const txt = (value) => value || 'N/A';
const perc = (value) => (value !== undefined && value !== null ? `${value}%` : '0%');
</script>

<template>
  <div class="w-full p-6">
    <n-spin :show="loading">
      <n-alert v-if="error" type="error" class="mb-6">{{ error }}</n-alert>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-5">

        <div class="md:col-span-4 bg-orbit-bg rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] font-bold opacity-70">Active Period</p>
            <h2 class="text-2xl font-black mt-2 leading-tight">{{ txt(stats?.appraisal_period?.name) }}</h2>

            <div class="mt-8 space-y-6">
                <div>
                    <p class="text-orbit-accent text-[10px] font-black uppercase tracking-widest">Total Appraisal Forms Submitted</p>
                    <p class="text-4xl font-black mt-1">{{ val(stats?.completed_appraisals) }}</p>
                </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold uppercase opacity-60">Appraisals Reviewed</span>
              <span class="text-xl font-bold text-orbit-accent">{{ val(stats?.approved_appraisals) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold uppercase opacity-60">Pending Appraisals</span>
              <span class="text-xl font-bold">{{ val(stats?.pending_appraisals) }}</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-8 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 class="font-semibold mb-10 text-xl text-orbit-bg">Performance Rating</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">

            <div class="flex items-center justify-between group">
              <div class="flex items-center space-x-4">
                <div class="w-1.5 h-12 rounded-full bg-orbit-blue group-hover:scale-y-110 transition-transform"></div>
                <p class="font-bold text-gray-700 text-sm leading-tight">Average Performance Rating</p>
              </div>
              <p class="text-orbit-green font-black text-2xl">{{ perc(stats?.average_performance) }}</p>
            </div>

            <div class="flex items-center justify-between group">
              <div class="flex items-center space-x-4">
                <div class="w-1.5 h-12 rounded-full bg-orbit-blue group-hover:scale-y-110 transition-transform"></div>
                <p class="font-bold text-gray-700 text-sm leading-tight">Lowest Performance Rating</p>
              </div>
              <p class="text-orbit-wa font-black text-2xl">{{ perc(stats?.lowest_performance) }}</p>
            </div>

            <div class="flex items-center justify-between group">
              <div class="flex items-center space-x-4">
                <div class="w-1.5 h-12 rounded-full bg-orbit-blue group-hover:scale-y-110 transition-transform"></div>
                <p class="font-bold text-gray-700 text-sm leading-tight">Promotion-Eligible Staff</p>
              </div>
              <p class="text-orbit-green font-black text-2xl">{{ val(stats?.eligible_staff) }}</p>
            </div>

            <div class="flex items-center justify-between group">
              <div class="flex items-center space-x-4">
                <div class="w-1.5 h-12 rounded-full bg-orbit-blue group-hover:scale-y-110 transition-transform"></div>
                <p class="font-bold text-gray-700 text-sm leading-tight">Low-Performance Flags</p>
              </div>
              <p class="text-orbit-wa font-black text-2xl">{{ val(stats?.performance_flags) }}</p>
            </div>

          </div>

          <div class="mt-12 pt-6 border-t border-gray-50 flex items-center justify-between">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total University Staff Force</span>
              <span class="text-orbit-bg font-black text-xl">{{ val(stats?.total_staff) }}</span>
          </div>
        </div>

      </div>
    </n-spin>
  </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }
.bg-orbit-blue { background-color: #003366; }
.text-orbit-accent { color: #00d1ff; }
.text-orbit-green { color: #10b981; }
.text-orbit-wa { color: #f59e0b; }

/* Subtle entrance animation */
.grid > div {
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>