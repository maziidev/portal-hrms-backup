<template>
  <div class="bg-white p-8 rounded-3xl space-y-6">
    <h3 class="font-bold text-2xl text-orbit-bg">Leave Approval Analytic</h3>

    <!-- Donut Chart -->
    <BaseChart
      type="donut"
      :height="200"
      :series="series"
      :options="chartOptions"
      :showSwitcher="true"
      :ranges="['Week', 'Month', 'Year']"
      :onRangeChange="updateChart"
    />

    <!-- Legend / Stats -->
    <div class="flex flex-col space-y-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 rounded-full bg-orbit-blue"></div>
          <h3 class="text-orbit-blue font-semibold">Approved Leave</h3>
        </div>
        <p class="font-bold text-2xl">{{ approved }}</p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 rounded-full bg-[#2B4DED]"></div>
          <h3 class="text-[#2B4DED] font-semibold">Rejected Leaves</h3>
        </div>
        <p class="font-bold text-2xl">{{ rejected }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseChart from "@/components/base/BaseChart.vue";
import { getLeaveStats } from "@/apis/services/hou/leave.services.js";

/**
 * FALLBACK DATA
 */
const fallbackStats = {
  week: { approved: 25, rejected: 75 },
  month: { approved: 100, rejected: 50 },
  year: { approved: 500, rejected: 150 },
};

/**
 * STATE
 */
const approved = ref(fallbackStats.week.approved);
const rejected = ref(fallbackStats.week.rejected);
const series = ref([approved.value, rejected.value]);

/**
 * APEX OPTIONS
 */
const chartOptions = ref({
  labels: ["Approved Leaves", "Rejected Leaves"],
  dataLabels: {
    enabled: true,
    formatter: (val) => `${Math.round(val)}%`,
  },
  colors: ["#2388ff", "#2B4DED"],
  plotOptions: {
    pie: {
      expandOnClick: false,
      customScale: 0.99,
      donut: { size: "40%", labels: { show: false } },
    },
  },
  legend: { show: false },
});

/**
 * BUILD / UPDATE CHART
 */
const buildChart = (stats) => {
  const approvedVal = Number(stats.approved) || fallbackStats.week.approved;
  const rejectedVal = Number(stats.rejected) || fallbackStats.week.rejected;

  approved.value = approvedVal;
  rejected.value = rejectedVal;
  series.value = [approvedVal, rejectedVal];
};

/**
 * FETCH API & INIT
 */
const fetchAnalytics = async (range = "week") => {
  try {
    const data = await getLeaveStats(range); // API expects optional range param
    buildChart(data);
  } catch (err) {
    // fallback if API fails
    buildChart(fallbackStats[range.toLowerCase()] || fallbackStats.week);
  }
};

/**
 * RANGE SWITCHER
 */
const updateChart = (range) => fetchAnalytics(range.toLowerCase());

onMounted(() => fetchAnalytics("week"));
</script>
