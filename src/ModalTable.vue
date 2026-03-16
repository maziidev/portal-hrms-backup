<script setup>
/**
 * Component: DivisionAppraisalTable.vue
 */
import {
    Calendar,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Eye,
    Inbox,
    PlayCircle,
    RefreshCcw,
    Search,
    Star,
    X
} from 'lucide-vue-next';
import { computed, ref } from 'vue';

// --- State ---
const loading = ref(false);
const searchKeyword = ref('');
const selectedStatus = ref('');
const selectedDate = ref('');
const dateInputRef = ref(null);

// Modal State
const showModal = ref(false);
const currentStep = ref(1);
const selectedStaff = ref(null);
const deanRating = ref(3.5);

const steps = [
    { id: 1, label: 'Performance' },
    { id: 2, label: 'Conduct' },
    { id: 3, label: 'Assessment' }
];

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Mock Data
const staffAppraisals = ref([
    { id: 1, name: 'Prof. John A. Doe', position: 'Senior Admin Officer', period: '2025 Mid-Year', last_updated: '2025-10-02', progress: '100%', status: 'Ongoing' },
    { id: 2, name: 'Dr. Sarah Jenkins', position: 'Principal Registrar', period: '2025 Mid-Year', last_updated: '2025-10-05', progress: '85%', status: 'Ongoing' },
    { id: 3, name: 'Mr. Samuel Okoro', position: 'Assistant Secretary', period: '2025 Mid-Year', last_updated: '2025-10-01', progress: '0%', status: 'Pending' },
    { id: 4, name: 'Engr. Victor Musa', position: 'Chief Technical Officer', period: '2025 Mid-Year', last_updated: '2025-09-28', progress: '100%', status: 'Closed' },
    { id: 5, name: 'Mrs. Abigail Kole', position: 'Heads of Unit', period: '2025 Mid-Year', last_updated: '2025-10-10', progress: '40%', status: 'Ongoing' },
    { id: 6, name: 'Dr. Benson Ihe', position: 'Lecturer I', period: '2025 Mid-Year', last_updated: '2025-10-11', progress: '100%', status: 'Closed' },
    { id: 7, name: 'Dr. Ifesinachi Ihe', position: 'Lecturer I', period: '2021 Mid-Year', last_updated: '2026-01-11', progress: '100%', status: 'Closed' },
]);

const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Closed', value: 'closed' }
];

// --- Modal Logic ---
const openAppraisal = (staff) => {
    selectedStaff.value = staff;
    currentStep.value = 1;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    selectedStaff.value = null;
};

const handleNext = () => {
    if (currentStep.value < 3) currentStep.value++;
    else submitAppraisal();
};

const submitAppraisal = () => {
    const index = staffAppraisals.value.findIndex(s => s.id === selectedStaff.value.id);
    if (index !== -1) {
        staffAppraisals.value[index].status = 'Ongoing';
        staffAppraisals.value[index].last_updated = new Date().toISOString().split('T')[0];
    }
    closeModal();
};

// --- Table Logic ---
const filteredData = computed(() => {
    return staffAppraisals.value.filter(item => {
        const matchesSearch = item.name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
                             item.position?.toLowerCase().includes(searchKeyword.value.toLowerCase());
        const matchesStatus = !selectedStatus.value || item.status?.toLowerCase() === selectedStatus.value.toLowerCase();
        const matchesDate = !selectedDate.value || item.last_updated === selectedDate.value;
        return matchesSearch && matchesStatus && matchesDate;
    });
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredData.value.slice(start, start + itemsPerPage.value);
});

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };

const openDatePicker = () => {
    if (dateInputRef.value) dateInputRef.value.showPicker ? dateInputRef.value.showPicker() : dateInputRef.value.focus();
};

const refreshRegistry = () => {
    loading.value = true;
    setTimeout(() => { loading.value = false; }, 800);
};
</script>

<template>
    <div class="py-10 px-4 lg:px-10 w-full mx-auto">
        <div class="bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">
            <div class="p-5 md:p-8 border-b border-gray-200 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h2 class="text-orbit-black font-bold text-2xl md:text-3xl uppercase tracking-tighter italic">
                        Unit Staff Appraisal
                    </h2>
                    <p class="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                        Internal Staff Evaluation & Registry Access
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative flex-grow md:flex-grow-0">
                        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="18" :stroke-width="2.5" />
                        <input v-model="searchKeyword" type="text" placeholder="SEARCH STAFF..."
                            class="bg-gray-50 border-2 border-gray-200 pl-12 pr-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full md:w-64" />
                    </div>

                    <div @click="openDatePicker" class="relative flex items-center flex-grow md:flex-grow-0 cursor-pointer">
                        <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="18" :stroke-width="2.5" />
                        <input ref="dateInputRef" v-model="selectedDate" type="date"
                            class="bg-white border-2 border-gray-200 pl-12 pr-10 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full md:min-w-[200px] cursor-pointer" />
                        <button v-if="selectedDate" @click.stop="selectedDate = ''" class="absolute right-3 text-gray-400 p-1 cursor-pointer">
                            <X :size="16" :stroke-width="2.5" />
                        </button>
                    </div>

                    <select v-model="selectedStatus" class="bg-white border-2 border-gray-200 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue cursor-pointer min-w-[150px]">
                        <option value="">All Status</option>
                        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>

                    <button @click="refreshRegistry" :disabled="loading"
                        class="bg-orbit-black text-white p-3 border-2 border-orbit-black cursor-pointer disabled:opacity-50">
                        <RefreshCcw :class="{'animate-spin': loading}" :size="20" :stroke-width="2.5" />
                    </button>
                </div>
            </div>

            <div class="w-full overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[1100px]">
                    <thead class="bg-gray-50 border-b-2 border-gray-200 text-orbit-black text-sm font-bold uppercase tracking-widest">
                        <tr>
                            <th class="py-6 px-8">Staff Personnel</th>
                            <th class="py-6 px-6 text-center">Position</th>
                            <th class="py-6 px-6 text-center">Status</th>
                            <th class="py-6 px-8 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700 font-medium">
                        <template v-if="!loading && paginatedData.length > 0">
                            <tr v-for="row in paginatedData" :key="row.id" class="border-b border-gray-100 transition-colors hover:bg-gray-50/50">
                                <td class="py-6 px-8 font-bold text-orbit-black uppercase italic text-base">{{ row.name }}</td>
                                <td class="py-6 px-6 text-center text-xs uppercase text-gray-500 font-bold">{{ row.position }}</td>

                                <td class="py-6 px-6 text-center">
                                    <button :class="{
                                        'bg-orbit-red/10 text-orbit-red': row.status.toLowerCase() === 'pending',
                                        'bg-orbit-blue/10 text-orbit-blue': row.status.toLowerCase() === 'ongoing',
                                        'bg-orbit-black/10 text-orbit-black': row.status.toLowerCase() === 'closed'
                                    }" class="w-32 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-default">
                                        {{ row.status }}
                                    </button>
                                </td>

                                <td class="py-6 px-8 text-right">
                                    <button @click.stop="openAppraisal(row)"
                                        class="w-32 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest cursor-pointer inline-flex items-center justify-center gap-2 transition-transform active:scale-95"
                                        :class="row.status.toLowerCase() === 'pending'
                                            ? 'bg-green-600/10 text-green-600'
                                            : 'bg-orbit-blue/10 text-orbit-blue'">
                                        <component :is="row.status.toLowerCase() === 'pending' ? PlayCircle : Eye" :size="14" />
                                        {{ row.status.toLowerCase() === 'pending' ? 'Start' : 'Review' }}
                                    </button>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="4" class="py-32 text-center">
                                <div class="flex flex-col items-center opacity-40">
                                    <Inbox :size="48" class="mb-4" />
                                    <p class="font-bold uppercase text-xs italic">No Records Found</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span class="text-[10px] font-bold uppercase text-gray-500 italic">Showing {{ paginatedData.length }} of {{ filteredData.length }} Entries</span>
                <div class="flex items-center space-x-4">
                    <button @click="prevPage" :disabled="currentPage === 1" class="p-2 border-2 rounded-sm cursor-pointer disabled:opacity-20 hover:bg-white transition-colors">
                        <ChevronLeft :size="18" :stroke-width="3" />
                    </button>
                    <span class="text-xs font-bold uppercase italic">Page {{ currentPage }} of {{ totalPages || 1 }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0" class="p-2 border-2 rounded-sm cursor-pointer disabled:opacity-20 hover:bg-white transition-colors">
                        <ChevronRight :size="18" :stroke-width="3" />
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div class="bg-white w-full max-w-4xl rounded-sm shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]">

                <button @click="closeModal" class="absolute right-6 top-6 text-orbit-black z-20 hover:rotate-90 transition-transform">
                    <X :size="28" :stroke-width="3" />
                </button>

                <div class="bg-gray-50 border-b border-gray-200 px-8 py-6">
                    <div class="flex items-center justify-between max-w-2xl mx-auto relative">
                        <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
                        <div class="absolute top-1/2 left-0 h-0.5 bg-orbit-blue -translate-y-1/2 transition-all duration-500"
                             :style="{ width: ((currentStep - 1) / (steps.length - 1)) * 100 + '%' }"></div>

                        <div v-for="step in steps" :key="step.id" class="relative z-10 flex flex-col items-center gap-2">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                                :class="currentStep >= step.id ? 'bg-orbit-blue border-orbit-blue text-white shadow-lg' : 'bg-white border-gray-300 text-gray-400'">
                                <CheckCircle2 v-if="currentStep > step.id" :size="20" />
                                <span v-else class="text-sm font-bold">{{ step.id }}</span>
                            </div>
                            <span class="text-[10px] font-bold uppercase tracking-widest italic"
                                  :class="currentStep >= step.id ? 'text-orbit-black' : 'text-gray-400'">
                                {{ step.label }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="px-10 py-8 border-b border-gray-100">
                    <div class="flex items-center gap-4">
                        <div class="bg-orbit-blue w-1 h-12"></div>
                        <div>
                            <p class="text-[10px] font-bold uppercase text-gray-400 tracking-[0.3em]">Evaluation Session</p>
                            <h2 class="text-2xl font-bold text-orbit-black uppercase italic tracking-tighter">{{ selectedStaff?.name }}</h2>
                            <p class="text-orbit-blue text-xs font-bold uppercase italic tracking-widest">{{ selectedStaff?.position }}</p>
                        </div>
                    </div>
                </div>

                <div class="px-10 py-10 flex-1 overflow-y-auto custom-scrollbar">

                    <div v-if="currentStep === 1" class="space-y-8 animate-slide-up">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div v-for="(metric, idx) in ['Teaching Effectiveness', 'Research Output', 'Supervision', 'Departmental Support']" :key="metric"
                                 class="p-6 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                                <div class="flex justify-between items-start mb-4">
                                    <div class="space-y-1">
                                        <p class="text-[10px] font-bold text-gray-400 uppercase">Metric 0{{ idx + 1 }}</p>
                                        <h4 class="font-bold text-orbit-black uppercase italic">{{ metric }}</h4>
                                    </div>
                                    <div class="bg-orbit-black text-white px-3 py-1 text-xs font-bold italic">4.{{ 5 + idx }}</div>
                                </div>
                                <div class="w-full bg-white border border-gray-100 p-4 text-xs italic text-gray-500 leading-relaxed">
                                    Historical data suggests consistent performance above departmental average for the current period.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentStep === 2" class="space-y-10 animate-slide-up max-w-2xl mx-auto">
                        <div class="space-y-2">
                            <label class="text-[11px] font-bold uppercase text-gray-400 tracking-widest italic">Observations & Remarks</label>
                            <textarea placeholder="TYPE YOUR REMARKS HERE..."
                                class="w-full bg-gray-50 border-2 border-gray-100 p-6 text-sm font-bold uppercase outline-none focus:border-orbit-blue min-h-[140px] italic transition-colors"></textarea>
                        </div>

                        <div class="grid grid-cols-2 gap-8">
                            <div class="space-y-2">
                                <label class="text-[11px] font-bold uppercase text-gray-400 tracking-widest italic">Attendance Audit</label>
                                <div class="bg-orbit-green-bg p-5 text-center text-orbit-green font-bold text-2xl italic border border-orbit-green/20">
                                    98%
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-bold uppercase text-gray-400 tracking-widest italic">Ethical Standard</label>
                                <div class="bg-orbit-blue/5 p-5 text-center text-orbit-blue font-bold uppercase text-sm italic border border-orbit-blue/20 flex items-center justify-center h-full">
                                    Satisfactory
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="currentStep === 3" class="space-y-12 animate-slide-up max-w-2xl mx-auto text-center">
                        <div class="space-y-4">
                            <h3 class="text-3xl font-bold text-orbit-black uppercase italic tracking-tighter">Dean's Assessment</h3>
                            <div class="flex items-center justify-center gap-2">
                                <Star v-for="i in 5" :key="i" :size="24" :fill="i <= Math.floor(deanRating) ? '#22c55e' : 'none'"
                                      :class="i <= Math.floor(deanRating) ? 'text-orbit-green' : 'text-gray-200'" />
                            </div>
                        </div>

                        <div class="bg-gray-50 border-2 border-gray-100 p-10 space-y-8">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-bold uppercase text-gray-400 italic">Score Calibration</span>
                                <span class="text-4xl font-black text-orbit-green italic">{{ deanRating }}<small class="text-sm">/5.0</small></span>
                            </div>

                            <input v-model="deanRating" type="range" min="0" max="5" step="0.1"
                                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orbit-green"
                                :style="{ background: `linear-gradient(to right, #22c55e ${(deanRating/5)*100}%, #e5e7eb ${(deanRating/5)*100}%)` }" />
                        </div>

                        <div class="space-y-2 text-left">
                            <label class="text-[11px] font-bold uppercase text-gray-400 tracking-widest italic">HOD Final Summary</label>
                            <input type="text" placeholder="TYPE FINAL SUMMARY..."
                                   class="w-full border-b-2 border-gray-200 py-4 text-sm font-bold uppercase outline-none focus:border-orbit-black italic bg-transparent" />
                        </div>
                    </div>
                </div>

                <div class="px-10 py-8 border-t border-gray-200 bg-white grid grid-cols-2 gap-6">
                    <button @click="closeModal"
                        class="py-4 border-2 border-orbit-black text-orbit-black font-bold uppercase text-xs tracking-[0.2em] italic transition-all">
                        Discard Changes
                    </button>
                    <button @click="handleNext"
                        class="py-4 bg-orbit-blue text-white font-bold uppercase text-xs tracking-[0.2em] italic hover:bg-orbit-black transition-all shadow-lg shadow-orbit-blue/20">
                        {{ currentStep === 3 ? 'Confirm & Submit' : 'Continue Evaluation' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-orbit-black { color: #1a1a1a; }
.text-orbit-blue { color: #2388ff; }
.text-orbit-red { color: #ff3b3b; }
.text-orbit-green { color: #22c55e; }
.bg-orbit-black { background-color: #1a1a1a; }
.bg-orbit-blue { background-color: #2388ff; }
.bg-orbit-green-bg { background-color: rgba(34, 197, 94, 0.1); }

.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 0; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2388ff; }

.animate-slide-up {
    animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #ffffff;
    border: 4px solid #22c55e;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>