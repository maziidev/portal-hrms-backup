<script setup>

// TODO: IMPLEMENT MODAL FOR EACH OF THE TABLE LATER

import { ref, computed, onMounted, watch } from "vue";
import { getActiveAppraisalPeriod } from "@/apis/services/hou/appraisal.services.js";

/* ---------------- state ---------------- */
const loading = ref(true);
const error = ref(null);
const appraisals = ref([]);

/* search + filter */
const search = ref("");
const statusFilter = ref("all");

/* pagination */
const currentPage = ref(1);
const PAGE_SIZE = 5;

const selectedDate = ref("")


const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Submitted", value: "Submitted" },
  { label: "In review", value: "In review" },
  { label: "Not Started", value: "Not Started" }
];


/* ---------------- fetch ---------------- */
const fetchAppraisals = async () => {
  loading.value = true;
  error.value = null;

  try {
    const data = await getActiveAppraisalPeriod();

    if (Array.isArray(data)) {
      appraisals.value = data;
    } else if (data) {
      appraisals.value = [data];
    } else {
      appraisals.value = [];
    }
  } catch (err) {
    console.error(err);
    error.value = "Failed to load appraisals";
    appraisals.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAppraisals);

/* ---------------- computed ---------------- */
const filteredAppraisals = computed(() => {
  let rows = appraisals.value;

  /* text search */
  if (search.value) {
    const q = search.value.toLowerCase();
    rows = rows.filter(item =>
      (item.staff_name || "").toLowerCase().includes(q) ||
      (item.staff_id || "").toLowerCase().includes(q)
    );
  }

  /* status filter */
  if (statusFilter.value !== "all") {
    rows = rows.filter(item => item.status === statusFilter.value);
  }

  /* single date filter */
  if (selectedDate.value) {
    const selected = new Date(selectedDate.value);

    rows = rows.filter(item => {
      if (!item.updated_at) return false;

      const itemDate = new Date(item.updated_at);

      return (
        itemDate.getFullYear() === selected.getFullYear() &&
        itemDate.getMonth() === selected.getMonth() &&
        itemDate.getDate() === selected.getDate()
      );
    });
  }

  return rows;
});




const totalPages = computed(() =>
  Math.ceil(filteredAppraisals.value.length / PAGE_SIZE)
);

const paginatedAppraisals = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return filteredAppraisals.value.slice(start, start + PAGE_SIZE);
});

/* reset page when filters change */
watch([search, statusFilter, selectedDate], () => {
  currentPage.value = 1;
});



/* ---------------- helpers ---------------- */
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>


<template>
  <div class="w-full space-y-3 p-6 ">

    <h2 class="font-bold text-2xl text-orbit-bg">Active Appraisals</h2>

    <!-- SEARCH + FILTER -->
    <div class="flex flex-wrap gap-4 items-center justify-between">
      <input
        v-model="search"
        type="text"
        placeholder="Search by staff name or ID"
        class="border px-4 py-2 rounded-md w-full md:w-80"
      />

      <div class="flex flex-wrap items-center space-x-4">
        <select
  v-model="statusFilter"
  class="border px-4 py-2 rounded-md"
>
  <option
    v-for="opt in statusOptions"
    :key="opt.value"
    :value="opt.value"
  >
    {{ opt.label }}
  </option>
</select>


       <input v-model="selectedDate" type="date" class="border px-4 py-2 rounded-md" />
      </div>


    </div>

    <!-- TABLE -->
    <div class="w-full overflow-x-auto">
      <table class="min-w-full border-collapse bg-white rounded-xl shadow p-3">
        <thead class="text-black uppercase font-semibold bg-gray-200">
          <tr>
            <th class="py-4 px-6 text-center">Staff ID</th>
            <th class="py-4 px-6 text-center">Staff Name</th>
            <th class="py-4 px-6 text-center">Position</th>
            <th class="py-4 px-6 text-center">Appraisal Period</th>
            <th class="py-4 px-6 text-center">Last Updated</th>
            <th class="py-4 px-6 text-center">Progress</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="py-4 px-6 text-center">Action</th>
          </tr>
        </thead>

        <tbody class="text-sm">

          <tr v-if="loading">
            <td colspan="8" class="text-center py-10">
              Loading appraisals…
            </td>
          </tr>

          <tr v-else-if="error">
            <td colspan="8" class="text-center text-red-500 py-10">
              {{ error }}
            </td>
          </tr>

          <tr v-else-if="!paginatedAppraisals.length">
            <td colspan="8" class="text-center py-10 text-gray-400">
              No appraisals found
            </td>
          </tr>

          <tr
            v-else
            v-for="item in paginatedAppraisals"
            :key="item.id || item.staff_id"
            class="bg-white shadow-sm hover:shadow-md transition cursor-pointer rounded-2xl"
            @click="$emit('open-modal', item)"
          >
            <td class="p-6 text-center">{{ item.staff_id  }}</td>
            <td class="p-6 text-center">{{ item.staff_name  }}</td>
            <td class="p-6 text-center">{{ item.position  }}</td>
            <td class="p-6 text-center">{{ item.period  }}</td>
            <td class="p-6 text-center">{{ formatDate(item.updated_at) }}</td>
            <td class="p-6 text-center">
              {{ item.progress != null ? item.progress + "%" : "N/A" }}
            </td>
            <td class="p-6 text-center">
              <span
                class="px-4 py-2 rounded-full font-semibold"
                :class="{
                  'text-orbit-btn bg-orbit-btn/20': item.status === 'Submitted',
                  'text-orbit-blue bg-orbit-blue/20': item.status === 'In review',
                  'text-orbit-red bg-orbit-red/20': item.status === 'Not Started'
                }"
              >
                {{ item.status  }}
              </span>
            </td>
            <td class="p-6 text-center">
              <button
                @click.stop="$emit('open-modal', item)"
                class="btn btn-blue-main"
              >
                View
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- PAGINATION -->
    <div class="flex justify-end items-center gap-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded-md"
      >
        Prev
      </button>

      <span class="text-sm">
        Page {{ currentPage }} of {{ totalPages || 1 }}
      </span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-orbit-blue text-white rounded-md"
      >
        Next
      </button>
    </div>

  </div>
</template>


