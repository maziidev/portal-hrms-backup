<script setup>
import BaseButton from "@/components/Shared/BaseButton.vue";

</script>

<template>
    <div class="text-2xl tracking-wide text-orbit-bg font-semibold mb-2 mt-8">
        Quick Actions
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <BaseButton label="Review Departmental Appraisal"/>
        <BaseButton label="Approve Promotion Requests"/>
        <BaseButton label="Approve Leave Requests"/>
        <BaseButton label="Generate Faculty Report"/>
    </div>
</template>