<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-[2000] font-bold text-[30px] top-[20px] right-[20px] px-[4px] py-[-2px] cursor-pointer rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen flex">
      <div class="fixed z-2 left-0 top-0 h-screen w-[260px]">
        <SideBar :toggleState="toggleState">
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-bold text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <template #links>
            <li>
              <RouterLink
                to="/lecturer"
                :class="
                  currentRoute === '/external_accessor'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa fa-th-large"></i>Dashboard</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/external_accessor/assigned-staff-evaluation"
                :class="
                  currentRoute ===
                  '/external_accessor/assigned-staff-evaluation'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa fa-user-circle"></i>Assigned Staff Evaluations
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/external_accessor/evaluation"
                :class="
                  currentRoute === '/external_accessor/appraisal'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa fa-file-text"></i> Evaluation Form
              </RouterLink>
            </li>

            <li>
              <RouterLink
                v-slot="{ isActive }"
                to="/external_accessor/report_analysis"
                :class="
                  currentRoute === '/lecturer/report-analysis'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Submissions</RouterLink
              >
            </li>
          </template>
        </SideBar>
      </div>

      <main class="md:ml-[260px] relative z-1 w-full flex-1 ml-[0px]">
        <!-- Header -->
        <Header>
          <template #left>
            <div class="w-[70%]">
              <h2 class="bc mb-[7px]">Dashboard</h2>
              <h5 class="sbc">
                Welcome back, Dr.
                {{
                  auth.user &&
                  auth?.user?.email.substr(0, auth?.user?.email.indexOf("@"))
                }}
              </h5>
            </div>
          </template>
          <template #right>
            <div class="md:flex lg:flex items-center gap-[10px] hidden">
              <i class="fa fa-bell text-(--sec-text)"></i>
              <div class="user">
                <i class="fa fa-user text-2xl"></i>
              </div>
              <div class="user-id mbc">{{ auth?.user?.email }}</div>
            </div>
          </template>
        </Header>

        <div class="main px-[25px] mt-[50px] flex flex-col gap-[40px]">
          <SessionSemesterDate />
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
import SessionSemesterDate from "@/components/General/SessionSemesterDate.vue";
import SideBar from "@/components/General/SideBar.vue";
import { useAuthStore } from "@/store/auth.js";
import { logOutStaff } from "@/apis/auth.js";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";

const auth = useAuthStore();
const message = useMessage();
const route = useRoute();

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
};

// Get Current route Path
const currentRoute = computed(() => route.path);
console.log(currentRoute.value);
</script>
