<template>
  <div class="bg-white px-6 py-6 rounded-2xl border border-gray-100 shadow-sm h-full">
    <div class="mb-6">
      <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1 text-center">Funding Allocation</h2>
      <h3 class="text-md font-black text-orbit-bg italic text-center">Research Grants Distribution</h3>
    </div>

    <div id="grantChart">
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
  name: "Grants (Millions)",
  data: [82, 60, 55, 70, 70, 82, 90, 50]
}]);

const chartOptions = ref({
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '40%',
      borderRadius: 4,
      borderRadiusApplication: 'end'
    }
  },
  colors: ['#2388ff'],
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: { colors: ['#fff'], fontSize: '10px', fontWeight: 'bold' },
    formatter: (val) => val + "M",
    offsetX: 0
  },
  xaxis: {
    categories: ["Art", "Agriculture", "BioScience", "Management", "Education", "Engineering", "Env. Science", "Phy. Science"],
    labels: { style: { fontWeight: '700', fontSize: '10px', colors: '#94a3b8' } }
  },
  yaxis: {
    labels: { style: { fontWeight: '800', fontSize: '10px', colors: '#003366' } }
  },
  grid: { show: false }
});
</script>