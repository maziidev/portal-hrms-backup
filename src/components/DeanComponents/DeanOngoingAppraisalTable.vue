<script setup>
import { getDepartmentAppraisals } from "@/apis/management/dean"
import { useAuthStore } from "@/store/auth.js"
import { debounce } from 'lodash-es'
import { NDataTable, NDatePicker, NInput, NSelect, NTag, useMessage } from "naive-ui"
import { computed, h, ref, watch } from "vue"

const authStore = useAuthStore()
const message = useMessage()

const appraisals = ref([])
const search = ref("")
const selectedCategory = ref(null)
const selectedStatus = ref(null)
const selectedDate = ref(null)
const loading = ref(false)

const rowKey = row => row.appraisal_id

const categoryOptions = [
  { label: "MID-YEAR", value: "mid" },
  { label: "YEAR-END", value: "end" },
]

const statusOptions = [
  { label: "SUBMITTED", value: "submitted" },
  { label: "PENDING", value: "pending" },
  { label: "COMPLETED", value: "completed" },
  { label: "APPROVED", value: "approved" },
]

const fetchAppraisals = async () => {
  if (!authStore.facultyId) return

  loading.value = true
  try {
    const params = {
      search: search.value,
      category: selectedCategory.value,
      status: selectedStatus.value,
      startDate: selectedDate.value ? new Date(selectedDate.value).toISOString().slice(0, 10) : null,
    }
    const { data } = await getDepartmentAppraisals(authStore.user.facultyId, params)
    appraisals.value = data || []
  } catch {
    message.error("Failed to fetch appraisals")
  } finally {
    loading.value = false
  }
}

// Debounce search to prevent spamming the interceptor
const debouncedFetch = debounce(fetchAppraisals, 500)

watch([selectedCategory, selectedStatus, selectedDate], fetchAppraisals)
watch(search, debouncedFetch)
watch(() => authStore.facultyId, fetchAppraisals, { immediate: true })

const filteredAppraisals = computed(() => appraisals.value)

const columns = [
  {
    title: "Department",
    key: "department_name",
    minWidth: 180,
    render(row) {
      return h('span', { class: 'font-bold text-orbit-bg uppercase text-xs tracking-tight' }, row.department_name)
    }
  },
  {
    title: "Appraisal Batch",
    key: "batch_name",
    minWidth: 150,
    render(row) {
      return h('span', { class: 'font-semibold text-gray-600' }, row.batch_name)
    }
  },
  {
    title: "Start Date",
    key: "start_date",
    minWidth: 140,
    render: row =>
      h("div", { class: "flex items-center gap-2" }, [
        h("span", { class: 'font-medium text-gray-500' }, row.start_date),
      ]),
  },
  {
    title: "Progress",
    key: "progress",
    align: 'center',
    render(row) {
        return h('span', { class: 'font-black text-orbit-bg' }, row.progress || '0%')
    }
  },
  {
    title: "Status",
    key: "status",
    minWidth: 120,
    render: row =>
      h(NTag, {
        type: row.status === 'completed' ? 'success' : 'info',
        round: true,
        bordered: false,
        class: 'font-black uppercase text-[9px]'
      }, { default: () => row.status || "Ongoing" }),
  },
  {
    title: "Action",
    key: "action",
    align: 'right',
    render: row =>
      h(
        "button",
        {
          class: "bg-orbit-bg text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full hover:opacity-80 transition-all",
          onClick: e => {
              e.stopPropagation()
              // Handle Review Logic
          },
        },
        "Review",
      ),
  },
]
</script>

<template>
  <div class="mt-6 space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-2">
      <div class="flex flex-col md:flex-row md:items-center gap-4 flex-1">
        <h4 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none whitespace-nowrap">
          Ongoing Appraisals
        </h4>
        <n-input
          v-model:value="search"
          placeholder="SEARCH ANYTHING..."
          clearable
          size="large"
          class="w-full md:w-80 lg:w-72 orbit-input shadow-sm"
        />
      </div>

      <div class="flex flex-row items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
        <n-select
          v-model:value="selectedCategory"
          :options="categoryOptions"
          placeholder="CATEGORY"
          clearable
          class="min-w-[130px] lg:w-40"
        />
        <n-select
          v-model:value="selectedStatus"
          :options="statusOptions"
          placeholder="STATUS"
          clearable
          class="min-w-[130px] lg:w-40"
        />
        <n-date-picker
          v-model:value="selectedDate"
          type="date"
          placeholder="START DATE"
          clearable
          class="min-w-[160px] lg:w-44"
        />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mx-1">
      <div class="overflow-x-auto">
        <n-data-table
          remote
          :loading="loading"
          :columns="columns"
          :data="filteredAppraisals"
          :row-key="rowKey"
          :bordered="false"
          :single-line="false"
          size="large"
          class="custom-table"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

/* BIG BOLD THEAD */
:deep(.n-data-table-thead th) {
  background-color: #f8fafc !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  color: #1e293b !important;
  padding: 18px 20px !important;
  border-bottom: 2px solid #e2e8f0 !important;
  white-space: nowrap;
}

:deep(.n-data-table-td) {
  padding: 16px 20px !important;
  border-bottom: 1px solid #f1f5f9 !important;
  font-size: 14px;
  color: #334155;
  white-space: nowrap;
}

:deep(.n-data-table-tr:hover td) {
  background-color: #f0f7ff !important;
}

/* Input/Select Polish */
:deep(.n-input), :deep(.n-select-selection), :deep(.n-date-picker) {
  border-radius: 10px !important;
  --n-border-hover: 1px solid #003366 !important;
  --n-border-focus: 1px solid #003366 !important;
}

/* Custom Scrollbar for Mobile Filters and Table */
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>