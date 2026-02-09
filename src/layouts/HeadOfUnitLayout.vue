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

            <Header @toggle="isSidebarOpen = !isSidebarOpen" :subtitle="pageSubtitle" :title="pageTitle"/>


            <div class="">
                <RouterView v-slot="{ Component}" :pageTitle.sync="pageTitle" :pageSubtitle.sync="pageSubtite">
                    <component :is="Component"/>
                </RouterView>
            </div>
        </main>
    </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import OrbitLogo from "../assets/imgs/Orbit.png";
import Header from "../components/base/Header.vue";
import SideBar from "../components/base/SideBar.vue";
import { HOU_NAV } from "../constants/navigation";

const route = useRoute();

const isSidebarOpen = ref(false);

const navItems = HOU_NAV;
const logo = OrbitLogo


// computed values for Header props
const pageTitle = computed(() => route.meta.pageTitle || '');
const pageSubtitle = computed(() => route.meta.pageSubtitle || '');
</script>