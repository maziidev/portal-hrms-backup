<template>
  <button
    @click="$emit('click')"
    class="flex items-center justify-center gap-2 py-4 px-6 rounded-md bg-orbit-blue text-white font-semibold  transition cursor-pointer w-full"
  >

    <component :is="icon" class="w-5 h-5" />
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  icon: { type: Object }
})
</script>
