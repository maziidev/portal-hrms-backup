<script setup>
import AppraisalStatSummary from '@/components/HODDivisionComponents/appraisals/AppraisalStatSummary.vue';
import ArchiveAppraisals from '@/components/HODDivisionComponents/appraisals/ArchiveAppraisals.vue';
import DivisionAppraisalTable from '@/components/HODDivisionComponents/appraisals/DivisionAppraisalTable.vue';

</script>

<template>
    <section class="px-2 lg:px-8 space-y-8">
        <AppraisalStatSummary/>

        <!-- archive appraisal -->
         <ArchiveAppraisals/>

        <div class="mt-5">
             <DivisionAppraisalTable/>
        </div>
    </section>
</template>
