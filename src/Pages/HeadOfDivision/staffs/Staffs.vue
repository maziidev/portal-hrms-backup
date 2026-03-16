<script setup>
/**
 * Component: DepartmentsOverviewTable.vue
 * Description: High-level overview of departments within a division with filtering and PDF export.
 */
import { getDivisionHeadStats } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    Briefcase,
    Download,
    GraduationCap,
    LayoutGrid,
    Loader2,
    RefreshCcw,
    Search,
    Users
} from 'lucide-vue-next';
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const { divisionId } = storeToRefs(authStore);

// --- State ---
const departmentData = ref([]);
const loading = ref(false);
const searchKeyword = ref('');
const selectedLeaveType = ref('');
const selectedStatus = ref('');

// --- Filter Options ---
const leaveTypeOptions = ['Annual', 'Sick', 'Maternity', 'Study', 'Casual'];
const statusOptions = ['Active', 'Pending', 'Completed'];

// --- Actions ---
const fetchStats = async () => {
    if (!divisionId.value) return;
    loading.value = true;
    try {
        const res = await getDivisionHeadStats(divisionId.value);
        departmentData.value = res.data?.department_summaries || [];
    } catch (err) {
        console.error("Failed to fetch department overview:", err);
    } finally {
        loading.value = false;
    }
};

const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Unit Name", "HOU", "Staff", "Academic", "Non-Academic", "Avg Score", "On Leave"];
    const tableRows = [];

    filteredDepartments.value.forEach(dept => {
        const rowData = [
            dept.unit_name,
            dept.hou_name || 'N/A',
            dept.staff_count,
            dept.academic_count,
            dept.non_academic_count,
            `${dept.avg_score}%`,
            dept.on_leave_count
        ];
        tableRows.push(rowData);
    });

    doc.text("Departments Performance Summary", 14, 15);
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 0] }
    });
    doc.save(`Departments_Summary_${new Date().toLocaleDateString()}.pdf`);
};


const handleRowClick = (unitId) => {
    if (!unitId) return;

    // 1. Sync the unit context in Pinia
    authStore.setCurrentUnit(unitId);

    // 2. Navigate using the name 'StaffSubunit' as defined in your router
    router.push({
        name: 'StaffSubunit',
        params: { id: unitId }
    });
};

// --- Combined Logic ---
const filteredDepartments = computed(() => {
    return departmentData.value.filter(item => {
        const matchesSearch = !searchKeyword.value ||
            item.unit_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
            item.hou_name?.toLowerCase().includes(searchKeyword.value.toLowerCase());

        const matchesLeave = !selectedLeaveType.value || item.leave_type === selectedLeaveType.value;
        const matchesStatus = !selectedStatus.value || item.status === selectedStatus.value;

        return matchesSearch && matchesLeave && matchesStatus;
    });
});

onMounted(fetchStats);
</script>

<template>
    <div class="px-4 py-8 lg:px-8 mx-auto">
        <div class="bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">

            <div class="p-5 md:p-8 border-b border-gray-200 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <h2 class="text-orbit-black font-black text-2xl md:text-3xl uppercase tracking-tighter italic leading-tight">
                        Departments Overview
                    </h2>
                    <p class="text-[12px] font-bold text-gray-500 uppercase tracking-[0.15em] mt-1">
                        Division-Wide Performance Registry
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative flex-grow lg:flex-grow-0">
                        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="18" :stroke-width="3" />
                        <input
                            v-model="searchKeyword"
                            type="text"
                            placeholder="SEARCH UNIT..."
                            class="bg-gray-50 border-2 border-gray-200 pl-12 pr-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue w-full lg:w-64"
                        />
                    </div>

                    <select v-model="selectedLeaveType" class="bg-white border-2 border-gray-200 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue cursor-pointer min-w-[160px]">
                        <option value="">All Leave Types</option>
                        <option v-for="opt in leaveTypeOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>

                    <select v-model="selectedStatus" class="bg-white border-2 border-gray-200 px-4 py-3 text-sm font-bold uppercase outline-none focus:border-orbit-blue cursor-pointer min-w-[150px]">
                        <option value="">All Status</option>
                        <option v-for="opt in statusOptions" :key="opt" :value="opt">{{ opt }}</option>
                    </select>

                    <button @click="fetchStats" :disabled="loading"
                        class="bg-orbit-black text-white p-3 border-2 border-orbit-black hover:bg-orbit-blue hover:border-orbit-blue transition-all disabled:opacity-50">
                        <RefreshCcw :class="{'animate-spin': loading}" :size="20" :stroke-width="3" />
                    </button>
                </div>
            </div>

            <div class="w-full overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                        <tr class="bg-gray-50 border-b-2 border-gray-200 text-orbit-black text-[12px] font-black uppercase tracking-widest">
                            <th class="py-6 px-8">Unit Name</th>
                            <th class="py-6 px-6">Head of Unit (HOU)</th>
                            <th class="py-6 px-4 text-center">Staff Count</th>
                            <th class="py-6 px-4 text-center">Academic</th>
                            <th class="py-6 px-4 text-center">Non-Academic</th>
                            <th class="py-6 px-4 text-center">Avg. Score</th>
                            <th class="py-6 px-8 text-right">On Leave</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700 font-medium">
                        <tr v-if="loading">
                            <td colspan="7" class="py-40 text-center">
                                <div class="flex flex-col items-center space-y-4">
                                    <Loader2 class="animate-spin text-orbit-blue" :size="48" />
                                    <span class="text-xs font-black uppercase tracking-[0.5em] text-orbit-blue italic">Syncing Data...</span>
                                </div>
                            </td>
                        </tr>

                        <template v-else-if="filteredDepartments.length > 0">
                            <tr v-for="(dept, index) in filteredDepartments" :key="index"
                                @click="handleRowClick(dept.unit_id || dept.id)"
                                class="border-b border-gray-100 hover:bg-orbit-blue/5 cursor-pointer transition-all group"
                            >
                                <td class="py-6 px-8">
                                    <span class="text-orbit-black font-black text-base italic tracking-tight uppercase group-hover:text-orbit-blue transition-colors">
                                        {{ dept.unit_name }}
                                    </span>
                                </td>
                                <td class="py-6 px-6">
                                    <span class="font-bold text-sm uppercase text-gray-600">{{ dept.hou_name || 'Unassigned' }}</span>
                                </td>
                                <td class="py-6 px-4 text-center font-bold text-sm">
                                    <div class="inline-flex items-center gap-2"><Users :size="14"/> {{ dept.staff_count || 0 }}</div>
                                </td>
                                <td class="py-6 px-4 text-center text-gray-500 font-bold"><GraduationCap :size="14" class="inline mr-1"/> {{ dept.academic_count || 0 }}</td>
                                <td class="py-6 px-4 text-center text-gray-500 font-bold"><Briefcase :size="14" class="inline mr-1"/> {{ dept.non_academic_count || 0 }}</td>
                                <td class="py-6 px-4 text-center font-black text-orbit-blue italic text-lg">{{ dept.avg_score || 0 }}%</td>
                                <td class="py-6 px-8 text-right font-black uppercase text-[11px] text-gray-400">
                                    {{ dept.on_leave_count || 0 }} Members
                                </td>
                            </tr>
                        </template>

                        <tr v-else>
                            <td colspan="7" class="py-32 text-center">
                                <div class="flex flex-col items-center opacity-40">
                                    <LayoutGrid :size="48" class="mb-4" />
                                    <p class="font-black uppercase text-xs tracking-widest">No matching records found</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-6 bg-gray-50 border-t border-gray-200">
                <button
                    @click="exportToPDF"
                    class=" text-white px-8 py-4 flex items-center space-x-3 rounded-sm font-black uppercase text-xs tracking-widest bg-orbit-blue transition-all group"
                >
                    <Download :size="18" class="group-hover:translate-y-1 transition-transform" />
                    <span>Export Summary (PDF)</span>
                </button>
            </div>
        </div>
    </div>
</template>