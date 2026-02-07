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
                to="/external-accessor"
                class="text-[var(--pri-text)] cursor-pointer font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/external-accessor/assigned-staff-evaluation"
                class="text-[rgba(14,253,193,1)] cursor-pointer font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Assigned Staff
                Evaluations</router-link
              >
            </li>
            <li>
              <router-link
                to="/external-accessor/evaluation"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Evaluation
              </router-link>
            </li>

            <li>
              <router-link
                to="/external-accessor/evaluation"
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
              <h2 class="bc mb-[7px]">Assigned Evaluations</h2>
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

          <form class="all_staff_directory w-full">
            <div
              class="top flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between gap-[20px] items-center"
            >
              <div
                class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
              >
                <h2
                  class="font-[700] text-[var(--sec-text)] w-[160px] text-[20px] leading-[120%] tracking-[-2%]"
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
        </div>
        <form action="#" class="modals" @submit.prevent="">
          <TeachingResearchAdministrativeDuties
            :show2
            @closeTeachingResearchAndAdminstrativeDutiesModal="CloseTeachingResearchAndAdministrativeDuties"
            @OpenExternalEvaluationSubmissionModal="OpenExternalEvaluationSubmission"
          />
          <StaffInformation
            :show
            @closeStaffInformationModal="CloseStaffInformation"
            @OpenTeachingResearchAndAdminstrativeDutiesModal="OpenTeachingResearchAndAdministrativeDuties"
            
          />
          <ExternalEvaluationSubmission
            :show3
            @closeExternalEvaluationSubmissionModal="CloseExternalEvaluationSubmission"
          />

          
        </form>
      </main>
    </div>
  </div>
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
