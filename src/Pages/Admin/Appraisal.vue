<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-[2000] font-bold text-[30px] top-[20px] right-[20px] px-[4px] py-[-2px] rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen">
      <div class=" ">
        <aside
          :class="[
            `{ w-67 sidebar z-3000 transition-all duration-100 ease-in-out  fixed top-0 left-0 h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]`,
            !toggleState ? `hidden` : `md:flex lg:flex`,
          ]"
        >
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-bold text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-[25px]">
            <li>
              <router-link
                to="/admin"
                class="text-(--pri-text) cursor-pointer font-normal flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/staff-managment"
                class="text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Management</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/appraisal"
                class="text-[rgba(14,253,193,1)] font-bold text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <a
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</a
              >
            </li>
            <li>
              <a
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career Progression</a
              >
            </li>
            <li>
              <a
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-calendar"></i> Retirement & Exit</a
              >
            </li>
            <li>
              <router-link
                to="/admin/report-analysis"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="Report_Analysis.html"
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Analytics</router-link
              >
            </li>
          </div>

          <div class="flex flex-col gap-[25px]">
            <li>
              <a
                class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa fa-gear"></i> Settings</a
              >
            </li>
            <li>
              <a
                class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa-solid fa-right-from-bracket"></i> Logout</a
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <i class="fa fa-bell text-(--pri-text)"></i>
              <span
                class="text-(--pri-text) flex items-center gap-2 font-normal text-[16px] tracking-[-2%] leading-[120%]"
                >Notification</span
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <div class="user">
                <i class="fa fa-user text-xl text-(--pri-text)"></i>
              </div>
              <div class="user-id mbc text-(--pri-text) break-words">
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
              <h2 class="bc mb-[7px]">Appraisal Management</h2>
              <h5 class="sbc">
                Set up, monitor, and close staff appraisals across the
                university.
              </h5>
            </div>
            <div class="md:flex lg:flex items-center gap-[10px] hidden">
              <i class="fa fa-bell text-(--sec-text)"></i>
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
                <div class="s16">Semester</div>
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
            class="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] gap-[25px]"
          >
            <div
              class="bg-var(--twhite) p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div
                class="rounded-[40px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[40px]"
              >
                <h4 class="text-[rgba(141,193,255,1)] mbs">
                  Total Appraisals Opened
                </h4>
                <div class="flex justify-between items-center gap-3">
                  <div class="balance">
                    <h2
                      class="text-[rgba(255,255,255,1)] text-[34px] font-bold leading-[120%] tracking-[-2%]"
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
              <div class="flex flex-col gap-[60px]">
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Faculties with 100% Completed Appraisal
                    </h2>
                  </div>
                  <div class="price">
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      5
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Faculties Pending
                    </h2>
                  </div>
                  <div class="price">
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      2
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Non-Academic Units Completed
                    </h2>
                  </div>
                  <div class="price">
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      4
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Non-Academic Units Pending
                    </h2>
                  </div>
                  <div class="price">
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      1
                    </p>
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
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
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
                    class="active rounded-[4px] text-[rgba(30,30,30,1)] font-normal text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                  >
                    Week
                  </button>
                  <button
                    id="month"
                    @click="updateChartData($event)"
                    ref="btn2"
                    class="active rounded-[4px] text-[rgba(30,30,30,1)] font-normal text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
                  >
                    Month
                  </button>
                  <button
                    id="year"
                    @click="updateChartData($event)"
                    ref="btn3"
                    class="active rounded-[4px] text-[rgba(30,30,30,1)] font-normal text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]"
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

          <div
            class="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-2 gap-[5px]"
          >
            <div
              class="draft_appraisals h-full flex flex-col bg-[rgba(255,255,255,1)] rounded-[20px]"
            >
              <div
                class="top flex flex justify-between p-[20px] w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
                >
                  Draft Appraisals
                </h2>
                <div
                  class="flex draft_ switch_bar border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    v-for="draftedAppraisal in draftedAppraisals"
                    :key="draftedAppraisal.name"
                    @click="switchDraftAppraisal(draftedAppraisal.name)"
                    :id="draftedAppraisal.name"
                    :class="[
                      `active rounded-[4px] text-[rgba(30,30,30,1)] font-normal text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
                      draftedAppraisal.name === isActiveDraftedAppraisal
                        ? `bg-[rgba(35,136,255,1)] text-[rgba(247,249,250,1)]`
                        : `text-[rgba(30,30,30,1)]`,
                    ]"
                  >
                    {{ draftedAppraisal.name }}
                  </button>
                </div>
              </div>
              <div class="w-full overflow-hidden px-[10px]">
                <div class="overflow-x-auto">
                  <n-data-table
                    :columns="closedTableColums"
                    :data="data"
                    :loading="loading"
                    :bordered="false"
                    :scroll-x="1200"
                    :pagination="pagination"
                  />
                  <!-- <table
                    class="min-w-full whitespace-nowrap text-left border-spacing-y-[20px] border-separate"
                  >
                    <thead>
                      <tr class="">
                        <th class="p-5">
                          Appraisal Title <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Created On <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Action <i class="fa fa-caret-down"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="shadow-[1px_17px_44px_0px_rgba(3,2,41,0.07)] rounded-[10px]"
                      >
                        <td class="p-5">Q3 Staff Review</td>
                        <td class="p-5">
                          <span
                            ><i
                              class="fas fa-calendar text-[rgba(0,194,168,1)]"
                            ></i></span
                          ><span class="mx-5">05 Aug 2025</span>
                        </td>
                        <td class="p-5">
                          <div
                            class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
                          >
                            <button class="edit">
                              <i
                                class="fas fa-pen-to-square text-[rgba(17,7,73,1)]"
                              ></i>
                            </button>
                            <button class="edit">
                              <i
                                class="fa fa-trash text-[rgba(234,67,53,1)]"
                              ></i>
                            </button>
                            <button
                              class="launch rounded-[2px] text-[rgba(255,255,255,1)] py-[10px] px-[20px] bg-[rgba(35,136,255,1)] font-bold text-[14px] leading-[100%]"
                            >
                              Launch
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr
                        class="shadow-[1px_17px_44px_0px_rgba(3,2,41,0.07)] rounded-[10px]"
                      >
                        <td class="p-5">Q3 Staff Review</td>
                        <td class="p-5">
                          <span
                            ><i
                              class="fas fa-calendar text-[rgba(0,194,168,1)]"
                            ></i></span
                          ><span class="mx-5">05 Aug 2025</span>
                        </td>
                        <td class="p-5">
                          <div
                            class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
                          >
                            <button class="edit">
                              <i
                                class="fas fa-pen-to-square text-[rgba(17,7,73,1)]"
                              ></i>
                            </button>
                            <button class="edit">
                              <i
                                class="fa fa-trash text-[rgba(234,67,53,1)]"
                              ></i>
                            </button>
                            <button
                              class="launch rounded-[2px] text-[rgba(255,255,255,1)] py-[10px] px-[20px] bg-[rgba(35,136,255,1)] font-bold text-[14px] leading-[100%]"
                            >
                              Launch
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr
                        class="shadow-[1px_17px_44px_0px_rgba(3,2,41,0.07)] rounded-[10px]"
                      >
                        <td class="p-5">Q3 Staff Review</td>
                        <td class="p-5">
                          <span
                            ><i
                              class="fas fa-calendar text-[rgba(0,194,168,1)]"
                            ></i></span
                          ><span class="mx-5">05 Aug 2025</span>
                        </td>
                        <td class="p-5">
                          <div
                            class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
                          >
                            <button class="edit">
                              <i
                                class="fas fa-pen-to-square text-[rgba(17,7,73,1)]"
                              ></i>
                            </button>
                            <button class="edit">
                              <i
                                class="fa fa-trash text-[rgba(234,67,53,1)]"
                              ></i>
                            </button>
                            <button
                              class="launch rounded-[2px] text-[rgba(255,255,255,1)] py-[10px] px-[20px] bg-[rgba(35,136,255,1)] font-bold text-[14px] leading-[100%]"
                            >
                              Launch
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table> -->
                </div>
              </div>
            </div>
            <div
              class="closed_appraisals h-full flex flex-col bg-[rgba(255,255,255,1)] rounded-[20px]"
            >
              <div
                class="top flex flex justify-between p-[20px] w-full gap-[10px] items-center"
              >
                <h2
                  class="text-[rgba(27,37,89,1)] text-[20px] tracking-[-2%] leading-[120%] font-bold"
                >
                  Closed Appraisals
                </h2>
                <div
                  class="flex closed_ switch_bar border rounded-[6px] bg-[rgba(241,243,247,1)] px-[4px] py-[4px] gap-[6px] items-center"
                >
                  <button
                    v-for="closedAppraisal in closedAppraisals"
                    :key="closedAppraisal.name"
                    @click="switchClosedAppraisal(closedAppraisal.name)"
                    :id="closedAppraisal.name"
                    :class="[
                      `active rounded-[4px] text-[rgba(30,30,30,1)] font-normal text-[14px] px-[8px] py-[10px] leading-[20px] tracking-[0%]`,
                      closedAppraisal.name === isActiveClosedAppraisal
                        ? `bg-[rgba(35,136,255,1)] text-[rgba(247,249,250,1)]`
                        : `text-[rgba(30,30,30,1)]`,
                    ]"
                  >
                    {{ closedAppraisal.name }}
                  </button>
                </div>
              </div>
              <div class="w-full overflow-hidden px-[10px]">
                <div class="overflow-x-auto">
                  <n-data-table
                    :columns="draftedTableColums"
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
                    placeholder="Search for anything..."
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
                  placeholder="Select department"
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
                  placeholder="Select Status"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-date-picker
                  v-model:value="form.date"
                  type="date"
                  placeholder="DD-MM-YYYY"
                  :bordered="false"
                  class="custom-select border border-slate-200"
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
          <AddNewStaff
            :show2
            @CloseModalForAddNewStaff="CloseAddNewStaffModal"
          />
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

          <GenerateReport
            :show3
            @CloseModalForGenerateReport="CloseGenerateModal"
          />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h, onMounted } from "vue";
import OpenAppraisal1 from "@/components/AdminComponents/OpenAppraisal1.vue";
import OpenAppraisal2 from "@/components/AdminComponents/OpenAppraisal2.vue";
import GenerateReport from "@/components/AdminComponents/GenerateReport.vue";
import AddNewStaff from "@/components/AdminComponents/AddNewStaff.vue";
import Orbit from "@/assets/imgs/Orbit.png";

const form = reactive({
  department: null,
  status: null,
  date: null,
  is_active: false,
  search: "",
});
let statusOptions = reactive({
  label: "Status One",
  value: "Status Two",
});
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
let draftedAppraisals = reactive([
  {
    name: "Week",
  },
  {
    name: "Month",
  },
  {
    name: "Year",
  },
]);
const isActiveDraftedAppraisal = ref(null);
function switchDraftAppraisal(state) {
  isActiveDraftedAppraisal.value = state;
}
const isActiveClosedAppraisal = ref(null);
let closedAppraisals = reactive([
  {
    name: "Week",
  },
  {
    name: "Month",
  },
  {
    name: "Year",
  },
]);
function switchClosedAppraisal(state) {
  isActiveClosedAppraisal.value = state;
}

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
      event.target.classList.remove("text-[rgba(30,30,30,1)]");

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

onMounted(() => {
  updateChartData({ target: btn1.value });
  btn1.value.classList.add("bg-[rgba(35,136,255,1)]");
  btn1.value.classList.add("text-[rgba(247,249,250,1)]");
  btn1.value.classList.remove("text-[rgba(30,30,30,1)]");
});

// Define table columns
const draftedTableColums = [
  { title: "Appraisal Title  ", key: "appraisal_title  " },
  { title: "Created On  ", key: "created_on  " },
  { title: "Action ", key: "action" },
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
const closedTableColums = [
  { title: "Appraisal Title  ", key: "appraisal_title  " },
  { title: "Created On  ", key: "created_on  " },
  { title: "Action ", key: "action" },
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
