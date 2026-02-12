<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Session Card -->
    <div
      class="cursor-pointer rounded-xl shadow-lg border border-gray-200 px-6 py-5 flex items-center gap-4 transition-all duration-200 hover:shadow-xl hover:scale-105"
      :class="activeCard === 'session' ? 'bg-orbit-bg text-white' : 'bg-white text-gray-800'"
      @click="toggleActive('session')"
    >
      <div class="p-2 rounded-md bg-orbit-cyan/10 flex items-center justify-center">
        <CalendarDays class="w-5 h-5" :class="activeCard === 'session' ? 'text-white' : 'text-orbit-cyan'" />
      </div>
      <div>
        <p class="text-xs font-medium text-gray-400">Session</p>
        <p class="text-lg font-bold">{{ activeSession || '-' }}</p>
      </div>
    </div>

    <!-- Semester Card -->
    <div
      class="cursor-pointer rounded-xl shadow-lg border border-gray-200 px-6 py-5 flex items-center gap-4 transition-all duration-200 hover:shadow-xl hover:scale-105"
      :class="activeCard === 'semester' ? 'bg-orbit-bg text-white' : 'bg-white text-gray-800'"
      @click="toggleActive('semester')"
    >
      <div class="p-2 rounded-md bg-orbit-cyan/10 flex items-center justify-center">
        <BookOpen class="w-5 h-5" :class="activeCard === 'semester' ? 'text-white' : 'text-orbit-cyan'" />
      </div>
      <div>
        <p class="text-xs font-medium text-gray-400">Semester</p>
        <p class="text-lg font-bold">{{ activeSemester || '-' }}</p>
      </div>
    </div>

    <!-- Date Card -->
    <div
      class="cursor-pointer rounded-xl shadow-lg border border-gray-200 px-6 py-5 flex items-center gap-4 transition-all duration-200 hover:shadow-xl hover:scale-105"
      :class="activeCard === 'date' ? 'bg-orbit-bg text-white' : 'bg-white text-gray-800'"
      @click="toggleActive('date')"
    >
      <div class="p-2 rounded-md bg-orbit-cyan/10 flex items-center justify-center">
        <Calendar class="w-5 h-5" :class="activeCard === 'date' ? 'text-white' : 'text-orbit-cyan'" />
      </div>
      <div>
        <p class="text-xs font-medium text-gray-400">Date</p>
        <p class="text-lg font-bold">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- Time Card -->
    <div
      class="cursor-pointer rounded-xl shadow-lg border border-gray-200 px-6 py-5 flex items-center gap-4 transition-all duration-200 hover:shadow-xl hover:scale-105"
      :class="activeCard === 'time' ? 'bg-orbit-bg text-white' : 'bg-white text-gray-800'"
      @click="toggleActive('time')"
    >
      <div class="p-2 rounded-md bg-orbit-cyan/10 flex items-center justify-center">
        <Clock4 class="w-5 h-5" :class="activeCard === 'time' ? 'text-white' : 'text-orbit-cyan'" />
      </div>
      <div>
        <p class="text-xs font-medium text-gray-400">Time</p>
        <p class="text-lg font-bold">{{ formattedTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDateTime } from '@/composable/useDateTime'
import {getActiveSessionSemester} from "@/apis/shared/sessionSemester"
import { BookOpen, Calendar, CalendarDays, Clock4 } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'


const { formattedDate, formattedTime } = useDateTime()

// First card (Session) is active by default
const activeCard = ref('session')

// Toggle behavior: click to activate/deactivate
const toggleActive = (card) => {
  activeCard.value = activeCard.value === card ? null : card
}
const activeSession = ref(null);
const activeSemester = ref(null);
const loading = ref(false);

const fetchActive = async () => {
  loading.value = true;
  try {
    const res = await getActiveSessionSemester();
    activeSession.value = res.data.active_session;
    activeSemester.value = res.data.active_semester;
  } catch (err) {
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchActive();

    // Fallbacks if nothing exists
  if (!activeSession.value) activeSession.value = '-'
  if (!activeSemester.value) activeSemester.value = '-'
});

</script>
