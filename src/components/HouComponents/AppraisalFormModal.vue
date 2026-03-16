<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-[9000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" @click.self="handleClose">
      <div class="bg-white w-full max-w-3xl rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]">

        <button @click="handleClose" class="absolute right-4 top-4 text-slate-400 hover:text-slate-900 transition-colors z-20">
          <X :size="24" />
        </button>

        <div class="border-b border-slate-100 px-8 py-6 shrink-0">
          <h2 class="text-xl font-bold text-slate-900">Staff Appraisal Form – {{ staff.full_name }}</h2>
          <p class="text-slate-500 text-sm font-medium">{{ staff.rank || 'Lecturer' }}, {{ staff.dept_code || 'Academic' }} Department</p>
        </div>

        <div class="px-8 py-4 flex justify-between items-center relative shrink-0">
          <div class="absolute left-8 right-8 top-[45%] h-0.5 bg-slate-100 -z-10"></div>
          <template v-for="(step, idx) in steps" :key="step.key">
            <div class="flex flex-col items-center relative z-10 bg-white px-2">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                idx < currentStep ? 'bg-emerald-500 border-emerald-500 text-white' :
                idx === currentStep ? 'border-blue-600 text-blue-600' : 'border-slate-200 text-slate-300'
              ]">
                <Check v-if="idx < currentStep" :size="16" strokeWidth="3" />
                <span v-else class="text-xs font-bold">{{ idx + 1 }}</span>
              </div>
              <span :class="['text-[10px] mt-2 font-bold uppercase tracking-tight', idx <= currentStep ? 'text-slate-900' : 'text-slate-300']">
                {{ step.label }}
              </span>
            </div>
          </template>
        </div>

        <div class="overflow-y-auto flex-1 px-8 py-6">
          <div v-if="currentStep === 0" class="animate-in fade-in slide-in-from-bottom-4">
             <h3 class="text-lg font-bold mb-6">Personal Information</h3>
             <div class="flex flex-col md:flex-row gap-8">
               <div class="w-full md:w-1/3 text-center">
                 <img :src="staff.avatar || `https://ui-avatars.com/api/?name=${staff.full_name}&background=2388ff&color=fff`"
                      class="w-full aspect-[3/4] object-cover rounded-2xl shadow-sm border-4 border-white ring-1 ring-slate-100">
                 <p class="font-black text-blue-600 mt-4 tracking-widest uppercase text-sm">Record ID: {{ staff.appraisal_id || staff.id }}</p>
               </div>
               <div class="flex-1 space-y-4">
                 <div v-for="row in staffDetailRows" :key="row.label" class="flex items-center justify-between py-3 border-b border-slate-50">
                   <p class="text-slate-400 text-xs font-bold uppercase tracking-wider">{{ row.label }}</p>
                   <p class="text-slate-900 font-bold text-sm">{{ row.value }}</p>
                 </div>
               </div>
             </div>
          </div>

          <div v-if="currentStep === 1" class="space-y-6">
            <h3 class="text-lg font-bold">Performance & Work Output</h3>
            <div v-for="metric in performanceMetrics" :key="metric.key" class="space-y-3 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-1 h-6 bg-blue-600 rounded-full"></div>
                  <h6 class="font-bold text-slate-800 text-sm">{{ metric.label }}</h6>
                </div>
                <div class="flex flex-col items-end w-48">
                  <span class="text-emerald-600 font-black text-sm mb-1">{{ metric.score }}</span>
                  <input type="range" min="0" max="5" step="0.5" v-model.number="metric.score"
                         class="appraisal-slider w-full" :style="{ '--val': (metric.score/5)*100 + '%' }">
                </div>
              </div>
              <input type="text" v-model="metric.comment" placeholder="Add specific observation..."
                     class="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                     :class="{'border-amber-400 bg-amber-50': triedToProceed && !metric.comment.trim()}">
            </div>
          </div>

          <div v-if="currentStep === 2" class="space-y-6">
            <h3 class="text-lg font-bold">Conduct & Discipline</h3>
            <div class="space-y-8">
              <div v-for="metric in conductMetrics" :key="metric.key" class="space-y-4">
                <div class="flex items-center justify-between">
                  <h6 class="font-bold text-slate-800 text-sm">{{ metric.label }}</h6>
                  <div class="w-48">
                    <input type="range" min="0" max="5" step="1" v-model.number="metric.score"
                           class="appraisal-slider w-full" :style="{ '--val': (metric.score/5)*100 + '%' }">
                  </div>
                </div>
                <textarea v-model="metric.comment" rows="2" class="w-full p-3 bg-slate-50 rounded-lg text-sm border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                         placeholder="HOU Remarks on conduct..."
                         :class="{'border-amber-400 bg-amber-50': triedToProceed && !metric.comment.trim()}"></textarea>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 3" class="space-y-6">
            <h3 class="text-lg font-bold">Summary & Recommendation</h3>
            <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-6">
               <div class="space-y-2">
                  <label class="block text-xs font-black text-blue-900 uppercase tracking-widest">Final HOU Remarks</label>
                  <textarea v-model="houRemarks" rows="4" class="w-full p-4 bg-white rounded-xl border border-blue-100 shadow-sm text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                            placeholder="Provide a summary of overall performance..."
                            :class="{'border-amber-400': triedToProceed && houRemarks.trim().length < 10}"></textarea>
               </div>
               <div class="flex items-center justify-between pt-2 border-t border-blue-100">
                  <span class="text-sm font-bold text-blue-900">Final Recommendation</span>
                  <select v-model="recommendation" class="bg-white border border-blue-200 rounded-lg px-4 py-2 text-sm font-bold text-blue-900 shadow-sm outline-none cursor-pointer">
                    <option value="APPROVED">Recommended for Promotion</option>
                    <option value="REJECTED">Stay in Current Rank</option>
                    <option value="CONDITIONAL">Conditional Promotion</option>
                  </select>
               </div>
            </div>
          </div>
        </div>

        <div class="px-8 py-6 border-t border-slate-100 bg-white shrink-0">
          <div v-if="triedToProceed && !isStepValid" class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-700 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle :size="18" />
            <span class="font-medium">{{ validationErrorMessage }}</span>
          </div>

          <div class="flex gap-3">
            <button v-if="currentStep > 0" @click="handleBack" class="h-12 px-6 rounded-xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all">
              Back
            </button>

            <button @click="handleSaveDraft" class="h-12 px-6 rounded-xl border border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all flex items-center gap-2">
              <Save :size="18" />
              Save Draft
            </button>

            <button v-if="currentStep < steps.length - 1" @click="handleNext"
                    class="flex-1 h-12 rounded-xl text-white font-bold text-sm shadow-lg transition-all"
                    :class="triedToProceed && !isStepValid ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'">
              Next Step
            </button>

            <button v-else @click="handleSubmit" :disabled="submitting"
                    class="flex-1 h-12 rounded-xl text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                    :class="(triedToProceed && !isStepValid) || submitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'">
              <Loader2 v-if="submitting" class="animate-spin" :size="18" />
              {{ submitting ? 'Submitting...' : 'Submit Appraisal' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reviewAppraisal } from "@/apis/management/staff";
import { AlertCircle, Check, Loader2, Save, X } from 'lucide-vue-next';
import { useMessage } from 'naive-ui';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  staff: { type: Object, required: true }
})

const emit = defineEmits(['close', 'submit'])
const message = useMessage()

// --- State ---
const currentStep = ref(0)
const submitting = ref(false)
const triedToProceed = ref(false) // Flag for showing errors
const houRemarks = ref('')
const recommendation = ref('APPROVED')

const steps = [
  { key: 'info', label: 'Staff Info' },
  { key: 'perf', label: 'Performance' },
  { key: 'conduct', label: 'Conduct' },
  { key: 'summary', label: 'Summary' }
]

const performanceMetrics = ref([
  { key: 'knowledge', label: 'Job Knowledge & Skills', score: 3.5, comment: '' },
  { key: 'quality', label: 'Work Quality / Accuracy', score: 3.5, comment: '' },
  { key: 'efficiency', label: 'Productivity & Efficiency', score: 3.5, comment: '' },
  { key: 'teamwork', label: 'Teamwork & Collaboration', score: 3.5, comment: '' }
])

const conductMetrics = ref([
  { key: 'punctuality', label: 'Attendance & Punctuality', score: 4, comment: '' },
  { key: 'ethics', label: 'Professional Ethics', score: 5, comment: '' }
])

// --- Validation Logic ---
const isStepValid = computed(() => {
  if (currentStep.value === 1) {
    return performanceMetrics.value.every(m => m.comment.trim().length > 0);
  }
  if (currentStep.value === 2) {
    return conductMetrics.value.every(m => m.comment.trim().length > 0);
  }
  if (currentStep.value === 3) {
    return houRemarks.value.trim().length >= 10;
  }
  return true;
})

const validationErrorMessage = computed(() => {
  if (currentStep.value === 1 || currentStep.value === 2) return "Please provide comments for all metrics before proceeding.";
  if (currentStep.value === 3) return "Please provide more detailed HOU remarks (min 10 characters).";
  return "";
})

// --- Computed ---
const staffDetailRows = computed(() => [
  { label: 'Full Name', value: props.staff.full_name || '---' },
  { label: 'Rank', value: props.staff.rank || '---' },
  { label: 'Department', value: props.staff.dept_code || '---' },
  { label: 'Last Promotion', value: props.staff.last_promo || '---' },
  { label: 'Year of Service', value: props.staff.service_years || '---' },
  { label: 'Period', value: props.staff.appraisal_period || '---' }
])

// --- Methods ---
const handleNext = () => {
  triedToProceed.value = true;
  if (isStepValid.value) {
    currentStep.value++;
    triedToProceed.value = false;
  }
}

const handleBack = () => {
  currentStep.value--;
  triedToProceed.value = false;
}

const resetForm = () => {
  currentStep.value = 0
  triedToProceed.value = false
  houRemarks.value = ''
  recommendation.value = 'APPROVED'
  performanceMetrics.value.forEach(m => { m.score = 3.5; m.comment = '' })
  conductMetrics.value.forEach(m => { m.score = 4; m.comment = '' })
}

const handleClose = () => {
  resetForm()
  emit('close')
}

const handleSaveDraft = () => {
  message.success("Progress saved as draft.");
  handleClose();
}

const handleSubmit = async () => {
  triedToProceed.value = true;
  if (!isStepValid.value) return;

  submitting.value = true;
  const targetId = props.staff.appraisal_id || props.staff.id;

  try {
    const payload = {
      decision: recommendation.value,
      comment: houRemarks.value,
      metrics: [...performanceMetrics.value, ...conductMetrics.value]
    };

    await reviewAppraisal(targetId, payload);
    message.success(`Appraisal for ${props.staff.full_name} submitted successfully.`);
    emit('submit');
    handleClose();
  } catch (err) {
    message.error(err.response?.data?.detail || "Submission failed.");
  } finally {
    submitting.value = false;
  }
}

watch(() => props.show, (val) => { if (val) resetForm() })
</script>