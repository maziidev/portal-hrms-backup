<template>
  <div class="p-6">
    <h4 class="font-semibold text-xl mb-4">Leave Requests Overview</h4>

    <!-- Filters & Search -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
      <!-- Search -->
      <div class="flex items-center space-x-2 w-full lg:w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-3">
        <Search />
        <input
          type="text"
          v-model="search"
          placeholder="Search by Name / ID / Leave Type / Status"
          class="w-full focus:outline-none"
        />
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap lg:space-x-4  lg:space-y-0 space-x-3 items-center">
        <!-- Leave Type -->
        <select v-model="filters.leaveType" class="border border-gray-300 rounded-lg px-4 py-2">
          <option value="">Leave Type</option>
          <option v-for="type in leaveTypes" :key="type" :value="type">{{ type }}</option>
        </select>

        <!-- Date Filter -->
        <input type="date" v-model="filters.monthYear" class="border border-gray-300 rounded-lg px-4 py-2" />

        <!-- Status -->
        <select v-model="filters.status" class="border border-gray-300 rounded-lg px-4 py-2">
          <option value="">Status</option>
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="w-full overflow-x-auto bg-white rounded-xl shadow">
      <table class="min-w-full border-collapse">
        <thead class="text-black uppercase font-semibold bg-gray-300">
          <tr>
            <th class="py-4 px-6 text-center">Staff ID</th>
            <th class="py-4 px-6 text-center">Name</th>
            <th class="py-4 px-6 text-center">Leave Type</th>
            <th class="py-4 px-6 text-center">Start Date</th>
            <th class="py-4 px-6 text-center">End Date</th>
            <th class="py-4 px-6 text-center">Duration</th>
            <th class="py-4 px-6 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          <!-- Render leave rows if data exists -->
          <tr
            v-for="leave in paginatedData"
            :key="leave.id"
            class="bg-white shadow-sm hover:shadow-md transition cursor-pointer rounded-2xl"
          >
            <td class="p-4 text-center">{{ leave.staff_id }}</td>
            <td class="p-4 text-center">{{ leave.name }}</td>
            <td class="p-4 text-center">{{ leave.leave_type }}</td>
            <td class="p-4 text-center">{{ leave.start_date }}</td>
            <td class="p-4 text-center">{{ leave.end_date }}</td>
            <td class="p-4 text-center">{{ leave.duration }}</td>
            <td class="p-4 text-center">
              <span :class="statusClass(leave.status)" class="font-bold p-2 rounded-md">{{ leave.status }}</span>
            </td>
          </tr>

          <!-- No data row -->
          <tr v-if="!paginatedData.length" class="h-48">
            <td colspan="7" class="text-center ">
              <div class="py-12 text-gray-500 flex flex-col items-center justify-center space-y-2">
                  <FileText class="w-12 h-12 mx-auto" />
                  <span class="text-sm font-medium ">No leave activity to show yet</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="paginatedData.length" class="flex justify-end items-center mt-4 space-x-2">
      <button @click="prevPage" :disabled="currentPage === 1"
              class="px-3 py-1 border rounded disabled:opacity-50">Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
              class="px-3 py-1 border rounded disabled:opacity-50">Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { getAllLeaves } from '@/apis/services/hou/leave.services.js';
import { FileText, Search } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

// Filters
const leaveTypes = ['Maternity', 'Annual', 'Sick', 'Study', 'Paternity'];
const statuses = ['Pending', 'Approved', 'Active', 'Rejected'];

const search = ref('');
const filters = ref({
  leaveType: '',
  monthYear: '',
  status: ''
});

// Pagination
const currentPage = ref(1);
const pageSize = 10;

// Data
const leaveData = ref([]);

const filteredData = computed(() => {
  let data = leaveData.value;

  if (search.value) {
    const q = search.value.toLowerCase();
    data = data.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.staff_id.toLowerCase().includes(q) ||
      l.leave_type.toLowerCase().includes(q) ||
      l.status.toLowerCase().includes(q)
    );
  }

  if (filters.value.leaveType) data = data.filter(l => l.leave_type === filters.value.leaveType);
  if (filters.value.status) data = data.filter(l => l.status === filters.value.status);
  if (filters.value.monthYear) {
    const selectedDate = new Date(filters.value.monthYear);
    data = data.filter(l => {
      const start = new Date(l.start_date);
      return start.getFullYear() === selectedDate.getFullYear() &&
             start.getMonth() === selectedDate.getMonth() &&
             start.getDate() === selectedDate.getDate();
    });
  }

  return data;
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredData.value.slice(start, start + pageSize);
});

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };

const statusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'approved': return 'bg-green-100 text-green-700';
    case 'pending': return 'bg-orange-100 text-orange-700';
    case 'active': return 'bg-blue-100 text-blue-700';
    case 'rejected': return 'bg-red-100 text-red-700';
    default: return '';
  }
};

const fetchData = async () => {
  try {
    const data = await getAllLeaves();
    leaveData.value = data || [];
  } catch {
    leaveData.value = [];
  }
};

onMounted(() => fetchData());
watch([filters, search], () => currentPage.value = 1);
</script>
