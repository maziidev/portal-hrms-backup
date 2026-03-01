<template>
  <section class="px-2 lg:px-8 space-y-8">

    <!-- Draft resume preview -->
    <ContinueDraftModal
      :show="showDraftModal"
      :staff="selectedStaff"
      @close="showDraftModal = false"
      @discard="discardDraft"
      @continue="openFormFromDraft"
    />

    <!-- Full appraisal form -->
    <AppraisalFormModal
      :show="showModal"
      :staff="selectedStaff"
      :initial-step="selectedStaff.savedStep || 0"
      @close="showModal = false"
      @submit="handleSubmit"
    />

    <SessionSemesterCard />

    <div class="px-6 space-y-8">

      <!-- Top Two Panels -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Completed Appraisals -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 class="font-black text-orbit-bg text-sm tracking-tight">Completed Appraisals</h3>
            <div class="flex items-center gap-1">
              <button
                @click="completedPage = Math.max(0, completedPage - 1)"
                class="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orbit-blue hover:text-orbit-blue transition-colors disabled:opacity-30"
                :disabled="completedPage === 0"
              >
                <ChevronLeft :size="13" />
              </button>
              <button
                @click="completedPage = Math.min(completedTotalPages - 1, completedPage + 1)"
                class="w-7 h-7 rounded-lg bg-orbit-blue flex items-center justify-center text-white hover:bg-orbit-bgSec transition-colors disabled:opacity-30"
                :disabled="completedPage === completedTotalPages - 1"
              >
                <ChevronRight :size="13" />
              </button>
            </div>
          </div>

          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-50">
                <th v-for="col in completedColumns" :key="col" class="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-5 py-3 whitespace-nowrap">
                  {{ col }} <ChevronDown :size="8" class="inline ml-0.5 opacity-50" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="r in paginatedCompleted" :key="r.name" class="hover:bg-orbit-light/50 transition-colors">
                <td class="px-5 py-4 font-semibold text-orbit-bg">{{ r.name }}</td>
                <td class="px-5 py-4 text-gray-500">{{ r.position }}</td>
                <td class="px-5 py-4 font-bold text-orbit-bg">{{ r.rating }}</td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-1.5 text-gray-500">
                    <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0">
                      <CalendarDays :size="9" class="text-orbit-blue" />
                    </span>
                    {{ r.date }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Archived / Past Appraisals -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 class="font-black text-orbit-bg text-sm tracking-tight">Archived / Past Appraisals</h3>
            <div class="flex items-center gap-1">
              <button
                @click="archivedPage = Math.max(0, archivedPage - 1)"
                class="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orbit-blue hover:text-orbit-blue transition-colors disabled:opacity-30"
                :disabled="archivedPage === 0"
              >
                <ChevronLeft :size="13" />
              </button>
              <button
                @click="archivedPage = Math.min(archivedTotalPages - 1, archivedPage + 1)"
                class="w-7 h-7 rounded-lg bg-orbit-blue flex items-center justify-center text-white hover:bg-orbit-bgSec transition-colors disabled:opacity-30"
                :disabled="archivedPage === archivedTotalPages - 1"
              >
                <ChevronRight :size="13" />
              </button>
            </div>
          </div>

          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-50">
                <th v-for="col in archivedColumns" :key="col" class="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-5 py-3 whitespace-nowrap">
                  {{ col }} <ChevronDown :size="8" class="inline ml-0.5 opacity-50" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="r in paginatedArchived" :key="r.year" class="hover:bg-orbit-light/50 transition-colors">
                <td class="px-5 py-4 font-bold text-orbit-bg">{{ r.year }}</td>
                <td class="px-5 py-4 text-gray-600">{{ r.totalStaff }}</td>
                <td class="px-5 py-4 font-semibold text-orbit-bg">{{ r.avgScore }}</td>
                <td class="px-5 py-4">
                  <button class="flex items-center gap-2 bg-orbit-blue text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-orbit-bgSec transition-colors">
                    <Download :size="13" /> Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Active Appraisals -->
      <div class="space-y-4">
        <h2 class="text-xl font-black text-orbit-bg tracking-tight">Active Appraisals</h2>

        <!-- Filters -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="relative min-w-[200px]">
            <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="by name or staff ID"
              class="w-full pl-8 pr-4 py-2.5 text-sm rounded-full border border-gray-200 bg-white focus:outline-none focus:border-orbit-blue"
            />
          </div>
          <button v-for="f in activeFilters" :key="f" class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-4 py-2.5 hover:border-orbit-blue transition-colors">
            {{ f }} <ChevronDown :size="13" />
          </button>
          <button class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-4 py-2.5 hover:border-orbit-blue transition-colors">
            Date Range <CalendarDays :size="14" />
          </button>
        </div>

        <!-- Active Table -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100">
                  <th v-for="col in activeColumns" :key="col" class="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-5 py-4 whitespace-nowrap">
                    {{ col }} <ChevronDown :size="8" class="inline ml-0.5 opacity-50" />
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="r in paginatedActive" :key="r.staffId" class="hover:bg-orbit-light/50 transition-colors">
                  <td class="px-5 py-4 font-mono text-xs font-bold text-orbit-blue">{{ r.staffId }}</td>
                  <td class="px-5 py-4 font-semibold text-orbit-bg whitespace-nowrap">{{ r.name }}</td>
                  <td class="px-5 py-4 text-gray-500 whitespace-nowrap">{{ r.position }}</td>
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-1.5 text-gray-500 whitespace-nowrap">
                      <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0">
                        <CalendarDays :size="9" class="text-orbit-blue" />
                      </span>
                      {{ r.period }}
                    </div>
                  </td>
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-1.5 text-gray-500 whitespace-nowrap">
                      <span v-if="r.lastUpdated !== '-'" class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0">
                        <CalendarDays :size="9" class="text-orbit-blue" />
                      </span>
                      {{ r.lastUpdated }}
                    </div>
                  </td>
                  <td class="px-5 py-4 font-semibold text-orbit-bg">{{ r.progress }}</td>
                  <td class="px-5 py-4">
                    <span :class="statusClass(r.status)" class="px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap">
                      {{ r.status }}
                    </span>
                  </td>
                  <td class="px-5 py-4">
                    <button
                      :class="actionClass(r.action)"
                      class="text-xs font-bold px-4 py-2 rounded-lg whitespace-nowrap transition-colors"
                      @click="openModal(r)"
                    >
                      {{ r.action }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-between px-5 py-4 border-t border-gray-100 flex-wrap gap-3">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                v-model="activePageSize"
                class="border border-gray-200 rounded-lg px-2 py-1 text-sm font-semibold focus:outline-none focus:border-orbit-blue"
                @change="activePage = 1"
              >
                <option v-for="n in [10, 20, 50]" :key="n" :value="n">{{ n }}</option>
              </select>
              <span>of {{ filteredActive.length }}</span>
            </div>

            <div class="flex items-center gap-1">
              <button
                @click="activePage--"
                :disabled="activePage === 1"
                class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orbit-blue hover:text-orbit-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft :size="14" />
              </button>
              <button
                v-for="p in visibleActivePages"
                :key="p"
                @click="activePage = p"
                :class="[
                  'w-8 h-8 rounded-lg text-sm font-bold transition-colors',
                  activePage === p
                    ? 'bg-orbit-blue text-white shadow'
                    : 'border border-gray-200 text-gray-500 hover:border-orbit-blue hover:text-orbit-blue'
                ]"
              >
                {{ p }}
              </button>
              <button
                @click="activePage++"
                :disabled="activePage === activeTotalPages"
                class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orbit-blue hover:text-orbit-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import AppraisalFormModal from '@/components/HouComponents/AppraisalFormModal.vue'
import ContinueDraftModal from '@/components/HouComponents/ContinueDraftModal.vue'
import SessionSemesterCard from '@/components/SessionSemesterCard.vue'
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Download, Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'

// ── Modal state ───────────────────────────────────────────────────────────────
const showModal     = ref(false)
const showDraftModal = ref(false)
const selectedStaff = ref({})

const openModal = (row) => {
  selectedStaff.value = {
    name:      row.name,
    unit:      `${row.position} Unit`,
    period:    row.period,
    staffId:   row.staffId,
    savedStep: row.savedStep ?? 0,
    lastSaved: row.lastSaved ?? '',
  }

  // "Continue" rows → show draft resume preview first
  if (row.action === 'Continue') {
    showDraftModal.value = true
  } else {
    showModal.value = true
  }
}

// Called from the draft modal's "Continue" button
const openFormFromDraft = () => {
  showDraftModal.value = false
  showModal.value = true
}

// Called from the draft modal's "Discard Draft" button
const discardDraft = () => {
  showDraftModal.value = false
  const idx = activeData.value.findIndex((r) => r.staffId === selectedStaff.value.staffId)
  if (idx !== -1) {
    activeData.value[idx].savedStep = 0
    activeData.value[idx].progress  = '0%'
    activeData.value[idx].status    = 'Not Started'
    activeData.value[idx].action    = 'Start'
  }
}

const handleSubmit = () => {
  // update status to Submitted after form completion
  const idx = activeData.value.findIndex((r) => r.staffId === selectedStaff.value.staffId)
  if (idx !== -1) {
    activeData.value[idx].status = 'Submitted'
    activeData.value[idx].action = 'View'
    activeData.value[idx].progress = '100%'
  }
}

// ── Completed Appraisals ──────────────────────────────────────────────────────
const completedColumns = ['Staff Name', 'Position', 'Overall Rating', 'Date Completed']

const completedData = [
  { name: 'Dr. Jane Okafor',   position: 'Senior Records Officer', rating: '12/15', date: '05 Aug 2002' },
  { name: 'Mr. Isaac Nwosu',   position: 'Admin Clerk',            rating: '10/15', date: '05 Aug 2002' },
  { name: 'Mrs. Nneka Umeh',   position: 'Typist',                 rating: '9/15',  date: '05 Aug 2002' },
  { name: 'Prof. Ada Obi',     position: 'Senior Lecturer',        rating: '14/15', date: '12 Jan 2024' },
  { name: 'Mr. Emeka Eze',     position: 'Admin Officer',          rating: '11/15', date: '18 Mar 2024' },
  { name: 'Dr. Grace Bello',   position: 'Lecturer II',            rating: '13/15', date: '22 Apr 2024' },
]

const completedPageSize = 3
const completedPage = ref(0)
const completedTotalPages = computed(() => Math.ceil(completedData.length / completedPageSize))
const paginatedCompleted = computed(() =>
  completedData.slice(completedPage.value * completedPageSize, (completedPage.value + 1) * completedPageSize)
)

// ── Archived Appraisals ───────────────────────────────────────────────────────
const archivedColumns = ['Year', 'Total Staff Appraised', 'Avg. Score', 'Action']

const archivedData = [
  { year: '2024', totalStaff: 22, avgScore: '82%' },
  { year: '2023', totalStaff: 20, avgScore: '79%' },
  { year: '2022', totalStaff: 19, avgScore: '89%' },
  { year: '2021', totalStaff: 18, avgScore: '75%' },
  { year: '2020', totalStaff: 17, avgScore: '81%' },
  { year: '2019', totalStaff: 15, avgScore: '77%' },
]

const archivedPageSize = 3
const archivedPage = ref(0)
const archivedTotalPages = computed(() => Math.ceil(archivedData.length / archivedPageSize))
const paginatedArchived = computed(() =>
  archivedData.slice(archivedPage.value * archivedPageSize, (archivedPage.value + 1) * archivedPageSize)
)

// ── Active Appraisals ─────────────────────────────────────────────────────────
const activeFilters = ['Department/Unit', 'Author']
const activeColumns = ['Staff ID', 'Staff Name', 'Position', 'Appraisal Period', 'Last Updated', 'Progress', 'Status', 'Action']
const searchQuery = ref('')

const activeData = ref([
  { staffId: 'ORBIT-0001', name: 'Prof. John A. Doe',  position: 'Senior Records Officer', period: 'Jan–Mar 2025', lastUpdated: '02 Oct 2025', progress: '100%', status: 'Submitted',   action: 'View',           savedStep: 4, lastSaved: '03 Oct 2025, 2:45 PM' },
  { staffId: 'ORBIT-0002', name: 'Mr. Emmanuel Udo',   position: 'Typist',                 period: 'Jan–Mar 2025', lastUpdated: '02 Oct 2025', progress: '80%',  status: 'In Review',   action: 'Continue',       savedStep: 2, lastSaved: '03 Oct 2025, 2:45 PM' },
  { staffId: 'ORBIT-0003', name: 'Engr. Fatima Sule',  position: 'Admin Clerk',            period: 'Jan–Mar 2025', lastUpdated: '-',           progress: '0%',   status: 'Not Started', action: 'Start',          savedStep: 0, lastSaved: '' },
  { staffId: 'ORBIT-0004', name: 'Mrs. A. Johnson',    position: 'Typist',                 period: 'Jan–Mar 2025', lastUpdated: '02 Oct 2025', progress: '100%', status: 'Submitted',   action: 'View',           savedStep: 4, lastSaved: '02 Oct 2025, 9:10 AM' },
  { staffId: 'ORBIT-0005', name: 'Prof. D. Musa',      position: 'Senior Records Officer', period: 'Jan–Mar 2025', lastUpdated: '02 Oct 2025', progress: '100%', status: 'In Review',   action: 'Submit to Dean', savedStep: 4, lastSaved: '02 Oct 2025, 11:00 AM' },
  { staffId: 'ORBIT-0006', name: 'Mr. K. Ade',         position: 'Admin Clerk',            period: 'Jan–Mar 2025', lastUpdated: '02 Oct 2025', progress: '65%',  status: 'In Review',   action: 'Continue',       savedStep: 2, lastSaved: '01 Oct 2025, 4:20 PM' },
  { staffId: 'ORBIT-0007', name: 'Dr. Ada Nwosu',      position: 'Senior Lecturer',        period: 'Jan–Mar 2025', lastUpdated: '01 Oct 2025', progress: '45%',  status: 'In Review',   action: 'Continue',       savedStep: 1, lastSaved: '01 Oct 2025, 3:05 PM' },
  { staffId: 'ORBIT-0008', name: 'Mrs. Kemi Okafor',   position: 'Principal Officer',      period: 'Jan–Mar 2025', lastUpdated: '-',           progress: '0%',   status: 'Not Started', action: 'Start',          savedStep: 0, lastSaved: '' },
  { staffId: 'ORBIT-0009', name: 'Mr. Emeka Eze',      position: 'Admin Officer',          period: 'Jan–Mar 2025', lastUpdated: '30 Sep 2025', progress: '55%',  status: 'In Review',   action: 'Continue',       savedStep: 2, lastSaved: '30 Sep 2025, 1:15 PM' },
  { staffId: 'ORBIT-0010', name: 'Prof. Bola Adeyemi', position: 'Head of Unit',           period: 'Jan–Mar 2025', lastUpdated: '02 Oct 2025', progress: '100%', status: 'Submitted',   action: 'View',           savedStep: 4, lastSaved: '02 Oct 2025, 10:45 AM' },
  { staffId: 'ORBIT-0011', name: 'Dr. Ngozi Chukwu',   position: 'Secretary',              period: 'Jan–Mar 2025', lastUpdated: '28 Sep 2025', progress: '90%',  status: 'In Review',   action: 'Submit to Dean', savedStep: 4, lastSaved: '28 Sep 2025, 5:30 PM' },
  { staffId: 'ORBIT-0012', name: 'Mrs. Aisha Musa',    position: 'Data Entry Clerk',       period: 'Jan–Mar 2025', lastUpdated: '-',           progress: '0%',   status: 'Not Started', action: 'Start',          savedStep: 0, lastSaved: '' },
])

const filteredActive = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return activeData.value
  return activeData.value.filter(
    (r) => r.staffId.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
  )
})

const activePageSize = ref(10)
const activePage = ref(1)
const activeTotalPages = computed(() => Math.ceil(filteredActive.value.length / activePageSize.value))

const paginatedActive = computed(() => {
  const start = (activePage.value - 1) * activePageSize.value
  return filteredActive.value.slice(start, start + activePageSize.value)
})

const visibleActivePages = computed(() => {
  const total = activeTotalPages.value
  const current = activePage.value
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + 4)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

// ── Status + Action styles ────────────────────────────────────────────────────
const statusClass = (status) => {
  if (status === 'Submitted')   return 'bg-gray-100 text-gray-500'
  if (status === 'In Review')   return 'bg-blue-50 text-orbit-blue'
  if (status === 'Not Started') return 'bg-orange-50 text-orange-500'
  return 'bg-gray-100 text-gray-500'
}

const actionClass = (action) => {
  if (action === 'Start')          return 'bg-orbit-green text-white hover:opacity-80'
  if (action === 'Submit to Dean') return 'bg-orbit-blue text-white hover:bg-orbit-bgSec'
  if (action === 'View')           return 'bg-orbit-blue text-white hover:bg-orbit-bgSec'
  return 'bg-orbit-blue text-white hover:bg-orbit-bgSec'
}
</script>
