<template>
  <div class="mt-6 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h4 class="text-2xl font-semibold text-gray-800 whitespace-nowrap">Promotion Overview</h4>
    </div>

    <!-- Filters -->
    <div class="flex flex-col lg:flex-row lg:items-center gap-3">
      <n-input
        v-model:value="searchQuery"
        placeholder="Search by name or rank"
        clearable
        size="medium"
        class="w-96 rounded-lg"
      />

      <n-select
        v-model:value="selectedCadre"
        :options="cadreOptions"
        placeholder="Filter by Cadre"
        clearable
        class="w-96 rounded-lg"
      />

      <n-select
        v-model:value="selectedStatus"
        :options="statusOptions"
        placeholder="Filter by Status"
        clearable
        class="w-96 rounded-lg"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-inner p-4">
      <div class="min-w-300">
        <n-data-table
          :columns="columns"
          :data="filteredPromotions"
          :row-key="rowKey"
          striped
          size="medium"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { getDepartmentPromotions } from '@/apis/management/dean.js';
import { useAuthStore } from '@/store/auth';
import dayjs from 'dayjs';
import { NButton, useMessage } from 'naive-ui';
import { computed, h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// Route & Auth
const route = useRoute();
const authStore = useAuthStore();
const departmentId = route.params.departmentId || authStore.departmentId;

// Filters
const searchQuery = ref('');
const selectedCadre = ref(null);
const selectedStatus = ref(null);

// Data
const promotionsData = ref([]);

// Message
const message = useMessage();

// Filter options
const cadreOptions = [
  { label: 'Lecturer I', value: 'Lecturer I' },
  { label: 'Lecturer II', value: 'Lecturer II' },
];

const statusOptions = [
  { label: 'Submitted', value: 'Submitted' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Awaiting Dean', value: 'Awaiting Dean' },
];

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Current Rank', key: 'currentRank' },
  { title: 'Proposed Rank', key: 'proposedRank' },
  { title: 'Date Submitted', key: 'dateSubmitted' },
  { title: 'Status', key: 'status' },
  {
    title: 'Action',
    key: 'action',
    render: (row) => {
      const isAwaiting = row.status === 'Awaiting Dean'
      const buttonText = isAwaiting ? 'Review' : 'View'

      return h(
        NButton,
        {
          size: 'small',
          type: isAwaiting ? 'primary' : 'default',
          onClick: (e) => {
            e.stopPropagation()
            console.log('Clicked:', row)
          }
        },
        { default: () => buttonText }
      )
    }
  }
]


// Row key
const rowKey = (row) => row.id;

// Fetch promotions
const fetchPromotions = async () => {
  if (!departmentId) {
    message.error('Department ID is missing.');
    return;
  }
  try {
    const response = await getDepartmentPromotions(departmentId);
    promotionsData.value = response.data.map((p, index) => ({
      id: index,
      name: p.name,
      currentRank: p.currentRank,
      proposedRank: p.proposedRank,
      dateSubmitted: dayjs(p.dateSubmitted).format('DD MMM YYYY'),
      status: p.status,
    }));
  } catch {
    message.error('Failed to load promotions.');
  }
};

// Filtered data
const filteredPromotions = computed(() => {
  return promotionsData.value.filter((p) => {
    const matchesSearch =
      !searchQuery.value ||
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.currentRank.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.proposedRank.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCadre = !selectedCadre.value || p.currentRank === selectedCadre.value;
    const matchesStatus = !selectedStatus.value || p.status === selectedStatus.value;

    return matchesSearch && matchesCadre && matchesStatus;
  });
});

onMounted(fetchPromotions);
</script>


