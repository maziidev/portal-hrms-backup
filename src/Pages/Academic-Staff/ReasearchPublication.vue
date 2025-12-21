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
                to="/academic-staff"
                class="text-[var(--pri-text)] cursor-pointer font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/academic-staff/research-publication"
                class="text-[rgba(14,253,193,1)] cursor-pointer font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Research &
                Publication</router-link
              >
            </li>
            <li>
              <router-link
                to="/academic-staff/appraisal"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
                to="/academic-staff/leave-management"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</router-link
              >
            </li>
            <li>
              <router-link
                to="/academic-staff/promotion-career-progression"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/academic-staff/retirement-exit"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-calendar"></i> Retirement & Exit</router-link
              >
            </li>
            <li>
              <router-link
                to="/academic-staff/report-analysis"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
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
              <h2 class="bc mb-[7px]">Research & Publications</h2>
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
            class="bg-[rgba(255,255,255,1)] px-[12px] py-[15px] border border-[rgba(141,193,255,0.27)]"
          >
            <h2
              class="text-[rgba(27,37,89,1)] mb-[20px] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Publication Summary
            </h2>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]"
            >
              <div class="flex items-center justify-between gap-[10px]">
                <div class="flex items-center gap-[10px]">
                  <span
                    class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                  ></span>
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                  >
                    Total Publications
                  </h2>
                </div>
                <div class="flex items-center">
                  <span
                    class="text-[rgba(58,151,76,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                    >18
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-between gap-[10px]">
                <div class="flex items-center gap-[10px]">
                  <span
                    class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                  ></span>
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                  >
                    Journal Articles
                  </h2>
                </div>
                <div class="flex items-center">
                  <span
                    class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                    >10</span
                  >
                </div>
              </div>
              <div class="flex items-center justify-between gap-[10px]">
                <div class="flex items-center gap-[10px]">
                  <span
                    class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                  ></span>
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                  >
                    Conference Papers
                  </h2>
                </div>
                <div class="flex items-center">
                  <span
                    class="text-[rgba(163,174,208,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                    >5</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]"
          >
            <button
              :class="[
                `rounded-[20px] box cursor-pointer h-[97px] shadow  flex flex-col justify-center gap-[24px] py-[20px] px-[25px]`,
                activeState == btn.name ? `bg-[rgba(17,27,73,1)]` : `bg-white `,
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
                      `font-[500] text-[16px] text-[rgba(204,204,204,1)] leading-[120%] tracking-[-2%]`,
                    ]"
                  >
                    {{ btn.name }}
                  </h2>
                  <h2
                    :class="[
                      `text-[34px] font-[700] leading-[120%] tracking-[-2%]`,
                      activeState == btn.name
                        ? `text-[rgba(255,255,255,1)]`
                        : `text-[var(--sec-text)]`,
                    ]"
                  >
                    {{ btn.value }}
                  </h2>
                </div>
              </div>
            </button>
          </div>

          <!-- Quick Actions -->
          <div class="quick_actions flex flex-col gap-[15px]">
            <h2
              class="text-[rgba(30,43,58,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Quick Actions
            </h2>
            <div
              class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 bg-white gap-[15px]"
            >
              <button
                id="add_new_publication_btn"
                @click="openAddNewPublication"
                class="text-[rgba(255,255,255,1)] flex items-center py-[20px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center w-full font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fa fa-file-text text-[rgba(255,255,255,1)]"></i>
                Add New Publication
              </button>

              <button
                class="text-[rgba(255,255,255,1)] flex items-center py-[20px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center w-full font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fas fa-file-text text-[rgba(255,255,255,1)]"></i>
                Import from ORCID / Google Scholar
              </button>

              <button
                class="text-[rgba(255,255,255,1)] flex items-center py-[20px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center w-full font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fas fa-file-text text-[rgba(255,255,255,1)]"></i>
                Export Publication List (PDF/CSV)
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
                  class="font-[700] text-[var(--sec-text)] w-[120px] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Publications
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
                class="right grid grid-cols-3 gap-[20px] md:w-[50%] w-full lg:grid-cols-3 md:grid-cols-3"
              >
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
                <n-select
                  name="type"
                  id="type"
                  v-model:value="form.type"
                  :options="unitOptions"
                  clearable
                  :bordered="true"
                  placeholder="Type"
                  class="cursor-pointer rounded-[10px] outline-none"
                >
                </n-select>
                <input
                  type="number"
                  name="year"
                  id="year"
                  min="1900"
                  max="2099"
                  step="1"
                  v-model="form.year"
                  :borderd="true"
                  placeholder="Year"
                  class="border rounded-[5px] outline-none px-[17px]"
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
          <AddNewPublication
            :show
            @closeAddNewPublication="closeAddNewPublication"
            @openContributionAndResearchContextModal="
              openContributionAndResearchContextModal
            "
          />
          <ContributionAndResearchContext
            :show1
            @openAddNewPublication="openAddNewPublication"
            @closeContributionAndResearchContextModal="
              closeContributionAndResearchContextModal
            "
            @openContributionAndResearchContextModal="
              openContributionAndResearchContextModal
            "
          />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import AddNewPublication from "@/components/AcademicStaffComponents/AddNewPublication.vue";
import ContributionAndResearchContext from "@/components/AcademicStaffComponents/ContributionAndResearchContext.vue";

import Orbit from "@/assets/imgs/Orbit.png";

const form = reactive({
  year: null,
  type: null,
  status: null,
});
const activeState = ref(null);
function isActive(id) {
  activeState.value = id;
  console.log(id);
}
const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];
let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status Two",
  },
]);
const btns = reactive([
  { name: "Book Chapters", value: 2 },
  { name: "Citations", value: 237 },
  { name: "H-Index", value: 7 },
]);

isActive(btns[0].name);

// Show Modals
const show = ref(false);
const show1 = ref(false);
function closeAddNewPublication() {
  show.value = false;
}
function openAddNewPublication() {
  show.value = true;
}
function closeContributionAndResearchContextModal() {
  show1.value = false;
}
function openContributionAndResearchContextModal() {
  console.log("Awesome");
  show1.value = true;
}

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns
const columns = [
  {
    title: "Title",
    key: "title",
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

  { title: "Type", key: "type " },
  { title: "Year", key: "year " },
  { title: "Journal/Conference", key: "journal_conference " },
  { title: "Co-authors", key: "co-authors " },
  {
    title: "Link",
    key: "link",
    render(row) {
      return h(
        "a",
        {
          style:
            "text-[rgba(35,136,255,1)] flex items-center gap-1 font-[400] text-[14px] leading-[100%] tracking-[0%]",
        },
        [h("i", { style: "fa fa-external-link-alt" }), "link.redirect"]
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
