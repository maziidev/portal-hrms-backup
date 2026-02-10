<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
    <div
      class="bg-var(--twhite) p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col gap-[30px]"
    >
      <div
        class="rounded-[17px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[20px] py-[20px] px-[20px]"
      >
        <h4 class="text-[rgba(141,193,255,1)] mbs">Pending Evaluations</h4>
        <div class="flex justify-between items-center gap-[10px]">
          <div class="balance">
            <h2
              class="text-[rgba(255,255,255,1)] text-[14px] font-[500] leading-[120%] tracking-[-2%]"
            >
              {{ pending }}
            </h2>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-[30px] h-full">
        <div class="flex justify-between items-center justify-self-start">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              In Progress
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              You’ve opened these profiles but haven’t submitted yet.
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
            >
              2
            </h2>
          </div>
        </div>
        <div class="flex justify-between items-center justify-self-end">
          <div class="flex justify-between flex-col gap-2">
            <h2
              class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
            >
              Completed Evaluations
            </h2>
            <p
              class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
            >
              You’ve submitted final assessments successfully.
            </p>
          </div>
          <div class="price">
            <h2
              class="text-[rgba(141,193,255,1)] font-[600] text-[12px] leading-[120%] tracking-[-2%]"
            >
              12
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-var(--twhite) p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div class="">
        <h2
          class="text-[var(--primary)] font-[600] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Evaluations per Status
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
                Completed
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              {{ completed }}
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
                Pending
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              {{ pending }}
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
                In Progress
              </h2>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
            >
              {{ inProgress  }}
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
          class="text-[rgba(27,37,89,1)] mb-[10px] font-bold text-[20px] leading-[120%] tracking-[-2%]"
        >
          Faculty Distribution
        </h2>
      </div>
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

  <!-- Upcoming Retirements -->
  <form class="pending_requests w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[30px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-bold text-(--sec-text) w-62.5 text-[20px] leading-[120%] tracking-[-2%]"
        >
          Evaluation Summary
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
  <form action="#" class="modals" @submit.prevent=""></form>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import SessionSemesterDate from "@/components/General/SessionSemesterDate.vue";
import SideBar from "@/components/General/SideBar.vue";
import { useAuthStore } from "@/store/auth.js";
import { getExaminerDashboardStats } from "@/apis/externalaccessor.js";

const loading = ref(false);
const store = useAuthStore();
const user = store.user;
const form = reactive({
  date: null,
  search: null,
  year_of_services: null,
});
const pending = ref(null);
const completed = ref(null);
const inProgress = ref(12);
// Pie Chart
const pieSeries = ref([65, 58, 90]);
const labels = ref(["Completed", "Pending", "In Progress"]);
const colors = ["rgba(43,7,237,1)", "rgba(35,136,255,1)", "rgba(6,108,229,1)"];
const externalAccessorStats = ref([]);

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
const series_1 = ref([
  {
    name: "Average Years-in-Rank",
    data: [64, 44, 76, 78, 70, 70, 50, 55],
  },
]);

const verticalChartOptions = ref({
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
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
});

const fetchStats = async () => {
  loading.value = true;
  try {
    const res = await getExaminerDashboardStats();

    // series_1.value[0].data = res.faculty_distribution
    console.log(res);
    pending.value = res.pending_count;
    completed.value = res.my_completed_actions;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
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
    data: [73, 94, 76, 78, 70, 70, 50, 55],
  },
]);


onMounted( async ()=> {
  fetchStats();
})

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


// Define table columns
const columns = [
  {
    title: "Staff",
    key: "staff",
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
