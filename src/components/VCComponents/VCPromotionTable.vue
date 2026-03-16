<script setup>
import { getFacultiesPromotionStats } from "@/apis/management/vc";
import { NDataTable, NInput, NInputNumber, NPagination, NSelect, NTag, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const message = useMessage()

// Data State
const rawData = ref([])
const loading = ref(false)
const jumpToPageValue = ref(1)

// Filters State
const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')
const selectedStatus = ref(null)
const selectedFaculty = ref(null)

const statusOptions = [
    { label: 'COMPLETED', value: 'completed' },
    { label: 'PENDING', value: 'pending' },
    { label: 'IN PROGRESS', value: 'in_progress' },
    { label: 'DEFERRED', value: 'deferred' }
]

// Dynamic Faculty Options from Data
const facultyOptions = computed(() => {
    const faculties = [...new Set(rawData.value.map(item => item.faculty_name || item.name))];
    return faculties.filter(Boolean).map(f => ({ label: f.toUpperCase(), value: f }));
});

// Filtering Logic (Search + Faculty Dropdown + Status Dropdown)
const filteredData = computed(() => {
    let data = [...rawData.value];

    if (searchKeyword.value) {
        const query = searchKeyword.value.toLowerCase();
        data = data.filter(item =>
            (item.faculty_name || item.name || '').toLowerCase().includes(query)
        );
    }

    if (selectedFaculty.value) {
        data = data.filter(item => (item.faculty_name || item.name) === selectedFaculty.value);
    }

    if (selectedStatus.value) {
        data = data.filter(item => (item.status || '').toLowerCase() === selectedStatus.value.toLowerCase());
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
        title: 'Faculty',
        key: 'faculty_name',
        align: 'center',
        render: (row) => h('span', { class: 'font-black text-orbit-bg uppercase tracking-tighter' }, row.faculty_name || row.name || 'N/A')
    },
    {
        title: 'Departments',
        key: 'dept_count',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold text-gray-600' }, row.dept_count || 0)
    },
    {
        title: 'Total Applications',
        key: 'total_applications',
        align: 'center',
        render: (row) => h('span', { class: 'font-black text-gray-800' }, row.total_applications || 0)
    },
    {
        title: 'Approved',
        key: 'approved_count',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold text-green-600' }, row.approved_count || 0)
    },
    {
        title: 'Pending',
        key: 'pending_count',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold text-orange-500' }, row.pending_count || 0)
    },
    {
        title: 'Deferred',
        key: 'deferred_count',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold text-blue-500' }, row.deferred_count || 0)
    },
    {
        title: 'Last Updated',
        key: 'updated_at',
        align: 'center',
        render: (row) => h('div', { class: 'flex items-center justify-center space-x-2' }, [
            h('img', { src: '/assets/img/calendar.png', class: 'w-4 h-4' }), // Adjust path if needed
            h('span', { class: 'font-bold text-gray-500 text-xs' }, row.updated_at || '05 Aug 2025')
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
                'pending': 'warning',
                'in_progress': 'info',
                'deferred': 'default'
            };

            return h(NTag, {
                bordered: false,
                type: typeMap[status] || 'warning',
                class: 'font-black uppercase text-[10px] px-6 py-2 rounded-md w-32 justify-center'
            }, { default: () => status.replace('_', ' ') });
        }
    }
]

const fetchRecords = async () => {
    loading.value = true
    try {
        const res = await getFacultiesPromotionStats()
        const data = res.data || res;
        rawData.value = Array.isArray(data) ? data : (data ? [data] : []);
    } catch (err) {
        rawData.value = [];
        message.warning("No promotion data")
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
    const targetId = row.id || row.faculty_id;
    if (targetId) {
        router.push({ name: 'PromotionDepartmentRecords', params: { id: targetId } });
    }
}

watch([searchKeyword, selectedStatus, selectedFaculty], () => {
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
                        Faculty Promotion Records
                    </h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3">
                        Institutional Promotion Cycle
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <n-input
                        v-model:value="searchKeyword"
                        placeholder="SEARCH RECORDS..."
                        size="large"
                        clearable
                        style="width: 220px"
                    />

                    <n-select
                        v-model:value="selectedFaculty"
                        :options="facultyOptions"
                        placeholder="FILTER BY FACULTY"
                        clearable
                        size="large"
                        style="width: 220px"
                    />

                    <n-select
                        v-model:value="selectedStatus"
                        :options="statusOptions"
                        placeholder="FILTER BY STATUS"
                        clearable
                        size="large"
                        style="width: 200px"
                    />
                </div>
            </div>
        </div>

        <div class="w-full">
            <n-data-table
                :loading="loading"
                :columns="columns"
                :data="paginatedData"
                :bordered="false"
                :scroll-x="1200"
                :row-props="(row) => ({
                    style: 'cursor: pointer;',
                    onClick: () => handleRowClick(row)
                })"
            />
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
                <button @click="handleJumpToPage" class="bg-orbit-blue text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase">
                    Go
                </button>
            </div>
        </div>
    </div>
</template>