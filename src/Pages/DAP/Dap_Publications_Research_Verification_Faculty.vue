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
              class="text-[rgba(14,253,193,1)] font-[700] text-[20px] flex gap-2 items-center  tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-[25px]">
            <li>
              <router-link
                to="/dap"
                class="text-[var(--pri-text)] cursor-pointer font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/staff-records"
                class="text-[var(--pri-text)] cursor-pointer font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/appraisal-management"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals Management
              </router-link>
            </li>
            <li>
              <router-link
                to="/dap/leave-analytics"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-bed"></i> Leave Analytics</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/promotion-career-progression"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/publications-research-verification"
                class="text-[rgba(14,253,193,1)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-file-text"></i> Publications & Research
                Verification</router-link
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
              <span @click="openPublicationDetails"
                class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
                >Publications & Research Verification</span
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
          <!-- All Staff Directory -->
          <div
            class="quick_actions flex flex-wrap md:flex-nowrap lg:flex-nowrap justify-between items-center gap-[15px]"
          >
            <h2
              class="text-[rgba(30,43,58,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Faculty of {{ faculty }}
            </h2>
            <a
              href=""
              download="download"
              class="text-[rgba(255,255,255,1)] px-[40px] py-[10px] font-[600] text-[16px] flex gap-[10px] bg-[rgba(35,136,255,1)] items-center leading-[120%] tracking-[-2%] rounded-[5px] border-2 border-[rgba(35,136,255,1)]"
            >
              Approve all</a
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
                class="right grid grid-cols-3 gap-[20px] md:w-[50%] w-full lg:grid-cols-3 md:grid-cols-3"
              >
                <n-select
                  v-model:value="form.cadre"
                  :options="Cadre"
                  clearable
                  :bordered="true"
                  name="cadre"
                  id="cadre"
                  placeholder="Cadre"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select
                ><n-select
                  v-model:value="form.status"
                  :options="Status"
                  clearable
                  :bordered="true"
                  name="status"
                  id="status"
                  placeholder="Status"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <n-select
                  v-model:value="form.appraisal_period"
                  :options="appraisalPeriod"
                  clearable
                  :bordered="true"
                  name="appraisal_period"
                  id="appraisal_period"
                  placeholder="Appraisal period"
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
          <PublicationDetails
            :show="show"
            @closePublicationDetails="closePublicationDetails"
          />
          
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Orbit from "@/assets/imgs/Orbit.png";
import PublicationDetails from "@/components/DapComponents/PublicationDetails.vue";

const route = useRoute();
const { faculty } = defineProps({
  faculty: {
    type: String,
  },
});
const router = useRouter();
const form = reactive({
  status: null,
  appraisal_period: null,
  cadre: null,
  search: "",
});
let Status = reactive([
  {
    label: "Status One",
    value: "Status One",
  },
]);
let Cadre = reactive([
  {
    label: "Lecture 1",
    value: "Lecture 1",
  },
]);
let appraisalPeriod = reactive([
  {
    label: "Month Year Option",
    value: "Month Year Option",
  },
]);

const show = ref(false);

function openPublicationDetails() {
  show.value = true;
}
function closePublicationDetails() {
  show.value = false;
}


const activeState = ref(null);

const btns = reactive([
  { name: "Total Appraisals", value: 24 },
  { name: "Pending Reviews", value: 4 },
  { name: "Approved Appraisals", value: 20 },
  { name: "Departments Reviewed", value: 4 },
]);

onMounted(() => {
  activeState.value = btns[0].name;
});

function isActive(id) {
  activeState.value = id;
  // console.log(id);
}

isActive(btns[0].name);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const columns = [
  {
    title: "Name ",
    key: "name",
    render: (row) => {
      h(
        "button",
        {
          onClick: () => router.push("/dap/all-staff-records/" + id),
        },
        row.department
      );
    },
  },
  { title: "Department", key: "department" },
  { title: "Title of Publication", key: "title_of_publication" },
  { title: "Journal", key: "journal" },
  {
    title: "Status ",
    key: "status ",
    render(row) {
      return h(
        "span",

        row.status
      );
    },
  },
  { title: "Year", key: "year" },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
