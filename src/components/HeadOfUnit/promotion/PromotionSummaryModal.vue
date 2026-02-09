<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>

    <!-- Modal Content -->
    <div class="relative bg-white w-[90%] lg:w-[70%] ml-auto h-full overflow-auto shadow-lg rounded-l-2xl p-6 transition-transform">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Promotion Summary</h2>
        <button @click="closeModal" class="cursor-pointer text-gray-500 hover:text-gray-700">
          <CircleX class="w-8 h-8 cursor-pointer" />
        </button>
      </div>

      <!-- Content goes here -->
      <div>
        <p class="text-gray-500">Promotion summary data will be displayed here.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CircleX } from 'lucide-vue-next';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  visible: { type: Boolean, required: true }
});
const emit = defineEmits(['update:visible', 'error']);

const closeModal = () => {
  emit('update:visible', false);
};
</script>
