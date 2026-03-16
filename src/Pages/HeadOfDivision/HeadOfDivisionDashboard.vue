<script setup lang="ts">
import AppraisalCompletionChart from '@/components/HODDivisionComponents/home/AppraisalCompletionChart.vue';
import DivisionStatsGrid from '@/components/HODDivisionComponents/home/DivisionStatsGrid.vue';
import OngoingAppraisals from '@/components/HODDivisionComponents/home/OngoingAppraisals.vue';
import QuickActions from '@/components/HODDivisionComponents/home/QuickActions.vue';
import RecentNotification from '@/components/HODDivisionComponents/home/RecentNotification.vue';
import SessionSemesterCard from '@/components/SessionSemesterCard.vue';

</script>

<template>
    <section class="px-2 lg:px-8 space-y-8">
        <SessionSemesterCard/>


        <DivisionStatsGrid/>

        <QuickActions/>

        <OngoingAppraisals/>

        <div class="grid lg:grid-cols-[1fr_450px] gap-6">
            <AppraisalCompletionChart/>
            <RecentNotification/>
        </div>
    </section>
</template>