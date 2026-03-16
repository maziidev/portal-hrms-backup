<script setup>
import { getAllStaff } from "@/apis/management/staff"; // Use the Staff API
import { debounce } from 'lodash-es';
import { NDataTable, NDatePicker, NInput, NInputNumber, NPagination, NSelect, useMessage } from 'naive-ui';
import { h, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const message = useMessage()

// Data State
const staffData = ref([])
const loading = ref(false)
const totalRecords = ref(0)
const jumpToPageValue = ref(1)

// Filters State
const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')
const selectedRole = ref(null)
const selectedStatus = ref(null)
const dateRange = ref(null)

// Options
const roleOptions = [
    { label: 'Exam Officer', value: 'exam_officer' },
    { label: 'Level Adviser', value: 'level_adviser' },
    { label: 'Dept Secretary', value: 'secretary' }
]

const statusOptions = [
    { label: 'Full Time', value: 'full_time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Part Time', value: 'part_time' }
]

// Table Columns
const columns = [
    { title: 'Staff ID', key: 'staff_id', render: (row) => h('span', { class: 'font-black text-orbit-bg' }, row.staff_id) },
    { title: 'Name', key: 'full_name', render: (row) => h('span', { class: 'font-bold' }, row.full_name) },
    { title: 'Cadre', key: 'cadre' },
    { title: 'Rank', key: 'rank' },
    { title: 'Role', key: 'role' },
    {
        title: 'Employment Type',
        key: 'employment_type',
        render: (row) => h('span', { class: 'text-xs uppercase font-bold text-gray-400' }, row.employment_type?.replace('_', ' '))
    },
    {
        title: 'Employment Date',
        key: 'employment_date',
        render: (row) => h('div', { class: 'flex items-center gap-2' }, [
            h('span', row.employment_date || 'N/A')
        ])
    }
]

const fetchRecords = async () => {
    loading.value = true
    try {
        const params = {
            page: currentPage.value,
            page_size: pageSize.value,
            search: searchKeyword.value || undefined,
            role: selectedRole.value || undefined,
            employment_type: selectedStatus.value || undefined,
            dept_code: route.params.id || undefined
        }

        if (dateRange.value) {
            params.date_from = new Date(dateRange.value[0]).toISOString().split('T')[0]
            params.date_to = new Date(dateRange.value[1]).toISOString().split('T')[0]
        }

        const res = await getAllStaff(params)
        staffData.value = res.results || res.data?.results || []
        totalRecords.value = res.count || res.data?.count || 0
    } catch (err) {
        message.error("Failed to load department records")
    } finally {
        loading.value = false
    }
}


const handleJumpToPage = () => {
    if (jumpToPageValue.value >= 1 && jumpToPageValue.value <= Math.ceil(totalRecords.value / pageSize.value)) {
        currentPage.value = jumpToPageValue.value
    }
}

const handleRowClick = (row) => {
    router.push(`/staffs/${row.id}`)
}

const debouncedSearch = debounce(fetchRecords, 500)

watch([currentPage, pageSize, selectedRole, selectedStatus, dateRange], fetchRecords)
watch(searchKeyword, () => {
    currentPage.value = 1
    debouncedSearch()
})

onMounted(fetchRecords)
</script>

<template>
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 mt-5 overflow-hidden">
        <div class="p-6 md:p-8 border-b border-gray-50">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h4 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
                        Department Records
                    </h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                        Personnel Management System
                    </p>
                </div>
                <button class="bg-orbit-blue text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#002244] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    Export Records
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <n-input v-model:value="searchKeyword" placeholder="SEARCH NAME / ID..." clearable class="orbit-input" />
                <n-select v-model:value="selectedRole" :options="roleOptions" placeholder="SELECT ROLE" clearable />
                <n-select v-model:value="selectedStatus" :options="statusOptions" placeholder="STATUS" clearable />
                <n-date-picker v-model:value="dateRange" type="daterange" clearable placeholder="JOINED DATE RANGE" />
            </div>
        </div>

        <div class="w-full overflow-x-auto overflow-y-hidden scroll-container">
            <n-data-table
                remote
                ref="table"
                :loading="loading"
                :columns="columns"
                :data="staffData"
                :bordered="false"
                :single-line="false"
                :scroll-x="1000"
                :row-props="(row) => ({
                    style: 'cursor: pointer;',
                    onClick: () => handleRowClick(row)
                })"
                class="custom-records-table"
            />
        </div>

        <div class="p-6 md:p-8 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
            <n-pagination
                v-model:page="currentPage"
                :item-count="totalRecords"
                :page-size="pageSize"
                show-size-picker
                :page-sizes="[10, 20, 50]"
            />

            <div class="flex items-center gap-3 bg-gray-100 p-1.5 pl-4 rounded-xl border border-gray-200">
                <span class="text-[10px] font-black text-orbit-bg uppercase tracking-tighter">Jump to Page</span>
                <n-input-number v-model:value="jumpToPageValue" :min="1" size="small" class="w-20" :show-button="false" />
                <button @click="handleJumpToPage" class="bg-orbit-blue text-white px-4 py-1.5 rounded-lg text-[10px] font-black hover:opacity-90 transition-all uppercase">
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

:deep(.n-data-table-thead th) {
    background-color: #f8fafc !important;
    font-size: 12px !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    color: #001a33 !important;
    padding: 20px 16px !important;
    border-bottom: 2px solid #e2e8f0 !important;
}


:deep(.n-data-table-td) {
    padding: 20px 16px !important;
    border-bottom: 1px solid #f1f5f9 !important;
    color: #334155;
    font-size: 13px;
    white-space: nowrap;
}


:deep(.n-data-table-tr:hover td) {
    background-color: #f0f7ff !important;
}


.scroll-container::-webkit-scrollbar {
    height: 6px;
}
.scroll-container::-webkit-scrollbar-track {
    background: #f1f5f9;
}
.scroll-container::-webkit-scrollbar-thumb {
    background: #00336644;
    border-radius: 10px;
}


:deep(.n-pagination-prefix) {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 10px;
}
</style>