<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
    <div
      class="bg-var(--twhite) p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div class="flex flex-col gap-[20px]">
        <div class="">
          <h2
            class="text-[rgba(17,27,73,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
          >
            Leave Overview
          </h2>
        </div>

        <div
          class="rounded-[20px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[40px]"
        >
          <h4 class="text-[rgba(141,193,255,1)] mbs">Active Leave</h4>
          <div class="flex justify-between items-center gap-3">
            <div class="balance">
              <h2
                class="text-[rgba(255,255,255,1)] text-[25px] font-bold leading-[120%] tracking-[-2%]"
              >
                15 days remaining
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-[30px]">
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Sick Leave
            </h2>
          </div>
          <div class="price">
            <p
              class="text-[rgba(152,159,176,1)] text-[16px] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              5 days remaining
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Study Leave
            </h2>
          </div>
          <div class="price">
            <p
              class="text-[rgba(152,159,176,1)] text-[16px] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              60 days remaining
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Maternity/Paternity
            </h2>
          </div>
          <div class="price">
            <p
              class="text-[rgba(152,159,176,1)] text-[16px] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              N/A
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-var(--twhite) p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col"
    >
      <div class="">
        <h2
          class="text-[rgba(27,37,89,1)] font-bold text-[20px] leading-[120%] tracking-[-2%]"
        >
          Number of Leave Days Taken per Quarter
        </h2>
      </div>
      <div class="overview_metrics">
        <div class="top">
          <h2
            class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
          >
            Overview Metrics
          </h2>
        </div>
        <div class="horizontal-bar" id="horizontal-bar">
          <div class="overview_metrics">
            <apexchart
              type="bar"
              height="350"
              :options="verticalChartOptions"
              :series="series_1"
            />
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
          class="font-bold text-(--sec-text) text-[20px] leading-[120%] tracking-[-2%]"
        >
          Leave Application History
        </h2>
        <button
          @click="openApplyForLeave"
          class="flex rounded-[5px] apply_for_leave gap-[10px] items-center px-[10px] py-[10px] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)]"
        >
          <i class="fa fa-user-plus"></i> Apply for Leave
        </button>
      </div>
      <div
        class="right grid grid-cols-1 w-full items-center gap-[15px] flex-wrap lg:grid-cols-3 md:grid-cols-3"
      >
        <n-select
          :options="unitOptions"
          clearable
          v-model:value="form.leave_type"
          name="leave_type"
          id="leave_type"
          placeholder="Leave Type"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>

        <n-select
          clearable
          v-model:value="form.status"
          name="status"
          placeholder="Status"
          id="status"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-date-picker
          v-model:value="form.date"
          type="date"
          placeholder="DD-MM-YYYY"
          :bordered="true"
          class="custom-select"
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
        />
      </div>
    </div>
    <div
      class="flex p-4 justify-between shadow-[1px_17px_44px_0px_rgba(3,2,41,0.07)] items-center"
    >
      <button
        class="flex items-center bg-[rgba(141,193,255,1)] text-[rgba(30,43,58,1)] p-[20px] px-[40px] text-[16px] font-[600] rounded-[5px] gap-2"
      >
        <i
          class="fa fa-file-text bg-[rgba(141,193,255,1)] text-[rgba(30,43,58,1)]"
        ></i>
        Generate Leave Balance Report
      </button>
      <n-pagination
        v-model:page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="pagination.pageSizes"
        show-size-picker
        show-total
      />
    </div>
  </form>
  <form action="#" class="modals" @submit.prevent="">
    <ApplyForLeave
      :show
      @closeApplyForLeave="closeApplyForLeave"
      @openAcademicStaffApplicationTracking="
        openContributionAndResearchContextModal
      "
    />
    <AcademicStaffApplicationTracking
      :show1
      @closeAcademicStaffApplicationTracking="
        closeAcademicStaffApplicationTracking
      "
      @openAcademicStaffApplicationTracking="
        openAcademicStaffApplicationTracking
      "
    />
  </form>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import ApplyForLeave from "@/components/AcademicStaffComponents/ApplyForLeave.vue";
import AcademicStaffApplicationTracking from "@/components/AcademicStaffComponents/AcademicStaffApplicationTracking.vue";
import Orbit from "@/assets/imgs/Orbit.png";

const series_1 = ref([
  {
    name: "Average Years-in-Rank",
    data: [5, 10, 15, 20, 25],
  },
]);

const verticalChartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: ["Q1", "Q2", "Q3", "Q4"],
  },
  colors: ["#2388ff"],
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
});

const form = reactive({
  year: null,
  type: null,
  status: null,
  leave_type: null,
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
let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status Two",
  },
]);
const btns = reactive([
  { name: "Book Chapters", value: 2 },
  { name: "Citations", value: 237 },
  { name: "H-Index", value: 7 },
]);

isActive(btns[0].name);

// Show Modals
const show = ref(false);
const show1 = ref(false);
function closeApplyForLeave() {
  show.value = false;
}
function openApplyForLeave() {
  show.value = true;
}
function closeAcademicStaffApplicationTracking() {
  show1.value = false;
}
function openAcademicStaffApplicationTracking() {
  console.log("Awesome");
  show1.value = true;
}

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns
const columns = [
  {
    title: "Leave Type",
    key: "leave_type",
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
  { title: "Duration ", key: "duration " },
  { title: "Approval Stage ", key: "approval_stage" },
  { title: "Acting Officer", key: "acting_officer " },
  { title: "Date Applied", key: "date_applied  " },

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
  {
    title: "Action ",
    key: "action",
    render(row) {
      h(
        "button",
        {
          style:
            "bg-[rgba(35,136,255,1)] view text-[rgba(255,255,255,1)] font-bold text-[11px] w-full py-[20px] px-[20px] rounded-[5px]",
          onClick: () => openAcademicStaffApplicationTracking(),
        },
        ["View"],
      );
    },
  },
];
const pagination = {
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
