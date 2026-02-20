<script setup lang="ts">
import DeanPromotionRateChart from '@/components/DeanComponents/DeanPromotionRateChart.vue';
import DeanPromotionShortcuts from '@/components/DeanComponents/DeanPromotionShortcuts.vue';
import DeanPromotionStat from '@/components/DeanComponents/DeanPromotionStat.vue';
import DeanPromotionTable from '@/components/DeanComponents/DeanPromotionTable.vue';
import DeanPromotionYearsChart from '@/components/DeanComponents/DeanPromotionYearsChart.vue';

</script>

<template>
    <section class="px-2 lg:px-4">
        <DeanPromotionStat/>
        <DeanPromotionShortcuts/>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <DeanPromotionYearsChart/>
            <DeanPromotionRateChart/>
        </div>

        <DeanPromotionTable/>
    </section>
</template>