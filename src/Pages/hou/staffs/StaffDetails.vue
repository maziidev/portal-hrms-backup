<template>
  <div class="p-6">

    <!-- Back & Staff Code -->
    <div class="flex items-center justify-between mb-6">
      <RouterLink :to="{ name: 'HouStaffs' }" class="flex items-center space-x-1 text-orbit-bg hover:text-gray-700 transition text-2xl">
        <ChevronsLeft />

        <span class="font-medium">Back</span>
      </RouterLink>
      <h1 class="text-xl md:text-2xl font-bold text-orbit-blue">{{ `ORBIT00${staff?.id || '...'}` }}</h1>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">

      <!-- Profile Image -->
      <div class="w-full h-64 overflow-hidden p-8 ">
        <img :src="staff?.profile_picture || '../../../assets/imgs/profile.jpg'" alt="Profile" class="w-64 h-64 object-cover rounded-full border shadow-2xl" />
      </div>

      <!-- Personal & Professional Info -->
      <div class="p-8">

        <!-- Personal Info -->
        <div class="space-y-4 mb-6 border-b border-gray-200 pb-4">
          <h2 class="text-xl font-bold text-orbit-bg">Personal Information</h2>
          <div class="space-y-4">
            <div v-for="(value, key) in personalInfo" :key="key" class="flex justify-between">
              <span class="text-orbit-wa font-medium">{{ key }}</span>
              <span class="text-orbit-bg font-medium">{{ value }}</span>
            </div>
          </div>
        </div>

        <!-- Professional Info -->
        <div class="space-y-4 border-b border-gray-200 pb-4">
          <h2 class="text-xl font-bold text-orbit-bg">Professional Information</h2>
          <div class="space-y-4">
            <div v-for="(value, key) in professionalInfo" :key="key" class="flex justify-between">
              <span class="text-orbit-wa font-medium">{{ key }}</span>
              <span class="text-orbit-bg font-medium">{{ value }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Performance, Promotions, Leaves -->
      <div class="p-8 space-y-4 mb-6 border-b border-gray-200 pb-4">
        <h2 class="text-xl font-bold text-orbit-bg mb-4">Performance, Career & Leave</h2>
        <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-5">

          <!-- Performance -->
          <div class="bg-white border border-orbit-accent/20 rounded-lg p-4 space-y-4 shadow-sm">
            <h3 class="font-bold text-lg text-orbit-bg">Performance Record</h3>
            <div class="flex justify-between font-semibold text-gray-700">
              <span>Appraisal Year</span>
              <span>Remark</span>
              <span>Score</span>
            </div>
            <div class="space-y-2">
              <div v-if="performanceRecords.length" v-for="record in performanceRecords" :key="record.year" class="flex justify-between">
                <span>{{ record.year || 'N/A' }}</span>
                <span>{{ record.remark || 'N/A' }}</span>
                <span>{{ record.score || 'N/A' }}</span>
              </div>
              <div v-else class="flex justify-between text-gray-400">
                <span>N/A</span>
                <span>N/A</span>
                <span>N/A</span>
              </div>
            </div>
          </div>

          <!-- Promotions -->
          <div class="bg-white border border-orbit-accent/20 rounded-lg p-4 space-y-4 shadow-sm">
            <h3 class="font-bold text-lg text-orbit-bg">Promotion & Career Progression</h3>
            <div class="flex justify-between font-semibold text-gray-700">
              <span>Stage/Year</span>
              <span>Status</span>
            </div>
            <div class="space-y-2">
              <div v-if="promotions.length" v-for="promotion in promotions" :key="promotion.stage" class="flex justify-between">
                <span>{{ promotion.stage || 'N/A' }} - {{ promotion.date || 'N/A' }}</span>
                <span>{{ promotion.status || 'N/A' }}</span>
              </div>
              <div v-else class="flex justify-between text-gray-400">
                <span>N/A</span>
                <span>N/A</span>
              </div>
            </div>
          </div>

          <!-- Leaves -->
          <div class="bg-white border border-orbit-accent/20 rounded-lg p-4 space-y-4 shadow-sm">
            <h3 class="font-bold text-lg text-orbit-bg">Leave Record</h3>
            <div class="flex justify-between font-semibold text-gray-700">
              <span>Year</span>
              <span>Type</span>
              <span>Status</span>
            </div>
            <div class="space-y-2">
              <div v-if="leaves.length" v-for="leave in leaves" :key="leave.date" class="flex justify-between">
                <span>{{ leave.date || 'N/A' }}</span>
                <span>{{ leave.type || 'N/A' }}</span>
                <span :class="leave.statusColor || 'text-orbit-wa'">{{ leave.status || 'N/A' }}</span>
              </div>
              <div v-else class="flex justify-between text-gray-400">
                <span>N/A</span>
                <span>N/A</span>
                <span>N/A</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Retirement & Exit -->
      <div class="p-8 border-b border-gray-100 space-y-3">
        <h2 class="text-xl font-bold text-orbit-bg">Retirement & Exit</h2>
        <div class="flex justify-between">
          <span class="text-orbit-wa font-medium">Expected Retirement Date</span>
          <span class="text-orbit-bg font-medium">{{ staff?.expected_retirement || 'N/A' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-orbit-wa font-medium">Clearance Status</span>
          <span class="text-orbit-bg font-medium">{{ staff?.clearance_status || 'N/A' }}</span>
        </div>
      </div>

      <!-- Files / Documents -->
      <div class="p-8 space-y-3">
        <h2 class="text-xl font-bold text-orbit-bg">Files / Documents</h2>
        <div class="space-y-2">
          <div v-for="doc in documentsDefault" :key="doc" class="flex justify-between items-center">
            <span class="text-orbit-wa font-medium">{{ doc }}</span>
            <button class="flex items-center space-x-2 bg-orbit-blue px-4 py-2 rounded text-white hover:bg-orbit-blue/80 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                   stroke-linejoin="round" class="lucide lucide-download-icon">
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
              <span>View</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { getStaffDetails } from '@/apis/services/hou/staff.services.js';
import { ChevronsLeft } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';


const route = useRoute();
const staff = ref(null);
const error = ref(null);

const performanceRecords = ref([]);
const promotions = ref([]);
const leaves = ref([]);
const documentsDefault = ['Appointment Letters', 'Appraisal Reports', 'Master’s Certificate', 'PHD Certificate', 'Thesis Documents'];

const personalInfo = computed(() => ({
  Name: staff.value?.full_name || staff.value?.staff_name || 'N/A',
  Gender: staff.value?.gender || 'N/A',
  'Date Of Birth': staff.value?.dob || 'N/A',
  Email: staff.value?.email || 'N/A',
  Phone: staff.value?.phone || 'N/A',
  'Marital Status': staff.value?.marital_status || 'N/A',
}));

const professionalInfo = computed(() => ({
  'Rank / Cadre': staff.value?.cadre || 'N/A',
  Designation: staff.value?.position || 'N/A',
  Department: staff.value?.subunit || 'N/A',
  Faculty: staff.value?.faculty || 'N/A',
  'Date Of First Appointment': staff.value?.date_of_first_appointment || 'N/A',
  'Date Of Last Promotion': staff.value?.last_promotion || 'N/A',
  'Appointment Type': staff.value?.employment_status || 'N/A',
  Qualification: staff.value?.qualification || 'N/A',
  'Area Of Specialization': staff.value?.specialization || 'N/A',
}));

const loadStaff = async (id) => {
  try {
    const data = await getStaffDetails(id);
    staff.value = data || null;
    performanceRecords.value = staff.value?.performanceRecords || [];
    promotions.value = staff.value?.promotions || [];
    leaves.value = (staff.value?.leaves || []).map(l => ({
      ...l,
      statusColor:
        l.status === 'Approved' ? 'text-orbit-green' :
        l.status === 'Rejected' ? 'text-orbit-red' : 'text-orbit-wa'
    }));
    error.value = null;
  } catch (err) {
    console.error(err);
    staff.value = null;
    performanceRecords.value = [];
    promotions.value = [];
    leaves.value = [];
    error.value = 'Failed to load staff data.';
  }
};

watch(() => route.params.id, id => {
  if (!id) return;
  loadStaff(Number(id));
}, { immediate: true });
</script>
