<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-orbit-bg font-bold text-[18px]">Archived / Past Appraisals</h2>
      <div class="space-x-2">
        <button @click="prevPage" :disabled="page === 1" class="bg-gray-200 rounded-md px-2 py-2">
          <ChevronLeft />

        </button>
        <button @click="nextPage" :disabled="page === totalPages" class="bg-orbit-blue text-white rounded-md px-2 py-2">
            <ChevronRight />

        </button>
      </div>
    </div>

    <div class="w-full overflow-x-auto">
      <table class="min-w-full border-collapse  bg-white rounded-xl shadow p-3">
        <thead class="text-black uppercase font-semibold bg-gray-200">
          <tr>
            <th class="py-4 px-6 text-center">Year</th>
            <th class="py-4 px-6 text-center">Staff Appraised</th>
            <th class="py-4 px-6 text-center">Avg. Score</th>
            <th class="py-4 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="space-y-8 text-sm">
          <tr v-for="period in pageItems" :key="period.year"
              class="bg-white shadow-sm hover:shadow-md transition cursor-pointer rounded-2xl">
            <td class="px-8 py-4 text-center">{{ period.year }}</td>
            <td class="px-8 py-4 text-center">{{ period.staff_count }}</td>
            <td class="px-8 py-4 text-center">{{ period.avg_score }}%</td>
            <td class="px-8 py-4 text-center">
              <div class="flex items-center justify-center space-x-2 bg-orbit-blue text-white p-2 rounded-md cursor-pointer">
                 <Download />

                <span>Download</span>
              </div>
            </td>
          </tr>
          <tr v-if="!pastAppraisals.length">
            <td colspan="4" class="text-center p-8 text-gray-400">No past appraisals found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getPastAppraisalPeriods } from '@/apis/services/hou/appraisal.services.js';
import { ChevronLeft,Download,ChevronRight  } from 'lucide-vue-next';



const PAGE_SIZE = 3;
const pastAppraisals = ref([]);
const page = ref(1);

const totalPages = computed(() => Math.ceil(pastAppraisals.value.length / PAGE_SIZE));
const pageItems = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE;
  return pastAppraisals.value.slice(start, start + PAGE_SIZE);
});

const nextPage = () => { if(page.value < totalPages.value) page.value++; }
const prevPage = () => { if(page.value > 1) page.value--; }

const loadAppraisals = async () => {
  try {
    const data = await getPastAppraisalPeriods();
    pastAppraisals.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(err);
  }
};

onMounted(loadAppraisals);
</script>
