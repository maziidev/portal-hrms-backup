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
                to="/admin"
                class="text-[var(--pri-text)] font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/staff-managment"
                class="text-[var(--pri-text)] cursor-pointer font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Management</router-link
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="Appraisals.html"
                ><i class="fa fa-file-text"></i> Appraisals
              </a>
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career Progression</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-calendar"></i> Retirement & Exit</a
              >
            </li>
            <li>
              <router-link
                to="/admin/report-analysis"
                class="text-[rgba(14,253,193,1)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
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
              <h2 class="bc mb-[7px]">Reports & Analysis</h2>
              <h5 class="sbc">
                Generate insights, track trends on staff activities, appraisals,
                and export structured reports.
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
          <div
            class="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] gap-[25px]"
          >
            <div
              class="bg-[var(--twhite)] p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div
                class="rounded-[40px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[40px]"
              >
                <h4 class="text-[rgba(141,193,255,1)] mbs">Total Staff</h4>
                <div class="flex justify-between items-center gap-3">
                  <div class="balance">
                    <h2
                      class="text-[rgba(255,255,255,1)] text-[34px] font-[700] leading-[120%] tracking-[-2%]"
                    >
                      23,458
                    </h2>
                  </div>
                  <div class="flex gap-3 items-center">
                    <i class="fa fa-caret-up text-[rgba(14,253,193,1)]"></i>
                    <span class="text-[rgba(14,253,193,1)]">+12</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-[40px]">
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Appraisals Completed
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      This Year
                    </p>
                  </div>
                  <div class="">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      2,987
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Appraisals Completed
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      20%
                    </p>
                  </div>
                  <div class="">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      520
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Retirements This Year
                    </h2>
                  </div>
                  <div class="">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      130
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Promotions Approved
                    </h2>
                  </div>
                  <div class="">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      78
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="leave_category_distribution flex flex-col justify-between border bg-[rgba(255,255,255,1)] rounded-[20px]"
            >
              <div
                class="top flex flex justify-between p-[20px] w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Appraisal Progress Overview
                </h2>
                <div
                  class="flex leave_category_distribution switch_bar > border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    id="week"
                    @click="updateChartData($event)"
                    ref="btn1"
                    class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                  >
                    Week
                  </button>
                  <button
                    id="month"
                    @click="updateChartData($event)"
                    ref="btn2"
                    class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                  >
                    Month
                  </button>
                  <button
                    id="year"
                    @click="updateChartData($event)"
                    ref="btn3"
                    class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                  >
                    Year
                  </button>
                </div>
              </div>
              <apexchart
                type="bar"
                height="350"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </div>

          <!-- Quick Actions -->
          <div
            class="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] gap-[25px]"
          >
            <div
              class="bg-[var(--twhite)] p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div class="">
                <h2
                  class="text-[var(--primary)] font-[600] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Staff Population Ratio
                </h2>
              </div>
              <div id="chart" class="items-center flex flex-col">
                <apexchart
                  type="donut"
                  height="250"
                  :options="pieChartOptions"
                  :series="pieSeries"
                />
              </div>

              <div class="flex flex-col gap-[10px]">
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
                        Academic Staff
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      17,987
                    </p>
                  </div>
                </div>
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
                        Non-Academic Staff
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      10,987
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="leave_category_distribution flex flex-col justify-between border bg-[rgba(255,255,255,1)] rounded-[20px]"
            >
              <div
                class="top flex justify-between p-[20px] w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Retirement Projection
                </h2>
                <div
                  class="flex w-[200px] leave_category_distribution switch_bar"
                >
                  <n-select
                    name="years"
                    id="years"
                    v-model:value="form.year"
                    :options="years"
                    :bordered="false"
                    class="border cursor-pointer rounded-[5px] border-[rgba(240,240,240,1)] outline-none"
                  >
                  </n-select>
                </div>
              </div>
              <apexchart
                type="bar"
                height="350"
                :options="verticalChartOptions"
                :series="series_1"
              />
            </div>
          </div>

          <!-- Upcoming Retirements -->
          <form class="pending_requests w-full mb-5">
            <div
              class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[30px]"
            >
              <div class="left flex items-center gap-[20px]">
                <h2
                  class="font-[700] text-[var(--sec-text)] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Reports
                </h2>
                <router-link
                  to="/admin/generate-report"
                  class="flex rounded-[5px] apply_for_promotion justify-center px-10 gap-[10px] items-center py-[10px] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)]"
                >
                  <i class="fa fa-file-text"></i>Generate Report
                </router-link>
              </div>
              <div
                class="right flex items-center gap-[1px] w-[50%] flex-wrap lg:flex-nowrap md:flex-nowrap"
              >
                <n-select
                  name="date"
                  id="date"
                  v-model:value="form.category"
                  :options="categories"
                  clearable
                  :bordered="true"
                  placeholder="categories"
                  class="cursor-pointer rounded-[10px] outline-none py-[11px]"
                >
                </n-select>
                <n-date-picker
                  v-model:value="form.date"
                  type="date"
                  placeholder="Select a date"
                  :bordered="false"
                  class="custom-select w-full border"
                />
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
        <form action="#" class="modals" @submit.prevent=""></form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed, h } from "vue";
import Orbit from "@/assets/imgs/Orbit.png";

const years = reactive([
  {
    label: "2025-2026",
    value: "2025-2026",
  },
  { label: "2025-2027", value: "2025-2027" },
  {
    label: "2025-2028",
    value: "2025-2028",
  },
]);
const form = reactive({
  date: null,
  category: null,
  year: years[0].value,
});

const categories = reactive([
  { label: "0-5 years", value: "0-5 years" },
  { label: "5-7 years", value: "5-7 years" },
  { label: "0-5 years", value: "0-5 years" },
]);

// const dates = reactive([
//   { label: "22-02-2024", value: "22-02-2024" },
//   { label: "22-02-2024", value: "22-02-2024" },
//   { label: "22-02-2024", value: "22-02-2024" },
// ]);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const btns = ref([]);
const btn1 = ref(null);
const btn2 = ref(null);
const btn3 = ref(null);

btns.value[0] = btn1;
btns.value[1] = btn2;
btns.value[2] = btn3;

// Pie Chart
const pieSeries = ref([55, 45]);
const labels = ref(["Non-Academic Staff", "Academic Staff"]);
const colors = ["rgba(43,7,237,1)", "rgba(35,136,255,1)"];

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

const DataSets = reactive({
  week: [30, 45, 60, 25, 50, 50, 20, 40],
  month: [45, 55, 65, 40, 60, 20, 40, 65],
  year: [25, 35, 50, 20, 40, 65, 40, 60],
});
const series = ref([
  {
    name: "Average Years-in-Rank",
    data: DataSets["week"],
  },
]);
const currentDataset = ref("week");
function updateChartData(event) {
  console.log(event.target.id);
  for (let x in DataSets) {
    console.log(btns.value);
    if (event.target.id === x) {
      series.value[0].data = DataSets[x];
      event.target.classList.add("bg-[rgba(35,136,255,1)]");
      event.target.classList.add("text-[rgba(247,249,250,1)]");
      btns.value.forEach((button) => {
        if (button.value.id !== event.target.id) {
          button.value.classList.remove("bg-[rgba(35,136,255,1)]");
          button.value.classList.remove("text-[rgba(247,249,250,1)]");
          console.log(button.value);
        }
      });
    }
  }
  currentDataset.value = event.target.id;
  event.target.className;
}

const chartOptions = ref({
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
});

const verticalChartDataSets = {
  "2025-2026": [30, 45, 60, 25, 50, 55, 60, 70, 80, 40, 66, 12],
  "2025-2027": [45, 55, 65, 40, 60, 70, 75, 80, 40, 66, 12, 90],
  "2025-2028": [25, 35, 50, 20, 40, 50, 55, 60, 40, 66, 12, 20],
};

const series_1 = ref([
  {
    name: "Retirement Projection",
    data: verticalChartDataSets["2025-2026"],
  },
]);

const verticalChartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "JAN",
      "FEB",
      "MARCH",
      "APRIL",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
  },
  colors: ["#e9edf7"],
});
watch(
  () => form.year,
  (newVal, oldVal) => {
    console.log(oldVal, newVal);
    series_1.value[0].data = verticalChartDataSets[newVal];
  }
);
function updateVerticalChartData() {}

// Define table columns
const columns = [
  {
    title: "Report Title",
    key: "report_title",
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
  { title: "Category ", key: "category " },
  { title: "Generated By", key: "generated_by " },
  { title: "Date", key: "date" },
  {
    title: "Action ",
    key: "action",
    render(row) {
      return h(
        "a",
        {
          href: row.file,
          download: "",
          style:
            "rounded-[2px] text-[rgba(255,255,255,1)] font-[700] text-[14px] leading-[100%] flex gap-3 items-center justify-center tracking-[0%] px-[20px] py-[16px] bg-[rgba(35,136,255,1)]",
        },
        [h("i", { class: "fa fa-download" }), "Download"]
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
