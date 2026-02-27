<script setup>
import SessionSemesterCard from '@/components/SessionSemesterCard.vue';
import VCPromotionScoreCard from '@/components/VCComponents/VCPromotionScoreCard.vue';
import VCPromotionTrenChart from '@/components/VCComponents/VCPromotionTrenChart.vue';

</script>

<template>
    <section class="px-2 lg:px-4">
        <SessionSemesterCard/>
        <VCPromotionScoreCard/>

        <div class="">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_406px] gap-6">
                <VCPromotionTrenChart/>
                <VCGrantChart/>
            </div>
        </div>
    </section>
</template>
