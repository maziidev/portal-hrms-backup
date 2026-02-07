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
              <h2 class="bc mb-[7px]">Appraisal Management</h2>
              <h5 class="sbc">
                Manage, review, and forward staff appraisal records for the
                current cycle
              </h5>
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
                <div class="s16">Semester</div>
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
          <div class="grid lg:grid-cols-[1fr_2fr] grid-cols-1 gap-[25px]">
            <div
              class="bg-[var(--twhite)] p-[12px] w-full shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div
                class="rounded-[17px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[20px] py-[20px] px-[20px]"
              >
                <div class="flex items-center justify-between flex-wrap">
                  <h4 class="text-[rgba(141,193,255,1)] mbs">
                    Total Promotion Applications
                  </h4>
                </div>
                <div class="flex justify-between items-center gap-3">
                  <div class="">
                    <h2
                      class="text-[rgba(255,255,255,1)] text-[14px] font-[500] leading-[120%] tracking-[-2%]"
                    >
                      318
                    </h2>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-[20px]">
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Approved Promotions
                    </h2>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      255
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-[rgba(255,255,255,1)] flex flex-col justify-between px-[12px] py-[15px] border border-[rgba(141,193,255,0.27)] w-full"
            >
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[25px]"
              >
                <div class="flex items-center justify-between gap-[10px]">
                  <div class="flex items-center gap-[10px]">
                    <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      Pending Applications
                    </h2>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-[rgba(58,151,76,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                      >47
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-[10px]">
                  <div class="flex items-center gap-[10px]">
                    <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      Rejected Applications
                    </h2>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                      >16</span
                    >
                  </div>
                </div>
                <div class="flex items-center justify-between gap-[10px]">
                  <div class="flex items-center gap-[10px]">
                    <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      Average Time to Decision
                    </h2>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-[rgba(58,151,76,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                      >21
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-[10px]">
                  <div class="flex items-center gap-[10px]">
                    <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      Promotion Success Rate
                    </h2>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                      >80.2%</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-center">
            <div class="leave_category_distribution">
              <div
                class="top flex justify-between w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Promotion Trends Over 3 Years
                </h2>
                <div
                  class="flex leave_category_distribution switch_bar > border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    v-for="promotion_trend in promotionTrends"
                    :key="promotion_trend.name"
                    @click="
                      switchPromotionTrend(promotion_trend.name.toLowerCase())
                    "
                    :id="promotion_trend.name"
                    :class="[
                      `active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
                      promotion_trend.name.toLowerCase() ===
                      isActiveAppraisalPerformanceTrend
                        ? `bg-[rgba(35,136,255,1)] !text-[rgba(247,249,250,1)]`
                        : `text-[rgba(30,30,30,1)]`,
                    ]"
                  >
                    {{ promotion_trend.name }}
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
            <div class="overview_metrics">
              <div class="top">
                <h2
                  class="text-[rgba(27,37,89,1)] text-center relative text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Promotion Approval Rate by Faculty
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
          </div>
          <form class="w-full mb-5">
            <div
              class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[10px]"
            >
              <div
                class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
              >
                <h2
                  class="font-[700] text-[var(--sec-text)] w-[270px] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Faculty Appraisal Overview
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
                class="right grid grid-cols-2 gap-[20px] lg:grid-cols-2 md:grid-cols-2"
              >
                <n-select
                  v-model:value="form.faculty"
                  :options="faculties"
                  clearable
                  :bordered="true"
                  name="faculty"
                  id="faculty"
                  placeholder="Faculty"
                  class="cursor-pointer w-[200px] rounded-[10px] outline-none"
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
        <form action="#" class="modals" @submit.prevent=""></form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Orbit from "@/assets/imgs/Orbit.png";

const router = useRouter();
const form = reactive({
  status: null,
  date: null,
  is_active: false,
  faculty: null,
  search: "",
});
let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status Two",
  },
]);
let faculties = reactive([
  {
    label: "Physical Science",
    value: "Physical Science",
  },
]);

let promotionTrends = reactive([
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
    name: "Promotion Approval Rate by Faculty",
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
    name: "Promotion Trends Over 3 Years",
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

onMounted(() => {
  isActiveAppraisalPerformanceTrend.value =
    promotionTrends[0].name.toLowerCase();
  series_1.value[0].data =
    verticalChartDataSets[isActiveAppraisalPerformanceTrend.value];
});

function switchPromotionTrend(state) {
  isActiveAppraisalPerformanceTrend.value = state;
  series_1.value[0].data = verticalChartDataSets[state];
}

const columns = [
  {
    title: "Faculty",
    key: "faculty",
    render: (row) => {
      return h(
        "button",
        {
          onclick: () =>
            router.push(
              "/dap/appraisal-management/departmental-appraisal-records/" +
                row.id
            ),
        },
        row.faculty
      );
    },
  },
  { title: "Department ", key: "department" },
  { title: "Total Applications ", key: "total_applications" },
  { title: "Approved ", key: "approved" },
  { title: "Pending", key: "pending" },
  { title: "Deferred", key: "deferred" },
  { title: "Last Updated", key: "last_updated" },
  {
    title: "Status",
    key: "status",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "Completed"
              ? "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)] w-[120px]"
              : row.is_active == "Pending"
              ? "rounded-[22.5px] text-[rgba(234,67,53,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(234,67,53,0.2)]"
              : "rounded-[22.5px] text-[rgba(35,136,255,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(35,136,255,0.25)]",
        },
        row.is_active
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
