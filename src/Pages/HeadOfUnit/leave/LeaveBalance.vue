<template>
  <section class="px-2 lg:px-8 pb-16">

    <!-- Page meta header -->
    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <button
          @click="router.back()"
          class="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-orbit-bg transition-colors"
        >
          <ChevronLeft :size="16" /> Back
        </button>
        <p class="text-sm text-gray-400 font-medium">Department Overview</p>
      </div>
      <button class="text-gray-400 hover:text-orbit-bg transition-colors">
        <MoreHorizontal :size="20" />
      </button>
    </div>

    <div class="px-6">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <!-- Table header -->
        <div class="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-50">
          <h3 class="font-black text-orbit-bg text-base flex-1">Leave Requests Overview</h3>
          <div class="relative">
            <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Name / ID"
              class="pl-8 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-orbit-blue w-48"
            />
          </div>
          <button v-for="f in filters" :key="f" class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-3 py-2 hover:border-orbit-blue transition-colors">
            {{ f }} <ChevronDown :size="13" />
          </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-50">
                <th v-for="col in columns" :key="col" class="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-5 py-3 whitespace-nowrap">
                  {{ col }} <ChevronDown :size="8" class="inline ml-0.5 opacity-50" />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="r in filtered" :key="r.name + r.leaveType" class="hover:bg-orbit-light/50 transition-colors">
                <td class="px-5 py-4 font-semibold text-orbit-bg whitespace-nowrap">{{ r.name }}</td>
                <td class="px-5 py-4 text-gray-500">{{ r.leaveType }}</td>
                <td class="px-5 py-4 text-gray-600">{{ r.entitlement }}</td>
                <td class="px-5 py-4 text-gray-600">{{ r.taken }}</td>
                <td class="px-5 py-4 font-semibold text-orbit-bg">{{ r.remaining }}</td>
                <td class="px-5 py-4">
                  <span :class="statusClass(r.status)" class="px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap">
                    {{ r.status }}
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
import { ChevronDown, ChevronLeft, MoreHorizontal, Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const search  = ref('')
const filters = ['Leave Type', 'Cadre', 'Month / Year']
const columns = ['Name', 'Leave Type', 'Entitlement', 'Taken', 'Remaining', 'Status']

const balanceData = ref([
  { name: 'Prof. John A. Doe',  leaveType: 'Annual Leave',   entitlement: 30, taken: 0,  remaining: 30, status: 'Ongoing' },
  { name: 'Mr. Emmanuel Udo',   leaveType: 'Study Leave',    entitlement: 16, taken: 10, remaining: 6,  status: 'Updated' },
  { name: 'Mr. Emmanuel Udo',   leaveType: 'Study Leave',    entitlement: 24, taken: 12, remaining: 12, status: 'Updated' },
  { name: 'Prof. John A. Doe',  leaveType: 'Sick Leave',     entitlement: 36, taken: 14, remaining: 12, status: 'Updated' },
  { name: 'Prof. John A. Doe',  leaveType: 'Maternity Leave',entitlement: 40, taken: 28, remaining: 12, status: 'Updated' },
  { name: 'Dr. Ada Nwosu',      leaveType: 'Annual Leave',   entitlement: 30, taken: 5,  remaining: 25, status: 'Ongoing' },
  { name: 'Mrs. Kemi Okafor',   leaveType: 'Casual Leave',   entitlement: 10, taken: 4,  remaining: 6,  status: 'Updated' },
  { name: 'Dr. Grace Bello',    leaveType: 'Study Leave',    entitlement: 24, taken: 0,  remaining: 24, status: 'Ongoing' },
])

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return balanceData.value
  return balanceData.value.filter(r => r.name.toLowerCase().includes(q) || r.leaveType.toLowerCase().includes(q))
})

const statusClass = (s) => {
  if (s === 'Ongoing') return 'bg-yellow-100 text-yellow-700'
  if (s === 'Updated') return 'bg-blue-50 text-orbit-blue'
  return 'bg-gray-100 text-gray-500'
}
</script>
