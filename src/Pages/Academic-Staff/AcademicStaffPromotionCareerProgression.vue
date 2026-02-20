<template>
  <div
    class="bg-[rgba(255,255,255,1)] px-[12px] py-[15px] border border-[rgba(141,193,255,0.27)]"
  >
    <h2
      class="text-[rgba(27,37,89,1)] mb-[20px] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
    >
      Promotion Overview
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
      <div class="flex items-center justify-between gap-[10px]">
        <div class="flex items-center gap-[10px]">
          <span
            class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
          ></span>
          <h2
            class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
          >
            Current Cadre
          </h2>
        </div>
        <div class="flex items-center">
          <span
            class="text-[rgba(58,151,76,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
            >Lecturer II
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
            Date of Last Promotion
          </h2>
        </div>
        <div class="flex items-center">
          <span
            class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
            >March 2021</span
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
            Next Eligible Promotion
          </h2>
        </div>
        <div class="flex items-center">
          <span
            class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
            >March 2024</span
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
            Status
          </h2>
        </div>
        <div class="flex items-center">
          <span
            class="text-[rgba(58,151,76,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
            >Eligible
          </span>
        </div>
      </div>
    </div>
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
      <div class="top flex flex justify-between w-full gap-[10px] items-center">
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
            @click="switchPromotionRateByRank(promotion_rate_by_rank.name)"
            :id="promotion_rate_by_rank.name"
            :class="[
              `active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
              promotion_rate_by_rank.name === isActivePromotionRateByRank
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
  <form class="pending_requests w-full mb-5" @submit.prevent="">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[30px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-[700] text-[var(--sec-text)] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Promotion History Table
        </h2>
        <button
          @click="openApplyForPromotion"
          class="flex rounded-[5px] apply_for_leave gap-[10px] items-center px-[10px] py-[10px] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)]"
        >
          <i class="fa fa-user-plus"></i> Apply for Promotion
        </button>
      </div>
      <div
        class="right grid grid-cols-1 w-full items-center gap-[15px] flex-wrap lg:grid-cols-3 md:grid-cols-3"
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
  <form action="#" class="modals" @submit.prevent="">
    <ApplyForPromotion :show @closeApplyForPromotion="closeApplyForPromotion" />
    <AcademicStaffApplicationTracking
      :show1
      @closeAcademicStaffApplicationTracking="
        closeAcademicStaffApplicationTracking
      "
    />
  </form>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
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
        row.id,
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
          style:
            "bg-[rgba(35,136,255,1)] view text-[rgba(255,255,255,1)] font-[700] text-[11px] w-full py-[20px] px-[20px] rounded-[5px]",
          onClick: () => openAcademicStaffApplicationTrackingForPromotion(),
        },
        ["View"],
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
