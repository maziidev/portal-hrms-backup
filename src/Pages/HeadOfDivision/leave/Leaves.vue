<template>
    <div class="p-6 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-orbit-bg px-6 py-8 flex items-center justify-between rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div>
                    <p class="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Total Appraisals</p>
                    <p class="text-3xl font-black">{{ stats?.total_appraisals || 0 }}</p>
                </div>
                <div class="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Clock :size="28" class="text-white" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all duration-300 group">
                <div>
                    <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Completed</p>
                    <p class="text-3xl font-black text-orbit-bg">{{ stats?.completed_appraisals || 0 }}</p>
                </div>
                <div class="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <FileCheck :size="28" class="text-emerald-600" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl border border-slate-100 shadow-sm hover:border-rose-200 transition-all duration-300 group">
                <div>
                    <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Pending Reviews</p>
                    <p class="text-3xl font-black text-orbit-bg">{{ stats?.pending_reviews || 0 }}</p>
                </div>
                <div class="p-3 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition-colors">
                    <XCircle :size="28" class="text-rose-600" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all duration-300 group">
                <div>
                    <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Promotion Requests</p>
                    <p class="text-3xl font-black text-orbit-bg">{{ stats?.promotion_requests || 0 }}</p>
                </div>
                <div class="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Calendar :size="28" class="text-blue-600" />
                </div>
            </div>
        </div>

        <div class="grid lg:grid-cols-[600px_1fr] gap-4">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h2 class="font-medium text-orbit-bg mb-4 text-xs font-black uppercase tracking-widest">Appraisal Status Metrics</h2>
                <VueApexCharts type="bar" height="350" :options="hodMetricsChart" :series="hodMetricsSeries" />
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="font-medium text-orbit-bg text-xs font-black uppercase tracking-widest">Submission Distribution</h2>
                    <div class="bg-gray-100 border border-gray-200 px-2 py-1 rounded-xl flex items-center space-x-1">
                        <button v-for="range in ['week', 'month', 'year']" :key="range" @click="updateRange(range)"
                            :class="[
                                'px-4 py-1 text-xs transition-all duration-200 capitalize',
                                activeRange === range ? 'font-bold rounded-lg bg-orbit-bg text-white shadow-md' : 'font-medium text-gray-500 hover:text-gray-700'
                            ]">
                            {{ range }}
                        </button>
                    </div>
                </div>
                <VueApexCharts type="bar" height="350" :options="hodCategoryChart" :series="hodCategorySeries" />
            </div>
        </div>

        <div class="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div class="font-bold text-2xl text-orbit-bg leading-relaxed uppercase tracking-tighter">Departments' Appraisal</div>
                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative flex-grow md:flex-grow-0">
                        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="18" />
                        <input v-model="searchKeyword" type="search" placeholder="Search unit..."
                            class="bg-gray-50 border border-gray-200 pl-12 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orbit-blue/20 w-full md:w-64" />
                    </div>
                </div>
            </div>

            <div class="w-full overflow-x-auto">
                <table class="min-w-full border-collapse">
                    <thead class="bg-gray-50/50 text-gray-500 uppercase text-[11px] font-black tracking-widest border-b border-gray-100">
                        <tr>
                            <th class="py-5 px-6 text-left">Unit</th>
                            <th class="py-5 px-6 text-center">Total Staff</th>
                            <th class="py-5 px-6 text-center">Submitted</th>
                            <th class="py-5 px-6 text-center">Pending</th>
                            <th class="py-5 px-6 text-center">Completed</th>
                            <th class="py-5 px-6 text-center">Last Updated</th>
                            <th class="py-5 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-gray-50">
                        <template v-if="!loading && filteredAppraisals.length > 0">
                            <tr v-for="unit in filteredAppraisals" :key="unit.id"
                                @click="navigateToUnit(unit.unit_id || unit.id)"
                                class="bg-white hover:bg-gray-50/50 transition cursor-pointer group">
                                <td class="p-6 text-left font-bold text-orbit-bg group-hover:text-blue-600 uppercase italic">
                                    {{ unit.unit_name || unit.name || 'N/A' }}
                                </td>
                                <td class="p-6 text-center font-black text-orbit-bg">
                                    {{ unit.total_staff || 0 }}
                                </td>
                                <td class="p-6 text-center font-bold text-gray-500">
                                    {{ unit.submitted || 0 }}
                                </td>
                                <td class="p-6 text-center font-bold text-orange-500">
                                    {{ unit.pending || 0 }}
                                </td>
                                <td class="p-6 text-center font-bold text-emerald-600">
                                    {{ unit.completed || 0 }}
                                </td>
                                <td class="p-6 text-center text-gray-400 font-bold">
                                    {{ unit.last_updated || '---' }}
                                </td>
                                <td class="p-6 text-center">
                                    <button :class="getStatusClass(unit.status)" class="font-bold py-2 px-6 w-32 rounded-lg text-[10px] uppercase tracking-widest">
                                        {{ unit.status || 'Active' }}
                                    </button>
                                </td>
                            </tr>
                        </template>

                        <tr v-else>
                            <td colspan="7" class="py-20 text-center text-gray-400 italic">
                                {{ loading ? 'Syncing registry...' : 'No appraisal records found.' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    getDivisionHeadStats,
    getDivisionOngoingAppraisals
} from "@/apis/management/divisionHead.js";
import {
    Calendar,
    Clock,
    FileCheck,
    Search,
    XCircle
} from 'lucide-vue-next';
import { useMessage } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import VueApexCharts from "vue3-apexcharts";

const router = useRouter();
const message = useMessage();

// State
const loading = ref(false);
const stats = ref(null);
const activeRange = ref('month');
const appraisalRecords = ref([]);
const searchKeyword = ref('');

// Context
const currentDivisionId = ref(1);

/** Navigation */
const navigateToUnit = (id) => {
    router.push(`/management/units/${id}`);
};

/** Range Update */
const updateRange = (range) => {
    activeRange.value = range;
    fetchAppraisalStats(range);
};

/** Chart Configurations */
const hodMetricsChart = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, barHeight: '70%', borderRadius: 6 } },
    xaxis: {
        categories: ["Total", "Pending", "Completed", "Promotions"],
        labels: { style: { colors: '#64748b', fontWeight: 600 } }
    },
    colors: ['#003366'],
    dataLabels: { enabled: true }
};

const hodMetricsSeries = computed(() => [{
    name: "Count",
    data: [
        stats.value?.total_appraisals || 0,
        stats.value?.pending_reviews || 0,
        stats.value?.completed_appraisals || 0,
        stats.value?.promotion_requests || 0
    ]
}]);

const hodCategoryChart = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 6 } },
    xaxis: {
        categories: ["Submitted", "Pending", "Completed"],
        labels: { style: { colors: '#64748b', fontWeight: 600 } }
    },
    colors: ['#2388ff'],
    dataLabels: { enabled: false }
};

const hodCategorySeries = computed(() => [{
    name: "Units Data",
    // Mapping total sums from all units in the registry
    data: [
        appraisalRecords.value.reduce((acc, curr) => acc + (curr.submitted || 0), 0),
        appraisalRecords.value.reduce((acc, curr) => acc + (curr.pending || 0), 0),
        appraisalRecords.value.reduce((acc, curr) => acc + (curr.completed || 0), 0),
    ]
}]);

/** Table Logic */
const filteredAppraisals = computed(() => {
    return appraisalRecords.value.filter(item => {
        const name = (item.unit_name || item.name || "").toLowerCase();
        return name.includes(searchKeyword.value.toLowerCase());
    });
});

const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'pending') return 'bg-orange-100 text-orange-600 border border-orange-200';
    if (s === 'completed') return 'bg-emerald-100 text-emerald-600 border border-emerald-200';
    return 'bg-blue-100 text-blue-600 border border-blue-200';
};

const fetchData = async () => {
    loading.value = true;
    try {
        const [statsRes, appraisalRes] = await Promise.all([
            getDivisionHeadStats(currentDivisionId.value),
            getDivisionOngoingAppraisals(currentDivisionId.value)
        ]);
        stats.value = statsRes.data || statsRes;
        appraisalRecords.value = appraisalRes.data || appraisalRes;
    } catch (err) {
        console.error("Backend Error:", err);
        message.error("The server is having trouble calculating stats (FieldError).");
    } finally {
        // This ensures the "Syncing registry..." text goes away
        loading.value = false;
    }
};

const fetchAppraisalStats = async (range) => {
    // Logic to call API with range from backendt
    try {
        const res = await getDivisionHeadStats(currentDivisionId.value, { range });
        stats.value = res.data || res;
    } catch (err) { console.error(err); }
};

onMounted(fetchData);
</script>
