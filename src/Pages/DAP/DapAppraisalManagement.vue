<template>
  <div class="grid lg:grid-cols-[1fr_2fr] grid-cols-1 gap-[25px]">
    <div
      class="bg-var(--twhite) p-[12px] w-full shadow-sm border border-slate-100 rounded-[20px] gap-[20px] flex flex-col justify-between"
    >
      <div
        class="rounded-[17px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[20px]"
      >
        <div class="flex items-center justify-between gap-5 flex-wrap">
          <h4 class="text-[rgba(141,193,255,1)] mbs">Total Staff Appraised</h4>
          <span
            class="text-[rgba(240,240,240,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
            >3,440</span
          >
        </div>
        <div class="flex justify-between items-center gap-3">
          <div class="">
            <h2
              class="text-[rgba(255,255,255,1)] text-[14px] font-[500] leading-[120%] tracking-[-2%]"
            >
              (Q3 2025): 1,220,
            </h2>
          </div>
          <div class="">
            <h2
              class="text-[rgba(255,255,255,1)] text-[14px] font-[500] leading-[120%] tracking-[-2%]"
            >
              (Q2 2025): 2,220
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
              Appraisals Reviewed
            </h2>
          </div>
          <div class="price">
            <h2
              class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
            >
              in review
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Pending Appraisals
            </h2>
            <!-- <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      Ongoing appraisal sessions awaiting completion
                    </p> -->
          </div>
          <div class="price">
            <h2
              class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
            >
              930
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-[rgba(255,255,255,1)] flex flex-col justify-between px-[12px] py-[15px] border border-[rgba(141,193,255,0.27)] w-full"
    >
      <h2
        class="text-[rgba(27,37,89,1)] mb-[20px] font-bold text-[16px] leading-[120%] tracking-[-2%]"
      >
        Performance Rating
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[25px]">
        <div class="flex items-center justify-between gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Average Performance Rating
            </h2>
          </div>
          <div class="flex items-center">
            <span
              class="text-[rgba(58,151,76,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
              >82.3%
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Lowest Performance Rating
            </h2>
          </div>
          <div class="flex items-center">
            <span
              class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
              >55%</span
            >
          </div>
        </div>
        <div class="flex items-center justify-between gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Promotion-Eligible Staff
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
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Low-Performance Flags
            </h2>
          </div>
          <div class="flex items-center">
            <span
              class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
              >43</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-center">
    <div class="leave_category_distribution">
      <div class="top flex flex justify-between w-full gap-[10px] items-center">
        <h2
          class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
        >
          Appraisal performance trend
        </h2>
        <div
          class="flex leave_category_distribution switch_bar > border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
        >
          <button
            v-for="appraisal_performance_trend in appraisal_performance_trends"
            :key="appraisal_performance_trend.name"
            @click="
              switchAppraisalPerformanceTrend(
                appraisal_performance_trend.name.toLowerCase(),
              )
            "
            :id="appraisal_performance_trend.name"
            :class="[
              `active rounded-[4px] text-[rgba(30,30,30,1)] font-normal text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
              appraisal_performance_trend.name.toLowerCase() ===
              isActiveAppraisalPerformanceTrend
                ? `bg-[rgba(35,136,255,1)] !text-[rgba(247,249,250,1)]`
                : `text-[rgba(30,30,30,1)]`,
            ]"
          >
            {{ appraisal_performance_trend.name }}
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
          class="text-[rgba(27,37,89,1)] text-center text-[20px] tracking-[-2%] leading-[120%] font-bold"
        >
          Appraisal Completion Rate % by Faculty
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
          class="font-bold text-(--sec-text) w-[270px] text-[20px] leading-[120%] tracking-[-2%]"
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
        class="right grid grid-cols-2 gap-5 w-[50%] lg:grid-cols-2 md:grid-cols-2"
      >
        <n-select
          v-model:value="form.faculty"
          :options="faculties"
          clearable
          :bordered="true"
          name="faculty"
          id="faculty"
          placeholder="Faculty"
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
  <form action="#" class="modals" @submit.prevent=""></form>
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

let appraisal_performance_trends = reactive([
  {
    name: "Q1",
  },
  {
    name: "Q2",
  },
  {
    name: "Q3",
  },
  {
    name: "Q4",
  },
]);
const isActiveAppraisalPerformanceTrend = ref(null);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const series = ref([
  {
    name: "Appraisal Completion Rate % by Faculty",
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
  q1: [23, 45, 55, 35, 67, 89, 45, 90],
  q2: [23, 75, 85, 35, 67, 40, 25, 70],
  q3: [53, 75, 35, 75, 87, 70, 95, 70],
  q4: [33, 85, 89, 45, 57, 40, 75, 50],
});

const series_1 = ref([
  {
    name: "Appraisal performance trend",
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
    appraisal_performance_trends[0].name.toLowerCase();
  series_1.value[0].data =
    verticalChartDataSets[isActiveAppraisalPerformanceTrend.value];
});

function switchAppraisalPerformanceTrend(state) {
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
                row.id,
            ),
        },
        row.faculty,
      );
    },
  },
  { title: "Department ", key: "department" },
  { title: "Total Staff", key: "total_staff" },
  { title: "Appraised", key: "appraised" },
  { title: "Pending", key: "pending" },
  { title: "Avg Score", key: "avg_score" },
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
              ? "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)] w-[120px]"
              : row.is_active == "Pending"
                ? "rounded-[22.5px] text-[rgba(234,67,53,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(234,67,53,0.2)]"
                : "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]",
        },
        row.is_active,
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
          onClick: () => router.push("/dap/department-records/" + row.id),
        },
        [
          h("i", {
            class: "fa fa-ellipsis-h text-[rgba(152,159,176,1)] text-[40px]",
          }),
        ],
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
