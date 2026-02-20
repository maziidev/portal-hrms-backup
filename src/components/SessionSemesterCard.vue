<script setup>
import { getActiveSessionSemester } from "@/apis/shared/sessionSemester"
import { useDateTime } from '@/composables/useDateTime'
import { onMounted, ref } from 'vue'

const { formattedDate, formattedTime } = useDateTime()

// Active state control
const activeCard = ref('session')
const toggleActive = (card) => {
  activeCard.value = card
}

const activeSession = ref(null);
const activeSemester = ref(null);
const loading = ref(false);

const fetchActive = async () => {
  loading.value = true;
  try {
    const res = await getActiveSessionSemester();
    const data = res.data;

    // Handle if the backend returns objects { id, name } or just strings
    activeSession.value = typeof data.active_session === 'object'
        ? data.active_session?.name
        : data.active_session;

    activeSemester.value = typeof data.active_semester === 'object'
        ? data.active_semester?.name
        : data.active_semester;

  } catch (err) {
    console.error('Session API Error:', err);
  } finally {
    loading.value = false;

    // Fallbacks if nothing exists after fetch
    if (!activeSession.value) activeSession.value = 'No Active Session'
    if (!activeSemester.value) activeSemester.value = 'No Active Semester'
  }
};

onMounted(() => {
  fetchActive();
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 p-6">

    <div
      v-for="item in [
        { id: 'session', label: 'Academic Session', value: activeSession, mark: 'S' },
        { id: 'semester', label: 'Current Semester', value: activeSemester, mark: 'T' },
        { id: 'date', label: 'Today\'s Date', value: formattedDate, mark: 'D' },
        { id: 'time', label: 'Current Time', value: formattedTime, mark: 'H' }
      ]"
      :key="item.id"
      @click="toggleActive(item.id)"
      class="group cursor-pointer relative overflow-hidden rounded-xl border transition-all duration-300 px-5 py-4 flex flex-col justify-between h-24"
      :class="activeCard === item.id
        ? 'bg-orbit-bg border-orbit-bg shadow-md translate-y-[-2px]'
        : 'bg-white border-gray-100 hover:border-gray-300'"
    >
      <span
        class="absolute -right-2 -bottom-4 text-7xl font-black transition-opacity duration-300 pointer-events-none select-none"
        :class="activeCard === item.id ? 'text-white/5 opacity-100' : 'text-gray-50 opacity-0 group-hover:opacity-100'"
      >
        {{ item.mark }}
      </span>

      <div class="flex items-center justify-between relative z-10">
        <span
          class="text-[10px] uppercase tracking-widest font-bold"
          :class="activeCard === item.id ? 'text-blue-200' : 'text-gray-400'"
        >
          {{ item.label }}
        </span>
        <div
          class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          :class="activeCard === item.id ? 'bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]' : 'bg-gray-200'"
        ></div>
      </div>

      <div class="relative z-10">
        <p
          class="text-lg font-bold tracking-tight truncate"
          :class="activeCard === item.id ? 'text-white' : 'text-orbit-bg'"
        >
          {{ item.value }}
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }

/* Animation for the grid entrance */
.grid > div {
  animation: entrance 0.4s ease-out forwards;
}

@keyframes entrance {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>