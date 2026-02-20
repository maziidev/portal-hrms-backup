<script setup>
import { getVCDashboardStats } from "@/apis/management/vc";
import { useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';

const message = useMessage();
const stats = ref(null);
const loading = ref(true);

const fetchStats = async () => {
    try {
        loading.value = true;
        // API call to the VC Stats endpoint
        const res = await getVCDashboardStats();

        // Handle both { data: ... } and direct response structures
        stats.value = res.data || res;

        console.log("VC Stats loaded successfully:", stats.value);
    } catch (err) {
        // Detailed error logging for debugging the 400/500 errors
        console.error("[VC Stats Error]:", {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });

        // User-facing error message
        message.error("Unable to update dashboard statistics. Please refresh.");
    } finally {
        loading.value = false;
    }
}

onMounted(fetchStats);
</script>

<template>
    <div class="p-2">
        <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto lg:h-[350px]">

            <div class="md:col-span-2 md:row-span-2 bg-[#003366] rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-blue-900/20">
                <div class="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>

                <div class="relative z-10">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span class="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">Live Statistics</span>
                    </div>
                    <h3 class="text-white/60 text-sm font-bold mt-8 uppercase tracking-tight">Total Staff Appraised</h3>
                    <h1 class="text-white text-8xl font-black italic tracking-tighter mt-2 leading-none">
                        {{ stats?.total_staff_appraised || '0' }}
                    </h1>
                </div>

                <div class="relative z-10">
                    <p class="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-loose">
                        Institutional Performance <br/> Data Integrity Verified
                    </p>
                </div>
            </div>

            <div class="bg-white border border-gray-100 rounded-4xl p-8 flex flex-col justify-between hover:shadow-xl hover:border-orange-100 transition-all duration-300 group">
                <div class="flex justify-between items-start">
                    <div class="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:rotate-12 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <n-tag :bordered="false" type="warning" size="small" class="font-black text-[9px] uppercase tracking-tighter px-3">Action Required</n-tag>
                </div>
                <div>
                    <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest">Pending Reviews</p>
                    <p class="text-4xl font-black text-[#003366] tracking-tighter mt-1">{{ stats?.pending_reviews || '0' }}</p>
                </div>
            </div>

            <div class="bg-white border border-gray-100 rounded-4xl p-8 flex flex-col justify-between hover:shadow-xl hover:border-green-100 transition-all duration-300 group">
                <div class="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                    <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest">Approved</p>
                    <p class="text-4xl font-black text-[#003366] tracking-tighter mt-1">{{ stats?.approved_appraisals || '0' }}</p>
                </div>
            </div>

            <div class="md:col-span-2 bg-[#F8FAFC] border border-gray-100 rounded-4xl p-8 flex items-center justify-between group relative overflow-hidden">
                <div class="relative z-10">
                    <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest">Departments Tracked</p>
                    <div class="flex items-baseline gap-2">
                        <p class="text-5xl font-black text-[#003366] tracking-tighter mt-1">{{ stats?.departments_reviewed || '0' }}</p>
                        <span class="text-xs font-bold text-gray-400">/ Total</span>
                    </div>
                </div>

                <div class="relative z-10 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#003366" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>

                <div class="absolute -right-2.5 -bottom-5 text-[100px] font-black text-black/3 italic pointer-events-none">DEPT</div>
            </div>

        </div>
    </div>
</template>