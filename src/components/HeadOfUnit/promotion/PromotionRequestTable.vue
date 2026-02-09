<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4">Promotion Request Overview</h2>

    <!-- Filters -->
    <div class="flex flex-wrap items-center justify-between mb-6 space-y-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by Name / ID"
        class="border rounded px-4 py-2 w-75"
      />

      <div class="flex  items-center space-x-3">
        <select v-model="selectedStatus" class="border rounded px-4 py-2">
          <option value="">All Status</option>
          <option value="pe">Pending</option>
          <option value="ap">Approved</option>
          <option value="re">Rejected</option>
          <option value="en">Endorsed</option>
        </select>

        <!-- CHANGED: date instead of month -->
        <input
          type="date"
          v-model="selectedDate"
          class="border rounded px-4 py-2"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead class="bg-gray-300 text-black uppercase font-semibold">
          <tr>
            <th class="py-4 px-6 text-center">Staff ID</th>
            <th class="py-4 px-6 text-center">Name</th>
            <th class="py-4 px-6 text-center">Current Grade</th>
            <th class="py-4 px-6 text-center">Proposed Grade</th>
            <th class="py-4 px-6 text-center">Date Submitted</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="py-4 px-6 text-center">Action</th>
          </tr>
        </thead>

        <tbody class="bg-white text-sm">
          <!-- Empty State -->
          <tr v-if="paginatedPromotions.length === 0">
            <td colspan="7" class="py-16 text-center text-gray-500">
              <div class="flex flex-col items-center space-y-3">
                <FileText class="w-12 h-12 text-gray-400" />
                <p class="font-medium">No promotion requests found</p>
                <p class="text-sm text-gray-400">
                  Promotion requests will appear here once submitted.
                </p>
              </div>
            </td>
          </tr>

          <!-- Rows -->
          <tr
            v-for="promotion in paginatedPromotions"
            :key="promotion.id"
            class="shadow-sm hover:shadow-md transition"
          >
            <td class="p-4 text-center">{{ promotion.staff_id }}</td>
            <td class="p-4 text-center">{{ promotion.staff_name }}</td>
            <td class="p-4 text-center">{{ promotion.current_grade }}</td>
            <td class="p-4 text-center">{{ promotion.proposed_grade }}</td>
            <td class="p-4 text-center">{{ promotion.date_submitted }}</td>
            <td class="p-4 text-center">{{ promotion.status }}</td>
            <td class="p-4 text-center">
              <button
                @click="viewPromotion(promotion)"
                class="bg-orbit-blue/20 text-orbit-blue font-bold px-4 py-2 rounded-md"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="mt-4 flex justify-center items-center space-x-3"
    >
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span class="text-sm">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <!-- Modal -->
    <PromotionDetailModal
      v-model:visible="showPromotionModal"
      :promotion="selectedPromotion"
    />
  </div>
</template>

<script setup>
import { getPromotions } from "@/apis/services/hou/promotions.services.js";
import { FileText } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import PromotionDetailModal from "./PromotionDetailModal.vue";

const promotions = ref([]);
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedDate = ref("");
const currentPage = ref(1);
const pageSize = 5;

// Modal
const showPromotionModal = ref(false);
const selectedPromotion = ref(null);

const viewPromotion = (promotion) => {
  selectedPromotion.value = promotion;
  showPromotionModal.value = true;
};

// Fetch
const fetchPromotions = async () => {
  try {
    promotions.value = await getPromotions() || [];
  } catch {
    promotions.value = [];
  }
};

onMounted(fetchPromotions);

// Filtering (UPDATED DATE LOGIC)
const filteredPromotions = computed(() =>
  promotions.value.filter((p) => {
    const statusMatch = selectedStatus.value
      ? p.status?.toLowerCase() === selectedStatus.value.toLowerCase()
      : true;

    const searchMatch = searchQuery.value
      ? p.staff_name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.staff_id?.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;

    const dateMatch = selectedDate.value
      ? new Date(p.date_submitted).toISOString().slice(0, 10) === selectedDate.value
      : true;

    return statusMatch && searchMatch && dateMatch;
  })
);

// Pagination
const totalPages = computed(() =>
  Math.ceil(filteredPromotions.value.length / pageSize)
);

const paginatedPromotions = computed(() =>
  filteredPromotions.value.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  )
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>
