<script setup>
import { getDivisionOngoingAppraisals } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import ApexCharts from 'apexcharts';
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();
const { divisionId } = storeToRefs(authStore);

const chartRef = ref(null);
let chart = null;

// Range State: 'week', 'month', or 'year'
const selectedRange = ref('month');

const chartOptions = {
    chart: { type: 'bar', height: 400, toolbar: { show: false }, fontFamily: 'inherit' },
    series: [{ name: "Completion %", data: [] }],
    legend: { show: true, position: 'top' },
    xaxis: {
        categories: [],
        labels: { style: { fontWeight: 700, colors: '#64748b' } }
    },
    dataLabels: { enabled: false },
    plotOptions: {
        bar: {
            borderRadius: 8,
            columnWidth: '40%',
            borderRadiusApplication: 'end'
        }
    },
    colors: ['#2388ff'],
    grid: { borderColor: '#f1f5f9' },
    tooltip: { theme: 'dark' }
};

const initChart = () => {
    if (chartRef.value) {
        chart = new ApexCharts(chartRef.value, chartOptions);
        chart.render();
    }
};

const updateChartData = async () => {
    if (!divisionId.value) return;

    try {
        // Passing the range as a parameter to the backend
        const res = await getDivisionOngoingAppraisals(divisionId.value, {
            range: selectedRange.value
        });

        const data = res.data || res;

        const categories = data.map(item => item.unit_name || 'N/A');
        const seriesData = data.map(item => item.progress || 0);

        if (chart) {
            chart.updateOptions({
                xaxis: { categories: categories },
                series: [{ name: "Completion %", data: seriesData }]
            });
        }
    } catch (err) {
        console.error("Chart Data Error:", err);
    }
};

// Function to handle range selection
const setRange = (range) => {
    selectedRange.value = range;
};

onMounted(() => {
    initChart();
    updateChartData();
});

// Watch for both division changes and range selection changes
watch([divisionId, selectedRange], () => {
    updateChartData();
});
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between px-10 py-8 gap-4">
            <h2 class="text-2xl text-orbit-bg font-black uppercase tracking-tighter italic">
                Appraisal Completion by Unit
            </h2>

            <div class="bg-gray-100 p-1.5 rounded-2xl flex items-center space-x-1">
                <button
                    @click="setRange('week')"
                    :class="selectedRange === 'week' ? 'bg-white text-orbit-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'"
                    class="px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
                >
                    Week
                </button>
                <button
                    @click="setRange('month')"
                    :class="selectedRange === 'month' ? 'bg-white text-orbit-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'"
                    class="px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
                >
                    Month
                </button>
                <button
                    @click="setRange('year')"
                    :class="selectedRange === 'year' ? 'bg-white text-orbit-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'"
                    class="px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
                >
                    Year
                </button>
            </div>
        </div>

        <div class="px-6 pb-6">
            <div ref="chartRef"></div>
        </div>
    </div>
</template>