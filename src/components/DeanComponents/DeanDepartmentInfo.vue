<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between border-b border-gray-100 pb-4">
      <div class="flex items-center space-x-3">
        <div class="w-1.5 h-8 bg-orbit-bg rounded-full"></div>
        <h2 class="font-black text-2xl uppercase text-orbit-bg tracking-tighter">
          {{ department?.department_name || 'Department Details' }}
        </h2>
      </div>
      <div v-if="department" class="px-4 py-1.5 bg-blue-50 text-orbit-blue rounded-full text-[10px] font-black uppercase tracking-widest">
        Active View
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-3">

      <div class="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 text-6xl font-black text-gray-50 opacity-50 group-hover:opacity-100 transition-opacity">@</div>
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Head of Department</h3>

        <div class="space-y-5 relative z-10">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase">Name</p>
            <p class="text-lg font-bold text-orbit-bg">{{ department?.hod_name || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase">Contact Email</p>
            <p class="text-sm font-semibold text-orbit-bg truncate">{{ department?.hod_email || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase">Mobile</p>
            <p class="text-sm font-semibold text-orbit-bg">{{ department?.hod_phone || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 bg-orbit-bg p-6 rounded-2xl shadow-lg flex flex-col justify-between text-white">
        <h3 class="text-[10px] font-black text-blue-200 uppercase tracking-widest">Metrics Overview</h3>

        <div class="grid grid-cols-2 gap-y-6 gap-x-4 mt-4">
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ stats?.total_staff ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Total Staff</p>
          </div>
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ stats?.active_appraisals ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Appraisals</p>
          </div>
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ stats?.pending_promotions ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Promotions</p>
          </div>
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ stats?.pending_leaves ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Leave Req.</p>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
          <span class="text-[9px] font-bold uppercase text-blue-300">Completion Rate</span>
          <span class="text-xs font-black">{{ stats?.appraisal_completion_rate ?? 0 }}%</span>
        </div>
      </div>

      <div class="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Summary Narrative</h3>
        <div class="flex-1 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
          <p class="text-sm text-orbit-bg leading-relaxed font-medium italic italic-serif">
            "{{ departmentSummary }}"
          </p>
        </div>
        <button class="mt-4 w-full py-3 bg-gray-100 hover:bg-gray-200 text-orbit-bg text-[10px] font-black uppercase tracking-tighter rounded-lg transition-colors">
          Download Dept. Report
        </button>
      </div>

    </div>

    <div v-if="!department && !loading" class="bg-orange-50 border border-orange-100 p-6 rounded-2xl text-orange-800 text-center">
      <p class="font-bold uppercase text-xs tracking-widest">No Department Data Found</p>
    </div>
  </div>
</template>

<script setup>
import {
  getDepartmentAppraisals,
  getDepartmentInfo,
  getDepartmentLeaves,
  getDepartmentPromotions,
  getStaffStatsPerDepartment
} from '@/apis/management/dean.js'
import { useAuthStore } from '@/store/auth.js'
import { useMessage } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const message = useMessage()
const route = useRoute()

const department = ref(null)
const stats = ref(null)
const loading = ref(false)
const departmentId = computed(() => route.params.id)

const departmentSummary = computed(() => {
  if (!stats.value) return 'No data available for this department.'
  return `The ${department.value?.department_name || 'department'} consists of ${stats.value.academic_staff ?? 0} academic and ${stats.value.non_academic_staff ?? 0} non-academic personnel. Current management activity includes ${stats.value.active_appraisals ?? 0} active appraisals and ${stats.value.pending_promotions ?? 0} promotion workflows.`
})

const fetchDepartmentOverview = async () => {
  // Using the direct getter facultyId from authStore
  const fId = authStore.facultyId;
  const dId = departmentId.value;

  if (!fId || !dId) {
    message.warning('Missing Department or Faculty context');
    return
  }

  loading.value = true
  try {
    const { data: dept } = await getDepartmentInfo(dId)
    department.value = dept
  ? {
      ...dept,
      hod_name: dept.staff?.full_name ?? 'N/A',
      hod_email: dept.staff?.email ?? 'N/A',
      hod_phone: dept.staff?.phone ?? 'N/A'
    }
  : null

    if (!department.value) return

    const [staffRes, appraisalRes, promotionRes, leaveRes] = await Promise.all([
      getStaffStatsPerDepartment(dId),
      getDepartmentAppraisals(dId),
      getDepartmentPromotions(dId),
      getDepartmentLeaves(dId)
    ])

    stats.value = {
  total_staff: staffRes?.data?.total_staff ?? 0,
  academic_staff: staffRes?.data?.academic_staff ?? 0,
  non_academic_staff: staffRes?.data?.non_academic_staff ?? 0,
  active_appraisals: appraisalRes?.data?.length ?? 0,
  pending_promotions: promotionRes?.data?.length ?? 0,
  pending_leaves: leaveRes?.data?.length ?? 0,
  appraisal_completion_rate: staffRes?.data?.appraisal_completion_rate ?? 0
}
  } catch (error) {
    message.error('Failed to sync department data')
  } finally {
    loading.value = false
  }
}

onMounted(fetchDepartmentOverview)
</script>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }
.text-orbit-blue { color: #003366; }
</style>