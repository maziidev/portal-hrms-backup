<script setup>
/**
 * Component: DivisionAppraisalTable.vue
 */
import { getUnitStaff } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Eye,
    Inbox,
    Loader2,
    PlayCircle,
    RefreshCcw,
    Search
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    unitId: { type: [String, Number], required: false }
});

const auth = useAuthStore();
const loading = ref(false);
const isSubmitting = ref(false);

// --- State ---
const searchKeyword = ref('');
const selectedStatus = ref('');
const selectedDate = ref('');
const dateInputRef = ref(null);

// Modal & Form State
const showModal = ref(false);
const currentStep = ref(1);
const selectedStaff = ref(null);
const deanRating = ref(3.5);
const remarks = ref('');
const hodSummary = ref('');

const steps = [
    { id: 1, label: 'Performance' },
    { id: 2, label: 'Conduct' },
    { id: 3, label: 'Assessment' }
];

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);
const staffAppraisals = ref([]);

// --- API: Fetch Data ---
const fetchStaff = async () => {
    if (!props.unitId) return;
    loading.value = true;
    try {
        const response = await getUnitStaff(props.unitId);
        staffAppraisals.value = response.data;
    } catch (error) {
        console.error("Fetch Error:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => fetchStaff());

// --- Modal Logic ---
const openAppraisal = (staff) => {
    selectedStaff.value = staff;
    currentStep.value = 1;
    remarks.value = '';
    hodSummary.value = '';
    showModal.value = true;
};

const closeModal = () => {
    if (isSubmitting.value) return;
    showModal.value = false;
    selectedStaff.value = null;
};

const handleNext = () => {
    if (currentStep.value < 3) currentStep.value++;
    else submitAppraisal();
};

const submitAppraisal = () => {
    isSubmitting.value = true;

    const payload = {
        staff_id: selectedStaff.value.id,
        appraiser_id: auth.staffId,
        unit_id: props.unitId,
        rating: deanRating.value,
        remarks: remarks.value,
        summary: hodSummary.value
    };

    // Logging payload as requested
    console.log("Submitting Appraisal Data:", payload);

    // Simulated API response delay
    setTimeout(() => {
        const index = staffAppraisals.value.findIndex(s => s.id === selectedStaff.value.id);
        if (index !== -1) {
            staffAppraisals.value[index].status = 'Closed';
            staffAppraisals.value[index].last_updated = new Date().toISOString().split('T')[0];
        }
        isSubmitting.value = false;
        closeModal();
    }, 1000);
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

const refreshRegistry = () => fetchStaff();
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

                    <button @click="refreshRegistry" :disabled="loading"
                        class="bg-orbit-black text-white p-3 border-2 border-orbit-black cursor-pointer disabled:opacity-50">
                        <RefreshCcw :class="{'animate-spin': loading}" :size="20" :stroke-width="2.5" />
                    </button>
                </div>
            </div>

            <div class="w-full overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[1250px]">
                    <thead class="bg-gray-50 border-b-2 border-gray-200 text-orbit-black text-xs font-bold uppercase tracking-widest">
                        <tr>
                            <th class="py-6 px-6 text-center">Staff Name</th>
                            <th class="py-6 px-6 text-center">Position</th>
                            <th class="py-6 px-6 text-center">Appraisal Period</th>
                            <th class="py-6 px-6 text-center">Last Updated</th>
                            <th class="py-6 px-6 text-center">Progress</th>
                            <th class="py-6 px-6 text-center">Status</th>
                            <th class="py-6 px-6 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700 font-medium">
                        <template v-if="!loading && paginatedData.length > 0">
                            <tr v-for="row in paginatedData" :key="row.id" class="border-b border-gray-100 transition-colors hover:bg-gray-50/50">
                                <td class="py-6 px-6 text-center font-bold text-orbit-black uppercase italic text-sm">
                                    {{ row.name }}
                                </td>

                                <td class="py-6 px-6 text-center text-[10px] uppercase text-gray-500 font-bold">
                                    {{ row.position }}
                                </td>

                                <td class="py-6 px-6 text-center">
                                    <div class="flex items-center justify-center gap-2 text-xs font-bold uppercase text-gray-600 italic">
                                        <Calendar :size="14" class="text-gray-400" />
                                        {{ row.period || '2025 Mid-Year' }}
                                    </div>
                                </td>

                                <td class="py-6 px-6 text-center">
                                    <div class="flex items-center justify-center gap-2 text-xs font-bold uppercase text-gray-600 italic">
                                        <Calendar :size="14" class="text-gray-400" />
                                        {{ row.last_updated }}
                                    </div>
                                </td>

                                <td class="py-6 px-6 text-center font-black text-orbit-black italic text-sm">
                                    {{ row.progress || '0%' }}
                                </td>

                                <td class="py-6 px-6 text-center">
                                    <button :class="{
                                        'bg-orbit-red/10 text-orbit-red': row.status.toLowerCase() === 'pending' || row.status.toLowerCase() === 'not started',
                                        'bg-orbit-blue/10 text-orbit-blue': row.status.toLowerCase() === 'ongoing',
                                        'bg-orbit-black/10 text-orbit-black': row.status.toLowerCase() === 'closed'
                                    }" class="w-32 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-default">
                                        {{ row.status }}
                                    </button>
                                </td>

                                <td class="py-6 px-6 text-center">
                                    <button @click.stop="openAppraisal(row)"
                                        class="w-32 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest cursor-pointer inline-flex items-center justify-center gap-2 transition-transform active:scale-95"
                                        :class="row.status.toLowerCase() === 'pending' || row.status.toLowerCase() === 'not started'
                                            ? 'bg-green-600/10 text-green-600'
                                            : 'bg-orbit-blue/10 text-orbit-blue'">
                                        <component :is="row.status.toLowerCase() === 'pending' || row.status.toLowerCase() === 'not started' ? PlayCircle : Eye" :size="14" />
                                        {{ row.status.toLowerCase() === 'pending' || row.status.toLowerCase() === 'not started' ? 'Start' : 'Review' }}
                                    </button>
                                </td>
                            </tr>
                        </template>

                        <tr v-else>
                            <td colspan="7" class="py-32 text-center">
                                <div class="flex flex-col items-center opacity-40">
                                    <Inbox v-if="!loading" :size="48" class="mb-4" />
                                    <Loader2 v-else class="animate-spin mb-4" :size="48" />
                                    <p class="font-bold uppercase text-xs italic">
                                        {{ loading ? 'Synchronizing Registry...' : 'No Appraisal Records Found' }}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span class="text-[10px] font-bold uppercase text-gray-500 italic">
                    Showing {{ paginatedData.length }} of {{ filteredData.length }} Entries
                </span>
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
</style>