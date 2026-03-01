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
        <p class="text-sm text-gray-400 font-medium">Monitor who's currently on leave and their acting substitutes</p>
      </div>
      <button class="text-gray-400 hover:text-orbit-bg transition-colors">
        <MoreHorizontal :size="20" />
      </button>
    </div>

    <div class="px-6">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <!-- Table header -->
        <div class="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-50">
          <h3 class="font-black text-orbit-bg text-base flex-1">Currently Active Leaves</h3>
          <div class="relative">
            <Search :size="13" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Name / ID"
              class="pl-8 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-orbit-blue w-48"
            />
          </div>
          <button class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-3 py-2 hover:border-orbit-blue transition-colors">
            Leave Type <ChevronDown :size="13" />
          </button>
          <button class="flex items-center gap-1.5 text-sm text-gray-600 font-semibold border border-gray-200 bg-white rounded-lg px-3 py-2 hover:border-orbit-blue transition-colors">
            Remaining Days
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
              <tr v-for="r in filtered" :key="r.name + r.startDate" class="hover:bg-orbit-light/50 transition-colors">
                <td class="px-5 py-4 font-semibold text-orbit-bg whitespace-nowrap">{{ r.name }}</td>
                <td class="px-5 py-4 text-gray-500">{{ r.leaveType }}</td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-1.5 text-gray-500 whitespace-nowrap">
                    <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0">
                      <CalendarDays :size="9" class="text-orbit-blue" />
                    </span>
                    {{ r.startDate }}
                  </div>
                </td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-1.5 text-gray-500 whitespace-nowrap">
                    <span class="w-4 h-4 rounded bg-orbit-blue/10 flex items-center justify-center shrink-0">
                      <CalendarDays :size="9" class="text-orbit-blue" />
                    </span>
                    {{ r.endDate }}
                  </div>
                </td>
                <td class="px-5 py-4 font-semibold text-orbit-bg">{{ r.remainingDays }}</td>
                <td class="px-5 py-4 text-gray-600">{{ r.actingOfficer }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { CalendarDays, ChevronDown, ChevronLeft, MoreHorizontal, Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const search = ref('')

const columns = ['Name', 'Leave Type', 'Start Date', 'End Date', 'Remaining Days', 'Acting Officer']

const activeLeaves = ref([
  { name: 'Mrs. Linda Okafor',  leaveType: 'Annual Leave', startDate: '10 Oct 2025', endDate: '27 Oct 2025', remainingDays: '17 Days', actingOfficer: 'Mr. Bassey'          },
  { name: 'Mr. Emmanuel Udo',   leaveType: 'Study Leave',  startDate: '14 Aug 2025', endDate: '14 Nov 2025', remainingDays: '40 Days', actingOfficer: 'Mr. Jude Opara'      },
  { name: 'Dr. Emmanuel Udo',   leaveType: 'Sick Leave',   startDate: '14 Aug 2025', endDate: '14 Nov 2025', remainingDays: '40 Days', actingOfficer: 'Mrs. Linda Okafor'   },
  { name: 'Prof. Tunde Ayeni',  leaveType: 'Sick Leave',   startDate: '14 Aug 2025', endDate: '14 Nov 2025', remainingDays: '40 Days', actingOfficer: 'Dr. Emmanuel Udo'    },
  { name: 'Dr. Helen Eze',      leaveType: 'Study Leave',  startDate: '14 Aug 2025', endDate: '14 Nov 2025', remainingDays: '40 Days', actingOfficer: 'Prof. Linda Okafor'  },
])

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return activeLeaves.value
  return activeLeaves.value.filter(r => r.name.toLowerCase().includes(q))
})
</script>
