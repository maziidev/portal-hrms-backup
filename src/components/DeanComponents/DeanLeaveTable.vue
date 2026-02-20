<script setup>
import { getDepartmentLeaves } from "@/apis/management/dean";
import { debounce } from "lodash-es";
import { Calendar, Search, Eye } from "lucide-vue-next";
import { NDataTable, NDatePicker, NPagination, NSelect, NSpin } from "naive-ui";
import { h, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// --- STATE ---
const leaveRequests = ref([]);
const loading = ref(false);
const search = ref("");
const selectedStatus = ref(null);
const selectedType = ref(null);
const selectedDate = ref(null);

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
});

const statusOptions = [
  { label: "SUBMITTED", value: "submitted" },
  { label: "PENDING", value: "pending" },
  { label: "APPROVED", value: "approved" },
  { label: "ACTIVE", value: "active" },
];

const leaveTypeOptions = [
  { label: "ANNUAL LEAVE", value: "annual" },
  { label: "SICK LEAVE", value: "sick" },
];

// --- TABLE COLUMNS ---
const columns = [
  {
    title: "STAFF ID",
    key: "staff_id",
    align: 'center',
    width: 120,
    render: (row) => h('span', { class: 'font-black text-orbit-bg tracking-tighter' }, row.staff_id || '---')
  },
  {
    title: "NAME",
    key: "staff_name",
    align: 'center',
    minWidth: 200,
    render: (row) => h('span', { class: 'font-bold text-gray-800' }, row.staff_name)
  },
  {
    title: "DEPARTMENT",
    key: "department",
    align: 'center',
    minWidth: 180,
    render: (row) => h('span', { class: 'text-gray-500 font-medium' }, row.department_name || 'Computer Science')
  },
  {
    title: "LEAVE TYPE",
    key: "leave_type",
    align: 'center',
    width: 150,
  },
  {
    title: "START DATE",
    key: "start_date",
    align: 'center',
    width: 140,
    render: (row) => h('div', { class: 'flex items-center justify-center space-x-2' }, [
      h(Calendar, { size: 14, class: 'text-blue-400' }),
      h('span', row.start_date)
    ])
  },
  {
    title: "DURATION",
    key: "duration",
    align: 'center',
    width: 120,
    render: (row) => h('span', { class: 'font-black text-orbit-bg' }, row.duration || '---')
  },
  {
    title: "STATUS",
    key: "status",
    align: 'center',
    width: 130,
    render(row) {
      const status = row.status?.toLowerCase();
      let color = '#fff7ed'; let text = '#f97316'; // orange/pending
      if (status === 'approved' || status === 'active') { color = '#ecfdf5'; text = '#10b981'; }

      return h('button', {
        style: { backgroundColor: color, color: text },
        class: 'font-bold px-5 py-2 rounded-full text-[11px] uppercase border-none'
      }, row.status);
    }
  },
  {
    title: "ACTION",
    key: "actions",
    align: 'center',
    width: 120,
    fixed: 'right',
    render(row) {
      return h('button', {
        class: 'btn-blue-main px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer',
        onClick: (e) => { e.stopPropagation(); }
      }, 'VIEW');
    }
  }
];

const fetchLeaveRequests = async () => {
  const departmentId = route.params.id;
  if (!departmentId) return;
  loading.value = true;
  try {
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
      search: search.value || undefined,
      status: selectedStatus.value || undefined,
      leave_type: selectedType.value || undefined,
      period: selectedDate.value ? new Date(selectedDate.value).toISOString().slice(0, 7) : undefined
    };
    const { data } = await getDepartmentLeaves(departmentId, params);
    leaveRequests.value = data.results || data;
    pagination.itemCount = data.count || leaveRequests.value.length;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const debouncedFetch = debounce(fetchLeaveRequests, 500);
watch([selectedStatus, selectedType, selectedDate, () => pagination.page, () => pagination.pageSize], fetchLeaveRequests);
watch(search, debouncedFetch);
onMounted(fetchLeaveRequests);

const rowProps = () => ({ class: 'cursor-pointer transition-all' });
</script>

<template>
  <div class="p-8 w-full max-w-full">
    <div class="mb-8 flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
      <div>
        <h1 class="text-4xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Leave Management
        </h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 ml-1">
          Administrative & Absence Oversight
        </p>
      </div>

      <div class="flex w-full xl:w-96 border border-gray-200 bg-white text-gray-400 rounded-2xl p-3.5 space-x-4 shadow-sm focus-within:ring-1 focus-within:ring-orbit-bg transition-all">
        <Search :size="20" class="shrink-0 text-gray-300" />
        <input
          v-model="search"
          type="text"
          placeholder="SEARCH NAME / STAFF ID..."
          class="w-full outline-none text-[11px] font-bold uppercase tracking-wider text-gray-700 placeholder:text-gray-300"
        >
      </div>
    </div>

    <div class="mb-8 flex flex-wrap gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div class="flex-1 min-w-[200px]">
        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Type of Leave</p>
        <n-select v-model:value="selectedType" :options="leaveTypeOptions" placeholder="Select Leave Type" clearable />
      </div>
      <div class="flex-1 min-w-[200px]">
        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Period</p>
        <n-date-picker v-model:value="selectedDate" type="month" placeholder="Month/Year" clearable class="w-full" />
      </div>
      <div class="flex-1 min-w-[200px]">
        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Current Status</p>
        <n-select v-model:value="selectedStatus" :options="statusOptions" placeholder="All Status" clearable />
      </div>
    </div>

    <div class="bg-white rounded-[2rem] border border-gray-50 shadow-sm overflow-hidden">
      <n-spin :show="loading">
        <div class="w-full overflow-x-auto">
          <n-data-table
            :columns="columns"
            :data="leaveRequests"
            :bordered="false"
            :row-props="rowProps"
            :scroll-x="1300"
            class="orbit-custom-table"
          />
        </div>
      </n-spin>
    </div>

    <div class="mt-8 flex justify-end bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
      <n-pagination
        v-model:page="pagination.page"
        :item-count="pagination.itemCount"
        :page-size="pagination.pageSize"
        size="large"
      />
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }
.btn-blue-main { background-color: #003366; color: white; }

/* Table Header - MAX BOLD */
:deep(.orbit-custom-table .n-data-table-thead th) {
  background-color: #fafbfc !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em;
  font-size: 11px;
  color: #000000 !important;
  padding: 1.5rem !important;
  border-bottom: 2px solid #e2e8f0 !important;
  white-space: nowrap;
}

/* Floating Row Effect */
:deep(.orbit-custom-table .n-data-table-td) {
  background-color: white !important;
  padding: 1.8rem 1.5rem !important;
  border-bottom: 6px solid #f8fafc !important; /* The Gap */
  font-size: 13px;
  white-space: nowrap;
}

:deep(.orbit-custom-table .n-data-table-tr:hover td) {
  background-color: #f1f5f9 !important;
}

/* Input Styles */
:deep(.n-input), :deep(.n-select-selection), :deep(.n-date-picker) {
  border-radius: 12px !important;
  --n-border-hover: 1px solid #003366 !important;
  --n-border-focus: 1px solid #003366 !important;
}
</style>