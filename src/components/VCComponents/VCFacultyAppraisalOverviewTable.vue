<script setup>
import { getAppraisalCompletionRateByFaculty } from "@/apis/management/vc";
import { debounce } from 'lodash-es';
import { NDataTable, NDatePicker, NInput, NInputNumber, NPagination, NSelect, NTag, useMessage } from 'naive-ui';
import { h, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';
const router = useRouter()
const message = useMessage()

// --- DATA STATE ---
const tableData = ref([])
const loading = ref(false)
const totalRecords = ref(0)
const jumpToPageValue = ref(1)

// --- FILTERS STATE ---
const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')
const selectedFaculty = ref(null)
const dateRange = ref(null)
const selectedStatus = ref(null)

const facultyOptions = [
    { label: 'Art', value: 'Art' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Science', value: 'Faculty of Science' },
    { label: 'Management', value: 'Management' },
    { label: 'Education', value: 'Education' }
]

const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' }
]

const columns = [
    {
        title: 'Faculty / Division',
        key: 'faculty_name',
        render: (row) => h('span', { class: 'font-black text-[#003366]' }, row.faculty_name || 'N/A')
    },
    { title: 'Departments', key: 'total_departments', align: 'center', render: (row) => row.total_departments || '—' },
    { title: 'Total Staff', key: 'total_staff', align: 'center' },
    { title: 'Appraised', key: 'completed', align: 'center' },
    {
        title: 'Pending',
        key: 'pending_count',
        align: 'center',
        render: (row) => (row.total_staff - row.completed) || 0
    },
    {
        title: 'Avg Score / Rate',
        key: 'completion_rate',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold text-green-600' }, `${row.completion_rate || 0}%`)
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        render: (row) => {
            const statusLabel = row.completion_rate >= 100 ? 'completed' : 'in_progress';
            const statusMap = {
                'pending': { type: 'warning', label: 'Pending' },
                'in_progress': { type: 'info', label: 'In Progress' },
                'completed': { type: 'success', label: 'Completed' }
            };
            const config = statusMap[statusLabel];
            return h(NTag, {
                bordered: false,
                type: config.type,
                class: 'font-black uppercase text-[10px] px-4 py-1 rounded-md w-32'
            }, { default: () => config.label });
        }
    }
]

const fetchRecords = async () => {
    loading.value = true
    try {
        // --- FIXED: PAGE AND PAGE_SIZE REMOVED FROM API PARAMS ---
        const rawParams = {
            search: searchKeyword.value || null,
            faculty: selectedFaculty.value || null,
            status: selectedStatus.value || null,
        }

        if (dateRange.value && dateRange.value.length === 2) {
            rawParams.start_date = new Date(dateRange.value[0]).toISOString().split('T')[0]
            rawParams.end_date = new Date(dateRange.value[1]).toISOString().split('T')[0]
        }

        const cleanParams = Object.fromEntries(
            Object.entries(rawParams).filter(([_, v]) => v !== null && v !== '')
        );

        const res = await getAppraisalCompletionRateByFaculty(cleanParams)
        const responseData = res.data || res;

        tableData.value = responseData.by_faculty || []
        totalRecords.value = responseData.by_faculty?.length || 0
    } catch (err) {
        console.error("API Error:", err);
        message.error("Failed to load records. Check if the backend requires a Period ID.");
    } finally {
        loading.value = false
    }
}

// --- EXPORT FUNCTION ---
const handleExport = () => {
    if (tableData.value.length === 0) {
        message.warning("No data to export");
        return;
    }
    const dataToExport = tableData.value.map(row => ({
        'Faculty': row.faculty_name,
        'Departments': row.total_departments || 0,
        'Total Staff': row.total_staff,
        'Completed': row.completed,
        'Pending': row.total_staff - row.completed,
        'Rate (%)': row.completion_rate
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Appraisals");
    XLSX.writeFile(wb, `Appraisal_Report_${new Date().toLocaleDateString()}.xlsx`);
    message.success("Report downloaded");
}

const handleJumpToPage = () => {
    const totalPages = Math.ceil(totalRecords.value / pageSize.value)
    if (jumpToPageValue.value >= 1 && jumpToPageValue.value <= totalPages) {
        currentPage.value = jumpToPageValue.value
    }
}

const handleRowClick = (row) => {
    // Navigates to appraisal-department/:id using the faculty_id from the row
    if (row.faculty_id) {
        router.push(`/appraisals-department-record/${row.faculty_id}`)
    } else {
        message.error("Invalid Faculty ID")
    }
}

const debouncedSearch = debounce(fetchRecords, 500)

watch([currentPage, pageSize, selectedFaculty, dateRange, selectedStatus], fetchRecords)
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
                    <h4 class="text-2xl font-black text-[#003366] tracking-tighter uppercase italic leading-none">
                        Faculty Appraisal Overview
                    </h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                        Institutional Performance Tracking
                    </p>
                </div>
                <button
                    @click="handleExport"
                    class="bg-[#003366] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#002244] transition-all shadow-lg shadow-blue-900/10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    Export Overview
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <n-input v-model:value="searchKeyword" placeholder="SEARCH FACULTY..." clearable class="orbit-input" />
                <n-select v-model:value="selectedFaculty" :options="facultyOptions" placeholder="FACULTY/UNIT" clearable />
                <n-date-picker v-model:value="dateRange" type="daterange" clearable placeholder="APPRAISAL PERIOD" />
                <n-select v-model:value="selectedStatus" :options="statusOptions" placeholder="STATUS" clearable />
            </div>
        </div>

        <div class="w-full overflow-x-auto">
            <n-data-table
                remote
                :loading="loading"
                :columns="columns"
                :data="tableData"
                :bordered="false"
                :single-line="false"
                :scroll-x="1200"
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
                <span class="text-[10px] font-black text-[#003366] uppercase tracking-tighter">Jump to Page</span>
                <n-input-number v-model:value="jumpToPageValue" :min="1" size="small" class="w-20" :show-button="false" />
                <button @click="handleJumpToPage" class="bg-[#003366] text-white px-4 py-1.5 rounded-lg text-[10px] font-black hover:opacity-90 transition-all uppercase">
                    Go
                </button>
            </div>
        </div>
    </div>
</template>