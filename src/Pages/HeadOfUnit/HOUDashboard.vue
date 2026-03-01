<template>
  <section class="px-2 lg:px-8 space-y-8">

    <!-- Session / Semester / Date / Time -->
    <SessionSemesterCard />

    <!-- Stats + Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6">

      <!-- Left: Unit Stats Panel -->
      <div class="lg:col-span-4 flex flex-col gap-4">

        <!-- Hero Card -->
        <div class="bg-orbit-bg rounded-2xl p-7 text-white shadow-lg relative overflow-hidden">
          <span class="absolute -right-4 -bottom-6 text-[120px] font-black text-white/5 pointer-events-none select-none leading-none">U</span>
          <p class="text-[10px] font-black uppercase tracking-[0.25em] text-blue-200">Total Unit Staff</p>
          <h2 class="text-5xl font-black mt-2 tracking-tight">23,458</h2>
          <div class="mt-3 flex items-center gap-1">
            <span class="text-orbit-cyan text-xs font-black">▲ +12</span>
            <span class="text-white/40 text-[10px]">this month</span>
          </div>
        </div>

        <!-- Stat Rows -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <div
            v-for="stat in unitStats"
            :key="stat.label"
            class="flex items-center justify-between px-5 py-4"
          >
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-bold text-orbit-bg">{{ stat.label }}</span>
              <span class="text-[10px] text-gray-400 font-medium">{{ stat.sub }}</span>
            </div>
            <span class="text-2xl font-black text-orbit-blue">{{ stat.value }}</span>
          </div>
        </div>

      </div>

      <!-- Right: Unit Summary Chart -->
      <div class="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">

        <div class="flex items-center justify-between flex-wrap gap-3">
          <h2 class="text-xl font-black text-orbit-bg tracking-tight">Unit Summary Chart</h2>
          <div class="flex p-1 bg-gray-50 rounded-xl border border-gray-100">
            <button
              v-for="r in chartRanges"
              :key="r.value"
              @click="setChartRange(r.value)"
              :class="[
                'px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-200',
                activeRange === r.value
                  ? 'bg-orbit-blue text-white shadow'
                  : 'text-gray-400 hover:text-orbit-bg hover:bg-white'
              ]"
            >
              {{ r.label }}
            </button>
          </div>
        </div>

        <vue-apex-charts
          type="bar"
          height="300"
          :options="chartOptions"
          :series="chartSeries"
        />

      </div>
    </div>

    <!-- Quick Actions -->
    <div class="px-6">
      <h3 class="text-xl font-black text-orbit-bg tracking-tight mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="action in quickActions"
          :key="action.label"
          class="flex items-center gap-3 bg-orbit-blue text-white font-bold text-sm rounded-2xl px-5 py-4 hover:bg-orbit-bgSec transition-colors shadow-sm cursor-pointer"
        >
          <component :is="action.icon" :size="18" class="shrink-0" />
          {{ action.label }}
        </button>
      </div>
    </div>

    <!-- Staff Activity Overview -->
    <div class="px-6 pb-10">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

        <!-- Table Header -->
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h3 class="text-xl font-black text-orbit-bg tracking-tight">Staff Activity Overview</h3>
          <div class="flex items-center gap-3 flex-wrap">
            <div class="relative">
              <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for anything..."
                class="pl-8 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-orbit-blue w-56"
              />
            </div>
            <button class="flex items-center gap-1.5 text-sm text-gray-500 font-semibold border border-gray-200 rounded-lg px-3 py-2 hover:border-orbit-blue transition-colors">
              Date Range <CalendarDays :size="14" />
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left">
                <th
                  v-for="col in tableColumns"
                  :key="col.key"
                  class="text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3 pr-6"
                >
                  {{ col.label }}
                  <ChevronDown :size="10" class="inline ml-0.5 opacity-60" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="row in filteredActivity"
                :key="row.id"
                class="hover:bg-gray-50/60 transition-colors"
              >
                <td class="py-4 pr-6 font-semibold text-orbit-bg">{{ row.staffName }}</td>
                <td class="py-4 pr-6 text-gray-600">{{ row.activity }}</td>
                <td class="py-4 pr-6">
                  <div class="flex items-center gap-2 text-gray-500">
                    <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0">
                      <CalendarDays :size="10" class="text-orbit-blue" />
                    </span>
                    {{ row.date }}
                  </div>
                </td>
                <td class="py-4">
                  <span
                    :class="statusClass(row.status)"
                    class="px-3 py-1 rounded-full text-[11px] font-bold"
                  >
                    {{ row.status }}
                  </span>
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
import { CalendarDays, ChevronDown, ClipboardCheck, FileBarChart2, BellRing, Search, UserCheck } from 'lucide-vue-next'
import VueApexCharts from 'vue3-apexcharts'
import { computed, ref } from 'vue'

// ── Unit Stats ──────────────────────────────────────────────────────────────
const unitStats = ref([
  { label: 'Active Appraisal Cycle',   sub: 'In Progress (30/58 complete)',               value: 1  },
  { label: 'Appraisals in Progress',   sub: 'Ongoing appraisal sessions awaiting completion', value: 18 },
  { label: 'Pending Appraisals',       sub: 'Staff yet to be appraised this cycle',        value: 24 },
  { label: 'Pending Requests',         sub: '4 leave requests, 2 promotion requests',      value: 6  },
  { label: 'Disciplinary Actions',     sub: 'Logged conduct/discipline cases under this unit', value: 1 },
])

// ── Chart ───────────────────────────────────────────────────────────────────
const activeRange = ref('month')
const chartRanges = [
  { label: 'Week',  value: 'week'  },
  { label: 'Month', value: 'month' },
  { label: 'Year',  value: 'year'  },
]

const rangeData = {
  week:  [40, 28, 35, 42],
  month: [86, 64, 76, 78],
  year:  [95, 80, 88, 91],
}

const chartSeries = computed(() => [{
  name: 'Count',
  data: rangeData[activeRange.value],
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'inherit',
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 6,
      borderRadiusApplication: 'end',
      barHeight: '55%',
      dataLabels: { position: 'right' },
    },
  },
  colors: ['#2388ff'],
  dataLabels: {
    enabled: true,
    style: { fontSize: '11px', fontWeight: '800', colors: ['#64748b'] },
    offsetX: 8,
  },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    yaxis: { lines: { show: false } },
  },
  xaxis: {
    categories: ['Appraisals', 'Disciplinary Cases', 'Promotions', 'Leave Requests'],
    labels: {
      style: { colors: '#94a3b8', fontSize: '11px', fontWeight: '700' },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: { colors: '#64748b', fontSize: '12px', fontWeight: '600' },
    },
  },
  tooltip: {
    theme: 'light',
    y: { formatter: (val) => val + ' records' },
  },
}))

const setChartRange = (range) => {
  activeRange.value = range
}

// ── Quick Actions ────────────────────────────────────────────────────────────
const quickActions = [
  { label: 'New Appraisal Review',    icon: ClipboardCheck },
  { label: 'Approve Leave',           icon: UserCheck      },
  { label: 'Generate Unit Report',    icon: FileBarChart2  },
  { label: 'Send Staff Notification', icon: BellRing       },
]

// ── Staff Activity Table ─────────────────────────────────────────────────────
const tableColumns = [
  { key: 'staffName', label: 'Staff Name' },
  { key: 'activity',  label: 'Activity'   },
  { key: 'date',      label: 'Date'       },
  { key: 'status',    label: 'Status'     },
]

const activityData = ref([
  { id: 1, staffName: 'Prof. John A. Doe',  activity: 'Submitted 2025 appraisal',           date: '05 Aug 2025  12:45 PM', status: 'Completed' },
  { id: 2, staffName: 'Mrs. Kemi Okafor',   activity: 'Leave request (Oct 10–17)',           date: '05 Aug 2025  12:45 PM', status: 'Pending'   },
  { id: 3, staffName: 'Prof. John A. Doe',  activity: 'Promotion recommendation drafted',   date: '05 Aug 2025  12:45 PM', status: 'Pending'   },
  { id: 4, staffName: 'Prof. John A. Doe',  activity: 'Conduct warning acknowledged',       date: '05 Aug 2025  12:45 PM', status: 'Recorded'  },
  { id: 5, staffName: 'Dr. Ada Nwosu',      activity: 'Appraisal cycle initiated',          date: '04 Aug 2025  09:10 AM', status: 'Completed' },
  { id: 6, staffName: 'Mr. Emeka Eze',      activity: 'Disciplinary case filed',            date: '03 Aug 2025  02:30 PM', status: 'Recorded'  },
])

const searchQuery = ref('')

const filteredActivity = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return activityData.value
  return activityData.value.filter(
    (r) =>
      r.staffName.toLowerCase().includes(q) ||
      r.activity.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
  )
})

const statusClass = (status) => {
  if (status === 'Completed') return 'bg-green-100 text-green-700'
  if (status === 'Pending')   return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-500'
}
</script>
