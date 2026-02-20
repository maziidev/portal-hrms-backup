<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8 flex flex-col h-full">

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Appraisal Completion
        </h2>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Institutional Rank by Faculty
        </p>
      </div>

      <div class="flex p-1 bg-gray-50 rounded-xl border border-gray-100 self-start md:self-auto">
        <button
          v-for="r in ranges"
          :key="r.value"
          @click="selectedRange = r.value"
          :class="[
            'px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg',
            selectedRange === r.value
              ? 'bg-orbit-bg text-white shadow-lg shadow-blue-900/20'
              : 'text-gray-400 hover:text-orbit-bg hover:bg-white'
          ]"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2 border-b border-gray-50">
      <div v-for="stat in quickStats" :key="stat.label">
         <p class="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{{ stat.label }}</p>
         <p class="text-xs font-black text-orbit-bg italic uppercase">{{ stat.value }}</p>
      </div>
    </div>

    <div class="relative flex-1 min-h-[350px]">
      <vue-apex-charts
        type="bar"
        height="100%"
        :options="computedOptions"
        :series="chartSeries"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const selectedRange = ref('Q1')

const ranges = [
  { label: 'Q1', value: 'Q1' },
  { label: 'Q2', value: 'Q2' },
  { label: 'Annual', value: 'annual' },
]

// --- DUMMY DATA REPOSITORY ---
const dummyDatasets = {
  Q1: [82, 60, 55, 70, 70, 82, 90, 50],
  Q2: [45, 88, 72, 30, 90, 65, 50, 80],
  annual: [95, 80, 85, 90, 88, 92, 98, 85]
}

// FIX: chartSeries must be computed to react to range changes
const chartSeries = computed(() => [{
  name: "Rate% by Faculty",
  data: dummyDatasets[selectedRange.value]
}])

const categories = ["Art", "Agriculture", "BioScience", "Management", "Education", "Engineering", "Env. Science", "Phy. Science"]

const quickStats = computed(() => {
  const currentData = dummyDatasets[selectedRange.value];
  const avg = (currentData.reduce((a, b) => a + b, 0) / currentData.length).toFixed(1);

  return [
    { label: 'Top Faculty', value: categories[currentData.indexOf(Math.max(...currentData))] },
    { label: 'Lowest Faculty', value: categories[currentData.indexOf(Math.min(...currentData))] },
    { label: 'Avg Rate', value: `${avg}%` },
    { label: 'Growth', value: selectedRange.value === 'Q1' ? '+0.0%' : '+6.2%' },
  ]
})

const computedOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit',
    animations: { enabled: true, easing: 'easeinout', speed: 800 }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '45%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
      distributed: true,
    }
  },
  colors: ['#0073e6'],
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    formatter: (val) => val + '%',
    style: { fontSize: '10px', fontWeight: '800' },
    offsetX: 10
  },
  grid: {
    borderColor: '#f1f5f9',
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } }
  },
  xaxis: {
    categories: categories,
    max: 100,
    labels: { style: { colors: '#94a3b8', fontSize: '9px', fontWeight: '700' } }
  },
  yaxis: {
    labels: { style: { colors: '#64748b', fontSize: '10px', fontWeight: '800', cssClass: 'uppercase-tracking' } }
  },
  legend: { show: false },
  tooltip: { theme: 'light', y: { formatter: (val) => val + '%' } }
}))
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }
:deep(.uppercase-tracking) { text-transform: uppercase; letter-spacing: 0.05em; }
</style>