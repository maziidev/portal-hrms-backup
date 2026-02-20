<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Appraisal Completion
        </h2>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Efficiency by Department
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

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
      <div v-for="stat in ['Top Dept', 'Lowest Dept', 'Avg Completion', 'Growth']" :key="stat">
         <p class="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{{ stat }}</p>
         <p class="text-xs font-bold text-orbit-bg">---</p>
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

const dummyData = {
  categories: ["Comp. Science", "Physics", "Chemistry", "Math", "Statistics"]
}

const chartSeries = ref([{ name: "Completion Rate", data: [65, 45, 88, 72, 30] }])

// Use Computed for options so they stay synced
const computedOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit',
    zoom: { enabled: false }
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      borderRadiusApplication: 'end',
      columnWidth: '45%',
      distributed: true, // Unique colors per bar
      dataLabels: { position: 'top' }
    }
  },
  // Orbit Gradient Colors
  colors: ['#003366', '#004080', '#0059b3', '#0073e6', '#2388ff'],
  dataLabels: {
    enabled: true,
    formatter: (val) => val + '%',
    offsetY: -20,
    style: {
      fontSize: '10px',
      fontWeight: '800',
      colors: ["#334155"]
    }
  },
  legend: { show: false }, // Hide because of distributed colors
  grid: {
    show: true,
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } }
  },
  xaxis: {
    categories: dummyData.categories,
    labels: {
      style: {
        colors: '#94a3b8',
        fontSize: '10px',
        fontWeight: '700',
        cssClass: 'uppercase-tracking'
      }
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    max: 100,
    labels: {
      style: {
        colors: '#94a3b8',
        fontSize: '10px',
        fontWeight: '700'
      },
      formatter: (val) => val + '%'
    }
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (val) => val + '% Completion'
    }
  }
}))

const setRange = (range) => {
  selectedRange.value = range
  // Simulating API update
  if (range === 'week') {
    chartSeries.value = [{ name: "Completion Rate", data: [25, 30, 15, 40, 10] }]
  } else if (range === 'month') {
    chartSeries.value = [{ name: "Completion Rate", data: [65, 45, 88, 72, 30] }]
  } else if (range === 'year') {
    chartSeries.value = [{ name: "Completion Rate", data: [85, 70, 95, 80, 75] }]
  }
}
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

/* Sharp input look */
button {
  letter-spacing: 0.1em;
}

:deep(.uppercase-tracking) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>