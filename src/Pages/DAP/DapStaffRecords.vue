<template>
  <form class="w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[10px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-bold text-(--sec-text) w-[170px] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Faculty Records
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
import { ref, reactive, h, computed } from "vue";
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

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const columns = [
  { title: "Name", key: "name" },
  { title: "Department ", key: "department" },
  { title: "Current Rank", key: "current_rank" },
  { title: "Proposed Rank", key: "proposed_rank" },
  { title: "Years in Rank ", key: "years_in_rank " },
  { title: "Appraisal Avg. (%) ", key: "appraisal_avg" },
  { title: "Date Reviewed", key: "date_reviewed" },
  {
    title: "Status",
    key: "status",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "Approved"
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
