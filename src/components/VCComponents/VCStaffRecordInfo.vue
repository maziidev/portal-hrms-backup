<template>
  <div class="px-2 space-y-6">
    <div class="flex items-center justify-between border-b border-gray-100 pb-4">
      <div class="flex items-center space-x-3">
        <div class="w-1.5 h-8 bg-[#002347] rounded-full"></div>
        <h2 class="font-black text-2xl uppercase text-[#002347] tracking-tighter">
          {{ department?.department_name || 'Department Details' }}
        </h2>
      </div>
      <div class="flex items-center space-x-3">
        <n-spin v-if="loading" size="small" />
        <div class="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          Executive View
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-3">

      <div class="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 text-6xl font-black text-gray-50 opacity-50 group-hover:opacity-100 transition-opacity">@</div>
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Head of Department</h3>

        <div class="space-y-5 relative z-10">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase">Name</p>
            <p class="text-lg font-bold text-[#002347]">{{ department?.hod_name || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase">Contact Email</p>
            <p class="text-sm font-semibold text-[#002347] truncate">{{ department?.hod_email || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase">Mobile</p>
            <p class="text-sm font-semibold text-[#002347]">{{ department?.hod_phone || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 bg-[#002347] p-6 rounded-2xl shadow-lg flex flex-col justify-between text-white">
        <h3 class="text-[10px] font-black text-blue-200 uppercase tracking-widest">VC Metrics Overview</h3>

        <div class="grid grid-cols-2 gap-y-6 gap-x-4 mt-4">
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ department?.total_staff ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Total Staff</p>
          </div>
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ department?.active_appraisals_count ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Appraisals</p>
          </div>
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ department?.pending_promotions_count ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Promotions</p>
          </div>
          <div class="border-l border-white/20 pl-3">
            <p class="text-[22px] font-black leading-none">{{ department?.pending_leaves_count ?? 0 }}</p>
            <p class="text-[9px] uppercase font-bold text-blue-200 mt-1">Leave Req.</p>
          </div>
        </div>

        <div class="mt-6">
          <div class="flex justify-between text-[9px] font-bold uppercase text-blue-300 mb-1.5">
            <span>Staff Distribution</span>
            <span>{{ department?.academic_staff_count || 0 }} ACAD / {{ department?.non_academic_staff_count || 0 }} NON-ACAD</span>
          </div>
          <div class="w-full h-1.5 bg-white/10 rounded-full flex overflow-hidden">
            <div
              :style="{ width: distributionPercentage + '%' }"
              class="h-full bg-blue-400 transition-all duration-1000"
            ></div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">VC Summary Narrative</h3>
        <div class="flex-1 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
          <p class="text-sm text-[#002347] leading-relaxed font-medium italic">
            "{{ departmentSummary }}"
          </p>
        </div>
        <button
          @click="downloadReport"
          :disabled="!department"
          class="mt-4 w-full py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-[#002347] text-[10px] font-black uppercase tracking-tighter rounded-lg transition-colors"
        >
          Generate Executive Report
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVCDepartmentRecords } from "@/apis/management/vc"
import { useAuthStore } from '@/store/auth.js'
import { NSpin, useMessage } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const message = useMessage()

const department = ref(null)
const loading = ref(false)
const departmentId = computed(() => route.params.id)

// Computed Narrative
const departmentSummary = computed(() => {
  if (!department.value) return 'Awaiting department data for executive summary...'
  const d = department.value
  return `The ${d.department_name} manages a workforce of ${d.total_staff || 0} individuals. Currently, staffing is comprised of ${d.academic_staff_count || 0} academic and ${d.non_academic_staff_count || 0} non-academic personnel. Oversight metrics show ${d.active_appraisals_count || 0} active appraisals and ${d.pending_promotions_count || 0} promotion workflows awaiting finality.`
})

// Calculate percentage for the distribution bar
const distributionPercentage = computed(() => {
  if (!department.value || !department.value.total_staff) return 0
  return (department.value.academic_staff_count / department.value.total_staff) * 100
})

const fetchVCData = async () => {
  const fId = authStore.facultyId
  const dId = departmentId.value

  if (!fId || !dId) {
    message.warning('No Department Records')
    return
  }

  loading.value = true
  try {
    const res = await getVCDepartmentRecords(fId)
    const allDepts = res.data || []

    // Find the specific department from the list
    const found = allDepts.find(dept => String(dept.id) === String(dId))

    if (found) {
      department.value = {
    id: found.id,
    department_name: found.name,
    hod_name: found.dept_hod,
    total_staff: found.staff_count,
    active_appraisals_count: found.active_appraisals,
    pending_promotions_count: found.pending_promotions,
    academic_staff_count: found.academic_staff_count || 0,     // placeholder
    non_academic_staff_count: found.non_academic_staff_count || 0
  }
    } else {
      message.info('Department record not found in faculty list.')
    }
  } catch (err) {
    console.error(err)
    message.error('HRMS API communication error.')
  } finally {
    loading.value = false
  }
}

const downloadReport = () => {
  if (!department.value) return
  message.info(`Preparing PDF for ${department.value.department_name}`)
}

onMounted(fetchVCData)
</script>