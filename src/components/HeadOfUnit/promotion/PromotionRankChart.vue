<template>
  <BaseChart
    title="Staff Rank Distribution"
    :type="'bar'"
    :height="400"
    :series="series"
    :options="chartOptions"
  />
</template>

<script setup>
import BaseChart from "@/components/base/BaseChart.vue";
import { ref } from "vue";

// Dummy data
const series = ref([
  { name: "Rank in years", data: [3, 2, 1, 2, 3, 1] },
]);

const chartOptions = ref({
  chart: {
    type: "bar",
    height: 400,
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "80%",
      borderRadius: 4,
      borderRadiusApplication: "end",
    },
  },
  xaxis: {
    categories: [
      "Professor",
      "Reader",
      "Senior Lecturer",
      "Lecturer I",
      "Lecturer II",
      "Assistant Lecturer",
    ],
  },
  dataLabels: { enabled: false },
  colors: ["#2388ff"],
});
</script>
