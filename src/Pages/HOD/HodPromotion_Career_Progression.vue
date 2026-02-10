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
                to="/hod"
                class="text-[var(--pri-text)] cursor-pointer font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/research-publication"
                class="text-[var(--pri-text)] cursor-pointer font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Research &
                Publication</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/appraisal"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
                to="/hod/leave-management"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/promotion-career-progression"
                class="text-[rgba(14,253,193,1)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/retirement-exit"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-calendar"></i> Retirement & Exit</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/report-analysis"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
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
              <h2 class="bc mb-[7px]">Welcome back, Prof. Adebayo</h2>
              <h5 class="sbc">Head of Department (Economics)</h5>
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
          <div class="">
            <div
              class="flex justify-between gap-[20px] flex-wrap md:flex-nowrap"
            >
              <div class="session flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16">Session</div>
                <div class="date mbc">2024/2025</div>
              </div>
              <div class="semester flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16" @click="openPromotionReview">Semester</div>
                <div class="date mbc">First</div>
              </div>
              <div class="semester flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16">28th September 2025</div>
                <div class="date mbc flex items-center gap-5">
                  <i class="fa fa-clock"></i><span>6:45 AM</span>
                </div>
              </div>
            </div>
          </div>
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

          <!-- Average Years-in-Rank And Promotion Rate by Rank -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px] items-center">
            <div class="overview_metrics">
              <div class="top">
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
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
            <div class="leave_category_distribution">
              <div
                class="top flex flex justify-between w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Promotion Rate by Rank
                </h2>
                <div
                  class="flex leave_category_distribution switch_bar > border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    v-for="promotion_rate_by_rank in promotion_rate_by_ranks"
                    :key="promotion_rate_by_rank.name"
                    @click="
                      switchPromotionRateByRank(promotion_rate_by_rank.name)
                    "
                    :id="promotion_rate_by_rank.name"
                    :class="[
                      `active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
                      promotion_rate_by_rank.name ===
                      isActivePromotionRateByRank
                        ? `bg-[rgba(35,136,255,1)] !text-[rgba(247,249,250,1)]`
                        : `text-[rgba(30,30,30,1)]`,
                    ]"
                  >
                    {{ promotion_rate_by_rank.name }}
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

          <!-- Quick Actions -->
          <div class="quick_actions flex flex-col gap-[15px]">
            <h2
              class="text-[rgba(30,43,58,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Quick Actions
            </h2>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-white gap-[15px]"
            >
              <router-link
                to="/hod/promotion-summary"
                class="flex items-center gap-[10px] px-[40px] py-[15px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fas fa-file-text text-[rgba(255,255,255,1)]"></i>

                View Promotion Summary
              </router-link>

              <button
                class="flex items-center px-[40px] py-[15px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i
                  class="fas fa-arrow-up-from-bracket text-[rgba(255,255,255,1)]"
                ></i>

                Export Summary (PDF)
              </button>
            </div>
          </div>
          <!-- Upcoming Retirements -->
          <form class="pending_requests w-full mb-5" @submit.prevent="">
            <div
              class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[30px]"
            >
              <div
                class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
              >
                <h2
                  class="font-[700] w-[300px] text-[var(--sec-text)] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Promotion Requests Overview
                </h2>
                <n-input
                  type="search"
                  name="search"
                  placeholder="Search for anything..."
                  id="search"
                  :bordered="false"
                  v-model:value="form.search"
                  class="search !w-[300px] border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
                />
              </div>
              <div
                class="right grid grid-cols-1 w-full md:w-[40%] items-center gap-[15px] flex-wrap lg:grid-cols-3 md:grid-cols-3"
              >
                <n-select
                  :options="unitOptions"
                  clearable
                  v-model:value="form.cadre"
                  name="cadre"
                  id="cadre"
                  placeholder="Cadre"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>

                <n-select
                  clearable
                  v-model:value="form.year"
                  name="year"
                  placeholder="Year"
                  :options="years"
                  id="year"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  clearable
                  v-model:value="form.status"
                  name="status"
                  :options="statusOptions"
                  placeholder="Status"
                  id="status"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
              </div>
            </div>
            <div class="w-full overflow-hidden mt-3">
              <div class="overflow-x-auto">
                <n-data-table
                  :columns="columns"
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
          <PromotionReview
            :show
            @closePromotionReview="closePromotionReview"
            @openPromotionRequestDetails="openPromotionRequestDetails"
          />
          <PromotionRequestDetails
            :show1
            @closePromotionRequestDetails="closePromotionRequestDetails"
            @openPromotionReview="openPromotionReview"
            @openPromotionEvaluationSummary_Decision="openPromotionEvaluationSummary_Decision"
          />

          <PromotionEvaluationSummary_Decision
            :show2
            @closePromotionEvaluationSummary_Decision="closePromotionEvaluationSummary_Decision"
            @openPromotionRequestDetails="openPromotionRequestDetails"
          />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import PromotionReview from "@/components/HodComponents/PromotionReview.vue";
import PromotionRequestDetails from "@/components/HodComponents/PromotionRequestDetails.vue";
import PromotionEvaluationSummary_Decision from "@/components/HodComponents/PromotionEvaluationSummary_Decision.vue";

import Orbit from "@/assets/imgs/Orbit.png";

const form = reactive({
  year: null,
  type: null,
  status: null,
});

const activeState = ref(null);
function isActive(id) {
  activeState.value = id;
  console.log(id);
}
const btns = reactive([
  { name: "Pending Promotions", value: 3 },
  { name: "Endorsed Promotions", value: 12 },
  { name: "Rejected Requests", value: 5 },
  { name: "Promotions Completed", value: 10 },
]);

const show = ref(false);
function openPromotionReview() {
  show.value = true;
}
function closePromotionReview() {
  show.value = false;
  ("Working now...");
}

const show1 = ref(false);
function openPromotionRequestDetails() {
  show1.value = true;
  show.value = false;
  console.log("Working...");
}
function closePromotionRequestDetails() {
  show1.value = false;
}

const show2 = ref(false);
function openPromotionEvaluationSummary_Decision() {
  show2.value = true;
  show1.value = false;
}
function closePromotionEvaluationSummary_Decision() {
  show2.value = false;
}

const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];
const years = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];
let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status Two",
  },
]);

const isActivePromotionRateByRank = ref(null);

let promotion_rate_by_ranks = reactive([
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
    name: "Average Years-in-Rank",
    data: [64, 64, 76, 78, 70, 70, 50, 55],
  },
]);

const horizontalChartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "PROFESSOR",
      "READER",
      "SENIOR LECTURER",
      "LECTURER I",
      "LECTURER II",
      "ASSISTANT LECTURER",
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
  week: [30, 45, 60, 25, 50],
  month: [45, 55, 65, 40, 60],
  year: [25, 35, 50, 20, 40],
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
      "Assistant Lecturer",
      "Professor",
      "Lecturer I",
      "Lecturer II",
      "Reader",
    ],
  },
  colors: ["#e9edf7"],
});

function switchPromotionRateByRank(state) {
  isActivePromotionRateByRank.value = state;
  console.log();

  series_1.value[0].data = verticalChartDataSets[state.toLowerCase()];
}

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

onMounted(() => {
  activeState.value = btns[0].name;
  series_1.value[0].data = verticalChartDataSets["week"];
});

// Define table columns
const columns = [
  {
    title: "Staff ID",
    key: "staff_id",
    render(row) {
      return h(
        "a",
        {
          class: "text-blue-600 hover:underline font-semibold cursor-pointer",
          onClick: () => router.push(`/home/edit/${row.id}`),
        },
        row.id
      );
    },
  },
  { title: "Name ", key: "name  " },
  { title: "Current Rank ", key: "current_rank  " },
  { title: "Requested Rank ", key: "requested_rank  " },
  { title: "Promoted To", key: "promoted_to " },
  { title: "Date submitted", key: "date_submitted " },

  {
    title: "Status ",
    key: "status ",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "Endorsed"
              ? "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)] w-[120px]"
              : row.is_active == "Sent to Dean"
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
          style:
            "bg-[rgba(35,136,255,1)] view text-[rgba(255,255,255,1)] font-[700] text-[11px] w-full py-[20px] px-[20px] rounded-[5px]",
          onClick: () => openAcademicStaffApplicationTrackingForPromotion(),
        },
        ["View"]
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
