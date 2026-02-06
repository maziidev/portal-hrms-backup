<script setup>
import { onMounted, ref } from 'vue';
import { getUnitSummaryStats } from '../../apis/services/hou/unit.service';
import ActiveSessionBar from '../../components/base/ActiveSessionBar.vue';
import BaseChart from '../../components/base/BaseChart.vue';
import DashboardStatsCard from '../../components/base/DashboardStatsCard.vue';

const chartSeries = ref([]);
const chartCategories = ['Appraisals', 'Disciplinary Cases', 'Promotions', 'Leave Requests'];

// Fetch stats from API
const fetchStats = async () => {
  const stats = await getUnitSummaryStats();
  chartSeries.value = [
    {
      name: 'Unit Summary',
      data: [
        stats.appraisals,
        stats.disciplinary,
        stats.promotions,
        stats.leaves
      ]
    }
  ];
};

onMounted(() => {
  fetchStats();
});

// Reactive chart options
import { ref as vueRef } from 'vue';
const chartOptions = vueRef({
  xaxis: { categories: chartCategories },
  colors: ['#00bcd4'],
  plotOptions: { bar: { borderRadius: 6 } },
  dataLabels: { enabled: false }
});
</script>

<template>
  <ActiveSessionBar />
  <div class="p-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4">
    <DashboardStatsCard role="HOU" />
    <BaseChart
      title="Unit Summary Chart"
      :type="'bar'"
      :series="chartSeries"
      :options="chartOptions"
    />
  </div>
</template>
