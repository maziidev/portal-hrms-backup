<template>
  <div class="p-2">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-orbit-blue px-8 py-10 flex flex-col justify-between rounded-[2rem] text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
        <p class="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-4">Pending Promotions</p>
        <div class="flex items-end justify-between">
          <p class="text-5xl font-black italic leading-none">{{ stats.pending_count || 0 }}</p>
          <div class="bg-white/20 p-3 rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>
      </div>

      <div class="bg-white px-8 py-10 flex flex-col justify-between rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Endorsed</p>
        <div class="flex items-end justify-between">
          <p class="text-5xl font-black italic text-orbit-bg leading-none">{{ stats.approved_count || 0 }}</p>
          <div class="bg-green-50 text-green-600 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>
      </div>

      <div class="bg-white px-8 py-10 flex flex-col justify-between rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Deferred</p>
        <div class="flex items-end justify-between">
          <p class="text-5xl font-black italic text-orbit-bg leading-none">{{ stats.deferred_count || 0 }}</p>
          <div class="bg-orange-50 text-orange-600 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
        </div>
      </div>

      <div class="bg-white px-8 py-10 flex flex-col justify-between rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Total Cycles</p>
        <div class="flex items-end justify-between">
          <p class="text-5xl font-black italic text-orbit-bg leading-none">{{ stats.total_applications || 0 }}</p>
          <div class="bg-blue-50 text-blue-600 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVCDashboardStats } from "@/apis/management/vc";
import { useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';

const message = useMessage();
const loading = ref(false);
const stats = ref({
  pending_count: 0,
  approved_count: 0,
  deferred_count: 0,
  total_applications: 0
});

const fetchStats = async () => {
  loading.value = true;
  try {
    const res = await getVCDashboardStats();
    // Assuming the API returns the object directly or wrapped in data
    const data = res.data || res;

    // Logic to handle if API returns an array
    if (Array.isArray(data)) {
        stats.value = data[0];
    } else {
        stats.value = data;
    }
  } catch (err) {
    // If the 401 hits, we keep the dummy 0s or set defaults
    console.error("Stats Fetch Error", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStats);
</script>

<style scoped>
.font-black {
  font-weight: 900;
}
</style>