<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Years-in-Rank
        </h2>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Staff Seniority Distribution
        </p>
      </div>

      <div class="h-10 hidden md:block"></div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2 border-b border-gray-50">
      <div v-for="stat in quickStats" :key="stat.label">
         <p class="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{{ stat.label }}</p>
         <p class="text-xs font-bold text-orbit-bg">{{ stat.value }}</p>
      </div>
    </div>

    <div class="relative min-h-100">
      <vue-apex-charts
        type="bar"
        height="400"
        :options="rankChartOptions"
        :series="rankSeries"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const quickStats = [
  { label: 'Highest Seniority', value: 'Professor' },
  { label: 'Avg Tenure', value: '2.4 Years' },
  { label: 'Fastest Track', value: 'Lecturer I' },
  { label: 'Total Ranks', value: '6 Levels' }
]

const rankSeries = ref([{
  name: "Avg. Years",
  data: [3.2, 2.5, 1.8, 2.1, 3.4, 1.2]
}])

const rankChartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit'
  },
  plotOptions: {
    bar: {
      horizontal: false, // Flipped to vertical
      columnWidth: '45%', // Same width as Promotion chart
      borderRadius: 6,
      borderRadiusApplication: 'end',
      distributed: true,
      dataLabels: { position: 'top' }
    }
  },
  // Same color palette sequence as previous chart
  colors: ['#003366', '#004080', '#0059b3', '#0073e6', '#2388ff', '#60a5fa'],
  dataLabels: {
    enabled: true,
    offsetY: -20,
    formatter: (val) => val + 'y',
    style: {
      fontSize: '10px',
      fontWeight: '800',
      colors: ["#334155"]
    }
  },
  legend: { show: false },
  grid: {
    show: true,
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } } // Horizontal lines for vertical chart
  },
  xaxis: {
    categories: [
      "Professor",
      "Reader",
      "Senior Lec.",
      "Lec. I",
      "Lec. II",
      "Asst. Lec."
    ],
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
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '10px',
        fontWeight: '800'
      },
      formatter: (val) => val + ' yrs'
    }
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (val) => val + " Years in Rank"
    }
  }
}))
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

:deep(.uppercase-tracking) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>