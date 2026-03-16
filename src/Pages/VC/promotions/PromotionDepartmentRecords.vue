<template>
    <section class="px-2 lg:px-4">
        <VCPromotionDeptStat/>

        <div class="px-2 mt-5">
            <div class="grid grid-cols-1 lg:grid-cols-[406px_1fr] gap-6 px-4">
                <VCAverageYearInRankChart/>
                <VCPromotionRateByDeptChart/>
            </div>
        </div>
        <div class="px-4">
            <VCPromotionRequestTable/>
        </div>
    </section>
</template>


<script setup>
import VCAverageYearInRankChart from '@/components/VCComponents/VCAverageYearInRankChart.vue';
import VCPromotionDeptStat from '@/components/VCComponents/VCPromotionDeptStat.vue';
import VCPromotionRateByDeptChart from '@/components/VCComponents/VCPromotionRateByDeptChart.vue';
import VCPromotionRequestTable from '@/components/VCComponents/VCPromotionRequestTable.vue';

</script>