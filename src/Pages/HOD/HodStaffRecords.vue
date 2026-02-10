<template>
  <div class="relative">
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSideBar"
      class="absolute z-[2000] top-[20px] right-[20px] md:hidden lg:hidden
             px-[4px] rounded-sm font-[700] text-[30px]"
    >
      <i class="fa fa-bars"></i>
    </button>

    <div class="dashboard w-full min-h-screen">
      <!-- Sidebar -->
      <aside
        :class="[
          'w-[268px] sidebar z-[3000] transition-all duration-100 ease-in-out fixed top-0 left-0 h-screen px-[35px] py-[45px] bg-[var(--primary)] flex flex-col gap-[67px]',
          toggleState ? 'md:flex lg:flex' : 'hidden'
        ]"
      >
        <!-- Logo -->
        <div>
          <li class="flex items-center gap-2 font-[700] text-[16px] text-[rgba(14,253,193,1)]">
            Orbit <img :src="Orbit" />
          </li>
        </div>

        <!-- Navigation -->
        <div class="flex flex-col gap-[25px]">
          <li>
            <router-link
              to="/hod"
              class="flex items-center gap-2 text-[16px] text-[var(--pri-text)]"
            >
              <i class="fa fa-th-large"></i>
              Dashboard
            </router-link>
          </li>

          <li>
            <router-link
              to="/hod/staff-records"
              class="flex items-center gap-2 font-[700] text-[14px] text-[rgba(14,253,193,1)]"
            >
              <i class="fa fa-user-circle"></i>
              Staff Records
            </router-link>
          </li>

          <li>
            <router-link
              to="/hod/appraisal"
              class="flex items-center gap-2 text-[14px] text-[var(--pri-text)]"
            >
              <i class="fa fa-user-circle"></i>
              Appraisals
            </router-link>
          </li>

          <li class="nav-link">
            <i class="fa fa-bed"></i> Leave Management
          </li>

          <li class="nav-link">
            <i class="fa fa-award"></i> Promotions & Career Progression
          </li>

          <li class="nav-link">
            <i class="fa fa-calendar"></i> Retirement & Exit
          </li>

          <li>
            <router-link
              to="/hod/report-analysis"
              class="flex items-center gap-2 text-[14px] text-[var(--pri-text)]"
            >
              <i class="fa-solid fa-chart-column"></i>
              Reports & Analytics
            </router-link>
          </li>
        </div>

        <!-- Footer -->
        <div class="flex flex-col gap-[25px]">
          <li class="nav-link">
            <i class="fa fa-gear"></i> Settings
          </li>

          <li class="nav-link">
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </li>

          <li class="md:hidden flex items-center gap-[10px]">
            <i class="fa fa-bell"></i> Notification
          </li>

          <li class="md:hidden flex items-center gap-[10px]">
            <i class="fa fa-user text-xl"></i>
            <span class="break-words">Nnamdichuzu@edu.EU.ng</span>
          </li>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="relative ml-0 md:ml-[270px] lg:ml-[270px]">
        <!-- Header -->
        <header
          class="flex justify-between items-center px-[25px] py-[25px] bg-[var(--pri-bg)]"
        >
          <h2 class="bc">Staff Records</h2>

          <div class="hidden md:flex items-center gap-[10px]">
            <i class="fa fa-bell text-[var(--sec-text)]"></i>
            <i class="fa fa-user text-2xl"></i>
            <span>Nnamdichuzu@edu.EU.ng</span>
          </div>
        </header>

        <!-- Content -->
        <div class="main px-[25px] mt-[50px] flex flex-col gap-[40px]">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px]">
            <button
              v-for="btn in btns"
              :key="btn.name"
              @click="isActive(btn.name)"
              :class="[
                'rounded-[20px] h-[97px] shadow flex flex-col justify-center px-[25px]',
                activeState === btn.name
                  ? 'bg-[rgba(17,27,73,1)]'
                  : 'bg-white'
              ]"
            >
              <div class="flex justify-between items-center">
                <h2 class="text-[16px] text-[rgba(204,204,204,1)]">
                  {{ btn.name }}
                </h2>
                <h2
                  :class="[
                    'text-[34px] font-[700]',
                    activeState === btn.name
                      ? 'text-white'
                      : 'text-[var(--sec-text)]'
                  ]"
                >
                  {{ btn.value }}
                </h2>
              </div>
            </button>
          </div>

          <!-- Staff Table -->
          <div class="w-full overflow-x-auto mt-3">
            <n-data-table
              :columns="columns"
              :data="staffData"
              :loading="loading"
              :bordered="false"
              :scroll-x="1200"
              :pagination="pagination"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { h, onMounted, reactive, ref } from "vue";
import { useMessage } from "naive-ui";

import Orbit from "@/assets/imgs/Orbit.png";
import { exportStaff, getAllStaff } from "@/apis/admin.js";
import { getStaffSummary } from "@/apis/hod.js";

/* ---------------- State ---------------- */

const message = useMessage();
const toggleState = ref(false);
const loading = ref(false);
const activeState = ref(null);

const staffData = ref([]);
const staffSummaryData = ref(null);

const data = reactive({
  dept_code: null,
  employment_type: null,
  status: null,
  date: null,
  search: null,
});

/* ---------------- Buttons ---------------- */

const btns = reactive([
  { name: "Active Staff", value: 0 },
  { name: "On Probation", value: 0 },
  { name: "On Study Leave", value: 0 },
  { name: "Retired", value: 0 },
]);

/* ---------------- Methods ---------------- */

const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const isActive = (name) => {
  activeState.value = name;
};

const fetchStaffSummary = async () => {
  try {
    const res = await getStaffSummary();
    staffSummaryData.value = res;

    btns[0].value = res.staff_stats.active_staff;
    btns[1].value = res.staff_stats.on_probation;
    btns[2].value = res.staff_stats.on_study_leave;
    btns[3].value = res.staff_stats.retired_staff;
  } catch {
    message.error("Staff Summary could not be fetched");
  }
};

const fetchStaffData = async () => {
  loading.value = true;
  try {
    staffData.value = await getAllStaff(data);
  } catch {
    message.error("Staff data could not be fetched");
  } finally {
    loading.value = false;
  }
};

/* ---------------- Lifecycle ---------------- */

onMounted(() => {
  activeState.value = btns[0].name;
  fetchStaffSummary();
  fetchStaffData();
});

/* ---------------- Table ---------------- */

const columns = [
  { title: "Staff ID", key: "id" },
  { title: "Full Name", key: "full_name" },
  { title: "Position", key: "position" },
  { title: "Rank", key: "rank" },
  {
    title: "Role",
    key: "role",
    render(row) {
      return h(
        "span",
        { class: "text-blue-600 cursor-pointer" },
        row?.staff_roles?.[0]?.role || "N/A"
      );
    },
  },
  { title: "Employment Type", key: "employment_type" },
  { title: "Employment Date", key: "date_of_employment" },
];

const pagination = {
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--pri-text);
  font-size: 14px;
}
</style>
