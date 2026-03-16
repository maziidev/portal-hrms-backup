<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[9000] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm px-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200">

        <div class="px-8 pt-8 pb-6 bg-gray-50/50 border-b border-gray-100 shrink-0">
          <div class="flex items-start justify-between mb-8">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-lg bg-orbit-blue flex items-center justify-center text-white shadow-md">
                <img v-if="staff.photo" :src="staff.photo" class="w-full h-full object-cover rounded-lg" />
                <span v-else class="text-xs font-semibold">{{ getInitials(staff.name) }}</span>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Promotion Review</h2>
                <p class="text-sm text-gray-500 font-medium">{{ staff.staffId }}</p>
              </div>
            </div>
            <button @click="$emit('close')" class="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all">
              <X :size="20" />
            </button>
          </div>

          <div class="flex items-center px-4">
            <template v-for="(step, idx) in steps" :key="step.label">
              <div class="flex flex-col items-center shrink-0 relative">
                <div
                  :class="[
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500',
                    idx <= currentStep ? 'bg-orbit-blue border-orbit-blue text-white' : 'bg-white border-gray-200 text-gray-300'
                  ]"
                >
                  <Check v-if="idx < currentStep" :size="14" strokeWidth="3" />
                  <span v-else class="text-xs font-bold">{{ idx + 1 }}</span>
                </div>
                <span :class="['text-[11px] font-semibold mt-2 absolute -bottom-6 w-28 text-center', idx <= currentStep ? 'text-gray-900' : 'text-gray-400']">
                  {{ step.label }}
                </span>
              </div>
              <div v-if="idx < steps.length - 1" :class="['h-0.5 flex-1 mx-2 transition-all duration-500', idx < currentStep ? 'bg-orbit-blue' : 'bg-gray-200']" />
            </template>
          </div>
          <div class="h-4"></div>
        </div>

        <div class="flex-1 overflow-y-auto px-8 py-8 bg-white">

          <div v-if="currentStep === 0" class="animate-in fade-in slide-in-from-bottom-2">
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="w-full md:w-48 h-56 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                <img v-if="staff.photo" :src="staff.photo" class="w-full h-full object-cover" />
                <div v-else class="flex flex-col items-center gap-2">
                   <User :size="40" class="text-gray-200" />
                   <span class="text-2xl font-bold text-gray-300">{{ getInitials(staff.name) }}</span>
                </div>
              </div>

              <div class="flex-1 space-y-6">
                <div class="space-y-1">
                  <label class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name</label>
                  <p class="text-lg font-semibold text-gray-900">{{ staff.name }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Designation</label>
                    <p class="text-sm font-semibold text-gray-900">{{ staff.role }}</p>
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Subunit</label>
                    <p class="text-sm font-semibold text-gray-900">{{ staff.subunit }}</p>
                  </div>
                </div>
                <div class="pt-4 border-t border-gray-50">
                   <span class="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-100">
                     STAFF ID: {{ staff.staffId }}
                   </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 1" class="space-y-6 animate-in fade-in">
             <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Historical Appraisal</h3>
                <span class="text-xs text-orbit-blue font-semibold italic">Recent Records</span>
             </div>
             <div class="space-y-3">
                <div v-for="rec in staff.appraisalRecords" :key="rec.year" class="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-orbit-blue/30 transition-all">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-700 text-xs border border-gray-100">
                      {{ rec.year }}
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">{{ rec.comment }}</p>
                      <p class="text-[11px] text-gray-400">Standard Review</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-900">{{ rec.score }}</p>
                    <p class="text-[10px] font-bold text-gray-400 uppercase">Points</p>
                  </div>
                </div>
             </div>
          </div>

          <div v-if="currentStep === 2" class="space-y-8 animate-in fade-in">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-sm font-bold text-gray-900 uppercase tracking-wide">Suggested Score</label>
                <span class="text-lg font-bold text-orbit-blue">{{ suggestedGrade }} <span class="text-xs text-gray-500">/ 40</span></span>
              </div>
              <input
                type="range"
                v-model.number="suggestedGrade"
                min="0"
                max="40"
                class="modern-slider w-full"
                :style="{ '--val': `${(suggestedGrade / 40) * 100}%` }"
              />
            </div>

            <div class="space-y-4 pt-4 border-t border-gray-100">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-gray-900 uppercase tracking-wide">Final Action</label>
                <div class="relative">
                  <select
                    v-model="decision"
                    class="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orbit-blue outline-none appearance-none font-semibold text-gray-900 transition-all"
                  >
                    <option value="Endorse">Endorse Application</option>
                    <option value="Reject">Reject Application</option>
                    <option value="Return for Correction">Return for Correction</option>
                    <option value="Defer">Defer Application</option>
                  </select>
                  <ChevronDown :size="16" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <textarea
                v-model="decisionComment"
                placeholder="Write your justification here..."
                rows="4"
                class="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orbit-blue outline-none transition-all resize-none font-medium text-gray-900"
              />
            </div>
          </div>
        </div>

        <div class="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between gap-4">
          <button
            v-if="currentStep > 0"
            @click="currentStep--"
            class="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Previous
          </button>
          <div v-else />

          <div class="flex gap-3">
            <button
              @click="$emit('close')"
              class="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              v-if="currentStep < 2"
              @click="currentStep++"
              class="px-8 py-3 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              Continue Review
              <ChevronRight :size="16" />
            </button>
            <button
              v-else
              @click="handleSubmit"
              class="px-8 py-3 bg-orbit-blue text-white font-bold text-sm rounded-xl shadow-lg shadow-orbit-blue/20 hover:bg-orbit-blue/90 transition-all"
            >
              Submit Decision
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { Check, ChevronDown, ChevronRight, User, X } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
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
  { label: 'Verify Profile' },
  { label: 'Check Appraisal' },
  { label: 'Decision' },
]

const currentStep = ref(0)
const suggestedGrade = ref(15)
const decision = ref('Endorse')
const decisionComment = ref('')

const getInitials = (name) => {
  if (!name) return '??';
  return name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

watch(() => props.show, (v) => {
  if (v) currentStep.value = 0;
})

function handleSubmit() {
  emit('submitted', {
    staffId: props.staff.staffId,
    suggestedGrade: suggestedGrade.value,
    decision: decision.value,
    decisionComment: decisionComment.value,
  })
  // Closes modal immediately
  emit('close')
}
</script>

<style scoped>
.modern-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #f3f4f6;
  border-radius: 10px;
  outline: none;
  background-image: linear-gradient(#2563eb, #2563eb);
  background-size: var(--val) 100%;
  background-repeat: no-repeat;
}
.modern-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  border: 2px solid #2563eb;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.animate-in {
  animation: slideIn 0.4s ease-out forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>