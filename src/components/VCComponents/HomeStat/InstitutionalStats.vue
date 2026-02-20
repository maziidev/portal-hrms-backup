<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
    <div class="bg-orbit-bgSec p-8 text-white relative overflow-hidden">
      <div class="absolute -right-6 -top-6 w-32 h-32 bg-orbit-accent/10 rounded-full blur-2xl"></div>

      <div class="relative z-10">
        <h1 class="text-[10px] text-orbit-accent font-black uppercase tracking-[0.3em] mb-6 opacity-80">
          Institutional Structure
        </h1>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-black italic tracking-tighter">{{ stats.faculties_count || 0 }}</span>
          <span class="text-xs font-bold uppercase opacity-60 tracking-widest">Faculties</span>
          <span class="mx-2 opacity-30">|</span>
          <span class="text-4xl font-black italic tracking-tighter">{{ stats.divisions_count || 0 }}</span>
          <span class="text-xs font-bold uppercase opacity-60 tracking-widest">Divisions</span>
        </div>
      </div>
    </div>

    <div class="p-8 flex-1 flex flex-col justify-between space-y-8">
      <div class="group">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-orbit-bg transition-colors">
            Total Staff Force
          </span>
          <div class="h-px flex-1 mx-4 bg-gray-50 group-hover:bg-orbit-accent/30 transition-all"></div>
          <span class="text-2xl font-black text-orbit-bg italic tracking-tighter">
            {{ stats.total_staff?.toLocaleString() || 0 }}
          </span>
        </div>
      </div>

      <div class="group">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-orbit-bg transition-colors">
            Pending Promotions
          </span>
          <div class="h-px flex-1 mx-4 bg-gray-50 group-hover:bg-orbit-accent/30 transition-all"></div>
          <span class="text-2xl font-black text-orbit-bg italic tracking-tighter">
            {{ stats.pending_promotions || 0 }}
          </span>
        </div>
      </div>

      <div class="bg-gray-50/50 rounded-xl p-4 border border-gray-50 mt-auto">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Avg. Completion Rate
            </span>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                &uarr; {{ stats.growth_rate || 0 }}%
              </span>
              <span class="text-[9px] font-bold text-gray-400 uppercase">vs Last Quarter</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-3xl font-black text-orbit-bg italic tracking-tighter">
              {{ stats.avg_appraisal_rate || 0 }}<span class="text-lg ml-0.5">%</span>
            </span>
          </div>
        </div>

        <div class="w-full bg-gray-200 h-1 rounded-full mt-4 overflow-hidden">
          <div
            class="bg-orbit-bgSec h-full transition-all duration-1000"
            :style="{ width: (stats.avg_appraisal_rate || 0) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bgSec { background-color: #003366; }
.text-orbit-accent { color: #00ffff; }
</style>