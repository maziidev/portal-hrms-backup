<script setup>
import { CalendarDays, Clock4 } from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';
import { getActiveSessionSemester } from '../../apis/services/session.service.js';

// Active session & semester
const activeSession = ref(null)
const activeSemester = ref(null)

// Date & Time
const currentDate = ref('')
const currentTime = ref('')

let timer = null

// --- Helpers for date suffix ---
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

const formatDateWithSuffix = (date) => {
  const day = date.getDate()
  const suffix = getDaySuffix(day)
  return `${date.toLocaleDateString(undefined, {  month: 'long' })} ${day}${suffix}, ${date.getFullYear()}`
}

// --- Fetch active session & semester ---
const fetchActive = async () => {
  try {
    const data = await getActiveSessionSemester()
    activeSession.value = data.active_session
    activeSemester.value = data.active_semester
  } catch (err) {
    console.error('Active session fetch failed', err)
  }
}

// --- Update date & time every second ---
const updateDateTime = () => {
  const now = new Date()
  currentDate.value = formatDateWithSuffix(now)
  currentTime.value = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  fetchActive()
  updateDateTime()
  timer = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 p-6">

    <!-- Session -->
    <div class="flex items-center space-x-2">
      <CalendarDays />
      <span class="font-bold">Session:</span>
      <span>{{ activeSession?.name || '—' }}</span>
    </div>

    <!-- Semester -->
    <div class="flex items-center space-x-2">
      <CalendarDays />
      <span class="font-bold">Semester:</span>
      <span>{{ activeSemester?.name || '—' }}</span>
    </div>

    <!-- Date -->
    <div class="flex items-center space-x-2">
      <CalendarDays />
      <span class="font-medium">{{ currentDate }}</span>
    </div>

    <!-- Time -->
    <div class="flex items-center space-x-2">
      <Clock4 />
      <span class="font-medium">{{ currentTime }}</span>
    </div>

  </div>
</template>
