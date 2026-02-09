<template>
  <transition name="toast-slide">
    <div
      v-if="visible"
      :class="[
        'fixed bottom-5 right-5 w-80 px-4 py-3 rounded shadow-lg flex items-center justify-between space-x-3',
        typeClasses[type] || typeClasses.success
      ]"
    >
      <span class="text-sm">{{ message }}</span>
      <button @click="close" class="font-bold text-xl leading-none">
        <CircleX class="w-6 h-6" />
      </button>
    </div>
  </transition>
</template>

<script setup>
import { CircleX } from 'lucide-vue-next';
import { watch } from 'vue';

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'success' }, // success | error | warning
  duration: { type: Number, default: 3000 },
  visible: { type: Boolean, default: false }
});

const emit = defineEmits(['update:visible']);

const typeClasses = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-black'
};

const close = () => {
  emit('update:visible', false);
};

// Auto-hide after duration
watch(
  () => props.visible,
  (val) => {
    if (val) {
      setTimeout(() => {
        emit('update:visible', false);
      }, props.duration);
    }
  }
);
</script>

<style scoped>
.toast-slide-enter-active {
  transform: translateX(120%);
  transition: transform 0.3s ease;
}
.toast-slide-enter-to {
  transform: translateX(0);
}
.toast-slide-leave-active {
  transform: translateX(120%);
  transition: transform 0.3s ease;
}
</style>
