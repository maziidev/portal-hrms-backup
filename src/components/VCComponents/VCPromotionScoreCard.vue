<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div class="bg-white p-3 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition-all duration-500">
        <div class="bg-orbit-bg px-8 py-10 rounded-2xl text-white relative overflow-hidden">
          <div class="absolute -right-2 -bottom-2 opacity-10 rotate-12">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <p class="text-xl text-orbit-accent font-bold mb-4">Total Promotion Applications</p>
          <p class="text-5xl font-black italic tracking-tighter">
            {{ promoData.total_applications || 0 }}
          </p>
        </div>

        <div class="px-6 py-8 flex items-center justify-between">
          <p class="font-bold text-orbit-bg uppercase text-[10px] tracking-widest">Approved Promotions</p>
          <p class="text-3xl font-black text-orbit-blue/50 italic tracking-tighter">
            {{ promoData.approved_promotions || 0 }}
          </p>
        </div>
      </div>

      <div class="bg-white py-10 px-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between group/row">
          <div class="flex items-center space-x-5">
            <div class="bg-orbit-blue w-1 h-10 rounded-full group-hover/row:h-12 transition-all"></div>
            <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Pending Applications</p>
          </div>
          <p class="text-3xl font-black text-orbit-green italic tracking-tighter">
            {{ promoData.pending_applications || 0 }}
          </p>
        </div>

        <div class="h-px w-full bg-gray-50 my-4"></div>

        <div class="flex items-center justify-between group/row">
          <div class="flex items-center space-x-5">
            <div class="bg-orbit-blue w-1 h-10 rounded-full group-hover/row:h-12 transition-all"></div>
            <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Average Time to Decision</p>
          </div>
          <p class="text-3xl font-black text-orbit-green italic tracking-tighter">
            {{ promoData.avg_decision_days || 0 }}<span class="text-xs not-italic ml-1 opacity-40 uppercase">days</span>
          </p>
        </div>
      </div>

      <div class="bg-white py-10 px-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between group/row">
          <div class="flex items-center space-x-5">
            <div class="bg-red-400 w-1 h-10 rounded-full group-hover/row:h-12 transition-all"></div>
            <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Rejected Applications</p>
          </div>
          <p class="text-3xl font-black text-orbit-green italic tracking-tighter">
            {{ promoData.rejected_applications || 0 }}
          </p>
        </div>

        <div class="h-px w-full bg-gray-50 my-4"></div>

        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-3">
             <div class="flex items-center space-x-5">
                <div class="bg-orbit-blue w-1 h-10 rounded-full group-hover/row:h-12 transition-all"></div>
                <p class="text-orbit-bg font-bold uppercase text-[10px] tracking-widest">Promotion Success Rate</p>
              </div>
            <p class="text-3xl font-black text-orbit-green italic tracking-tighter">
              {{ promoData.success_rate || 0 }}%
            </p>
          </div>
          <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
             <div
               class="h-full bg-orbit-green transition-all duration-1000"
               :style="{ width: (promoData.success_rate || 0) + '%' }"
             ></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { getFacultiesPromotionStats } from "@/apis/management/vc";
import { onMounted, ref } from "vue";

const promoData = ref({
  total_applications: 0,
  approved_promotions: 0,
  pending_applications: 0,
  avg_decision_days: 0,
  rejected_applications: 0,
  success_rate: 0
});

const init = async () => {
  try {
    const { data } = await getFacultiesPromotionStats()

    const faculties = data ?? []

    const totalApplications = faculties.reduce(
      (sum, f) => sum + (f.total_applications || 0),
      0
    )

    const approved = faculties.reduce(
      (sum, f) => sum + (f.approved_count || 0),
      0
    )

    const pending = faculties.reduce(
      (sum, f) => sum + (f.pending_count || 0),
      0
    )

    const rejected = totalApplications - approved - pending

    promoData.value = {
      total_applications: totalApplications,
      approved_promotions: approved,
      pending_applications: pending,
      rejected_applications: rejected > 0 ? rejected : 0,
      avg_decision_days: 0,
      success_rate:
        totalApplications > 0
          ? Number(((approved / totalApplications) * 100).toFixed(1))
          : 0
    }

  } catch (err) {
    console.error("Promotion Stat Load Error:", err)
  }
}

onMounted(init);
</script>

<style scoped>
.text-orbit-accent { color: #00ffff; }
.bg-orbit-bg { background-color: #002347; }
.text-orbit-bg { color: #002347; }
.text-orbit-green { color: #10b981; }
.bg-orbit-green { background-color: #10b981; }
.text-orbit-blue { color: #2388ff; }
.bg-orbit-blue { background-color: #2388ff; }
</style>