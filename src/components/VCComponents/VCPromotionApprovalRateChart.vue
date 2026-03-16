<template>
  <div class="bg-white px-8 py-6 rounded-2xl border border-gray-100 shadow-sm h-full">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Staff Availability</h2>
        <h3 class="text-lg font-black text-orbit-bg italic">Promotion Approval Rate by Faculty</h3>
      </div>

    </div>

    <div id="leaveUtils">
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const series = ref([{
  name: "Trend %",
  data: [82, 60, 55, 70, 70, 82, 90, 50]
}]);

const chartOptions = ref({
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 6,
          borderRadiusApplication: 'end',
      horizontal: true,
      distributed: true
    }
  },
  colors: ['#2388ff'],
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: {
    categories: ["Art", "Agric", "BioSci", "Mgt", "Edu", "Engr", "Env. Sci", "Phy. Sci"],
    labels: { style: { fontWeight: '700', fontSize: '10px', colors: '#64748b' } },
    axisBorder: { show: false }
  },
  yaxis: {
    labels: { style: { fontWeight: '700', colors: '#94a3b8' } }
  },
  grid: { borderColor: '#f8fafc', strokeDashArray: 4 }
});
</script>