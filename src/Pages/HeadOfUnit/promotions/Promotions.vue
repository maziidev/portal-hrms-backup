<template>
  <section class="px-2 lg:px-8 space-y-8">

    <SessionSemesterCard />

    <div class="px-6 space-y-8">

      <!-- ── Stats Row ── -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <!-- Pending Promotions (dark hero) -->
        <div class="bg-orbit-bg rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <span class="absolute -right-3 -bottom-5 text-[90px] font-black text-white/5 pointer-events-none select-none leading-none">P</span>
          <p class="text-[10px] font-black uppercase tracking-[0.25em] text-blue-200">Pending Promotions</p>
          <h2 class="text-5xl font-black mt-2 tracking-tight">3</h2>
          <div class="mt-3 flex items-center gap-1">
            <span class="text-orbit-cyan text-xs font-black">▲ +1</span>
            <span class="text-white/40 text-[10px]">this session</span>
          </div>
        </div>

        <!-- Endorsed Promotions -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Endorsed Promotions</p>
            <span class="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp :size="15" class="text-orbit-green" />
            </span>
          </div>
          <div>
            <h3 class="text-4xl font-black text-orbit-bg tracking-tight">12</h3>
            <p class="text-[10px] text-gray-400 font-medium mt-1">Forwarded to Dean</p>
          </div>
        </div>

        <!-- Rejected Requests -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Rejected Requests</p>
            <span class="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <XCircle :size="15" class="text-red-500" />
            </span>
          </div>
          <div>
            <h3 class="text-4xl font-black text-orbit-bg tracking-tight">5</h3>
            <p class="text-[10px] text-gray-400 font-medium mt-1">This session</p>
          </div>
        </div>

        <!-- Promotions Completed -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Promotions Completed</p>
            <span class="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
              <CheckCircle2 :size="15" class="text-orbit-blue" />
            </span>
          </div>
          <div>
            <h3 class="text-4xl font-black text-orbit-bg tracking-tight">10</h3>
            <p class="text-[10px] text-gray-400 font-medium mt-1">Fully processed</p>
          </div>
        </div>
      </div>

      <!-- ── Charts Row ── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Average Years-in-Rank (horizontal bar) -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 class="font-black text-orbit-bg text-base">Average Years-in-Rank</h3>
          <vue-apex-charts type="bar" height="260" :options="yearsInRankOptions" :series="yearsInRankSeries" />
        </div>

        <!-- Promotion Rate by Rank (vertical bar, toggle) -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <h3 class="font-black text-orbit-bg text-base">Promotion Rate by Rank</h3>
            <div class="flex p-1 bg-gray-50 rounded-xl border border-gray-100">
              <button
                v-for="r in chartRanges"
                :key="r"
                @click="promoRange = r"
                :class="[
                  'px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-200',
                  promoRange === r ? 'bg-orbit-blue text-white shadow' : 'text-gray-400 hover:text-orbit-bg'
                ]"
              >{{ r }}</button>
            </div>
          </div>
          <vue-apex-charts type="bar" height="220" :options="promoRateOptions" :series="promoRateSeries" />
        </div>
      </div>

      <!-- ── Quick Actions ── -->
      <div>
        <h3 class="text-base font-black text-orbit-bg mb-4">Quick Actions/Shortcuts</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            @click="showSummaryDrawer = true"
            class="flex items-center justify-center gap-3 bg-orbit-blue text-white font-bold text-sm rounded-2xl px-5 py-4 hover:bg-orbit-bgSec transition-colors shadow-sm"
          >
            <ClipboardList :size="17" /> View Promotion Summary
          </button>
          <button class="flex items-center justify-center gap-3 bg-orbit-blue text-white font-bold text-sm rounded-2xl px-5 py-4 hover:bg-orbit-bgSec transition-colors shadow-sm">
            <Upload :size="17" /> Export Promotion Summary Report
          </button>
        </div>
      </div>

      <!-- ── Promotion Requests Overview Table ── -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <!-- Table header -->
        <div class="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-50">
          <h3 class="font-black text-orbit-bg text-base flex-1">Promotion Requests Overview</h3>
          <div class="relative">
            <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="promoSearch"
              type="text"
              placeholder="Name / ID"
              class="pl-8 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-orbit-blue w-44"
            />
          </div>
          <button v-for="f in promoFilters" :key="f" class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-3 py-2 hover:border-orbit-blue transition-colors">
            {{ f }} <ChevronDown :size="13" />
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-50">
                <th v-for="col in promoColumns" :key="col" class="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-5 py-3 whitespace-nowrap">
                  {{ col }} <ChevronDown :size="8" class="inline ml-0.5 opacity-50" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="r in filteredPromo" :key="r.staffId + r.name" class="hover:bg-orbit-light/50 transition-colors">
                <td class="px-5 py-4 font-mono text-xs font-bold text-orbit-blue">{{ r.staffId }}</td>
                <td class="px-5 py-4 font-semibold text-orbit-bg whitespace-nowrap">{{ r.name }}</td>
                <td class="px-5 py-4 text-gray-500">{{ r.currentGrade }}</td>
                <td class="px-5 py-4 text-gray-500">{{ r.proposedGrade }}</td>
                <td class="px-5 py-4 text-gray-500 whitespace-nowrap">{{ r.dateSubmitted }}</td>
                <td class="px-5 py-4">
                  <span :class="promoStatusClass(r.status)" class="px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap">
                    {{ r.status }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <button
                    v-if="r.status === 'Pending'"
                    @click="openReview(r)"
                    class="px-4 py-1.5 text-xs font-bold rounded-lg bg-orbit-blue text-white hover:bg-orbit-bgSec transition-colors whitespace-nowrap"
                  >
                    Review
                  </button>
                  <button
                    v-else
                    @click="openReview(r)"
                    class="px-4 py-1.5 text-xs font-bold rounded-lg border border-orbit-blue text-orbit-blue hover:bg-blue-50 transition-colors whitespace-nowrap"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- ── Promotion Review Modal ── -->
    <PromotionReviewModal
      :show="showReviewModal"
      :staff="selectedStaff"
      @close="showReviewModal = false"
      @submitted="handleReviewSubmitted"
    />

    <!-- ── Promotion Summary Drawer ── -->
    <PromotionSummaryDrawer
      :show="showSummaryDrawer"
      @close="showSummaryDrawer = false"
    />

  </section>
</template>

<script setup>
import SessionSemesterCard from '@/components/SessionSemesterCard.vue'
import PromotionReviewModal from '@/components/HouComponents/PromotionReviewModal.vue'
import PromotionSummaryDrawer from '@/components/HouComponents/PromotionSummaryDrawer.vue'
import { CheckCircle2, ChevronDown, ClipboardList, Search, TrendingUp, Upload, XCircle } from 'lucide-vue-next'
import VueApexCharts from 'vue3-apexcharts'
import { computed, ref } from 'vue'

// ── Modal / Drawer state ───────────────────────────────────────────────────────
const showReviewModal  = ref(false)
const showSummaryDrawer = ref(false)
const selectedStaff    = ref({})

function openReview(row) {
  selectedStaff.value = {
    staffId: row.staffId,
    name:    row.name,
    role:    row.proposedGrade,
    roleLabel: 'Proposed Grade',
    subunit: 'Academic',
    photo:   '',
    appraisalRecords: [
      { year: '2024', comment: 'Excellent', score: '87%' },
      { year: '2023', comment: 'Excellent', score: '87%' },
      { year: '2022', comment: 'Excellent', score: '87%' },
    ],
  }
  showReviewModal.value = true
}

function handleReviewSubmitted(payload) {
  const row = promoData.value.find(r => r.staffId === payload.staffId)
  if (row) {
    row.status = payload.decision === 'Endorse' ? 'Endorsed' : 'Sent to Dean'
  }
}

// ── Chart ranges ───────────────────────────────────────────────────────────────
const chartRanges = ['Week', 'Month', 'Year']
const promoRange  = ref('Month')

// ── Average Years-in-Rank (horizontal bar) ─────────────────────────────────────
const yearsInRankSeries  = [{ name: 'Avg. Years', data: [12, 8, 6, 5, 4, 3, 2] }]
const yearsInRankOptions = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
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
    formatter: (v) => `${v} yrs`,
    style: { fontSize: '11px', fontWeight: '800', colors: ['#64748b'] },
    offsetX: 8,
  },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4, yaxis: { lines: { show: false } } },
  xaxis: {
    categories: ['Professor', 'Reader', 'Senior Lecturer', 'Lecturer I', 'Lecturer II', 'Asst. Lecturer', 'Graduate Asst.'],
    labels: { style: { colors: '#94a3b8', fontSize: '10px', fontWeight: '700' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
    min: 0,
    max: 15,
  },
  yaxis: { labels: { style: { colors: '#64748b', fontSize: '11px', fontWeight: '600' } } },
  tooltip: { theme: 'light' },
}

// ── Promotion Rate by Rank (vertical bar) ──────────────────────────────────────
const promoRateData = {
  Week:  [1, 0, 2, 1, 0],
  Month: [4, 3, 6, 5, 2],
  Year:  [18, 14, 22, 19, 8],
}

const promoRateSeries  = computed(() => [{ name: 'Promotions', data: promoRateData[promoRange.value] }])
const promoRateOptions = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
  plotOptions: { bar: { borderRadius: 6, borderRadiusApplication: 'end', columnWidth: '50%', distributed: true } },
  colors: ['#93c5fd', '#bfdbfe', '#a5b4fc', '#c4b5fd', '#ddd6fe'],
  dataLabels: { enabled: false },
  legend: { show: false },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4, xaxis: { lines: { show: false } } },
  xaxis: {
    categories: ['Professor', 'Reader', 'Sr. Lecturer', 'Lecturer I', 'Lecturer II'],
    labels: { style: { colors: '#94a3b8', fontSize: '10px', fontWeight: '700' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '10px', fontWeight: '700' } } },
  tooltip: { theme: 'light' },
}

// ── Table ──────────────────────────────────────────────────────────────────────
const promoFilters = ['Cadre', 'Year', 'Status']
const promoColumns = ['Staff ID', 'Name', 'Current Grade', 'Proposed Grade', 'Date Submitted', 'Status', 'Action']
const promoSearch  = ref('')

const promoData = ref([
  { staffId: 'ORBIT-0014', name: 'Dr. Emmanuel Udo',   currentGrade: 'Lecturer I',      proposedGrade: 'Senior Lecturer', dateSubmitted: '05 Jan 2025', status: 'Pending'      },
  { staffId: 'ORBIT-0021', name: 'Mr. James Okafor',   currentGrade: 'Asst. Lecturer',  proposedGrade: 'Lecturer II',     dateSubmitted: '12 Jan 2025', status: 'Pending'      },
  { staffId: 'ORBIT-0007', name: 'Prof. Ada Nwosu',    currentGrade: 'Reader',          proposedGrade: 'Professor',       dateSubmitted: '18 Dec 2024', status: 'Sent to Dean' },
  { staffId: 'ORBIT-0033', name: 'Mrs. Kemi Adesanya', currentGrade: 'Lecturer II',     proposedGrade: 'Lecturer I',      dateSubmitted: '20 Nov 2024', status: 'Endorsed'     },
  { staffId: 'ORBIT-0009', name: 'Dr. Chukwuma Eze',   currentGrade: 'Senior Lecturer', proposedGrade: 'Reader',          dateSubmitted: '03 Oct 2024', status: 'Endorsed'     },
  { staffId: 'ORBIT-0045', name: 'Engr. Fatima Sule',  currentGrade: 'Graduate Asst.',  proposedGrade: 'Asst. Lecturer',  dateSubmitted: '15 Sep 2024', status: 'Sent to Dean' },
  { staffId: 'ORBIT-0018', name: 'Dr. Helen Bello',    currentGrade: 'Lecturer I',      proposedGrade: 'Senior Lecturer', dateSubmitted: '22 Aug 2024', status: 'Endorsed'     },
  { staffId: 'ORBIT-0029', name: 'Mr. Tunde Ayeni',    currentGrade: 'Lecturer II',     proposedGrade: 'Lecturer I',      dateSubmitted: '30 Jul 2024', status: 'Pending'      },
])

const filteredPromo = computed(() => {
  const q = promoSearch.value.toLowerCase()
  if (!q) return promoData.value
  return promoData.value.filter(r =>
    r.name.toLowerCase().includes(q) || r.staffId.toLowerCase().includes(q)
  )
})

const promoStatusClass = (s) => {
  if (s === 'Pending')      return 'bg-yellow-100 text-yellow-700'
  if (s === 'Sent to Dean') return 'bg-gray-100 text-gray-600'
  if (s === 'Endorsed')     return 'bg-green-100 text-orbit-green'
  return 'bg-gray-100 text-gray-500'
}
</script>
