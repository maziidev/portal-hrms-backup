<template>
  <div class="px-2">
    <div>
      <h4 class="text-2xl font-black text-[#002347] italic mb-3 tracking-tighter">
        Department Records
      </h4>

      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div class="flex flex-1 max-w-md border border-gray-200 bg-white text-gray-400 rounded-lg p-3 space-x-4 focus-within:border-[#2388ff] transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by Department Name or HOD..."
            class="w-full outline-none focus:outline-none text-[#002347] font-semibold text-base"
          >
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
          <n-date-picker
            v-model:value="filters.date"
            type="month"
            placeholder="Month / Year"
            style="width: 200px"
            size="large"
            clearable
          />

          <n-select
            v-model:value="filters.leaveType"
            :options="leaveOptions"
            placeholder="Leave Type"
            style="width: 200px"
            size="large"
            clearable
          />

          <n-select
            v-model:value="filters.status"
            :options="statusOptions"
            placeholder="Status"
            style="width: 200px"
            size="large"
            clearable
          />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <n-data-table
        :columns="columns"
        :data="filteredData"
        :loading="loading"
        :scroll-x="1400"
        :bordered="false"
        class="premium-table"
      />
    </div>
  </div>
</template>

<script setup>
import { getVCDepartmentRecords } from "@/apis/management/vc";
import { useAuthStore } from "@/store/auth";
import { NDataTable, NDatePicker, NSelect, NTag, useMessage } from 'naive-ui';
import { computed, h, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const message = useMessage();

const searchQuery = ref('');
const loading = ref(false);
const departments = ref([]);

const filters = reactive({
  leaveType: null,
  status: null,
  date: null
});

const columns = [
  {
    title: 'Department',
    key: 'department_name',
    width: 250,
    render: (row) => h('span', { class: 'font-black text-[#002347] uppercase text-sm tracking-wider' }, row.department_name)
  },
  { title: 'HOD', key: 'hod_name', width: 250, render: (row) => row.hod_name || 'Not Assigned' },
  { title: 'Staff Count', key: 'total_staff', width: 150, align: 'center' },
  { title: 'Academic', key: 'academic_staff_count', width: 150, align: 'center' },
  { title: 'Non-Academic', key: 'non_academic_staff_count', width: 180, align: 'center' },
  { title: 'Active Appraisals', key: 'active_appraisals_count', width: 180, align: 'center' },
  { title: 'Pending Promotions', key: 'pending_promotions_count', width: 200, align: 'center' },
  {
    title: 'Status',
    key: 'status',
    width: 150,
    align: 'center',
    render(row) {
      const status = row.status || 'Active';
      const isReviewing = status.toLowerCase() === 'reviewing';
      return h(
        NTag,
        {
          bordered: false,
          type: isReviewing ? 'warning' : 'success',
          style: {
            fontWeight: '900',
            textTransform: 'uppercase',
            fontSize: '11px',
            padding: '12px 18px',
            borderRadius: '6px'
          }
        },
        { default: () => status }
      );
    }
  },
  {
    title: 'Action',
    key: 'actions',
    width: 120,
    fixed: 'right',
    align: 'center',
    render(row) {
      return h(
        'button',
        {
          onClick: () => {
            router.push({
              name: 'StaffRecord',
              params: { id: row.id }
            });
          },
          class: 'flex items-center justify-center space-x-2 bg-[#002347] hover:bg-[#2388ff] text-white px-4 py-2 rounded-lg transition-all duration-300 group'
        },
        [
          h('span', { class: 'font-bold text-xs uppercase tracking-widest' }, 'View'),
          h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '16',
            height: '16',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            class: 'group-hover:translate-x-1 transition-transform'
          }, [
            h('path', { d: 'M5 12h14' }),
            h('path', { d: 'm12 5 7 7-7 7' })
          ])
        ]
      );
    }
  }
];

const leaveOptions = [
  { label: 'Annual Leave', value: 'Annual' },
  { label: 'Maternity Leave', value: 'Maternity' },
  { label: 'Sick Leave', value: 'Sick' },
  { label: 'Study Leave', value: 'Study' }
];

const statusOptions = [
  { label: 'Active', value: 'Active' },
  { label: 'Reviewing', value: 'Reviewing' },
  { label: 'Completed', value: 'Completed' }
];

const loadData = async () => {
  const id = route.params.id || authStore.facultyId || authStore.user?.faculty_id || authStore.user?.staff?.faculty_id;
  if (!id) {
    message.warning("Faculty ID not found.");
    return;
  }

  loading.value = true;
  try {
    const res = await getVCDepartmentRecords(id);

    console.log("RAW API RESPONSE:", res.data);
    departments.value = (res.data.departments || []).map(d => ({
      id: d.id,
      department_name: d.name,
      hod_name: d.dept_hod,
      total_staff: d.staff_count,
      academic_staff_count: d.academic_staff_count || 0,       // backend adds this later
      non_academic_staff_count: d.non_academic_staff_count || 0, // backend adds this later
      active_appraisals_count: d.active_appraisals,
      pending_promotions_count: d.pending_promotions,
      status: d.status || 'Active'
    }));
    if (departments.value.length === 0) {
      message.info("No department records found.");
    }
  } catch (err) {
    message.error("Error loading records from server.");
  } finally {
    loading.value = false;
  }
};

const filteredData = computed(() => {
  return departments.value.filter(d => {
    const name = (d.department_name || '').toLowerCase();
    const hod = (d.hod_name || '').toLowerCase();
    const search = searchQuery.value.toLowerCase();
    const matchesSearch = name.includes(search) || hod.includes(search);

    const matchesStatus = !filters.status || d.status === filters.status;

    let matchesDate = true;
    if (filters.date && d.created_at) {
        const filterDate = new Date(filters.date);
        const recordDate = new Date(d.created_at);
        matchesDate = (filterDate.getMonth() === recordDate.getMonth() &&
                       filterDate.getFullYear() === recordDate.getFullYear());
    }

    return matchesSearch && matchesStatus && matchesDate;
  });
});

onMounted(loadData);
</script>

<style>
.premium-table.n-data-table {
  background-color: transparent;
}

.premium-table.n-data-table .n-data-table-th {
  background-color: #fafafa !important;
  font-weight: 900 !important;
  color: #002347 !important;
  text-transform: uppercase !important;
  font-size: 13px !important;
  letter-spacing: 0.1em !important;
  padding: 24px !important;
  border-bottom: 2px solid #f1f5f9 !important;
  border-radius: 0 !important;
  white-space: nowrap;
}

.premium-table.n-data-table .n-data-table-td {
  padding: 28px 24px !important;
  font-size: 15px !important;
  color: #374151 !important;
  border-bottom: 1px solid #f3f4f6 !important;
  background-color: #fff !important;
}

.premium-table.n-data-table .n-data-table-th--fixed-left,
.premium-table.n-data-table .n-data-table-td--fixed-left {
  position: static !important;
  left: auto !important;
}

.premium-table.n-data-table .n-data-table-tr:hover .n-data-table-td {
  background-color: #fbfcfe !important;
}
</style>