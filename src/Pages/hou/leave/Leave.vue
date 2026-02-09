<template>
    <section class="p-6 space-y-3">
        <ActiveSessionBar/>
    </section>

    <section class="p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
       <LeaveStatsCard />
       <LeaveNotificationsCard />
       <LeaveChart />
    </section>

    <section class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <LeaveOverviewMetricsChart />
        <LeaveCategoryChart />
    </section>

    <section class="p-6">
        <LeaveQuickActions/>
    </section>

    <section class="p-6">
        <LeaveRequestOverView/>
    </section>
</template>


<script setup>
import ActiveSessionBar from '@/components/base/ActiveSessionBar.vue';
import LeaveCategoryChart from "@/components/HeadOfUnit/leave/LeaveCategoryChart.vue";
import LeaveChart from "@/components/HeadOfUnit/leave/LeaveChart.vue";
import LeaveNotificationsCard from "@/components/HeadOfUnit/leave/LeaveNotificationsCard.vue";
import LeaveOverviewMetricsChart from "@/components/HeadOfUnit/leave/LeaveOverviewMetricsChart.vue";
import LeaveQuickActions from "@/components/HeadOfUnit/leave/LeaveQuickActions.vue";
import LeaveRequestOverView from '@/components/HeadOfUnit/leave/LeaveRequestOverView.vue';
import LeaveStatsCard from "@/components/HeadOfUnit/leave/LeaveStatsCard.vue";

</script>