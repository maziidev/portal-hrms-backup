<template>
  <div class="bg-white px-8 py-6 rounded-2xl border border-gray-100 shadow-sm h-full">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div>
        <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Staff Availability</h2>
        <h3 class="text-lg font-black text-orbit-bg italic">Promotion Trends Over 3 Years</h3>
      </div>

      <div class="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
        <button
          v-for="year in [2023, 2024, 2025]"
          :key="year"
          @click="updateChart(year)"
          :class="[
            'px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all duration-300',
            selectedYear === year
              ? 'bg-orbit-blue text-white shadow-lg shadow-blue-900/20'
              : 'text-gray-400 hover:text-orbit-bg'
          ]"
        >
          {{ year }}
        </button>
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

const selectedYear = ref(2025);

// Dummy Data Sets
const dataSets = {
  2023: [45, 52, 38, 65, 48, 55, 40, 30],
  2024: [60, 75, 50, 80, 70, 62, 55, 45],
  2025: [82, 60, 55, 70, 70, 82, 90, 50]
};

const series = ref([{
  name: "Trend %",
  data: dataSets[2025]
}]);

const updateChart = (year) => {
  selectedYear.value = year;
  series.value = [{
    name: "Trend %",
    data: dataSets[year]
  }];
};

const chartOptions = ref({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 6,
      borderRadiusApplication: 'end',
      distributed: true
    }
  },
  colors: ['#2388ff', '#1e7ae6', '#1a6bcc', '#155db3', '#114f99', '#0c4080', '#083266', '#04234d'],
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

<style scoped>
.text-orbit-bg { color: #002347; }
</style>