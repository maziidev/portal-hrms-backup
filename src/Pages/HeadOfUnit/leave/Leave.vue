<template>
  <section class="px-4 lg:px-10 pb-12 space-y-10 animate-in fade-in duration-700">

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div v-if="loading" class="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-2xl shadow-sm">
        <n-spin size="small" />
        <span class="text-[10px] uppercase tracking-widest">Refreshing Data</span>
      </div>
    </div>

    <SessionSemesterCard/>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-4 bg-orbit-bg rounded-4xl p-8 text-white shadow-2xl relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Users :size="150" stroke-width="1" />
        </div>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Total Applications</p>
        <h2 class="text-6xl font-black mt-3 tracking-tighter">{{ stats.total }}</h2>
        <div class="mt-6 flex items-center gap-2">
          <div class="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
            <Activity :size="14" /> Live
          </div>
          <span class="text-slate-400 text-[11px] font-medium uppercase tracking-tighter">Real-time sync</span>
        </div>
      </div>

      <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="stat in leaveStats" :key="stat.label"
             class="bg-white border border-slate-100 rounded-[1.5rem] px-6 py-8 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
          <div>
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ stat.label }}</p>
            <p class="text-3xl font-black text-orbit-bg mt-1">{{ stat.value }}</p>
          </div>
          <div :class="stat.colorClass" class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
            <component :is="stat.icon" :size="24" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
        <h3 class="text-xs font-black text-orbit-bg uppercase tracking-widest mb-6">Metrics Overview</h3>
        <vue-apex-charts type="bar" height="350" :options="metricsOptions" :series="metricsSeries" />
      </div>

      <div class="lg:col-span-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center relative">
        <h3 class="text-xs font-black text-orbit-bg uppercase tracking-widest mb-6 self-start">Approval Ratio</h3>
        <vue-apex-charts type="donut" width="100%" height="250" :options="houLeaveOptions" :series="houLeaveSeries" />
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-10">
          <span class="text-3xl font-black text-orbit-bg">{{ approvalPercentage }}%</span>
          <span class="text-[10px] font-bold text-gray-400 uppercase">Approval Rate</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
        <h3 class="text-xs font-black text-orbit-bg uppercase tracking-widest mb-6">Leave Category Distribution</h3>
        <vue-apex-charts type="bar" height="350" :options="categoryOptions" :series="categorySeries" />
      </div>

      <div class="lg:col-span-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xs font-black text-orbit-bg uppercase tracking-widest">Departmental Alerts</h3>
          <n-badge :value="aggregatedNotifications.length" color="#003366" />
        </div>
        <div class="space-y-4 overflow-y-auto max-h-[280px] pr-2">
          <div v-for="(n, i) in aggregatedNotifications" :key="i" class="flex gap-4 group">
            <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
              <component :is="n.icon" :size="18" :class="n.color" />
            </div>
            <div class="flex-1 border-b border-slate-50 pb-4">
              <p class="text-sm font-bold text-slate-800 leading-tight">{{ n.message }}</p>
              <p class="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">{{ n.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="">
  <h3 class="text-xs font-black text-orbit-bg uppercase tracking-widest mb-6">Quick Actions / Shortcuts</h3>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <router-link
      :to="{ name: 'LeaveActive' }"
      class="flex items-center justify-center gap-4 bg-orbit-blue hover:bg-[#002244] text-white p-5 rounded-2xl transition-all shadow-lg shadow-blue-900/10 group"
    >
      <UserPlus :size="22" class="group-hover:scale-110 transition-transform" />
      <span class="font-bold text-sm uppercase tracking-tight">View Active Leaves</span>
    </router-link>

    <router-link
      :to="{ name: 'LeaveBalance' }"
      class="flex items-center justify-center gap-4 bg-orbit-blue hover:bg-[#002244] text-white p-5 rounded-2xl transition-all shadow-lg shadow-blue-900/10 group"
    >
      <FileDown :size="22" class="group-hover:scale-110 transition-transform" />
      <span class="font-bold text-sm uppercase tracking-tight">Leave Balance Report</span>
    </router-link>

    <button
      @click="handleExportPDF"
      class="flex items-center justify-center gap-4 bg-orbit-blue hover:bg-[#002244] text-white p-5 rounded-2xl transition-all shadow-lg shadow-blue-900/10 group"
    >
      <Upload :size="22" class="group-hover:scale-110 transition-transform" />
      <span class="font-bold text-sm uppercase tracking-tight">Export Summary (PDF)</span>
    </button>
  </div>
</div>
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-8 border-b border-gray-50 bg-white">
        <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <div>
            <h4 class="text-3xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">Leave Requests</h4>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3">Staff Leave History & Records</p>
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <n-input v-model:value="filters.search" placeholder="SEARCH STAFF..." size="large" clearable style="width: 280px" class="shadow-sm">
                <template #prefix><Search :size="16" class="text-gray-400" /></template>
            </n-input>
            <n-select v-model:value="filters.leaveType" :options="leaveTypeOptions" placeholder="FILTER BY TYPE" clearable size="large" style="width: 240px" class="shadow-sm" />
            <n-date-picker v-model:value="filters.date" type="month" placeholder="MONTH/YEAR" clearable size="large" style="width: 220px" class="shadow-sm" />
            <n-select v-model:value="filters.status" :options="statusOptions" placeholder="FILTER BY STATUS" clearable size="large" style="width: 200px" class="shadow-sm" />
          </div>
        </div>
      </div>

      <n-data-table :loading="loading" :columns="tableColumns" :data="leaveRequests" :bordered="false" :scroll-x="1200" class="hou-table" />

      <div class="p-8 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-gray-50/30">
        <n-pagination v-model:page="currentPage" :item-count="totalRecords" :page-size="pageSize" show-size-picker :page-sizes="[10, 20, 50]" />
        <div class="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-gray-200 shadow-sm">
          <span class="text-[10px] font-black text-orbit-bg uppercase tracking-tighter">Jump to</span>
          <n-input-number v-model:value="jumpToPageValue" :min="1" size="small" class="w-20" :show-button="false" />
          <button @click="handleJumpToPage" class="bg-orbit-blue text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase">Go</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getLeaveList, getLeaveSummaryStats, getLeaveTypeStats } from "@/apis/management/staff";
import SessionSemesterCard from "@/components/SessionSemesterCard.vue";
import { differenceInDays, parseISO } from 'date-fns';
// Added missing AlertCircle and BellRing imports
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Activity, AlertCircle, BellRing, CheckCircle2, Clock, FileDown, PlayCircle, Search, Upload, UserPlus, Users } from 'lucide-vue-next';
import { NBadge, NDataTable, NDatePicker, NInput, NInputNumber, NPagination, NSelect, NSpin, NTag, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const message = useMessage();
const loading = ref(true);
const stats = ref({ total: 0, pending: 0, approved: 0, active: 0, rejected: 0 });
const categoryData = ref([]);
const leaveRequests = ref([]);
const totalRecords = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const jumpToPageValue = ref(1);
const filters = ref({ search: null, leaveType: null, date: null, status: null });

// --- Charts Logic ---
const houLeaveSeries = computed(() => [stats.value.approved, stats.value.rejected]);
const houLeaveOptions = {
    chart: { type: 'donut', toolbar: { show: false } },
    labels: ["Approved Leaves", "Rejected Leaves"],
    dataLabels: { enabled: true },
    colors: ['#2388ff', '#2B4DED'],
    plotOptions: { pie: { customScale: 0.9, donut: { size: '40%' } } },
    legend: { show: false }
};

const metricsSeries = computed(() => [{
    name: "metrics overview",
    data: [stats.value.total, stats.value.pending, stats.value.approved, stats.value.rejected, stats.value.active]
}]);

const metricsOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, barHeight: '80%', borderRadius: 4, borderRadiusApplication: 'end' } },
    xaxis: { categories: ["Total Requests", "Pending Approvals", "Approved Leaves", "Rejected/Cancelled", "Ongoing Leaves"] },
    dataLabels: { enabled: true },
    colors: ['#2388ff'],
    grid: { borderColor: '#f1f1f1' }
};

const categorySeries = computed(() => [{
    name: "Leaves by Type",
    data: categoryData.value.map(i => i.count || 0)
}]);

const categoryOptions = computed(() => ({
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { barHeight: '80%', borderRadius: 4, borderRadiusApplication: 'end', columnWidth: '50%' } },
    xaxis: { categories: categoryData.value.map(i => i.leave_type || 'N/A') },
    dataLabels: { enabled: true },
    colors: ['#2388ff'],
    grid: { show: false }
}));

// --- Notifications Logic (Fixed Property Missing Error) ---
const aggregatedNotifications = computed(() => {
  const n = [];
  if (stats.value.pending > 0) {
    n.push({
      message: `${stats.value.pending} requests awaiting review`,
      time: 'Action Required',
      icon: AlertCircle,
      color: 'text-amber-500'
    });
  }
  leaveRequests.value.slice(0, 2).forEach(r => {
    if (r.status === 'APPROVED') {
      n.push({
        message: `Approved: ${r.staff?.full_name || r.staff_name || 'Staff'}`,
        time: 'Recent',
        icon: BellRing,
        color: 'text-blue-500'
      });
    }
  });
  return n;
});

const leaveStats = computed(() => [
  { label: 'Pending', value: stats.value.pending, icon: Clock, colorClass: 'bg-amber-50 text-amber-500' },
  { label: 'Approved', value: stats.value.approved, icon: CheckCircle2, colorClass: 'bg-emerald-50 text-emerald-500' },
  { label: 'Active', value: stats.value.active, icon: PlayCircle, colorClass: 'bg-blue-50 text-blue-500' },
]);

const leaveTypeOptions = computed(() => {
  return categoryData.value.map(c => ({
    label: (c.leave_type || 'Unknown').toUpperCase(),
    value: c.leave_type
  }));
});

const approvalPercentage = computed(() => (stats.value.total > 0) ? Math.round((stats.value.approved / stats.value.total) * 100) : 0);

const statusOptions = [
  { label: 'PENDING', value: 'PENDING' },
  { label: 'APPROVED', value: 'APPROVED' },
  { label: 'REJECTED', value: 'REJECTED' }
];

const tableColumns = [
  { title: 'STAFF ID', key: 'staff_id', render: (row) => h('span', { class: ' text-orbit-blue font-bold' }, `ORBIT-${row.staff?.id || row.staff_id || 'N/A'}`) },
  {
    title: 'NAME',
    key: 'name',
    render: (row) => {
      const name = row.staff?.full_name || row.staff_name || 'Unknown Staff';
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', { class: 'w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black' }, name.charAt(0)),
        h('span', { class: 'font-black text-orbit-bg uppercase' }, name)
      ]);
    }
  },
  { title: 'LEAVE TYPE', key: 'leave_type', render: (row) => h('span', { class: 'font-bold text-gray-600 uppercase text-xs' }, row.leave_type) },
  { title: 'START DATE', key: 'start_date', render: (row) => h('span', { class: 'font-bold text-gray-800' }, row.start_date) },
  { title: 'END DATE', key: 'end_date', render: (row) => h('span', { class: 'font-bold text-gray-800' }, row.end_date) },
  {
    title: 'DURATION',
    render: (row) => {
        try {
            const days = differenceInDays(parseISO(row.end_date), parseISO(row.start_date)) + 1;
            return h('span', { class: 'px-3 py-1 bg-slate-100 rounded-lg font-black text-orbit-bg text-[10px]' }, `${days} DAYS`);
        } catch (e) { return h('span', { class: 'text-gray-300' }, 'N/A'); }
    }
  },
  {
    title: 'STATUS',
    align: 'center',
    render: (row) => {
      const s = row.status?.toUpperCase() || 'PENDING';
      const type = s === 'APPROVED' ? 'success' : s === 'PENDING' ? 'warning' : 'error';
      return h(NTag, { bordered: false, type, class: 'font-black uppercase text-[10px] px-6 py-2 rounded-md' }, { default: () => s });
    }
  }
];

const handleJumpToPage = () => {
    const totalPages = Math.ceil(totalRecords.value / pageSize.value);
    if (jumpToPageValue.value >= 1 && jumpToPageValue.value <= totalPages) currentPage.value = jumpToPageValue.value;
};

const fetchData = async () => {
  loading.value = true;
  try {
    const [sumRes, typRes, listRes] = await Promise.all([
      getLeaveSummaryStats().catch(() => ({ isError: true })),
      getLeaveTypeStats().catch(() => ({ isError: true })),
      getLeaveList({ page: currentPage.value, page_size: pageSize.value, ...filters.value }).catch(() => ({ isError: true }))
    ]);

    if (!sumRes.isError && sumRes.data) stats.value = sumRes.data;
    if (!typRes.isError && typRes.data?.leave_type_stats) categoryData.value = typRes.data.leave_type_stats;
    if (!listRes.isError && listRes.data) {
      leaveRequests.value = listRes.data.results || [];
      totalRecords.value = listRes.data.count || 0;
    }
  } finally {
    loading.value = false;
  }
};

const handleExportPDF = () => {
  if (leaveRequests.value.length === 0) {
    message.warning("No data available to export.");
    return;
  }

  const msgInstance = message.loading("Generating PDF Report...", { duration: 0 });

  try {
    const doc = new jsPDF();
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm');

    // --- Header Section ---
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102); // Your #003366 theme color
    doc.text('HOU LEAVE MANAGEMENT REPORT', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${timestamp}`, 14, 30);
    doc.text(`Total Records: ${totalRecords.value}`, 14, 35);

    // --- Table Data Preparation ---
    const tableColumn = ["Staff ID", "Full Name", "Leave Type", "Start Date", "End Date", "Status"];
    const tableRows = leaveRequests.value.map(row => [
      row.staff?.id || row.staff_id || 'N/A',
      row.staff?.full_name || row.staff_name || 'Unknown',
      row.leave_type,
      row.start_date,
      row.end_date,
      row.status?.toUpperCase()
    ]);

    // --- Generate Table ---
    autoTable(doc, {
      startY: 45,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: {
        fillColor: [0, 51, 102], // #003366
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 45 },
    });

    // --- Save the PDF ---
    doc.save(`Leave_Summary_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);

    msgInstance.destroy();
    message.success("PDF exported successfully!");
  } catch (error) {
    console.error("Export Error:", error);
    msgInstance.destroy();
    message.error("Failed to generate PDF.");
  }
};

onMounted(fetchData);
watch([filters, currentPage, pageSize], fetchData, { deep: true });
</script>