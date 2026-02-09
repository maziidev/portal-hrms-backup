<template>
    <section class="p-2 space-y-3">
        <ActiveSessionBar/>
    </section>

    <section class="p-2 space-y-3">
        <StaffStats/>
    </section>
    <section class="p-2 space-y-3">
        <StaffDirectoryTable/>
    </section>
</template>


<script setup>
import ActiveSessionBar from '@/Components/base/ActiveSessionBar.vue';
import StaffDirectoryTable from '@/components/HeadOfUnit/staff/StaffDirectoryTable.vue';
import StaffStats from '@/components/HeadOfUnit/staff/StaffStats.vue';
</script>