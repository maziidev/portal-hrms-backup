<template>
  <aside
    class="w-[268px] sidebar hidden z-[3000] transition-all duration-100 ease-in-out md:flex lg:flex fixed top-0 left-0 h-screen px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]"
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
        <a
          class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
          href="Assigned_Staff_Evaluation.html"
          ><i class="fa fa-user-circle"></i> Assigned Staff Evaluations</a
        >
      </li>
      <li>
        <a
          class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
          href="Evaluation.html"
          ><i class="fa fa-file-text"></i> Evaluation</a
        >
      </li>

      <li>
        <a
          class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
          href=""
          ><i class="fa-solid fa-chart-column"></i>Reports & Analytics</a
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
</template>

<script setup>
import Orbit from "@/assets/imgs/Orbit.png";

</script>

<style scoped></style>
