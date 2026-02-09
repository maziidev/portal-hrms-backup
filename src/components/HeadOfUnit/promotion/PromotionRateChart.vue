<template>
  <BaseChart
    title="Departmental Promotions"
    :type="'bar'"
    :height="400"
    :series="series"
    :options="chartOptions"
    :showSwitcher="true"
    :ranges="['week', 'month', 'year']"
    :onRangeChange="handleRangeChange"
  />
</template>

<script setup>
import BaseChart from "@/components/base/BaseChart.vue";
import { ref } from "vue";

const series = ref([
  { name: "Promotions", data: [5, 12, 8, 15, 6] },
]);

const chartOptions = ref({
  chart: { type: "bar", height: 400, toolbar: { show: false } },
  plotOptions: { bar: { barHeight: "80%", borderRadius: 4, borderRadiusApplication: "end" } },
  xaxis: { categories: ["Computer Science", "Physics", "Chemistry", "Mathematics", "Statistics"] },
  dataLabels: { enabled: false },
  colors: ["#2388ff"],
});

// Example function to handle range changes
const handleRangeChange = (range) => {

  // Replace  with actual API call or logic
  if (range === "week") {
    series.value[0].data = [1, 3, 2, 4, 3];
  } else if (range === "month") {
    series.value[0].data = [5, 12, 8, 15, 6];
  } else if (range === "year") {
    series.value[0].data = [50, 120, 80, 150, 60];
  }
};
</script>
