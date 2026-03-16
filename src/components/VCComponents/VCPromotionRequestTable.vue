<script setup>
// Swapped to getVCDepartmentRecords
import { getVCDepartmentRecords } from "@/apis/management/vc";
import { CalendarDays, Eye } from 'lucide-vue-next';
import { NDataTable, NDatePicker, NInput, NInputNumber, NPagination, NSelect, NTag, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'; // Added to get facultyId from URL

const message = useMessage()
const route = useRoute()

// Data State
const rawData = ref([])
const loading = ref(false)
const jumpToPageValue = ref(1)

// Filters State
const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')
const selectedStatus = ref(null)
const selectedFaculty = ref(null) // This now acts as a local filter for Departments/Groups within the faculty
const selectedDateRange = ref(null)

const statusOptions = [
    { label: 'COMPLETED', value: 'completed' },
    { label: 'APPROVED', value: 'approved' },
    { label: 'PENDING', value: 'pending' },
    { label: 'IN PROGRESS', value: 'in_progress' },
    { label: 'DEFERRED', value: 'deferred' }
]

// Dynamic Faculty/Dept Options based on retrieved staff records
const facultyOptions = computed(() => {
    const departments = [...new Set(rawData.value.map(item => item.department || item.faculty_name))];
    return departments.filter(Boolean).map(d => ({ label: d.toUpperCase(), value: d }));
});

const filteredData = computed(() => {
    let data = [...rawData.value];

    if (searchKeyword.value) {
        const query = searchKeyword.value.toLowerCase();
        data = data.filter(item =>
            (item.name || '').toLowerCase().includes(query) ||
            (item.department || '').toLowerCase().includes(query)
        );
    }

    if (selectedFaculty.value) {
        data = data.filter(item => (item.department || item.faculty_name) === selectedFaculty.value);
    }

    if (selectedStatus.value) {
        data = data.filter(item => (item.status || '').toLowerCase() === selectedStatus.value.toLowerCase());
    }

    if (selectedDateRange.value) {
        const [start, end] = selectedDateRange.value;
        data = data.filter(item => {
            const dateStr = item.updated_at || item.date_reviewed || item.created_at;
            const itemDate = new Date(dateStr).getTime();
            return itemDate >= start && itemDate <= end;
        });
    }

    return data;
});

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredData.value.slice(start, end);
});

const totalRecords = computed(() => filteredData.value.length);

const columns = [
    {
        title: 'Staff Name',
        key: 'name',
        render: (row) => h('span', { class: 'font-black text-orbit-bg uppercase tracking-tighter' }, row.name || 'N/A')
    },
    {
        title: 'Department',
        key: 'department',
        render: (row) => h('span', { class: 'font-bold text-gray-500' }, row.department || 'N/A')
    },
    {
        title: 'Current Rank',
        key: 'current_rank',
        align: 'center',
        render: (row) => h('span', { class: 'text-gray-600' }, row.current_rank || 'N/A')
    },
    {
        title: 'Proposed Rank',
        key: 'proposed_rank',
        align: 'center',
        render: (row) => h('span', { class: 'text-gray-800 font-bold' }, row.proposed_rank || 'N/A')
    },
    {
        title: 'Years In Rank',
        key: 'years_in_rank',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold' }, row.years_in_rank || '0')
    },
    {
        title: 'Appraisal (%)',
        key: 'appraisal_avg',
        align: 'center',
        render: (row) => h('span', { class: 'font-black text-blue-600' }, `${row.appraisal_avg || 0}%`)
    },
    {
        title: 'Date Reviewed',
        key: 'date_reviewed',
        align: 'center',
        render: (row) => h('div', { class: 'flex items-center justify-center gap-2 text-gray-400' }, [
            h(CalendarDays, { size: 14 }),
            h('span', { class: 'text-xs font-bold' }, row.date_reviewed || row.updated_at || 'N/A')
        ])
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        render: (row) => {
            const status = row.status?.toLowerCase() || 'pending';
            const typeMap = {
                'completed': 'success',
                'approved': 'success',
                'pending': 'warning',
                'in_progress': 'info',
                'deferred': 'default'
            };
            return h(NTag, {
                bordered: false,
                type: typeMap[status] || 'warning',
                round: true,
                class: 'font-black uppercase text-[10px] px-4'
            }, { default: () => status.replace('_', ' ') });
        }
    },
    {
        title: 'Action',
        key: 'actions',
        align: 'center',
        render: (row) => h('button', {
            class: 'bg-orbit-blue text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-900 transition-all mx-auto',
            onClick: () => console.log('Viewing staff:', row.id)
        }, [
            h(Eye, { size: 12 }),
            'View'
        ])
    }
]

const fetchRecords = async () => {
    loading.value = true
    try {
        // Retrieves facultyId from route (e.g., /dashboard/faculty/12)
        const facultyId = route.params.id;
        if (!facultyId) {
            message.warning("No Faculty ID identified.");
            return;
        }
        const res = await getVCDepartmentRecords(facultyId)
        const data = res.data || res;
        rawData.value = Array.isArray(data) ? data : (data?.records ? data.records : []);
    } catch (err) {
        rawData.value = [];
        message.warning("Detailed department records are currently unavailable.")
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

watch([searchKeyword, selectedStatus, selectedFaculty, selectedDateRange], () => {
    currentPage.value = 1;
})

onMounted(fetchRecords)
</script>

<template>
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 mt-8 overflow-hidden">
        <div class="p-8 border-b border-gray-50 bg-white">
            <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h4 class="text-3xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
                        Promotion Requests
                    </h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3">
                        Individual Staff Promotion Status
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <n-input v-model:value="searchKeyword" placeholder="STAFF NAME..." size="large" clearable style="width: 200px" />
                    <n-date-picker v-model:value="selectedDateRange" type="daterange" clearable size="large" style="width: 250px" />
                    <n-select v-model:value="selectedFaculty" :options="facultyOptions" placeholder="DEPT" clearable size="large" style="width: 180px" />
                    <n-select v-model:value="selectedStatus" :options="statusOptions" placeholder="STATUS" clearable size="large" style="width: 160px" />
                </div>
            </div>
        </div>

        <div class="w-full p-4">
            <n-data-table
                remote
                :loading="loading"
                :columns="columns"
                :data="paginatedData"
                :bordered="false"
                :single-line="false"
                :scroll-x="1400"
                class="orbit-table"
            >
                <template #empty>
                    <div class="py-20 flex flex-col items-center justify-center text-gray-400">
                        <span class="text-[10px] font-black uppercase tracking-widest italic">No records found for this faculty</span>
                    </div>
                </template>
            </n-data-table>
        </div>

        <div class="p-8 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-gray-50/30">
            <n-pagination
                v-model:page="currentPage"
                :item-count="totalRecords"
                v-model:page-size="pageSize"
                show-size-picker
                :page-sizes="[10, 20, 50]"
            />

            <div class="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-gray-200 shadow-sm">
                <span class="text-[10px] font-black text-orbit-bg uppercase tracking-tighter text-nowrap">Jump to</span>
                <n-input-number v-model:value="jumpToPageValue" :min="1" size="small" class="w-20" :show-button="false" />
                <button @click="handleJumpToPage" class="bg-orbit-blue text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:opacity-90 transition-all">
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.n-data-table-thead th) {
    background-color: transparent !important;
    font-size: 11px !important;
    font-weight: 900 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.15em !important;
    color: #000 !important;
    padding: 20px !important;
    border-bottom: 2px solid #f1f5f9 !important;
}

:deep(.n-data-table-td) {
    padding: 24px 20px !important;
    border-bottom: 1px solid #f8fafc !important;
    font-size: 13px;
    background-color: transparent !important;
}

:deep(.n-data-table-tr:hover td) {
    background-color: #f0f7ff !important;
}

:deep(.n-data-table-tr) {
    transition: all 0.3s ease;
}
</style>