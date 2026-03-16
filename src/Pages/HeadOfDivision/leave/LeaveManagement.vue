<template>
    <div class="p-6 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-orbit-bg px-6 py-8 flex items-center justify-between rounded-2xl text-white shadow-xl transition-all duration-300">
                <div>
                    <p class="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Pending Leave Request</p>
                    <p class="text-3xl font-black">{{ stats?.pending_requests || 0 }}</p>
                </div>
                <div class="p-3 bg-white/10 rounded-xl">
                    <Clock :size="28" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl border border-slate-100 shadow-sm transition-all duration-300">
                <div>
                    <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Approved This Month</p>
                    <p class="text-3xl font-black text-orbit-bg">{{ stats?.approved_this_month || 0 }}</p>
                </div>
                <div class="p-3 bg-emerald-50 rounded-xl">
                    <FileCheck :size="28" class="text-emerald-600" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl border border-slate-100 shadow-sm transition-all duration-300">
                <div>
                    <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Rejected Application</p>
                    <p class="text-3xl font-black text-orbit-bg">{{ stats?.rejected_applications || 0 }}</p>
                </div>
                <div class="p-3 bg-rose-50 rounded-xl">
                    <XCircle :size="28" class="text-rose-600" />
                </div>
            </div>

            <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl border border-slate-100 shadow-sm transition-all duration-300">
                <div>
                    <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Upcoming Leave Dates</p>
                    <p class="text-3xl font-black text-orbit-bg">{{ stats?.upcoming_leaves || 0 }}</p>
                </div>
                <div class="p-3 bg-blue-50 rounded-xl">
                    <Calendar :size="28" class="text-blue-600" />
                </div>
            </div>
        </div>

        <div class="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div class="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="font-bold text-3xl text-orbit-bg italic uppercase tracking-tighter shrink-0">Leave Registry</div>

                <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div class="relative w-full sm:w-64 lg:w-72">
                        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="16" />
                        <input v-model="filters.search" type="search" placeholder="Search staff..."
                            class="bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orbit-blue/20 w-full transition-all" />
                    </div>

                    <div class="flex items-center gap-3 w-full sm:w-auto">
                        <select v-model="filters.type" class="orbit-select flex-grow sm:w-32 lg:w-40">
                            <option :value="null">Leave Type</option>
                            <option v-for="opt in leaveTypeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                        </select>

                        <select v-model="filters.status" class="orbit-select flex-grow sm:w-32 lg:w-40">
                            <option :value="null">Status</option>
                            <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="w-full overflow-x-auto">
                <table class="min-w-full border-collapse">
                    <thead class="bg-gray-50/50 text-orbit-bg uppercase text-[14px] font-black tracking-widest border-b border-gray-100">
                        <tr>
                            <th class="py-6 px-8 text-left">Staff Personnel</th>
                            <th class="py-6 px-8 text-center">Sub-unit</th>
                            <th class="py-6 px-8 text-center">Type</th>
                            <th class="py-6 px-8 text-center">Start Date</th>
                            <th class="py-6 px-8 text-center">End Date</th>
                            <th class="py-6 px-8 text-center">Duration</th>
                            <th class="py-6 px-8 text-center">Status</th>
                            <th class="py-6 px-8 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-gray-50">
                        <template v-if="!loading && filteredLeaves.length > 0">
                            <tr v-for="leave in filteredLeaves" :key="leave.id"
                                class="bg-white hover:bg-gray-50/40 transition-colors group">
                                <td class="p-8 text-left">
                                    <div class="flex flex-col">
                                        <span class="font-black text-orbit-bg uppercase italic tracking-tight">{{ leave.staff_name }}</span>
                                        <span class="text-[10px] text-gray-400 font-bold tracking-widest">{{ leave.staff_id }}</span>
                                    </div>
                                </td>
                                <td class="p-8 text-center font-bold text-gray-400 uppercase text-[11px]">
                                    {{ leave.sub_unit || 'Registry' }}
                                </td>
                                <td class="p-8 text-center">
                                    <span class="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black uppercase text-gray-500">
                                        {{ leave.leave_type }}
                                    </span>
                                </td>
                                <td class="p-8 text-center">
                                    <div class="flex items-center justify-center space-x-2 text-gray-500 font-bold text-[11px]">
                                        <Calendar :size="12" class="opacity-40" />
                                        <span>{{ leave.start_date }}</span>
                                    </div>
                                </td>
                                <td class="p-8 text-center">
                                    <div class="flex items-center justify-center space-x-2 text-gray-500 font-bold text-[11px]">
                                        <Calendar :size="12" class="opacity-40" />
                                        <span>{{ leave.end_date }}</span>
                                    </div>
                                </td>
                                <td class="p-8 text-center font-black text-orbit-bg italic">
                                    {{ leave.duration || 0 }} Days
                                </td>
                                <td class="p-8 text-center">
                                    <button :class="getStatusClass(leave.status)" class="font-black py-2.5 px-6 w-36 rounded-xl text-[10px] uppercase tracking-widest shadow-sm border transition-all">
                                        {{ leave.status }}
                                    </button>
                                </td>
                                <td class="p-8 text-center">
                                    <n-dropdown trigger="click" :options="actionOptions" @select="(key) => handleAction(key, leave)">
                                        <button class="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                                            <MoreVertical :size="20" class="text-gray-300" />
                                        </button>
                                    </n-dropdown>
                                </td>
                            </tr>
                        </template>

                        <tr v-else>
                            <td colspan="8" class="py-32 text-center">
                                <div v-if="loading" class="flex flex-col items-center space-y-4">
                                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orbit-bg"></div>
                                    <p class="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Syncing Records...</p>
                                </div>
                                <div v-else class="text-gray-400 italic font-medium">
                                    No records found matching your current filters.
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getLeaveList, getLeaveSummaryStats } from "@/apis/management/staff.js";
import {
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    FileCheck,
    MoreVertical,
    Search,
    X,
    XCircle
} from 'lucide-vue-next';
import { NDropdown, useMessage } from 'naive-ui';
import { computed, h, onMounted, reactive, ref } from 'vue';

const message = useMessage();
const loading = ref(false);
const stats = ref(null);
const leaveRecords = ref([]);

const filters = reactive({
    search: '',
    type: null,
    status: null
});

const leaveTypeOptions = [
    { label: 'Annual Leave', value: 'Annual' },
    { label: 'Sick Leave', value: 'Sick' },
    { label: 'Maternity Leave', value: 'Maternity' },
    { label: 'Study Leave', value: 'Study' }
];

const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Active', value: 'active' },
    { label: 'Rejected', value: 'rejected' }
];

const actionOptions = [
    { label: 'View Details', key: 'view', icon: () => h(Eye, { size: 14 }) },
    { label: 'Approve', key: 'approve', icon: () => h(CheckCircle, { size: 14 }) },
    { label: 'Reject', key: 'reject', icon: () => h(X, { size: 14 }) }
];

const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'pending') return 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100';
    if (s === 'approved') return 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100';
    if (s === 'active') return 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100';
    if (s === 'rejected') return 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100';
    return 'bg-gray-50 text-gray-500 border-gray-100';
};

const filteredLeaves = computed(() => {
    return leaveRecords.value.filter(item => {
        const matchesSearch = !filters.search ||
            item.staff_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
            item.staff_id?.toLowerCase().includes(filters.search.toLowerCase());
        const matchesType = !filters.type || item.leave_type === filters.type;
        const matchesStatus = !filters.status || item.status?.toLowerCase() === filters.status;
        return matchesSearch && matchesType && matchesStatus;
    });
});

const fetchData = async () => {
    loading.value = true;
    try {
        const [statsRes, leaveRes] = await Promise.all([
            getLeaveSummaryStats(),
            getLeaveList()
        ]);
        stats.value = statsRes.data || statsRes;
        leaveRecords.value = leaveRes.data?.results || leaveRes.data || leaveRes;
    } catch (err) {
        message.error("Registry Sync Failed");
    } finally {
        loading.value = false;
    }
};

onMounted(fetchData);

const handleAction = (key, leave) => {
    message.info(`Processing ${key} for ${leave.staff_name}`);
};
</script>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }
.font-black { font-weight: 900; }

/* Custom Orbit HTML Select Styling */
.orbit-select {
    appearance: none;
    background-color: #f9fafb;
    border: 1px solid #f3f4f6;
    padding: 0.625rem 1rem;
    padding-right: 2.5rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
    outline: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    transition: all 0.2s ease;
}

.orbit-select:focus {
    border-color: #00336633;
    box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.05);
}

.orbit-select:hover {
    background-color: #f3f4f6;
}
</style>