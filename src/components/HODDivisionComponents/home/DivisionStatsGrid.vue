<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5 p-6 bg-[#F6F7F9]">

    <div class="bg-[#09090B] p-1.5 rounded-[2rem] flex flex-col shadow-2xl transition-all duration-500 hover:ring-2 hover:ring-orbit-cyan/30">
      <div class="bg-[#121214] m-0.5 p-7 rounded-[1.7rem] flex-1 flex flex-col justify-between border border-white/[0.03]">
        <div>
          <div class="flex items-center gap-2 mb-6">
            <div class="w-1.5 h-1.5 rounded-full bg-orbit-cyan"></div>
            <span class="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">Division Control</span>
          </div>

          <div class="flex items-baseline gap-3">
            <span
              class="text-white text-6xl font-black tracking-[-0.06em] leading-none transition-opacity duration-300"
              :class="{ 'opacity-20': loading }"
            >
              {{ stats.total_departments || 0 }}
            </span>
            <span class="text-orbit-cyan font-bold text-[10px] uppercase tracking-tighter">Units Active</span>
          </div>
        </div>

        <div class="mt-12 space-y-5 border-t border-white/5 pt-7">
          <div class="flex justify-between items-end">
            <span class="text-white/30 text-[9px] font-bold uppercase tracking-widest">Force Count</span>
            <span class="text-white font-black text-xl tabular-nums leading-none">
              {{ stats.total_staff || 0 }}
            </span>
          </div>
          <div class="flex justify-between items-end">
            <span class="text-white/30 text-[9px] font-bold uppercase tracking-widest">Active Cycle</span>
            <span class="text-orbit-accent font-black text-xl tabular-nums leading-none">
              {{ stats.active_appraisals || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(kpi, index) in kpiData"
      :key="kpi.label"
      class="relative bg-white border border-[#E4E7EB] rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-300 hover:border-orbit-blue hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] group"
    >
      <span class="absolute top-8 right-8 text-[#F1F3F6] font-black text-5xl italic leading-none pointer-events-none group-hover:text-orbit-blue/5 transition-colors">
        0{{ index + 1 }}
      </span>

      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2.5">
          <span class="text-[#8E929E] text-[10px] font-black uppercase tracking-[0.25em]">
            {{ kpi.label }}
          </span>
          <div class="h-0.5 w-5 bg-[#09090B] group-hover:w-12 group-hover:bg-orbit-blue transition-all duration-500"></div>
        </div>

        <div class="flex items-baseline">
          <span
            class="text-7xl font-black text-[#09090B] tracking-[-0.05em] tabular-nums transition-opacity duration-300"
            :class="{ 'opacity-10': loading }"
          >
            {{ kpi.value }}
          </span>
        </div>
      </div>

      <div class="mt-6 flex items-center gap-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div class="w-1 h-1 rounded-full bg-orbit-blue"></div>
        <span class="text-[9px] font-black uppercase tracking-widest text-orbit-blue">Analytical View</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDivisionHeadStats } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from 'vue';

const authStore = useAuthStore();
const { divisionId } = storeToRefs(authStore);

const stats = ref({});
const loading = ref(false);

const fetchStats = async () => {
  if (!divisionId.value) return;
  loading.value = true;
  try {
    const response = await getDivisionHeadStats(divisionId.value);
    stats.value = response.data || {};
  } catch (error) {
    console.error("HOD Stats Fetch Error:", error);
  } finally {
    loading.value = false;
  }
};

watch(divisionId, (newId) => {
  if (newId) fetchStats();
}, { immediate: true });

const kpiData = computed(() => [
  { label: "Pending Reviews", value: stats.value.pending_reviews || 0 },
  { label: "Promotion Requests", value: stats.value.total_promotion_requests || 0 },
  { label: "Performance index", value: (stats.value.performance_index || 0) + '%' }
]);
</script>

<style scoped>
/* High-End Number Formatting */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Sharp Rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Subtle background contrast */
.bg-white {
  background-color: #ffffff;
}
</style>