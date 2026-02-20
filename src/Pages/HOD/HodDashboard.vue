<template>
  <div class="relative">
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSideBar"
      class="absolute md:hidden lg:hidden z-[2000] font-bold text-2xl top-5 right-5 px-1 py-1 rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>

    <div class="dashboard w-full min-h-screen">
      <!-- Sidebar -->
      <aside
        :class="[
          'w-[268px] sidebar z-[3000] transition-all duration-100 ease-in-out fixed top-0 left-0 h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]',
          !toggleState ? 'hidden' : 'md:flex lg:flex'
        ]"
      >
        <!-- Logo -->
        <div>
          <li class="text-[rgba(14,253,193,1)] font-bold text-[20px] flex items-center gap-2">
            Orbit <img :src="Orbit" />
          </li>
        </div>

        <!-- Navigation Links -->
        <div class="flex flex-col gap-[25px]">
          <li>
            <router-link to="/hod" class="sidebar-link active">
              <i class="fa fa-th-large"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/hod/staff-records" class="sidebar-link">
              <i class="fa fa-user-circle"></i> Staff Records
            </router-link>
          </li>
          <li>
            <router-link to="/hod/appraisal" class="sidebar-link">
              <i class="fa fa-file-text"></i> Appraisals
            </router-link>
          </li>
          <li>
            <router-link to="/hod/leave-management" class="sidebar-link">
              <i class="fa fa-bed"></i> Leave Management
            </router-link>
          </li>
          <li>
            <router-link to="/hod/promotion-career-progression" class="sidebar-link">
              <i class="fa fa-award"></i> Promotions & Career Progression
            </router-link>
          </li>
          <li>
            <router-link to="/hod/retirement-exit" class="sidebar-link">
              <i class="fa fa-calendar"></i> Retirement & Exit
            </router-link>
          </li>
          <li>
            <router-link to="/hod/report-analysis" class="sidebar-link">
              <i class="fa-solid fa-chart-column"></i> Reports & Analytics
            </router-link>
          </li>
        </div>

        <!-- Bottom Sidebar Links -->
        <div class="flex flex-col gap-[25px]">
          <li>
            <a href="#" class="sidebar-link">
              <i class="fa fa-gear"></i> Settings
            </a>
          </li>
          <li>
            <a href="#" class="sidebar-link">
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </a>
          </li>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="lg:ml-[270px] md:ml-[270px] ml-0 min-w-screen relative">
        <!-- Header -->
        <header class="bg-[var(--pri-bg)] py-6 px-6 flex justify-between items-center">
          <div class="w-[70%]">
            <h2 class="text-lg font-bold">Welcome back, Prof. Adebayo</h2>
            <h5 class="text-sm text-gray-400">Head of Department (Economics)</h5>
          </div>
          <div class="hidden md:flex lg:flex items-center gap-2">
            <i class="fa fa-bell text-[var(--sec-text)]"></i>
            <i class="fa fa-user text-2xl"></i>
            <div class="user-id mbc">Nnamdichuzu@edu.EU.ng</div>
          </div>
        </header>

        <!-- Stats Cards -->
        <div class="main px-6 mt-12 flex flex-col gap-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="card in statsCards" :key="card.title" class="bg-white p-4 rounded-2xl shadow flex flex-col gap-4">
              <h4 class="text-blue-500 font-semibold">{{ card.title }}</h4>
              <p class="text-gray-500 text-sm">{{ card.description }}</p>
              <h2 class="text-lg font-bold">{{ card.value }}</h2>
            </div>
          </div>

          <!-- Appraisal Progress Chart -->
          <div class="bg-white p-6 rounded-2xl shadow">
            <h2 class="font-semibold text-lg mb-4">Appraisal Progress</h2>
            <apexchart type="donut" height="250" :options="pieChartOptions" :series="pieSeries" />
          </div>

          <!-- Recent Activities -->
          <div class="bg-white p-6 rounded-2xl shadow">
            <h2 class="font-bold text-lg mb-4">Recent Activities</h2>
            <ul class="flex flex-col gap-4">
              <li v-for="activity in recentActivities" :key="activity.id" class="flex justify-between">
                <span class="flex gap-2 items-center">
                  <span class="w-2 h-10 rounded bg-blue-600"></span>
                  {{ activity.title }}
                </span>
                <span class="text-gray-400 text-sm">{{ activity.date }}</span>
              </li>
            </ul>
          </div>

          <!-- Pending Appraisals Table -->
          <form class="pending_requests w-full mb-5">
            <div class="top flex justify-between flex-wrap md:flex-nowrap gap-4 mb-3">
              <h2 class="font-bold text-lg">Pending Appraisals</h2>
              <n-input
                type="search"
                v-model:value="form.search"
                placeholder="Search..."
                class="w-1/2 rounded border border-gray-200"
              />
            </div>
            <n-data-table
              :columns="columns"
              :data="pendingAppraisals"
              :loading="loading"
              :pagination="pagination"
              :bordered="false"
            />
          </form>

          <!-- Pending Staff Requests Table -->
          <form class="w-full mb-5">
            <div class="top flex justify-between flex-wrap md:flex-nowrap gap-4 mb-3">
              <h2 class="font-bold text-lg">Pending Staff Requests</h2>
              <n-input
                type="search"
                v-model:value="form.search"
                placeholder="Search..."
                class="w-1/2 rounded border border-gray-200"
              />
            </div>
            <n-data-table
              :columns="pending_requests_column"
              :data="pendingRequests"
              :loading="loading"
              :pagination="pagination"
              :bordered="false"
            />
          </form>

          <!-- Modals -->
          <AddNewStaff :show2="show2" @CloseModalForAddNewStaff="CloseAddNewStaffModal" />
          <OpenAppraisal1
            :show1="show1"
            @CloseModalForOpenAppriasal1="CloseAppriasalModal1"
            @OpenAppraisalModal2="OpenAppriasalModal2"
          />
          <OpenAppraisal2 :show4="show4" @CloseModalForOpenAppriasal2="CloseAppriasalModal2" />
          <GenerateReport :show3="show3" @CloseModalForGenerateReport="CloseGenerateModal" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AddNewStaff from "@/components/AdminComponents/AddNewStaff.vue";
import GenerateReport from "@/components/AdminComponents/GenerateReport.vue";
import OpenAppraisal1 from "@/components/AdminComponents/OpenAppraisal1.vue";
import OpenAppraisal2 from "@/components/AdminComponents/OpenAppraisal2.vue";
import { computed, reactive, ref } from "vue";

// Sidebar toggle
const toggleState = ref(false);
const toggleSideBar = () => (toggleState.value = !toggleState.value);

// Form for filters
const form = reactive({
  search: "",
  status: null,
  category: null,
});

// Pie chart
const pieSeries = ref([25, 75]);
const labels = ["Pending", "Staff Appraised"];
const pieChartOptions = computed(() => ({
  chart: { type: "donut", toolbar: { show: true } },
  labels,
  colors: ["#2388ff", "#2b07ed"],
  legend: { show: false },
  plotOptions: {
    pie: { donut: { size: "58%", labels: { show: false } }, expandOnClick: true },
  },
}));

// Example reactive data from API
const statsCards = ref([
  { title: "Total Department Staff", description: "All staff in department", value: 23458 },
  { title: "Active Appraisal Cycle", description: "In Progress", value: 1 },
  { title: "Appraisals in Progress", description: "Ongoing sessions", value: 18 },
  { title: "Pending Requests", description: "Leave & promotion requests", value: 6 },
]);

const recentActivities = ref([
  { id: 1, title: "Started 2025 Annual Appraisal Cycle", date: "Today, 03:00 PM" },
  { id: 2, title: "Approved leave request for Mr. John Yusuf", date: "Sept 20, 03:00 PM" },
  { id: 3, title: "Endorsed promotion for Dr. Grace Bello", date: "Sept 18, 03:00 PM" },
]);

// Tables
const pendingAppraisals = ref([]);
const pendingRequests = ref([]);
const loading = ref(false);
const pagination = { showSizePicker: true, pageSizes: [5, 10, 20] };

// Columns
const columns = [
  { title: "Staff Name", key: "staff_name" },
  { title: "Category", key: "category" },
  { title: "Last Updated", key: "last_updated" },
  { title: "Status", key: "status" },
];

const pending_requests_column = [
  { title: "Staff Name", key: "staff_name" },
  { title: "Request Type", key: "request_type" },
  { title: "Submitted", key: "submitted" },
  { title: "Status", key: "status" },
];

// Modal state
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);

function CloseAppriasalModal1() { show1.value = false; }
function OpenAppriasalModal2() { show4.value = true; }
function CloseAppriasalModal2() { show4.value = false; }
function CloseAddNewStaffModal() { show2.value = false; }
function CloseGenerateModal() { show3.value = false; }
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 400;
  font-size: 14px;
  color: var(--pri-text);
}
.sidebar-link.active {
  font-weight: 700;
  color: rgba(14,253,193,1);
}
</style>
