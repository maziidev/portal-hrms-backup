<script setup>
import { getDepartmentAppraisals } from "@/apis/management/dean";
import { useAuthStore } from "@/store/auth.js";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { NDataTable, useMessage } from "naive-ui";
import { h, onMounted, ref, watch } from "vue";

const authStore = useAuthStore();
const message = useMessage();

const appraisals = ref([]);
const loading = ref(false);

const fetchAppraisals = async () => {
  const contextId = authStore.departmentId || authStore.facultyId;
  if (!contextId) return;

  loading.value = true;
  try {
    const { data } = await getDepartmentAppraisals(contextId);
    // Support both direct array response or paginated results
    appraisals.value = data?.results || data || [];
  } catch (err) {
    message.error("Failed to fetch appraisal records.");
  } finally {
    loading.value = false;
  }
};

// Re-fetch if the context ID changes
watch(() => [authStore.departmentId, authStore.facultyId], fetchAppraisals);

onMounted(fetchAppraisals);

const columns = [
  {
    title: "Staff Name",
    key: "staff_name",
    align: 'center',
    render(row) {
      return h('span', { class: 'text-slate-700' }, row.staff_full_name || row.staff_name || "N/A");
    }
  },
  {
    title: "Cadre",
    key: "cadre",
    align: 'center',
    render(row) {
      return h('span', { class: 'text-slate-600' }, row.rank || row.cadre || "N/A");
    }
  },
  {
    title: "Overall Rating",
    key: "rating",
    align: 'center',
    render(row) {
      return h('span', { class: 'font-semibold' }, `${row.score || 0}/${row.total_possible || 15}`);
    }
  },
  {
    title: "Date Completed",
    key: "date_completed",
    align: 'center',
    render(row) {
      return h('div', { class: 'flex items-center justify-center space-x-2' }, [
        // Using a standard img tag as per your reference
        h('img', { src: '/src/assets/img/calendar.png', alt: 'cal', class: 'w-4 h-4' }),
        h('span', row.date_completed || "05 Aug 2025")
      ]);
    }
  }
];
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-orbit-bg font-bold text-[18px]">Complete Appraisals</h2>
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
        :data="appraisals"
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

/* Styles to match your p-8 and shadow-sm requirement */
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
  padding: 32px !important; /* Matches your p-8 */
  background-color: #ffffff !important;
  font-size: 14px !important;
  border: none !important;
}

:deep(.n-data-table-tr) {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important; /* shadow-sm */
  transition: all 0.3s ease;
  margin-bottom: 2rem !important; /* Space between rows */
}

:deep(.n-data-table-tr:hover td) {
  background-color: #ffffff !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important; /* hover:shadow-md */
}

/* Logic to handle the "space-y-8" look in a table */
:deep(.n-data-table-table) {
  border-separate: separate !important;
  border-spacing: 0 12px !important;
}
</style>