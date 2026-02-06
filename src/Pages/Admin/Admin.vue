<template>
  <div
    class="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] gap-[25px]"
  >
    <div
      class="bg-[var(--twhite)] p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div
        class="rounded-[40px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[40px]"
      >
        <h4 class="text-[rgba(141,193,255,1)] mbs">Total Department Staff</h4>
        <div class="flex justify-between items-center gap-3">
          <div class="balance">
            <h2
              class="text-[rgba(255,255,255,1)] text-[34px] font-[700] leading-[120%] tracking-[-2%]"
            >
              23,458
            </h2>
          </div>
          <div class="flex gap-3 items-center">
            <i class="fa fa-caret-up text-[rgba(14,253,193,1)]"></i>
            <span class="text-[rgba(14,253,193,1)]">+12</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[40px]">
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Active Staffs
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              96.6%
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              21,228
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Retired
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              3.4%
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              2,220
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Academic Staffs
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              65.4%
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              16,930
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Non-Academic
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              34.6%
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              7,228
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div
      class="leave_category_distribution flex flex-col justify-between border bg-[rgba(255,255,255,1)] rounded-[20px]"
    >
      <div
        class="top flex flex justify-between p-[20px] w-full gap-[10px] items-center"
      >
        <h2
          class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
        >
          Appraisal Progress Overview
        </h2>
        <div
          class="flex leave_category_distribution switch_bar > border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
        >
          <button
            id="week"
            @click="updateChartData($event)"
            ref="btn1"
            class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
          >
            Week
          </button>
          <button
            id="month"
            @click="updateChartData($event)"
            ref="btn2"
            class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
          >
            Month
          </button>
          <button
            id="year"
            @click="updateChartData($event)"
            ref="btn3"
            class="active rounded-[4px] text-[rgba(30,30,30,1)] font-[400] text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
          >
            Year
          </button>
        </div>
      </div>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="quick_actions flex flex-col gap-[15px]">
    <h2
      class="text-[rgba(30,43,58,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
    >
      Quick Actions
    </h2>
    <div
      class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 bg-white gap-[15px]"
    >
      <button
        @click="OpenAddNewStaffModal"
        class="flex items-center add_new_staff_ py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fa fa-user-plus text-[rgba(255,255,255,1)]"></i>

        Add New Staff
      </button>
      <button
        @click="OpenAppriasalModal1"
        class="flex items-center appraisal_cycle_ py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fa fa-file-text text-[rgba(255,255,255,1)]"></i>
        Open Appraisal
      </button>
      <button
        @click="OpenGenerateModal"
        class="flex generate_report_ items-center py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fas fa-file text-[rgba(255,255,255,1)]"></i>
        Generate Report
      </button>
    </div>
  </div>

  <!-- Upcoming Retirements -->
  <form class="pending_requests w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-0 md:gap-[30px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-[700] text-[var(--sec-text)] w-[250px] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Upcoming Retirements
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
            v-model:value="form.search"
            class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
          />
        </div>
      </div>
      <div
        class="right flex items-center gap-5 w-[50%] flex-wrap lg:flex-nowrap md:flex-nowrap"
      >
        <n-select
          name="date"
          id="date"
          v-model:value="form.units"
          :options="dates"
          clearable
          :bordered="true"
          placeholder="Date"
          class="cursor-pointer rounded-[10px] outline-none py-[11px]"
        >
        </n-select>
        <n-select
          v-model:value="form.units"
          :options="years_of_services"
          clearable
          :bordered="true"
          name="years_of_service"
          id="years_of_service"
          placeholder="Year of service"
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
          :data="staffData"
          :bordered="false"
          :scroll-x="1200"
          :pagination="pagination"
        />
      </div>
    </div>
  </form>
  <form action="#" class="modals" @submit.prevent="">
    <AddNewStaff :show2 @CloseModalForAddNewStaff="CloseAddNewStaffModal" />
    <OpenAppraisal1
      :show1
      @CloseModalForOpenAppriasal2="CloseAppriasalModal2"
      @CloseModalForOpenAppriasal1="CloseAppriasalModal1"
      @OpenAppraisalModal2="OpenAppriasalModal2"
    />
    <OpenAppraisal2
      :show4
      @CloseModalForOpenAppriasal2="CloseAppriasalModal2"
    />

    <GenerateReport :show3 @CloseModalForGenerateReport="CloseGenerateModal" />
  </form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useMessage } from "naive-ui";
import OpenAppraisal1 from "@/components/AdminComponents/OpenAppraisal1.vue";
import OpenAppraisal2 from "@/components/AdminComponents/OpenAppraisal2.vue";
import GenerateReport from "@/components/AdminComponents/GenerateReport.vue";
import AddNewStaff from "@/components/AdminComponents/AddNewStaff.vue";
import Orbit from "@/assets/imgs/Orbit.png";
import { getAllStaff } from "@/apis/admin.js";

const staffData = ref([]);
const form = reactive({
  date: null,
  search: null,
  dept_code: null,
  employment_type: null,
  year_of_services: null,
});

const years_of_services = reactive([
  { label: "0-5 years", value: "0-5 years" },
  { label: "5-7 years", value: "5-7 years" },
  { label: "0-5 years", value: "0-5 years" },
]);
const dates = reactive([
  { label: "22-02-2024", value: "22-02-2024" },
  { label: "22-02-2024", value: "22-02-2024" },
  { label: "22-02-2024", value: "22-02-2024" },
]);

const loading = ref(false);
const message = useMessage();
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

const btns = ref([]);
const btn1 = ref(null);
const btn2 = ref(null);
const btn3 = ref(null);

btns.value[0] = btn1;
btns.value[1] = btn2;
btns.value[2] = btn3;
const series = ref([
  {
    name: "Average Years-in-Rank",
    data: [64, 64, 76, 78, 70, 70, 50, 55],
  },
]);

const DataSets = reactive({
  week: [30, 45, 60, 25, 50, 50, 20, 40],
  month: [45, 55, 65, 40, 60, 20, 40, 65],
  year: [25, 35, 50, 20, 40, 65, 40, 60],
});
onMounted(async () => {
  btns.value[0].value.classList.add("bg-[rgba(35,136,255,1)]");
  btns.value[0].value.classList.add("text-[rgba(247,249,250,1)]");
  btns.value[0].value.classList.remove("text-[rgba(30,30,30,1)]");
  series.value[0].data = DataSets["week"];

  staffData.value = await getAllStaff({
    dept_code: form.dept_code,
    employment_type: form.employment_type,
    search: form.search,
  });
});

const currentDataset = ref("week");
function updateChartData(event) {
  console.log(event.target.id);
  for (let x in DataSets) {
    console.log(btns.value);
    if (event.target.id === x) {
      series.value[0].data = DataSets[x];
      event.target.classList.add("bg-[rgba(35,136,255,1)]");
      event.target.classList.add("text-[rgba(247,249,250,1)]");
      event.target.classList.remove("text-[rgba(30,30,30,1)]");
      btns.value.forEach((button) => {
        if (button.value.id !== event.target.id) {
          button.value.classList.remove("bg-[rgba(35,136,255,1)]");
          button.value.classList.remove("text-[rgba(247,249,250,1)]");
          button.value.classList.add("text-[rgba(30,30,30,1)]");

          console.log(button.value);
        }
      });
    }
  }
  currentDataset.value = event.target.id;
  event.target.className;
}

const chartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "Arts",
      "Agriculture",
      "Biosciences",
      "Bus. Admin",
      "Education",
      "Engineering",
      "Env. Science",
      "Phy. Science",
    ],
  },
  colors: ["#2388ff"],
});

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
        row.id,
      );
    },
  },
  { title: "Department ", key: "department " },
  { title: "Years of Service ", key: "years_of_service " },
  { title: "Retirement Date", key: "retirement_date" },
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
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
