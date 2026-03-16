<template>
  <section class="px-2 lg:px-8 space-y-8 pb-10">
    <SessionSemesterCard />

    <div class="px-6 space-y-8">
      <n-spin :show="loadingStats">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <template v-for="stat in summaryStats" :key="stat.key">
            <div v-if="stat.primary"
              class="bg-orbit-blue rounded-3xl px-8 py-7 text-white shadow-2xl relative overflow-hidden group transition-transform hover:scale-[1.01]">
              <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              <div class="relative z-10 flex flex-col justify-between h-full">
                <div class="flex items-center space-x-2 opacity-60">
                  <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span class="text-[10px] font-black uppercase tracking-widest">{{ stat.label }}</span>
                </div>
                <div class="mt-4">
                  <h3 class="text-5xl font-black tracking-tighter leading-none">{{ stat.value.toLocaleString() }}</h3>
                  <p class="text-[10px] font-bold text-blue-200/40 uppercase mt-2 tracking-widest italic">Live Personnel</p>
                </div>
              </div>
            </div>

            <div v-else
              class="bg-white rounded-3xl border border-gray-100 shadow-sm px-8 py-7 flex flex-col justify-between hover:shadow-md transition-all group">
              <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ stat.label }}</span>
              <div class="mt-4 flex items-end justify-between">
                <span class="text-4xl font-black text-orbit-bg tracking-tighter">{{ stat.value }}</span>
                <div class="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                   <div class="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-blue-400"></div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </n-spin>

      <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-8 border-b border-gray-50 bg-white">
          <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div>
              <h4 class="text-3xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
                Unit Directory
              </h4>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3">
                Personnel Management & Monitoring
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <n-input v-model:value="searchQuery" placeholder="SEARCH NAME OR ID..." size="large" clearable style="width: 220px" class="custom-input">
                <template #prefix><Search :size="16" class="text-gray-400" /></template>
              </n-input>

              <n-select v-model:value="filters.category" :options="categoryOptions" placeholder="CADRE" clearable size="large" style="width: 160px" />
              <n-select v-model:value="filters.status" :options="statusOptions" placeholder="STATUS" clearable size="large" style="width: 160px" />

              <n-button type="primary" size="large" @click="handleExport" class="orbit-btn-header" :loading="exporting">
                <template #icon><Upload :size="18" /></template>
                GENERATE PDF
              </n-button>
            </div>
          </div>
        </div>

        <div class="w-full">
          <n-data-table
            remote
            :loading="loadingTable"
            :columns="columns"
            :data="staffData"
            :bordered="false"
            :scroll-x="1300"
            :row-props="rowProps"

            @update:page="handlePageChange"
          />
        </div>

        <div class="p-8 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-gray-50/30">
          <n-pagination
            v-model:page="pagination.page"
            :item-count="pagination.itemCount"
            v-model:page-size="pagination.pageSize"
            show-size-picker
            :page-sizes="[7, 14, 21]"
            @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange"
          />

          <div class="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-gray-200 shadow-sm">
            <span class="text-[10px] font-black text-orbit-bg uppercase tracking-tighter">Jump to</span>
            <n-input-number
              v-model:value="jumpToPageValue"
              :min="1"
              :max="Math.ceil(pagination.itemCount / pagination.pageSize) || 1"
              size="small"
              class="w-20"
              :show-button="false"
            />
            <button @click="handleJumpToPage" class="bg-orbit-blue text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase active:scale-95 transition-all">
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ... (Imports remain same)
import { getAllStaff, getStaffSummaryStats } from "@/apis/management/staff"
import SessionSemesterCard from '@/components/SessionSemesterCard.vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Calendar, ChevronRight, Search, Upload } from 'lucide-vue-next'
import { NButton, NDataTable, NInput, NInputNumber, NPagination, NSelect, NSpin, NTag, useMessage } from 'naive-ui'
import { computed, h, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const message = useMessage()

// States
const loadingStats = ref(true)
const loadingTable = ref(false)
const exporting = ref(false)
const jumpToPageValue = ref(1)
const searchQuery = ref('')
const filters = reactive({ category: null, status: null })
const rawStats = ref(null)
const staffData = ref([])

// Enriched pagination state
const pagination = reactive({
  page: 1,
  pageSize: 7,
  itemCount: 0,
  prefix: (info) => h('span', { class: 'text-[10px] font-bold text-gray-400 uppercase tracking-widest' }, `Total: ${info.itemCount}`)
})

// ... (Columns definition remains same)
const columns = [
  {
    title: 'Staff ID',
    key: 'id',
    render(row) {
      const val = row.staff_id || row.id
      return h('span', { class: 'font-mono text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100' }, `ORBIT-${String(val).padStart(4, '0')}`)
    }
  },
  {
    title: 'Full Name',
    key: 'full_name',
    render: (row) => h('span', { class: 'font-black text-orbit-bg uppercase tracking-tighter' }, row.full_name || '-')
  },
  {
    title: 'Position',
    key: 'position',
    render: (row) => h('span', { class: 'font-bold text-gray-500 italic text-[11px]' }, row.position || '-')
  },
  {
    title: 'Cadre',
    key: 'cadre',
    render: (row) => h('span', { class: 'font-black text-gray-400 uppercase text-[9px] tracking-widest' }, row.cadre || (row.is_academic ? 'Academic' : 'Non-Academic'))
  },
  {
    title: 'Status',
    key: 'employment_status',
    render: (row) => {
      const status = row.employment_status || row.employment_type || '-'
      const type = status.toLowerCase().includes('full') ? 'success' : 'warning'
      return h(NTag, { bordered: false, type, round: true, class: 'font-black uppercase text-[9px] px-5 py-0.5 tracking-tighter' }, { default: () => status })
    }
  },
  {
    title: 'Last Promotion',
    key: 'last_promotion',
    render: (row) => h('div', { class: 'flex items-center space-x-2' }, [
      h(Calendar, { size: 14, class: 'text-gray-300' }),
      h('span', { class: 'font-black text-gray-400 text-[10px] tracking-tighter' }, row.last_promotion || 'N/A')
    ])
  },
  {
    title: 'Action',
    key: 'actions',
    align: 'right',
    fixed: 'right',
    render(row) {
      return h(NButton, {
        size: 'medium',
        type: 'primary',
        strong: true,
        class: 'orbit-view-btn',
        onClick: (e) => {
          e.stopPropagation()
          router.push(`/unit_head/staffs/${row.id}`)
        }
      }, {
        default: () => 'View',
        icon: () => h(ChevronRight, { size: 16 })
      })
    }
  }
]

const fetchStaffList = async () => {
  loadingTable.value = true
  try {
    const res = await getAllStaff({
      page: pagination.page,
      page_size: pagination.pageSize,
      search: searchQuery.value,
      employment_type: filters.status,
      dept_code: filters.category
    })

    const responseData = res.data || res

    // Handle both wrapped and flat responses
    staffData.value = responseData.results || (Array.isArray(responseData) ? responseData : [])

    // Fallback if backend doesn't provide 'count'
    pagination.itemCount = responseData.count || staffData.value.length

  } catch (err) {
    message.error("Failed to load staff list")
  } finally {
    loadingTable.value = false
  }
}

// Handlers for pagination updates
const handlePageChange = (page) => {
  pagination.page = page
  fetchStaffList()
}

const handlePageSizeChange = (pageSize) => {
  pagination.pageSize = pageSize
  pagination.page = 1 // Reset to first page when density changes
  fetchStaffList()
}

const handleJumpToPage = () => {
  const max = Math.ceil(pagination.itemCount / pagination.pageSize)
  if (jumpToPageValue.value >= 1 && jumpToPageValue.value <= max) {
    pagination.page = jumpToPageValue.value
    fetchStaffList()
  }
}

// ... (Rest of logic: Export, rowProps, watch, onMounted)
const fetchDashboardData = async () => {
  loadingStats.value = true
  try {
    const res = await getStaffSummaryStats()
    rawStats.value = res.data || res
  } finally {
    loadingStats.value = false
  }
}

const handleExport = async () => {
  if (!staffData.value.length) return message.warning("No data to export")
  exporting.value = true
  try {
    const doc = jsPDF({ orientation: 'landscape' })
    const body = staffData.value.map(row => [
      `ORBIT-${String(row.staff_id || row.id).padStart(4, '0')}`,
      row.full_name?.toUpperCase() || '-',
      row.position || '-',
      row.cadre || (row.is_academic ? 'Academic' : 'Non-Academic'),
      (row.employment_status || row.employment_type || '-').toUpperCase(),
      row.last_promotion || 'N/A'
    ])

    autoTable(doc, {
      startY: 20,
      head: [['STAFF ID', 'FULL NAME', 'DESIGNATION', 'CADRE', 'STATUS', 'LAST PROMOTION']],
      body: body,
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8 }
    })

    doc.save(`Orbit_Directory_${Date.now()}.pdf`)
    message.success("PDF Exported Successfully")
  } catch (e) {
    message.error("Export failed")
  } finally {
    exporting.value = false
  }
}

const rowProps = (row) => ({
  style: 'cursor: pointer;',
  onClick: () => router.push(`/unit_head/staffs/${row.id}`)
})

const categoryOptions = computed(() => {
  const unique = [...new Set(staffData.value.map(s => s.cadre || (s.is_academic ? 'Academic' : 'Non-Academic')))]
  return unique.filter(Boolean).map(c => ({ label: c.toUpperCase(), value: c }))
})

const statusOptions = computed(() => {
  const unique = [...new Set(staffData.value.map(s => s.employment_status || s.employment_type))]
  return unique.filter(Boolean).map(s => ({ label: s.toUpperCase(), value: s }))
})

watch([searchQuery, () => filters.status, () => filters.category], () => {
  pagination.page = 1
  fetchStaffList()
})

onMounted(() => {
  fetchDashboardData()
  fetchStaffList()
})

const summaryStats = computed(() => [
  { key: 'active', label: 'ACTIVE', value: rawStats.value?.active_count || 0, primary: true },
  { key: 'probation', label: 'PROBATION', value: rawStats.value?.probation_count || 0, primary: false },
  { key: 'leave', label: 'STUDY LEAVE', value: rawStats.value?.study_leave || 0, primary: false },
  { key: 'retired', label: 'RETIRED', value: rawStats.value?.retired_count || 0, primary: false },
])
</script>

<style scoped>
/* ... (Style remains same) ... */
:deep(.n-data-table-td) { padding: 24px 16px !important; }
:deep(.n-data-table-th) {
  background-color: #fcfcfc !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  color: #94a3b8 !important;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-bottom: 2px solid #f1f5f9 !important;
}
.orbit-btn-header {
  background-color: #003366 !important;
  color: white !important;
  border: none !important;
  border-radius: 14px !important;
  font-weight: 900 !important;
  letter-spacing: 0.05em !important;
  padding: 0 28px !important;
  box-shadow: 0 4px 14px 0 rgba(0, 51, 102, 0.2);
  transition: all 0.3s ease;
}
.orbit-btn-header:hover {
  background-color: #002244 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(0, 51, 102, 0.3);
}
.orbit-view-btn {
  background-color: #003366 !important;
  color: white !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 0 20px !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s ease;
}
.orbit-view-btn:hover {
  background-color: #002244 !important;
  box-shadow: 0 4px 12px rgba(0, 34, 68, 0.25);
}
:deep(.n-input), :deep(.n-select .n-base-selection) {
  border-radius: 14px !important;
}
</style>