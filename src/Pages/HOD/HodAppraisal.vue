<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-[2000] font-[700] text-[30px] top-[20px] right-[20px] px-[4px] py-[-2px] rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen">
      <div class=" ">
        <aside
          :class="[
            `{ w-[268px] sidebar z-[3000] transition-all duration-100 ease-in-out  fixed top-0 left-0 h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]`,
            !toggleState ? `hidden` : `md:flex lg:flex`,
          ]"
        >
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-[700] text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-[25px]">
            <li>
              <router-link
                to="/hod"
                class="text-[var(--pri-text)] cursor-pointer font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/staff-records"
                class="text-[var(--pri-text)] cursor-pointer font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/appraisal"
                class="text-[rgba(14,253,193,1)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
                to="/hod/leave-management"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</router-link
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career Progression</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-calendar"></i> Retirement & Exit</a
              >
            </li>
            <li>
              <router-link
                to="/hod/report-analysis"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="Report_Analysis.html"
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Analytics</router-link
              >
            </li>
          </div>

          <div class="flex flex-col gap-[25px]">
            <li>
              <a
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa fa-gear"></i> Settings</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa-solid fa-right-from-bracket"></i> Logout</a
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <i class="fa fa-bell text-[var(--pri-text)]"></i>
              <span
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                >Notification</span
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <div class="user">
                <i class="fa fa-user text-xl text-[var(--pri-text)]"></i>
              </div>
              <div class="user-id mbc text-[var(--pri-text)] break-words">
                Nnamdichuzu@edu.EU.ng
              </div>
            </li>
          </div>
        </aside>
      </div>
      <main class="lg:ml-[270px] md:ml-[270px] ml-[0px] min-w-screen relative">
        <div class="header">
          <header
            class="bg-[var(--pri-bg)] py-[25px] items-center px-[25px] w-[] top-0 flex justify-between"
          >
            <div class="w-[70%]">
              <h2 class="bc mb-[7px]">Appraisals</h2>
              <h5 class="sbc">
                Manage, review, and forward staff appraisal records for the
                current cycle
              </h5>
            </div>
            <div class="md:flex lg:flex items-center gap-[10px] hidden">
              <i class="fa fa-bell text-[var(--sec-text)]"></i>
              <div class="user">
                <i class="fa fa-user text-2xl"></i>
              </div>
              <div class="user-id mbc">Nnamdichuzu@edu.EU.ng</div>
            </div>
          </header>
        </div>

        <div class="main px-[25px] mt-[50px] flex flex-col gap-[40px]">
          <div class="">
            <div
              class="flex justify-between gap-[20px] flex-wrap md:flex-nowrap"
            >
              <div class="session flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16">Session</div>
                <div class="date mbc">2024/2025</div>
              </div>
              <div class="semester flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16" @click="openStaffAppraisalForm">Semester</div>
                <div class="date mbc">First</div>
              </div>
              <div class="semester flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16">28th September 2025</div>
                <div class="date mbc flex items-center gap-5">
                  <i class="fa fa-clock"></i><span>6:45 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-2 gap-[5px]"
          >
            <div
              class="completed_appraisals h-full flex flex-col bg-[rgba(255,255,255,1)] rounded-[20px]"
            >
              <div
                class="top flex justify-between p-[20px] w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Completed Appraisals
                </h2>
                <div
                  class="flex switch_bar border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    v-for="btn in completedAppraisalButtons"
                    :key="btn.id"
                    @click="switchButtonForCompletedAppraisal(btn)"
                    :class="[
                      btn.id == 'previous' ? `previous` : 'next',
                      `transition-all duration-10 ease-in-out`,
                      btn.id == completedAppraisalState &&
                        `bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)]`,
                      `rounded-[6px] px-[10px] py-[6px] cursor-pointer `,
                    ]"
                  >
                    <i :class="btn.name"></i>
                  </button>
                </div>
              </div>
              <div class="w-full overflow-hidden px-[10px]">
                <div class="overflow-x-auto">
                  <n-data-table
                    :columns="completedAppraisalTable"
                    :data="data"
                    :loading="loading"
                    :bordered="false"
                    :scroll-x="1200"
                    :pagination="pagination"
                  />
                </div>
              </div>
            </div>
            <div
              class="closed_appraisals h-full flex flex-col bg-[rgba(255,255,255,1)] rounded-[20px]"
            >
              <div
                class="top flex justify-between p-[20px] w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-[700]"
                >
                  Archived / Past Appraisals
                </h2>
                <div
                  class="flex closed_ switch_bar border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    v-for="btn in archivedAppraisalBtns"
                    :key="btn.id"
                    @click="switchArchivedAppraisal(btn.id)"
                    :class="[
                      btn.id == 'previous' ? `previous` : 'next',
                      `transition-all duration-10 ease-in-out`,
                      btn.id == isArchivedAppraisal &&
                        `bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)]`,
                      `rounded-[6px] px-[10px] py-[6px] cursor-pointer `,
                    ]"
                  >
                    <i :class="btn.name"></i>
                  </button>
                </div>
              </div>
              <div class="w-full overflow-hidden px-[10px]">
                <div class="overflow-x-auto">
                  <n-data-table
                    :columns="archivedAppraisalTableColumn"
                    :data="data"
                    :loading="loading"
                    :bordered="false"
                    :scroll-x="1200"
                    :pagination="pagination"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Retirements -->
          <form class="pending_requests w-full mb-5">
            <div class="">
              <h2
                class="text-[var(--sec-text)] my-[20px] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
              >
                Active Appraisals
              </h2>
            </div>
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
                    placeholder="Search by name or staff ID"
                    id="search"
                    :bordered="false"
                    v-model:value="form.search"
                    class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
                  />
                </div>
              </div>
              <div
                class="right grid grid-cols-3 gap-[20px] md:w-[50%] w-full lg:grid-cols-3 md:grid-cols-3"
              >
                <n-select
                  name="department"
                  id="department"
                  v-model:value="form.department"
                  :options="departments"
                  clearable
                  :bordered="true"
                  placeholder="Department / Unit"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.author"
                  :options="statusOptions"
                  clearable
                  :bordered="true"
                  name="status"
                  id="status"
                  placeholder="Author"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-date-picker
                  v-model:value="form.date"
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
                  :data="data"
                  :loading="loading"
                  :bordered="false"
                  :scroll-x="1200"
                  :pagination="pagination"
                />
              </div>
            </div>
          </form>
        </div>
        <form action="#" class="modals" @submit.prevent="">
          <StaffAppraisalForm
            :show
            @closeStaffAppraisalForm="closeStaffAppraisalForm"
            @openPerformanceEvaluation="openPerformanceEvaluation"
          />
          <PerformanceEvaluation
            :show1
            @openStaffAppraisalForm="openStaffAppraisalForm"
            @closePerformanceEvaluation="closePerformanceEvaluation"
            @openTeachingResearch="openTeachingResearch"
          />
          <TeachingResearch
            :show2
            @closeTeachingResearch="closeTeachingResearch"
            @openPerformanceEvaluation="openPerformanceEvaluation"
            @openConductDiscipline="openConductDiscipline"
          />
          <ConductDiscipline
            :show3
            @closeConductDiscipline="closeConductDiscipline"
            @openTeachingResearch="openTeachingResearch"
            @openGoalsDevelopment="openGoalsDevelopment"
          />
          <GoalsDevelopment
            :show4
            @closeGoalsDevelopment="closeGoalsDevelopment"
            @openConductDiscipline="openConductDiscipline"
            @openSummarySubmission="openSummarySubmission"
          />
          <SummaryAndSubmission
            :show5
            @closeSummarySubmission="closeSummarySubmission"
          />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h } from "vue";
import Orbit from "@/assets/imgs/Orbit.png";
import StaffAppraisalForm from "@/components/HodComponents/StaffAppraisalForm.vue";
import SummaryAndSubmission from "@/components/HodComponents/SummaryAndSubmission.vue";
import GoalsDevelopment from "@/components/HodComponents/GoalsDevelopment.vue";
import ConductDiscipline from "@/components/HodComponents/ConductDiscipline.vue";
import TeachingResearch from "@/components/HodComponents/TeachingResearch.vue";
import PerformanceEvaluation from "@/components/HodComponents/PerformanceEvaluation.vue";

const form = reactive({
  department: null,
  status: null,
  date: null,
  is_active: false,
  search: "",
});
let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status Two",
  },
]);
let departments = reactive([
  {
    label: "Computer science",
    value: "Computer science",
  },
  {
    label: "Electrical Engineering",
    value: "Electrical Engineering",
  },
]);

const show = ref(false);
function openStaffAppraisalForm() {
  show.value = true;
}
function closeStaffAppraisalForm() {
  show.value = false;
}

const show1 = ref(false);
function openPerformanceEvaluation() {
  show1.value = true;
  show.value = false;
  console.log("Working...");
}
function closePerformanceEvaluation() {
  show1.value = false;
}

const show2 = ref(false);
function openTeachingResearch() {
  show2.value = true;
  show1.value = false;
}
function closeTeachingResearch() {
  show2.value = false;
}

const show3 = ref(false);
function openConductDiscipline() {
  show3.value = true;
  show2.value = false;
}
function closeConductDiscipline() {
  show3.value = false;
}

const show4 = ref(false);
function openGoalsDevelopment() {
  show4.value = true;
  show3.value = false;
}
function closeGoalsDevelopment() {
  show4.value = false;
}

const show5 = ref(false);
function openSummarySubmission() {
  show5.value = true;
  show4.value = false;
}
function closeSummarySubmission() {
  show5.value = false;
}

const isArchivedAppraisal = ref("previous");
let archivedAppraisalBtns = reactive([
  {
    name: "fa fa-chevron-left",
    id: "previous",
  },
  {
    name: "fa fa-chevron-right",
    id: "next",
  },
]);
function switchArchivedAppraisal(state) {
  isArchivedAppraisal.value = state;
}

const completedAppraisalState = ref("previous");

function switchButtonForCompletedAppraisal(val) {
  completedAppraisalState.value = val.id;
  //   series_1.value[0].data = verticalChartDataSets[val.year];
}

const completedAppraisalButtons = reactive([
  {
    name: "fa fa-chevron-left",
    id: "previous",
  },
  {
    name: "fa fa-chevron-right",
    id: "next",
  },
]);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns
const archivedAppraisalTableColumn = [
  { title: "Year", key: "year" },
  { title: "Total Staff Appraised", key: "total_staff_appraised" },
  { title: "Avg. Score", key: "avg_score" },
  {
    title: "Action",
    key: "action",
    render(row) {
      return h(
        "a",
        {
          href: "",
          download,
          style:
            "rounded-[2px] text-[rgba(255,255,255,1)] font-[700] text-[14px] leading-[100%] flex gap-3 items-center justify-center tracking-[0%] px-[20px] py-[16px] bg-[rgba(35,136,255,1)]",
        },
        [h("i", { class: "fa fa-download" }), "Download"]
      );
    },
  },
];
const completedAppraisalTable = [
  { title: "Staff Name  ", key: "staff_name  " },
  { title: "Created On  ", key: "created_on  " },
  { title: "Overall Rating ", key: "Overall_rating" },
  { title: "Date Completed", key: "date_completed" },
  // {
  //   title: "Name",
  //   key: "name",
  //   render(row) {
  //     return h(
  //       "a",
  //       {
  //         class: "text-blue-600 hover:underline font-semibold cursor-pointer",
  //         onClick: () => router.push(`/home/edit/${row.id}`),
  //       },
  //       row.id
  //     );
  //   },
  // },
];
const columns = [
  { title: "Staff ID", key: "staff_id" },
  { title: "Staff Name", key: "staff_name" },
  { title: "Position", key: "position" },
  { title: "Appraisal Period", key: "appraisal_period" },
  { title: "Last Updated", key: "last_updated" },
  { title: "Progress", key: "progress" },
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
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
