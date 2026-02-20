<script setup>
import { getDepartmentStaff } from "@/apis/management/dean"
import { useAuthStore } from '@/store/auth'
import { debounce } from 'lodash-es'
import { NDataTable, NDatePicker, NInput, NPagination, NSelect, NTag, useMessage } from 'naive-ui'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const message = useMessage()

const staffData = ref([])
const loading = ref(false)
const downloading = ref(false)

const departmentId = computed(() => route.params.id || authStore.departmentId)

const searchKeyword = ref('')
const selectedStatus = ref(null)
const selectedRole = ref(null)
const dateRange = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalRecords = ref(0)

const statusOptions = [
  { label: 'Submitted', value: 'submitted' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Approved', value: 'approved' }
]

const roleOptions = [
  { label: 'Exam Officer', value: 'exam_officer' },
  { label: 'Level Adviser', value: 'level_adviser' },
  { label: 'Department Secretary', value: 'secretary' }
]

const columns = [
  {
    title: 'Staff ID',
    key: 'staff_id',
    width: 120,
    render(row) {
      return h('span', { class: 'font-black text-orbit-bg text-xs' }, row.staff_id || 'N/A')
    }
  },
  {
    title: 'Staff Name',
    key: 'full_name',
    minWidth: 200,
    render(row) {
      return h('div', { class: 'flex flex-col' }, [
        h('span', { class: 'font-bold text-orbit-bg' }, row.full_name),
        h('span', { class: 'text-[10px] text-gray-400 uppercase font-bold tracking-tighter' }, row.email || '')
      ])
    }
  },
  { title: 'Cadre', key: 'cadre', minWidth: 120 },
  { title: 'Rank', key: 'rank', minWidth: 120 },
  {
    title: 'Role',
    key: 'role',
    minWidth: 130,
    render(row) {
      return h(NTag, {
        bordered: false,
        round: true,
        size: 'small',
        class: '!bg-blue-50 !text-orbit-blue font-bold uppercase !text-[9px]'
      }, { default: () => row.role || 'Staff' })
    }
  },
  {
    title: 'Status',
    key: 'employment_type',
    minWidth: 120,
    render(row) {
      return h('span', { class: 'text-[10px] font-black uppercase text-gray-400' }, row.employment_type?.replace('_', ' ') || 'Full Time')
    }
  },
  {
    title: 'Appraised',
    key: 'last_appraised',
    minWidth: 120,
    render(row) {
      return h('span', { class: 'font-bold text-xs text-orbit-bg' }, row.last_appraised || 'N/A')
    }
  }
]

const fetchStaff = async () => {
  if (!departmentId.value) return
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      page_size: pageSize.value,
      search: searchKeyword.value,
      status: selectedStatus.value,
      role: selectedRole.value,
    }
    if (dateRange.value) {
      params.start_date = new Date(dateRange.value[0]).toISOString().split('T')[0]
      params.end_date = new Date(dateRange.value[1]).toISOString().split('T')[0]
    }
    const { data } = await getDepartmentStaff(departmentId.value, params)
    staffData.value = data?.results || []
    totalRecords.value = data?.count || 0
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const debouncedFetch = debounce(() => {
  currentPage.value = 1
  fetchStaff()
}, 500)

const handleExport = () => {
  if (staffData.value.length === 0) return message.warning('No data to export')
  downloading.value = true
  try {
    const headers = ['Staff ID', 'Name', 'Role', 'Rank']
    const rows = staffData.value.map(s => [s.staff_id, s.full_name, s.role, s.rank])
    const csvContent = headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Staff_List.csv`
    a.click()
  } finally { downloading.value = false }
}

const handleRowClick = (row) => {
  router.push(`/dean/staff-details/${row.id}`)
}

watch([selectedStatus, selectedRole, dateRange, currentPage, pageSize], fetchStaff)
watch(searchKeyword, debouncedFetch)
onMounted(fetchStaff)
</script>

<template>
  <div class="space-y-6">
    <div class="p-6 pb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h4 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">Staff Directory</h4>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Personnel Management System</p>
      </div>

      <button
        @click="handleExport"
        :disabled="downloading"
        class="w-full md:w-auto flex items-center justify-center bg-orbit-bg text-white px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
      >
        {{ downloading ? 'Exporting...' : 'Export CSV' }}
      </button>
    </div>

    <div class="px-6">
      <div class="flex flex-col lg:flex-row items-center gap-4 w-full">
        <div class="w-full lg:w-[30%]">
          <n-input
            v-model:value="searchKeyword"
            placeholder="SEARCH BY NAME OR ID..."
            clearable
            size="large"
            class="orbit-input shadow-sm"
          />
        </div>

        <div class="flex flex-row items-center gap-3 w-full lg:flex-1 overflow-x-auto pb-1 lg:pb-0">
          <n-date-picker v-model:value="dateRange" type="daterange" clearable class="flex-[2] min-w-[240px]" />
          <n-select v-model:value="selectedRole" :options="roleOptions" placeholder="ROLE" clearable class="flex-1 min-w-[140px]" />
          <n-select v-model:value="selectedStatus" :options="statusOptions" placeholder="STATUS" clearable class="flex-1 min-w-[140px]" />
        </div>
      </div>
    </div>

    <div class="px-6 pb-12">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="w-full overflow-x-auto overflow-y-hidden">
          <n-data-table
            remote
            :loading="loading"
            :columns="columns"
            :data="staffData"
            :bordered="false"
            :single-line="false"
            :row-props="(row) => ({
              style: 'cursor: pointer;',
              onClick: () => handleRowClick(row)
            })"
            class="custom-table"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 px-2">
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {{ staffData.length }} of {{ totalRecords }} Records
        </span>
        <n-pagination
          v-model:page="currentPage"
          :item-count="totalRecords"
          :page-size="pageSize"
          size="large"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }
.text-orbit-blue { color: #003366; }

/* BIG BOLD THEAD STYLES */
:deep(.n-data-table-thead th) {
  background-color: #f8fafc !important;
  font-size: 13px !important; /* Increased font size */
  font-weight: 800 !important; /* Extra bold */
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  color: #1e293b !important; /* High contrast dark color */
  padding: 18px 20px !important;
  border-bottom: 2px solid #e2e8f0 !important;
  white-space: nowrap;
}

:deep(.n-data-table-td) {
  padding: 16px 20px !important;
  border-bottom: 1px solid #f1f5f9 !important;
  font-size: 14px;
  color: #334155;
  transition: all 0.2s ease;
  white-space: nowrap;
}

:deep(.n-data-table-tr:hover td) {
  background-color: #f8fafc !important;
}

/* Scrollbar styling for horizontal table scroll */
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

/* Input Styles */
:deep(.n-input), :deep(.n-select-selection), :deep(.n-date-picker) {
  border-radius: 10px !important;
  --n-border-hover: 1px solid #003366 !important;
  --n-border-focus: 1px solid #003366 !important;
}
</style>