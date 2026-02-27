<script setup>
import { getAllStaff } from "@/apis/management/staff";
import { useAuthStore } from '@/store/auth.js';
import { debounce } from 'lodash-es';
import { NDataTable, NInput, NInputNumber, NPagination, NSelect, NTag, useMessage } from 'naive-ui';
import { h, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter()
const route = useRoute()
const message = useMessage()

const staffData = ref([])
const loading = ref(false)
const totalRecords = ref(0)
const jumpToPageValue = ref(1)

const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')
const selectedStatus = ref(null)
const dateRange = ref(null)

const statusOptions = [
    { label: 'Approved', value: 'approved' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Review', value: 'in_review' },
    { label: 'Returned', value: 'returned' }
]

const columns = [
    {
        title: 'Staff ID',
        key: 'staff_id',
        minWidth: 150,
        fixed: 'left',
        render: (row) => h('span', { class: 'font-black text-[#003366] uppercase tracking-tighter text-base' }, row.staff_id || 'N/A')
    },
    {
        title: 'Staff Name',
        key: 'full_name',
        minWidth: 250,
        render: (row) => h('span', { class: 'font-bold text-gray-700 uppercase' }, row.full_name || row.user?.full_name || 'N/A')
    },
    {
        title: 'Position',
        key: 'designation',
        minWidth: 200,
        render: (row) => h('span', { class: 'font-bold text-gray-500' }, row.designation || 'N/A')
    },
    {
        title: 'Appraisal Period',
        key: 'period',
        minWidth: 200,
        render: (row) => h('div', { class: 'flex items-center gap-2' }, [
             h('span', { class: 'font-bold text-gray-600' }, row.appraisal_period || 'MAY-AUG 2025')
        ])
    },
    {
        title: 'Rating',
        key: 'rating_dean',
        align: 'center',
        minWidth: 120,
        render: (row) => h('span', { class: 'font-black text-[#003366] text-lg' }, row.rating_dean ? `${row.rating_dean}/5` : '---')
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        minWidth: 200,
        render: (row) => {
            const status = row.status?.toLowerCase() || 'pending';
            const typeMap = { 'approved': 'success', 'pending': 'warning', 'in_review': 'info', 'returned': 'error' };
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
        const departmentId = route.params.id; // From URL: /appraisal-department/:id

        const params = {
            dept_code: departmentId,
            page: currentPage.value,
            page_size: pageSize.value
        };

        if (searchKeyword.value) params.search = searchKeyword.value;
        if (selectedStatus.value) params.status = selectedStatus.value;

        const res = await getAllStaff(params);

        const responseData = res.data || res;
        staffData.value = responseData.results || responseData || [];
        totalRecords.value = responseData.count || staffData.value.length;
    } catch (err) {
        console.error("Fetch Error:", err);
        message.error("Failed to load staff records");
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

const debouncedSearch = debounce(fetchRecords, 500)
watch([selectedStatus, dateRange, currentPage, pageSize], fetchRecords)
watch(searchKeyword, () => {
    currentPage.value = 1
    debouncedSearch()
})

onMounted(fetchRecords)
</script>

<template>
    <div class="px-6 mt-4">
        <button @click="router.back()" class="flex items-center gap-2 text-[#003366] font-black uppercase italic text-[10px] hover:gap-4 transition-all border-none bg-transparent cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path></svg>
            Back to Departments
        </button>
    </div>

    <div class="px-6">
        <div class="bg-white rounded-xl shadow-sm mt-5 overflow-hidden border border-gray-100">
            <div class="p-8">
                <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                    <div class="shrink-0">
                        <h4 class="text-3xl font-black text-[#003366] tracking-tighter uppercase italic leading-none">
                            Department Staff Appraisals
                        </h4>
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3 italic border-l-4 border-blue-400 pl-4">
                            Individual Performance Tracking
                        </p>
                    </div>
                    <div class="flex flex-wrap items-center gap-3 xl:justify-end">
                        <n-input
                            v-model:value="searchKeyword"
                            placeholder="SEARCH NAME / ID..."
                            size="large"
                            style="width: 240px;"
                            class="orbit-search-input"
                            clearable
                        />
                        <n-select
                            v-model:value="selectedStatus"
                            :options="statusOptions"
                            placeholder="STATUS"
                            size="large"
                            style="width: 160px;"
                            clearable
                        />
                        <button class="bg-[#003366] text-white px-6 h-10 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20">
                            Approve All
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full border-t border-gray-50 overflow-x-auto">
                <n-data-table
                    remote
                    :loading="loading"
                    :columns="columns"
                    :data="staffData"
                    :bordered="false"
                    :single-line="false"
                    :scroll-x="1400"
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
                    <span class="text-[10px] font-black text-[#003366] uppercase tracking-tighter">Jump to</span>
                    <n-input-number v-model:value="jumpToPageValue" :min="1" size="small" style="width: 70px;" :show-button="false" />
                    <button @click="handleJumpToPage" class="bg-[#003366] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-900 transition-colors">
                        Go
                    </button>
                </div>
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