<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-[8900] bg-black/30 backdrop-blur-sm"
        @click="$emit('close')"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide-right">
      <div
        v-if="show"
        class="fixed top-0 right-0 z-[9000] h-full w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <button
            @click="$emit('close')"
            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X :size="14" class="text-gray-600" />
          </button>
          <h2 class="text-base font-black text-orbit-bg">Promotion Summary</h2>
          <div class="w-8" />
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          <!-- ── Promotion Report ── -->
          <div class="space-y-4">
            <div class="flex items-center justify-between flex-wrap gap-3">
              <h3 class="font-black text-orbit-bg text-sm">Promotion Report</h3>
              <div class="flex p-0.5 bg-gray-50 rounded-xl border border-gray-100">
                <button
                  v-for="r in ranges"
                  :key="r"
                  @click="activeRange = r"
                  :class="[
                    'px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-200',
                    activeRange === r ? 'bg-orbit-blue text-white shadow' : 'text-gray-400 hover:text-orbit-bg'
                  ]"
                >{{ r }}</button>
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th v-for="col in reportCols" :key="col" class="text-left text-[10px] font-black uppercase tracking-widest text-orbit-bg px-3 py-2.5 whitespace-nowrap">
                      {{ col }} <ChevronDown :size="8" class="inline ml-0.5 text-gray-400" />
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="row in reportData" :key="row.transition + row.status" class="hover:bg-gray-50/60 transition-colors">
                    <td class="px-3 py-4 text-xs font-semibold text-gray-700 leading-snug">{{ row.transition }}</td>
                    <td class="px-3 py-4 text-xs text-gray-500">{{ row.staff }}</td>
                    <td class="px-3 py-4 text-xs font-semibold text-gray-600">{{ row.avgScore }}</td>
                    <td class="px-3 py-4 text-xs font-semibold text-gray-600">{{ row.avgYears }}</td>
                    <td class="px-3 py-4">
                      <span :class="summaryStatusClass(row.status)" class="px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap">
                        {{ row.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Export button -->
          <button class="w-full flex items-center justify-center gap-2 py-3.5 bg-orbit-blue text-white font-black text-sm rounded-xl hover:bg-orbit-bgSec transition-colors">
            <Upload :size="15" /> Export Promotion Summary Report
          </button>

          <!-- ── Notifications ── -->
          <div class="space-y-0">
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <span class="text-sm font-black text-orbit-bg">Notifications</span>
              <span class="text-sm font-black text-orbit-bg">{{ notifications.length }}</span>
            </div>
          </div>

          <!-- ── Recent Activities ── -->
          <div class="space-y-0">
            <h3 class="font-black text-orbit-bg text-sm mb-3">Recent Activities</h3>
            <div class="space-y-0 divide-y divide-gray-50">
              <div v-for="act in activities" :key="act.id" class="flex gap-3 py-4">
                <span class="w-1 rounded-full bg-orbit-blue shrink-0 mt-0.5"></span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-orbit-bg leading-snug">{{ act.message }}</p>
                </div>
                <span class="text-[10px] text-gray-400 font-medium whitespace-nowrap shrink-0">{{ act.time }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ChevronDown, Upload, X } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps({ show: { type: Boolean, default: false } })
defineEmits(['close'])

const ranges      = ['Week', 'Month', 'Year']
const activeRange = ref('Month')

const reportCols = ['Rank Transition', 'No. of Staff', 'Avg. Appraisal Score', 'Avg. Years in Rank', 'Status']

const reportData = [
  { transition: 'Assistant Lecturer → Lecturer II',  staff: 'Senior Lecturer', avgScore: '12/15', avgYears: 3.5, status: 'Sent to Dean' },
  { transition: 'Lecturer II → Lecturer I',          staff: 'Lecturer I',      avgScore: '10/15', avgYears: 4,   status: 'Completed'    },
  { transition: 'Lecturer II → Lecturer I',          staff: 'Lecturer I',      avgScore: '10/15', avgYears: 4,   status: 'Ongoing'      },
  { transition: 'Senior Lecturer → Associate Professor', staff: 'Lecturer I',  avgScore: '9/15',  avgYears: 5,   status: 'Pending'      },
]

const notifications = [
  { id: 1, message: 'New promotion request from Dr. Helen Eze awaiting review',           time: 'Today, 03:00 PM'   },
  { id: 2, message: 'Promotion for Lecturer I → Senior Lecturer endorsed and sent to Dean', time: 'Sept 20, 03:00 PM' },
  { id: 3, message: 'Promotion request for Mrs. Ada Nkem returned for corrections.',       time: 'Sept 18, 03:00 PM' },
  { id: 4, message: 'Promotion for Lecturer I → Senior Lecturer endorsed and sent to Dean', time: 'Sept 12, 03:00 PM' },
]

const activities = [
  { id: 1, message: 'New promotion request from Dr. Helen Eze awaiting review',           time: 'Today, 03:00 PM'   },
  { id: 2, message: 'Promotion for Lecturer I → Senior Lecturer endorsed and sent to Dean', time: 'Sept 20, 03:00 PM' },
  { id: 3, message: 'Promotion request for Mrs. Ada Nkem returned for corrections.',       time: 'Sept 18, 03:00 PM' },
  { id: 4, message: 'Promotion for Lecturer I → Senior Lecturer endorsed and sent to Dean', time: 'Sept 12, 03:00 PM' },
  { id: 5, message: 'Promotion for Lecturer I → Senior Lecturer endorsed and sent to Dean', time: '1 week ago'        },
  { id: 6, message: 'Promotion request for Dr. Iweala Nkem returned for corrections.',     time: '1 week ago'        },
]

const summaryStatusClass = (s) => {
  if (s === 'Sent to Dean') return 'bg-gray-100 text-gray-600'
  if (s === 'Completed')    return 'bg-green-100 text-orbit-green'
  if (s === 'Ongoing')      return 'bg-blue-50 text-orbit-blue'
  if (s === 'Pending')      return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-500'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
