<script setup>
import { NMessageProvider } from "naive-ui";
import { RouterView } from "vue-router";
</script>

<template>
  <n-message-provider>
    <RouterView> </RouterView>
  </n-message-provider>
</template>

<style scoped></style>
