<template>
  <n-modal
    :show="show"
    preset="card"
    :title="title"
    class="!lg:w-[50%] md:w-[40%] rounded-md"
    :mask-closable="maskClosable"
    :closable="closable"
    @close="handleClose"
  >
    <slot :step="step" :nextStep="nextStep" :prevStep="prevStep" :close="handleClose"></slot>

    <!-- Optional navigation if steps are provided -->
    <div v-if="hasNavigation" class="flex justify-end gap-3 mt-4">
      <button
        v-if="step > 1"
        @click="prevStep"
        class="bg-gray-300 text-gray-800 px-4 py-2 rounded"
      >
        Previous
      </button>
      <button
        v-if="step < totalSteps"
        @click="nextStep"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Next
      </button>
      <button
        v-if="step === totalSteps"
        @click="$emit('submit')"
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  </n-modal>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, default: 'Modal' },
  steps: { type: Number, default: 1 },
  maskClosable: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
})

const emit = defineEmits(['close', 'submit'])
const step = ref(1)
const totalSteps = props.steps
const hasNavigation = totalSteps > 1

watch(() => props.show, val => {
  if (val) step.value = 1
})

function nextStep() {
  if (step.value < totalSteps) step.value++
}
function prevStep() {
  if (step.value > 1) step.value--
}
function handleClose() {
  emit('close')
  step.value = 1
}
</script>
