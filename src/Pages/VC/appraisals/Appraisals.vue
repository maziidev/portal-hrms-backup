<script setup lang="ts">
import SessionSemesterCard from '@/components/SessionSemesterCard.vue';
import VCAppraisalRateChart from '@/components/VCComponents/VCAppraisalRateChart.vue';
import VCAppraisalStat from '@/components/VCComponents/VCAppraisalStat.vue';
import VCAppraisalTrendChart from '@/components/VCComponents/VCAppraisalTrendChart.vue';
import VCFacultyAppraisalOverview from '@/components/VCComponents/VCFacultyAppraisalOverview.vue';

</script>

<template>
    <section class="px-2 lg:px-4">
        <SessionSemesterCard/>
        <VCAppraisalStat/>

        <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_406px] gap-6">
                <VCAppraisalTrendChart/>
                <VCAppraisalRateChart/>
            </div>
        </div>

        <div class="p-6">
            <VCFacultyAppraisalOverview/>
        </div>
    </section>
</template>
