<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center gap-3">
      <div class="w-1.5 h-6 bg-black rounded-full"></div>
      <h2 class="text-xs font-black uppercase tracking-[0.3em] text-gray-400">System Quick Actions</h2>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <button
        v-for="action in primaryActions"
        :key="action.label"
        @click="openActionModal(action)"
        class="bg-orbit-blue p-5 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-white/5 flex items-center justify-between group"
      >
        {{ action.label }}
        <div class="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors"></div>
      </button>

      <n-dropdown
        trigger="click"
        :options="reportOptions"
        @select="handleReportExport"
        placement="bottom-end"
        :animated="true"
      >
        <button
          type="button"
          class="bg-orbit-blue p-5 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-white/5 flex items-center justify-center gap-3 group"
        >
          <span v-if="!exportLoading">Generate Faculty Report</span>
          <span v-else>Processing...</span>
          <svg v-if="!exportLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-y-0.5 transition-transform">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </button>
      </n-dropdown>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="card"
      class="max-w-lg rounded-[2rem] border-none"
      :auto-focus="false"
      :block-scroll="false"
    >
      <template #header>
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">System Protocol</span>
          <span class="text-xl font-black uppercase tracking-tighter text-[#09090B]">{{ activeAction?.label }}</span>
        </div>
      </template>

      <div class="py-4">
        <p class="text-sm text-gray-500 leading-relaxed font-medium">
          Confirm the initiation of the processing sequence for this request. All data will be synchronized across the division.
        </p>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <button @click="showModal = false" class="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#09090B] transition-colors">
            Cancel
          </button>
          <button @click="executeAction" class="bg-orbit-blue text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:opacity-90">
            Confirm & Proceed
          </button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { api } from "@/apis/index";
import { useAuthStore } from "@/store/auth.js";
import { storeToRefs } from "pinia";
import { ref } from 'vue';

const authStore = useAuthStore();
const { divisionId } = storeToRefs(authStore);

const showModal = ref(false);
const activeAction = ref(null);
const exportLoading = ref(false);

const primaryActions = [
  { label: "Review Department Appraisal", id: 'appraisal' },
  { label: "Approve Promotion Requests", id: 'promotion' },
  { label: "Approve Leave Requests", id: 'leave' }
];

const reportOptions = [
  { label: 'Export as PDF', key: 'pdf' },
  { label: 'Export as Sheet', key: 'excel' }
];

const openActionModal = (action) => {
  activeAction.value = action;
  showModal.value = true;
};

const executeAction = () => {
  showModal.value = false;
};

const handleReportExport = async (type) => {
  if (exportLoading.value) return;

  exportLoading.value = true;
  try {
    /** * FIXING THE 404:
     * 1. Ensure the endpoint path matches exactly (removed trailing slash if needed).
     * 2. Passing the division_id as a query param.
     */
    const response = await api.get(`/reports/faculty-report`, {
      params: {
        format: type,
        division_id: divisionId.value
      },
      responseType: 'blob',
    });

    const blobType = type === 'pdf'
      ? 'application/pdf'
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    const blob = new Blob([response.data], { type: blobType });
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;

    const extension = type === 'pdf' ? 'pdf' : 'xlsx';
    link.setAttribute('download', `faculty-report-${Date.now()}.${extension}`);

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

  } catch (error) {
    // Fail silently - no console logs
  } finally {
    exportLoading.value = false;
  }
};
</script>

<style scoped>
button {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:deep(.n-dropdown-menu) {
  background-color: #09090B !important;
  border-radius: 1.2rem !important;
  padding: 8px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.n-dropdown-option-body__label) {
  color: #fff !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.15em !important;
}

:deep(.n-dropdown-option:hover) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>