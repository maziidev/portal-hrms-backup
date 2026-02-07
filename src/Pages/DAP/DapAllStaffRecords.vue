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
                to="/dap"
                class="text-(--pri-text) cursor-pointer font-normal flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/staff-records"
                class="text-[rgba(14,253,193,1)] font-bold cursor-pointer text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/appraisal-management"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals Management
              </router-link>
            </li>
            <li>
              <router-link
                to="/dap/leave-analytics"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-bed"></i> Leave Analytics</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/promotion-career-progression"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/report-analysis"
                class="text-(--pri-text) font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
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
            <div class="flex items-center gap-[10px]">
              <span
                class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-bold"
                >Staff Records</span
              >
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
            <div class="top mr-0 flex justify-between">
              <h2
                class="text-[rgba(17,27,73,1)] font-bold text-[16px] leading-[100%] tracking-[0%]"
              >
                Department of Computer Science
              </h2>
              <!-- <button class="toggle-data">
                <i class="fa fa-chevron-up"></i>
              </button> -->
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div
                class="flex p-[12px] flex-col justify-center gap-[30px] border-[1.5px]"
              >
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                      ></span>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        HOD:
                      </p>
                    </div>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Dr. A. Okoro
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                      ></span>

                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        Email:
                      </p>
                    </div>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      aokoro@univ.edu.ng
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                      ></span>

                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        Phone:
                      </p>
                    </div>
                    <h2
                      class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      +234 801 555 7845
                    </h2>
                  </div>
                </div>
              </div>
              <div
                class="flex p-[12px] flex-col justify-center gap-[30px] border-[1.5px]"
              >
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                      <h2
                        class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
                      >
                        Total Staff
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      22
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                      <h2
                        class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
                      >
                        Active Appraisals
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      4
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                      <h2
                        class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
                      >
                        Promotions in Review
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      1
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                      <h2
                        class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
                      >
                        Leave Requests
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      2
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex p-[12px] flex-col gap-[15px] border-[1.5px]">
                <h2
                  class="text-[rgba(27,37,89,1)] uppercase font-bold text-[16px] leading-[100%] tracking-[0%]"
                >
                  Department Overview Summary
                </h2>
                <div class="">
                  <p
                    class="leading-[170%] tracking-[-2%] font-[500] text-[14px]"
                  >
                    The Department of Computer Science consists of
                    <a href="../lecturer/index.html" class="text-blue-500"
                      >18 academic</a
                    >
                    and 4
                    <a href="#non-academic.html" class="text-blue-500"
                      >non-academic staff</a
                    >. Current activities include the
                    <a href="./Appraisal_Management.html"
                      >2025 Mid-Year Appraisal</a
                    >
                    and 1
                    <a
                      href="./Promotion_Career_Progression.html"
                      class="text-blue-500"
                      >ongoing promotion request</a
                    >. Department maintains a consistent appraisal completion
                    rate of 87%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex items-center gap-[50px] flex-wrap md:flex-nowrap lg:flex-nowrap"
          >
            <router-link
              to="/dap/staff-records"
              class="text-[rgba(35,136,255,1)] text-[16px] font-bold leading-[100%] tracking-[0%] flex items-centers gap-[5px]"
              >Staff Records <i class="fa fa-caret-down"></i
            ></router-link>
            <router-link
              to="/dap/appraisal-management"
              class="text-[rgba(30,30,30,1)] text-[16px] font-bold leading-[100%] tracking-[0%]"
              >Appraisals Management</router-link
            >
            <router-link
              to="/dap/promotion_career_progression"
              href="Promotion_Career_Progression.html"
              class="text-[rgba(30,30,30,1)] text-[16px] font-bold leading-[100%] tracking-[0%]"
              >Promotions</router-link
            >
            <router-link
              to="/dap/leave_analytics"
              href="Leave_Analytics.html"
              class="text-[rgba(30,30,30,1)] text-[16px] font-bold leading-[100%] tracking-[0%]"
              >Leave Requests</router-link
            >
          </div>
          <!-- All Staff Directory -->
          <div
            class="quick_actions flex justify-between items-center gap-[15px]"
          >
            <h2
              class="text-[rgba(30,43,58,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              All Staff Directory
            </h2>
            <a
              href=""
              download="download"
              class="text-[rgba(255,255,255,1)] px-[40px] py-[10px] font-[600] text-[16px] flex gap-[10px] bg-[rgba(35,136,255,1)] items-center leading-[120%] tracking-[-2%] rounded-[5px] border-2 border-[rgba(35,136,255,1)]"
              ><i class="fas fa-arrow-up-from-bracket"></i> Export Staff List</a
            >
          </div>
          <form class="w-full mb-5">
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
                    placeholder="Search by name or  ID"
                    id="search"
                    :bordered="false"
                    v-model:value="form.search"
                    class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
                  />
                </div>
              </div>
              <div
                class="right grid grid-cols-3 gap-[20px] md:w-[50%] w-full lg:grid-cols-4 md:grid-cols-4"
              >
                <n-select
                  name="cate"
                  id="cate"
                  v-model:value="form.category"
                  :options="categories"
                  clearable
                  :bordered="true"
                  placeholder="Category"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.role"
                  :options="roles"
                  clearable
                  :bordered="true"
                  name="roles"
                  id="roles"
                  placeholder="Roles"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.status"
                  :options="Status"
                  clearable
                  :bordered="true"
                  name="status"
                  id="status"
                  placeholder="Status"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select
                ><n-date-picker
                  :v-model="form.date"
                  type="date"
                  placeholder="Date Range"
                  :bordered="false"
                  class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
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
        <form action="#" class="modals" @submit.prevent=""></form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Orbit from "@/assets/imgs/Orbit.png";

const route = useRoute();
const { id } = defineProps({
  id: {
    type: String,
  },
});
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
    value: "Status One",
  },
]);
let monthYearOptions = reactive([
  {
    label: "Month Year Option",
    value: "Month Year Option",
  },
]);
let categories = reactive([
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
  {
    title: "Staff ID ",
    key: "staff_id",
    render: (row) => {
      h(
        "button",
        {
          onClick: () => router.push("/dap/staff-details/" + id),
        },
        row.department,
      );
    },
  },
  { title: "Name", key: "name" },
  { title: "Cadre", key: "cadre" },
  { title: "Rank", key: "rank" },
  { title: "Role", key: "role" },
  { title: "Employment Type ", key: "employment_type" },
  { title: "Employment Date ", key: "employment_date" },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
