<script setup>
import { getDepartmentPromotions } from "@/apis/management/dean";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  XCircle
} from "lucide-vue-next";
import { NSpin } from "naive-ui";
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(false);
const rawData = ref([]); // Defaults to empty array, so filters return 0

const fetchStats = async () => {
  // Priority: take id from route params
  const departmentId = route.params.id || route.params.departmentId;
  if (!departmentId) return;

  loading.value = true;
  try {
    const { data } = await getDepartmentPromotions(departmentId);

    // Support all common API response formats
    if (Array.isArray(data)) {
      rawData.value = data;
    } else if (data && data.results) {
      rawData.value = data.results;
    } else if (data && data.data) {
      rawData.value = data.data;
    } else {
      rawData.value = [];
    }
  } catch (err) {
    console.error("Promotion Stats Error:", err);
    rawData.value = []; // Fallback to 0 on error
  } finally {
    loading.value = false; // Guaranteed to stop spinner
  }
};

// Computed stats: if rawData is empty, these naturally become 0
const stats = computed(() => {
  const list = rawData.value || [];
  return {
    pending: list.filter(p => p.status === 'UNDER_REVIEW').length,
    endorsed: list.filter(p => p.status === 'ENDORSED').length,
    rejected: list.filter(p => p.status === 'REJECTED').length,
    completed: list.filter(p => p.status === 'COMPLETED').length,
  };
});

onMounted(fetchStats);

// Watch for route changes to refresh data without a page reload
watch(() => route.params.id, fetchStats);

const cardItems = computed(() => [
  {
    label: 'Pending Promotions',
    value: stats.value.pending,
    icon: Clock,
    color: 'text-white',
    bg: 'bg-orbit-bg',
    desc: 'Under Review'
  },
  {
    label: 'Endorsed Promotions',
    value: stats.value.endorsed,
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-white',
    desc: 'Dean Endorsed'
  },
  {
    label: 'Rejected Requests',
    value: stats.value.rejected,
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-white',
    desc: 'Disapproved'
  },
  {
    label: 'Promotions Completed',
    value: stats.value.completed,
    icon: TrendingUp,
    color: 'text-orbit-bg',
    bg: 'bg-white',
    desc: 'Fully Processed'
  }
]);
</script>

<template>
  <div class="p-6 relative">
    <div v-if="loading" class="absolute top-2 right-6 z-50">
      <n-spin size="small" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(item, index) in cardItems"
        :key="index"
        :class="[
          item.bg,
          'relative overflow-hidden group p-6 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
        ]"
      >
        <div class="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform">
          <component :is="item.icon" :size="100" />
        </div>

        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div
              :class="[
                item.bg === 'bg-orbit-bg' ? 'bg-white/20' : 'bg-gray-50',
                'p-3 rounded-2xl transition-colors'
              ]"
            >
              <component
                :is="item.icon"
                :size="22"
                :class="item.bg === 'bg-orbit-bg' ? 'text-white' : item.color"
              />
            </div>
            <ArrowUpRight
              :size="18"
              :class="item.bg === 'bg-orbit-bg' ? 'text-white/40' : 'text-gray-300'"
            />
          </div>

          <div>
            <p
              :class="[
                item.bg === 'bg-orbit-bg' ? 'text-white/70' : 'text-gray-500',
                'text-[10px] font-black uppercase tracking-[0.15em] mb-1'
              ]"
            >
              {{ item.label }}
            </p>
            <div class="flex items-baseline space-x-2">
              <h2
                :class="[
                  item.bg === 'bg-orbit-bg' ? 'text-white' : 'text-slate-900',
                  'text-3xl font-black tracking-tighter'
                ]"
              >
                {{ item.value }}
              </h2>
              <span
                 :class="[
                  item.bg === 'bg-orbit-bg' ? 'text-white/50' : 'text-gray-400',
                  'text-[10px] font-bold italic'
                ]"
              >
                {{ item.desc }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

.shadow-sm {
  box-shadow: 0 4px 20px -2px rgba(0, 51, 102, 0.05);
}
</style>