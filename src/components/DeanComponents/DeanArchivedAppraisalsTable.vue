<script setup>
import { getDepartmentAppraisals } from "@/apis/management/dean";
import { useAuthStore } from "@/store/auth.js";
import { ChevronLeft, ChevronRight, Download } from 'lucide-vue-next';
import { NDataTable, useMessage } from "naive-ui";
import { h, onMounted, ref, watch } from "vue";

const authStore = useAuthStore();
const message = useMessage();

const archivedData = ref([]);
const loading = ref(false);

const fetchArchivedData = async () => {
  const contextId = authStore.departmentId || authStore.facultyId;
  if (!contextId) return;

  loading.value = true;
  try {
    const { data } = await getDepartmentAppraisals(contextId);

    // API logic: handle results or direct data mapping
    // Usually archived data is filtered by the backend or returned in a specific key
    archivedData.value = data?.archived || data?.results || data || [];
  } catch (err) {
    message.error("Failed to load archive repository.");
  } finally {
    loading.value = false;
  }
};

watch(() => [authStore.departmentId, authStore.facultyId], fetchArchivedData);

onMounted(fetchArchivedData);

const columns = [
  {
    title: "Year",
    key: "year",
    align: 'center',
    render(row) {
      return h('span', { class: 'text-slate-700 font-medium' }, row.year || '2024');
    }
  },
  {
    title: "Staff Appraised",
    key: "staff_count",
    align: 'center',
    render(row) {
        return h('span', { class: 'text-slate-600' }, row.staff_count || row.staff_appraised || '22')
    }
  },
  {
    title: "Avg. Score",
    key: "average_score",
    align: 'center',
    render(row) {
      return h('span', { class: 'text-slate-600' }, `${row.average_score || row.avg_score || 82}%`);
    }
  },
  {
    title: "Action",
    key: "action",
    align: 'center',
    render: (row) =>
      h(
        "div",
        {
          class: "flex items-center justify-center space-x-2 bg-orbit-blue text-white p-3 rounded-md cursor-pointer hover:opacity-90 transition-all mx-auto w-fit px-6",
          onClick: () => message.info(`Downloading Report for ${row.year || '2024'}...`),
        },
        [
            h(Download, { size: 18 }),
            h("span", { class: "text-xs font-bold uppercase tracking-wider" }, "Download")
        ]
      ),
  },
];
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-orbit-bg font-bold text-[18px]">Archived / Past Appraisals</h2>
      <div class="space-x-2 flex">
        <button class="bg-gray-200 rounded-md px-2 py-2 text-gray-600 hover:bg-gray-300 transition-colors">
          <ChevronLeft :size="24" />
        </button>
        <button class="bg-orbit-blue text-white rounded-md px-2 py-2 hover:opacity-90 transition-opacity">
          <ChevronRight :size="24" />
        </button>
      </div>
    </div>

    <div class="w-full overflow-x-auto bg-white">
      <n-data-table
        :loading="loading"
        :columns="columns"
        :data="archivedData"
        :bordered="false"
        :single-line="false"
        size="large"
        class="main-appraisal-table"
      />
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-blue { background-color: #003366; }

/* Styles to match your p-8 and space-y-8 requirement */
:deep(.n-data-table-thead th) {
  background-color: transparent !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  color: #000 !important;
  padding: 16px 24px !important;
  border: none !important;
}

:deep(.n-data-table-td) {
  padding: 32px !important;
  background-color: #ffffff !important;
  font-size: 14px !important;
  border: none !important;
}

:deep(.n-data-table-tr) {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s ease;
}

:deep(.n-data-table-tr:hover td) {
  background-color: #ffffff !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}


:deep(.n-data-table-table) {
  border-separate: separate !important;
  border-spacing: 0 12px !important;
}
</style>