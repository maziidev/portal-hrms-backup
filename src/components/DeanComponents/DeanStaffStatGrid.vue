<script setup>
import { getStaffStatsPerDepartment } from "@/apis/management/dean"
import { useAuthStore } from '@/store/auth'
import { useMessage } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const message = useMessage()

// Using the computed getter from your store definition
const departmentId = computed(() => route.params.id || authStore.departmentId)

const stats = ref({
  active_staff: 0,
  on_probation: 0,
  on_leave: 0,
  retired: 0
})
const loading = ref(false)

const goBack = () => router.back()

const fetchStats = async () => {
  if (!departmentId.value) return message.error('Department context missing')

  loading.value = true
  try {
    const { data } = await getStaffStatsPerDepartment(departmentId.value)
    stats.value = data || {}
  } catch (err) {
    message.error('Failed to load department statistics')
  } finally {
    loading.value = false
  }
}

onMounted(fetchStats)
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <button
        @click="goBack"
        class="group flex items-center text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 hover:text-orbit-bg transition-all duration-300"
      >
        <span class="mr-2 transition-transform group-hover:-translate-x-1">←</span>
        Back to Staff List
      </button>

      <div v-if="loading" class="flex items-center space-x-2">
        <div class="w-1.5 h-1.5 bg-orbit-bg rounded-full animate-bounce"></div>
        <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Syncing</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <div class="relative overflow-hidden bg-orbit-bg px-6 py-8 rounded-2xl text-white shadow-lg transition-transform hover:scale-[1.02] duration-300">
        <span class="absolute -right-2 -bottom-4 text-7xl font-black text-white/5 pointer-events-none">A</span>
        <div class="relative z-10">
          <p class="text-[10px] uppercase tracking-widest font-bold opacity-70">Active Force</p>
          <p class="text-4xl font-black mt-2 leading-none">{{ stats.active_staff ?? 0 }}</p>
        </div>
        <div class="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
      </div>

      <div class="relative overflow-hidden bg-white px-6 py-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-orbit-bg group">
        <span class="absolute -right-2 -bottom-4 text-7xl font-black text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">P</span>
        <div class="relative z-10">
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">On Probation</p>
          <p class="text-4xl font-black text-orbit-bg mt-2 leading-none">{{ stats.on_probation ?? 0 }}</p>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white px-6 py-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-orbit-bg group">
        <span class="absolute -right-2 -bottom-4 text-7xl font-black text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">L</span>
        <div class="relative z-10">
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">On Leave</p>
          <p class="text-4xl font-black text-orbit-bg mt-2 leading-none">{{ stats.on_leave ?? 0 }}</p>
        </div>
      </div>

      <div class="relative overflow-hidden bg-white px-6 py-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-orbit-bg group">
        <span class="absolute -right-2 -bottom-4 text-7xl font-black text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">R</span>
        <div class="relative z-10">
          <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Retired</p>
          <p class="text-4xl font-black text-orbit-bg mt-2 leading-none">{{ stats.retired ?? 0 }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }

/* Staggered entrance animation for cards */
.grid > div {
  opacity: 0;
  animation: slideIn 0.5s ease-out forwards;
}

.grid > div:nth-child(1) { animation-delay: 0.1s; }
.grid > div:nth-child(2) { animation-delay: 0.2s; }
.grid > div:nth-child(3) { animation-delay: 0.3s; }
.grid > div:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>