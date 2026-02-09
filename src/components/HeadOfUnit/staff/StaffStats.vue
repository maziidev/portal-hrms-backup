
<template>
    <section class="p-2 space-y-">
        <div v-if="loading" class="text-center py-10" >Loading Staff Summarry...</div>
        <div v-else-if="error" class="text-red-500 text-cente py-10">{{ error }}</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div class="bg-orbit-bg px-6 py-8 flex items-center justify-between rounded-2xl text-white">
        <p class="text-sm text-white">Active Staff</p>
        <p class="text-xl font-bold">{{ stats.active || 0 }}</p>
      </div>

      <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl">
        <p class="text-sm text-gray-500">On Probation</p>
        <p class="text-xl font-bold text-orbit-bg">{{ stats.probation || 0 }}</p>
      </div>

      <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl">
        <p class="text-sm text-gray-500">On Study Leave</p>
        <p class="text-xl font-bold text-orbit-bg">{{ stats.studyLeave || 0 }}</p>
      </div>

      <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl">
        <p class="text-sm text-gray-500">Retired</p>
        <p class="text-xl font-bold text-orbit-bg">{{ stats.retired || 0 }}</p>
      </div>
        </div>

    </section>
</template>

<script setup>

import { getStaffSummary } from '@/apis/services/hou/staff.services.js';
import { onMounted, ref } from 'vue';

// reactive state to hold staff summary data
const stats = ref({
    active: 0,
    probation: 0,
    studyLeave: 0,
    retired: 0,
})

const loading = ref(true)
const error = ref(null)

// fetch the staff stat when from our api in staff service
const fetchStaffSummary = async () => {
    loading.value = true;
    error.value = null;
    try {
        stats.value = await getStaffSummary();
    } catch (err) {
        error.value = "Failed to load staff statistices";
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchStaffSummary();
})

</script>