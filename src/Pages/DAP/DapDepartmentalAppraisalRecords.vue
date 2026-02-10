<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6.25">
    <button
      :class="[
        `rounded-[20px] box cursor-pointer h-24.25 shadow  flex flex-col justify-center gap-6 py-5 px-6.25`,
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
              `font-medium text-[16px] text-[rgba(204,204,204,1)] leading-[120%] tracking-[-2%]`,
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
  <form class="w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[10px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-bold text-(--sec-text) w-[230px] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Departments’ appraisal
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
        class="right grid grid-cols-2 gap-[20px] md:w-[50%] w-full lg:grid-cols-2 md:grid-cols-2"
      >
        <n-select
          v-model:value="form.dateUpdated"
          :options="dates"
          clearable
          :bordered="true"
          name="dateUpdated"
          id="dateUpdated"
          placeholder="Date Updated"
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
      </div>
    </div>
    <div class="w-full overflow-hidden mt-3">
      <div class="overflow-x-auto">
        <n-data-table
          :columns="columns"
          :data="dapDepartmentalAppraisalRecordsByFaculty"
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
import {
  getDapAppraisalofFaculty,
  getDepartmentAppraisalRecordsByFaculty,
} from "@/apis/dap.js";
import { useMessage } from "naive-ui";

const route = useRoute();
const { faculty_id } = defineProps({
  faculty_id: {
    type: String,
  },
});

const message = useMessage();
const dapDepartmentalAppraisalRecordsByFaculty = ref([]);
const loading = ref(false);
const router = useRouter();
const form = reactive({
  status: null,
  date: null,
  is_active: false,
  dateUpdated: null,
  faculty: null,
  search: "",
});
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

const activeState = ref(null);

const btns = reactive([
  { name: "Total Appraisals", value: 24 },
  { name: "Pending Reviews", value: 4 },
  { name: "Approved Appraisals", value: 20 },
  { name: "Departments Reviewed", value: 4 },
]);

// FETCH DAP FACULTY APPRAISAL
const fetchDapFacultyAppraisal = async () => {
  loading.value = true;
  try {
    const res = await getDapAppraisalofFaculty(faculty_id);
    btns[0].value = res.total_staff_appraised;
    btns[1].value = res.pending_appraisals;
    btns[2].value = res.appraisals_reviewed;
    btns[3].value = res.average_score;

    console.log(res);

    message.success("Data load successfully");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
// FETCH DAP DEPARTMENTAL APPRAISAL RECORDS BY FACULTY
const fetchDepartmentAppraisalRecordsByFaculty = async () => {
  loading.value = true;
  try {
    const res = await getDepartmentAppraisalRecordsByFaculty(faculty_id);
    dapDepartmentalAppraisalRecordsByFaculty.value = res;

    console.log(res);
    message.success("Data load successfully");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  activeState.value = btns[0].name;
  fetchDapFacultyAppraisal();
  fetchDepartmentAppraisalRecordsByFaculty();
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
    title: "Department ",
    key: "department",
    render: (row) => {
      h(
        "button",
        {
          onClick: () => router.push("/dap/appraisal-management/department-appraisal/" + row.department),
        },
        row.department,
      );
    },
  },
  { title: "Total Staff", key: "total_staff" },
  { title: "Submitted ", key: "submitted" },
  { title: "Pending", key: "pending" },
  { title: "Completed", key: "completed" },
  { title: "Last Updated", key: "last_updated" },
  // {
  //   title: "Status ",
  //   key: "status ",
  //   render(row) {
  //     return h(
  //       "span",
  //       {
  //         style:
  //           row.is_active == "Completed"
  //             ? "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)] w-[120px]"
  //             : row.is_active == "In Progress"
  //               ? "bg-[rgba(35,136,255,0.15)] px-[20px] py-[10px] rounded-[22.5px] text-[rgba(35,136,255,1)] font-bold text-[14px] leading-[100%] tracking-[0%]"
  //               : "rounded-[22.5px] text-[rgba(234,67,53,1)] px font-bold text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(234,67,53,0.2)]",
  //       },
  //       row.is_active,
  //     );
  //   },
  // },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
