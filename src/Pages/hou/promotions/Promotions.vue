<template>
        <section class="p-6 space-y-3">
        <ActiveSessionBar/>
    </section>

    <section class="px-6">
        <PromotionStatOverView/>
    </section>

    <section class="px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PromotionRankChart/>
            <PromotionRateChart/>
        </div>
    </section>

    <section class="px-6">
        <PromotionQuickActions/>
    </section>

    <section class="px-6">
        <PromotionRequestTable/>
    </section>
</template>

<script setup>
import ActiveSessionBar from '@/components/base/ActiveSessionBar.vue';
import PromotionStatOverView from "@/components/HeadOfUnit/promotion/PromotionStatOverView.vue";
import PromotionQuickActions from '../../../components/HeadOfUnit/promotion/PromotionQuickActions.vue';
import PromotionRankChart from '../../../components/HeadOfUnit/promotion/PromotionRankChart.vue';
import PromotionRateChart from '../../../components/HeadOfUnit/promotion/PromotionRateChart.vue';
import PromotionRequestTable from '../../../components/HeadOfUnit/promotion/PromotionRequestTable.vue';


</script>