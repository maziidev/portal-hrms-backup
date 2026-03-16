<script setup>
import { getVCDepartmentRecords } from "@/apis/management/vc";
import { useAuthStore } from '@/store/auth.js';
import { debounce } from 'lodash-es';
import { NDataTable, NDatePicker, NInput, NInputNumber, NPagination, NSelect, NTag, useMessage } from 'naive-ui';
import { h, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter()
const route = useRoute()
const message = useMessage()

const departmentData = ref([])
const loading = ref(false)
const totalRecords = ref(0)
const jumpToPageValue = ref(1)

const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')
const selectedStatus = ref(null)
const dateRange = ref(null)

const statusOptions = [
    { label: 'Submitted', value: 'submitted' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
    { label: 'In Progress', value: 'in_progress' }
]

const columns = [
    {
        title: 'Departments',
        key: 'name', // Updated to match API
        minWidth: 300,
        fixed: 'left',
        render: (row) => h('span', { class: 'font-black text-orbit-bg uppercase tracking-tighter text-base' }, row.name || 'N/A')
    },
    {
        title: 'HOD',
        key: 'dept_hod',
        minWidth: 200,
        render: (row) => h('span', { class: 'font-bold text-gray-500' }, row.dept_hod || 'N/A')
    },
    {
        title: 'Total Staff',
        key: 'staff_count', // Updated to match API
        align: 'center',
        minWidth: 120,
        render: (row) => h('span', { class: 'font-bold text-gray-700' }, row.staff_count || 0)
    },
    {
        title: 'Active Appraisals',
        key: 'active_appraisals',
        align: 'center',
        minWidth: 150,
        render: (row) => h('span', { class: 'font-bold' }, row.active_appraisals || 0)
    },
    {
        title: 'Completion (%)',
        key: 'completion_rate',
        align: 'center',
        minWidth: 180,
        render: (row) => {
            // Calculated or fetched percentage
            const rate = row.completion_rate || 0;
            return h('div', { class: 'flex flex-col items-center gap-1' }, [
                h('span', { class: 'text-green-600 font-black text-lg' }, `${rate}%`),
                h('div', { class: 'w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden' }, [
                    h('div', { class: 'h-full bg-green-500 transition-all duration-500', style: `width: ${rate}%` })
                ])
            ])
        }
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        minWidth: 200,
        render: (row) => {
            const status = row.status?.toLowerCase() || 'pending';
            const typeMap = { 'completed': 'success', 'pending': 'warning', 'in_progress': 'info', 'submitted': 'info' };
            return h(NTag, {
                bordered: false,
                type: typeMap[status] || 'default',
                class: 'font-black uppercase text-[10px] px-8 py-2.5 rounded-lg w-full max-w-[150px] justify-center'
            }, { default: () => status.replace('_', ' ') });
        }
    }
]

const fetchRecords = async () => {
    loading.value = true
    try {
        const facultyId = auth.facultyId;
        if (!facultyId) return;

        const params = {};
        if (searchKeyword.value) params.search = searchKeyword.value;
        if (selectedStatus.value) params.status = selectedStatus.value;
        if (dateRange.value && dateRange.value.length === 2) {
            params.start_date = new Date(dateRange.value[0]).toISOString().split('T')[0];
            params.end_date = new Date(dateRange.value[1]).toISOString().split('T')[0];
        }

        const res = await getVCDepartmentRecords(facultyId, params);

        const responseData = res.data || res;
        departmentData.value = responseData.departments || [];
        totalRecords.value = departmentData.value.length;
    } catch (err) {
        console.error("Fetch Error:", err);
        if (err.response?.status === 401) {
            message.error("Session expired. Please login again.");
        } else {
            message.error("Failed to load department records (404/400)");
        }
    } finally {
        loading.value = false
    }
}

const handleJumpToPage = () => {
    const totalPages = Math.ceil(totalRecords.value / pageSize.value);
    if (jumpToPageValue.value >= 1 && jumpToPageValue.value <= totalPages) {
        currentPage.value = jumpToPageValue.value
    }
}

const handleRowClick = (row) => {
    router.push(`/appraisal-department/${row.id}`)
}

const debouncedSearch = debounce(fetchRecords, 500)
watch([selectedStatus, dateRange, currentPage, pageSize], fetchRecords)
watch(searchKeyword, () => {
    currentPage.value = 1
    debouncedSearch()
})

onMounted(fetchRecords)
</script>

<template>
    <div class="bg-white rounded-xl shadow-sm mt-5 overflow-hidden border border-gray-100">
        <div class="p-8">
            <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div class="shrink-0">
                    <h4 class="text-3xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
                        Departments Appraisals
                    </h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3">
                        Institutional Performance Tracking
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-3 xl:justify-end">
                    <n-input
                        v-model:value="searchKeyword"
                        placeholder="SEARCH..."
                        size="large"
                        style="width: 240px;"
                        class="orbit-search-input"
                        clearable
                    >
                        <template #prefix>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </template>
                    </n-input>

                    <n-select
                        v-model:value="selectedStatus"
                        :options="statusOptions"
                        placeholder="STATUS"
                        size="large"
                        style="width: 160px;"
                        clearable
                    />

                    <n-date-picker
                        v-model:value="dateRange"
                        type="daterange"
                        size="large"
                        style="width: 280px;"
                        clearable
                        placeholder="DATE UPDATED"
                    />
                </div>
            </div>
        </div>

        <div class="w-full border-t border-gray-50 overflow-x-auto">
            <n-data-table
                remote
                :loading="loading"
                :columns="columns"
                :data="departmentData"
                :bordered="false"
                :single-line="false"
                :scroll-x="1400"
                :row-props="(row) => ({
                    style: 'cursor: pointer;',
                    onClick: () => handleRowClick(row)
                })"
                class="department-table"
            />
        </div>

        <div class="p-8 border-t border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-6">
            <n-pagination
                v-model:page="currentPage"
                :item-count="totalRecords"
                v-model:page-size="pageSize"
                show-size-picker
                :page-sizes="[10, 20, 50]"
            />

            <div class="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-gray-200 shadow-sm">
                <span class="text-[10px] font-black text-orbit-bg uppercase tracking-tighter">Jump to</span>
                <n-input-number v-model:value="jumpToPageValue" :min="1" size="small" style="width: 70px;" :show-button="false" />
                <button @click="handleJumpToPage" class="bg-orbit-blue text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-900 transition-colors">
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.n-data-table-thead th) {
    background-color: #ffffff !important;
    font-size: 13px !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    color: #003366 !important;
    padding: 24px !important;
    border-bottom: 4px solid #f1f5f9 !important;
}

:deep(.n-data-table-td) {
    padding: 24px !important;
    font-size: 14px;
    border-bottom: 1px solid #f8fafc !important;
}

:deep(.n-input .n-input__border),
:deep(.n-select .n-base-selection__border),
:deep(.n-date-picker .n-input__border) {
    border-radius: 12px !important;
    border: 1.5px solid #f1f5f9 !important;
}
</style>