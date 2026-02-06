<script setup>
import { FileText, UserPlus } from 'lucide-vue-next';
import { onMounted, ref } from "vue";
import ActionButton from "../../components/base/ActionButton.vue";
import ActiveSessionBar from "../../components/base/ActiveSessionBar.vue";
import BaseChart from "../../components/base/BaseChart.vue";
import DashboardStatsCard from "../../components/base/DashboardStatsCard.vue";
import StaffActivityTable from "../../components/HeadOfUnit/home/StaffActivityTable.vue";



// categories for the chart
const chartCategories = ["Appraisals", "Disciplinary Cases", "Promotions", "Leave Requests"];


const dummyStats = {
  week: { appraisals: 5, disciplinary: 2, promotions: 1, leaves: 4 },
  month: { appraisals: 20, disciplinary: 8, promotions: 5, leaves: 15 },
  year: { appraisals: 200, disciplinary: 50, promotions: 30, leaves: 120 },
};

const chartSeries = ref([]);

const updateChart = (range) => {
  const data = dummyStats[range.toLowerCase()];
  chartSeries.value = [
    {
      name: "Unit Summary",
      data: [data.appraisals, data.disciplinary, data.promotions, data.leaves],
    },
  ];
};

// initialize chart with Week data
onMounted(() => updateChart("Week"));

const chartOptions = {
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
      }
    },
    zoom: { enabled: true }
  },
    xaxis: {
        categories: chartCategories,
        labels: { rotate: -95 }
    },
  colors: ["#2388ff"],
  plotOptions: { bar: {  horizontal: true } }
};
</script>

<template>
  <ActiveSessionBar />

  <section id="stat_chart" class="p-6 grid grid-cols-1 lg:grid-cols-[700px_1fr] gap-4">

    <DashboardStatsCard role="HOU" />

    <BaseChart
      title="Unit Summary Chart"
      :type="'bar'"
      :series="chartSeries"
      :options="chartOptions"
      :showSwitcher="true"
      :ranges="['Week', 'Month', 'Year']"
      :onRangeChange="updateChart"
    />

  </section>

    <!-- Quick Actions -->

    <section id="quick_actions" class="p-6 space-y-4">
        <h2 class="text-xl font-semibold">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

            <ActionButton
            label="New Appraisal Review"
            :icon="FileText"
            />
            <ActionButton
            label="Approve Leave"
            :icon="UserPlus"

            />
            <ActionButton
            label="Generate Unit Report"
            :icon="FileText"

            />
            <ActionButton
            label="Send Notification"
            :icon="FileText"
            />
        </div>

    </section>

    <section class="p-6 space-y-4">
        <StaffActivityTable/>
    </section>

</template>
