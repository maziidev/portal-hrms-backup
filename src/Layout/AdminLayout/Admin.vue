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
        <SideBar :toggleState="toggleState">
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-bold text-base flex gap-2 items-center tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <template #links>
            <li>
              <router-link
                to="/admin"
                class="text-[rgba(14,253,193,1)] cursor-pointer font-bold flex gap-2 items-center text-base tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/staff-managment"
                class="text-[var(--pri-text)] cursor-pointer font-normal text-sm tracking-[-2%] leading-[120%] flex items-center gap-2 focus:text-[rgba(14,253,193,1)] focus:font-bold"
                ><i class="fa fa-user-circle"></i>Research &
                Publication</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/appraisal"
                class="text-[var(--pri-text)] font-normal text-sm tracking-[-2%] leading-[120%] flex items-center gap-2 focus:text-[rgba(14,253,193,1)] focus:font-bold"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
               to="/admin/leave-management"
                class="text-[var(--pri-text)] font-normal text-sm tracking-[-2%] leading-[120%] flex items-center gap-2 focus:text-[rgba(14,253,193,1)] focus:font-bold"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/promotion-career-progression"
                class="text-[var(--pri-text)] font-normal text-sm tracking-[-2%] leading-[120%] flex items-center gap-2 focus:text-[rgba(14,253,193,1)] focus:font-bold"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/admin/retirement-exit"
                class="text-[var(--pri-text)] font-normal text-sm tracking-[-2%] leading-[120%] flex items-center gap-2 focus:text-[rgba(14,253,193,1)] focus:font-bold"
                ><i class="fa fa-calendar"></i> Retirement & Exit</router-link
              >
            </li>
            <li>
              <router-link
                 to="/admin/report-analysis"
                class="text-[var(--pri-text)] font-normal text-sm tracking-[-2%] leading-[120%] flex items-center gap-2 focus:text-[rgba(14,253,193,1)] focus:font-bold"
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Analytics</router-link
              >
            </li>
          </template>

          <template #sublinks>
            <li>
              <a
                class="text-[var(--pri-text)] flex items-center gap-2 font-normal text-base tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa fa-gear"></i> Settings</a
              >
            </li>

            <li class="md:hidden lg:hidden items-center gap-2.5 flex">
              <i class="fa fa-bell text-[var(--pri-text)]"></i>
              <span
                class="text-[var(--pri-text)] flex items-center gap-2 font-normal text-base tracking-[-2%] leading-[120%]"
                >Notification</span
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-2.5 flex">
              <div class="user">
                <i class="fa fa-user text-xl text-[var(--pri-text)]"></i>
              </div>
              <div class="user-id mbc text-[var(--pri-text)] break-words">
                Nnamdichuzu@edu.EU.ng
              </div>
            </li>
          </template>
        </SideBar>
      </div>

      <main class="lg:ml-64 md:ml-64 ml-0 min-w-screen relative">
        <!-- Header -->
        <Header>
          <template #left>
            <div class="w-[70%]">
              <h2 class="bc mb-1.5">Dashboard</h2>
              <h5 class="sbc">
                Your central hub for managing the staff cycle from entry to exit
              </h5>
            </div>
          </template>
          <template #right>
            <div class="md:flex lg:flex items-center gap-2.5 hidden">
              <i class="fa fa-bell text-[var(--sec-text)]"></i>
              <div class="user">
                <i class="fa fa-user text-2xl"></i>
              </div>
              <div class="user-id mbc">{{ auth?.user?.email }}</div>
            </div>
          </template>
        </Header>

        <div class="main px-6 mt-12 flex flex-col gap-10">
          <SessionSemesterDate />
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SessionSemesterDate from "@/components/General/SessionSemesterDate.vue";
import SideBar from "@/components/General/SideBar.vue";
import Header from "@/components/Header.vue";
import { useAuthStore } from "@/store/auth.js";
import { ref } from "vue";

const auth = useAuthStore();
const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
};
</script>
