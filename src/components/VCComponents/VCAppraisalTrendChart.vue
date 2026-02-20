<script setup>
import { ref } from 'vue';

const activePeriod = ref('Q2');

const quarterlyData = {
    'Q1': [45, 52, 38, 24, 33, 26, 21, 20],
    'Q2': [82, 60, 55, 70, 70, 82, 90, 50],
    'Q3': [35, 41, 62, 42, 13, 18, 29, 37],
    'Q4': [87, 57, 74, 99, 75, 38, 62, 47]
};

const series = ref([{
  name: "Performance Score",
  data: quarterlyData['Q2']
}]);

const updatePeriod = (q) => {
    activePeriod.value = q;
    series.value = [{
        name: "Performance Score",
        // Spread to ensure a fresh array reference for smooth reactivity
        data: [...quarterlyData[q]]
    }];
};

const chartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit',
    // Bumping the animation settings for that "slow/smooth" feel
    animations: {
      enabled: true,
      easing: 'linear', // Linear or easeinout works best for bar growth
      speed: 1000,      // Normal animation speed (1 second)
      animateGradually: {
          enabled: true,
          delay: 150    // Staggers the bars slightly so they don't all move at once
      },
      dynamicAnimation: {
          enabled: true,
          speed: 1200   // This handles the transition speed when data updates
      }
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 6,
      borderRadiusApplication: 'end',
    }
  },
  xaxis: {
    categories: ["Art", "Agriculture", "BioScience", "Management", "Education", "Engineering", "Env. Science", "Phy. Science"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
  },
  yaxis: {
    max: 100,
    labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
  },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
  },
  dataLabels: { enabled: false },
  colors: ['#003366'],
  tooltip: {
    theme: 'dark',
    y: { formatter: (val) => `${val}%` }
  }
};
</script>

<template>
  <div class="bg-white px-8 py-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
      <h2 class="font-black text-orbit-bg text-xl tracking-tight uppercase italic">
        Appraisal Performance Trend
      </h2>

      <div class="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100">
        <button
          v-for="q in ['Q1', 'Q2', 'Q3', 'Q4']"
          :key="q"
          :class="[
            'px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-500',
            activePeriod === q ? 'bg-orbit-bg text-white shadow-lg' : 'text-gray-400 hover:text-orbit-bg'
          ]"
          @click="updatePeriod(q)"
        >
          {{ q }}
        </button>
      </div>
    </div>

    <div id="chart-timeline">
      <apexchart
        type="bar"
        height="400"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }

/* Slow fade for the container on mount */
#chart-timeline {
    animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>