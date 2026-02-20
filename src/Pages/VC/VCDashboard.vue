<template>
    <section class="px-2 lg:px-8 space-y-10">
        <SessionSemesterCard/>
        <VCStat/>

        <div class="">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_406px] gap-6">
                <VCLeaveChart/>
                <VCGrantChart/>
            </div>
        </div>

        <div>
            <div>
                <VCPromotionScoreCard/>
            </div>
        </div>
    </section>
</template>


<script setup>
import SessionSemesterCard from '@/components/SessionSemesterCard.vue';
import VCStat from '@/components/VCComponents/HomeStat/VCStat.vue';
import VCGrantChart from '@/components/VCComponents/VCGrantChart.vue';
import VCLeaveChart from '@/components/VCComponents/VCLeaveChart.vue';
import VCPromotionScoreCard from '@/components/VCComponents/VCPromotionScoreCard.vue';
</script>
