<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Promotion Rate
        </h2>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Performance by Department
        </p>
      </div>

      <div class="flex p-1 bg-gray-50 rounded-xl border border-gray-100 self-start md:self-auto">
        <button
          v-for="r in ranges"
          :key="r.value"
          @click="setRange(r.value)"
          :class="[
            'px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg',
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
         <p class="text-xs font-bold text-orbit-bg">{{ stat.value }}</p>
      </div>
    </div>

    <div class="relative min-h-[400px]">
      <vue-apex-charts
        type="bar"
        height="400"
        :options="computedOptions"
        :series="chartSeries"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const selectedRange = ref('month')

const ranges = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
]

// Dynamic Quick Stats
const quickStats = computed(() => {
  const data = chartSeries.value[0].data
  return [
    { label: 'Total Promotions', value: data.reduce((a, b) => a + b, 0) },
    { label: 'Lead Dept', value: 'Mathematics' },
    { label: 'Avg Rate', value: (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1) },
    { label: 'Retention', value: '94%' }
  ]
})

const categories = ["Computer Science", "Physics", "Chemistry", "Mathematics", "Statistics"]
const chartSeries = ref([{ name: "Promotions", data: [5, 12, 8, 15, 6] }])

const computedOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false, // Horizontal bar for better readability of dept names
      barHeight: '60%',
      distributed: true,
      dataLabels: { position: 'right' }
    }
  },
  // Orbit Brand Palette
  colors: ['#003366', '#004080', '#0059b3', '#0073e6', '#2388ff'],
  dataLabels: {
    enabled: true,
    offsetX: 20,
    style: {
      fontSize: '10px',
      fontWeight: '800',
      colors: ["#334155"]
    }
  },
  legend: { show: false },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    yaxis: { lines: { show: false } }
  },
  xaxis: {
    categories: categories,
    labels: {
      style: {
        colors: '#94a3b8',
        fontSize: '10px',
        fontWeight: '700'
      }
    },
    axisBorder: { show: false },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '10px',
        fontWeight: '800',
        cssClass: 'uppercase-tracking'
      }
    }
  },
  tooltip: {
    theme: 'light',
    x: { show: true },
    y: {
      formatter: (val) => val + ' Staff Promoted'
    }
  }
}))

const setRange = (range) => {
  selectedRange.value = range
  // Switch logic matching your data structure
  const dataMap = {
    week: [2, 4, 1, 5, 2],
    month: [5, 12, 8, 15, 6],
    year: [20, 45, 30, 55, 25]
  }
  chartSeries.value = [{ name: "Promotions", data: dataMap[range] }]
}
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

:deep(.uppercase-tracking) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>