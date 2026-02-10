<template>
  <form class="all_staff_directory w-full">
    <div
      class="top flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between gap-[20px] items-center"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-bold text-(--sec-text) w-[160px] text-[20px] leading-[120%] tracking-[-2%]"
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
            placeholder="Search for anything..."
            id="search"
            :bordered="false"
            v-model:value="data.search"
            class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
          />
        </div>
      </div>
      <div
        class="right grid grid-cols-1 w-[50%] items-center gap-[15px] flex-wrap lg:grid-cols-3 md:grid-cols-3"
      >
        <n-select
          :options="unitOptions"
          clearable
          v-model:value="data.faculty"
          name="faculty"
          id="faculty"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-select
          clearable
          v-model:value="data.rank_applied"
          name="rank_applied"
          id="rank_applied"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>

        <n-select
          clearable
          v-model:value="data.status"
          name="status"
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
    <TeachingResearchAdministrativeDuties
      :show2
      @closeTeachingResearchAndAdminstrativeDutiesModal="
        CloseTeachingResearchAndAdministrativeDuties
      "
      @OpenExternalEvaluationSubmissionModal="OpenExternalEvaluationSubmission"
    />
    <StaffInformation
      :show
      @closeStaffInformationModal="CloseStaffInformation"
      @OpenTeachingResearchAndAdminstrativeDutiesModal="
        OpenTeachingResearchAndAdministrativeDuties
      "
    />
    <ExternalEvaluationSubmission
      :show3
      @closeExternalEvaluationSubmissionModal="
        CloseExternalEvaluationSubmission
      "
    />
  </form>
</template>
<script setup>
import { ref, reactive } from "vue";
import ExternalEvaluationSubmission from "@/components/ExternalAccessorComponents/ExternalEvaluationSubmission.vue"
import TeachingResearchAdministrativeDuties from "@/components/ExternalAccessorComponents/TeachingResearchAdministrativeDuties.vue"
import StaffInformation from "@/components/ExternalAccessorComponents/StaffInformation.vue"
import Orbit from "@/assets/imgs/Orbit.png";

const data = reactive({
  faculty: null,
  rank_applied: null,
  status: null,
  search: null,
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

// Show Modals
const show = ref(false);
const show2 = ref(false);
const show3 = ref(false);

function CloseStaffInformation() {
  show.value = false;
}
function OpenStaffInformation() {
  show.value = true;
}
function CloseTeachingResearchAndAdministrativeDuties() {
  show2.value = false;
}
function OpenTeachingResearchAndAdministrativeDuties() {
  show2.value = true;
}
function OpenExternalEvaluationSubmission() {
  show3.value = true;
}
function CloseExternalEvaluationSubmission() {
  show3.value = false;
}

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns
const columns = [
  {
    title: "Name",
    key: "name",
    render(row) {
      return h(
        "a",
        {
          class: "text-blue-600 hover:underline font-semibold cursor-pointer",
          onClick: () => router.push(`/home/edit/${row.id}`),
        },
        row.id
      );
    },
  },
  { title: "Department ", key: "department " },
  { title: "Faculty ", key: "faculty " },
  { title: "Rank Applied ", key: "rank_applied " },
  { title: "Last Updated", key: "last_updated" },
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
        row.is_active
      );
    },
  },
  {
    title: "Action ",
    key: "action",
    render(row) {
      row.isActive <= 10
        ? h(
            "a",
            {
              href: row.file,
              download: "",
              style:
                "rounded-[2px] text-[rgba(255,255,255,1)] font-[700] text-[14px] leading-[100%] flex gap-3 items-center justify-center tracking-[0%] px-[20px] py-[16px] bg-[rgba(35,136,255,1)]",
            },
            ["Continue"]
          )
        : row.isActive == 0
        ? h(
            "a",
            {
              href: row.file,
              download: "",
              style:
                "rounded-[2px] text-[rgba(255,255,255,1)] font-[700] text-[14px] leading-[100%] flex gap-3 items-center justify-center tracking-[0%] px-[20px] py-[16px] bg-[rgba(35,136,255,1)]",
            },
            ["Start"]
          )
        : h(
            "a",
            {
              href: row.file,
              download: "",
              style:
                "rounded-[2px] text-[rgba(255,255,255,1)] font-[700] text-[14px] leading-[100%] flex gap-3 items-center justify-center tracking-[0%] px-[20px] py-[16px] bg-[rgba(35,136,255,1)]",
            },
            ["View"]
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
