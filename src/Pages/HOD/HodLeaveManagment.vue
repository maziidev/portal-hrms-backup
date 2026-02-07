<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
    <div
      class="bg-var(--twhite) p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div
        class="rounded-[40px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[40px]"
      >
        <h4 class="text-[rgba(141,193,255,1)] mbs">Total Applications</h4>
        <div class="flex justify-between items-center gap-3">
          <div class="balance">
            <h2
              class="text-[rgba(255,255,255,1)] text-[34px] font-bold leading-[120%] tracking-[-2%]"
            >
              35
            </h2>
          </div>
          <div class="flex gap-3 items-center">
            <i class="fa fa-caret-up text-[rgba(14,253,193,1)]"></i>
            <span class="text-[rgba(14,253,193,1)]">+12</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[30px]">
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Pending Approvals
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              Awaiting your action
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[rgba(24,24,27,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              7
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Approved Leaves
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              Approved and logged in record.
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[rgba(24,24,27,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              20
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Active Leaves
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              Currently on leave
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[rgba(24,24,27,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              4
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-var(--twhite) p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div class="">
        <h2
          class="text-[rgba(27,37,89,1)] font-bold text-[20px] leading-[120%] tracking-[-2%]"
        >
          Notifications
        </h2>
      </div>
      <div class="flex flex-col gap-[30px]">
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
              >
                You approved Annual Leave for Dr. Helen Eze
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
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
              >
                Leave request by Mr. Emeka Udo was rejected.
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
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
              >
                2 staff expected to resume next week
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
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
              >
                Completed appraisal for Prof. James Obi
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
    <div
      class="bg-var(--twhite) p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div class="">
        <h2
          class="text-[var(--primary)] font-[600] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Leave Approval Analytic
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

      <div class="flex flex-col gap-[30px]">
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[15px] block bg-[rgba(43,77,237,1)] h-[15px] rounded-full"
              ></span>
              <h2
                class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
              >
                Approved Leave
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              20
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[15px] block bg-[rgba(35,136,255,1)] h-[15px] rounded-full"
              ></span>
              <h2
                class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
              >
                Pending
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              7
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions/Shortcuts -->
  <div class="quick_actions flex flex-col gap-[15px]">
    <h2
      class="text-[rgba(30,43,58,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
    >
      Quick Actions/Shortcuts
    </h2>
    <div
      class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 bg-white gap-[15px]"
    >
      <router-link
        to="/hod/leave-management/active-leaves"
        href="Active_leave.html"
        class="flex items-center py-[20px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fa fa-user-plus text-[rgba(255,255,255,1)]"></i>

        View Active Leaves
      </router-link>
      <router-link
        to="/hod/leave-management/leave-balance-report"
        class="flex items-center py-[20px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fa fa-file-text text-[rgba(255,255,255,1)]"></i>

        Leave Balance Report
      </router-link>
      <button
        class="flex items-center py-[20px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fas fa-arrow-up-from-bracket text-[rgba(255,255,255,1)]"></i>

        Export Summary (PDF)
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px] items-center">
    <div class="overview_metrics">
      <div class="top">
        <h2
          class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
        >
          Overview Metrics
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
      <div class="top flex justify-between w-full gap-[10px] items-center">
        <h2
          class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
        >
          Leave Category Distribution
        </h2>
        <div
          class="flex leave_category_distribution switch_bar > border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
        >
          <button
            v-for="promotion_rate_by_rank in leave_category_distributions"
            :key="promotion_rate_by_rank.name"
            @click="switchPromotionRateByRank(promotion_rate_by_rank.name)"
            :id="promotion_rate_by_rank.name"
            :class="[
              `active rounded-[4px] text-[rgba(30,30,30,1)] font-normal text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
              promotion_rate_by_rank.name === isActiveLeaveCategoryDistribution
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

  <!-- Upcoming Retirements -->
  <form class="pending_requests w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[10px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-bold text-(--sec-text) w-62.5 text-[20px] leading-[120%] tracking-[-2%]"
        >
          Leave Requests Overview
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
          name="department"
          id="department"
          v-model:value="form.leave_type"
          :options="leaveTypes"
          clearable
          :bordered="true"
          placeholder="Leave Type"
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
  <form action="#" class="modals" @submit.prevent="">
    <LeaveRequest
      :show
      @closeLeaveRequest="closeLeaveRequest"
      @openLeaveDetails="openLeaveDetails"
    />
    <LeaveDetails
      :show1
      @closeLeaveDetails="closeLeaveDetails"
      @openLeaveRequest="openLeaveRequest"
      @openLeaveBalanceApproval="openLeaveBalanceApproval"
    />

    <LeaveBalanceApproval
      :show2
      @closeLeaveBalanceApproval="closeLeaveBalanceApproval"
      @openLeaveDetails="openLeaveDetails"
    />
  </form>
</template>
<script setup>
import { ref, reactive, h, computed } from "vue";
import Orbit from "@/assets/imgs/Orbit.png";

import LeaveRequest from "@/components/HodComponents/LeaveRequest.vue";
import LeaveDetails from "@/components/HodComponents/LeaveDetails.vue";
import LeaveBalanceApproval from "@/components/HodComponents/LeaveBalanceApproval.vue";

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
function openLeaveRequest() {
  show.value = true;
}
function closeLeaveRequest() {
  show.value = false;
  ("Working now...");
}

const show1 = ref(false);
function openLeaveDetails() {
  show1.value = true;
  show.value = false;
  console.log("Working...");
}
function closeLeaveDetails() {
  show1.value = false;
}

const show2 = ref(false);
function openLeaveBalanceApproval() {
  show2.value = true;
  show1.value = false;
}
function closeLeaveBalanceApproval() {
  show2.value = false;
}

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const columns = [
  { title: "Staff ID", key: "staff_id" },
  { title: "Name", key: "name" },
  { title: "Leave Type", key: "leave_type" },
  { title: "Start Date", key: "start_date" },
  { title: "End Date", key: "end_date" },
  { title: "Duration", key: "duration" },
  {
    title: "Status ",
    key: "status ",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "In Progress"
              ? "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]"
              : row.is_active == "Pending"
                ? "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]"
                : "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)]",
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
