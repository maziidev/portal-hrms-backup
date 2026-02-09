<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between text-orbit-wa font-medium p-6">
      <h4>Department Overview</h4>
       <Ellipsis />

    </div>

    <!-- Filters & Search -->
    <div class="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      <!-- Search -->
      <div class="flex items-center space-x-2 w-full lg:w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3">
        <Search />
        <input
          type="text"
          v-model="search"
          placeholder="Name / ID"
          class="w-full focus:outline-none"
        />
      </div>

      <!-- Filters -->
      <div class="flex space-x-4">
        <!-- Leave Type -->
        <select
          v-model="filters.leaveType"
          class="w-64 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition"
        >
          <option value="">All Leave Types</option>
          <option v-for="type in leaveTypes" :key="type" :value="type">{{ type }}</option>
        </select>

        <!-- Start Date -->
        <input
          type="date"
          v-model="filters.startDate"
          class="w-64 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="w-full overflow-x-auto p-8 bg-white rounded-xl shadow">
      <table class="min-w-full border-collapse">
        <thead class="text-black uppercase font-semibold">
          <tr>
            <th class="py-4 px-6 text-center">Name</th>
            <th class="py-4 px-6 text-center">Leave Type</th>
            <th class="py-4 px-6 text-center">Entitlement</th>
            <th class="py-4 px-6 text-center">Token</th>
            <th class="py-4 px-6 text-center">Remaining</th>
            <th class="py-4 px-6 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          <!-- Data Rows -->
          <tr
            v-for="leave in paginatedData"
            :key="leave.id"
            class="bg-white shadow-sm hover:shadow-md transition cursor-pointer rounded-2xl"
          >
            <td class="p-6 text-center">{{ leave.name }}</td>
            <td class="p-6 text-center">{{ leave.leave_type }}</td>
            <td class="p-6 text-center">{{ leave.entitlement }}</td>
            <td class="p-6 text-center">{{ leave.token }}</td>
            <td class="p-6 text-center">{{ leave.remaining }}</td>
            <td class="p-6 text-center">
              <button
                :class="statusClass(leave.status)"
                class="rounded-full px-4 py-2 font-semibold"
              >
                {{ leave.status }}
              </button>
            </td>
          </tr>

          <!-- No Data Row -->
          <tr v-if="!paginatedData.length" class="h-48">
            <td colspan="6">
              <div class="flex flex-col items-center justify-center h-full space-y-2 text-gray-500">
                <FileText class="w-12 h-12" />
                <span class="text-lg font-medium">No leave activity to show yet</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-end items-center mt-4 space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { getAllLeaves } from '@/apis/services/hou/leave.services.js';
import { Ellipsis, FileText, Search } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

// Filters
const leaveTypes = ['Maternity', 'Annual', 'Sick', 'Study', 'Paternity'];
const filters = ref({
  leaveType: '',
  startDate: ''
});
const search = ref('');

// Pagination
const currentPage = ref(1);
const pageSize = 10;

// Data
const leaveData = ref([]);

// Fetch leaves
const fetchData = async () => {
  try {
    const data = await getAllLeaves();
    leaveData.value = data || [];
  } catch (err) {
    leaveData.value = [];
  }
};

// Format Status Button Classes
const statusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'ongoing': return 'bg-orbit-orange/20 text-orbit-orange';
    case 'updated': return 'bg-orbit-blue/20 text-orbit-blue';
    default: return 'bg-gray-200 text-gray-700';
  }
};

// Filtered Data
const filteredData = computed(() => {
  let data = leaveData.value;

  // Search
  if (search.value) {
    const q = search.value.toLowerCase();
    data = data.filter(l =>
      l.name.toLowerCase().includes(q) || l.id?.toString().includes(q)
    );
  }

  // Leave Type
  if (filters.value.leaveType) {
    data = data.filter(l => l.leave_type === filters.value.leaveType);
  }

  // Start Date
  if (filters.value.startDate) {
    const selected = new Date(filters.value.startDate);
    data = data.filter(l => {
      const start = new Date(l.start_date);
      return start.toDateString() === selected.toDateString();
    });
  }

  return data;
});

// Pagination Logic
const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredData.value.slice(start, start + pageSize);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Reset page when filters/search change
watch([filters, search], () => currentPage.value = 1);

onMounted(fetchData);
</script>
