<script setup>
import { getAppraisalStats } from '@/apis/services/hou/appraisal.services.js';
import { getLeaveStats } from '@/apis/services/hou/leave.services.js';
import { getPromotionStats } from '@/apis/services/hou/promotions.services.js';
import { getStaffSummary } from '@/apis/services/hou/staff.services.js';
import { onMounted, ref } from 'vue';


// Props to customize labels and what stats to show
const props = defineProps({
  role: { type: String, required: true }, // e.g. 'HOU', 'HOD'
  labels: {
    type: Object,
    default: () => ({
      totalStaff: 'Total Unit Staff',
      activeAppraisal: 'Active Appraisal Cycle',
      inProgress: 'Appraisals in Progress',
      pending: 'Pending Appraisals',
      pendingRequests: 'Pending Requests',
      disciplinary: 'Disciplinary Actions'
    })
  }
});

// State
const totalStaff = ref(0);
const activeAppraisalCycle = ref(0);
const inProgressAppraisals = ref(0);
const pendingAppraisals = ref(0);
const pendingRequests = ref({ leaves: 0, promotions: 0 });
const disciplinaryActions = ref(0);

const fetchDashboardStats = async () => {
  try {
    const staff = await getStaffSummary();
    totalStaff.value = staff.active_staff || 0;
disciplinaryActions.value = staff.disciplinary_actions || 0;

    const appraisal = await getAppraisalStats();
    activeAppraisalCycle.value = appraisal.active_appraisal_cycle?.name || 0;
    inProgressAppraisals.value = appraisal.appraisal_in_progress || 0;
    pendingAppraisals.value = appraisal.pending_appraisal || 0;

    const leave = await getLeaveStats();
    const promotion = await getPromotionStats();
    pendingRequests.value = {
      leaves: leave.leave_stats.pending_leaves || 0,
      promotions: promotion.promotion_stats.pending_promotions || 0
    };
  } catch (err) {
    console.error('Dashboard stats fetch failed', err);
  }
};

onMounted(() => {
  fetchDashboardStats();
});
</script>

<template>
  <div class="bg-white p-4 rounded-2xl flex flex-col space-y-6">
    <div class="bg-orbit-bgSec text-white rounded-2xl px-4 py-3">
      <h4 class="text-orbit-accent">{{ labels.totalStaff }}</h4>
      <div class="flex items-center justify-between">
        <h3 class="text-[36px] font-bold">{{ totalStaff }}</h3>
        <!-- example stat change -->
        <p class="flex items-center space-x-2 text-[12px] text-orbit-cyan font-bold">
          <span>+12</span>
        </p>
      </div>
    </div>

    <div class="space-y-8">
      <div class="flex items-center justify-between text-gray-500">
        <div class="space-y-1">
          <p class="font-bold text-orbit-bg text-[16px]">{{ labels.activeAppraisal }}</p>
          <p class="text-sm">In Progress({{ inProgressAppraisals }}/{{ inProgressAppraisals + pendingAppraisals }} complete)</p>
        </div>
        <div>{{ activeAppraisalCycle }}</div>
      </div>

      <div class="flex items-center justify-between text-gray-500">
        <div class="space-y-1">
          <p class="font-bold text-orbit-bg text-[16px]">{{ labels.inProgress }}</p>
          <p class="text-sm">Ongoing appraisal sessions awaiting completion</p>
        </div>
        <div>{{ inProgressAppraisals }}</div>
      </div>

      <div class="flex items-center justify-between text-gray-500">
        <div class="space-y-1">
          <p class="font-bold text-orbit-bg text-[16px]">{{ labels.pending }}</p>
          <p class="text-sm">Staff yet to be appraised this cycle</p>
        </div>
        <div>{{ pendingAppraisals }}</div>
      </div>

      <div class="flex items-center justify-between text-gray-500">
        <div class="space-y-1">
          <p class="font-bold text-orbit-bg text-[16px]">{{ labels.pendingRequests }}</p>
          <p class="text-sm">{{ pendingRequests.leaves }} leave requests, {{ pendingRequests.promotions }} promotion requests</p>
        </div>
        <div>{{ pendingRequests.leaves + pendingRequests.promotions }}</div>
      </div>

      <div class="flex items-center justify-between text-gray-500">
        <div class="space-y-1">
          <p class="font-bold text-orbit-bg text-[16px]">{{ labels.disciplinary }}</p>
          <p class="text-sm">Logged conduct/discipline cases under the unit</p>
        </div>
        <div>{{ disciplinaryActions }}</div>
      </div>
    </div>
  </div>
</template>
