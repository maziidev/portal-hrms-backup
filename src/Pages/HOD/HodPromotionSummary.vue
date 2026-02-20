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
        <div class="text-center p-[30px]">
          <h2
            class="text-[rgba(20,21,15,1)] font-[700] text-[24px] leading-[120%] tracking-[0%]"
          >
            Promotion Summary
          </h2>
        </div>

        <div class="main px-[25px] mt-[50px] flex flex-col gap-[40px]">
          <!-- Promotion Requests Overview -->
          <div class="pending_requests w-full">
            <div class="top flex justify-between items-center">
              <div
                class="left grid grid-cols-2 justify-between items-center gap-[10px] w-[50%]"
              >
                <h2
                  class="font-[700] text-[var(--sec-text)] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Promotion Report
                </h2>
              </div>
              <div
                class="flex switch_bar border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
              >
                <button
                  id="week"
                  class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                >
                  Week
                </button>
                <button
                  id="month"
                  class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                >
                  Month
                </button>
                <button
                  id="year"
                  class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                >
                  Year
                </button>
              </div>
            </div>
            <div class="w-full week-section overflow-hidden">
              <div class="overflow-x-auto">
                <table
                  class="min-w-full text-left whitespace-nowrap border-spacing-y-[20px] border-separate"
                >
                  <thead>
                    <tr class="p-5">
                      <th class="p-5">
                        Rank Transition <i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        No. of Staff <i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        Avg. Appraisal Score<i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        Avg. Years in Rank <i class="fa fa-caret-down"></i>
                      </th>

                      <th class="p-5">
                        Status <i class="fa fa-caret-down"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Assistant Lecturer → Lecturer II
                      </td>
                      <td class="p-5">2</td>
                      <td class="p-5">12/15</td>
                      <td class="p-5">3.5</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]"
                          >In Progress</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">5</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(58,151,76,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)]"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">4</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(107,114,128,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(107,114,128,0.2)]"
                          >Sent to Dean</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">4</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(35,136,255,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(35,136,255,0.15)]"
                          >Ongoing</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="w-full month-section hidden overflow-hidden">
              <div class="overflow-x-auto">
                <table
                  class="min-w-full text-left whitespace-nowrap border-spacing-y-[20px] border-separate"
                >
                  <thead>
                    <tr class="p-5">
                      <th class="p-5">
                        Rank Transition <i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        No. of Staff <i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        Avg. Appraisal Score<i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        Avg. Years in Rank <i class="fa fa-caret-down"></i>
                      </th>

                      <th class="p-5">
                        Status <i class="fa fa-caret-down"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Assistant Lecturer → Lecturer II
                      </td>
                      <td class="p-5">1</td>
                      <td class="p-5">12.5/15</td>
                      <td class="p-5">3.50</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]"
                          >In Progress</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">4</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(58,151,76,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)]"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">3</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">2</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(107,114,128,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(107,114,128,0.2)]"
                          >Sent to Dean</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">4</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(35,136,255,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(35,136,255,0.15)]"
                          >Ongoing</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="w-full year-section hidden overflow-hidden">
              <div class="overflow-x-auto">
                <table
                  class="min-w-full text-left whitespace-nowrap border-spacing-y-[20px] border-separate"
                >
                  <thead>
                    <tr class="p-5">
                      <th class="p-5">
                        Rank Transition <i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        No. of Staff <i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        Avg. Appraisal Score<i class="fa fa-caret-down"></i>
                      </th>
                      <th class="p-5">
                        Avg. Years in Rank <i class="fa fa-caret-down"></i>
                      </th>

                      <th class="p-5">
                        Status <i class="fa fa-caret-down"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Assistant Lecturer → Lecturer II
                      </td>
                      <td class="p-5">20</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">3.5</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]"
                          >In Progress</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">3</td>
                      <td class="p-5">11/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(58,151,76,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)]"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">4</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(107,114,128,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(107,114,128,0.2)]"
                          >Sent to Dean</span
                        >
                      </td>
                    </tr>
                    <tr class="rounded-[10px]">
                      <td class="p-5 staff-id cursor-pointer">
                        Lecturer II → Lecturer I
                      </td>
                      <td class="p-5">4</td>
                      <td class="p-5">10/15</td>
                      <td class="p-5">4</td>

                      <td class="p-5">
                        <span
                          class="rounded-[22.5px] text-[rgba(35,136,255,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(35,136,255,0.15)]"
                          >Ongoing</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="grid grid-cols-1 mt-[10px] bg-white gap-[15px]">
              <div
                class="flex items-center h-[45px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5"
              >
                <i
                  class="fas fa-arrow-up-from-bracket text-[rgba(255,255,255,1)]"
                ></i>
                <a
                  download="download"
                  class="text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  Export Promotion Summary Report
                </a>
              </div>
            </div>
          </div>

          <div
            class="bg-[var(--twhite)] md:p-[20px lg:p-[20px] shadow-sm border-b mb-[10px] border-slate-100 gap-[10px] flex flex-col justify-between"
          >
            <div
              class="flex p-[10px] justify-between border-b border-[rgba(240,240,240,1)]"
            >
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
              >
                Notifications
              </h2>
              <p
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                4
              </p>
            </div>
            <div class="flex flex-col gap-[30px] p-[20px]">
              <h2
                class="text-[rgba(27,37,89,1)] my-[10px] font-[700] text-[20px] leading-[120%]"
              >
                Recent Activities
              </h2>
              <div class="flex justify-between items-center gap-[10px]">
                <div
                  class="flex justify-between gap-[10px] items-center w-full"
                >
                  <div class="flex gap-4 items-center">
                    <span
                      class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Promotion for Lecturer I → Senior Lecturer endorsed and
                      sent to Dean
                    </h2>
                  </div>
                  <p
                    class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                  >
                    Today, 03:00 PM
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center gap-[10px]">
                <div
                  class="flex justify-between gap-[10px] items-center w-full"
                >
                  <div class="flex gap-4 items-center">
                    <span
                      class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      New promotion request from Dr. Helen Eze awaiting review
                    </h2>
                  </div>
                  <p
                    class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                  >
                    Sept 20, 03:00 PM
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center gap-[10px]">
                <div
                  class="flex justify-between gap-[10px] items-center w-full"
                >
                  <div class="flex gap-4 items-center">
                    <span
                      class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Promotion request for Dr. Iweala Nkem returned for
                      corrections.
                    </h2>
                  </div>
                  <p
                    class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                  >
                    Sept 18, 03:00 PM
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center gap-[10px]">
                <div
                  class="flex justify-between gap-[10px] items-center w-full"
                >
                  <div class="flex gap-4 items-center">
                    <span
                      class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Promotion request for Dr. Iweala Nkem returned for
                      corrections.
                    </h2>
                  </div>
                  <p
                    class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                  >
                    Sept 12, 03:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import ApplyForPromotion from "@/components/AcademicStaffComponents/ApplyForPromotion.vue";
import AcademicStaffApplicationTracking from "@/components/AcademicStaffComponents/AcademicStaffApplicationTracking.vue";
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
// Show Modals
const show = ref(false);
const show1 = ref(false);
function closeApplyForPromotion() {
  show.value = false;
}
function openApplyForPromotion() {
  show.value = true;
}
function openAcademicStaffApplicationTrackingForPromotion() {
  show1.value = true;
}
function closeAcademicStaffApplicationTrackingForPromotion() {
  show1.value = false;
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
    title: "Year",
    key: "year",
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
  { title: "Previous Rank ", key: "previous_rank  " },
  { title: "Promoted To", key: "promoted_to " },
  { title: "Date Approved", key: "date_approved " },

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
