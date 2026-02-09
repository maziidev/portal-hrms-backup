<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-orbit-bg font-bold text-[18px]">Complete Appraisals</h2>
      <div class="space-x-2">
        <button @click="prevPage" :disabled="page === 1" class="bg-gray-200 rounded-md px-2 py-2">
            <ChevronLeft />

        </button>
        <button @click="nextPage" :disabled="page === totalPages" class="bg-orbit-blue text-white rounded-md px-2 py-2">
          <ChevronRight/>
        </button>
      </div>
    </div>

    <div class="w-full overflow-x-auto">
      <table class="min-w-full border-collapse bg-white rounded-xl shadow p-3">
        <thead class="text-black uppercase font-semibold bg-gray-200">
          <tr>
            <th class="py-4 px-6 text-center">Staff Name</th>
            <th class="py-4 px-6 text-center">Cadre</th>
            <th class="py-4 px-6 text-center">Overall Rating</th>
            <th class="py-4 px-6 text-center">Date Completed</th>
          </tr>
        </thead>
        <tbody class="space-y-8 text-sm ">
          <tr v-for="appraisal in pageItems" :key="appraisal.id"
              class="bg-white shadow-sm hover:shadow-md transition cursor-pointer rounded-2xl">
            <td class="p-8 text-center">{{ appraisal.staff_name }}</td>
            <td class="p-8 text-center">{{ appraisal.cadre }}</td>
            <td class="p-8 text-center">{{ appraisal.overall_rating }}</td>
            <td class="p-8 text-center">
              <div class="flex items-center justify-center space-x-2">
                <img src="../../assets/img/calendar.png" alt="calendar" class="w-5 h-5" />
                <span>{{ appraisal.date_completed }}</span>
              </div>
            </td>
          </tr>
          <tr v-if="!activeAppraisals.length">
            <td colspan="4" class="text-center p-8 text-gray-400">No active appraisals found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getActiveAppraisalPeriod } from '@/apis/services/hou/appraisal.services.js';
import { ChevronLeft,ChevronRight  } from 'lucide-vue-next';

const PAGE_SIZE = 3;
const activeAppraisals = ref([]);
const page = ref(1);

const totalPages = computed(() => Math.ceil(activeAppraisals.value.length / PAGE_SIZE));
const pageItems = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE;
  return activeAppraisals.value.slice(start, start + PAGE_SIZE);
});

const nextPage = () => { if(page.value < totalPages.value) page.value++; }
const prevPage = () => { if(page.value > 1) page.value--; }

const loadAppraisals = async () => {
  try {
    const data = await getActiveAppraisalPeriod();
    activeAppraisals.value = Array.isArray(data?.staff_appraisals) ? data.staff_appraisals : [];
  } catch (err) {
    console.error(err);
  }
};

onMounted(loadAppraisals);
</script>
