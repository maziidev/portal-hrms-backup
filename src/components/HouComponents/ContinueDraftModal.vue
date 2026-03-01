<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[9000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        <!-- Header -->
        <div class="px-7 pt-6 pb-5 border-b border-gray-100">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-base font-black text-orbit-bg">Continue Appraisal for: {{ staff.name }}</h2>
              <p class="text-sm text-gray-400 mt-1">Last saved: {{ staff.lastSaved }}</p>
            </div>
            <button @click="$emit('close')" class="text-gray-400 hover:text-orbit-bg transition-colors mt-0.5">
              <X :size="18" />
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="px-7 py-6 space-y-5">

          <!-- Completed tabs -->
          <div class="space-y-2">
            <p class="text-sm font-black text-orbit-bg">Tabs completed</p>
            <div class="bg-orbit-light/60 rounded-xl px-4 py-3">
              <p class="text-sm font-semibold text-orbit-green">
                {{ completedTabs.join(', ') }}
              </p>
            </div>
          </div>

          <!-- Remaining tabs -->
          <div class="space-y-2">
            <p class="text-sm font-black text-orbit-bg">Tabs remaining</p>
            <div class="bg-orbit-light/60 rounded-xl px-4 py-3">
              <p class="text-sm font-semibold text-orbit-green">
                {{ remainingTabs.join(', ') }}
              </p>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-7 pb-6 flex gap-3">
          <button
            class="flex-1 py-3 rounded-xl border-2 border-orbit-blue text-orbit-blue font-bold text-sm hover:bg-orbit-blue/5 transition-colors"
            @click="$emit('discard')"
          >
            Discard Draft
          </button>
          <button
            class="flex-1 py-3 rounded-xl bg-orbit-blue text-white font-bold text-sm hover:bg-orbit-bgSec transition-colors"
            @click="$emit('continue')"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  show:  { type: Boolean, default: false },
  staff: {
    type: Object,
    default: () => ({
      name: '',
      lastSaved: '',
      savedStep: 0,
    }),
  },
})

defineEmits(['close', 'continue', 'discard'])

const allTabs = [
  'Staff Info',
  'Performance',
  'Conduct',
  'Goals & Development',
  'Summary',
]

const completedTabs = computed(() =>
  allTabs.slice(0, props.staff.savedStep)
)

const remainingTabs = computed(() =>
  allTabs.slice(props.staff.savedStep)
)
</script>
