<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[9000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">

        <!-- Modal Header -->
        <div class="px-7 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-lg font-black text-orbit-bg">Staff Appraisal Form – {{ staff.name }}</h2>
              <p class="text-sm text-gray-400 mt-0.5">{{ staff.unit }} | Appraisal Period: {{ staff.period }}</p>
            </div>
            <button @click="$emit('close')" class="text-gray-400 hover:text-orbit-bg transition-colors mt-0.5">
              <X :size="20" />
            </button>
          </div>

          <!-- Step Progress -->
          <div class="flex items-center mt-5 gap-0">
            <template v-for="(step, idx) in steps" :key="step.key">
              <div class="flex flex-col items-center shrink-0">
                <!-- Circle -->
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
                  <Check v-if="idx < currentStep" :size="13" class="text-white" strokeWidth="3" />
                  <Check v-else-if="idx === currentStep" :size="13" class="text-orbit-bg" strokeWidth="3" />
                </div>
                <!-- Label -->
                <span
                  :class="[
                    'text-[9px] font-bold mt-1 text-center w-16',
                    idx < currentStep ? 'text-orbit-green' : idx === currentStep ? 'text-orbit-bg' : 'text-gray-300'
                  ]"
                >{{ step.label }}</span>
              </div>
              <!-- Connector line -->
              <div
                v-if="idx < steps.length - 1"
                :class="[
                  'h-0.5 flex-1 mb-3 transition-all duration-500',
                  idx < currentStep ? 'bg-orbit-green' : 'bg-gray-200'
                ]"
              ></div>
            </template>
          </div>
        </div>

        <!-- Scrollable Body -->
        <div class="overflow-y-auto flex-1 px-7 py-6">

          <!-- ── Step 0: Staff Information ── -->
          <div v-if="currentStep === 0">
            <h3 class="text-base font-black text-orbit-bg mb-5">Personal Information</h3>

            <div class="w-48 h-56 rounded-2xl overflow-hidden bg-gray-100 shadow mb-6">
              <img src="https://i.pravatar.cc/300?img=33" alt="Staff" class="w-full h-full object-cover" />
            </div>

            <p class="text-sm font-black text-orbit-bg mb-4">{{ staff.staffId }}</p>

            <div class="space-y-0 divide-y divide-gray-50">
              <div v-for="row in staffInfoRows" :key="row.label" class="flex items-center justify-between py-3">
                <span class="text-sm text-gray-400">{{ row.label }}</span>
                <span class="text-sm font-bold text-orbit-bg text-right">{{ row.value }}</span>
              </div>
            </div>
          </div>

          <!-- ── Step 1: Performance Evaluation ── -->
          <div v-if="currentStep === 1">
            <div class="flex items-center gap-2 mb-6">
              <button @click="currentStep--" class="flex items-center gap-1 text-sm text-gray-400 hover:text-orbit-bg transition-colors">
                <ChevronLeft :size="15" />Back
              </button>
              <h3 class="text-base font-black text-orbit-bg">Performance & Work Output</h3>
            </div>

            <div class="space-y-6">
              <div v-for="metric in performanceMetrics" :key="metric.key" class="space-y-2">
                <!-- Label + Slider -->
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="w-1 h-5 rounded-full bg-orbit-blue shrink-0"></span>
                    <span class="text-sm font-black text-orbit-bg">{{ metric.label }}</span>
                  </div>
                  <div class="flex items-center gap-2 shrink-0 w-56">
                    <span class="text-[10px] text-gray-400 font-bold">0</span>
                    <div class="relative flex-1 pt-5">
                      <span
                        class="absolute top-0 text-[11px] font-black text-orbit-green pointer-events-none -translate-x-1/2"
                        :style="{ left: `calc(${(metric.score / 5) * 100}%)` }"
                      >{{ metric.score }}</span>
                      <input
                        type="range" min="0" max="5" step="0.5"
                        v-model.number="metric.score"
                        class="appraisal-slider w-full"
                        :style="{ '--val': `${(metric.score / 5) * 100}%` }"
                      />
                    </div>
                    <span class="text-[10px] text-gray-400 font-bold">5</span>
                  </div>
                </div>
                <!-- Comment -->
                <textarea
                  v-model="metric.comment"
                  placeholder="Enter your comment here"
                  rows="1"
                  class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 text-gray-500 placeholder-gray-300 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- ── Step 2: Conduct & Discipline ── -->
          <div v-if="currentStep === 2">
            <div class="flex items-center gap-2 mb-6">
              <button @click="currentStep--" class="flex items-center gap-1 text-sm text-gray-400 hover:text-orbit-bg transition-colors">
                <ChevronLeft :size="15" />Back
              </button>
              <h3 class="text-base font-black text-orbit-bg">Conduct & Discipline</h3>
            </div>

            <div class="space-y-6">
              <div v-for="metric in conductMetrics" :key="metric.key" class="space-y-2">
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="w-1 h-5 rounded-full bg-orbit-blue shrink-0"></span>
                    <span class="text-sm font-black text-orbit-bg">{{ metric.label }}</span>
                  </div>
                  <div class="flex items-center gap-2 shrink-0 w-56">
                    <span class="text-[10px] text-gray-400 font-bold">0</span>
                    <div class="relative flex-1 pt-5">
                      <span
                        class="absolute top-0 text-[11px] font-black text-orbit-green pointer-events-none -translate-x-1/2"
                        :style="{ left: `calc(${(metric.score / 5) * 100}%)` }"
                      >{{ metric.score }}</span>
                      <input
                        type="range" min="0" max="5" step="0.5"
                        v-model.number="metric.score"
                        class="appraisal-slider w-full"
                        :style="{ '--val': `${(metric.score / 5) * 100}%` }"
                      />
                    </div>
                    <span class="text-[10px] text-gray-400 font-bold">5</span>
                  </div>
                </div>
                <div class="relative">
                  <textarea
                    v-model="metric.comment"
                    :placeholder="metric.placeholder || 'Enter your comment here'"
                    rows="1"
                    class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 pr-10 text-gray-500 placeholder-gray-300 resize-none"
                  ></textarea>
                  <Pencil :size="14" class="absolute right-3 top-3 text-orbit-blue opacity-60" />
                </div>
              </div>

              <!-- Disciplinary Records -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-5 rounded-full bg-orbit-blue shrink-0"></span>
                  <span class="text-sm font-black text-orbit-bg">Disciplinary Records</span>
                </div>
                <textarea
                  v-model="conduct.disciplinary"
                  placeholder="No disciplinary issues to report"
                  rows="2"
                  class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 text-gray-500 placeholder-gray-300 resize-none"
                ></textarea>
              </div>

              <!-- Supervisor's Remarks -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-5 rounded-full bg-orbit-blue shrink-0"></span>
                  <span class="text-sm font-black text-orbit-bg">Supervisor's Remarks</span>
                </div>
                <textarea
                  v-model="conduct.supervisorRemarks"
                  placeholder="A role model in conduct and academic ethics"
                  rows="2"
                  class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 text-gray-500 placeholder-gray-300 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- ── Step 3: Goals & Development ── -->
          <div v-if="currentStep === 3">
            <div class="flex items-center gap-2 mb-6">
              <button @click="currentStep--" class="flex items-center gap-1 text-sm text-gray-400 hover:text-orbit-bg transition-colors">
                <ChevronLeft :size="15" />Back
              </button>
              <h3 class="text-base font-black text-orbit-bg">Goals & Development</h3>
            </div>

            <div class="space-y-6">
              <!-- Staff Self-Appraisal Summary (read-only) -->
              <div class="space-y-2">
                <h4 class="text-sm font-black text-orbit-bg">Staff Self-Appraisal Summary</h4>
                <div class="bg-orbit-light/60 rounded-lg px-4 py-3 text-sm text-gray-500 leading-relaxed">
                  This year, I focused on improving student engagement through active class discussions and integrating digital tools. I plan to secure research grants next year.
                </div>
              </div>

              <!-- Training Needs -->
              <div class="space-y-2">
                <h4 class="text-sm font-black text-orbit-bg">Training Needs Identified</h4>
                <div class="relative">
                  <input
                    v-model="goals.trainingNeeds"
                    type="text"
                    class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-3 pr-10 text-gray-500 placeholder-gray-300"
                    placeholder="Advanced Data Analysis (STATA / R Workshop)"
                  />
                  <Pencil :size="14" class="absolute right-3 top-3.5 text-orbit-blue opacity-60" />
                </div>
              </div>

              <!-- Recommended Professional Development -->
              <div class="space-y-2">
                <h4 class="text-sm font-black text-orbit-bg">Recommended Professional Development</h4>
                <textarea
                  v-model="goals.professionalDev"
                  placeholder="Enter your comment here"
                  rows="2"
                  class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 text-gray-500 placeholder-gray-300 resize-none"
                ></textarea>
              </div>

              <!-- Suggested Next Role / Promotion -->
              <div class="space-y-2">
                <div class="flex items-center justify-between flex-wrap gap-3">
                  <h4 class="text-sm font-black text-orbit-bg">Suggested Next Role / Promotion</h4>
                  <div class="relative min-w-[220px]">
                    <select
                      v-model="goals.nextRole"
                      class="w-full appearance-none bg-orbit-light/60 border border-gray-200 focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 pr-9 text-sm font-semibold text-orbit-bg"
                    >
                      <option v-for="opt in nextRoleOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                    <ChevronDown :size="14" class="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <textarea
                  v-model="goals.nextRoleComment"
                  placeholder="Enter your comment here"
                  rows="2"
                  class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 text-gray-500 placeholder-gray-300 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- ── Step 4: Summary & Submission ── -->
          <div v-if="currentStep === 4">
            <div class="flex items-center gap-2 mb-6">
              <button @click="currentStep--" class="flex items-center gap-1 text-sm text-gray-400 hover:text-orbit-bg transition-colors">
                <ChevronLeft :size="15" />Back
              </button>
              <h3 class="text-base font-black text-orbit-bg">Summary & Submission</h3>
            </div>

            <div class="space-y-6">
              <!-- Overall Rating -->
              <div class="flex items-center justify-between">
                <span class="text-sm font-black text-orbit-bg">Overall Performance Rating</span>
                <div class="relative w-14 h-14">
                  <svg class="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="#f1f5f9" stroke-width="4"/>
                    <circle cx="28" cy="28" r="24" fill="none" stroke="#fbbc04" stroke-width="4"
                      :stroke-dasharray="`${(overallRating / 5) * 150.8} 150.8`"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-sm font-black text-orbit-bg leading-none">{{ overallRating }}</span>
                    <Star :size="9" class="text-orbit-orange fill-orbit-orange mt-0.5" />
                  </div>
                </div>
              </div>

              <!-- HOU Remarks -->
              <div class="space-y-2">
                <h4 class="text-sm font-black text-orbit-bg">Final Head of Unit (HOU) Remarks</h4>
                <textarea
                  v-model="summary.houRemarks"
                  placeholder="Enter your comment here"
                  rows="3"
                  class="w-full text-sm bg-orbit-light/60 border border-transparent focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 text-gray-500 placeholder-gray-300 resize-none"
                ></textarea>
              </div>

              <!-- Forward To -->
              <div class="flex items-center justify-between flex-wrap gap-3">
                <span class="text-sm font-black text-orbit-bg">Forward To</span>
                <input
                  type="text"
                  value="Head of Division"
                  readonly
                  class="bg-orbit-light/60 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 min-w-[200px] focus:outline-none cursor-default"
                />
              </div>

              <!-- Role Recommendation -->
              <div class="flex items-center justify-between flex-wrap gap-3">
                <span class="text-sm font-black text-orbit-bg">Role Recommendation</span>
                <div class="relative min-w-[200px]">
                  <select
                    v-model="summary.roleRecommendation"
                    class="w-full appearance-none bg-orbit-light/60 border border-gray-200 focus:border-orbit-blue focus:outline-none rounded-lg px-4 py-2.5 pr-9 text-sm font-semibold text-orbit-bg"
                  >
                    <option>Yes</option>
                    <option>No</option>
                    <option>Conditional</option>
                  </select>
                  <ChevronDown :size="14" class="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer Buttons -->
        <div class="px-7 py-5 border-t border-gray-100 flex gap-3 shrink-0">
          <button
            v-if="currentStep > 0"
            class="py-3 px-5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:border-orbit-blue hover:text-orbit-blue transition-colors flex items-center gap-1"
            @click="currentStep--"
          >
            <ChevronLeft :size="15" /> Back
          </button>
          <button
            class="flex-1 py-3 rounded-xl border-2 border-orbit-blue text-orbit-blue font-bold text-sm hover:bg-orbit-blue/5 transition-colors"
            @click="$emit('close')"
          >
            Save as Draft
          </button>
          <button
            v-if="currentStep < steps.length - 1"
            class="flex-1 py-3 rounded-xl bg-orbit-blue text-white font-bold text-sm hover:bg-orbit-bgSec transition-colors"
            @click="currentStep++"
          >
            Next
          </button>
          <button
            v-else
            class="flex-1 py-3 rounded-xl bg-orbit-blue text-white font-bold text-sm hover:bg-orbit-bgSec transition-colors"
            @click="$emit('submit'); $emit('close')"
          >
            Submit Appraisal
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { Check, ChevronDown, ChevronLeft, Pencil, Star, X } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  initialStep: { type: Number, default: 0 },
  staff: {
    type: Object,
    default: () => ({
      name: 'Dr. Jane Okafor',
      unit: 'Registry Unit',
      period: 'Jan–Dec 2025',
      staffId: 'ECF/ACA/0458',
    }),
  },
})
defineEmits(['close', 'submit'])

// ── Stepper ───────────────────────────────────────────────────────────────────
const currentStep = ref(props.initialStep)

// Reset to the correct starting step each time the modal opens
watch(() => props.show, (val) => {
  if (val) currentStep.value = props.initialStep
})
const steps = [
  { key: 'info',      label: 'Staff Information'    },
  { key: 'perf',      label: 'Performance Evaluation' },
  { key: 'conduct',   label: 'Conduct & Discipline'  },
  { key: 'goals',     label: 'Goals & Development'   },
  { key: 'summary',   label: 'Summary & Submission'  },
]

// ── Step 0 data ───────────────────────────────────────────────────────────────
const staffInfoRows = [
  { label: 'Full Name',               value: 'Dr. (Mrs.) Tolulope Adetunji' },
  { label: 'Position / Rank',         value: 'Senior Records Officer'        },
  { label: 'Subunit',                 value: 'Records'                       },
  { label: 'Date of Last Promotion',  value: '15th July 2021'                },
  { label: 'Year of Service',         value: '11 years'                      },
  { label: 'Supervisor',              value: 'Mrs. Grace Okon (HOU)'         },
  { label: 'Appraisal Period',        value: 'January – December 2025'       },
]

// ── Step 1 data ───────────────────────────────────────────────────────────────
const performanceMetrics = ref([
  { key: 'knowledge',   label: 'Job Knowledge & Skills',         score: 3.5, comment: '' },
  { key: 'quality',     label: 'Work Quality / Accuracy',        score: 3.5, comment: '' },
  { key: 'productivity',label: 'Productivity & Efficiency',      score: 3.5, comment: '' },
  { key: 'dependability',label: 'Dependability / Reliability',   score: 3.5, comment: '' },
  { key: 'initiative',  label: 'Initiative & Innovation',        score: 3.5, comment: '' },
  { key: 'teamwork',    label: 'Teamwork & Collaboration',       score: 3.5, comment: '' },
  { key: 'punctuality', label: 'Punctuality / Attendance',       score: 3.5, comment: '' },
  { key: 'communication',label: 'Communication Skills',          score: 3.5, comment: '' },
  { key: 'adherence',   label: 'Adherence to Department Policies', score: 3.5, comment: '' },
])

// ── Step 2 data ───────────────────────────────────────────────────────────────
const conductMetrics = ref([
  { key: 'cpunctuality', label: 'Punctuality',                score: 3.5, comment: '', placeholder: 'Enter your comment here' },
  { key: 'relations',    label: 'Relationship with Colleagues', score: 3.5, comment: '', placeholder: 'Enter your comment here' },
  { key: 'rules',        label: 'Adherence to Unit Rules',    score: 4.5, comment: 'No record of misconduct', placeholder: 'No record of misconduct' },
])
const conduct = ref({ disciplinary: '', supervisorRemarks: '' })

// ── Step 3 data ───────────────────────────────────────────────────────────────
const goals = ref({
  trainingNeeds:  '',
  professionalDev: '',
  nextRole:       'Recommend for Promotion',
  nextRoleComment: '',
})

const nextRoleOptions = [
  'No Recommendation at this time',
  'Recommend for Promotion',
  'Recommend for Higher Responsibility',
  'Recommend for Training before Promotion',
  'Recommend for Sabbatical Leave',
  'Recommend for Reassignment',
  'Recommend for Leadership Role',
]

// ── Step 4 data ───────────────────────────────────────────────────────────────
const summary = ref({ houRemarks: '', roleRecommendation: 'Yes' })

const overallRating = computed(() => {
  const allScores = [
    ...performanceMetrics.value.map((m) => m.score),
    ...conductMetrics.value.map((m) => m.score),
  ]
  const avg = allScores.reduce((a, b) => a + b, 0) / allScores.length
  return Math.round(avg * 10) / 10
})
</script>

<style scoped>
.appraisal-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: linear-gradient(
    to right,
    #3a974c 0%,
    #3a974c calc(var(--val, 70%)),
    #d1fae5 calc(var(--val, 70%)),
    #d1fae5 100%
  );
  border-radius: 9999px;
  outline: none;
  cursor: pointer;
}

.appraisal-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: white;
  border: 3px solid #3a974c;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.appraisal-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: white;
  border: 3px solid #3a974c;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}
</style>
