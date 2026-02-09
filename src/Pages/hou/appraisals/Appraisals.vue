<template>
    <section class="p-6 space-y-3">
        <ActiveSessionBar/>
    </section>


  <section class="p-6">
    <AppraisalTable  />
  </section>

  <section class="p-6 space-y-3">
    <ActiveAppraisalsTable/>
  </section>

</template>


<script setup>
import ActiveSessionBar from '@/Components/base/ActiveSessionBar.vue';
import AppraisalTable from "@/components/HeadOfUnit/appraisal/AppraisalTable.vue";
import ActiveAppraisalsTable from "@/components/HeadOfUnit/appraisal/ActiveAppraisalsTable.vue";

</script>
