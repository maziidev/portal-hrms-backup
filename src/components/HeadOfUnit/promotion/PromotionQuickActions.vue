<template>
  <div class="p-6">
    <h3 class="text-orbit-bg font-medium text-[18px] mb-4">Quick Actions</h3>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- View Promotion Summary -->
      <button
        class="cursor-pointer flex items-center space-x-3 bg-orbit-blue text-orbit-light p-4 justify-center rounded-lg"
        @click="showSummaryModal = true"
      >
        <FileText class="w-6 h-6" />
        <span>View Promotion Summary</span>
      </button>

      <!-- Export Promotion Summary -->
      <button
        class="cursor-pointerflex items-center space-x-3 bg-orbit-blue text-orbit-light p-4 justify-center rounded-lg"
        @click="exportPromotionSummary"
      >
        <Upload class="w-6 h-6" />
        <span>Export Promotion Summary Report</span>
      </button>
    </div>

    <!-- Promotion Summary Modal -->
    <PromotionSummaryModal
      v-model:visible="showSummaryModal"
      @error="showToast($event)"
    />

    <!-- Toast -->
    <Toast v-if="toastMessage" :message="toastMessage" @close="toastMessage = ''" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPromotionStats } from '@/apis/services/hou/promotions.services.js';
import { FileText, Upload } from 'lucide-vue-next';
import PromotionSummaryModal from './PromotionSummaryModal.vue';
import Toast from '@/components/base/Toast.vue';

const showSummaryModal = ref(false);
const toastMessage = ref('');

// Export Promotion Summary as CSV
const exportPromotionSummary = async () => {
  try {
    const data = await getPromotionStats();

    const stats = {
      pending: data.pending_promotions || 0,
      endorsed: data.approved_promotions || 0,
      rejected: data.rejected_promotions || 0,
      completed: data.approved_promotions || 0,
    };

    const csvContent = `Category,Count
Pending,${stats.pending}
Endorsed,${stats.endorsed}
Rejected,${stats.rejected}
Completed,${stats.completed}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'promotion_summary.csv';
    link.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    showToast('Failed to export promotion summary');
  }
};

const showToast = (msg) => {
  toastMessage.value = msg;
};
</script>
