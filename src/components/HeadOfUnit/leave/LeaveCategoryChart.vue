<template>
  <div class="bg-white p-8 rounded-xl">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-xl text-orbit-bg">Leave Category Distribution</h3>
    </div>

    <BaseChart
      :type="'bar'"
      :height="500"
      :series="series"
      :options="chartOptions"
      :showSwitcher="true"
      :ranges="['Week', 'Month', 'Year']"
      :onRangeChange="updateChart"
    />
  </div>
</template>

<script setup>
import { getLeaveTypeStats } from "@/apis/services/hou/leave.services.js";
import BaseChart from "@/components/base/BaseChart.vue";
import { onMounted, ref } from "vue";

/** =====================
 * FALLBACK DATA
 * ===================== */
const fallback = {
  week: [5, 10, 8, 4, 5],
  month: [20, 30, 25, 10, 15],
  year: [200, 150, 180, 75, 120],
  categories: ["Annual Leave", "Maternity Leave", "Study Leave", "Sick Leave", "Other"],
};

/** =====================
 * STATE
 * ===================== */
const series = ref([]);
const chartOptions = ref({
  xaxis: { categories: [] },
  plotOptions: { bar: { barHeight: "80%", borderRadius: 4 } },
  dataLabels: { enabled: true },
  colors: ["#2388ff"],
});

/** =====================
 * BUILD CHART
 * Handles fallback when API returns empty
 * ===================== */
const buildChart = (data, range = "week") => {
  const hasData = Array.isArray(data) && data.length > 0;

  const values = hasData
    ? data.map((item) => item.value)
    : fallback[range.toLowerCase()];

  const categories = hasData
    ? data.map((item) => item.label)
    : fallback.categories;

  series.value = [{ name: "Leave Category", data: values }];
  chartOptions.value.xaxis.categories = categories;
};

/** =====================
 * FETCH API DATA
 * ===================== */
const fetchData = async (range = "week") => {
  try {
    const stats = await getLeaveTypeStats();
    buildChart(stats, range);
  } catch (err) {
    buildChart(null, range); // fallback if API fails
  }
};

/** =====================
 * RANGE SWITCHER
 * ===================== */
const updateChart = (range) => fetchData(range.toLowerCase());

/** =====================
 * INITIAL LOAD
 * Show fallback immediately, then try API
 * ===================== */
onMounted(() => {
  buildChart(null, "week"); // immediate fallback
  fetchData("week");         // API attempt
});
</script>
