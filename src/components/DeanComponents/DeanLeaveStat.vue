<script setup>
import { getStaffStatsPerDepartment } from "@/apis/management/dean";
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Users
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(false);

// --- STATE ---
const stats = ref({
  total_staff: 0,
  completed_appraisals: 0,
  pending_appraisals: 0,
  returned_appraisals: 0
});

// --- API CONSUMPTION ---
const fetchDepartmentStats = async () => {
  const departmentId = route.params.id;
  if (!departmentId) return;

  loading.value = true;
  try {
    const { data } = await getStaffStatsPerDepartment(departmentId);
    // Directly mapping the API response to our stats object
    stats.value = data;
  } catch (err) {
    console.error("Failed to fetch department statistics:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDepartmentStats);
</script>

<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <div class="bg-orbit-bg px-6 py-8 flex flex-col justify-between rounded-[2rem] text-white shadow-lg min-h-[160px] relative overflow-hidden group">
        <div class="flex items-center justify-between relative z-10">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Total Staff</p>
          <div class="bg-white/10 p-2 rounded-xl backdrop-blur-md">
            <Users :size="20" class="text-white" />
          </div>
        </div>
        <div class="relative z-10">
          <h2 class="text-5xl font-black italic tracking-tighter leading-none">
            {{ stats.total_staff }}
          </h2>
          <p class="text-[10px] opacity-50 uppercase mt-2 font-bold">Active Personnel</p>
        </div>
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
      </div>

      <div class="bg-white px-6 py-8 flex flex-col justify-between rounded-[2rem] border border-gray-100 shadow-sm min-h-[160px] hover:border-green-100 transition-colors">
        <div class="flex items-center justify-between">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Completed</p>
          <div class="bg-green-50 p-2 rounded-xl text-green-500">
            <CheckCircle :size="20" />
          </div>
        </div>
        <div>
          <h2 class="text-5xl font-black text-orbit-bg italic tracking-tighter leading-none">
            {{ stats.completed_appraisals || 0 }}
          </h2>
          <p class="text-[10px] text-gray-400 uppercase mt-2 font-bold">Reviews Finalized</p>
        </div>
      </div>

      <div class="bg-white px-6 py-8 flex flex-col justify-between rounded-[2rem] border border-gray-100 shadow-sm min-h-[160px] hover:border-amber-100 transition-colors">
        <div class="flex items-center justify-between">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pending HOD</p>
          <div class="bg-amber-50 p-2 rounded-xl text-amber-500">
            <Clock :size="20" />
          </div>
        </div>
        <div>
          <h2 class="text-5xl font-black text-orbit-bg italic tracking-tighter leading-none">
            {{ stats.pending_appraisals || 0 }}
          </h2>
          <p class="text-[10px] text-gray-400 uppercase mt-2 font-bold">Awaiting Action</p>
        </div>
      </div>

      <div class="bg-white px-6 py-8 flex flex-col justify-between rounded-[2rem] border border-gray-100 shadow-sm min-h-[160px] hover:border-red-100 transition-colors">
        <div class="flex items-center justify-between">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Returned</p>
          <div class="bg-red-50 p-2 rounded-xl text-red-500">
            <AlertCircle :size="20" />
          </div>
        </div>
        <div>
          <h2 class="text-5xl font-black text-orbit-bg italic tracking-tighter leading-none">
            {{ stats.returned_appraisals || 0 }}
          </h2>
          <p class="text-[10px] text-gray-400 uppercase mt-2 font-bold">Needs Revision</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Mapping your project color variable */
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

/* Smooth hover transition for all cards */
.grid > div {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.grid > div:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}
</style>