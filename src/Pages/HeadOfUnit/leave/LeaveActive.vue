<template>
  <section class="px-2 lg:px-8 pb-16 animate-in fade-in duration-700">
    <div class="flex items-center justify-between px-6 py-6">
      <div class="flex items-center gap-4">
        <button
          @click="router.back()"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-black text-orbit-bg hover:bg-gray-50 transition-all cursor-pointer uppercase tracking-tighter shadow-sm"
        >
          <ChevronLeft :size="18" /> Back
        </button>
        <div>
          <h2 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">Active Leaves</h2>
          <p class="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-1">Monitor currently out-of-office staff & substitutes</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="handleExportPDF"
          class="flex items-center gap-2 px-5 py-2.5 bg-[#003366] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-900/20"
        >
          <Download :size="14" /> Export PDF
        </button>
        <button
          @click="handlePrintRegistry"
          class="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-orbit-blue text-orbit-bg rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
        >
          <Printer :size="14" /> Print Registry
        </button>
      </div>
    </div>

    <div class="px-6">
      <div class="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">

        <div class="flex flex-wrap items-center justify-between gap-6 px-8 py-8 border-b border-slate-100">
          <div class="flex items-center gap-3">
             <div class="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
             <h3 class="font-black text-orbit-bg text-sm uppercase tracking-widest">Currently Active</h3>
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
              style="width: 200px"
              class="filter-select"
            />
          </div>
        </div>

        <div class="p-2">
          <n-data-table
            :loading="loading"
            :columns="tableColumns"
            :data="activeLeaves"
            :bordered="false"
            :single-line="true"
            :scroll-x="1200"
            class="hou-active-table"
          />
        </div>

        <div class="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
          <n-pagination
            v-model:page="currentPage"
            :item-count="totalRecords"
            :page-size="pageSize"
            show-size-picker
            :page-sizes="[10, 20, 50]"
          />
          <p class="text-[10px] font-black text-orbit-bg uppercase tracking-widest">
            Showing {{ activeLeaves.length }} of {{ totalRecords }} active records
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getLeaveList, getLeaveTypeStats } from "@/apis/management/staff";
import { differenceInDays, format, parseISO } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalendarDays, ChevronLeft, Download, Printer, Search } from 'lucide-vue-next';
import { NDataTable, NInput, NPagination, NSelect, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = useMessage();
const loading = ref(true);
const activeLeaves = ref([]);
const totalRecords = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const categoryData = ref([]);

const filters = ref({
  search: null,
  leaveType: null,
  status: 'APPROVED'
});

const leaveTypeOptions = computed(() =>
  categoryData.value.map(c => ({
    label: c.leave_type?.toUpperCase() || 'UNKNOWN',
    value: c.leave_type
  }))
);

// --- Fixed Table Columns ---
const tableColumns = [
  {
    title: 'NAME',
    key: 'name',
    render: (row) => {
      // Priority: Nested staff object -> staff_name string -> N/A
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
    title: 'START DATE',
    key: 'start_date',
    render: (row) => h('div', { class: 'flex items-center gap-2 text-slate-900 font-bold' }, [
      h(CalendarDays, { size: 14, class: 'text-blue-600' }),
      row.start_date
    ])
  },
  {
    title: 'END DATE',
    key: 'end_date',
    render: (row) => h('div', { class: 'flex items-center gap-2 text-slate-900 font-bold' }, [
      h(CalendarDays, { size: 14, class: 'text-blue-600' }),
      row.end_date
    ])
  },
  {
    title: 'REMAINING DAYS',
    key: 'remaining_days',
    render: (row) => {
      try {
        if (!row.end_date) return 'N/A';
        const remaining = differenceInDays(parseISO(row.end_date), new Date());
        return h('span', { class: 'px-3 py-1 bg-[#003366] text-white rounded-lg font-black text-[10px]' },
          remaining > 0 ? `${remaining} DAYS` : 'LAST DAY'
        );
      } catch (e) { return 'N/A'; }
    }
  },
  {
    title: 'ACTING OFFICER',
    key: 'acting_officer',
    render: (row) => {
      // Check for nested officer name or direct string
      const officer = row.acting_officer_details?.full_name || row.acting_officer || 'Not Assigned';
      return h('span', { class: 'font-bold text-slate-900 uppercase text-xs' }, officer);
    }
  }
];

const fetchData = async () => {
  loading.value = true;
  try {
    const [listRes, typRes] = await Promise.all([
      getLeaveList({
        page: currentPage.value,
        page_size: pageSize.value,
        search: filters.value.search || undefined,
        leave_type: filters.value.leaveType || undefined,
        status: 'APPROVED'
      }),
      getLeaveTypeStats()
    ]);

    // Debugging logs to see exactly what the server returns
    console.log("DEBUG: Leave List API Response:", listRes.data);

    if (listRes.data) {
      activeLeaves.value = listRes.data.results || [];
      totalRecords.value = listRes.data.count || 0;
    }
    if (typRes.data?.leave_type_stats) {
      categoryData.value = typRes.data.leave_type_stats;
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    if (error.response?.status === 401) {
      message.error("Session expired or Unauthorized. Please log in again.");
    } else {
      message.error("Failed to sync with server. Check connection.");
    }
  } finally {
    loading.value = false;
  }
};

const handleExportPDF = () => {
  if (!activeLeaves.value.length) return message.warning("No data to export");
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setFontSize(16);
  doc.setTextColor(0, 51, 102);
  doc.text('ACTIVE LEAVES REGISTRY', 14, 20);

  const rows = activeLeaves.value.map(r => [
    r.staff?.full_name || r.staff_name || 'N/A',
    r.leave_type || 'N/A',
    r.start_date || 'N/A',
    r.end_date || 'N/A',
    r.acting_officer || 'N/A'
  ]);

  autoTable(doc, {
    startY: 30,
    head: [['STAFF NAME', 'TYPE', 'START', 'END', 'ACTING OFFICER']],
    body: rows,
    headStyles: { fillColor: [0, 51, 102] }
  });
  doc.save(`Active_Leaves_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

const handlePrintRegistry = () => {
  window.print();
};

watch([filters, currentPage, pageSize], fetchData, { deep: true });
onMounted(fetchData);
</script>

<style scoped>
.search-input-elevated {
  width: 320px;
  border: 2px solid #e2e8f0 !important;
  transition: all 0.3s ease;
}

.search-input-elevated:focus-within {
  border-color: #003366 !important;
  box-shadow: 0 4px 12px rgba(0, 51, 102, 0.1);
}

:deep(.hou-active-table .n-data-table-thead th) {
  background-color: #f8fafc;
  font-size: 10px;
  font-weight: 900;
  color: #003366; /* Darkened */
  padding: 20px 24px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

:deep(.hou-active-table .n-data-table-td) {
  padding: 20px 24px;
  color: #1e293b; /* High contrast */
  border-bottom: 1px solid #f1f5f9 !important;
}

:deep(.n-input), :deep(.n-select) {
  --n-border: none !important;
  --n-border-hover: none !important;
  --n-border-focus: none !important;
}

@media print {
  .px-2, .pb-16, .flex, .border-b { display: none !important; }
  .px-6, .bg-white { display: block !important; padding: 0 !important; }
  .hou-active-table { display: block !important; width: 100%; }
}
</style>