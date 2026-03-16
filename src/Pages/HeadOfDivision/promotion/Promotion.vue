<template>
    <div class="p-6 space-y-8 bg-[#f9fafb] min-h-screen">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-orbit-blue px-6 py-8 flex items-center justify-between rounded-sm text-white shadow-xl group">
                <div>
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Pending Promotions</p>
                    <p class="text-3xl font-black italic tracking-tighter">{{ stats?.pending_promotions || 0 }}</p>
                </div>
                <div class="p-3 bg-white/10 rounded-sm group-hover:scale-110 transition-transform">
                    <Clock :size="24" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-sm border border-gray-300 shadow-sm transition-all hover:border-emerald-200">
                <div>
                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Endorsed Promotions</p>
                    <p class="text-3xl font-black text-orbit-black italic tracking-tighter">{{ stats?.endorsed_promotions || 0 }}</p>
                </div>
                <div class="p-3 bg-emerald-50 rounded-sm">
                    <FileCheck :size="24" class="text-emerald-600" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-sm border border-gray-300 shadow-sm transition-all hover:border-rose-200">
                <div>
                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Rejected Request</p>
                    <p class="text-3xl font-black text-orbit-black italic tracking-tighter">{{ stats?.rejected_requests || 0 }}</p>
                </div>
                <div class="p-3 bg-rose-50 rounded-sm">
                    <XCircle :size="24" class="text-rose-600" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-sm border border-gray-300 shadow-sm transition-all hover:border-orbit-blue/30">
                <div>
                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Promotions Completed</p>
                    <p class="text-3xl font-black text-orbit-black italic tracking-tighter">{{ stats?.completed_promotions || 0 }}</p>
                </div>
                <div class="p-3 bg-blue-50 rounded-sm">
                    <Trophy :size="24" class="text-orbit-blue" />
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="lg:col-span-7 bg-white p-6 rounded-sm border border-gray-300 shadow-sm">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="font-black text-orbit-black uppercase italic text-sm tracking-tight">Promotion Rank in Years</h2>
                    <TrendingUp :size="18" class="text-emerald-500" />
                </div>
                <apexchart type="bar" height="350" :options="rankOptions" :series="rankSeries" />
            </div>

            <div class="lg:col-span-5 bg-white p-6 rounded-sm border border-gray-300 shadow-sm">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="font-black text-orbit-black uppercase italic text-sm tracking-tight">Rate by Unit</h2>
                </div>
                <apexchart type="bar" height="350" :options="promoOptions" :series="promoSeries" />
            </div>
        </div>

        <div class="bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">
            <div class="p-5 md:p-8 border-b border-gray-200 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h2 class="text-orbit-black font-bold text-2xl md:text-3xl uppercase tracking-tighter italic">Promotion Registry</h2>
                    <p class="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Registry Access & Personnel Elevation Tracking</p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative flex-grow md:flex-grow-0">
                        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="18" :stroke-width="2.5" />
                        <input v-model="searchKeyword" type="text" placeholder="SEARCH STAFF..."
                            class="bg-gray-50 border-2 border-gray-200 pl-12 pr-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full md:w-64" />
                    </div>

                    <select v-model="selectedStatus" class="bg-white border-2 border-gray-200 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue cursor-pointer min-w-[150px]">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                    </select>

                    <button @click="fetchData" :disabled="loading" class="bg-orbit-blue text-white p-3 border-2 border-orbit-blue cursor-pointer hover:bg-orbit-blue hover:border-orbit-blue transition-colors">
                        <RefreshCcw :class="{'animate-spin': loading}" :size="20" :stroke-width="2.5" />
                    </button>
                </div>
            </div>

            <div class="w-full overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[1100px]">
                    <thead class="bg-gray-50 border-b-2 border-gray-200 text-orbit-black text-sm font-bold uppercase tracking-widest">
                        <tr>
                            <th class="py-6 px-8">Staff Personnel</th>
                            <th class="py-6 px-6 text-center">Unit</th>
                            <th class="py-6 px-6 text-center">Current Position</th>
                            <th class="py-6 px-6 text-center">Proposed Position</th>
                            <th class="py-6 px-6 text-center">Date Received</th>
                            <th class="py-6 px-6 text-center">Status</th>
                            <th class="py-6 px-8 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700 font-medium">
                        <template v-if="!loading && paginatedRequests.length > 0">
                            <tr v-for="row in paginatedRequests" :key="row.id" class="border-b border-gray-100 transition-colors hover:bg-gray-50/50">
                                <td class="py-6 px-8 font-bold text-orbit-black uppercase italic text-base">{{ row.staff_name }}</td>
                                <td class="py-6 px-6 text-center text-xs uppercase text-gray-500 font-bold">{{ row.unit_name }}</td>
                                <td class="py-6 px-6 text-center text-xs uppercase text-gray-500 font-bold">{{ row.current_rank }}</td>
                                <td class="py-6 px-6 text-center text-xs uppercase text-orbit-blue font-black italic">{{ row.proposed_rank }}</td>
                                <td class="py-6 px-6 text-center text-[11px] font-bold text-gray-400">
                                    <div class="flex items-center justify-center gap-2">
                                        <Calendar :size="14" /> {{ formatDate(row.date_created) }}
                                    </div>
                                </td>
                                <td class="py-6 px-6 text-center">
                                    <button :class="getStatusClass(row.status)" class="w-32 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-default">
                                        {{ row.status || 'Pending' }}
                                    </button>
                                </td>
                                <td class="py-6 px-8 text-right">
                                    <button @click.stop="openModal(row)"
                                        class="w-32 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest cursor-pointer inline-flex items-center justify-center gap-2 transition-transform active:scale-95 bg-orbit-blue/10 text-orbit-blue hover:bg-orbit-blue hover:text-white">
                                        <Eye :size="14" /> Review
                                    </button>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="7" class="py-32 text-center">
                                <div class="flex flex-col items-center opacity-40">
                                    <Inbox :size="48" class="mb-4" />
                                    <p class="font-bold uppercase text-xs italic">No Registry Records Found</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span class="text-[10px] font-bold uppercase text-gray-500 italic">Showing {{ paginatedRequests.length }} of {{ filteredRequests.length }} Entries</span>
                <div class="flex items-center space-x-4">
                    <button @click="currentPage--" :disabled="currentPage === 1" class="p-2 border-2 rounded-sm cursor-pointer disabled:opacity-20 hover:bg-white transition-colors">
                        <ChevronLeft :size="18" :stroke-width="3" />
                    </button>
                    <span class="text-xs font-bold uppercase italic">Page {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="currentPage++" :disabled="currentPage >= totalPages" class="p-2 border-2 rounded-sm cursor-pointer disabled:opacity-20 hover:bg-white transition-colors">
                        <ChevronRight :size="18" :stroke-width="3" />
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
    <div class="bg-white w-full max-w-3xl rounded-sm shadow-lg relative overflow-hidden flex flex-col max-h-[90vh]">

        <button @click="closeModal" class="absolute right-6 top-6 text-orbit-black z-20 hover:scale-110 transition-transform">
            <X :size="24" :stroke-width="3" />
        </button>

        <div class="border-b border-gray-200 px-8 py-6 bg-gray-50/50">
            <h2 class="text-xl font-bold text-orbit-black uppercase italic tracking-tight">Promotion Review</h2>
            <p class="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">
                {{ selectedRequest?.staff_id || 'ACD-015' }} ({{ selectedRequest?.staff_name }})
            </p>
        </div>

        <div class="px-8 py-6 flex-1 overflow-y-auto custom-scrollbar">

            <div v-if="currentStep === 1" class="animate-slide-up">
                <h3 class="text-sm font-black text-orbit-black uppercase tracking-[0.2em] mb-6 italic">01. Staff Information</h3>

                <div class="flex flex-col md:flex-row gap-8 items-start">
                    <div class="w-full md:w-48 h-48 bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden grayscale">
                        <img src="https://ui-avatars.com/api/?name=Staff&background=003366&color=fff&size=200" alt="Profile" class="w-full h-full object-cover">
                    </div>

                    <div class="flex-1 w-full space-y-4">
                        <p class="font-black text-orbit-blue text-sm mb-4">{{ selectedRequest?.file_no || 'ECF/ACA/0458' }}</p>

                        <div class="space-y-3">
                            <div v-for="(val, label) in {
                                'Full Name': selectedRequest?.staff_name,
                                'Department': selectedRequest?.unit_name,
                                'Current Rank': selectedRequest?.current_rank,
                                'Proposed Rank': selectedRequest?.proposed_rank,
                                'Year in Rank': '5 Years',
                                'Employment Date': '02 Oct 2002',
                                'Last Promotion': formatDate(selectedRequest?.date_created)
                            }" :key="label" class="flex items-center justify-between border-b border-gray-50 pb-2">
                                <p class="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{{ label }}</p>
                                <p class="text-sm font-black text-orbit-black italic uppercase">{{ val }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="currentStep === 2" class="animate-slide-up space-y-6">
                <div class="flex items-center justify-between mb-6">
                    <button @click="currentStep = 1" class="flex items-center gap-2 text-[10px] font-black uppercase text-orbit-blue hover:underline">
                        <ChevronLeft :size="14" /> Back
                    </button>
                    <h3 class="text-sm font-black text-orbit-black uppercase tracking-[0.2em] italic">02. Eligibility Validation</h3>
                </div>

                <div class="bg-gray-50 p-4 flex items-center justify-between border-l-4 border-orbit-black">
                    <p class="text-xs font-bold text-gray-400 uppercase">Total Appraisals Recorded</p>
                    <p class="text-xl font-black text-orbit-black italic">8</p>
                </div>

                <div class="space-y-4">
                    <div v-for="metric in [
                        { label: 'Minimum Years in Current Rank', val: '3 Years' },
                        { label: 'Appraisal Score', val: '87%' },
                        { label: 'Disciplinary Record', val: 'CLEAN' }
                    ]" :key="metric.label" class="flex items-center justify-between py-2 border-b border-gray-100">
                        <div class="flex items-center space-x-3">
                            <div class="w-1 h-6 bg-orbit-blue"></div>
                            <h4 class="text-xs font-bold text-orbit-black uppercase italic">{{ metric.label }}</h4>
                        </div>
                        <p class="text-xs font-black text-gray-500 uppercase">{{ metric.val }}</p>
                    </div>

                    <div class="mt-8">
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">HOD Internal Remarks</p>
                        <div class="w-full p-6 bg-blue-50/50 border border-blue-100 text-xs font-medium italic text-orbit-black">
                            "Staff demonstrates exceptional technical leadership. Taking annual rest as per HR schedule but maintains remote oversight."
                        </div>
                    </div>

                    <div class="pt-6 space-y-4">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h2 class="font-black text-sm uppercase italic text-orbit-black">Final Division Decision</h2>
                            <select class="w-full md:w-64 bg-white border-2 border-gray-200 p-4 text-xs font-black uppercase outline-none focus:border-orbit-blue cursor-pointer">
                                <option value="approve">Approve Promotion</option>
                                <option value="decline">Decline Request</option>
                                <option value="pending">Hold for Review</option>
                            </select>
                        </div>
                        <div class="bg-gray-50 p-4 border border-gray-200">
                            <input type="text" class="w-full bg-transparent outline-none text-xs font-bold uppercase placeholder:text-gray-300 italic"
                                placeholder="ENTER DIVISION HEAD COMMENT HERE...">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 border-t border-gray-200 bg-white">
            <button @click="saveDraft"
                class="px-4 py-4 border-2 border-orbit-blue text-orbit-blue font-black uppercase text-[11px] tracking-widest hover:bg-orbit-blue/5 transition-all">
                Save as Draft
            </button>
            <button @click="handleNext"
                class="px-4 py-4 bg-orbit-blue text-white font-black uppercase text-[11px] tracking-widest hover:bg-orbit-black transition-all shadow-lg shadow-orbit-blue/20">
                {{ currentStep === 2 ? 'Finalize & Confirm' : 'Next Step' }}
            </button>
        </div>
    </div>
</div>

    </div>
</template>

<script setup>
import {
    getDivisionPromotionStats,
    getDivisionStaffPromotionRequests
} from "@/apis/management/divisionHead.js";
import dayjs from 'dayjs';
import {
    Calendar,
    CheckCircle2,
    ChevronLeft, ChevronRight,
    Clock,
    Eye,
    FileCheck,
    Inbox, RefreshCcw, Search,
    Star,
    TrendingUp, Trophy,
    X,
    XCircle
} from 'lucide-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

const loading = ref(false);
const stats = ref(null);
const requests = ref([]);
const searchKeyword = ref('');
const selectedStatus = ref('');
const currentPage = ref(1);
const perPage = ref(5);

// Modal State
const showModal = ref(false);
const currentStep = ref(1);
const selectedRequest = ref(null);
const finalScore = ref(4.5);
const steps = [
    { id: 1, label: 'Eligibility' },
    { id: 2, label: 'Observations' },
    { id: 3, label: 'Finalizing' }
];

// --- Logic ---
const fetchData = async () => {
    loading.value = true;
    try {
        const divisionId = 1;
        const [promoRes, listRes] = await Promise.allSettled([
            getDivisionPromotionStats(divisionId),
            getDivisionStaffPromotionRequests(divisionId)
        ]);

        if (promoRes.status === 'fulfilled') {
            stats.value = promoRes.value.data?.summary;
            rankSeries.value[0].data = promoRes.value.data?.rank_data || [3, 2, 4, 1, 5, 2];
            promoSeries.value[0].data = promoRes.value.data?.promo_count_data || [12, 19, 3, 5, 2, 3];
        }
        if (listRes.status === 'fulfilled') {
            requests.value = listRes.value.data?.results || [];
        }
    } finally {
        loading.value = false;
    }
};

const filteredRequests = computed(() => {
    return requests.value.filter(req => {
        const matchesSearch = req.staff_name?.toLowerCase().includes(searchKeyword.value.toLowerCase());
        const matchesStatus = !selectedStatus.value || req.status?.toLowerCase() === selectedStatus.value.toLowerCase();
        return matchesSearch && matchesStatus;
    });
});

const totalPages = computed(() => Math.ceil(filteredRequests.value.length / perPage.value) || 1);
const paginatedRequests = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredRequests.value.slice(start, start + perPage.value);
});

const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved' || s === 'completed') return 'bg-orbit-green-bg text-orbit-green';
    if (s === 'declined' || s === 'rejected') return 'bg-orbit-red/10 text-orbit-red';
    return 'bg-amber-100 text-amber-600';
};

const formatDate = (date) => date ? dayjs(date).format('DD MMM YYYY') : 'N/A';

const openModal = (req) => {
    selectedRequest.value = req;
    currentStep.value = 1;
    showModal.value = true;
};

const closeModal = () => { showModal.value = false; };
const handleNext = () => {
    if (currentStep.value < 3) currentStep.value++;
    else closeModal();
};

onMounted(fetchData);

// --- Chart Data ---
const rankSeries = ref([{ name: "Rank", data: [] }]);
const promoSeries = ref([{ name: "Count", data: [] }]);
const rankOptions = reactive({ chart: { toolbar: {show: false} }, colors: ['#2388ff'], plotOptions: { bar: { horizontal: true, borderRadius: 4 } }, xaxis: { categories: ['Admin', 'ICT', 'Proc', 'Sec', 'Maint', 'Rec'] } });
const promoOptions = reactive({ chart: { toolbar: {show: false} }, colors: ['#1a1a1a'], plotOptions: { bar: { borderRadius: 4 } }, xaxis: { categories: ['Admin', 'ICT', 'Proc', 'Sec', 'Maint', 'Rec'] } });
</script>

<style scoped>


.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2388ff; }

.animate-slide-up { animation: slideUp 0.4s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>