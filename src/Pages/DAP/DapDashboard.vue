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
              class="text-[rgba(14,253,193,1)] font-[700] text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-[25px]">
            <li>
              <router-link
                to="/dap"
                class="text-[rgba(14,253,193,1)] cursor-pointer font-[700] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
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
                to="/dap/appraisal"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
                to="/dap/leave-analytics"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Analytics</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/promotion-career-progression"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/retirement-exit"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-calendar"></i> Retirement & Exit</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/report-analysis"
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
              <h2 class="bc mb-[7px]">Welcome Back, Dr. Elizabeth Okafor</h2>
              <h5 class="sbc">Director of Academic Planning</h5>
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

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]"
          >
            <div
              class="bg-[var(--twhite)] p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div
                class="rounded-[17px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[20px] py-[20px] px-[20px]"
              >
                <h4 class="text-[rgba(141,193,255,1)] mbs">
                  Active Appraisal Cycles
                </h4>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="balance">
                    <h2
                      class="text-[rgba(255,255,255,1)] text-[14px] font-[500] leading-[120%] tracking-[-2%]"
                    >
                      3 Active Cycles (Q2, Q3, Annual)
                    </h2>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-[30px]">
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Pending Validations
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      Appraisal reports awaiting DAP confirmation.
                    </p>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      26
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Research Publications
                    </h2>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      8 under verification
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Promotion Requests
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      Academic staff awaiting promotion verification.
                    </p>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(152,159,176,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      12
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Leave Activities
                    </h2>
                    <!-- <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      9 Publications Submitted
                    </p> -->
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      54 active leaves
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-[var(--twhite)] p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div class="">
                <h2
                  class="text-[var(--primary)] font-[600] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Publication Authenticity Status
                </h2>
              </div>
              <div id="chart" class="flex justify-center">
                <apexchart
                  type="donut"
                  height="250"
                  :options="pieChartOptions"
                  :series="pieSeries"
                />
              </div>

              <!-- <div class="flex flex-col items-center">
                <div
                  class="relative w-[229px] h-[229px] rounded-full bg-[conic-gradient(rgba(35,136,255,1)_-330%_25%,rgba(43,7,237,1)_25%_330%)]"
                >
                  <div
                    class="bg-[rgba(255,255,255,1)] z-[20] flex flex-col items-center justify-center top-0 w-[80px] right-[20px] shadow-[0px_1px_54px_0px_rgba(0,0,0,0.1)] h-[80px] rounded-full absolute"
                  >
                    <h2
                      class="text-center text-[rgba(35,136,255,1)] font-[600] text-[20px] tracking-[0%]"
                    >
                      25%
                    </h2>
                  </div>
                  <div
                    class="bg-[rgba(255,255,255,1)] z-[20] flex flex-col justify-center items-center shadow-[0px_1px_54px_0px_rgba(0,0,0,0.1)] bottom-0 left-[10px] w-[80px] h-[80px] rounded-full absolute"
                  >
                    <h2
                      class="text-center text-[rgba(43,76,235,1)] font-[600] text-[20px] tracking-[0%]"
                    >
                      75%
                    </h2>
                  </div>
                  <div
                    class="absolute inset-12 z-0 bg-white rounded-full"
                  ></div>
                </div>
              </div> -->

              <div class="flex flex-col gap-[10px]">
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[15px] block bg-[rgba(43,77,237,1)] h-[15px] rounded-full"
                      ></span>
                      <h2
                        class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
                      >
                        Verified
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      1,280
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[15px] block bg-[rgba(35,136,255,1)] h-[15px] rounded-full"
                      ></span>
                      <h2
                        class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
                      >
                        Under Review
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      375
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[15px] block bg-[rgba(35,136,255,1)] h-[15px] rounded-full"
                      ></span>
                      <h2
                        class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
                      >
                        Flagged for Correction
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      200
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-[var(--twhite)] p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col"
            >
              <div class="">
                <h2
                  class="text-[rgba(27,37,89,1)] mb-[10px] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Appraisal Completion Rate % by Faculty
                </h2>
              </div>
              <div class="overview_metrics">
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
          </div>

          <!-- Quick Actions -->
          <div class="quick_actions flex flex-col gap-[15px]">
            <h2
              class="text-[rgba(30,43,58,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Quick Actions
            </h2>
            <div
              class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 bg-white gap-[15px]"
            >
              <button
                class="flex items-center py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fa fa-file-text text-[rgba(255,255,255,1)]"></i>

                Check Publication Reports
              </button>
              <button
                class="flex items-center h-[45px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fa fa-user-plus text-[rgba(255,255,255,1)]"></i>
                Validate Pending Appraisals
              </button>
              <button
                class="flex items-center h-[45px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fas fa-award text-[rgba(255,255,255,1)]"></i>
                Review Promotions
              </button>
            </div>
          </div>

          <!-- Pending Approvals -->
          <form class="pending_requests w-full mb-5">
            <div
              class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[30px]"
            >
              <div
                class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
              >
                <h2
                  class="font-[700] text-[var(--sec-text)] w-[200px] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Recent Publications
                </h2>
                <div class="relative w-[50%]">
                  <div class="h-full absolute left-[10px] flex items-center">
                    <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
                  </div>
                  <n-input
                    type="search"
                    name="search"
                    placeholder="Search for anything..."
                    id="search"
                    :bordered="false"
                    v-model:value="form.search"
                    class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
                  />
                </div>
              </div>
            </div>
            <div class="w-full overflow-hidden mt-3">
              <div class="overflow-x-auto">
                <n-data-table
                  :columns="columns"
                  :loading="loading"
                  :bordered="false"
                  :sc
                  l-x="1200"
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
import { ref, reactive, computed } from "vue";
import Orbit from "@/assets/imgs/Orbit.png";

const form = reactive({
  status: null,
  category: null,
});

// Pie Chart
const pieSeries = ref([65, 58, 90]);
const labels = ref(["Verified", "Under Review", "Flagged for Correction"]);
const colors = ["rgba(43,7,237,1)", "rgba(35,136,255,1)", "rgba(6,108,229,1)"];

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
      "Arts",
      "Agriculture",
      "Biosciences",
      "Bus. Admin",
      "Education",
      "Engineering",
      "Env. Science",
      "Phy. Science",
    ],
  },
  colors: ["#2388ff"],
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
});

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns

const columns = [
  {
    title: "Staff",
    key: "staff",
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
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Year",
    key: "year",
  },
  { title: "Journal", key: "journal" },
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
              : "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]",
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
