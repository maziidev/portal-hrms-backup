<script setup>
/**
 * Component: DivisionAppraisalTable.vue
 * Description: Refined registry with pill buttons, tinted backgrounds, and high-visibility typography.
 */
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Eye,
    Inbox,
    PlayCircle,
    RefreshCcw,
    Search,
    X
} from 'lucide-vue-next';
import { computed, ref } from 'vue';

// State
const loading = ref(false);
const searchKeyword = ref('');
const selectedStatus = ref('');
const selectedDate = ref('');
const dateInputRef = ref(null);

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
]);

const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Closed', value: 'closed' }
];

// Logic
const filteredData = computed(() => {
    return staffAppraisals.value.filter(item => {
        const matchesSearch = item.name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
                             item.position?.toLowerCase().includes(searchKeyword.value.toLowerCase());
        const matchesStatus = !selectedStatus.value || item.status?.toLowerCase() === selectedStatus.value.toLowerCase();
        let matchesDate = !selectedDate.value || item.last_updated === selectedDate.value;
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
                    <h2 class="text-orbit-bg font-bold text-2xl md:text-3xl uppercase tracking-tighter italic">
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

                    <div @click="openDatePicker" class="relative flex items-center flex-grow md:flex-grow-0 cursor-pointer group">
                        <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="18" :stroke-width="2.5" />
                        <input ref="dateInputRef" v-model="selectedDate" type="date"
                            class="bg-white border-2 border-gray-200 pl-12 pr-10 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full md:min-w-[200px] cursor-pointer" />
                        <button v-if="selectedDate" @click.stop="selectedDate = ''" class="absolute right-3 text-gray-400 hover:text-red-600 p-1 cursor-pointer">
                            <X :size="16" :stroke-width="2.5" />
                        </button>
                    </div>

                    <select v-model="selectedStatus" class="bg-white border-2 border-gray-200 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue cursor-pointer min-w-[150px]">
                        <option value="">All Status</option>
                        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>

                    <button @click="refreshRegistry" :disabled="loading"
                        class="bg-orbit-bg text-white p-3 border-2 border-orbit-bg hover:bg-orbit-blue hover:border-orbit-blue transition-all cursor-pointer disabled:opacity-50">
                        <RefreshCcw :class="{'animate-spin': loading}" :size="20" :stroke-width="2.5" />
                    </button>
                </div>
            </div>

            <div class="w-full overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[1100px]">
                    <thead class="bg-gray-50 border-b-2 border-gray-200 text-orbit-bg text-sm font-bold uppercase tracking-widest">
                        <tr>
                            <th class="py-6 px-8">Staff Personnel</th>
                            <th class="py-6 px-6 text-center">Position</th>
                            <th class="py-6 px-6 text-center">Period</th>
                            <th class="py-6 px-6 text-center">Completion</th>
                            <th class="py-6 px-6 text-center">Last Updated</th>
                            <th class="py-6 px-6 text-center">Status</th>
                            <th class="py-6 px-8 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700 font-medium">
                        <template v-if="!loading && paginatedData.length > 0">
                            <tr v-for="row in paginatedData" :key="row.id" class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                <td class="py-6 px-8 font-bold text-orbit-bg uppercase italic text-base">{{ row.name }}</td>
                                <td class="py-6 px-6 text-center text-xs uppercase text-gray-500 font-bold">{{ row.position }}</td>
                                <td class="py-6 px-6 text-center text-xs font-bold uppercase">
                                    <div class="flex items-center justify-center gap-2">
                                        <Calendar :size="14" class="text-gray-400" /> {{ row.period }}
                                    </div>
                                </td>
                                <td class="py-6 px-6 text-center text-orbit-blue font-bold text-sm italic">{{ row.progress }}</td>
                                <td class="py-6 px-6 text-center text-[11px] font-bold text-gray-400">{{ row.last_updated }}</td>

                                <td class="py-6 px-6 text-center">
                                    <button :class="{
                                        'bg-orbit-red/10 text-orbit-red': row.status.toLowerCase() === 'pending',
                                        'bg-orbit-blue/10 text-orbit-blue': row.status.toLowerCase() === 'ongoing',
                                        'bg-orbit-bg/10 text-orbit-bg': row.status.toLowerCase() === 'closed'
                                    }" class="w-32 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-default">
                                        {{ row.status }}
                                    </button>
                                </td>

                                <td class="py-6 px-8 text-right">
                                    <button @click.stop="$emit('openModal', row)"
                                        class="w-32 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                                        :class="row.status.toLowerCase() === 'pending'
                                            ? 'bg-green-600/10 text-green-600 hover:bg-green-600 hover:text-white'
                                            : 'bg-orbit-blue/10 text-orbit-blue hover:bg-orbit-blue hover:text-white'">
                                        <component :is="row.status.toLowerCase() === 'pending' ? PlayCircle : Eye" :size="14" />
                                        {{ row.status.toLowerCase() === 'pending' ? 'Start' : 'Review' }}
                                    </button>
                                </td>
                            </tr>
                        </template>

                        <tr v-else>
                            <td colspan="7" class="py-32 text-center">
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
                    <button @click="prevPage" :disabled="currentPage === 1" class="p-2 border-2 rounded-sm cursor-pointer disabled:opacity-20 transition-colors hover:bg-orbit-bg hover:text-white">
                        <ChevronLeft :size="18" :stroke-width="3" />
                    </button>
                    <span class="text-xs font-bold uppercase italic">Page {{ currentPage }} of {{ totalPages || 1 }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0" class="p-2 border-2 rounded-sm cursor-pointer disabled:opacity-20 transition-colors hover:bg-orbit-bg hover:text-white">
                        <ChevronRight :size="18" :stroke-width="3" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-orbit-bg { color: #1a1a1a; }
.text-orbit-blue { color: #2388ff; }
.text-orbit-red { color: #ff3b3b; }
.bg-orbit-bg { background-color: #1a1a1a; }
.bg-orbit-blue { background-color: #2388ff; }
.bg-orbit-red { background-color: #ff3b3b; }

/* Table Scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
    height: 8px;
    background: #f8fafc;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #2388ff;
}
</style>