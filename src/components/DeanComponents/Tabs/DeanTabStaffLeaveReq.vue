<template>
  <div class="mt-6 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h4 class="text-2xl font-semibold text-gray-800 whitespace-nowrap">
        Leave Request
      </h4>
    </div>

    <!-- Filters -->
    <div class="flex flex-col lg:flex-row lg:items-center gap-3">
      <n-input
        v-model:value="searchQuery"
        placeholder="Search by name or leave type"
        clearable
        class="w-96"
      />

      <n-select
        v-model:value="selectedCadre"
        :options="cadreOptions"
        placeholder="Filter by Cadre"
        clearable
        class="w-96"
      />

      <n-select
        v-model:value="selectedStatus"
        :options="statusOptions"
        placeholder="Filter by Status"
        clearable
        class="w-96"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-inner p-4">
      <div class="min-w-300">
        <n-data-table
          :columns="columns"
          :data="filteredLeaves"
          :row-key="rowKey"
          striped
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { getDepartmentLeaves } from '@/apis/management/dean.js'
import { useAuthStore } from '@/store/auth'
import dayjs from 'dayjs'
import { NButton, useMessage } from 'naive-ui'
import { computed, h, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// Route + Auth
const route = useRoute()
const authStore = useAuthStore()
const departmentId = route.params.departmentId || authStore.departmentId

// Filters
const searchQuery = ref('')
const selectedCadre = ref(null)
const selectedStatus = ref(null)

// Data
const leavesData = ref([])

const message = useMessage()

// Filter options
const cadreOptions = [
  { label: 'Lecturer I', value: 'Lecturer I' },
  { label: 'Lecturer II', value: 'Lecturer II' }
]

const statusOptions = [
  { label: 'Submitted', value: 'Submitted' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Awaiting Dean', value: 'Awaiting Dean' }
]

// Columns
const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Leave Type', key: 'leaveType' },
  { title: 'Start', key: 'startDate' },
  { title: 'End', key: 'endDate' },
  { title: 'Status', key: 'status' },
  {
    title: 'Action',
    key: 'action',
    render: (row) => {
      const isAwaiting = row.status === 'Awaiting Dean'
      const buttonText = isAwaiting ? 'Review' : 'View'

      return h(
        NButton,
        {
          size: 'small',
          type: isAwaiting ? 'primary' : 'default',
          onClick: (e) => {
            e.stopPropagation()
            console.log('Clicked leave:', row)
          }
        },
        { default: () => buttonText }
      )
    }
  }
]

const rowKey = (row) => row.id

// Fetch
const fetchLeaves = async () => {
  if (!departmentId) {
    message.error('Department ID is missing.')
    return
  }

  try {
    const response = await getDepartmentLeaves(departmentId)

    leavesData.value = response.data.map((l, index) => ({
      id: index,
      name: l.name,
      cadre: l.cadre,
      leaveType: l.leaveType,
      startDate: dayjs(l.startDate).format('DD MMM YYYY'),
      endDate: dayjs(l.endDate).format('DD MMM YYYY'),
      status: l.status
    }))
  } catch {
    message.error('Failed to load leave requests.')
  }
}

// Filtering
const filteredLeaves = computed(() => {
  return leavesData.value.filter((l) => {
    const matchesSearch =
      !searchQuery.value ||
      l.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      l.leaveType.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCadre =
      !selectedCadre.value || l.cadre === selectedCadre.value

    const matchesStatus =
      !selectedStatus.value || l.status === selectedStatus.value

    return matchesSearch && matchesCadre && matchesStatus
  })
})

onMounted(fetchLeaves)
</script>

<style scoped>
.min-w-300 {
  min-width: 1200px;
}
</style>
