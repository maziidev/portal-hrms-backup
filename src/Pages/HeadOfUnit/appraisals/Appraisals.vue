<template>
  <div class="px-6 lg:px-10 py-6 space-y-8 bg-slate-50 min-h-screen">

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <n-card embedded :bordered="false" class="rounded-xl shadow-sm bg-white border border-slate-100">
        <n-statistic label="Cycle Completion">
          <template #prefix><CheckCircle2 :size="20" class="text-emerald-500 mr-2" /></template>
          <span class="font-bold text-2xl text-slate-900">{{ completionRate }}%</span>
        </n-statistic>
      </n-card>

      <n-card embedded :bordered="false" class="rounded-xl shadow-sm bg-white border border-slate-100">
        <n-statistic label="Total Staff">
          <template #prefix><Users :size="20" class="text-blue-500 mr-2" /></template>
          <span class="font-bold text-2xl text-slate-900">{{ staffList.length }}</span>
        </n-statistic>
      </n-card>

      <n-card embedded :bordered="false" class="rounded-xl shadow-sm bg-white border border-slate-100">
        <n-statistic label="Awaiting HOU Review">
          <template #prefix><Clock :size="20" class="text-amber-500 mr-2" /></template>
          <span class="font-bold text-2xl text-slate-900">{{ pendingCount }}</span>
        </n-statistic>
      </n-card>
    </div>

    <div class="space-y-4">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">

        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-900">Staff Appraisal Management</h2>
          <p class="text-slate-400 text-sm font-medium">Active Academic Session</p>
        </div>

        <div class="flex flex-col lg:flex-row items-center gap-4 mb-8">
          <div class="w-full lg:w-1/3">
            <label class="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-wider">Search Staff</label>
            <n-input v-model:value="searchQuery" placeholder="Name or ID..." clearable class="w-full" />
          </div>

          <div class="w-full lg:w-1/4">
            <label class="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-wider">Department</label>
            <n-select v-model:value="selectedDept" placeholder="All Departments" :options="dynamicDeptOptions" clearable />
          </div>

          <div class="w-full lg:flex-1">
            <label class="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-wider">Update Period</label>
            <n-date-picker v-model:value="dateRange" type="daterange" clearable class="w-full" />
          </div>
        </div>

        <n-data-table
          :loading="loading"
          :columns="activeColumns"
          :data="filteredActive"
          :bordered="false"
          :pagination="pagination"
          class="staff-appraisal-table"
        />
      </div>
    </div>

    <ContinueDraftModal :show="showDraftModal" :staff="selectedStaff" @close="showDraftModal = false" @continue="handleContinueFromDraft" />
    <AppraisalFormModal :show="showModal" :staff="selectedStaff" @close="showModal = false" @submit="fetchData" />
  </div>
</template>

<script setup>
import { CheckCircle2, Clock, Users } from 'lucide-vue-next';
import { NButton, NCard, NDataTable, NDatePicker, NInput, NSelect, NStatistic, NTag, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';

import {
  getAllStaff,
  getAppraisalOverviewStats,
  reviewAppraisal
} from "@/apis/management/staff";

import AppraisalFormModal from '@/components/HouComponents/AppraisalFormModal.vue';
import ContinueDraftModal from '@/components/HouComponents/ContinueDraftModal.vue';

const message = useMessage();
const loading = ref(false);
const searchQuery = ref('');
const selectedDept = ref(null);
const dateRange = ref(null);
const showModal = ref(false);
const showDraftModal = ref(false);
const selectedStaff = ref({});
const staffList = ref([]);
const completionRate = ref(0);
const pendingCount = ref(0);

// ORBIT BLUE BRANDING CONSTANT
const ORBIT_BLUE = '#2388ff';

const fetchData = async () => {
  loading.value = true;
  try {
    const [staffRes, statRes] = await Promise.all([
      getAllStaff().catch(() => ({ data: [] })),
      getAppraisalOverviewStats().catch(() => ({ data: { completion_percentage: 0, pending_count: 0 } }))
    ]);
    staffList.value = staffRes.data?.data || staffRes.data || [];
    completionRate.value = statRes.data?.completion_percentage || 0;
    pendingCount.value = statRes.data?.pending_count || 0;
  } catch (err) {
    message.error("Data sync failed.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const dynamicDeptOptions = computed(() => {
  const depts = staffList.value
    .map(s => s.dept_code)
    .filter((v, i, a) => v && a.indexOf(v) === i);
  return depts.map(d => ({ label: d, value: d }));
});

const filteredActive = computed(() => {
  let data = Array.isArray(staffList.value) ? staffList.value : [];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    data = data.filter(s =>
      String(s.full_name || '').toLowerCase().includes(q) ||
      String(s.id || s.staff_id || '').toLowerCase().includes(q)
    );
  }
  if (selectedDept.value) data = data.filter(s => s.dept_code === selectedDept.value);
  if (dateRange.value) {
    const [start, end] = dateRange.value;
    data = data.filter(s => {
      const updateDate = new Date(s.updated_at).getTime();
      return updateDate >= start && updateDate <= end;
    });
  }
  return data;
});

const activeColumns = [
  {
    title: 'Staff ID',
    key: 'id',
    render: (row) => h('span', { class: 'text-orbit-blue font-bold' }, `ORBIT-${row.id || '---'}`)
  },
  {
    title: 'Staff Name',
    key: 'full_name',
    render: (row) => h('span', { class: 'font-bold text-slate-800' }, row.full_name)
  },
  { title: 'Position', key: 'rank' },
  {
    title: 'Appraisal Period',
    key: 'period',
    render: (row) => h('span', { class: 'text-slate-500' }, row.appraisal_period || '2025/2026')
  },
  {
    title: 'Last Updated',
    key: 'updated_at',
    render: (row) => h('div', { class: 'text-[11px]' }, [
      h('div', { class: 'font-bold' }, row.last_update_date || '---'),
      h('div', { class: 'text-slate-400 font-medium' }, row.last_update_time || '')
    ])
  },
  { title: 'Progress', key: 'progress', render: (row) => h('span', { class: 'font-bold' }, `${row.progress || 0}%`) },
  {
    title: 'Status',
    key: 'status',
    render(row) {
      const status = row.appraisal_status || 'Not Started';
      const type = status === 'Submitted' ? 'success' : status === 'In Review' ? 'info' : 'warning';
      return h(NTag, { type, size: 'small', bordered: false, class: 'rounded-md px-2' }, { default: () => status });
    }
  },
  {
    title: 'Action',
    key: 'actions',
    align: 'right',
    render(row) {
      const status = row.appraisal_status;
      let label = 'Start';
      if (status === 'In Review') label = 'Continue';
      else if (status === 'Submitted') label = 'Send to Dean';

      return h(NButton, {
        size: 'small',
        themeOverrides: {
          color: ORBIT_BLUE,
          colorHover: '#0043a8',
          textColor: '#fff',
          textColorHover: '#fff',
          borderRadiusSmall: '6px',
          padding: '10px'
        },
        // px-6 for extra breathing space
        class: 'px-6 font-bold shadow-sm',
        onClick: () => handleActionClick(row)
      }, { default: () => label });
    }
  }
];

const handleActionClick = (row) => {
  selectedStaff.value = { ...row };
  if (row.appraisal_status === 'In Review') showDraftModal.value = true;
  else if (row.appraisal_status === 'Submitted') handleForwardToDean(row);
  else showModal.value = true;
};

const handleForwardToDean = async (staff) => {
  const m = message.loading("Routing...");
  try {
    await reviewAppraisal(staff.appraisal_id, { decision: 'APPROVED', comment: 'Forwarded by HOU' });
    message.success("Forwarded to Dean.");
    fetchData();
  } catch (err) {
    message.error("Routing failed.");
  } finally { m.destroy(); }
};

const handleContinueFromDraft = () => { showDraftModal.value = false; showModal.value = true; };
const pagination = { pageSize: 10 };
</script>

<style scoped>
@reference "@/style.css";

:deep(.staff-appraisal-table .n-data-table-th) {
  @apply bg-slate-50 text-[10px] uppercase tracking-[0.1em] text-slate-400 py-5 font-black border-b border-slate-100;
}
:deep(.staff-appraisal-table .n-data-table-td) {
  @apply py-5 border-b border-slate-50 text-sm;
}
</style>