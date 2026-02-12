<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-50 font-bold text-3xl top-5 right-5 px-1 py-0 rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen">
      <div class=" ">
        <aside
          :class="[
            `{ w-64 sidebar z-50 transition-all duration-100 ease-in-out fixed top-0 left-0 h-screen md:flex lg:flex px-9 flex flex-col gap-16 py-11`,
            !toggleState ? `hidden` : `md:flex lg:flex`,
          ]"
          :style="{ background: 'var(--primary)' }"
        >
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-bold text-xl flex gap-2 items-center tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-6">
            <li>
              <router-link
                to="/admin"
                class="text-[var(--pri-text)] font-normal flex gap-2 items-center text-base tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/staff-managment"
                class="text-[var(--pri-text)] font-normal text-sm tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Management</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/appraisal"
                class="text-[rgba(14,253,193,1)] font-bold text-sm tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Appraisals</router-link
              >
            </li>

            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</a
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
                to="/admin/report-analysis"
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
              <h2 class="bc mb-[7px]">
                Q1 Staff Appraisal – Finance Department
              </h2>
              <h5 class="sbc">Appraisal ID: APP-2025-001</h5>
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
          <div
            class="flex justify-between gap-[20px] flex-wrap md:flex-nowrap lg:flex-nowrap"
          >
            <div class="left flex items-center gap-[20px]">
              <div class="back">
                <button
                  @click="previousPage"
                  class="flex items-center gap-[10px]"
                >
                  <i class="fa fa-chevron-left"></i> Back
                </button>
              </div>
              <div class="created_by flex items-center gap-1">
                <h3 class="font-bold text-[rgba(27,37,89,1)] text-xl">
                  Created By:
                </h3>
                <p class="font-medium text-base text-[rgba(27,37,89,1)]">
                  Mrs. A. Johnson (HOD Finance)
                </p>
              </div>
              <div class="calender flex items-center gap-1">
                <i class="fas fa-calendar"></i
                ><span class="text-[rgba(20,21,15,1)]">Jan–Mar 2025</span>
              </div>
            </div>
            <div
              class="right border flex items-center justify-around w-32 h-12 rounded-md"
              :style="{ background: 'rgba(241,243,247,1)', borderColor: 'rgba(225,228,237,1)' }"
            >
              <h2 class="rounded-full py-2 px-2" :style="{ background: 'rgba(0,194,168,1)' }"></h2>
              <h2 class="text-[rgba(30,30,30,1)] pt-1 font-semibold text-sm leading-[120%] tracking-[0%]">
                Active
              </h2>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              :class="[
                `rounded-2xl box cursor-pointer h-24 shadow flex flex-col justify-center gap-6 py-5 px-6`,
                activeState == btn.name ? `bg-[rgba(17,27,73,1)]` : `bg-white`,
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
                      `font-medium text-base text-[rgba(204,204,204,1)] leading-[120%] tracking-[-2%]`,
                    ]"
                  >
                    {{ btn.name }}
                  </h2>
                  <h2
                    :class="[
                      `text-3xl font-bold leading-[120%] tracking-[-2%]`,
                      activeState == btn.name ? `text-[rgba(255,255,255,1)]` : `text-[var(--sec-text)]`,
                    ]"
                  >
                    {{ btn.value }}
                  </h2>
                </div>
              </div>
            </button>
          </div>

          <!-- Staff Appraisal -->
          <div class="quick_actions flex justify-between flex-wrap lg:flex-nowrap md:flex-nowrap items-center gap-4">
            <div
              class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
            >
              <h2 class="text-[rgba(30,43,58,1)] font-bold text-xl leading-[120%] tracking-[-2%]">
                Staff Appraisal
              </h2>
            </div>
            <div
              class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
            >
              <button
                @click="OpenModal"
                class="border-2 text-white bulk_upload_ px-10 py-2.5 font-semibold text-base flex gap-2.5 items-center leading-[120%] tracking-[-2%] rounded-md"
                :style="{ background: 'rgba(35,136,255,1)', borderColor: 'rgba(35,136,255,1)' }"
              >
                Close Appraisal
              </button>
            </div>
          </div>

          <form class="all_staff_directory w-full">
            <div
              class="top flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between gap-[20px] items-center"
            >
              <div class="left flex items-center md:w-[50%] gap-[15px]">
                <div class="relative h-[40px] w-full md:w-[400px] lg:w-[400px]">
                  <div class="h-full absolute left-[10px] flex items-center">
                    <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
                  </div>
                  <n-input
                    type="search"
                    name="search"
                    placeholder="Search through apparaisals"
                    id="search"
                    :bordered="false"
                    class="search outline-none w-full border rounded-md"
                    :style="{ borderColor: 'rgba(229,231,235,1)' }"
                  />
                </div>
              </div>
              <div
                class="right grid grid-cols-1 w-[50%] items-center gap-[15px] flex-wrap lg:grid-cols-3 md:grid-cols-4"
              >
                <n-select
                  :options="unitOptions"
                  clearable
                  v-model:value="data.department"
                  name="department_unit"
                  id="department_unit"
                  placeholder="Department/Unit"
                  class="cursor-pointer outline-none"
                >
                </n-select>
                <n-select
                  clearable
                  v-model:value="data.author"
                  name="author"
                  placeholder="Author"
                  id="author"
                  class="cursor-pointer outline-none"
                >
                </n-select>

                <n-date-picker
                  v-model:value="data.date"
                  type="date"
                  placeholder="Date Range"
                  :bordered="false"
                  class="custom-select border border-slate-200"
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
        </div>
        <form action="#" class="modals" @submit.prevent="">
          <Staff_Information :show @closeModal="closeModal" />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import OpenAppraisal1 from "@/components/AdminComponents/OpenAppraisal1.vue";
import Staff_Information from "@/components/AdminComponents/Staff_Information.vue";
import OpenAppraisal2 from "@/components/AdminComponents/OpenAppraisal2.vue";
import GenerateReport from "@/components/AdminComponents/GenerateReport.vue";
import AddNewStaff from "@/components/AdminComponents/AddNewStaff.vue";
import Orbit from "@/assets/imgs/Orbit.png";

const router = useRouter();

function previousPage() {
  router.back();
}

const data = reactive({
  department_unit: null,
  author: null,
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

// Show Modal
const show = ref(false);
function closeModal() {
  show.value = false;
}
function OpenModal() {
  show.value = true;
  console.log("Good...");
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
        row.id
      );
    },
  },
  { title: "Name  ", key: "name " },
  { title: "Faculty/Unit", key: "Faculty/Unit" },
  { title: "Department ", key: "department " },
  { title: "Designation ", key: "designation " },
  { title: "Employment Date  ", key: "employment_date  " },
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
