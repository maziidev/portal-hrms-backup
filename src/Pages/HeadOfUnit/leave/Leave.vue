<template>
  <section class="px-2 lg:px-8 space-y-8">

    <SessionSemesterCard />

    <div class="px-6 space-y-8">

      <!-- ── Top 3-col: Stats / Notifications / Donut ── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <!-- Stats panel -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="bg-orbit-bg rounded-2xl p-7 text-white shadow-lg relative overflow-hidden">
            <span class="absolute -right-4 -bottom-6 text-[110px] font-black text-white/5 pointer-events-none select-none leading-none">L</span>
            <p class="text-[10px] font-black uppercase tracking-[0.25em] text-blue-200">Total Applications</p>
            <h2 class="text-5xl font-black mt-2 tracking-tight">35</h2>
            <div class="mt-3 flex items-center gap-1">
              <span class="text-orbit-cyan text-xs font-black">▲ +12</span>
              <span class="text-white/40 text-[10px]">this month</span>
            </div>
          </div>
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            <div v-for="stat in leaveStats" :key="stat.label" class="flex items-center justify-between px-5 py-4">
              <div>
                <p class="text-sm font-bold text-orbit-bg">{{ stat.label }}</p>
                <p class="text-[10px] text-gray-400 font-medium mt-0.5">{{ stat.sub }}</p>
              </div>
              <span class="text-2xl font-black text-orbit-blue">{{ stat.value }}</span>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 class="font-black text-orbit-bg text-base mb-5">Notifications</h3>
          <div class="space-y-0 divide-y divide-gray-50">
            <div v-for="n in notifications" :key="n.id" class="flex gap-3 py-4">
              <span class="w-1 rounded-full bg-orbit-blue shrink-0 mt-1"></span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-orbit-bg leading-snug">{{ n.message }}</p>
              </div>
              <span class="text-[10px] text-gray-400 font-medium whitespace-nowrap shrink-0">{{ n.time }}</span>
            </div>
          </div>
        </div>

        <!-- Leave Approval Analytic (donut) -->
        <div class="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
          <h3 class="font-black text-orbit-bg text-base">Leave Approval Analytic</h3>
          <div class="flex justify-center">
            <vue-apex-charts type="donut" height="180" :options="donutOptions" :series="donutSeries" />
          </div>
          <div class="space-y-2 mt-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-orbit-blue shrink-0"></span>
                <span class="text-sm font-semibold text-gray-600">Approved Leave</span>
              </div>
              <span class="font-black text-orbit-bg text-lg">20</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-blue-300 shrink-0"></span>
                <span class="text-sm font-semibold text-gray-600">Rejected Leaves</span>
              </div>
              <span class="font-black text-orbit-bg text-lg">7</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Overview Metrics + Leave Category Distribution ── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Overview Metrics (horizontal bar) -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 class="font-black text-orbit-bg text-base">Overview Metrics</h3>
          <vue-apex-charts type="bar" height="240" :options="overviewBarOptions" :series="overviewBarSeries" />
        </div>

        <!-- Leave Category Distribution (vertical bar) -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <h3 class="font-black text-orbit-bg text-base">Leave Category Distribution</h3>
            <div class="flex p-1 bg-gray-50 rounded-xl border border-gray-100">
              <button
                v-for="r in chartRanges"
                :key="r"
                @click="catRange = r"
                :class="[
                  'px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-200',
                  catRange === r ? 'bg-orbit-blue text-white shadow' : 'text-gray-400 hover:text-orbit-bg'
                ]"
              >{{ r }}</button>
            </div>
          </div>
          <vue-apex-charts type="bar" height="220" :options="categoryBarOptions" :series="categoryBarSeries" />
        </div>
      </div>

      <!-- ── Quick Actions ── -->
      <div>
        <h3 class="text-base font-black text-orbit-bg mb-4">Quick Actions/Shortcuts</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <router-link
            to="/unit_head/leave-active"
            class="flex items-center justify-center gap-3 bg-orbit-blue text-white font-bold text-sm rounded-2xl px-5 py-4 hover:bg-orbit-bgSec transition-colors shadow-sm"
          >
            <Users :size="17" /> View Active Leaves
          </router-link>
          <router-link
            to="/unit_head/leave-balance"
            class="flex items-center justify-center gap-3 bg-orbit-blue text-white font-bold text-sm rounded-2xl px-5 py-4 hover:bg-orbit-bgSec transition-colors shadow-sm"
          >
            <FileBarChart2 :size="17" /> Leave Balance Report
          </router-link>
          <button class="flex items-center justify-center gap-3 bg-orbit-blue text-white font-bold text-sm rounded-2xl px-5 py-4 hover:bg-orbit-bgSec transition-colors shadow-sm">
            <Upload :size="17" /> Export Summary (PDF)
          </button>
        </div>
      </div>

      <!-- ── Leave Requests Overview ── -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <!-- Table header -->
        <div class="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-50">
          <h3 class="font-black text-orbit-bg text-base flex-1">Leave Requests Overview</h3>
          <div class="relative">
            <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input v-model="leaveSearch" type="text" placeholder="Name / ID" class="pl-8 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-orbit-blue w-44" />
          </div>
          <button v-for="f in leaveFilters" :key="f" class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-3 py-2 hover:border-orbit-blue transition-colors">
            {{ f }} <ChevronDown :size="13" />
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-50">
                <th v-for="col in leaveColumns" :key="col" class="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-5 py-3 whitespace-nowrap">
                  {{ col }} <ChevronDown :size="8" class="inline ml-0.5 opacity-50" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="r in filteredLeave" :key="r.staffId + r.leaveType" class="hover:bg-orbit-light/50 transition-colors">
                <td class="px-5 py-4 font-mono text-xs font-bold text-orbit-blue">{{ r.staffId }}</td>
                <td class="px-5 py-4 font-semibold text-orbit-bg whitespace-nowrap">{{ r.name }}</td>
                <td class="px-5 py-4 text-gray-500">{{ r.leaveType }}</td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-1.5 text-gray-500 whitespace-nowrap">
                    <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0"><CalendarDays :size="9" class="text-orbit-blue" /></span>
                    {{ r.startDate }}
                  </div>
                </td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-1.5 text-gray-500 whitespace-nowrap">
                    <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0"><CalendarDays :size="9" class="text-orbit-blue" /></span>
                    {{ r.endDate }}
                  </div>
                </td>
                <td class="px-5 py-4 text-gray-600">{{ r.duration }}</td>
                <td class="px-5 py-4">
                  <span :class="leaveStatusClass(r.status)" class="px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap">{{ r.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import SessionSemesterCard from '@/components/SessionSemesterCard.vue'
import { CalendarDays, ChevronDown, FileBarChart2, Search, Upload, Users } from 'lucide-vue-next'
import VueApexCharts from 'vue3-apexcharts'
import { computed, ref } from 'vue'

// ── Stats ─────────────────────────────────────────────────────────────────────
const leaveStats = [
  { label: 'Pending Approvals', sub: 'Awaiting your action',       value: 7  },
  { label: 'Approved Leaves',   sub: 'Approved and logged in record.', value: 20 },
  { label: 'Active Leaves',     sub: 'Currently on leave',         value: 4  },
]

// ── Notifications ─────────────────────────────────────────────────────────────
const notifications = [
  { id: 1, message: 'You approved Annual Leave for Dr. Helen Eze',       time: 'Today, 03:00 PM'    },
  { id: 2, message: 'Leave request by Mr. Emeka Udo was rejected.',      time: 'Sept 20, 03:00 PM'  },
  { id: 3, message: '2 staff expected to resume next week',              time: 'Sept 18, 03:00 PM'  },
]

// ── Donut chart ───────────────────────────────────────────────────────────────
const donutSeries = [75, 25]
const donutOptions = {
  chart: { type: 'donut', toolbar: { show: false } },
  colors: ['#2388ff', '#93c5fd'],
  labels: ['Approved', 'Rejected'],
  dataLabels: { enabled: true, style: { fontSize: '11px', fontWeight: '800' } },
  legend: { show: false },
  plotOptions: { pie: { donut: { size: '60%' } } },
  stroke: { width: 0 },
}

// ── Overview Metrics bar ──────────────────────────────────────────────────────
const overviewBarSeries = [{ name: 'Count', data: [56, 64, 76, 78, 70] }]
const overviewBarOptions = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
  plotOptions: { bar: { horizontal: true, borderRadius: 6, borderRadiusApplication: 'end', barHeight: '55%', dataLabels: { position: 'right' } } },
  colors: ['#2388ff'],
  dataLabels: { enabled: true, style: { fontSize: '11px', fontWeight: '800', colors: ['#64748b'] }, offsetX: 8 },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4, yaxis: { lines: { show: false } } },
  xaxis: {
    categories: ['Total Leave Requests', 'Pending Approvals', 'Approved Leaves', 'Rejected/Cancelled', 'Ongoing Leaves'],
    labels: { style: { colors: '#94a3b8', fontSize: '10px', fontWeight: '700' } },
    axisBorder: { show: false }, axisTicks: { show: false },
    min: 0, max: 100,
  },
  yaxis: { labels: { style: { colors: '#64748b', fontSize: '11px', fontWeight: '600' } } },
  tooltip: { theme: 'light' },
}

// ── Category Distribution bar ─────────────────────────────────────────────────
const chartRanges = ['Week', 'Month', 'Year']
const catRange = ref('Month')

const catData = {
  Week:  [8, 4, 6, 3, 5],
  Month: [28, 14, 18, 12, 16],
  Year:  [95, 48, 65, 42, 58],
}

const categoryBarSeries = computed(() => [{ name: 'Requests', data: catData[catRange.value] }])
const categoryBarOptions = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
  plotOptions: { bar: { borderRadius: 6, borderRadiusApplication: 'end', columnWidth: '50%', distributed: true } },
  colors: ['#93c5fd', '#bfdbfe', '#a5b4fc', '#c4b5fd', '#ddd6fe'],
  dataLabels: { enabled: false },
  legend: { show: false },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4, xaxis: { lines: { show: false } } },
  xaxis: {
    categories: ['Annual Leave', 'Maternity Leave', 'Study Leave', 'Sick Leave', 'Casual Leave'],
    labels: { style: { colors: '#94a3b8', fontSize: '10px', fontWeight: '700' } },
    axisBorder: { show: false }, axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '10px', fontWeight: '700' } } },
  annotations: { yaxis: [{ y: Math.max(...(catData[catRange.value] || [0])), borderColor: '#94a3b8', strokeDashArray: 5, label: { text: '100%', style: { color: '#94a3b8', fontSize: '10px', fontWeight: '700' } } }] },
}

// ── Leave Requests table ──────────────────────────────────────────────────────
const leaveFilters = ['Leave Type', 'Month / Year', 'Status']
const leaveColumns  = ['Staff ID', 'Name', 'Leave Type', 'Start Date', 'End Date', 'Duration', 'Status']
const leaveSearch   = ref('')

const leaveData = ref([
  { staffId: 'ORBIT-0001', name: 'Prof. John A. Doe',   leaveType: 'Annual Leave',   startDate: '10 Oct 2025', endDate: '10 Nov 2025', duration: '30 Days',  status: 'Pending'  },
  { staffId: 'ORBIT-0002', name: 'Mr. Emmanuel Udo',    leaveType: 'Study Leave',    startDate: '01 Sep 2025', endDate: '01 Mar 2026', duration: '6 Months', status: 'Active'   },
  { staffId: 'ORBIT-0002', name: 'Dr. Adewale Johnson', leaveType: 'Maternity Leave',startDate: '14 Aug 2025', endDate: '14 Nov 2025', duration: '3 Months', status: 'Approved' },
  { staffId: 'ORBIT-0002', name: 'Engr. Fatima Sule',   leaveType: 'Sick Leave',     startDate: '02 Oct 2025', endDate: '12 Oct 2025', duration: '10 Days',  status: 'Approved' },
  { staffId: 'ORBIT-0002', name: 'Mr. Emmanuel Udo',    leaveType: 'Annual Leave',   startDate: '01 Jan 2025', endDate: '01 Dec 2026', duration: '12 Months',status: 'Pending'  },
  { staffId: 'ORBIT-0002', name: 'Prof. John A. Doe',   leaveType: 'Annual Leave',   startDate: '01 Jan 2025', endDate: '01 Dec 2026', duration: '12 Months',status: 'Pending'  },
  { staffId: 'ORBIT-0002', name: 'Prof. John A. Doe',   leaveType: 'Annual Leave',   startDate: '01 Jan 2025', endDate: '01 Dec 2026', duration: '12 Months',status: 'Pending'  },
])

const filteredLeave = computed(() => {
  const q = leaveSearch.value.toLowerCase()
  if (!q) return leaveData.value
  return leaveData.value.filter(r => r.name.toLowerCase().includes(q) || r.staffId.toLowerCase().includes(q))
})

const leaveStatusClass = (s) => {
  if (s === 'Pending')  return 'bg-yellow-100 text-yellow-700'
  if (s === 'Active')   return 'bg-blue-50 text-orbit-blue'
  if (s === 'Approved') return 'bg-green-100 text-orbit-green'
  return 'bg-gray-100 text-gray-500'
}
</script>
