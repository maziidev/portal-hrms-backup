<template>
  <section class="px-2 lg:px-8 space-y-10 animate-in fade-in duration-700">
    <SessionSemesterCard class="no-print" />

    <div class="px-6 space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-orbit-bg rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
          <p class="text-[10px] font-black uppercase tracking-[0.3em] text-orbit-cyan/80">Pending Promotions</p>
          <h2 class="text-6xl font-black mt-2 tracking-tighter italic">
            {{ stats?.pending_promotions?.toString().padStart(2, '0') || '00' }}
          </h2>
          <p class="text-[10px] text-white/40 uppercase font-black mt-4 tracking-widest">Awaiting HOU Review</p>
        </div>

        <div v-for="stat in dynamicStats" :key="stat.label" class="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ stat.label }}</p>
            <span :class="stat.iconBg" class="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner">
              <component :is="stat.icon" :size="18" :class="stat.iconColor" />
            </span>
          </div>
          <div>
            <h3 class="text-5xl font-black text-orbit-bg tracking-tighter italic">{{ stat.value }}</h3>
            <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">{{ stat.subtext }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 no-print">
        <button @click="showSummaryDrawer = true" class="flex items-center justify-center gap-3 bg-orbit-blue text-white font-black text-xs uppercase tracking-widest rounded-2xl px-8 py-5 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
          <ClipboardList :size="18" /> Open Promotion Summary
        </button>

        <button @click="exportToPDF" class="flex items-center justify-center gap-3 bg-orbit-blue text-white font-black text-xs uppercase tracking-widest rounded-2xl px-8 py-5 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
          <Printer :size="18" /> Export Registry PDF
        </button>
      </div>

      <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-6 px-10 py-8 border-b border-slate-50 no-print">
          <h3 class="font-black text-orbit-bg text-base uppercase tracking-tighter italic">Promotion Request Registry</h3>
          <div class="flex items-center gap-4">
            <n-input v-model:value="filters.q" placeholder="SEARCH STAFF..." round size="large" class="registry-search" @update:value="handleSearch">
              <template #prefix><Search :size="16" class="text-slate-400" /></template>
            </n-input>
            <n-select v-model:value="filters.status" :options="statusOptions" placeholder="STATUS" clearable size="large" style="width: 180px" @update:value="handleSearch" />
          </div>
        </div>

        <div class="p-4">
          <n-data-table
            remote
            :loading="loading"
            :columns="tableColumns"
            :data="promotions"
            :pagination="pagination"
            :bordered="false"
            @update:page="handlePageChange"
            class="hou-active-table"
          />
        </div>
      </div>
    </div>

    <PromotionReviewModal :show="showReviewModal" :staff="selectedPromotion" @close="showReviewModal = false" @submitted="fetchDashboardData" />
    <PromotionSummaryDrawer :show="showSummaryDrawer" @close="showSummaryDrawer = false" />
  </section>
</template>

<script setup>
import { getPromotionList, getPromotionStats } from "@/apis/management/staff";
import 'jspdf-autotable';
import { CheckCircle2, ClipboardList, Printer, Search, TrendingUp, XCircle } from 'lucide-vue-next';
import { NDataTable, NInput, NSelect, useMessage } from 'naive-ui';
import { computed, h, onMounted, reactive, ref } from 'vue';

// --- IMPORT COMPONENTS HERE ---
import PromotionReviewModal from "@/components/HouComponents/PromotionReviewModal.vue";
import PromotionSummaryDrawer from "@/components/HouComponents/PromotionSummaryDrawer.vue";
import SessionSemesterCard from "@/components/SessionSemesterCard.vue";

const message = useMessage();
const loading = ref(true);
const stats = ref(null);
const promotions = ref([]);

// --- DEFINE STATE HERE ---
const showReviewModal = ref(false);
const showSummaryDrawer = ref(false); // Fixes "Property not defined" error
const selectedPromotion = ref(null);

const filters = reactive({ q: '', status: null, page: 1 });
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  prefix ({ itemCount }) { return `Total ${itemCount} Requests` }
});

const statusOptions = [
  { label: 'PENDING', value: 'PENDING' },
  { label: 'ENDORSED', value: 'ENDORSED' },
  { label: 'SENT TO DEAN', value: 'SENT_TO_DEAN' },
  { label: 'APPROVED', value: 'APPROVED' },
  { label: 'REJECTED', value: 'REJECTED' }
];

const dynamicStats = computed(() => [
  {
    label: 'Endorsed',
    value: stats.value?.approved_promotions?.toString().padStart(2, '0') || '00',
    subtext: 'Forwarded to Dean',
    icon: TrendingUp,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500'
  },
  {
    label: 'Rejected',
    value: stats.value?.rejected_promotions?.toString().padStart(2, '0') || '00',
    subtext: 'Ineligible Status',
    icon: XCircle,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500'
  },
  {
    label: 'Total Applied',
    value: stats.value?.total_staff_applied?.toString().padStart(2, '0') || '00',
    subtext: 'Unique Applications',
    icon: CheckCircle2,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500'
  },
]);

// ── Table Columns ──
const tableColumns = [
  {
    title: 'ID',
    key: 'id',
    render: (row) => h('span', { class: 'font-black text-orbit-blue uppercase' }, `ORBIT-0${row.staff?.id}`)
  },
  {
    title: 'STAFF NAME',
    key: 'name',
    render: (row) => h('span', { class: ' text-orbit-bg uppercase tracking-tighter' }, row.staff?.full_name)
  },
  { title: 'CURRENT GRADE', key: 'current_rank', render: (row) => h('span', {}, row.current_rank?.name || 'N/A') },

  { title: 'PROPOSED GRADE', key: 'proposed_rank', render: (row) => h('span', { class: '' }, row.proposed_rank?.name || 'N/A') },
  {
    title: 'DATE SUBMITTED',
    key: 'submitted_at',
    render: (row) => h('span', { class: 'text-orbit-blue font-bold text-sm' }, row.submitted_at ? new Date(row.submitted_at).toLocaleDateString() : 'N/A')
  },
  {
    title: 'STATUS',
    key: 'status',
    render: (row) => h('span', { class: 'px-3 py-1.5 rounded-lg  text-[10px] bg-slate-100 text-slate-700' }, row.status)
  },
  {
    title: 'ACTION',
    key: 'action',
    render: (row) => h('button', {
      onClick: () => {
        // Map data keys to what the Modal expects
        selectedPromotion.value = {
          promotionId: row.id,
          staffId: row.staff?.id,
          name: row.staff?.full_name,
          role: row.current_rank?.name,
          photo: row.staff?.picture,
          subunit: row.unit || 'General Department',
          appraisalRecords: row.appraisal_history || []
        };
        showReviewModal.value = true;
      },
      class: 'bg-orbit-blue text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase hover:opacity-80 transition-all'
    }, 'Review')
  }
];

// ── API Lifecycle ──
const fetchDashboardData = async () => {
  loading.value = true;
  try {
    const [sRes, lRes] = await Promise.all([
      getPromotionStats(),
      getPromotionList({ status: filters.status || undefined, q: filters.q || undefined, page: filters.page })
    ]);

    stats.value = sRes.data?.promotion_stats || {};
    promotions.value = lRes.data?.results || [];
    pagination.itemCount = lRes.data?.count || 0;
  } catch (err) {
    message.error("Sync failed.");
  } finally {
    loading.value = false;
  }
};

const handleReviewSubmit = async (data) => {
    // Logic to call backend review API using selectedPromotion.value.promotionId
    message.success("Decision recorded.");
    fetchDashboardData();
};

const handlePageChange = (p) => { filters.page = p; pagination.page = p; fetchDashboardData(); };
const handleSearch = () => { filters.page = 1; fetchDashboardData(); };

onMounted(fetchDashboardData);
</script>


<style scoped>
.registry-search { width: 300px; background: #f8fafc !important; }
:deep(.hou-active-table .n-data-table-thead th) { background-color: #f8fafc; font-size: 10px; font-weight: 900; color: #64748b; padding: 20px; text-transform: uppercase; }
:deep(.hou-active-table .n-data-table-td) { padding: 20px; border-bottom: 1px solid #f1f5f9; }
</style>