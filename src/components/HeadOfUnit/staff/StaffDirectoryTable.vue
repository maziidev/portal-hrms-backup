<script setup>
import { getAllStaff } from "@/apis/services/hou/staff.services.js";
import { Upload } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// --------------------
// router
// --------------------
const router = useRouter();

// --------------------
// state
// --------------------
const staffList = ref([]);
const loading = ref(true);

// filters
const search = ref("");
const selectedCategory = ref("");
const selectedRole = ref("");
const selectedStatus = ref("");

// pagination
const currentPage = ref(1);
const pageSize = 15;

// --------------------
// fetch data
// --------------------
const fetchStaff = async () => {
  try {
    loading.value = true;
    const res = await getAllStaff();
    staffList.value = res?.data ?? [];
  } catch (err) {
    console.error("Failed to fetch staff data", err);
    staffList.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStaff);


const FILTER_OPTIONS = {
  category: [
    { label: "All Categories", value: "" },
    { label: "Records", value: "Records" },
    { label: "Exams", value: "Exams" },
    { label: "Admissions", value: "Admissions" },
  ],
  role: [
    { label: "All Roles", value: "" },
    { label: "Admin Clerk", value: "Admin Clerk" },
    { label: "Contract Staff", value: "Contract Staff" },
    { label: "Senior Records Officer", value: "Senior Records Officer" },
  ],
  status: [
    { label: "All Status", value: "" },
    { label: "Full Time", value: "Full Time" },
    { label: "Contract", value: "Contract" },
  ],
};

// --------------------
// computed filtered staff
// --------------------
const filteredStaff = computed(() => {
  return staffList.value.filter((staff) => {
    const matchesSearch =
      staff.name?.toLowerCase().includes(search.value.toLowerCase()) ||
      staff.staffId?.toLowerCase().includes(search.value.toLowerCase());

    const matchesCategory =
      !selectedCategory.value || staff.category === selectedCategory.value;

    const matchesRole =
      !selectedRole.value || staff.role === selectedRole.value;

    const matchesStatus =
      !selectedStatus.value || staff.employmentStatus === selectedStatus.value;

    return matchesSearch && matchesCategory && matchesRole && matchesStatus;
  });
});

// --------------------
// pagination helpers
// --------------------
const totalPages = computed(() =>
  Math.ceil(filteredStaff.value.length / pageSize)
);

const paginatedStaff = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredStaff.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// --------------------
// row click
// --------------------
const goToDetails = (staff) => {
  router.push({
    name: "StaffDetails",
    params: { id: staff.id },
  });
};
</script>

<template>
<!-- Filters and Header stay outside table wrapper -->
<div class="p-6  min-h-screen">

  <!-- Header -->
  <div class="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
    <h3 class="font-bold text-2xl text-gray-800">All Staff Directory</h3>
    <button
      class="flex items-center space-x-2 text-orbit-blue border-2 border-orbit-blue px-4 py-2 text-sm font-semibold rounded-lg hover:bg-orbit-blue/10 transition"
    >
      <Upload class="w-5 h-5" />
      <span>Export Staff List</span>
    </button>
  </div>

  <!-- Filters -->
  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
    <input
      v-model="search"
      type="text"
      placeholder="Search by Name or ID"
      class="flex-1 rounded-lg bg-white px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orbit-blue"
    />

    <div class="space-x-4">
      <select v-model="selectedCategory" class="rounded-lg border px-3 py-2 bg-white text-gray-700">
        <option v-for="option in FILTER_OPTIONS.category" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <select v-model="selectedRole" class="rounded-lg border px-3 py-2 bg-white text-gray-700">
        <option v-for="option in FILTER_OPTIONS.role" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <select v-model="selectedStatus" class="rounded-lg border px-3 py-2 bg-white text-gray-700">
        <option v-for="option in FILTER_OPTIONS.status" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>

  <!-- Table Wrapper: ONLY THIS SCROLLS -->
  <div class="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
    <table class="min-w-300 w-full border-collapse text-left">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Staff ID</th>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Name</th>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Position</th>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Cadre</th>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Subunit</th>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Employment Status</th>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Last Promotion</th>
          <th class="py-3 px-4 text-gray-700 font-semibold capitalize tracking-wide text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-800">
        <tr v-if="loading">
          <td colspan="8" class="py-20 text-center text-gray-500">Loading staff data...</td>
        </tr>
        <tr v-else-if="!paginatedStaff.length">
          <td colspan="8" class="py-20 text-center text-gray-500">No staff records found</td>
        </tr>
        <tr v-else v-for="staff in paginatedStaff" :key="staff.id" class="bg-white hover:bg-gray-50 transition">
          <td class="py-4 px-4 text-center">{{ staff.staffId }}</td>
          <td class="py-4 px-4 text-center">{{ staff.name }}</td>
          <td class="py-4 px-4 text-center">{{ staff.position }}</td>
          <td class="py-4 px-4 text-center">{{ staff.cadre }}</td>
          <td class="py-4 px-4 text-center">{{ staff.subunit }}</td>
          <td class="py-4 px-4 text-center">{{ staff.employmentStatus }}</td>
          <td class="py-4 px-4 text-center flex items-center justify-center gap-2">
            <img src="../../assets/img/calendar.png" alt="calendar" class="w-4 h-4" />
            <span>{{ staff.lastPromotion }}</span>
          </td>
          <td class="py-4 px-4 text-center">
            <button
              @click="goToDetails(staff)"
              class="px-3 py-1 bg-orbit-blue text-white rounded-lg hover:bg-orbit-blue/90 transition"
            >
              View Staff
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="flex justify-end items-center mt-4 space-x-2">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
    >
      Prev
    </button>
    <span class="text-gray-700 font-medium">Page {{ currentPage }} / {{ totalPages }}</span>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
    >
      Next
    </button>
  </div>
</div>

</template>
