<template>
  <div class="space-y-6 mt-4">
    <div class="px-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Department Records
        </h2>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Faculty Resource Management
        </p>
      </div>

      <div class="w-full md:w-80 lg:w-96">
        <n-input
          v-model:value="search"
          placeholder="SEARCH RECORDS..."
          clearable
          size="large"
          class="orbit-input shadow-sm"
        />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mx-1">
      <div class="overflow-x-auto custom-scrollbar">
        <n-data-table
          remote
          :columns="columns"
          :data="paginatedDepartments"
          :loading="loading"
          :bordered="false"
          :scroll-x="1200"
          :row-key="rowKey"
          :single-line="false"
          size="large"
          class="custom-table"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-2 pb-10">
      <button
        @click="exportPDF"
        class="w-full md:w-auto flex items-center justify-center bg-orbit-bg text-white px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
      >
        Export Summary (PDF)
      </button>

      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="total"
        show-size-picker
        :page-sizes="[5, 10, 20]"
        size="large"
      />
    </div>
  </div>
</template>

<script setup>
import { getDeanDepartmentOverview } from '@/apis/management/dean';
import { useAuthStore } from '@/store/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NDataTable, NInput, NPagination, NTag, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

const search = ref('')
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10) // Standardized to 10
const departments = ref([])

const facultyId = computed(() => authStore.facultyId || null)

const fetchDepartments = async () => {
  if (!facultyId.value) return
  loading.value = true
  try {
    const { data } = await getDeanDepartmentOverview(facultyId.value)
    departments.value = data || []
  } catch (err) {
    message.error('Failed to fetch departments')
  } finally {
    loading.value = false
  }
}

onMounted(fetchDepartments)

// Reset to page 1 when searching
watch(search, () => { page.value = 1 })

const filteredDepartments = computed(() => {
  if (!search.value) return departments.value
  const query = search.value.toLowerCase()
  return departments.value.filter(d =>
    d.department_name?.toLowerCase().includes(query) ||
    (d.hod_name?.toLowerCase() || '').includes(query)
  )
})

const paginatedDepartments = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredDepartments.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredDepartments.value.length)

const viewDepartment = (id) => {
  router.push(`/departments/${id}`)
}

const columns = [
  {
    title: 'Department',
    key: 'department_name',
    fixed: 'left',
    width: 220,
    render(row) {
      return h('span', { class: 'font-black text-orbit-bg uppercase text-xs tracking-tight' }, row.department_name)
    }
  },
  {
    title: 'HOD',
    key: 'hod_name',
    minWidth: 180,
    render(row) {
      return h('span', { class: 'font-bold text-gray-600' }, row.hod_name || 'N/A')
    }
  },
  {
    title: 'Staff',
    key: 'staff_count',
    align: 'center',
    render(row) {
      return h('span', { class: 'font-black text-orbit-bg' }, row.staff_count)
    }
  },
  { title: 'Academic', key: 'academic', align: 'center' },
  { title: 'Non-Academic', key: 'non_academic', align: 'center' },
  {
    title: 'Appraisals',
    key: 'active_appraisals',
    align: 'center',
    render(row) {
      return h(NTag, { type: 'info', round: true, bordered: false, size: 'small', class: 'font-bold' }, { default: () => row.active_appraisals })
    }
  },
  { title: 'Promotion', key: 'pending_promotion', align: 'center' },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 100,
    render(row) {
      return h('button', {
        class: 'bg-orbit-bg text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:opacity-80 transition-all',
        onClick: () => viewDepartment(row.department_id)
      }, 'View')
    }
  }
]

const rowKey = row => row.department_id

const exportPDF = () => {
  if (!departments.value.length) {
    message.warning('No data to export')
    return
  }
  const doc = new jsPDF()
  const tableColumn = columns.filter(c => c.key !== 'action').map(c => c.title)
  const tableRows = departments.value.map(d => [
    d.department_name, d.hod_name, d.staff_count, d.academic, d.non_academic, d.active_appraisals, d.pending_promotion
  ])
  doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20, theme: 'striped' })
  doc.text('Department Records Summary', 14, 15)
  doc.save('Department_Records.pdf')
}
</script>

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

/* Custom Scrollbar for Mobile */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

/* Input Polish */
:deep(.n-input) {
  border-radius: 10px !important;
  --n-border-hover: 1px solid #003366 !important;
  --n-border-focus: 1px solid #003366 !important;
}
</style>