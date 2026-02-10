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
                to="/admin"
                class="text-(--pri-text) font-normal flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/staff-managment"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Management</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/appraisal"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Appraisals</router-link
              >
            </li>

            <li>
              <a
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</a
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
                to="/admin/report-analysis"
                class="text-[rgba(14,253,193,1)] font-bold text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
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
            <div class="mx-[10px]">
              <h2 class="bc mb-[7px]">2025 Academic Staff Appraisal Report</h2>
              <h5 class="sbc">Appraisal</h5>
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
          <div
            class="flex justify-between gap-[20px] flex-wrap md:flex-nowrap lg:flex-nowrap"
          >
            <div class="left flex items-center gap-[20px]">
              <div class="back">
                <button
                  @click="previousPage"
                  class="flex items-center gap-[10px]"
                >
                  <i class="fa fa-chevron-left"></i> Back
                </button>
              </div>
              <div class="created_by flex items-center gap-[5px]">
                <h3 class="font-bold text-[rgba(27,37,89,1)] text-[20px]">
                  Generated By:
                </h3>
                <p class="font-[500] text-[16px] text-[rgba(27,37,89,1)]">
                  Personnel Admin
                </p>
              </div>
              <div class="calender flex items-center gap-[5px]">
                <i class="fas fa-calendar"></i
                ><span class="text-[rgba(20,21,15,1)]">Sept 20, 2025</span>
              </div>
            </div>
            <div class="right flex items-center justify-around">
              <div
                class="created_by flex items-center gap-[5px] flex-wrap md:flex-nowrap lg:flex-nowrap gap-[10px]"
              >
                <h3 class="font-bold text-[rgba(27,37,89,1)] text-[20px]">
                  Scope:
                </h3>
                <p class="font-[500] text-[16px] text-[rgba(27,37,89,1)]">
                  Faculty of Science, Faculty of Social Sciences, Faculty of
                  Arts
                </p>
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
                      `text-[34px] font-bold leading-[120%] tracking-[-2%]`,
                      activeState == btn.name
                        ? `text-[rgba(255,255,255,1)]`
                        : `text-(--sec-text)`,
                    ]"
                  >
                    {{ btn.value }}
                  </h2>
                </div>
              </div>
            </button>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] gap-[25px]"
          >
            <div
              class="bg-var(--twhite) p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div class="">
                <h2
                  class="text-[var(--primary)] font-[600] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Appraisal Status Breakdown
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
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
                >
                  Appraisal Completion by Department
                </h2>
                <div
                  class="bg-[rgba(241,243,247,1)] completed_appraisals px-[4px] w-[80px] py-[4px] border-[rgba(225,228,237,1)] rounded-[6px] p-[4px] flex justify-between items-center gap-[6px]"
                >
                  <button
                    v-for="btn in buttons"
                    :key="btn.id"
                    @click="switchButton(btn)"
                    :class="[
                      btn.id == 'previous' ? `previous` : 'next',
                      `transition-all duration-10 ease-in-out`,
                      btn.id == buttonState &&
                        `bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)]`,
                      `rounded-[6px] px-[10px] py-[6px] cursor-pointer `,
                    ]"
                  >
                    <i :class="btn.name"></i>
                  </button>
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
          <!-- Staff Appraisal -->
          <div
            class="quick_actions flex justify-between flex-wrap lg:flex-nowrap md:flex-nowrap items-center gap-[15px]"
          >
            <div
              class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
            >
              <h2
                class="text-[rgba(30,43,58,1)] font-bold text-[20px] leading-[120%] tracking-[-2%]"
              >
                Staff Appraisal Details
              </h2>
            </div>
            <div
              class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
            >
              <button
                @click="OpenModal"
                class="border-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] bulk_upload_ px-[40px] py-[10px] font-[600] text-[16px] flex gap-[10px] items-center leading-[120%] tracking-[-2%] rounded-[5px] border-2 bg-[rgba(35,136,255,1)]"
              >
                <i class="fa fa-download"></i> Download
              </button>
            </div>
          </div>

          <form class="all_staff_directory w-full">
            <div
              class="top flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between gap-[20px] items-center"
            >
              <div class="left flex items-center md:w-[50%] gap-[15px]">
                <div class="relative h-[40px] w-full md:w-[400px] lg:w-[400px]">
                  <div class="h-full absolute left-[10px] flex items-center">
                    <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
                  </div>
                  <n-input
                    type="search"
                    name="search"
                    placeholder="Search through apparaisals"
                    id="search"
                    :bordered="false"
                    class="search outline-none w-full border rounded-[6px] border-[rgba(229,231,235,1)]"
                  />
                </div>
              </div>
              <div
                class="right grid grid-cols-1 w-[50%] items-center gap-[15px] flex-wrap lg:grid-cols-3 md:grid-cols-4"
              >
                <n-select
                  :options="unitOptions"
                  clearable
                  v-model:value="data.department"
                  name="department_unit"
                  id="department_unit"
                  placeholder="Department/Unit"
                  class="cursor-pointer outline-none"
                >
                </n-select>
                <n-select
                  clearable
                  v-model:value="data.author"
                  name="author"
                  placeholder="Author"
                  id="author"
                  class="cursor-pointer outline-none"
                >
                </n-select>

                <n-date-picker
                  v-model:value="data.date"
                  type="date"
                  placeholder="Date Range"
                  :bordered="false"
                  class="custom-select border border-slate-200"
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
        <form action="#" class="modals" @submit.prevent="">
          <Staff_Information :show @closeModal="closeModal" />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed } from "vue";
import { useRouter } from "vue-router";
import OpenAppraisal1 from "@/components/AdminComponents/OpenAppraisal1.vue";
import Staff_Information from "@/components/AdminComponents/Staff_Information.vue";
import OpenAppraisal2 from "@/components/AdminComponents/OpenAppraisal2.vue";
import GenerateReport from "@/components/AdminComponents/GenerateReport.vue";
import AddNewStaff from "@/components/AdminComponents/AddNewStaff.vue";
import Orbit from "@/assets/imgs/Orbit.png";

const form = reactive({
  date: null,
  category: null,
  year: null,
});

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

const buttonState = ref("previous");

function switchButton(val) {
  buttonState.value = val.id;
  series_1.value[0].data = verticalChartDataSets[val.year];
}

const buttons = reactive([
  {
    name: "fa fa-chevron-left",
    id: "previous",
    year: "2025-2027",
  },
  {
    name: "fa fa-chevron-right",
    id: "next",
    year: "2025-2028",
  },
]);

watch(
  () => form.year,
  (newVal, oldVal) => {
    console.log(oldVal, newVal);
    series_1.value[0].data = verticalChartDataSets[newVal];
  },
);

const router = useRouter();

function previousPage() {
  router.back();
}

const data = reactive({
  department_unit: null,
  author: null,
  status: null,
  date: null,
  is_active: false,
});
const activeState = ref(null);

function isActive(id) {
  activeState.value = id;
  // console.log(id);
}

const btns = reactive([
  { name: "Total Academic Staff", value: 20 },
  { name: "Completed Appraisals", value: 12 },
  { name: "Pending", value: 8 },
  { name: "Completion Rate", value: "60%" },
]);
const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];

// Show Modal
const show = ref(false);
function closeModal() {
  show.value = false;
}
function OpenModal() {
  show.value = true;
  console.log("Good...");
}

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

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
        row.id,
      );
    },
  },
  { title: "Name  ", key: "name " },
  { title: "Faculty/Unit", key: "Faculty/Unit" },
  { title: "Department ", key: "department " },
  { title: "Designation ", key: "designation " },
  { title: "Employment Date  ", key: "employment_date  " },
  {
    title: "Status ",
    key: "status ",
    render(row) {
      return h(
        "span",
        {
          style: {
            color: row.is_active
              ? "text-[rgba(251,188,4,1)]"
              : row.is_active == "Due in 12 mo"
                ? "red"
                : "blue",
            fontWeight: "700",
            backgroundColor: row.is_active
              ? "bg-[rgba(234,67,53,0.2)]"
              : row.is_active == "Due in 12 mo"
                ? "bg-[rgba(251,188,4,0.2)]"
                : "bg-[rgba(58,151,76,0.15)]",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "22.5px",
            lineHeight: "100%",
            wordSpacing: "0%",
          },
        },
        row.is_active,
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
