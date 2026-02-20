<script setup>
import { getDepartmentAppraisals } from "@/apis/management/dean";
import { useAuthStore } from "@/store/auth.js";
import { debounce } from "lodash-es";
import { ChevronLeft, ChevronRight, Search, Upload } from "lucide-vue-next";
import {
    NButton,
    NDataTable,
    NDatePicker,
    NInput,
    NPagination,
    NSelect,
    NSpin,
    NTag,
    useMessage
} from "naive-ui";
import { h, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const message = useMessage();
const route = useRoute();
const router = useRouter();

// --- STATE ---
const staffData = ref([]);
const loading = ref(false);
const search = ref("");
const selectedStatus = ref(null);
const selectedDate = ref(null);

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
});

// --- OPTIONS ---
const statusOptions = [
  { label: "SUBMITTED", value: "submitted" },
  { label: "PENDING", value: "pending" },
  { label: "COMPLETED", value: "completed" },
  { label: "APPROVED", value: "approved" },
];

// --- API CONSUMPTION ---
const fetchStaffAppraisals = async () => {
  const departmentId = route.params.id;
  if (!departmentId) return;

  loading.value = true;
  try {
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
      search: search.value || undefined,
      status: selectedStatus.value || undefined,
      period: selectedDate.value ? new Date(selectedDate.value).toISOString().slice(0, 7) : undefined
    };

    const response = await getDepartmentAppraisals(departmentId, params);

    staffData.value = response.data?.results || response.data || [];
    pagination.itemCount = response.data?.count || staffData.value.length;
  } catch (err) {
    message.error("Failed to load department appraisals");
  } finally {
    loading.value = false;
  }
};

const debouncedFetch = debounce(fetchStaffAppraisals, 500);

// Updated watch list to exclude cadre
watch([selectedStatus, selectedDate, () => pagination.page, () => pagination.pageSize], fetchStaffAppraisals);
watch(search, debouncedFetch);

onMounted(fetchStaffAppraisals);

// --- TABLE COLUMNS ---
const columns = [
  {
    title: "STAFF ID",
    key: "staff_id",
    width: 120,
    render: (row) => h('span', { class: 'font-bold text-gray-700' }, row.staff_id || 'N/A')
  },
  {
    title: "STAFF NAME",
    key: "staff_name",
    width: 220,
    render: (row) => h('span', { class: 'font-black text-orbit-bg uppercase text-xs tracking-tight' }, row.staff_name)
  },
  {
    title: "POSITION",
    key: "position",
    width: 180,
    render: (row) => h('span', { class: 'text-gray-500 font-medium' }, row.position || 'N/A')
  },
  {
    title: "APPRAISAL PERIOD",
    key: "period",
    width: 180,
    render: (row) => h('span', { class: 'text-gray-600 italic' }, row.period || 'Not Set')
  },
  {
    title: "SUBMITTED ON",
    key: "submitted_at",
    width: 180,
    render: (row) => h('span', { class: 'text-gray-500' }, row.submitted_at || '---')
  },
  {
    title: "RATING (HOD)",
    key: "hod_rating",
    width: 120,
    align: 'center',
    render: (row) => h('span', { class: 'font-bold text-orbit-bg' }, `${row.hod_rating || 0}/5`)
  },
  {
    title: "STATUS",
    key: "status",
    width: 150,
    align: 'center',
    render(row) {
      const status = (row.status || 'pending').toLowerCase();
      let type = 'warning';
      if (['approved', 'completed'].includes(status)) type = 'success';
      if (status === 'submitted') type = 'info';

      return h(NTag, {
        type,
        round: true,
        bordered: false,
        class: 'font-black uppercase text-[10px] px-4'
      }, { default: () => row.status || 'PENDING' });
    }
  },
  {
    title: "ACTION",
    key: "actions",
    width: 100,
    align: 'right',
    render(row) {
      return h(NButton, {
        size: 'small',
        round: true,
        type: 'primary',
        color: '#003366',
        onClick: (e) => {
          e.stopPropagation();
          router.push(`/appraisal-detail/${row.id}`);
        }
      }, { default: () => 'VIEW' });
    }
  }
];

const rowProps = (row) => {
  return {
    class: 'cursor-pointer',
    onClick: () => router.push(`/appraisal-detail/${row.id}`)
  };
};
</script>

<template>
  <div class="p-4 lg:p-8 mt-5">
    <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
      <div>
        <h4 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Department Staff Appraisal
        </h4>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Performance Records List
        </p>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
        <n-input
          v-model:value="search"
          placeholder="SEARCH NAME / ID..."
          clearable
          size="large"
          class="w-full md:w-80 shadow-sm rounded-xl"
        >
          <template #prefix><Search :size="18" class="text-gray-400" /></template>
        </n-input>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <n-select
            v-model:value="selectedStatus"
            :options="statusOptions"
            placeholder="STATUS"
            clearable
            size="large"
            class="w-full md:w-40"
          />
          <n-date-picker
            v-model:value="selectedDate"
            type="month"
            placeholder="PERIOD"
            clearable
            size="large"
            class="w-full md:w-44"
          />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <n-spin :show="loading">
          <n-data-table
            :columns="columns"
            :data="staffData"
            :bordered="false"
            :row-props="rowProps"
            size="large"
            :scroll-x="1400"
          />
        </n-spin>
      </div>
    </div>

    <div class="mt-8 flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
      <n-button type="primary" color="#003366" size="large" class="font-bold px-8 rounded-xl shadow-md">
        <template #icon><Upload :size="18" /></template>
        EXPORT SUMMARY (PDF)
      </n-button>

      <n-pagination
        v-model:page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :item-count="pagination.itemCount"
        show-size-picker
        :page-sizes="[10, 20, 50]"
      >
        <template #prev><ChevronLeft :size="18" /></template>
        <template #next><ChevronRight :size="18" /></template>
      </n-pagination>
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }

:deep(.n-data-table-thead th) {
  background-color: #f8fafc !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  color: #1e293b !important;
  padding: 20px !important;
  border-bottom: 2px solid #e2e8f0 !important;
}

:deep(.n-data-table-td) {
  padding: 24px 20px !important;
  border-bottom: 1px solid #f1f5f9 !important;
  font-size: 14px;
}

:deep(.n-data-table-tr:hover td) {
  background-color: #f0f7ff !important;
}

.custom-scrollbar::-webkit-scrollbar { height: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

:deep(.n-pagination-item--active) {
  border-color: #003366 !important;
  background-color: #003366 !important;
  color: white !important;
}
</style>