<template>
  <!-- All Staff Directory -->
  <div
    class="quick_actions flex flex-wrap md:flex-nowrap lg:flex-nowrap justify-between items-center gap-[15px]"
  >
    <h2
      class="text-[rgba(30,43,58,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
    >
      Department Staff Appraisal
    </h2>
    <a
      href=""
      download="download"
      class="text-[rgba(255,255,255,1)] px-[40px] py-[10px] font-[600] text-[16px] flex gap-[10px] bg-[rgba(35,136,255,1)] items-center leading-[120%] tracking-[-2%] rounded-[5px] border-2 border-[rgba(35,136,255,1)]"
    >
      Approve all</a
    >
  </div>
  <form class="w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[10px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
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
        class="right grid grid-cols-4 gap-[20px] md:w-[50%] w-full lg:grid-cols-4 md:grid-cols-4"
      >
        <n-select
          v-model:value="form.category"
          :options="categories"
          clearable
          :bordered="true"
          name="category"
          id="category"
          placeholder="Category"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-select
          v-model:value="form.role"
          :options="roles"
          clearable
          :bordered="true"
          name="roles"
          id="roles"
          placeholder="Roles"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>

        <n-select
          v-model:value="form.status"
          :options="Status"
          clearable
          :bordered="true"
          name="status"
          id="status"
          placeholder="Status"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-date-picker
          v-model:value="form.dateRange"
          type="date"
          placeholder="Date range"
          :bordered="false"
          class="custom-select w-full border"
        />
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
    <StaffAppraisalForm
      :show="show"
      @closeStaffAppraisalForm="closeStaffAppraisalForm"
      @openScoreBreakdown_Approval="openScoreBreakdown_Approval"
    />
    <ScoreBreakdown_Approval
      :show1="show1"
      @closeScoreBreakdown_Approval="closeScoreBreakdown_Approval"
      @openStaffAppraisalForm="openStaffAppraisalForm"
    />
  </form>
</template>
<script setup>
import { ref, reactive, h, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Orbit from "@/assets/imgs/Orbit.png";
import StaffAppraisalForm from "@/components/DapComponents/StaffAppraisalForm.vue";
import ScoreBreakdown_Approval from "@/components/DapComponents/ScoreBreakdown_Approval.vue";

const route = useRoute();
const { department } = defineProps({
  department: {
    type: String,
  },
});
const router = useRouter();
const form = reactive({
  status: null,
  date: null,
  is_active: false,
  dateUpdated: null,
  faculty: null,
  search: "",
});
const loading = ref(false);
let Status = reactive([
  {
    label: "Status One",
    value: "Status One",
  },
]);
let dates = reactive([
  {
    label: "Month Year Option",
    value: "Month Year Option",
  },
]);

const show = ref(false),
  show1 = ref(false);

function openStaffAppraisalForm() {
  show.value = true;
}
function closeStaffAppraisalForm() {
  show.value = false;
}
function openScoreBreakdown_Approval() {
  show1.value = true;
}
function closeScoreBreakdown_Approval() {
  show1.value = false;
}

const activeState = ref(null);

const btns = reactive([
  { name: "Total Appraisals", value: 24 },
  { name: "Pending Reviews", value: 4 },
  { name: "Approved Appraisals", value: 20 },
  { name: "Departments Reviewed", value: 4 },
]);

onMounted(() => {
  activeState.value = btns[0].name;
});

function isActive(id) {
  activeState.value = id;
  // console.log(id);
}

isActive(btns[0].name);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const columns = [
  {
    title: "Staff ID ",
    key: "staff_id",
    render: (row) => {
      h(
        "button",
        {
          onClick: () => router.push("/dap/all-staff-records/" + id),
        },
        row.department,
      );
    },
  },
  { title: "Staff Name ", key: "staff" },
  // { title: "Position", key: "position" },
  { title: "Appraisal Period ", key: "appraisal_period" },
  { title: "Submitted On", key: "submitted_at" },
  { title: "Date Create", key: "date_created" },
  { title: "Rating Dean", key: "rating_dean" },
  {
    title: "Status ",
    key: "status ",
    // render(row) {
    //   return h(
    //     "span",
    //     {
    //       style:
    //         row.is_active == "Approved"
    //           ? "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)] w-[120px]"
    //           : row.is_active == "Returned"
    //             ? "rounded-[22.5px] text-[rgba(107,114,128,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(107,114,128,0.2)] w-[120px]"
    //             : row.is_active == "In Review"
    //               ? "bg-[rgba(35,136,255,0.15)] px-[20px] py-[10px] rounded-[22.5px] text-[rgba(35,136,255,1)] font-bold text-[14px] leading-[100%] tracking-[0%]"
    //               : "bg-[rgba(234,67,53,0.2)] px-[20px] py-[10px] rounded-[22.5px] text-[rgba(234,67,53,1)] font-bold text-[14px] leading-[100%] tracking-[0%]",
    //     },
    //     row.is_active,
    //   );
    // },
  },
  {
    title: "Action",
    key: "action",
    render: (row) => {
      return h(
        "button",
        {
          class:
            row.is_active == "view"
              ? "bg-[rgba(78,159,255,0.2)] view text-[rgba(78,159,255,1)] font-bold text-[11px] w-[200px] py-[20px] px-[20px] rounded-[5px]"
              : row.is_active == "continue"
                ? "text-[rgba(255,255,255,1)] show_appraisal_form rounded-[5px] bg-[rgba(35,136,255,1)] font-bold text-[11px] w-[200px] px-[20px] py-[20px] leading-[100%] tracking-[0%]"
                : "text-[rgba(255,255,255,1)] rounded-[5px] bg-[rgba(58,151,76,1)] font-bold text-[11px] w-[200px] px-[20px] py-[20px] leading-[100%] tracking-[0%]",
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
