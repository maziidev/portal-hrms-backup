<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col space-y-6 h-full">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
          Activity Feed
        </h2>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          Real-time Faculty Updates
        </p>
      </div>
      <div class="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span class="text-[9px] font-black text-green-700 uppercase tracking-tighter">Live</span>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col space-y-4">
      <div v-for="i in 3" :key="i" class="animate-pulse flex items-center gap-4">
        <div class="rounded-full bg-gray-200 h-10 w-10"></div>
        <div class="flex-1 space-y-2">
          <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          <div class="h-2 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>

    <div v-else class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div v-if="feed.length > 0" class="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-100 before:via-gray-200 before:to-transparent">

        <div v-for="(item, idx) in feed" :key="idx" class="relative flex items-start gap-4 group">
          <div class="relative flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-white border-2 border-gray-100 group-hover:border-orbit-bg transition-colors duration-300">
            <div class="h-2 w-2 rounded-full bg-orbit-bg"></div>
          </div>

          <div class="flex flex-col flex-1 pt-1">
            <p class="text-xs font-bold text-gray-800 leading-relaxed uppercase tracking-tight">
              {{ item.message }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-[10px] font-bold text-gray-400 uppercase">
                {{ formatDate(item.time) }}
              </span>
              <span class="text-[10px] text-gray-300">•</span>
              <span class="text-[9px] font-black text-orbit-bg/60 uppercase tracking-widest">
                {{ item.category || 'System' }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <div v-else class="flex flex-col items-center justify-center py-12 text-center">
        <div class="bg-gray-50 p-4 rounded-full mb-3">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">No recent activity found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivityFeed } from '@/composables/Dean/useActivityFeed.js'
import { useAuthStore } from '@/store/auth.js'

const authStore = useAuthStore()
const departmentId = authStore.departmentId || null

const { feed, loading } = useActivityFeed(departmentId)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / 60000)

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
         ' • ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

/* Custom Scrollbar for the feed */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Fix for container height */
.max-h-125 {
  max-height: 500px;
}
</style>