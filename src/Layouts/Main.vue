<template>
    <div class="">
        <button
      class="absolute md:hidden menu-bar lg:hidden z-[2000] font-[700] text-[30px] top-[20px] right-[20px] px-[4px] py-[-2px] rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="sidebar">
        <SideBar />
    </div>
    </div>
</template>

<script setup>
    import Header from "@/Layouts/Header.vue";
    import SideBar from "@/Layouts/SideBar.vue";
</script>