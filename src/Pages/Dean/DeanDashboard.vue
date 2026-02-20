<template>
    <section class="px-2 lg:px-8 space-y-10">
        <SessionSemesterCard/>
        <DeanFacultyStats/>
        <QuickActions/>

        <DeanDepartmentOverviewTable/>

            <DeanOngoingAppraisalTable/>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DeanDashboardChart/>
                <DeanActivityFeed/>
            </div>

    </section>

</template>

<script setup>
import DeanActivityFeed from "@/components/DeanComponents/DeanActivityFeed.vue";
import DeanDashboardChart from "@/components/DeanComponents/DeanDashboardChart.vue";
import DeanDepartmentOverviewTable from "@/components/DeanComponents/DeanDepartmentOverviewTable.vue";
import DeanFacultyStats from "@/components/DeanComponents/DeanFacultyStats.vue";
import DeanOngoingAppraisalTable from "@/components/DeanComponents/DeanOngoingAppraisalTable.vue";
import QuickActions from "@/components/DeanComponents/QuickActions.vue";
import SessionSemesterCard from '@/components/SessionSemesterCard.vue';

</script>