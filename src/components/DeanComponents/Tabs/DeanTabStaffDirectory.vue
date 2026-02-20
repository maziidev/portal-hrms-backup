<template>
  <div class="mt-6 space-y-6">

    <!-- Header + Export Button -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <h4 class="text-2xl font-semibold text-gray-800 whitespace-nowrap">All Staff Directory</h4>
      <BaseButton label="Export Staff Records" @click="exportStaffRecords" class="bg-orbit-blue text-white" />
    </div>

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3">

    <div class="w-xl">
            <n-input
        v-model:value="searchQuery"
        placeholder="Search by name, ID or role"
        clearable

      />
    </div>

        <div class="flex items-center space-x-5">
            <n-select
        v-model:value="selectedRole"
        :options="roleOptions"
        placeholder="Role"
        clearable
        style="width: 200px"
      />

        <n-select
        v-model:value="selectedStatus"
        :options="statusOptions"
        placeholder="Status"
        clearable
        style="width: 200px"

      />

        <n-date-picker
        v-model:value="selectedDate"
        type="date"
        placeholder="Employment Date"
        clearable
        style="width: 200px"

      />
        </div>

    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-inner p-4">
      <div class="min-w-300">
        <n-data-table
          :columns="columns"
          :data="filteredStaff"
          :row-key="row => row.staffId"
          striped
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { getDepartmentStaff } from '@/apis/management/dean.js';
import BaseButton from '@/components/Shared/BaseButton.vue';
import { useAuthStore } from '@/store/auth';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NDataTable, NDatePicker, NInput, NSelect, useMessage } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// Route & auth store
const route = useRoute();
const authStore = useAuthStore();
const departmentId = route.params.departmentId || authStore.departmentId;

// Filters
const searchQuery = ref('');
const selectedRole = ref(null);
const selectedStatus = ref(null);
const selectedDate = ref(null);

// Naive UI message
const message = useMessage();

// Filter options
const roleOptions = [
  { label: 'Exam Officer', value: 'Exam Officer' },
  { label: 'Level Advisor', value: 'Level Advisor' },
  { label: 'Department Adviser', value: 'Department Adviser' }
];

const statusOptions = [
  { label: 'Submitted', value: 'Submitted' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Approved', value: 'Approved' }
];

// Table columns
const columns = [
  { title: 'Staff ID', key: 'staffId' },
  { title: 'Name', key: 'name' },
  { title: 'Cadre', key: 'cadre' },
  { title: 'Rank', key: 'rank' },
  { title: 'Role', key: 'role' },
  { title: 'Employment Type', key: 'employmentType' },
  { title: 'Employment Date', key: 'employmentDate' }
];

// Staff data
const staffData = ref([]);

// Fetch staff data
const fetchStaff = async () => {
  if (!departmentId) {
    message.error('Department ID not found. Cannot fetch staff.');
    return;
  }

  try {
    const response = await getDepartmentStaff(departmentId);
    staffData.value = response.data;
  } catch (err) {
    message.error('Failed to load staff data.');
  }
};

// Filtered staff
const filteredStaff = computed(() => {
  return staffData.value.filter((staff) => {
    const matchesSearch = !searchQuery.value
      || staff.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      || staff.staffId.toLowerCase().includes(searchQuery.value.toLowerCase())
      || staff.role.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesRole = !selectedRole.value || staff.role === selectedRole.value;
    const matchesStatus = !selectedStatus.value || staff.status === selectedStatus.value;
    const matchesDate = !selectedDate.value || dayjs(staff.employmentDate).isSame(selectedDate.value, 'day');

    return matchesSearch && matchesRole && matchesStatus && matchesDate;
  });
});

// CSV export helper
const exportToCSV = (data) => {
  if (!data.length) {
    message.warning('No staff records to export.');
    return;
  }

  const headers = columns.map(c => c.title);
  const rows = data.map(row => columns.map(c => row[c.key]));

  const csvContent =
    [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `staff_records_${dayjs().format('YYYYMMDD')}.csv`);
  link.click();
  URL.revokeObjectURL(url);

  message.success('Staff records exported to CSV.');
};

// PDF export helper
const exportToPDF = (data) => {
  if (!data.length) {
    message.warning('No staff records to export.');
    return;
  }

  const doc = new jsPDF();
  const tableData = data.map(row => columns.map(c => row[c.key]));

  autoTable(doc, {
    head: [columns.map(c => c.title)],
    body: tableData,
    theme: 'grid',
  });

  doc.save(`staff_records_${dayjs().format('YYYYMMDD')}.pdf`);
  message.success('Staff records exported to PDF.');
};

// Export staff button
const exportStaffRecords = () => {
  exportToCSV(filteredStaff.value);
  exportToPDF(filteredStaff.value);
};

onMounted(fetchStaff);
</script>


