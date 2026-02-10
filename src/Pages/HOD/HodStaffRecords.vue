<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px]">
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

  <!-- All Staff Directory -->
  <div
    class="quick_actions flex flex-wrap md:flex-nowrap lg:flex-nowrap justify-between items-center gap-[15px]"
  >
    <h2
      class="text-[rgba(30,43,58,1)] font-bold text-[20px] leading-[120%] tracking-[-2%]"
    >
      All Staff Directory
    </h2>
    <a
      href=""
      download="download"
      class="text-[rgba(35,136,255,1)] px-[40px] py-[10px] font-[600] text-[16px] flex gap-[10px] items-center leading-[120%] tracking-[-2%] rounded-[5px] border-2 border-[rgba(35,136,255,1)]"
      ><i class="fas fa-arrow-up-from-bracket"></i> Export Staff List</a
    >
  </div>

  <form class="all_staff_directory w-full">
    <div
      class="top flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between gap-[20px] items-center"
    >
      <div
        class="left flex items-center md:w-[30%] lg:w-[30%] w-full gap-[15px]"
      >
        <div class="relative w-full">
          <div class="h-full absolute left-[10px] flex items-center">
            <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
          </div>
          <n-input
            type="search"
            name="search"
            placeholder="Search by name, ID, or role"
            id="search"
            :bordered="false"
            class="search outline-none w-full md:w-[500px] lg:w-[500px] border rounded-[6px] border-[rgba(229,231,235,1)]"
          />
        </div>
      </div>
      <div
        class="right md:w-[50%] w-full grid grid-cols-1 items-center gap-[15px] flex-wrap lg:grid-cols-4 md:grid-cols-4"
      >
        <n-select
          :options="unitOptions"
          clearable
          v-model:value="data.category"
          name="category"
          id="category"
          placeholder="Category"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-select
          clearable
          v-model:value="data.role"
          name="role"
          id="role"
          placeholder="Role"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>

        <n-select
          clearable
          v-model:value="data.status"
          name="status"
          id="status"
          placeholder="Status"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-date-picker
          v-model:value="data.date"
          type="date"
          placeholder="Date Range"
          :bordered="false"
          class="custom-select border border-slate-200 border-slate-200"
        />
      </div>
    </div>
    <div class="w-full overflow-hidden mt-3">
      <div class="overflow-x-auto">
        <n-data-table
          :columns="columns"
          :loading="loading"
          :bordered="false"
          :data="staffData"
          :scroll-x="1200"
          :pagination="pagination"
        />
      </div>
    </div>
  </form>
  <form action="#" class="modals" @submit.prevent=""></form>
</template>
<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { getAllStaff, getStaffById, exportStaff } from "@/apis/admin.js";
import { getFullStaffDetails } from "@/apis/hod.js";
import { useMessage } from "naive-ui";
import { getStaffSummary } from "@/apis/hod.js";
import Orbit from "@/assets/imgs/Orbit.png";

const staffSummaryData = ref(null);
const message = useMessage();
const data = reactive({
  department_unit: null,
  employment_type: null,
  status: null,
  date: null,
  dept_code: null,
  employment_type: null,
  search: null,
  is_active: false,
});

const loading = ref(false);
const activeState = ref(null);
const staffData = ref([]);

// Get Staff Summary
const fetchStaffSummary = async () => {
  loading.value = false;

  try {
    const res = await getStaffSummary();
    staffSummaryData.value = res;
    btns[0].value = res.staff_stats.active_staff;
    btns[1].value = res.staff_stats.on_probation;
    btns[2].value = res.staff_stats.on_study_leave;
    btns[3].value = res.staff_stats.retired_staff;
    console.log(res);
  } catch (error) {
    message.error("Staff Summary could not be fetched");
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// Get All Staff
const fetchStaffData = async () => {
  loading.value = true;

  try {
    const res = await getAllStaff({
      dept_code: data.dept_code,
      employment_type: data.employment_type,
      search: data.search,
    });
    staffData.value = res;
    console.log(res, "Beans");
  } catch (error) {
    message.error("Staff data could not be fetched");
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// Export Staff List
const exportStaffList = async () => {
  try {
    loading.value = true;
    const res = await exportStaff({
      dept_code: data.dept_code,
      employment_type: data.employment_type,
      search: data.search,
    });
    staffData.value = res;
    console.log(res, "Beans");
  } catch (error) {}
};

function isActive(id) {
  activeState.value = id;
  console.log(id);
}
const btns = reactive([
  { name: "Active Staff", value: 0 },
  { name: "On Probation", value: 0 },
  { name: "On Study Leave", value: 0 },
  { name: "Retired", value: 0 },
]);
const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];
// SET THE ACTIVE STATE TO ACTIVE STAFF
onMounted(() => {
  activeState.value = btns[0].name;
  fetchStaffData();
  fetchStaffSummary();
});

// Show Modals
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
function CloseAppriasalModal1() {
  show1.value = false;
}
function OpenAppriasalModal1() {
  show1.value = true;
}
function CloseAppriasalModal2() {
  show4.value = false;
}
function OpenAppriasalModal2() {
  show4.value = true;
  console.log(show4.value);
}
function CloseAddNewStaffModal() {
  show2.value = false;
}
function OpenAddNewStaffModal() {
  show2.value = true;
}
function CloseGenerateModal() {
  show3.value = false;
}
function OpenGenerateModal() {
  show3.value = true;
}
const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns
const columns = [
  {
    title: "Staff ID",
    key: "id",
  },
  { title: "Full Name", key: "full_name" },
  { title: "Position", key: "position" },
  { title: "Rank  ", key: "rank" },
  {
    title: "Role",
    key: "role",
    render(row) {
      return h(
        "a",
        {
          class: "text-blue-600 hover:underline cursor-pointer",
          onClick: () => router.push(`/admin-users/edit/${row.id}`),
        },
        row?.staff_roles[0]?.role,
      );
    },
  },
  { title: "Employment Type", key: "employment_type" },
  { title: "Employment Date", key: "date_of_employment" },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
