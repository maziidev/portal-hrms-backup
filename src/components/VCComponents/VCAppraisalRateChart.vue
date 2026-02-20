<template>
  <div class="bg-white px-6 py-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div class="mb-8">
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Departmental Metrics</span>
      <h2 class="font-black text-orbit-bg text-lg tracking-tight mt-1">
        Appraisal Completion Rate % by Faculty
      </h2>
    </div>

    <div id="chart-completion">
      <apexchart
        type="bar"
        height="400"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
const series = [{
  name: "Completion Rate",
  data: [82, 60, 55, 70, 70, 82, 90, 50]
}];

const chartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '35%',
      borderRadius: 4,
      borderRadiusApplication: 'end'
    }
  },
  xaxis: {
    categories: ["Art", "Agriculture", "BioScience", "Management", "Education", "Engineering", "Env. Science", "Phy. Science"],
    max: 100,
    labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
  },
  yaxis: {
    labels: { style: { colors: '#003366', fontWeight: 700 } }
  },
  grid: {
    borderColor: '#f1f5f9',
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } }
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => `${val}%`,
    style: { fontSize: '10px', colors: ['#fff'] },
    offsetX: -10
  },
  colors: ['#2388FF'],
  tooltip: {
    theme: 'dark'
  }
};
</script>