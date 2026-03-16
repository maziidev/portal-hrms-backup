<script setup>
/**
 * Component: StaffSubunit.vue
 * Description: Detailed view of a specific unit's staff directory and metrics.
 */
import { getDivisionHeadStats } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    AlertCircle,
    Calendar,
    Download,
    Loader2,
    RefreshCcw,
    Search,
    TrendingUp,
    UserCheck,
    Users
} from 'lucide-vue-next';
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const { divisionId } = storeToRefs(authStore);

// --- State ---
const staffList = ref([]);
const metrics = ref({
    total_staff: 0,
    on_leave: 0,
    due_appraisal: 0,
    pending_promotions: 0
});
const loading = ref(false);
const searchKeyword = ref('');
const selectedCategory = ref('');
const selectedRole = ref('');

// --- API Logic ---
const fetchData = async () => {
    const id = route.params.id || divisionId.value;
    if (!id) return;
    loading.value = true;
    try {
        const res = await getDivisionHeadStats(id);
        staffList.value = res.data?.staff_directory || [];
        metrics.value = res.data?.subunit_metrics || {
            total_staff: res.data?.total_staff_count || 0,
            on_leave: res.data?.on_leave_count || 0,
            due_appraisal: res.data?.due_appraisal_count || 0,
            pending_promotions: res.data?.pending_promotions_count || 0
        };
    } catch (err) {
        console.error("Failed to fetch subunit data", err);
    } finally {
        loading.value = false;
    }
};

// --- Actions ---
const handleStaffClick = (staffId) => {
    router.push({ name: 'StaffDetails', params: { id: staffId } });
};

const exportStaffList = () => {
    const doc = new jsPDF();
    const tableColumn = ["Staff ID", "Name", "Role", "Rank", "Employment Type", "Last Appraised"];
    const tableRows = filteredStaff.value.map(staff => [
        staff.staff_id,
        staff.full_name,
        staff.role,
        staff.rank,
        staff.employment_type,
        staff.last_appraised || 'N/A'
    ]);

    doc.text(`Staff Directory - ${new Date().toLocaleDateString()}`, 14, 15);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20, theme: 'grid' });
    doc.save(`Staff_Directory_${route.params.id}.pdf`);
};

// --- Filters ---
const filteredStaff = computed(() => {
    return staffList.value.filter(staff => {
        const matchesSearch = !searchKeyword.value ||
            staff.full_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
            staff.staff_id?.toLowerCase().includes(searchKeyword.value.toLowerCase());
        const matchesCategory = !selectedCategory.value || staff.employment_type === selectedCategory.value;
        return matchesSearch && matchesCategory;
    });
});

onMounted(fetchData);
</script>

<template>
    <div class="px-4 py-8 lg:px-10 mx-auto space-y-8">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-orbit-black p-8 rounded-2xl shadow-xl flex items-center justify-between group">
                <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Staff</p>
                    <p class="text-4xl font-black text-white italic leading-none">{{ metrics.total_staff }}</p>
                </div>
                <Users class="text-orbit-blue opacity-50 group-hover:opacity-100 transition-opacity" :size="40" />
            </div>

            <div class="bg-white border-2 border-gray-100 p-8 rounded-2xl shadow-sm flex items-center justify-between">
                <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">On Leave</p>
                    <p class="text-4xl font-black text-orbit-black italic leading-none">{{ metrics.on_leave }}</p>
                </div>
                <div class="p-3 bg-orange-50 text-orange-500 rounded-full"><TrendingUp :size="24" /></div>
            </div>

            <div class="bg-white border-2 border-gray-100 p-8 rounded-2xl shadow-sm flex items-center justify-between">
                <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Due Appraisal</p>
                    <p class="text-4xl font-black text-orbit-blue italic leading-none">{{ metrics.due_appraisal }}</p>
                </div>
                <div class="p-3 bg-blue-50 text-orbit-blue rounded-full"><UserCheck :size="24" /></div>
            </div>

            <div class="bg-white border-2 border-gray-100 p-8 rounded-2xl shadow-sm flex items-center justify-between">
                <div class="space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Pending Prom.</p>
                    <p class="text-4xl font-black text-red-600 italic leading-none">{{ metrics.pending_promotions }}</p>
                </div>
                <div class="p-3 bg-red-50 text-red-600 rounded-full"><AlertCircle :size="24" /></div>
            </div>
        </div>

        <div class="bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">
            <div class="p-6 md:p-8 border-b border-gray-200 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h2 class="text-orbit-black font-black text-2xl md:text-3xl uppercase tracking-tighter italic leading-tight">
                        Staff Directory
                    </h2>
                    <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subunit Personnel Registry</p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative flex-grow lg:flex-grow-0">
                        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="18" :stroke-width="3" />
                        <input v-model="searchKeyword" type="text" placeholder="SEARCH NAME OR ID..."
                            class="bg-gray-50 border-2 border-gray-200 pl-12 pr-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full lg:w-64" />
                    </div>

                    <button @click="exportStaffList" class="flex items-center gap-3 bg-white border-2 border-orbit-blue text-orbit-blue px-6 py-3 text-[11px] font-black uppercase tracking-widest hover:bg-orbit-blue hover:text-white transition-all">
                        <Download :size="18" />
                        Export Staff List
                    </button>

                    <button @click="fetchData" class="bg-orbit-black text-white p-3 hover:bg-orbit-blue transition-colors">
                        <RefreshCcw :class="{'animate-spin': loading}" :size="20" />
                    </button>
                </div>
            </div>

            <div class="w-full overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                        <tr class="bg-gray-50 border-b-2 border-gray-200 text-orbit-black text-[11px] font-black uppercase tracking-widest">
                            <th class="py-6 px-8">Staff ID</th>
                            <th class="py-6 px-6">Name</th>
                            <th class="py-6 px-6">Role</th>
                            <th class="py-6 px-6 text-center">Rank</th>
                            <th class="py-6 px-6 text-center">Employment</th>
                            <th class="py-6 px-8 text-right">Last Appraised</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700 font-medium">
                        <tr v-if="loading">
                            <td colspan="6" class="py-40 text-center">
                                <div class="flex flex-col items-center space-y-4">
                                    <Loader2 class="animate-spin text-orbit-blue" :size="40" />
                                    <span class="text-xs font-black uppercase tracking-widest text-orbit-blue italic">Retrieving Subunit Data...</span>
                                </div>
                            </td>
                        </tr>

                        <template v-else-if="filteredStaff.length > 0">
                            <tr v-for="(staff, index) in filteredStaff" :key="index"
                                @click="handleStaffClick(staff.staff_id || staff.id)"
                                class="border-b border-gray-100 hover:bg-orbit-blue/5 cursor-pointer transition-colors group"
                            >
                                <td class="py-6 px-8 font-black text-orbit-blue text-xs tracking-tighter">{{ staff.staff_id }}</td>
                                <td class="py-6 px-6">
                                    <span class="text-orbit-black font-black text-base italic uppercase group-hover:text-orbit-blue transition-colors">
                                        {{ staff.full_name }}
                                    </span>
                                </td>
                                <td class="py-6 px-6 font-bold text-sm text-gray-500 uppercase">{{ staff.role || 'Officer' }}</td>
                                <td class="py-6 px-6 text-center font-black text-sm italic">{{ staff.rank || 'GL --' }}</td>
                                <td class="py-6 px-6 text-center">
                                    <span :class="staff.employment_type === 'Academic' ? 'bg-blue-50 text-orbit-blue' : 'bg-gray-100 text-gray-500'"
                                          class="px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
                                        {{ staff.employment_type }}
                                    </span>
                                </td>
                                <td class="py-6 px-8 text-right">
                                    <div class="flex items-center justify-end gap-2 text-gray-400 font-bold text-xs uppercase italic">
                                        <Calendar :size="14" />
                                        {{ staff.last_appraised || 'Pending' }}
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <tr v-else>
                            <td colspan="6" class="py-32 text-center">
                                <div class="flex flex-col items-center opacity-40">
                                    <Users :size="48" class="mb-4 text-gray-300" />
                                    <p class="font-black uppercase text-xs tracking-widest italic text-gray-400">No matching staff records found</p>
                                    <button v-if="searchKeyword" @click="searchKeyword = ''" class="mt-4 text-orbit-blue text-[10px] font-black uppercase underline tracking-widest">
                                        Clear Search
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>