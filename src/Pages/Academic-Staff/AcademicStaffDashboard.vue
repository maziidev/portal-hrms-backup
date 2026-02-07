<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
    <div
      class="bg-[var(--twhite)] p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div
        class="rounded-[17px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[40px]"
      >
        <h4 class="text-[rgba(141,193,255,1)] mbs">Appraisal Status</h4>
        <div class="flex justify-between items-center gap-3">
          <div class="balance">
            <h2
              class="text-[rgba(255,255,255,1)] text-[14px] font-[500] leading-[120%] tracking-[-2%]"
            >
              2024/2025 Appraisal: Open – Due in 14 days
            </h2>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[30px]">
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Promotion Eligibility
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              Eligible for Senior Lecturer
            </p>
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
              Leave Balance
            </h2>
            <!-- <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      Ongoing appraisal sessions awaiting completion
                    </p> -->
          </div>
          <div class="price">
            <h2
              class="text-[rgba(152,159,176,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
            >
              12 Days Remaining
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Publications Logged
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              9 Publications Submitted
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
            >
              Approved
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-[var(--twhite)] p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col"
    >
      <div class="">
        <h2
          class="text-[var(--primary)] font-[600] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Performance Overview
        </h2>
      </div>
      <div id="chart" class="items-center flex flex-col">
        <apexchart
          type="donut"
          height="250"
          :options="pieChartOptions"
          :series="pieSeries"
        />
      </div>

      <div class="flex flex-col gap-[10px]">
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[15px] block bg-[rgba(43,77,237,1)] h-[15px] rounded-full"
              ></span>
              <h2
                class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
              >
                2022
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              15/17
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[15px] block bg-[rgba(35,136,255,1)] h-[15px] rounded-full"
              ></span>
              <h2
                class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
              >
                2023
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              10/16
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex justify-between gap-[10px] items-center w-full">
            <div class="flex gap-4 items-center">
              <span
                class="w-[15px] block bg-[rgba(35,136,255,1)] h-[15px] rounded-full"
              ></span>
              <h2
                class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
              >
                2024
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              11/19
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-[var(--twhite)] p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div class="">
        <h2
          class="text-[rgba(27,37,89,1)] mb-[10px] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Announcements
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
              >
                Appraisal Period Now Open
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
              >
                Academic Promotion Guidelines Updated
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
              >
                New Research Grant Opportunities
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
          <div class="flex justify-center gap-[10px] items-center w-full">
            <p
              class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
            >
              Stay informed on every faculty update and HR memo
            </p>
          </div>
        </div>
      </div>
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
      class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 bg-white gap-[15px]"
    >
      <button
        class="flex items-center h-[45px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fa fa-file-text text-[rgba(255,255,255,1)]"></i>

        Start Self-Appraisal
      </button>
      <button
        class="flex items-center py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fa fa-user-plus text-[rgba(255,255,255,1)]"></i>

        Apply for Leave
      </button>
      <button
        class="flex items-center h-[45px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
      >
        <i class="fas fa-award text-[rgba(255,255,255,1)]"></i>

        Submit Promotion Request
      </button>
    </div>
  </div>

  <!-- Upcoming Retirements -->
  <form class="pending_requests w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[30px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-[700] text-[var(--sec-text)] w-[250px] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Recent Appraisals
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
import { ref, reactive, computed } from "vue";
import OpenAppraisal1 from "@/components/AdminComponents/OpenAppraisal1.vue";
import OpenAppraisal2 from "@/components/AdminComponents/OpenAppraisal2.vue";
import GenerateReport from "@/components/AdminComponents/GenerateReport.vue";
import AddNewStaff from "@/components/AdminComponents/AddNewStaff.vue";

const form = reactive({
  date: null,
  year_of_services: null,
});

// Pie Chart
const pieSeries = ref([65, 58, 90]);
const labels = ref(["2022", "2023", "2024"]);
const colors = ["rgba(35,136,255,1)", "rgba(43,7,237,1)", "rgba(6,108,229,1)"];

const pieChartOptions = computed(() => ({
  chart: {
    type: "donut",
    toolbar: { show: true },
    animations: { enabled: true },
    events: {
      // Example: click on a slice
      dataPointSelection: (event, chartContext, config) => {
        const idx = config.dataPointIndex;
        const label = labels.value[idx];
        const value = pieSeries.value[idx];
        // You can emit or handle this event as needed
        // console.log('Slice clicked:', { label, value })
      },
    },
  },
  labels: labels.value,
  colors,
  legend: { show: false },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { width: "100%" },
        legend: { position: "bottom" },
      },
    },
    {
      breakpoint: 1024,
      options: {
        chart: { width: 380 },
      },
    },
  ],
  tooltip: {
    y: {
      formatter: (val) => `${val}`, // format value text
    },
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
      donut: {
        size: "58%",
        labels: {
          show: false,
        },
      },
    },
  },
}));

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
const currentDataset = ref("week");
function updateChartData(event) {
  console.log(event.target.id);
  for (let x in DataSets) {
    console.log(btns.value);
    if (event.target.id === x) {
      series.value[0].data = DataSets[x];
      event.target.classList.add("bg-[rgba(35,136,255,1)]");
      event.target.classList.add("text-[rgba(247,249,250,1)]");
      btns.value.forEach((button) => {
        if (button.value.id !== event.target.id) {
          button.value.classList.remove("bg-[rgba(35,136,255,1)]");
          button.value.classList.remove("text-[rgba(247,249,250,1)]");
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

import Orbit from "@/assets/imgs/Orbit.png";

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
  {
    title: "Status ",
    key: "status ",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "Submitted"
              ? "bg-[rgba(107,114,128,0.2)] px-[20px] py-[10px] rounded-[22.5px] text-[rgba(107,114,128,1)] font-[700] text-[14px] leading-[100%] tracking-[0%]"
              : row.is_active == "In Review"
                ? "bg-[rgba(35,136,255,0.15)] px-[20px] py-[10px] rounded-[22.5px] text-[rgba(35,136,255,1)] font-[700] text-[14px] leading-[100%] tracking-[0%]"
                : "bg-[rgba(234,67,53,0.2)] px-[20px] py-[10px] rounded-[22.5px] text-[rgba(234,67,53,1)] font-[700] text-[14px] leading-[100%] tracking-[0%]",
        },
        row.is_active,
      );
    },
  },
  { title: "Reviewed By ", key: "reviewed_by " },
  { title: "Rating", key: "rating " },
  { title: "Remarks", key: "remarks" },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
