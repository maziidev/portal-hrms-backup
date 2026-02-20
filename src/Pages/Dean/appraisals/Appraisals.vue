<script setup>
import DeanArchivedAppraisalsTable from '@/components/DeanComponents/DeanArchivedAppraisalsTable.vue';
import DeanCompleteAppraisalTable from '@/components/DeanComponents/DeanCompleteAppraisalTable.vue';
import DeanFacultyAppraisalStat from '@/components/DeanComponents/DeanFacultyAppraisalStat.vue';
import DeanDepartmentAppraisalOverview from '@/components/DeanComponents/DeanDepartmentAppraisalOverview.vue';

</script>

<template>
    <section class="px-2 lg:px-4">
        <DeanFacultyAppraisalStat/>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <DeanCompleteAppraisalTable/>
            <DeanArchivedAppraisalsTable/>
        </div>

        <DeanDepartmentAppraisalOverview/>
    </section>
</template>