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
                class="text-[var(--pri-text)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
                to="/hod/leave-management"
                class="text-[rgba(14,253,193,1)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
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
            <div class="flex items-center gap-[10px]">
              <router-link
                to="/hod/leave-management"
                class="flex items-center gap-[10px]"
              >
                <i class="fas fa-chevron-left"></i>

                <span
                  class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
                  >Back</span
                > </router-link
              ><span
                class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
                >Leave Balance Report</span
              >
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
            <div class="flex justify-between items-center gap-[10px]">
              <div class="flex items-center gap-2">
                <h2
                  class="text-[rgba(163,174,208,1)] font-[500] text-[16px] leading-[120%] tracking-[-2%]"
                >
                  Department Overview
                </h2>
              </div>

              <div class="semester flex items-center gap-[10px]">
                <a href="#"
                  ><i
                    class="fa fa-ellipsis-h text-[rgba(152,159,176,1)] text-[40px]"
                  ></i
                ></a>
              </div>
            </div>
          </div>

          <form class="w-full mb-5">
            <div
              class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[10px]"
            >
              <div
                class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
              >
                <h2
                  class="font-[700] text-[var(--sec-text)] w-[250px] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Leave Requests Overview
                </h2>
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
                  name="leave_type"
                  id="leave_type"
                  v-model:value="form.leave_type"
                  :options="leaveTypes"
                  clearable
                  :bordered="true"
                  placeholder="Leave Type"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.cadre"
                  :options="cadre"
                  clearable
                  :bordered="true"
                  name="cadre"
                  id="cadre"
                  placeholder="Cadre"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.month_year"
                  :options="monthsYearOptions"
                  clearable
                  :bordered="true"
                  name="status"
                  id="status"
                  placeholder="Month / Year"
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
        </div>
        <form action="#" class="modals" @submit.prevent="">
          <StaffAppraisalForm
            :show
            @closeStaffAppraisalForm="closeStaffAppraisalForm"
            @openPerformanceEvaluation="openPerformanceEvaluation"
          />
          <PerformanceEvaluation
            :show1
            @closePerformanceEvaluation="closePerformanceEvaluation"
            @openTeachingResearch="openTeachingResearch"
          />
          <TeachingResearch
            :show2
            @closeTeachingResearch="closeTeachingResearch"
            @openConductDiscipline="openConductDiscipline"
          />
          <ConductDiscipline
            :show3
            @closeConductDiscipline="closeConductDiscipline"
            @openGoalsDevelopment="openGoalsDevelopment"
          />
          <GoalsDevelopment
            :show4
            @closeGoalsDevelopment="closeGoalsDevelopment"
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
import { ref, reactive, h, computed } from "vue";
import Orbit from "@/assets/imgs/Orbit.png";
import StaffAppraisalForm from "@/components/HodComponents/StaffAppraisalForm.vue";
import SummaryAndSubmission from "@/components/HodComponents/SummaryAndSubmission.vue";
import GoalsDevelopment from "@/components/HodComponents/GoalsDevelopment.vue";
import ConductDiscipline from "@/components/HodComponents/ConductDiscipline.vue";
import TeachingResearch from "@/components/HodComponents/TeachingResearch.vue";
import PerformanceEvaluation from "@/components/HodComponents/PerformanceEvaluation.vue";

const form = reactive({
  status: null,
  date: null,
  is_active: false,
  leave_type: null,
  month_year: null,
  remaining_day: null,
  search: "",
});
let monthsYearOptions = reactive([
  {
    label: "Month Year One",
    value: "Month Year One",
  },
]);
let cadre = reactive([
  {
    label: "Level One",
    value: "Level One",
  },
]);

let leaveTypes = reactive([
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

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const columns = [
  { title: "Name", key: "name" },
  { title: "Leave Type", key: "leave_type" },
  { title: "Entitlement", key: "entitlement" },
  { title: "Taken", key: "taken" },
  { title: "Remaining Days", key: "remaining_days" },
  {
    title: "Status ",
    key: "status",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "Ongoing"
              ? "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]"
              : row.is_active == "Updated"
              ? "rounded-[22.5px] text-[rgba(35,136,255,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(78,159,255,0.2)]"
              : "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]",
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
