<template>
  <div class="bg-white p-8 rounded-3xl space-y-6">
    <h3 class="font-bold text-orbit-bg text-3xl">
      Notifications
    </h3>

    <!-- Loading -->
    <p v-if="loading" class="text-sm text-gray-400 text-center">
      Loading notifications…
    </p>

    <!-- List -->
    <div
      v-for="item in notifications"
      :key="item.id"
      class="flex items-center justify-between"
    >
      <div class="flex items-center space-x-3 max-w-[70%]">
        <div class="bg-orbit-blue w-2 h-12 rounded-lg"></div>
        <p class="font-semibold">
          {{ item.message }}
        </p>
      </div>

      <p class="text-orbit-btn font-bold text-sm whitespace-nowrap">
        {{ formatDate(item.created_at) }}
      </p>
    </div>

    <!-- Empty -->
    <p
      v-if="!loading && notifications.length === 0"
      class="text-sm text-gray-400 text-center"
    >
      No notifications available
    </p>

    <!-- Error -->
    <p
      v-if="error"
      class="text-sm text-red-500 text-center"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getNotifications } from "@/apis/services/hou/leave.services.js";

/**
 * STATE
 */
const notifications = ref([]);
const loading = ref(false);
const error = ref(null);

/**
 * FETCH (via service, not axios)
 */
const loadNotifications = async () => {
  loading.value = true;
  error.value = null;

  try {
    notifications.value = await getNotifications();
  } catch {
    error.value = "Failed to load notifications";
  } finally {
    loading.value = false;
  }
};

/**
 * HELPERS
 */
const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

onMounted(loadNotifications);
</script>
