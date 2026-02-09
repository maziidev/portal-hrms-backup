<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>

    <!-- Modal Content -->
    <div class="relative bg-white w-[70%] ml-auto h-full overflow-auto shadow-lg rounded-l-2xl p-6 transition-transform">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Promotion Details</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <CircleX class="w-8 h-8" />
        </button>
      </div>

      <!-- Content Placeholder -->
      <div>
        <p class="text-gray-500">
          Details for {{ promotion?.staff_name || "N/A" }} will go here.
        </p>
        <!-- Future: fetch /promotion_detail/:id and display content -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { CircleX } from "lucide-vue-next";

const props = defineProps({
  visible: { type: Boolean, required: true },
  promotion: { type: Object, default: () => ({}) }
});

const emit = defineEmits(["update:visible"]);

const closeModal = () => {
  emit("update:visible", false);
};
</script>
