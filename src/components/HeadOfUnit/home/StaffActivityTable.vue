<script setup>
import { DatabaseBackup } from 'lucide-vue-next';
import { computed, onMounted, ref } from "vue";
import { fetchStaffActivityFeed } from "../../../apis/services/hou/staff.services.js";



// --------------------
// state
// --------------------
const activities = ref([])
const loading = ref(true)

const search = ref("")
const selectedStatus = ref("all")
const selectedDate = ref("")



// --------------------
// status definition (single source of truth)
// --------------------
const STATUS_LIST = [
  {
    value: "Completed",
    label: "Completed",
    classes: "bg-green-100 text-green-700"
  },
  {
    value: "Pending",
    label: "Pending",
    classes: "bg-orange-100 text-orange-700"
  },
  {
    value: "Recorded",
    label: "Recorded",
    classes: "bg-blue-100 text-blue-700"
  }
]


// --------------------
// fetch data
// --------------------

const fetchActivities = async () => {
  try {
    loading.value = true
    const res = await fetchStaffActivityFeed()
    activities.value = res?.data ?? []
  } catch (err) {
    console.error("Failed to load staff activities", err)
    activities.value = []
  } finally {
    loading.value = false
  }
}
onMounted(fetchActivities)

// --------------------
// computed filters
// --------------------
const filteredActivities = computed(() => {
  return activities.value.filter(item => {
    const matchesSearch =
      item.staffName?.toLowerCase().includes(search.value.toLowerCase()) ||
      item.activity?.toLowerCase().includes(search.value.toLowerCase())

    const matchesStatus =
      selectedStatus.value === "all" ||
      item.status === selectedStatus.value

    const matchesDate =
      !selectedDate.value ||
      item.date === selectedDate.value

    return matchesSearch && matchesStatus && matchesDate
  })
})

// --------------------
// helpers
// --------------------
const statusStyles = status => {
  return (
    STATUS_LIST.find(s => s.value === status)?.classes ??
    "bg-gray-100 text-gray-600"
  )
}
</script>

<template>
  <div class="space-y-8">

    <!-- Header + Filters -->
    <section class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <h1 class="text-2xl font-bold">Departments Appraisals</h1>

      <div class="flex flex-col md:flex-row gap-3 items-stretch">

        <!-- Search -->
        <input
          v-model="search"
          type="search"
          placeholder="Search staff or activity..."
          class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orbit-blue outline-none"
        />

        <!-- Status Filter (driven from STATUS_LIST) -->
        <select
          v-model="selectedStatus"
          class="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">All Status</option>
          <option
            v-for="status in STATUS_LIST"
            :key="status.value"
            :value="status.value"
          >
            {{ status.label }}
          </option>
        </select>

        <!-- Date Filter -->
        <input
          v-model="selectedDate"
          type="date"
          class="px-4 py-2 border rounded-lg"
        />
      </div>
    </section>

    <!-- Table -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <table class="min-w-full border-separate border-spacing-y-3 px-6">

        <!-- THEAD -->
        <thead class="bg-gray-50">
          <tr class="text-xs font-semibold uppercase tracking-wider text-gray-600">
            <th class="py-4 px-6 text-center rounded-tl-xl">Staff Name</th>
            <th class="py-4 px-6 text-center">Activity</th>
            <th class="py-4 px-6 text-center">Date</th>
            <th class="py-4 px-6 text-center rounded-tr-xl">Status</th>
          </tr>
        </thead>

        <tbody>
          <!-- Loading -->
          <tr v-if="loading">
            <td colspan="4" class="py-20">
              <div class="flex justify-center">
                <div
                  class="animate-spin h-10 w-10 rounded-full border-4 border-orbit-blue border-t-transparent"
                />
              </div>
            </td>
          </tr>

          <!-- No Data -->
          <tr v-else-if="!filteredActivities.length">
            <td colspan="4" class="py-20 text-center text-gray-500">
              <div class="flex flex-col items-center gap-3">
                  <DatabaseBackup />

                <p class="font-medium">No activity records found</p>
              </div>
            </td>
          </tr>

          <!-- Rows -->
          <tr
            v-else
            v-for="(item, index) in filteredActivities"
            :key="item.id"
            :class="[
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
              'hover:shadow-md transition rounded-xl cursor-pointer'
            ]"
          >
            <td class="p-6 text-center font-medium">
              {{ item.staffName }}
            </td>

            <td class="p-6 text-center">
              {{ item.activity }}
            </td>

            <td class="p-6 text-center text-gray-600">
              {{ item.date }}
            </td>

            <td class="p-6 text-center">
              <span
                :class="[
                  'px-4 py-2 rounded-lg font-semibold inline-block',
                  statusStyles(item.status)
                ]"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>

      </table>
    </section>

  </div>
</template>
