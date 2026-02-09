<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 lg:space-x-5 space-y-8 p-4">
    <CompleteAppraisalsTable />
    <PastAppraisalsTable />
  </div>
</template>

<script setup>
import CompleteAppraisalsTable from './CompleteAppraisalsTable.vue';
import PastAppraisalsTable from './PastAppraisalsTable.vue';
</script>
