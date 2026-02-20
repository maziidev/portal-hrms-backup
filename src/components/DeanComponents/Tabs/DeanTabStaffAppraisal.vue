<template>
  <div class="mt-6 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h4 class="text-2xl font-semibold text-gray-800 whitespace-nowrap">Appraisals</h4>
    </div>

    <!-- Filters -->
    <div class="flex flex-col lg:flex-row lg:items-center gap-3">
      <n-input
        v-model:value="searchQuery"
        placeholder="Search by name or period"
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

      <n-date-picker
        v-model:value="selectedDate"
        type="date"
        placeholder="Filter by Start Date"
        clearable
        class="w-96 rounded-lg"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-inner p-4">
      <div class="min-w-300">
        <n-data-table
          :columns="columns"
          :data="filteredAppraisals"
          :row-key="rowKey"
          striped
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { getDepartmentAppraisals } from '@/apis/management/dean.js';
import { useAuthStore } from '@/store/auth'; // <-- auth store import
import dayjs from 'dayjs';
import { useMessage } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// Route & Auth
const route = useRoute();
const authStore = useAuthStore();
const departmentId = route.params.departmentId || authStore.departmentId;

// Filters
const searchQuery = ref('');
const selectedCadre = ref(null);
const selectedDate = ref(null);

// Appraisal Data
const appraisalsData = ref([]);

// Naive UI message
const message = useMessage();

// Filter options
const cadreOptions = [
  { label: 'Senior Lecturer', value: 'Senior Lecturer' },
  { label: 'Lecturer I', value: 'Lecturer I' },
  { label: 'Lecturer II', value: 'Lecturer II' },
];

// Table columns
const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Cadre', key: 'cadre' },
  { title: 'Appraisal Period', key: 'period' },
  { title: 'Start Date', key: 'startDate' },
  { title: 'Progress', key: 'progress' },
  { title: 'Status', key: 'status' }
];


const rowKey = (row) => row.id;

// Fetch appraisals
const fetchAppraisals = async () => {
  if (!departmentId) {
    message.error('Department ID is missing.');
    return;
  }

  try {
    const response = await getDepartmentAppraisals(departmentId);
    appraisalsData.value = response.data.map((a, index) => ({
      id: index,
      name: a.name,
      cadre: a.cadre,
      period: a.appraisalPeriod,
      startDate: dayjs(a.startDate).format('DD MMM YYYY'),
      progress: a.progress,
      status: a.status
    }));
  } catch {
    message.error('Failed to load appraisals.');
  }
};

// Filtered data
const filteredAppraisals = computed(() => {
  return appraisalsData.value.filter((a) => {
    const matchesSearch =
      !searchQuery.value ||
      a.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.period.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCadre = !selectedCadre.value || a.cadre === selectedCadre.value;
    const matchesDate = !selectedDate.value || dayjs(a.startDate).isSame(selectedDate.value, 'day');

    return matchesSearch && matchesCadre && matchesDate;
  });
});

onMounted(fetchAppraisals);
</script>


