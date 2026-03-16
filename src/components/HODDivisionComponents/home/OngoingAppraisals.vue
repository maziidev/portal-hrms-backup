<script setup>
import { getDivisionOngoingAppraisals } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import { debounce } from 'lodash-es';
import { NDataTable, NInput, NProgress, NSelect } from 'naive-ui';
import { storeToRefs } from "pinia";
import { computed, h, onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();
const { divisionId } = storeToRefs(authStore);

// State
const rawData = ref([]);
const loading = ref(false);
const searchKeyword = ref('');
const selectedStatus = ref(null);

/**
 * DYNAMIC STATUS OPTIONS
 * This extracts unique statuses from the rawData returned by the backend
 */
const statusOptions = computed(() => {
    const statuses = [...new Set(rawData.value.map(item => item.status))];
    return statuses.filter(Boolean).map(status => ({
        label: status.toUpperCase(),
        value: status
    }));
});

/**
 * COLUMNS
 */
const columns = [
    {
        title: 'Department Unit',
        key: 'unit_name',
        align: 'center',
        render: (row) => h('span', { class: 'font-black text-orbit-bg uppercase tracking-tighter' }, row.unit_name || 'N/A')
    },
    {
        title: 'Appraisal Batch',
        key: 'batch_name',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold text-gray-600 uppercase text-[11px]' }, row.batch_name || '2025 Mid-Year')
    },
    {
        title: 'Start Date',
        key: 'start_date',
        align: 'center',
        render: (row) => h('div', { class: 'flex items-center justify-center space-x-2' }, [
            h('img', { src: '/assets/img/calendar.png', class: 'w-4 h-4 opacity-70' }),
            h('span', { class: 'font-bold text-gray-500 text-xs' }, row.start_date || 'N/A')
        ])
    },
    {
        title: 'Progress',
        key: 'progress',
        align: 'center',
        width: 180,
        render: (row) => h('div', { class: 'flex items-center justify-center space-x-3' }, [
            h(NProgress, {
                type: 'line',
                percentage: row.progress || 0,
                showIndicator: false,
                color: '#2388ff',
                railColor: '#f1f5f9',
                height: 8,
                borderRadius: 4,
                style: { width: '80px' }
            }),
            h('span', { class: 'font-black text-xs text-gray-800' }, `${row.progress || 0}%`)
        ])
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        render: (row) => h('button', {
            class: 'bg-blue-50 text-blue-600 font-black uppercase text-[10px] px-6 py-2 rounded-md w-32 justify-center transition-all'
        }, row.status || 'Ongoing')
    },
    {
        title: 'Action',
        key: 'actions',
        align: 'center',
        render: () => h('button', {
            class: 'bg-orbit-blue text-white font-black uppercase text-[10px] px-8 py-2 rounded-full hover:bg-black transition-all transform hover:scale-105 shadow-sm'
        }, 'Review')
    }
];

/**
 * FETCH RECORDS
 */
const fetchRecords = async () => {
    if (!divisionId.value) return;

    loading.value = true;
    try {
        const params = {
            search: searchKeyword.value,
            status: selectedStatus.value
        };

        const res = await getDivisionOngoingAppraisals(divisionId.value, params);
        // Handle both standard axios response and direct data return
        const data = res?.data || res;
        rawData.value = Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("API Error:", err);
    } finally {
        loading.value = false;
    }
};

const debouncedFetch = debounce(fetchRecords, 500);

// Watchers
watch(selectedStatus, () => fetchRecords());
watch(searchKeyword, () => debouncedFetch());
watch(divisionId, (newId) => { if (newId) fetchRecords(); });

onMounted(fetchRecords);
</script>

<template>
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 mt-8 overflow-hidden">
        <div class="p-8 border-b border-gray-50 bg-white">
            <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h4 class="text-3xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
                        Ongoing Appraisals
                    </h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3">
                        Division Management Cycle
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <n-input
                        v-model:value="searchKeyword"
                        placeholder="SEARCH UNITS..."
                        size="large"
                        clearable
                        style="width: 280px"
                    />

                    <n-select
                        v-model:value="selectedStatus"
                        :options="statusOptions"
                        placeholder="FILTER BY STATUS"
                        clearable
                        size="large"
                        style="width: 240px"
                    />
                </div>
            </div>
        </div>

        <div class="w-full">
            <n-data-table
                :loading="loading"
                :columns="columns"
                :data="rawData"
                :bordered="false"
                :scroll-x="1200"
                class="premium-table"
            />
        </div>
    </div>
</template>

<style scoped>
:deep(.n-data-table-th) {
    background-color: transparent !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    font-size: 11px !important;
    letter-spacing: 0.1em !important;
    color: #1a1a1a !important;
    border-bottom: 2px solid #000 !important;
    padding: 20px 16px !important;
}

:deep(.n-data-table-td) {
    padding: 24px 16px !important;
    border-bottom: 1px solid #f8fafc !important;
}

:deep(.n-data-table-tr:hover td) {
    background-color: #fcfdfe !important;
}

.bg-orbit-blue { background-color: #2388ff; }
.text-orbit-bg { color: #1a1a1a; }
</style>