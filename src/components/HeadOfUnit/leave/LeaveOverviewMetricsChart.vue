<template>
  <div class="bg-white p-8 rounded-xl">
    <h3 class="font-bold text-xl text-orbit-bg">Overview Metrics</h3>
    <BaseChart
      :type="'bar'"
      :height="500"
      :series="series"
      :options="chartOptions"
      :showSwitcher="false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseChart from "@/components/base/BaseChart.vue";
import { getLeaveStats } from "@/apis/services/hou/leave.services.js";

/** FALLBACK DATA */
const fallback = {
  series: [{ name: "metrics overview", data: [56, 64, 76, 78, 70] }],
  categories: [
    "Total Leave Requests",
    "Pending Approvals",
    "Approved Leaves",
    "Rejected/Cancelled",
    "Ongoing Leaves",
  ],
};

/** STATE */
const series = ref(fallback.series);
const chartOptions = ref({
  xaxis: { categories: fallback.categories },
  plotOptions: { bar: { horizontal: true, barHeight: "80%", borderRadius: 4 } },
  dataLabels: { enabled: true },
  colors: ["#2388ff"],
});

/** BUILD CHART */
const buildChart = (stats) => {
  if (!stats) stats = {};
  const categories = [
    "Total Leave Requests",
    "Pending Approvals",
    "Approved Leaves",
    "Rejected/Cancelled",
    "Ongoing Leaves",
  ];

  const data = [
    stats.total_requests || fallback.series[0].data[0],
    stats.pending || fallback.series[0].data[1],
    stats.approved || fallback.series[0].data[2],
    stats.rejected || fallback.series[0].data[3],
    stats.active || fallback.series[0].data[4],
  ];

  series.value = [{ name: "metrics overview", data }];
  chartOptions.value.xaxis.categories = categories;
};

/** FETCH API */
const fetchData = async () => {
  try {
    const stats = await getLeaveStats();
    buildChart(stats);
  } catch (err) {
    buildChart(null); // fallback
  }
};

onMounted(fetchData);
</script>
