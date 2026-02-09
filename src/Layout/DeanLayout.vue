<template>
  <section class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <SideBar
      :isOpen="isSidebarOpen"
      :navItems="navItems"
      :logo="logo"
      brandName="Orbit"
    />

    <main class="ml-0 min-h-screen relative flex-1 overflow-y-auto">
      <!-- HEADER -->

      <Header
        @toggle="isSidebarOpen = !isSidebarOpen"
        :subtitle="'Dean of Studies'"
      />

      <div class="">
        <RouterView
          v-slot="{ Component }"
          :pageTitle.sync="pageTitle"
          :pageSubtitle.sync="pageSubtite"
        >
          <component :is="Component" />
        </RouterView>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref } from "vue";
import OrbitLogo from "../assets/imgs/Orbit.png";
import Header from "../components/base/Header.vue";
import SideBar from "../components/base/SideBar.vue";
import { DEAN_NAV } from "../constants/navigation";

const isSidebarOpen = ref(false);

const navItems = DEAN_NAV;
const logo = OrbitLogo;
</script>
