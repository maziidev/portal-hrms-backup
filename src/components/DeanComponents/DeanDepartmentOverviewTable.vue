<template>
  <div class="mt-10 space-y-6">
    <div class="px-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-orbit-bg font-black text-xl sm:text-2xl uppercase italic tracking-tighter leading-none">
          Department Overview
        </h2>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Faculty Performance Metrics
        </p>
      </div>

      <div class="w-full md:w-80 lg:w-96">
        <n-input
          v-model:value="search"
          placeholder="SEARCH DEPARTMENT..."
          clearable
          size="large"
          class="orbit-input shadow-sm"
        />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <n-spin :show="loading">
          <n-data-table
            :columns="columns"
            :data="filteredDepartments"
            :row-key="rowKey"
            :bordered="false"
            :single-line="false"
            size="large"
            class="custom-table"
          />
        </n-spin>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDeanDepartmentOverview } from "@/apis/management/dean"
import { useAuthStore } from "@/store/auth.js"
import { NDataTable, NInput, NSpin, NTag, useMessage } from "naive-ui"
import { computed, h, ref, watch } from "vue"

const authStore = useAuthStore()
const message = useMessage()

const departments = ref([])
const search = ref("")
const loading = ref(false)

const rowKey = (row) => row.department_id

const fetchDepartments = async (facultyId) => {
  loading.value = true
  try {
    const { data } = await getDeanDepartmentOverview(facultyId)
    departments.value = data || []
  } catch (error) {
    message.error("Failed to fetch departments")
  } finally {
    loading.value = false
  }
}

watch(
  () => authStore.user,
  (user) => {
    if (user?.facultyId) fetchDepartments(user.facultyId)
  },
  { immediate: true }
)

const filteredDepartments = computed(() => {
  if (!search.value) return departments.value
  const query = search.value.toLowerCase()
  return departments.value.filter(dep =>
    dep.department_name?.toLowerCase().includes(query) ||
    dep.hod_name?.toLowerCase().includes(query)
  )
})

// Columns with Big Bold Headers and stylized content
const columns = [
  {
    title: "Department",
    key: "department_name",
    minWidth: 200,
    render(row) {
      return h('span', { class: 'font-bold text-orbit-bg uppercase text-xs tracking-tight' }, row.department_name)
    }
  },
  {
    title: "HOD",
    key: "hod_name",
    minWidth: 180,
    render(row) {
      return h('span', { class: 'font-medium text-gray-700' }, row.hod_name || 'Not Assigned')
    }
  },
  {
    title: "Staff",
    key: "staff_count",
    align: 'center',
    render(row) {
      return h('span', { class: 'font-black text-orbit-bg' }, row.staff_count)
    }
  },
  { title: "Appraisals", key: "active_appraisals", align: 'center' },
  { title: "Promotions", key: "pending_promotions", align: 'center' },
  { title: "Leaves", key: "pending_leaves", align: 'center' },
  {
    title: "Status",
    key: "status",
    width: 120,
    render: () => h(NTag, {
      type: "success",
      round: true,
      bordered: false,
      class: 'font-bold uppercase text-[10px] px-4'
    }, { default: () => "Active" })
  }
]
</script>

<style scoped>
.text-orbit-bg { color: #003366; }

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

/* Zebra striping custom look */
:deep(.n-data-table-tr--striped td) {
  background-color: #fafbfc !important;
}

:deep(.n-data-table-tr:hover td) {
  background-color: #f0f7ff !important;
}

/* Input Polish */
:deep(.n-input) {
  border-radius: 10px !important;
  --n-border-hover: 1px solid #003366 !important;
  --n-border-focus: 1px solid #003366 !important;
}

/* Custom Scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>