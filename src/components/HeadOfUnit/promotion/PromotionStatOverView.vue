<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Pending Promotions -->
      <div class="bg-orbit-bg px-6 py-8 flex items-center justify-between rounded-2xl text-white">
        <div class="flex flex-col space-y-1">
          <p class="text-sm">Pending Promotions</p>
          <p class="text-xl font-bold">{{ stats.pending }}</p>
        </div>
        <Clock class="w-6 h-6" />
      </div>

      <!-- Endorsed Promotions -->
      <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl shadow">
        <div class="flex flex-col space-y-1">
          <p class="text-sm text-gray-500">Endorsed Promotions</p>
          <p class="text-xl font-bold text-orbit-bg">{{ stats.endorsed }}</p>
        </div>
        <Check class="w-6 h-6 text-orbit-bg" />
      </div>

      <!-- Rejected Requests -->
      <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl shadow">
        <div class="flex flex-col space-y-1">
          <p class="text-sm text-gray-500">Rejected Requests</p>
          <p class="text-xl font-bold text-orbit-bg">{{ stats.rejected }}</p>
        </div>
        <X class="w-6 h-6 text-orbit-bg" />
      </div>

      <!-- Promotions Completed -->
      <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl shadow">
        <div class="flex flex-col space-y-1">
          <p class="text-sm text-gray-500">Promotions Completed</p>
          <p class="text-xl font-bold text-orbit-bg">{{ stats.completed }}</p>
        </div>
        <CheckCircle class="w-6 h-6 text-orbit-bg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPromotionStats } from '@/apis/services/hou/promotions.services.js';
import { Check, CheckCircle, Clock, X } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const stats = ref({
  pending: 0,
  endorsed: 0,
  rejected: 0,
  completed: 0
});

const fetchStats = async () => {
  try {
    const data = await getPromotionStats();
    stats.value = {
        pending: data.pending_promotions || 0,
        endorsed: data.approved_promotions || 0,
        rejected: data.rejected_promotions || 0,
        completed: data.completed_promotions || 0
};
  } catch (err) {
    console.error('Error fetching promotion stats:', err);
    stats.value = { pending: 0, endorsed: 0, rejected: 0, completed: 0 };
  }
};

onMounted(fetchStats);
</script>

<style scoped>
/* optional: add hover or shadow effects if desired */
</style>

