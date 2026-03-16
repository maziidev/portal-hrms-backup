<template>
  <section class="px-2 lg:px-8 pb-16 animate-in fade-in duration-700">
    <div class="flex items-center justify-between px-6 py-6 no-print">
      <div class="flex items-center gap-4">
        <button
          @click="router.back()"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-black text-orbit-bg hover:bg-gray-50 transition-all cursor-pointer uppercase tracking-tighter shadow-sm"
        >
          <ChevronLeft :size="18" /> Back
        </button>
        <div>
          <h2 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">Leave Requests</h2>
          <p class="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-1">Department Overview & Request History</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="handleExportPDF"
          class="flex items-center gap-2 px-5 py-2.5 bg-orbit-bg text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-900/20"
        >
          <Download :size="14" /> Export PDF
        </button>
        <button
          @click="handlePrintRegistry"
          class="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-orbit-bg text-orbit-bg rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
        >
          <Printer :size="14" /> Print Registry
        </button>
      </div>
    </div>

    <div class="px-6">
      <div class="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 print-container">
        <div class="flex flex-wrap items-center justify-between gap-6 px-8 py-8 border-b border-slate-100 no-print">
          <div class="flex items-center gap-3">
             <div class="w-2.5 h-2.5 rounded-full bg-orbit-blue animate-pulse"></div>
             <h3 class="font-black text-orbit-bg text-sm uppercase tracking-widest">Overview Registry</h3>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <n-input
              v-model:value="filters.search"
              placeholder="NAME / STAFF ID..."
              size="large"
              clearable
              round
              class="search-input-elevated"
            >
              <template #prefix><Search :size="16" class="text-orbit-bg" /></template>
            </n-input>

            <n-select
              v-model:value="filters.leaveType"
              :options="leaveTypeOptions"
              placeholder="LEAVE TYPE"
              clearable
              size="large"
              style="width: 180px"
            />

            <n-select
              v-model:value="filters.cadre"
              :options="cadreOptions"
              placeholder="CADRE"
              clearable
              size="large"
              style="width: 150px"
            />

            <n-date-picker
              v-model:value="filters.dateRange"
              type="month"
              placeholder="MONTH / YEAR"
              clearable
              size="large"
              style="width: 180px"
            />
          </div>
        </div>

        <div class="p-2">
          <n-data-table
            :loading="loading"
            :columns="tableColumns"
            :data="leaveRequests"
            :bordered="false"
            :single-line="true"
            :scroll-x="1200"
            class="hou-active-table"
          />
        </div>

        <div class="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 no-print">
          <n-pagination
            v-model:page="currentPage"
            :item-count="totalRecords"
            :page-size="pageSize"
            show-size-picker
            :page-sizes="[10, 20, 50]"
          />
          <p class="text-[10px] font-black text-orbit-bg uppercase tracking-widest">
            Displaying {{ leaveRequests.length }} records
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getLeaveList, getLeaveTypeStats } from "@/apis/management/staff";
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ChevronLeft, Download, Printer, Search } from 'lucide-vue-next';
import { NDataTable, NDatePicker, NInput, NPagination, NSelect, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// Import your logo - adjust path as needed


const router = useRouter();
const message = useMessage();
const loading = ref(true);
const leaveRequests = ref([]);
const totalRecords = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const categoryData = ref([]);

const filters = ref({
  search: null,
  leaveType: null,
  cadre: null,
  dateRange: null
});

const cadreOptions = [
  { label: 'ACADEMIC', value: 'academic' },
  { label: 'NON-ACADEMIC', value: 'non-academic' }
];

const leaveTypeOptions = computed(() =>
  categoryData.value.map(c => ({ label: c.leave_type.toUpperCase(), value: c.leave_type }))
);

const handlePrintRegistry = () => {
  window.print();
};

const handleExportPDF = () => {
  if (!leaveRequests.value.length) return message.warning("No data to export");

  const doc = new jsPDF('l', 'mm', 'a4');


  // Header Title
  doc.setFontSize(18);
  doc.setTextColor(17, 27, 73);
  doc.text('LEAVE REQUESTS REGISTRY', 40, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${format(new Date(), 'PPP p')}`, 40, 26);

  const tableData = leaveRequests.value.map(r => [
    r.staff?.full_name || r.staff_name || 'N/A',
    r.leave_type || 'N/A',
    r.entitlement || 30,
    r.taken || 0,
    r.remaining || 0,
    r.status || 'PENDING'
  ]);

  autoTable(doc, {
    startY: 35,
    head: [['STAFF NAME', 'LEAVE TYPE', 'ENTITLEMENT', 'TAKEN', 'REMAINING', 'STATUS']],
    body: tableData,
    headStyles: { fillColor: [17, 27, 73], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 4, font: 'helvetica' },
    alternateRowStyles: { fillColor: [245, 247, 254] }
  });

  doc.save(`Leave_Requests_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

const tableColumns = [
  {
    title: 'NAME',
    key: 'name',
    render: (row) => {
      const name = row.staff?.full_name || row.staff_name || 'N/A';
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', { class: 'w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-[11px] font-black text-orbit-bg' }, name.charAt(0)),
        h('span', { class: 'font-black text-orbit-bg uppercase tracking-tighter' }, name)
      ]);
    }
  },
  {
    title: 'LEAVE TYPE',
    key: 'leave_type',
    render: (row) => h('span', { class: 'font-bold text-slate-800 uppercase text-xs' }, row.leave_type)
  },
  {
    title: 'ENTITLEMENT',
    key: 'entitlement',
    render: (row) => h('span', { class: 'font-bold text-slate-900' }, row.entitlement || 30)
  },
  {
    title: 'TAKEN',
    key: 'taken',
    render: (row) => h('span', { class: 'font-bold text-slate-500' }, row.taken || 0)
  },
  {
    title: 'REMAINING',
    key: 'remaining',
    render: (row) => h('span', { class: 'font-black text-orbit-bg' }, row.remaining || 0)
  },
  {
    title: 'STATUS',
    key: 'status',
    render: (row) => {
      const status = row.status || 'PENDING';
      const isApproved = status === 'APPROVED' || status === 'Ongoing';
      return h('span', {
        class: `px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-wider ${
          isApproved ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
        }`
      }, status);
    }
  }
];

const fetchData = async () => {
  loading.value = true;
  try {
    const monthYear = filters.value.dateRange ? format(new Date(filters.value.dateRange), 'yyyy-MM') : undefined;
    const [listRes, typRes] = await Promise.all([
      getLeaveList({
        page: currentPage.value,
        page_size: pageSize.value,
        search: filters.value.search || undefined,
        leave_type: filters.value.leaveType || undefined,
        cadre: filters.value.cadre || undefined,
        month: monthYear
      }),
      getLeaveTypeStats()
    ]);

    if (listRes.data) {
      leaveRequests.value = listRes.data.results || [];
      totalRecords.value = listRes.data.count || 0;
    }
    if (typRes.data?.leave_type_stats) {
      categoryData.value = typRes.data.leave_type_stats;
    }
  } catch (error) {
    if (error.response?.status === 401) message.error("Session Unauthorized.");
  } finally {
    loading.value = false;
  }
};

watch([filters, currentPage, pageSize], fetchData, { deep: true });
onMounted(fetchData);
</script>

<style scoped>
.search-input-elevated {
  width: 280px;
  border: 2px solid #f1f5f9 !important;
  transition: all 0.3s ease;
}

.search-input-elevated:focus-within {
  border-color: var(--color-orbit-blue) !important;
  box-shadow: 0 4px 12px rgba(35, 136, 255, 0.1);
}

:deep(.hou-active-table .n-data-table-thead th) {
  background-color: #f8fafc;
  font-size: 10px;
  font-weight: 900;
  color: #111b49;
  padding: 20px 24px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

:deep(.hou-active-table .n-data-table-td) {
  padding: 20px 24px;
  color: #1e293b;
  border-bottom: 1px solid #f1f5f9 !important;
}

:deep(.n-input), :deep(.n-select), :deep(.n-date-picker) {
  --n-border: none !important;
  --n-border-hover: none !important;
  --n-border-focus: none !important;
}

@media print {
  .no-print { display: none !important; }
  body { background: white !important; }
  .print-container { border: none !important; box-shadow: none !important; }
}
</style>