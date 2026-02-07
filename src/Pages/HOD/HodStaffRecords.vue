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
          class="custom-select border"
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
  <form action="#" class="modals" @submit.prevent=""></form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";

import Orbit from "@/assets/imgs/Orbit.png";

const data = reactive({
  department_unit: null,
  employment_type: null,
  status: null,
  date: null,
  is_active: false,
});
const activeState = ref(null);

function isActive(id) {
  activeState.value = id;
  console.log(id);
}
const btns = reactive([
  { name: "Active Staff", value: 20300 },
  { name: "On Probation", value: 20560 },
  { name: "On Study Leave", value: 20300 },
  { name: "Retired", value: 10300 },
]);
const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];
// SET THE ACTIVE STATE TO ACTIVE STAFF
onMounted(() => {
  activeState.value = btns[0].name;
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
  { title: "Position", key: "position" },
  { title: "Rank  ", key: "rank" },
  { title: "Role", key: "role" },
  { title: "Employment Type  ", key: "employment_type  " },
  { title: "Employment Date  ", key: "employment_date  " },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
