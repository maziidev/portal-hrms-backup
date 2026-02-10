<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-2000 font-bold text-[30px] top-5 right-5 px-1 py-[-2px] cursor-pointer rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen flex">
      <div class="fixed z-2 left-0 top-0 h-screen w-65">
        <SideBar :toggleState="toggleState">
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-bold md:text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <template #links>
            <li>
              <RouterLink
                to="/hod"
                :class="
                  currentRoute === '/hod'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa fa-th-large"></i>Dashboard</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/hod/staff-records"
                :class="
                  currentRoute === '/hod/staff-records'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa fa-user-circle"></i>Staff Records</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/hod/appraisal"
                :class="
                  currentRoute === '/hod/appraisal'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa fa-file-text"></i> Appraisals
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/hod/leave-management"
                :class="
                  currentRoute === '/hod/leave-management'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/hod/promotion-career-progression"
                :class="
                  currentRoute === '/hod/promotion-career-progression'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/hod/retirement-exit"
                :class="
                  currentRoute === '/hod/retirement-exit'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa fa-calendar"></i> Retirement & Exit</RouterLink
              >
            </li>
            <li>
              <RouterLink
                v-slot="{ isActive }"
                to="/hod/report-analysis"
                :class="
                  currentRoute === '/hod/report-analysis'
                    ? 'text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center  tracking-[-2%] leading-[120%]'
                    : 'text-(--pri-text) cursor-pointer font-normal text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2'
                "
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Analytics</RouterLink
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
