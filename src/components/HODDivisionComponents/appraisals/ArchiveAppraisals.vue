<script setup>
/**
 * Component: ArchivedAppraisalsTable.vue
 * Description: Historical records table with premium aesthetics and accessible typography.
 */
import { getDivisionHeadStats } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import { storeToRefs } from "pinia";
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const { divisionId } = storeToRefs(authStore);

// State
const archivedData = ref([]);
const loading = ref(false);

const fetchArchivedData = async () => {
    if (!divisionId.value) return;
    loading.value = true;
    try {
        const res = await getDivisionHeadStats(divisionId.value);

        // Consuming real API data with fallback normalization
        if (res.data?.archived_appraisals) {
            archivedData.value = res.data.archived_appraisals;
        } else if (Array.isArray(res.data)) {
            archivedData.value = res.data;
        }
    } catch (err) {
        console.error("Error fetching archived data:", err);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchArchivedData);
</script>

<template>
    <div class="mt-12 bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">
        <div class="p-6 md:p-8 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
            <div>
                <h2 class="text-orbit-bg font-black text-2xl md:text-3xl uppercase tracking-tighter italic leading-tight">
                    Archived Appraisals
                </h2>
                <p class="text-[12px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
                    Historical Division Performance Records
                </p>
            </div>

            <div class="flex items-center gap-2">
                <button
                    @click="fetchArchivedData"
                    :disabled="loading"
                    class="border-2 border-gray-200 p-2.5 hover:bg-gray-50 text-gray-600 transition-all disabled:opacity-50 group"
                    title="Refresh Archives"
                >
                    <svg :class="{'animate-spin': loading}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
                    </svg>
                </button>

                <div class="px-5 py-2.5 text-sm font-black italic text-orbit-bg border-y-2 border-gray-200 uppercase tracking-tight bg-gray-50">
                    {{ loading ? 'Synchronizing...' : 'Records Timeline' }}
                </div>

                <button class="bg-orbit-blue text-white p-2.5 hover:bg-black transition-all shadow-md shadow-blue-100 border-2 border-orbit-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="w-full overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr class="bg-gray-50 border-b-2 border-gray-200 text-gray-700 text-[12px] font-black uppercase tracking-widest">
                        <th class="py-5 px-8">Academic Year Session</th>
                        <th class="py-5 px-6 text-center">Staff Population</th>
                        <th class="py-5 px-6 text-center">Performance Average</th>
                        <th class="py-5 px-8 text-right">Archive Actions</th>
                    </tr>
                </thead>

                <tbody class="text-gray-800">
                    <tr v-if="loading">
                        <td colspan="4" class="py-32 text-center">
                            <div class="flex flex-col items-center justify-center space-y-4">
                                <div class="w-10 h-10 border-4 border-orbit-blue/20 border-t-orbit-blue rounded-full animate-spin"></div>
                                <span class="text-xs font-black uppercase tracking-[0.4em] text-orbit-blue italic">Accessing Historical Data...</span>
                            </div>
                        </td>
                    </tr>

                    <template v-else-if="archivedData.length > 0">
                        <tr v-for="(row, index) in archivedData" :key="index"
                            class="border-b border-gray-100 last:border-0 even:bg-gray-50/50 hover:bg-orbit-blue/5 transition-colors group">

                            <td class="py-6 px-8">
                                <div class="flex items-center space-x-3">
                                    <div class="w-2 h-2 rounded-full bg-orbit-bg group-hover:bg-orbit-blue transition-colors"></div>
                                    <span class="text-orbit-bg font-black text-base italic tracking-tight uppercase group-hover:text-orbit-blue transition-colors">
                                        {{ row.year }} Academic Session
                                    </span>
                                </div>
                            </td>

                            <td class="py-6 px-6 text-center">
                                <span class="text-gray-700 font-bold uppercase text-sm">
                                    {{ row.total_staff || row.staff_count }} Personnel
                                </span>
                            </td>

                            <td class="py-6 px-6 text-center">
                                <div class="inline-flex items-center justify-center bg-white border-2 border-gray-200 px-6 py-1.5 group-hover:border-orbit-blue/30 transition-colors shadow-sm">
                                    <span class="text-orbit-blue font-black text-sm italic">
                                        {{ row.avg_score || row.average_performance }}%
                                    </span>
                                </div>
                            </td>

                            <td class="py-6 px-8 text-right">
                                <a :href="row.report_url" target="_blank"
                                   class="inline-flex items-center space-x-3 bg-orbit-bg text-white px-6 py-2.5 rounded-sm hover:bg-orbit-blue transition-all shadow-sm active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>
                                    </svg>
                                    <span class="text-[11px] font-black uppercase tracking-widest">Download Report</span>
                                </a>
                            </td>
                        </tr>
                    </template>

                    <tr v-else>
                        <td colspan="4" class="py-32 text-center bg-gray-50/20">
                            <div class="flex flex-col items-center justify-center opacity-40">
                                <svg class="mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                                <p class="text-gray-600 font-black uppercase text-xs tracking-[0.2em] italic">
                                    No historical appraisal records located in division archives
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
/* Scoped overrides to ensure brand consistency */
.text-orbit-bg { color: #1a1a1a; }
.bg-orbit-bg { background-color: #1a1a1a; }
.text-orbit-blue { color: #2388ff; }
.bg-orbit-blue { background-color: #2388ff; }
.border-orbit-blue { border-color: #2388ff; }

/* Custom hide scrollbar but allow functionality */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>