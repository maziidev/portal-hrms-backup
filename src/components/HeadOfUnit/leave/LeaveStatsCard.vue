<template>
  <div class="bg-white px-4 py-3 pb-6 rounded-3xl space-y-6">
    <!-- Top Card -->
    <div class="bg-orbit-bgSec rounded-2xl p-6 space-y-4">
      <h5 class="text-orbit-accent font-medium">Total Applications</h5>

      <div class="flex items-center justify-between">
        <h4 class="text-white text-6xl font-bold">
          {{ totalApplications }}
        </h4>

        <p class="flex items-center space-x-1 text-orbit-cyan font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          <span>{{ totalChange }}</span>
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div
      v-for="card in statsCards"
      :key="card.key"
      class="flex items-center justify-between"
    >
      <div>
        <h5 class="font-bold text-xl text-orbit-bg">
          {{ card.title }}
        </h5>
        <p class="text-orbit-btn">
          {{ card.subtitle }}
        </p>
      </div>

      <p class="font-bold text-xl">
        {{ card.value }}
      </p>
    </div>

    <!-- Error State -->
    <p v-if="error" class="text-sm text-red-500 text-center">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getLeaveStats } from "@/apis/services/hou/leave.services.js";

/**
 * STATE
 */
const totalApplications = ref(0);
const totalChange = ref("+0");
const error = ref(null);

const statsCards = ref([
  {
    key: "pending",
    title: "Pending Approvals",
    subtitle: "Awaiting your action.",
    value: 0
  },
  {
    key: "approved",
    title: "Approved Leaves",
    subtitle: "Approved and logged in record.",
    value: 0
  },
  {
    key: "active",
    title: "Active Leave",
    subtitle: "Currently on leave",
    value: 0
  }
]);

/**
 * API HANDLER
 */
const fetchLeaveStats = async () => {
  error.value = null;

  try {
    const data = await getLeaveStats();

    totalApplications.value = data?.total_applications ?? 0;
    totalChange.value = data?.change ?? "+0";

    statsCards.value = [
      {
        key: "pending",
        title: "Pending Approvals",
        subtitle: "Awaiting your action.",
        value: data?.pending ?? 0
      },
      {
        key: "approved",
        title: "Approved Leaves",
        subtitle: "Approved and logged in record.",
        value: data?.approved ?? 0
      },
      {
        key: "active",
        title: "Active Leave",
        subtitle: "Currently on leave",
        value: data?.active ?? 0
      }
    ];
  } catch {
    error.value = "Unable to load leave statistics";
  }
};

/**
 * LIFECYCLE
 */
onMounted(fetchLeaveStats);
</script>
