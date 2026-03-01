<template>
  <section class="px-2 lg:px-8 space-y-8">

    <!-- Session / Semester / Date / Time -->
    <SessionSemesterCard />

    <div class="px-6 space-y-8">

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-orbit-bg rounded-2xl px-7 py-5 text-white shadow-lg flex items-center justify-between">
          <span class="text-sm font-bold opacity-80">Active Staff</span>
          <span class="text-3xl font-black">1,240</span>
        </div>
        <div v-for="stat in summaryStats" :key="stat.label" class="bg-white rounded-2xl border border-gray-100 shadow-sm px-7 py-5 flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-500">{{ stat.label }}</span>
          <span class="text-3xl font-black text-orbit-bg">{{ stat.value }}</span>
        </div>
      </div>

      <!-- Directory Header -->
      <div class="flex items-center justify-between flex-wrap gap-4">
        <h2 class="text-xl font-black text-orbit-bg tracking-tight">All Staff Directory</h2>
        <button class="flex items-center gap-2 border border-orbit-blue text-orbit-blue font-bold text-sm rounded-xl px-5 py-2.5 hover:bg-orbit-blue hover:text-white transition-colors">
          <Upload :size="15" />
          Export Staff List
        </button>
      </div>

      <!-- Filters Row -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Search -->
        <div class="relative flex-1 min-w-[220px] max-w-sm">
          <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="by name, ID, or role"
            class="w-full pl-9 pr-4 py-2.5 text-sm rounded-full border border-gray-200 bg-white focus:outline-none focus:border-orbit-blue"
          />
        </div>

        <!-- Dropdowns -->
        <button v-for="f in filters" :key="f" class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-4 py-2.5 hover:border-orbit-blue transition-colors">
          {{ f }} <ChevronDown :size="13" />
        </button>

        <!-- Date Range -->
        <button class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-4 py-2.5 hover:border-orbit-blue transition-colors">
          Date Range <CalendarDays :size="14" />
        </button>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="border-b border-gray-100">
              <tr>
                <th
                  v-for="col in columns"
                  :key="col.key"
                  class="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-5 py-4 whitespace-nowrap"
                >
                  {{ col.label }}
                  <ChevronDown :size="9" class="inline ml-0.5 opacity-60" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="staff in paginatedStaff"
                :key="staff.id"
                class="hover:bg-orbit-light/60 cursor-pointer transition-colors"
                @click="goToDetail(staff.id)"
              >
                <td class="px-5 py-4 font-mono text-xs font-bold text-orbit-blue">{{ staff.staffId }}</td>
                <td class="px-5 py-4 font-semibold text-orbit-bg">{{ staff.name }}</td>
                <td class="px-5 py-4 text-gray-600">{{ staff.position }}</td>
                <td class="px-5 py-4 text-gray-600">{{ staff.cadre }}</td>
                <td class="px-5 py-4 text-gray-600">{{ staff.subunit }}</td>
                <td class="px-5 py-4 text-gray-600">{{ staff.employmentStatus }}</td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-2 text-gray-500">
                    <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0">
                      <CalendarDays :size="9" class="text-orbit-blue" />
                    </span>
                    {{ staff.lastPromotion }}
                  </div>
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
              v-model="pageSize"
              class="border border-gray-200 rounded-lg px-2 py-1 text-sm font-semibold focus:outline-none focus:border-orbit-blue"
              @change="currentPage = 1"
            >
              <option v-for="n in [10, 20, 50]" :key="n" :value="n">{{ n }}</option>
            </select>
            <span>of {{ filteredStaff.length }}</span>
          </div>

          <div class="flex items-center gap-1">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orbit-blue hover:text-orbit-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft :size="14" />
            </button>

            <button
              v-for="p in visiblePages"
              :key="p"
              @click="currentPage = p"
              :class="[
                'w-8 h-8 rounded-lg text-sm font-bold transition-colors',
                currentPage === p
                  ? 'bg-orbit-blue text-white shadow'
                  : 'border border-gray-200 text-gray-500 hover:border-orbit-blue hover:text-orbit-blue'
              ]"
            >
              {{ p }}
            </button>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orbit-blue hover:text-orbit-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight :size="14" />
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import SessionSemesterCard from '@/components/SessionSemesterCard.vue'
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Search, Upload } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ── Summary ──────────────────────────────────────────────────────────────────
const summaryStats = [
  { label: 'On Probation',   value: '1,240' },
  { label: 'On Study Leave', value: '1,240' },
  { label: 'Retired',        value: '1,240' },
]

// ── Filters ───────────────────────────────────────────────────────────────────
const filters = ['Category', 'Role', 'Status']
const searchQuery = ref('')

// ── Table columns ─────────────────────────────────────────────────────────────
const columns = [
  { key: 'staffId',          label: 'Staff ID'          },
  { key: 'name',             label: 'Name'              },
  { key: 'position',         label: 'Position'          },
  { key: 'cadre',            label: 'Cadre'             },
  { key: 'subunit',          label: 'Subunit'           },
  { key: 'employmentStatus', label: 'Employment Status' },
  { key: 'lastPromotion',    label: 'Last Promotion'    },
]

// ── Dummy data ────────────────────────────────────────────────────────────────
const allStaff = ref([
  { id: 1,  staffId: 'ORBIT-0001', name: 'Prof. John A. Doe',     position: 'Senior Records Officer', cadre: 'Senior',   subunit: 'Records',    employmentStatus: 'Full-Time', lastPromotion: '05 Aug 2005' },
  { id: 2,  staffId: 'ORBIT-0002', name: 'Mr. Emmanuel Udo',      position: 'Admin Clerk',            cadre: 'Junior',   subunit: 'Exams',      employmentStatus: 'Full-Time', lastPromotion: '05 Aug 2002' },
  { id: 3,  staffId: 'ORBIT-0002', name: 'Dr. Adewale Johnson',   position: 'Secretary',              cadre: 'Senior',   subunit: 'Admissions', employmentStatus: 'Full-Time', lastPromotion: '05 Aug 2002' },
  { id: 4,  staffId: 'ORBIT-0002', name: 'Engr. Fatima Sule',     position: 'Contract Staff',         cadre: 'Contract', subunit: 'Exams',      employmentStatus: 'Full-Time', lastPromotion: '05 Aug 1980' },
  { id: 5,  staffId: 'ORBIT-0002', name: 'Mr. Emmanuel Udo',      position: 'Senior Records Officer', cadre: 'Senior',   subunit: 'Records',    employmentStatus: 'Full-Time', lastPromotion: '05 Aug 2002' },
  { id: 6,  staffId: 'ORBIT-0002', name: 'Prof. John A. Doe',     position: 'Admin Clerk',            cadre: 'Junior',   subunit: 'Exams',      employmentStatus: 'Full-Time', lastPromotion: '05 Aug 2002' },
  { id: 7,  staffId: 'ORBIT-0002', name: 'Prof. John A. Doe',     position: 'Admin Clerk',            cadre: 'Junior',   subunit: 'Exams',      employmentStatus: 'Full-Time', lastPromotion: '05 Aug 2002' },
  { id: 8,  staffId: 'ORBIT-0002', name: 'Prof. John A. Doe',     position: 'Secretary',              cadre: 'Senior',   subunit: 'Admissions', employmentStatus: 'Contract',  lastPromotion: '05 Aug 2002' },
  { id: 9,  staffId: 'ORBIT-0002', name: 'Prof. John A. Doe',     position: 'Secretary',              cadre: 'Senior',   subunit: 'HOD',        employmentStatus: 'Contract',  lastPromotion: '05 Aug 2002' },
  { id: 10, staffId: 'ORBIT-0002', name: 'Prof. John A. Doe',     position: 'Contract Staff',         cadre: 'Contract', subunit: 'Exams',      employmentStatus: 'Visiting',  lastPromotion: '05 Aug 2002' },
  { id: 11, staffId: 'ORBIT-0003', name: 'Dr. Ada Nwosu',         position: 'Senior Lecturer',        cadre: 'Senior',   subunit: 'Records',    employmentStatus: 'Full-Time', lastPromotion: '12 Jan 2019' },
  { id: 12, staffId: 'ORBIT-0004', name: 'Mrs. Kemi Okafor',      position: 'Principal Officer',      cadre: 'Senior',   subunit: 'Registry',   employmentStatus: 'Full-Time', lastPromotion: '03 Mar 2021' },
  { id: 13, staffId: 'ORBIT-0005', name: 'Mr. Emeka Eze',         position: 'Admin Officer',          cadre: 'Junior',   subunit: 'Finance',    employmentStatus: 'Full-Time', lastPromotion: '07 Jun 2018' },
  { id: 14, staffId: 'ORBIT-0006', name: 'Prof. Bola Adeyemi',    position: 'Head of Unit',           cadre: 'Senior',   subunit: 'Admissions', employmentStatus: 'Full-Time', lastPromotion: '22 Nov 2020' },
  { id: 15, staffId: 'ORBIT-0007', name: 'Dr. Ngozi Chukwu',      position: 'Secretary',              cadre: 'Junior',   subunit: 'Exams',      employmentStatus: 'Full-Time', lastPromotion: '15 Aug 2017' },
  { id: 16, staffId: 'ORBIT-0008', name: 'Engr. Suleiman Yusuf',  position: 'Technical Officer',      cadre: 'Contract', subunit: 'ICT',        employmentStatus: 'Contract',  lastPromotion: '01 Feb 2023' },
  { id: 17, staffId: 'ORBIT-0009', name: 'Mrs. Aisha Musa',       position: 'Data Entry Clerk',       cadre: 'Junior',   subunit: 'Records',    employmentStatus: 'Full-Time', lastPromotion: '10 Oct 2015' },
  { id: 18, staffId: 'ORBIT-0010', name: 'Dr. Chinedu Obi',       position: 'Research Officer',       cadre: 'Senior',   subunit: 'Research',   employmentStatus: 'Full-Time', lastPromotion: '19 May 2022' },
  { id: 19, staffId: 'ORBIT-0011', name: 'Miss. Fola Taiwo',      position: 'Admin Clerk',            cadre: 'Junior',   subunit: 'Finance',    employmentStatus: 'Visiting',  lastPromotion: '28 Jul 2016' },
  { id: 20, staffId: 'ORBIT-0012', name: 'Prof. Ibrahim Lawal',   position: 'Senior Lecturer',        cadre: 'Senior',   subunit: 'HOD',        employmentStatus: 'Full-Time', lastPromotion: '30 Sep 2019' },
  { id: 21, staffId: 'ORBIT-0013', name: 'Mr. Tunde Bakare',      position: 'Admin Officer',          cadre: 'Junior',   subunit: 'Admissions', employmentStatus: 'Full-Time', lastPromotion: '14 Dec 2014' },
  { id: 22, staffId: 'ORBIT-0014', name: 'Dr. Grace Bello',       position: 'Lecturer II',            cadre: 'Senior',   subunit: 'Registry',   employmentStatus: 'Full-Time', lastPromotion: '09 Apr 2021' },
  { id: 23, staffId: 'ORBIT-0015', name: 'Mr. Seun Adeleke',      position: 'Store Officer',          cadre: 'Junior',   subunit: 'Finance',    employmentStatus: 'Full-Time', lastPromotion: '03 Jan 2013' },
  { id: 24, staffId: 'ORBIT-0016', name: 'Mrs. Patience Igwe',    position: 'Principal Secretary',    cadre: 'Senior',   subunit: 'Registry',   employmentStatus: 'Full-Time', lastPromotion: '17 Jun 2020' },
  { id: 25, staffId: 'ORBIT-0017', name: 'Dr. Aminu Garba',       position: 'Research Fellow',        cadre: 'Senior',   subunit: 'Research',   employmentStatus: 'Contract',  lastPromotion: '25 Feb 2022' },
  { id: 26, staffId: 'ORBIT-0018', name: 'Miss. Chisom Okafor',   position: 'Library Officer',        cadre: 'Junior',   subunit: 'Library',    employmentStatus: 'Full-Time', lastPromotion: '11 Nov 2018' },
  { id: 27, staffId: 'ORBIT-0019', name: 'Mr. Biodun Fasanya',    position: 'IT Support',             cadre: 'Contract', subunit: 'ICT',        employmentStatus: 'Contract',  lastPromotion: '08 Aug 2023' },
  { id: 28, staffId: 'ORBIT-0020', name: 'Prof. Yetunde Coker',   position: 'Deputy Registrar',       cadre: 'Senior',   subunit: 'Registry',   employmentStatus: 'Full-Time', lastPromotion: '02 Mar 2017' },
  { id: 29, staffId: 'ORBIT-0021', name: 'Dr. Felix Udo',         position: 'Lecturer I',             cadre: 'Senior',   subunit: 'Exams',      employmentStatus: 'Full-Time', lastPromotion: '16 Jul 2019' },
])

// ── Filtering & Pagination ────────────────────────────────────────────────────
const filteredStaff = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return allStaff.value
  return allStaff.value.filter(
    (s) =>
      s.staffId.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.position.toLowerCase().includes(q)
  )
})

const pageSize = ref(10)
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filteredStaff.value.length / pageSize.value))

const paginatedStaff = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredStaff.value.slice(start, start + pageSize.value)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + 4)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

// ── Navigation ────────────────────────────────────────────────────────────────
const goToDetail = (id) => {
  router.push(`/unit_head/staffs/${id}`)
}
</script>
