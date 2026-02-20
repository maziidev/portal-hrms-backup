<script setup>
import { getDepartmentStaff } from '@/apis/management/dean'
import { useAuthStore } from '@/store/auth'
import { NDataTable, NPagination, NSelect, NTag, useMessage } from 'naive-ui'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const message = useMessage()

// Priority: URL params > Auth store
const departmentId = computed(() => route.params.id || route.params.departmentId || authStore.user?.department_id)

const staffData = ref([])
const loading = ref(false)
const selectedLeaveType = ref(null)
const selectedAvgScore = ref(null)
const selectedStatus = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const totalRecords = ref(0)

const leaveTypeOptions = [
  { label: 'ANNUAL LEAVE', value: 'annual' },
  { label: 'SICK LEAVE', value: 'sick' },
]

const avgScoreOptions = Array.from({ length: 20 }, (_, i) => ({
  label: `${(i + 1) * 5}% OR HIGHER`,
  value: (i + 1) * 5
}))

const statusOptions = [
  { label: 'SUBMITTED', value: 'submitted' },
  { label: 'PENDING', value: 'pending' },
  { label: 'COMPLETED', value: 'completed' },
  { label: 'APPROVED', value: 'approved' }
]

const columns = [
  {
    title: 'Department',
    key: 'department',
    fixed: 'left',
    width: 200,
    render(row) {
      return h('span', { class: 'font-black text-orbit-bg uppercase text-xs tracking-tight' }, row.department || 'N/A')
    }
  },
  {
    title: 'HOD',
    key: 'hod',
    minWidth: 180,
    render(row) {
      return h('span', { class: 'font-bold text-gray-600' }, row.hod || 'Unassigned')
    }
  },
  {
    title: 'Staff Count',
    key: 'staff_count',
    align: 'center',
    render(row) {
      return h('span', { class: 'font-black text-orbit-bg' }, row.staff_count || 0)
    }
  },
  { title: 'Academic', key: 'academic', align: 'center' },
  { title: 'Non-Academic', key: 'non_academic', align: 'center' },
  {
    title: 'Avg Score',
    key: 'avg_appraisal_score',
    align: 'center',
    render(row) {
      const score = parseFloat(row.avg_appraisal_score) || 0
      return h(NTag, {
        bordered: false,
        round: true,
        size: 'small',
        class: score >= 70 ? '!bg-green-50 !text-green-700 font-bold' : '!bg-blue-50 !text-orbit-blue font-bold'
      }, { default: () => `${score}%` })
    }
  },
  {
    title: 'Pending Leaves',
    key: 'pending_leave_requests',
    align: 'center',
    render(row) {
      return h('span', { class: 'font-bold text-red-500' }, row.pending_leave_requests || 0)
    }
  }
]

const rowKey = row => row.id || row.department

const handleRowClick = (row) => {
  router.push({ name: 'DeanStaffDepartments', params: { id: row.id } })
}

const fetchStaff = async () => {
  if (!departmentId.value) return
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      page_size: pageSize.value,
      leave_type: selectedLeaveType.value,
      avg_score: selectedAvgScore.value,
      status: selectedStatus.value
    }

    const { data } = await getDepartmentStaff(departmentId.value, params)
    staffData.value = data?.results || data?.data || []
    totalRecords.value = data?.count || staffData.value.length
  } catch (err) {
    message.error('Failed to load staff records')
  } finally {
    loading.value = false
  }
}

const exportPDF = () => {
  if (!staffData.value.length) return message.info('No data to export')
  message.success('Generating PDF Report...')
}

onMounted(fetchStaff)
watch([selectedLeaveType, selectedAvgScore, selectedStatus, currentPage, pageSize], fetchStaff)
</script>

<template>
  <div class="space-y-6 mt-4">

    <div class="px-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h4 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Department Personnel
        </h4>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Staffing & Appraisal Oversight
        </p>
      </div>

      <button
        @click="exportPDF"
        class="w-full md:w-auto flex items-center justify-center bg-orbit-bg text-white px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0l5-5m-5 5l-5-5"/>
        </svg>
        Export PDF Summary
      </button>
    </div>

    <div class="px-2">
      <div class="flex flex-row items-center gap-3 w-full overflow-x-auto pb-2 custom-scrollbar">
        <n-select
          v-model:value="selectedLeaveType"
          :options="leaveTypeOptions"
          placeholder="LEAVE TYPE"
          clearable
          class="min-w-[160px] lg:w-48"
        />

        <n-select
          v-model:value="selectedAvgScore"
          :options="avgScoreOptions"
          placeholder="MIN APPRAISAL SCORE"
          clearable
          class="min-w-[200px] lg:w-60"
        />

        <n-select
          v-model:value="selectedStatus"
          :options="statusOptions"
          placeholder="STATUS"
          clearable
          class="min-w-[160px] lg:w-48"
        />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mx-1">
      <div class="overflow-x-auto custom-scrollbar">
        <n-data-table
          remote
          :columns="columns"
          :data="staffData"
          :loading="loading"
          :row-key="rowKey"
          :bordered="false"
          :single-line="false"
          :scroll-x="1200"
          size="large"
          class="custom-table cursor-pointer"
          @row-click="handleRowClick"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-2 pb-10">
      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Showing {{ staffData.length }} of {{ totalRecords }} Departments
      </span>
      <n-pagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :item-count="totalRecords"
        show-size-picker
        :page-sizes="[5, 10, 20]"
        size="large"
      />
    </div>
  </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }
.text-orbit-blue { color: #003366; }

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

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

/* Input Polish */
:deep(.n-input), :deep(.n-select-selection) {
  border-radius: 10px !important;
  --n-border-hover: 1px solid #003366 !important;
  --n-border-focus: 1px solid #003366 !important;
}
</style>