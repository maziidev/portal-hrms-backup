<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col h-full overflow-hidden relative">
    <div class="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none">
      <svg width="160" height="160" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>

    <div class="mb-8">
      <h2 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Impact & Research</h2>
      <div class="h-0.5 w-8 bg-orbit-wa"></div>
    </div>

    <div class="grid grid-cols-1 gap-6 flex-1">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-50/50 p-5 rounded-2xl border border-gray-50 group hover:border-orbit-wa/30 transition-all">
          <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Research Projects</p>
          <div class="flex items-end justify-between">
            <span class="text-3xl font-black text-orbit-bg italic tracking-tighter leading-none">
              {{ stats.ongoing_research || 0 }}
            </span>
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-4 h-4 text-orbit-wa" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
          </div>
        </div>

        <div class="bg-gray-50/50 p-5 rounded-2xl border border-gray-50 group hover:border-orbit-wa/30 transition-all">
          <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Total Publications</p>
          <div class="flex items-end justify-between">
            <span class="text-3xl font-black text-orbit-bg italic tracking-tighter leading-none">
              {{ publications.total_count || 0 }}
            </span>
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-4 h-4 text-orbit-wa" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between p-5 border-y border-gray-50 group">
        <div>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Approved Leaves</p>
          <p class="text-[9px] font-bold text-gray-400 mt-0.5">Active staff absences</p>
        </div>
        <span class="text-3xl font-black text-orbit-bg italic tracking-tighter">
          {{ stats.approved_leaves || 0 }}
        </span>
      </div>

      <div class="mt-auto">
        <div class="flex justify-between items-end mb-3">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Staff Satisfaction</p>
          <p class="text-2xl font-black text-orbit-wa italic tracking-tighter">
            {{ stats.satisfaction_index || '0.0' }}<span class="text-xs text-gray-300 not-italic ml-1">/ 10</span>
          </p>
        </div>
        <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
          <div
            class="h-full bg-orbit-wa transition-all duration-1000"
            :style="{ width: ((stats.satisfaction_index || 0) * 10) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: { type: Object, default: () => ({}) },
  publications: { type: Object, default: () => ({}) }
});
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.text-orbit-wa { color: #2388ff; }
.bg-orbit-wa { background-color: #2388ff; }
</style>