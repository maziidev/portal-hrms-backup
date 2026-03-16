<script setup>
/**
 * Component: DepartmentAppraisalsTable.vue
 * Description: Divisional oversight table for monitoring department-level progress.
 */
import { getDivisionHeadStats } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import { Calendar, LayoutGrid, RefreshCcw, Search, X } from 'lucide-vue-next';
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const { divisionId } = storeToRefs(authStore);

// --- State ---
const appraisalData = ref([]);
const loading = ref(false);
const searchKeyword = ref('');
const selectedStatus = ref('');
const selectedDate = ref('');
const dateInputRef = ref(null);

const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'active' },
    { label: 'Completed', value: 'completed' }
];

// --- Actions ---
const openDatePicker = () => {
    if (dateInputRef.value) {
        dateInputRef.value.showPicker ? dateInputRef.value.showPicker() : dateInputRef.value.focus();
    }
};

const fetchAppraisals = async () => {
    if (!divisionId.value) return;
    loading.value = true;
    try {
        const res = await getDivisionHeadStats(divisionId.value);
        // Mapping data from the API response
        appraisalData.value = res.data?.department_appraisals || [];
    } catch (err) {
        console.error("Failed to load department appraisals", err);
    } finally {
        loading.value = false;
    }
};


const handleRowClick = (unitId) => {
    authStore.setCurrentUnit(unitId);
    router.push({ name: 'DepartmentAppraisalDetails', params: { id: unitId } });
};

// --- Logic ---
const filteredData = computed(() => {
    return appraisalData.value.filter(item => {
        const matchesSearch = item.unit_name?.toLowerCase().includes(searchKeyword.value.toLowerCase());
        const matchesStatus = !selectedStatus.value || item.status?.toLowerCase() === selectedStatus.value.toLowerCase();

        let matchesDate = true;
        if (selectedDate.value) {
            const rowDate = item.last_updated ? new Date(item.last_updated).toISOString().split('T')[0] : null;
            matchesDate = rowDate === selectedDate.value;
        }
        return matchesSearch && matchesStatus && matchesDate;
    });
});

onMounted(fetchAppraisals);
</script>

<template>
    <div class="mt-8 bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">
        <div class="p-5 md:p-8 border-b border-gray-200 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div>
                <h2 class="text-orbit-black font-black text-2xl md:text-3xl uppercase tracking-tighter italic leading-tight">
                    Departments' Appraisals
                </h2>
                <p class="text-[12px] font-bold text-gray-500 uppercase tracking-[0.15em] mt-1">
                    Divisional Oversight & Performance Registry
                </p>
            </div>

            <div class="flex flex-wrap items-center gap-4">
                <div class="relative flex-grow lg:flex-grow-0">
                    <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="18" :stroke-width="3" />
                    <input v-model="searchKeyword" type="text" placeholder="SEARCH UNIT..."
                        class="bg-gray-50 border-2 border-gray-200 pl-12 pr-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full lg:w-64" />
                </div>

                <div @click="openDatePicker" class="relative flex items-center flex-grow lg:flex-grow-0 cursor-pointer">
                    <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" :size="18" :stroke-width="3" />
                    <input ref="dateInputRef" v-model="selectedDate" type="date"
                        class="bg-white border-2 border-gray-200 pl-12 pr-10 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full min-w-[200px] cursor-pointer" />
                    <button v-if="selectedDate" @click.stop="selectedDate = ''" class="absolute right-3 text-gray-400 p-1">
                        <X :size="16" :stroke-width="3" />
                    </button>
                </div>

                <select v-model="selectedStatus" class="bg-white border-2 border-gray-200 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue cursor-pointer min-w-[150px]">
                    <option value="">All Status</option>
                    <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>

                <button @click="fetchAppraisals" :disabled="loading"
                    class="bg-orbit-black text-white p-3 border-2 border-orbit-black hover:bg-orbit-blue hover:border-orbit-blue transition-all disabled:opacity-50">
                    <RefreshCcw :class="{'animate-spin': loading}" :size="20" :stroke-width="3" />
                </button>
            </div>
        </div>

        <div class="w-full overflow-x-auto custom-scrollbar">
            <table class="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                    <tr class="bg-gray-50 border-b-2 border-gray-200 text-orbit-black text-[12px] font-black uppercase tracking-widest">
                        <th class="py-6 px-8">Unit / Department</th>
                        <th class="py-6 px-6 text-center">Total Staff</th>
                        <th class="py-6 px-6 text-center">Submitted</th>
                        <th class="py-6 px-6 text-center">Pending</th>
                        <th class="py-6 px-6 text-center">Completed</th>
                        <th class="py-6 px-6 text-center">Last Updated</th>
                        <th class="py-6 px-8 text-right">Status</th>
                    </tr>
                </thead>

                <tbody class="text-gray-700 font-medium">
                    <tr v-if="loading">
                        <td colspan="7" class="py-40 text-center">
                            <div class="flex flex-col items-center justify-center space-y-4">
                                <Loader2 class="animate-spin text-orbit-blue" :size="48" />
                                <span class="text-xs font-black uppercase tracking-[0.5em] text-orbit-blue italic">Syncing Registry...</span>
                            </div>
                        </td>
                    </tr>

                    <template v-else-if="filteredData.length > 0">
                        <tr v-for="(row, index) in filteredData" :key="index"
                            @click="handleRowClick(row.id || row.unit_id)"
                            class="border-b border-gray-100 last:border-0 even:bg-gray-50/50 hover:bg-orbit-blue/5 cursor-pointer transition-colors group"
                        >
                            <td class="py-6 px-8">
                                <span class="text-orbit-black font-black text-base italic tracking-tight uppercase group-hover:text-orbit-blue transition-colors">
                                    {{ row.unit_name }}
                                </span>
                            </td>
                            <td class="py-6 px-6 text-center font-bold text-sm">{{ row.total_staff || 0 }}</td>
                            <td class="py-6 px-6 text-center text-green-600 font-black text-sm italic">{{ row.submitted_count || 0 }}</td>
                            <td class="py-6 px-6 text-center text-orange-500 font-black text-sm italic">{{ row.pending_count || 0 }}</td>
                            <td class="py-6 px-6 text-center text-orbit-blue font-black text-sm italic">{{ row.completed_count || 0 }}</td>

                            <td class="py-6 px-6 text-center font-bold text-[11px] uppercase text-gray-400 italic">
                                {{ row.last_updated || 'No Activity' }}
                            </td>

                            <td class="py-6 px-8 text-right">
                                <span :class="{
                                    'bg-orange-500/10 text-orange-500': row.status?.toLowerCase() === 'pending',
                                    'bg-orbit-blue/10 text-orbit-blue': ['active', 'in progress'].includes(row.status?.toLowerCase()),
                                    'bg-green-600/10 text-green-600': row.status?.toLowerCase() === 'completed'
                                }" class="inline-block px-5 py-2 text-[10px] font-black uppercase tracking-widest italic rounded-full min-w-[120px] text-center">
                                    {{ row.status || 'Unknown' }}
                                </span>
                            </td>
                        </tr>
                    </template>

                    <tr v-else>
                        <td colspan="7" class="py-32 text-center bg-gray-50/20">
                            <div class="flex flex-col items-center justify-center opacity-40">
                                <LayoutGrid :size="48" class="mb-4" />
                                <p class="text-gray-600 font-black uppercase text-xs tracking-[0.2em] italic">
                                    Registry clear: No matching records found.
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>