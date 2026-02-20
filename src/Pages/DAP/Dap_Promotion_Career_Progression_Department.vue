<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-[2000] font-[700] text-[30px] top-[20px] right-[20px] px-[4px] py-[-2px] rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen">
      <div class=" ">
        <aside
          :class="[
            `{ w-[268px] sidebar z-[3000] transition-all duration-100 ease-in-out  fixed top-0 left-0 h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]`,
            !toggleState ? `hidden` : `md:flex lg:flex`,
          ]"
        >
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-[700] text-[20px] flex gap-2 items-center tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-[25px]">
            <li>
              <router-link
                to="/dap"
                class="text-[var(--pri-text)] cursor-pointer font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/staff-records"
                class="text-[var(--pri-text)] cursor-pointer font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/appraisal-management"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals Management
              </router-link>
            </li>
            <li>
              <router-link
                to="/dap/leave-analytics"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-bed"></i> Leave Analytics</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/promotion-career-progression"
                class="text-[rgba(14,253,193,1)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/publications-research-verification"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-file-text"></i> Publications & Research
                Verification</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/report-analysis"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="Report_Analysis.html"
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Analytics</router-link
              >
            </li>
          </div>

          <div class="flex flex-col gap-[25px]">
            <li>
              <a
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa fa-gear"></i> Settings</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa-solid fa-right-from-bracket"></i> Logout</a
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <i class="fa fa-bell text-[var(--pri-text)]"></i>
              <span
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                >Notification</span
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <div class="user">
                <i class="fa fa-user text-xl text-[var(--pri-text)]"></i>
              </div>
              <div class="user-id mbc text-[var(--pri-text)] break-words">
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
            <div class="w-[70%]">
              <h2 class="bc mb-[7px]" @click="openStaffAppraisalForm">
                Department Records
              </h2>
              <!-- <h5 class="sbc">Head of Department (Economics)</h5> -->
            </div>
            <div class="md:flex lg:flex items-center gap-[10px] hidden">
              <i class="fa fa-bell text-[var(--sec-text)]"></i>
              <div class="user">
                <i class="fa fa-user text-2xl"></i>
              </div>
              <div class="user-id mbc">Nnamdichuzu@edu.EU.ng</div>
            </div>
          </header>
        </div>

        <div class="main px-[25px] mt-[50px] flex flex-col gap-[40px]">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px]"
          >
            <button
              :class="[
                `rounded-[20px] box cursor-pointer h-[97px] shadow  flex flex-col justify-center gap-[24px] py-[20px] px-[25px]`,
                activeState == btn.name ? `bg-[rgba(17,27,73,1)]` : `bg-white `,
              ]"
              v-for="btn in btns"
              :key="btn"
              :id="btn.name"
              @click="isActive(btn.name)"
            >
              <div>
                <div class="flex justify-between items-center gap-3 w-full">
                  <h2
                    :class="[
                      `font-[500] text-[16px] text-[rgba(204,204,204,1)] leading-[120%] tracking-[-2%]`,
                    ]"
                  >
                    {{ btn.name }}
                  </h2>
                  <h2
                    :class="[
                      `text-[34px] font-[700] leading-[120%] tracking-[-2%]`,
                      activeState == btn.name
                        ? `text-[rgba(255,255,255,1)]`
                        : `text-[var(--sec-text)]`,
                    ]"
                  >
                    {{ btn.value }}
                  </h2>
                </div>
              </div>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-center">
            <div class="">
              <div class="top">
                <h2
                  class="text-[rgba(27,37,89,1)] text-left relative text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Average Years-in-Rank
                </h2>
              </div>
              <div class="horizontal-bar" id="horizontal-bar">
                <apexchart
                  type="bar"
                  height="350"
                  :options="horizontalChartOptions"
                  :series="series"
                />
              </div>
            </div>
            <div class="">
              <div
                class="top flex justify-between w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Promotion Rate by Department
                </h2>
                <div
                  class="flex switch_bar > border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    v-for="promotion_rate in promotionRates"
                    :key="promotion_rate.name"
                    @click="
                      switchPromotionTrend(promotion_rate.name.toLowerCase())
                    "
                    :id="promotion_rate.name"
                    :class="[
                      `active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
                      promotion_rate.name.toLowerCase() ===
                      isActiveAppraisalPerformanceTrend
                        ? `bg-[rgba(35,136,255,1)] !text-[rgba(247,249,250,1)]`
                        : `text-[rgba(30,30,30,1)]`,
                    ]"
                  >
                    {{ promotion_rate.name }}
                  </button>
                </div>
              </div>
              <div class="vertical-bar" id="vertical-bar">
                <apexchart
                  type="bar"
                  height="350"
                  :options="verticalChartOptions"
                  :series="series_1"
                />
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
                  class="font-[700] text-[var(--sec-text)] w-[200px] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Promotion Requests
                </h2>
                <div class="relative w-[50%]">
                  <div class="h-full absolute left-[10px] flex items-center">
                    <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
                  </div>
                  <n-input
                    type="search"
                    name="search"
                    placeholder="Search by name or  ID"
                    id="search"
                    :bordered="false"
                    v-model:value="form.search"
                    class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
                  />
                </div>
              </div>
              <div
                class="right grid grid-cols-2 gap-[20px] lg:grid-cols-3 md:grid-cols-3"
              >
                <n-select
                  name="department"
                  id="department"
                  v-model:value="form.department"
                  :options="departments"
                  clearable
                  :bordered="true"
                  placeholder="Department"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.month_year"
                  :options="monthsYearOptions"
                  clearable
                  :bordered="true"
                  name="status"
                  id="status"
                  placeholder="Month / Year"
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
                  class="cursor-pointer w-[200px] rounded-[10px] outline-none"
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
          <Promotion_Career_Progression_Staff_Appraisal
            :show="show"
            @closeStaffAppraisalForm="closeStaffAppraisalForm"
            @openPromotionAssessment="openPromotionAssessment"
          />
          <Promotion_Assessment
            :show1="show1"
            @closePromotionAssessment="closePromotionAssessment"
            @openStaffAppraisalForm="openStaffAppraisalForm"
          />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Orbit from "@/assets/imgs/Orbit.png";
import Promotion_Assessment from "@/components/DapComponents/Promotion_Assessment.vue";
import Promotion_Career_Progression_Staff_Appraisal from "@/components/DapComponents/Promotion_Career_Progression_Staff_Appraisal.vue";
const router = useRouter();
const form = reactive({
  status: null,
  department: null,
  is_active: false,
  month_year: null,
  search: "",
});
let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status Two",
  },
]);
let monthsYearOptions = reactive([
  {
    label: "March 2025",
    value: "March 2025",
  },
]);
let departments = reactive([
  {
    label: "Computer Science",
    value: "Computer Science",
  },
]);
const show = ref(false),
  show1 = ref(false);

function openStaffAppraisalForm() {
  show.value = true;
}
function closeStaffAppraisalForm() {
  show.value = false;
}
function openPromotionAssessment() {
  show1.value = true;
}
function closePromotionAssessment() {
  show1.value = false;
}
let promotionRates = reactive([
  {
    name: "2023",
  },
  {
    name: "2024",
  },
  {
    name: "2025",
  },
]);

const isActiveAppraisalPerformanceTrend = ref(null);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const series = ref([
  {
    name: "Average Years-in-Rank",
    data: [64, 64, 76, 78, 70, 70, 80, 85],
  },
]);

const horizontalChartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "Arts",
      "Agricultural Science",
      "Bioscience",
      "Business Admin",
      "Education",
      "Engineering",
      "Environmental Science",
      "Physical Science",
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
  2023: [23, 45, 55, 35, 67, 89, 45, 90],
  2024: [23, 75, 85, 35, 67, 40, 25, 70],
  2025: [53, 75, 35, 75, 87, 70, 95, 70],
});

const series_1 = ref([
  {
    name: "Promotion Rate by Department",
    data: [30, 45, 60, 25, 50, 55, 60, 70],
  },
]);

const verticalChartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "Arts",
      "Agricultural Science",
      "Bioscience",
      "Business Admin",
      "Education",
      "Engineering",
      "Environmental Science",
      "Physical Science",
    ],
  },
  colors: ["#e9edf7"],
});
const activeState = ref(null);

const btns = reactive([
  { name: "Total Appraisals", value: 24 },
  { name: "Pending Reviews", value: 4 },
  { name: "Approved Appraisals", value: 20 },
  { name: "Departments Reviewed", value: 4 },
]);

function isActive(id) {
  activeState.value = id;
  // console.log(id);
}
onMounted(() => {
  activeState.value = btns[0].name;
  isActiveAppraisalPerformanceTrend.value =
    promotionRates[0].name.toLowerCase();
  series_1.value[0].data =
    verticalChartDataSets[isActiveAppraisalPerformanceTrend.value];
});

function switchPromotionTrend(state) {
  isActiveAppraisalPerformanceTrend.value = state;
  series_1.value[0].data = verticalChartDataSets[state];
}

const columns = [
  { title: "Name", key: "name" },
  { title: "Department ", key: "department" },
  { title: "Current Rank", key: "current_rank" },
  { title: "Proposed Rank", key: "proposed_rank" },
  { title: "Years in Rank ", key: "years_in_rank " },
  { title: "Appraisal Avg. (%) ", key: "appraisal_avg" },
  { title: "Date Reviewed", key: "date_reviewed" },
  {
    title: "Status",
    key: "status",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "Approved"
              ? "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)] w-[120px]"
              : row.is_active == "Pending"
              ? "rounded-[22.5px] text-[rgba(234,67,53,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(234,67,53,0.2)]"
              : "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]",
        },
        row.is_active
      );
    },
  },
  {
    title: "Action ",
    key: "action",
    render(row) {
      h(
        "button",
        {
          style: "border-none outline-none",
          onClick: () => openStaffAppraisalForm,
        },
        [
          h("i", {
            class: "fa fa-ellipsis-h text-[rgba(152,159,176,1)] text-[40px]",
          }),
        ]
      );
    },
  },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
