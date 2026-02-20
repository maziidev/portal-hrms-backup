<script setup>
import { getDeanDepartmentOverview } from "@/apis/management/dean";
import { useAuthStore } from "@/store/auth.js";
import { Search } from 'lucide-vue-next';
import { NDataTable, NDatePicker, NInput, NSelect, NSpin, NTag, useMessage } from "naive-ui";
import { computed, h, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router"; // 1. Import Router

const authStore = useAuthStore();
const message = useMessage();
const router = useRouter(); // 2. Initialize Router

const departments = ref([]);
const search = ref("");
const loading = ref(false);
const selectedStatus = ref(null);
const selectedDate = ref(null);

// Pagination State
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});

// 3. Define Row Props for Clicking
const rowProps = (row) => {
  return {
    class: 'cursor-pointer',
    onClick: () => {
      // Navigates to /appraisals/:id
      // Ensure 'id' matches the property name in your department object
      router.push(`/appraisals/${row.id || row.department_id}`);
    }
  };
};

const statusOptions = [
  { label: "SUBMITTED", value: "submitted" },
  { label: "PENDING", value: "pending" },
  { label: "COMPLETED", value: "completed" },
  { label: "APPROVED", value: "approved" },
];

const fetchOverview = async () => {
  const facultyId = authStore.facultyId;
  if (!facultyId) return;

  loading.value = true;
  try {
    const { data } = await getDeanDepartmentOverview(facultyId);
    departments.value = data || [];
  } catch (err) {
    message.error("Could not load department appraisal stats.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOverview);
watch(() => authStore.facultyId, (newId) => { if (newId) fetchOverview(); });

const filteredData = computed(() => {
  let data = departments.value;
  if (search.value) {
    const query = search.value.toLowerCase();
    data = data.filter(d => d.department_name?.toLowerCase().includes(query));
  }
  if (selectedStatus.value) {
    data = data.filter(d => d.status?.toLowerCase() === selectedStatus.value.toLowerCase());
  }
  if (selectedDate.value) {
    const filterDateStr = new Date(selectedDate.value).toLocaleDateString();
    data = data.filter(d => {
      if (!d.last_updated) return false;
      const rowDateStr = new Date(d.last_updated).toLocaleDateString();
      return rowDateStr === filterDateStr;
    });
  }
  return data;
});

const columns = [
  {
    title: "Departments",
    key: "department_name",
    width: 250,
    fixed: 'left',
    render(row) {
      return h('span', { class: 'font-black text-orbit-bg uppercase tracking-tight text-xs' }, row.department_name);
    }
  },
  {
    title: "Total Staff",
    key: "total_staff",
    width: 120,
    align: 'center',
    render: (row) => h('span', { class: 'font-black text-orbit-bg' }, row.total_staff || 0)
  },
  { title: "Submitted", key: "submitted_count", width: 120, align: 'center' },
  { title: "Pending", key: "pending_count", width: 120, align: 'center' },
  { title: "Completed", key: "completed_count", width: 120, align: 'center' },
  {
    title: "Last Updated",
    key: "last_updated",
    width: 200,
    align: 'center',
    render(row) {
      return h('div', { class: 'flex items-center justify-center space-x-2 text-[11px] font-bold text-gray-500' }, [
        h('span', row.last_updated || 'N/A'),
      ]);
    }
  },
  {
    title: "Status",
    key: "status",
    width: 140,
    align: 'center',
    fixed: 'right',
    render(row) {
      const status = (row.status || 'pending').toLowerCase();
      let tagType = 'warning';
      if (status === 'approved' || status === 'completed') tagType = 'success';
      if (status === 'submitted') tagType = 'info';

      return h(NTag, {
        type: tagType,
        round: true,
        bordered: false,
        class: 'font-black uppercase text-[9px] px-4'
      }, { default: () => row.status || 'Pending' });
    }
  }
];
</script>

<template>
  <div class="mt-8 space-y-6 px-4">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-2">
      <div class="flex flex-col md:flex-row md:items-center gap-4 flex-1">
        <h4 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none whitespace-nowrap">
          Departments’ Appraisal
        </h4>
        <n-input
          v-model:value="search"
          placeholder="SEARCH DEPARTMENT..."
          clearable
          size="large"
          class="w-full md:w-80 orbit-input shadow-sm"
        >
          <template #prefix><Search :size="16" class="text-gray-400" /></template>
        </n-input>
      </div>

      <div class="flex flex-row items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
        <n-date-picker
          v-model:value="selectedDate"
          type="date"
          placeholder="DATE UPDATED"
          clearable
          class="min-w-40 lg:w-44"
        />
        <n-select
          v-model:value="selectedStatus"
          :options="statusOptions"
          placeholder="STATUS"
          clearable
          class="min-w-32.5 lg:w-40"
        />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm mx-1 overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <n-spin :show="loading">
          <n-data-table
            :columns="columns"
            :data="filteredData"
            :pagination="pagination"
            :row-props="rowProps"
            :bordered="false"
            :single-line="false"
            size="large"
            class="custom-table"
            :scroll-x="1200"
          />
        </n-spin>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }

/* Pointer cursor on row hover */
:deep(.cursor-pointer) {
  cursor: pointer;
}

/* TABLE HEADER */
:deep(.n-data-table-thead th) {
  background-color: #f8fafc !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  color: #1e293b !important;
  padding: 18px 20px !important;
  border-bottom: 2px solid #e2e8f0 !important;
}

/* PAGINATION STYLING */
:deep(.n-data-table__pagination) {
  padding: 16px !important;
  justify-content: flex-end !important;
}

:deep(.n-pagination-item--active) {
  border-color: #003366 !important;
  color: #003366 !important;
}

:deep(.n-data-table-td) {
  padding: 16px 20px !important;
  border-bottom: 1px solid #f1f5f9 !important;
  font-size: 14px;
}

:deep(.n-data-table-td--fixed-left),
:deep(.n-data-table-td--fixed-right) {
  background-color: #fff !important;
  z-index: 2;
}

:deep(.n-data-table-tr:hover td) {
  background-color: #f0f7ff !important;
}

:deep(.n-input), :deep(.n-select-selection), :deep(.n-date-picker) {
  border-radius: 10px !important;
}

.custom-scrollbar::-webkit-scrollbar { height: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>