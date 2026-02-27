<template>
  <div class="px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div class="bg-white p-3 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition-all duration-500">
        <div class="bg-orbit-bg px-8 py-10 rounded-2xl text-white relative overflow-hidden">
          <div class="absolute -right-2 -bottom-2 opacity-10 rotate-12">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>

          <p class="text-xl text-orbit-accent font-bold mb-4 italic tracking-tighter">Total Promotion Applications</p>
          <p class="text-5xl font-black italic tracking-tighter">
            <n-number-animation :from="0" :to="stats.total_applications" />
          </p>
        </div>

        <div class="px-6 py-8 flex items-center justify-between">
          <p class="font-bold text-orbit-bg uppercase text-[10px] tracking-widest">Approved Promotions</p>
          <p class="text-3xl font-black text-orbit-blue/50 italic tracking-tighter">
            {{ stats.approved_count }}
          </p>
        </div>
      </div>

      <div class="bg-white py-10 px-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between group/row">
          <div class="flex items-center space-x-5">
            <div class="bg-orbit-blue w-1 h-10 rounded-full group-hover/row:h-12 transition-all"></div>
            <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Pending Applications</p>
          </div>
          <p class="text-3xl font-black text-orbit-green italic tracking-tighter">
            {{ stats.pending_count }}
          </p>
        </div>

        <div class="h-px w-full bg-gray-50 my-4"></div>

        <div class="flex items-center justify-between group/row">
          <div class="flex items-center space-x-5">
            <div class="bg-orbit-blue w-1 h-10 rounded-full group-hover/row:h-12 transition-all"></div>
            <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Involved Departments</p>
          </div>
          <p class="text-3xl font-black text-orbit-green italic tracking-tighter">
            {{ stats.dept_count }}
          </p>
        </div>
      </div>

      <div class="bg-white py-10 px-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between group/row">
          <div class="flex items-center space-x-5">
            <div class="bg-orbit-accent w-1 h-10 rounded-full group-hover/row:h-12 transition-all"></div>
            <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Current Cycle Status</p>
          </div>
          <p class="text-xl font-black text-orbit-bg italic tracking-tighter uppercase">
            {{ stats.status }}
          </p>
        </div>

        <div class="h-px w-full bg-gray-50 my-4"></div>

        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-3">
             <div class="flex items-center space-x-5">
                <div class="bg-orbit-blue w-1 h-10 rounded-full"></div>
                <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Approval Rate</p>
              </div>
            <p class="text-3xl font-black text-orbit-green italic tracking-tighter">
              {{ approvalRate }}%
            </p>
          </div>
          <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
             <div
               class="h-full bg-orbit-green transition-all duration-1000"
               :style="{ width: approvalRate + '%' }"
             ></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { getFacultiesPromotionStats } from "@/apis/management/vc";
import { NNumberAnimation } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';

const stats = ref({
  total_applications: 0,
  approved_count: 0,
  pending_count: 0,
  dept_count: 0,
  status: 'Loading...',
  last_updated: ''
});

const approvalRate = computed(() => {
  if (!stats.value.total_applications) return 0;
  return Math.round((stats.value.approved_count / stats.value.total_applications) * 100);
});

const fetchStats = async () => {
  try {
    const res = await getFacultiesPromotionStats();
    const dataArray = res.data || res;

    if (dataArray && dataArray.length > 0) {
      const remoteData = dataArray[0];
      stats.value = {
        total_applications: remoteData.total_applications || 0,
        approved_count: remoteData.approved_count || 0,
        pending_count: remoteData.pending_count || 0,
        dept_count: remoteData.dept_count || 0,
        status: remoteData.status || 'N/A',
        last_updated: remoteData.last_updated || ''
      };
    }
  } catch (err) {
    console.error("Promotion Stats Error:", err);
  }
};

onMounted(fetchStats);
</script>

<style scoped>
.text-orbit-accent { color: #00ffff; }
.bg-orbit-bg { background-color: #002347; }
.text-orbit-bg { color: #002347; }
.text-orbit-green { color: #10b981; }
.bg-orbit-green { background-color: #10b981; }
.text-orbit-blue { color: #2388ff; }
.bg-orbit-blue { background-color: #2388ff; }
</style>