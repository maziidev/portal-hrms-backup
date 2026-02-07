<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-[2000] font-bold text-[30px] top-[20px] right-[20px] px-[4px] py-[-2px] rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen">
      <div class=" ">
        <aside
          :class="[
            `{ w-67 sidebar z-3000 transition-all duration-100 ease-in-out  fixed top-0 left-0 h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]`,
            !toggleState ? `hidden` : `md:flex lg:flex`,
          ]"
        >
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-bold text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-[25px]">
            <li>
              <router-link
                to="/hod"
                class="text-(--pri-text) cursor-pointer font-normal flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/staff-records"
                class="text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/appraisal"
                class="text-(--pri-text) font-bold text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
                to="/hod/leave-management"
                class="text-[rgba(14,253,193,1)] font-bold text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-bed"></i> Leave Management</router-link
              >
            </li>
            <li>
              <a
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career Progression</a
              >
            </li>
            <li>
              <a
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-calendar"></i> Retirement & Exit</a
              >
            </li>
            <li>
              <router-link
                to="/hod/report-analysis"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="Report_Analysis.html"
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Analytics</router-link
              >
            </li>
          </div>

          <div class="flex flex-col gap-[25px]">
            <li>
              <a
                class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa fa-gear"></i> Settings</a
              >
            </li>
            <li>
              <a
                class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa-solid fa-right-from-bracket"></i> Logout</a
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <i class="fa fa-bell text-(--pri-text)"></i>
              <span
                class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%]"
                >Notification</span
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <div class="user">
                <i class="fa fa-user text-xl text-(--pri-text)"></i>
              </div>
              <div class="user-id mbc text-(--pri-text) break-words">
                Nnamdichuzu@edu.EU.ng
              </div>
            </li>
          </div>
        </aside>
      </div>
      <main class="lg:ml-[270px] md:ml-[270px] ml-[0px] min-w-screen relative">
        <div class="header">
          <header
            class="bg-[var(--pri-bg)] py-[25px] items-center px-[25px] w-[] top-0 flex justify-between"
          >
            <div class="flex items-center gap-[10px]">
              <router-link
                to="/hod/leave-management"
                class="flex items-center gap-[10px]"
              >
                <i class="fas fa-chevron-left"></i>

                <span
                  class="rgba(107,114,128,1) font-normal text-[14px] leading-[100%] tracking-[0%]"
                  >Back</span
                > </router-link
              ><span
                class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-bold"
                >Active Leaves</span
              >
            </div>
            <div class="md:flex lg:flex items-center gap-[10px] hidden">
              <i class="fa fa-bell text-(--sec-text)"></i>
              <div class="user">
                <i class="fa fa-user text-2xl"></i>
              </div>
              <div class="user-id mbc">Nnamdichuzu@edu.EU.ng</div>
            </div>
          </header>
        </div>

        <div class="main px-[25px] mt-[50px] flex flex-col gap-[40px]">
          <div class="">
            <div class="flex justify-between items-center gap-[10px]">
              <div class="flex items-center gap-2">
                <h2
                  class="text-[rgba(163,174,208,1)] font-[500] text-[16px] leading-[120%] tracking-[-2%]"
                >
                  Monitor who’s currently on leave and their acting substitutes
                </h2>
              </div>

              <div class="semester flex items-center gap-[10px]">
                <a href="#"
                  ><i
                    class="fa fa-ellipsis-h text-[rgba(152,159,176,1)] text-[40px]"
                  ></i
                ></a>
              </div>
            </div>
          </div>

          <form class="w-full mb-5">
            <div
              class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[10px]"
            >
              <div
                class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
              >
                <h2
                  class="font-bold text-(--sec-text) w-62.5 text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Currently Active Leaves
                </h2>
                <div class="relative w-[50%]">
                  <div class="h-full absolute left-[10px] flex items-center">
                    <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
                  </div>
                  <n-input
                    type="search"
                    name="search"
                    placeholder="Search by name or staff ID"
                    id="search"
                    :bordered="false"
                    v-model:value="form.search"
                    class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
                  />
                </div>
              </div>
              <div
                class="right grid grid-cols-3 gap-[20px] md:w-[50%] w-full lg:grid-cols-3 md:grid-cols-3"
              >
                <n-select
                  name="leave_type"
                  id="leave_type"
                  v-model:value="form.leave_type"
                  :options="leaveTypes"
                  clearable
                  :bordered="true"
                  placeholder="Leave Type"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.remaining_day"
                  :options="remainingDays"
                  clearable
                  :bordered="true"
                  name="remaining_days"
                  id="remaining_days"
                  placeholder="Remaining Days"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.status"
                  :options="statusOptions"
                  clearable
                  :bordered="true"
                  name="status"
                  id="status"
                  placeholder="Status"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
              </div>
            </div>
            <div class="w-full overflow-hidden mt-3">
              <div class="overflow-x-auto">
                <n-data-table
                  :columns="columns"
                  :data="data"
                  :loading="loading"
                  :bordered="false"
                  :scroll-x="1200"
                  :pagination="pagination"
                />
              </div>
            </div>
          </form>
        </div>
        <form action="#" class="modals" @submit.prevent="">
          <StaffAppraisalForm
            :show
            @closeStaffAppraisalForm="closeStaffAppraisalForm"
            @openPerformanceEvaluation="openPerformanceEvaluation"
          />
          <PerformanceEvaluation
            :show1
            @closePerformanceEvaluation="closePerformanceEvaluation"
            @openTeachingResearch="openTeachingResearch"
          />
          <TeachingResearch
            :show2
            @closeTeachingResearch="closeTeachingResearch"
            @openConductDiscipline="openConductDiscipline"
          />
          <ConductDiscipline
            :show3
            @closeConductDiscipline="closeConductDiscipline"
            @openGoalsDevelopment="openGoalsDevelopment"
          />
          <GoalsDevelopment
            :show4
            @closeGoalsDevelopment="closeGoalsDevelopment"
            @openSummarySubmission="openSummarySubmission"
          />
          <SummaryAndSubmission
            :show5
            @closeSummarySubmission="closeSummarySubmission"
          />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h, computed } from "vue";
import Orbit from "@/assets/imgs/Orbit.png";
import StaffAppraisalForm from "@/components/HodComponents/StaffAppraisalForm.vue";
import SummaryAndSubmission from "@/components/HodComponents/SummaryAndSubmission.vue";
import GoalsDevelopment from "@/components/HodComponents/GoalsDevelopment.vue";
import ConductDiscipline from "@/components/HodComponents/ConductDiscipline.vue";
import TeachingResearch from "@/components/HodComponents/TeachingResearch.vue";
import PerformanceEvaluation from "@/components/HodComponents/PerformanceEvaluation.vue";

// Pie Chart
const pieSeries = ref([20, 7]);
const labels = ref(["Approved Leave", "Rejected Leaves"]);
const colors = ["rgba(35,136,255,1)", "rgba(43,7,237,1)"];

const pieChartOptions = computed(() => ({
  chart: {
    type: "donut",
    toolbar: { show: true },
    animations: { enabled: true },
    events: {
      // Example: click on a slice
      dataPointSelection: (event, chartContext, config) => {
        const idx = config.dataPointIndex;
        const label = labels.value[idx];
        const value = pieSeries.value[idx];
        // You can emit or handle this event as needed
        // console.log('Slice clicked:', { label, value })
      },
    },
  },
  labels: labels.value,
  colors,
  legend: { show: false },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { width: "100%" },
        legend: { position: "bottom" },
      },
    },
    {
      breakpoint: 1024,
      options: {
        chart: { width: 380 },
      },
    },
  ],
  tooltip: {
    y: {
      formatter: (val) => `${val}`, // format value text
    },
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
      donut: {
        size: "58%",
        labels: {
          show: false,
        },
      },
    },
  },
}));

const isActiveLeaveCategoryDistribution = ref(null);

let leave_category_distributions = reactive([
  {
    name: "Week",
  },
  {
    name: "Month",
  },
  {
    name: "Year",
  },
]);

const series = ref([
  {
    name: "Overview Metrics",
    data: [90, 70, 60, 80, 50],
  },
]);

const horizontalChartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "Total Leave Requests",
      "Pending Approvals",
      "Approved Leaves",
      "Rejected/Cancelled",
      "Ongoing Leaves",
    ],
  },
  colors: ["#2388ff"],
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
});

const verticalChartDataSets = reactive({
  week: [30, 45, 60, 25],
  month: [40, 65, 80, 15],
  year: [70, 25, 70, 55],
});

const series_1 = ref([
  {
    name: "Promotion Rate by Rank",
    data: verticalChartDataSets["week"],
  },
]);

const verticalChartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "Annual Leave",
      "Maternity Leave",
      "Study Leave",
      "Casual Leave",
    ],
  },
  colors: ["#e9edf7"],
});

// SET isActiveLeaveCategoryDistribution TO WEEK ON COMPONENT MOUNTS
isActiveLeaveCategoryDistribution.value = "Week";
function switchPromotionRateByRank(state) {
  isActiveLeaveCategoryDistribution.value = state;

  series_1.value[0].data = verticalChartDataSets[state.toLowerCase()];
}

const form = reactive({
  status: null,
  date: null,
  is_active: false,
  leave_type: null,
  remaining_day: null,
  search: "",
});
let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status Two",
  },
]);
let remainingDays = reactive([
  {
    label: "Month Year One",
    value: "Month Year One",
  },
]);
let leaveTypes = reactive([
  {
    label: "Computer science",
    value: "Computer science",
  },
  {
    label: "Electrical Engineering",
    value: "Electrical Engineering",
  },
]);

const show = ref(false);
function openStaffAppraisalForm() {
  show.value = true;
}
function closeStaffAppraisalForm() {
  show.value = false;
}

const show1 = ref(false);
function openPerformanceEvaluation() {
  show1.value = true;
  show.value = false;
  console.log("Working...");
}
function closePerformanceEvaluation() {
  show1.value = false;
}

const show2 = ref(false);
function openTeachingResearch() {
  show2.value = true;
  show1.value = false;
}
function closeTeachingResearch() {
  show2.value = false;
}

const show3 = ref(false);
function openConductDiscipline() {
  show3.value = true;
  show2.value = false;
}
function closeConductDiscipline() {
  show3.value = false;
}

const show4 = ref(false);
function openGoalsDevelopment() {
  show4.value = true;
  show3.value = false;
}
function closeGoalsDevelopment() {
  show4.value = false;
}

const show5 = ref(false);
function openSummarySubmission() {
  show5.value = true;
  show4.value = false;
}
function closeSummarySubmission() {
  show5.value = false;
}

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const columns = [
  { title: "Name", key: "name" },
  { title: "Leave Type", key: "leave_type" },
  { title: "Start Date", key: "start_date" },
  { title: "End Date", key: "end_date" },
  { title: "Remaining Days", key: "remaining_days" },
  { title: "Acting Officer", key: "acting_officer" },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
