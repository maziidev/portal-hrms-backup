<script setup>
import {
    getLeaveAppraisalSummaryStats,
    getStaffSummaryStats
} from "@/apis/management/staff";
import { computed, onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const loading = ref(true);
const summaryData = ref(null);
const activityData = ref(null);
const activeRange = ref('month');

const chartRanges = [
  { label: 'Week',  value: 'week'  },
  { label: 'Month', value: 'month' },
  { label: 'Year',  value: 'year'  },
];

const fetchDashboardStats = async () => {
    loading.value = true;
    try {
        const [staffRes, activityRes] = await Promise.all([
            getStaffSummaryStats(),
            getLeaveAppraisalSummaryStats()
        ]);

        summaryData.value = staffRes.data || staffRes;
        activityData.value = activityRes.data || activityRes;

    } catch (err) {
        console.error("HOU Dashboard Sync Error:", err);
    } finally {
        loading.value = false;
    }
};

const managementRows = computed(() => [
  {
    label: 'Promotion Track',
    sub: 'Staff eligible for next cycle',
    value: summaryData.value?.eligible_promotions || 0,
    iconColor: 'text-orange-600 bg-orange-50'
  },
  {
    label: 'Active Unit Staff',
    sub: 'Current on-duty personnel',
    value: summaryData.value?.active_count || 0,
    iconColor: 'text-blue-600 bg-blue-50'
  },
  {
    label: 'Unit Vacancies',
    sub: 'Positions awaiting fulfillment',
    value: summaryData.value?.open_positions || 0,
    iconColor: 'text-purple-600 bg-purple-50'
  },
  {
    label: 'Pending Actions',
    sub: 'Appraisals & Promotions',
    value: (summaryData.value?.pending_promotions || 0) + (summaryData.value?.pending_appraisals || 0),
    iconColor: 'text-emerald-600 bg-emerald-50'
  }
]);

const chartSeries = computed(() => {
  const current = activityData.value?.[activeRange.value] || {};
  return [{
    name: 'Unit Metrics',
    data: [
        current.appraisals || 0,
        current.disciplinary || 0,
        current.promotions || 0,
        current.leaves || 0 // This will safely show 0 until backend is fixed
    ],
  }];
});

const chartOptions = computed(() => ({
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  plotOptions: {
    bar: { horizontal: true, borderRadius: 8, barHeight: '70%', distributed: true },
  },
  // Blue for Appraisals, Red for Disc, Orange for Promo, Emerald for Leave
  colors: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981'],
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: { fontSize: '12px', fontWeight: '900', colors: ['#fff'] },
    offsetX: 10,
  },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4, yaxis: { lines: { show: false } } },
  xaxis: {
    categories: ["Appraisals", "Disciplinary Cases", "Promotions", "Leave requests"],
    labels: { style: { colors: '#64748b', fontSize: '10px', fontWeight: '800' } },
  },
  yaxis: {
    labels: { style: { colors: '#003366', fontSize: '11px', fontWeight: '900' } },
  },
  tooltip: { theme: 'dark' },
  legend: { show: false }
}));

const setChartRange = (range) => { activeRange.value = range; };
onMounted(fetchDashboardStats);
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 px-6 pb-10">

    <div class="lg:col-span-4 flex flex-col space-y-8">

      <div class="bg-orbit-blue text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden border border-white/10 group">
        <span class="absolute -right-6 -bottom-10 text-[160px] font-black text-white/5 pointer-events-none select-none italic leading-none">
            {{ summaryData?.total_count ? 'Σ' : 'U' }}
        </span>

        <div class="relative z-10">
            <div class="flex items-center space-x-2 opacity-60">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <h4 class="text-[10px] font-black uppercase tracking-[0.4em]">Unit Workforce</h4>
            </div>

            <div class="flex items-end justify-between mt-6">
                <div>
                    <h3 class="text-6xl font-black tracking-tighter leading-none">
                        {{ summaryData?.total_count || '0' }}
                    </h3>
                    <p class="text-[10px] font-bold text-blue-200/50 uppercase mt-2 tracking-widest">Total Unit Staff</p>
                </div>

                <div class="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-4 py-2 rounded-2xl flex flex-col items-end">
                    <span class="text-emerald-400 text-sm font-black italic">+{{ summaryData?.new_this_month || 0 }}</span>
                    <span class="text-[8px] text-emerald-400/60 font-black uppercase tracking-tighter">Monthly Growth</span>
                </div>
            </div>
        </div>
      </div>

      <div class="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-[0_20px_50px_rgba(0,51,102,0.04)] space-y-4">
        <div v-for="(stat, idx) in managementRows" :key="idx"
          class="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:bg-gray-50 group border border-transparent hover:border-gray-100">

          <div class="flex items-center space-x-4">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs', stat.iconColor]">
               {{ idx + 1 }}
            </div>
            <div class="flex flex-col">
              <span class="font-black text-orbit-bg text-[13px] uppercase tracking-tighter leading-none">{{ stat.label }}</span>
              <span class="text-[10px] text-gray-400 font-bold mt-1 tracking-tight">{{ stat.sub }}</span>
            </div>
          </div>

          <div class="text-right">
            <p class="text-2xl font-black text-gray-800 tracking-tighter">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 flex flex-col relative overflow-hidden">
      <div class="absolute right-[-2%] top-[-5%] text-[150px] font-black text-gray-50 pointer-events-none select-none italic tracking-tighter uppercase">Activity</div>

      <div class="relative z-10 flex items-center justify-between mb-10">
        <div>
          <h2 class="text-3xl font-black text-orbit-bg uppercase italic tracking-tighter leading-none">Unit Activity</h2>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Staff operational tracking</p>
        </div>

        <div class="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-100">
          <button v-for="r in chartRanges" :key="r.value" @click="setChartRange(r.value)"
            :class="['px-6 py-2 text-[10px] font-black uppercase rounded-xl transition-all duration-300',
            activeRange === r.value ? 'bg-orbit-blue text-white shadow-lg' : 'text-gray-400 hover:text-orbit-bg']">
            {{ r.label }}
          </button>
        </div>
      </div>

      <div class="relative z-10 bg-gray-50/50 rounded-3xl p-6 border border-gray-50">
        <vue-apex-charts type="bar" height="380" :options="chartOptions" :series="chartSeries" />
      </div>
    </div>

  </div>
</template>