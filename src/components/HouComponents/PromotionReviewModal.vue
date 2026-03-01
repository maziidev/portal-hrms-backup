<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[9000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">

        <!-- Header -->
        <div class="px-7 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div class="flex items-start justify-between mb-5">
            <div>
              <h2 class="text-lg font-black text-orbit-bg">Promotion Review</h2>
              <p class="text-sm text-gray-400 mt-0.5">{{ staff.staffId }} ({{ staff.name }})</p>
            </div>
            <button @click="$emit('close')" class="text-gray-400 hover:text-orbit-bg transition-colors mt-0.5">
              <X :size="20" />
            </button>
          </div>

          <!-- Stepper -->
          <div class="flex items-center gap-0">
            <template v-for="(step, idx) in steps" :key="step.label">
              <div class="flex flex-col items-center shrink-0">
                <div
                  :class="[
                    'w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                    idx < currentStep
                      ? 'bg-orbit-green border-orbit-green'
                      : idx === currentStep
                        ? 'bg-white border-orbit-bg'
                        : 'bg-white border-gray-200'
                  ]"
                >
                  <Check v-if="idx <= currentStep" :size="13"
                    :class="idx < currentStep ? 'text-white' : 'text-orbit-bg'"
                    strokeWidth="3"
                  />
                </div>
                <span
                  :class="[
                    'text-[9px] font-bold mt-1 text-center w-20',
                    idx < currentStep ? 'text-orbit-green' : idx === currentStep ? 'text-orbit-bg' : 'text-gray-300'
                  ]"
                >{{ step.label }}</span>
              </div>
              <div
                v-if="idx < steps.length - 1"
                :class="['h-0.5 flex-1 mb-3 transition-all duration-500', idx < currentStep ? 'bg-orbit-green' : 'bg-gray-200']"
              />
            </template>
          </div>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto">

          <!-- ── Step 0: Staff Information ── -->
          <div v-if="currentStep === 0" class="px-7 py-6 space-y-6">
            <h3 class="text-base font-black text-orbit-blue">Staff Information</h3>

            <!-- Photo -->
            <div class="w-52 h-52 rounded-xl overflow-hidden bg-gray-100">
              <img
                v-if="staff.photo"
                :src="staff.photo"
                :alt="staff.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <User :size="48" class="text-gray-300" />
              </div>
            </div>

            <!-- Staff ID -->
            <p class="text-sm font-bold text-orbit-bg">{{ staff.staffId }}</p>

            <!-- Info rows -->
            <div class="divide-y divide-gray-50">
              <div class="flex items-center justify-between py-3.5">
                <span class="text-sm text-gray-400">Full Name</span>
                <span class="text-sm font-black text-orbit-bg">{{ staff.name }}</span>
              </div>
              <div class="flex items-center justify-between py-3.5">
                <span class="text-sm text-gray-400">{{ staff.roleLabel || 'Designation' }}</span>
                <span class="text-sm font-black text-orbit-bg">{{ staff.role }}</span>
              </div>
              <div class="flex items-center justify-between py-3.5">
                <span class="text-sm text-gray-400">Subunit</span>
                <span class="text-sm font-black text-orbit-bg">{{ staff.subunit }}</span>
              </div>
            </div>
          </div>

          <!-- ── Step 1: Appraisal Review ── -->
          <div v-if="currentStep === 1" class="px-7 py-6 space-y-5">
            <div class="flex items-center gap-3">
              <button @click="currentStep--" class="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-orbit-bg transition-colors">
                <ChevronLeft :size="16" />
              </button>
              <h3 class="text-base font-black text-orbit-bg">Appraisal Review</h3>
            </div>

            <!-- Performance Records card -->
            <div class="border border-gray-100 rounded-xl overflow-hidden">
              <div class="px-5 py-4 bg-white">
                <h4 class="font-black text-orbit-bg text-sm mb-4">Performance Records</h4>
                <div class="grid grid-cols-3 gap-4 mb-3">
                  <span class="text-xs font-black text-orbit-bg uppercase tracking-wide">Appraisal Year</span>
                  <span class="text-xs font-black text-orbit-bg uppercase tracking-wide">Comment</span>
                  <span class="text-xs font-black text-orbit-bg uppercase tracking-wide text-right">Score</span>
                </div>
                <div class="space-y-0 divide-y divide-gray-50">
                  <div v-for="rec in staff.appraisalRecords" :key="rec.year" class="grid grid-cols-3 gap-4 py-4 items-center">
                    <div class="flex items-center gap-2.5">
                      <span class="w-0.5 h-5 rounded-full bg-orbit-blue shrink-0"></span>
                      <span class="text-sm font-black text-orbit-bg">{{ rec.year }}</span>
                    </div>
                    <span class="text-sm text-gray-400">{{ rec.comment }}</span>
                    <span class="text-sm text-gray-400 text-right font-semibold">{{ rec.score }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Step 2: Evaluation Summary / Decision ── -->
          <div v-if="currentStep === 2" class="px-7 py-6 space-y-6">
            <div class="flex items-center gap-3">
              <button @click="currentStep--" class="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-orbit-bg transition-colors">
                <ChevronLeft :size="16" />
              </button>
              <h3 class="text-base font-black text-orbit-bg">Evaluation Summary/Decision</h3>
            </div>

            <!-- Suggested Grade slider -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="w-1 h-6 rounded-full bg-orbit-blue shrink-0"></span>
                  <span class="text-sm font-black text-orbit-bg">Suggested Grade</span>
                </div>
                <div class="flex items-center gap-3 w-64">
                  <span class="text-xs font-bold text-gray-400">0</span>
                  <div class="relative flex-1 pt-5">
                    <!-- Value label -->
                    <span
                      class="absolute -top-0 text-[11px] font-black text-orbit-bg -translate-x-1/2 pointer-events-none"
                      :style="{ left: `calc(${(suggestedGrade / 40) * 100}%)` }"
                    >{{ suggestedGrade }}</span>
                    <input
                      type="range"
                      v-model.number="suggestedGrade"
                      min="0"
                      max="40"
                      step="1"
                      class="promo-slider w-full"
                      :style="{ '--val': `${(suggestedGrade / 40) * 100}%` }"
                    />
                  </div>
                  <span class="text-xs font-bold text-gray-400">40</span>
                </div>
              </div>
              <textarea
                v-model="gradeComment"
                placeholder="Enter your comment here"
                rows="2"
                class="w-full text-sm px-4 py-3 rounded-xl border border-gray-100 bg-blue-50/40 focus:outline-none focus:border-orbit-blue resize-none placeholder:text-gray-400"
              />
            </div>

            <!-- Decision -->
            <div class="space-y-3">
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-black text-orbit-bg">Decision</span>
                <div class="relative w-64">
                  <select
                    v-model="decision"
                    class="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-orbit-blue appearance-none font-semibold text-orbit-bg"
                  >
                    <option value="Endorse">Endorse</option>
                    <option value="Reject">Reject</option>
                    <option value="Return for Correction">Return for Correction</option>
                    <option value="Defer">Defer</option>
                  </select>
                  <ChevronDown :size="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <textarea
                v-model="decisionComment"
                placeholder="Enter your comment here"
                rows="2"
                class="w-full text-sm px-4 py-3 rounded-xl border border-gray-100 bg-blue-50/40 focus:outline-none focus:border-orbit-blue resize-none placeholder:text-gray-400"
              />
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-7 py-4 border-t border-gray-100 shrink-0">
          <!-- Step 2: Submit Decision (full-width) -->
          <button
            v-if="currentStep === 2"
            @click="handleSubmit"
            class="w-full py-3.5 bg-orbit-blue text-white font-black text-sm rounded-xl hover:bg-orbit-bgSec transition-colors"
          >
            Submit Decision
          </button>

          <!-- Steps 0 & 1: Save as Draft + Next -->
          <div v-else class="grid grid-cols-2 gap-3">
            <button
              @click="$emit('close')"
              class="py-3.5 border-2 border-orbit-blue text-orbit-blue font-black text-sm rounded-xl hover:bg-blue-50 transition-colors"
            >
              Save as Draft
            </button>
            <button
              @click="currentStep++"
              class="py-3.5 bg-orbit-blue text-white font-black text-sm rounded-xl hover:bg-orbit-bgSec transition-colors"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { Check, ChevronDown, ChevronLeft, User, X } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const props = defineProps({
  show:  { type: Boolean, default: false },
  staff: {
    type: Object,
    default: () => ({
      staffId: '',
      name: '',
      role: '',
      roleLabel: 'Designation',
      subunit: '',
      photo: '',
      appraisalRecords: [],
    }),
  },
})

const emit = defineEmits(['close', 'submitted'])

const steps = [
  { label: 'Staff Information' },
  { label: 'Appraisal Review' },
  { label: 'Recommendation & Decision' },
]

const currentStep   = ref(0)
const suggestedGrade = ref(15)
const gradeComment  = ref('')
const decision      = ref('Endorse')
const decisionComment = ref('')

watch(() => props.show, (v) => {
  if (v) {
    currentStep.value    = 0
    suggestedGrade.value = 15
    gradeComment.value   = ''
    decision.value       = 'Endorse'
    decisionComment.value = ''
  }
})

function handleSubmit() {
  emit('submitted', {
    staffId: props.staff.staffId,
    suggestedGrade: suggestedGrade.value,
    gradeComment: gradeComment.value,
    decision: decision.value,
    decisionComment: decisionComment.value,
  })
  emit('close')
}
</script>

<style scoped>
.promo-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 9999px;
  background: linear-gradient(to right, #3a974c var(--val, 37.5%), #e2e8f0 var(--val, 37.5%));
  cursor: pointer;
  outline: none;
}
.promo-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2.5px solid #3a974c;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.promo-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2.5px solid #3a974c;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
</style>
