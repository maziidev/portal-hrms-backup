<script setup>
import SessionSemesterCard from '@/components/SessionSemesterCard.vue';
import VCPromotionApprovalRateChart from '@/components/VCComponents/VCPromotionApprovalRateChart.vue';
import VCPromotionScoreCard from '@/components/VCComponents/VCPromotionScoreCard.vue';
import VCPromotionTable from '@/components/VCComponents/VCPromotionTable.vue';
import VCPromotionTrenChart from '@/components/VCComponents/VCPromotionTrenChart.vue';

</script>

<template>
    <section class="px-2 lg:px-4">
        <SessionSemesterCard/>
        <VCPromotionScoreCard/>

        <div class="px-2">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_406px] gap-6 px-4">
                <VCPromotionTrenChart/>

                <VCPromotionApprovalRateChart/>
            </div>
        </div>

        <div class="px-2">
            <VCPromotionTable/>
        </div>
    </section>
</template>
