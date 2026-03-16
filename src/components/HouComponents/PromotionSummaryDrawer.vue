<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 z-[8900] bg-gray-900/40 backdrop-blur-sm"
        @click="$emit('close')"
      />
    </Transition>

    <Transition name="slide-right">
      <div
        v-if="show"
        class="fixed top-0 right-0 z-[9000] h-full w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        <div class="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0 bg-gray-50/50">
          <button
            @click="$emit('close')"
            class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"
          >
            <X :size="18" class="text-gray-500" />
          </button>
          <h2 class="text-lg font-bold text-gray-900">Promotion Summary</h2>
          <div class="w-10" />
        </div>

        <div class="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          <div class="space-y-5">
            <div class="flex items-center justify-between flex-wrap gap-3">
              <h3 class="font-bold text-gray-900 text-sm uppercase tracking-wider">Promotion Report</h3>
              <div class="flex p-1 bg-gray-100 rounded-xl border border-gray-200">
                <button
                  v-for="r in ranges"
                  :key="r"
                  @click="activeRange = r"
                  :class="[
                    'px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-200',
                    activeRange === r ? 'bg-white text-orbit-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  ]"
                >{{ r }}</button>
              </div>
            </div>

            <div v-if="loading" class="py-10 flex justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orbit-blue"></div>
            </div>

            <div v-else class="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50/80">
                    <tr>
                      <th v-for="col in reportCols" :key="col" class="text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 px-4 py-3 whitespace-nowrap">
                        {{ col }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="row in reportData" :key="row.id" class="hover:bg-gray-50/60 transition-colors">
                      <td class="px-4 py-4">
                        <p class="text-xs font-bold text-gray-900 leading-snug">{{ row.transition }}</p>
                      </td>
                      <td class="px-4 py-4 text-xs font-semibold text-gray-600">{{ row.staffCount }}</td>
                      <td class="px-4 py-4 text-xs font-bold text-orbit-blue">{{ row.avgScore }}</td>
                      <td class="px-4 py-4">
                        <span :class="summaryStatusClass(row.status)" class="px-3 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap">
                          {{ row.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <button class="w-full flex items-center justify-center gap-2 py-4 bg-orbit-blue text-white font-bold text-sm rounded-2xl shadow-lg shadow-orbit-blue/20 hover:bg-orbit-blue/90 transition-all">
            <Upload :size="16" /> Export Promotion Data
          </button>

          <div class="space-y-4 pt-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-gray-900 text-sm uppercase tracking-wider">Recent Activities</h3>
              <span class="px-2 py-0.5 bg-orbit-blue/10 text-orbit-blue text-[10px] font-bold rounded-md">
                {{ activities.length }} NEW
              </span>
            </div>

            <div class="space-y-2">
              <div v-for="act in activities" :key="act.id" class="group flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-orbit-blue/30 hover:shadow-md transition-all">
                <div class="w-2 h-2 rounded-full bg-orbit-blue shrink-0 mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
                <div class="flex-1 space-y-1">
                  <p class="text-sm font-semibold text-gray-800 leading-snug group-hover:text-gray-900">
                    {{ act.message }}
                  </p>
                  <div class="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                    <Calendar :size="10" />
                    {{ act.time }}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { getPromotionList, getPromotionStats } from '@/apis/management/staff.js';
import { Calendar, Upload, X } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps({ show: { type: Boolean, default: false } })
defineEmits(['close'])

const loading = ref(false)
const ranges = ['Week', 'Month', 'Year']
const activeRange = ref('Month')

const reportCols = ['Rank Transition', 'Staff', 'Avg Score', 'Status']
const reportData = ref([])
const activities = ref([])

/**
 * Fetch Data from API
 */
const fetchData = async () => {
  loading.value = true
  try {
    // 1. Get Summary Table Data
    const statsRes = await getPromotionStats()
    // Map backend keys to UI keys
    // Backend likely returns { results: [{ transition: '...', count: 5, score: 10, status: 'PENDING' }] }
    reportData.value = (statsRes.data?.results || []).map((item, index) => ({
      id: index,
      transition: item.rank_transition || 'Unknown',
      staffCount: item.staff_count || 0,
      avgScore: `${item.avg_score || 0}/15`,
      status: item.status || 'Pending'
    }))

    // 2. Get Recent Activities (Notifications)
    const listRes = await getPromotionList({ limit: 5 })
    activities.value = (listRes.data?.results || []).map(promo => ({
      id: promo.id,
      message: `${promo.staff_name} applied for ${promo.rank_transition}`,
      time: new Date(promo.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }))
  } catch (error) {
    console.error("Failed to load promotion summary:", error)
  } finally {
    loading.value = false
  }
}

// Watch for drawer open to refresh data
watch(() => props.show, (isOpen) => {
  if (isOpen) fetchData()
})

const summaryStatusClass = (s) => {
  const status = s.toLowerCase()
  if (status.includes('dean')) return 'bg-gray-100 text-gray-600'
  if (status.includes('completed')) return 'bg-blue-100 text-orbit-blue'
  if (status.includes('ongoing')) return 'bg-blue-50 text-orbit-blue'
  if (status.includes('pending')) return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-500'
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }
</style>