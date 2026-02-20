<template>
  <div class="p-8 w-full max-w-full">
    <div class="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
      <div>
        <h1 class="text-4xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Promotion Oversight
        </h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 ml-1">
          Faculty Departmental Management
        </p>
      </div>

      <div class="flex flex-wrap gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div class="w-44">
          <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Status</p>
          <n-select
            v-model:value="statusFilter"
            placeholder="All Statuses"
            :options="[
              {label: 'Pending', value: 'PENDING'},
              {label: 'Approved', value: 'APPROVED'},
              {label: 'Declined', value: 'REJECTED'}
            ]"
            clearable
          />
        </div>
        <div class="w-44">
          <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Period</p>
          <n-date-picker v-model:value="dateFilter" type="month" clearable />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2rem] border border-gray-50 shadow-sm overflow-hidden">
      <n-spin :show="loading">
        <div class="w-full overflow-x-auto">
          <n-data-table
            :columns="columns"
            :data="filteredData"
            :pagination="pagination"
            :bordered="false"
            :row-props="rowProps"
            scroll-x="1200"
            class="orbit-custom-table"
          />
        </div>
      </n-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, h } from 'vue';
import { useRoute } from 'vue-router';
import { NDataTable, NSelect, NDatePicker, NSpin } from 'naive-ui';
import { getDepartmentPromotions } from "@/apis/management/dean";

const route = useRoute();
const loading = ref(false);
const rawData = ref([]);

const statusFilter = ref(null);
const dateFilter = ref(null);

const fetchPromotions = async () => {
    const departmentId = route.params.id;
    if (!departmentId) return;
    loading.value = true;
    try {
        const { data } = await getDepartmentPromotions(departmentId);
        rawData.value = Array.isArray(data) ? data : (data.results || []);
    } catch (err) {
        console.error("Table Load Error:", err);
        rawData.value = [];
    } finally {
        loading.value = false;
    }
};

onMounted(fetchPromotions);

const getStatusProps = (status) => {
    const s = status?.toUpperCase();
    if (['APPROVED', 'COMPLETED'].includes(s)) return { color: '#ecfdf5', text: '#10b981', label: 'Approved' };
    if (['DECLINED', 'REJECTED'].includes(s)) return { color: '#fef2f2', text: '#ef4444', label: 'Declined' };
    return { color: '#fff7ed', text: '#f97316', label: 'Pending' };
};

const columns = [
    {
        title: 'Name',
        key: 'staff.full_name',
        align: 'center',
        render: (row) => h('span', { class: 'font-bold text-gray-800' }, row.staff?.full_name || 'Prof. John A. Doe')
    },
    { title: 'Department', key: 'department.name', align: 'center' },
    { title: 'Current Rank', key: 'current_rank', align: 'center' },
    { title: 'Proposed Rank', key: 'proposed_rank', align: 'center' },
    { title: 'Year in Rank', key: 'years_in_rank', align: 'center' },
    { title: 'Appraisal Avg(%)', key: 'appraisal_avg', align: 'center', render: (row) => row.appraisal_avg || '-' },
    {
        title: 'Date Received',
        key: 'created_at',
        align: 'center',
        render: (row) => h('span', row.created_at || '10 Aug 2024')
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        render: (row) => {
            const props = getStatusProps(row.status);
            return h('button', {
                style: { backgroundColor: props.color, color: props.text },
                class: 'font-bold px-5 py-2 rounded-full text-[11px] uppercase transition-transform active:scale-95'
            }, props.label);
        }
    },
    {
        title: 'Action',
        key: 'actions',
        align: 'center',
        render: (row) => h('button', {
            class: 'btn-blue-main px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest',
            onClick: (e) => { e.stopPropagation(); }
        }, 'View')
    }
];

const filteredData = computed(() => {
    let data = rawData.value;
    if (statusFilter.value) data = data.filter(i => i.status === statusFilter.value);
    return data;
});

const pagination = ref({ pageSize: 10 });
const rowProps = () => ({ class: 'cursor-pointer transition-all' });
</script>

<style scoped>
.text-orbit-bg { color: #003366; }

/* Table Header - EXTRA BOLD */
:deep(.orbit-custom-table .n-data-table-thead th) {
    background-color: #fafbfc !important;
    font-weight: 900 !important; /* Maximized Boldness */
    text-transform: uppercase !important;
    letter-spacing: 0.1em; /* Increased spacing for premium feel */
    font-size: 11px;
    color: #000000 !important; /* High contrast black */
    padding: 1.5rem !important;
    border-bottom: 2px solid #e2e8f0 !important;
}

/* Floating Row Effect */
:deep(.orbit-custom-table .n-data-table-td) {
    background-color: white !important;
    padding: 2rem 1.5rem !important;
    border-bottom: 6px solid #f8fafc !important;
    font-weight: 500;
}

:deep(.orbit-custom-table .n-data-table-tr:hover td) {
    background-color: #f1f5f9 !important;
}

.btn-blue-main {
    background-color: #003366;
    color: white;
}

:deep(.n-data-table__pagination) {
    padding: 1.5rem;
    background: #fafbfc;
}
</style>