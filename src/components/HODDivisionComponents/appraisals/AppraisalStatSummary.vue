<script setup>
import { getDivisionHeadStats } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();
const { divisionId } = storeToRefs(authStore);

// State
const loading = ref(false);
const isStatic = ref(true);
const stats = ref({
    total_appraisals: 24,
    pending_reviews: 4,
    approved_appraisals: 20,
    average_score: 80
});

const fetchStats = async () => {
    if (!divisionId.value) return;

    loading.value = true;
    try {
        const res = await getDivisionHeadStats(divisionId.value);
        const data = res.data || res;

        stats.value = {
            total_appraisals: data.total_appraisals ?? 24,
            pending_reviews: data.pending_reviews ?? 4,
            approved_appraisals: data.approved_appraisals ?? 20,
            average_score: data.average_division_score ?? 80
        };

        isStatic.value = false;
    } catch (err) {
        console.error("Stats Fetch Error:", err);
        isStatic.value = true;
    } finally {
        loading.value = false;
    }
};

// Re-fetch when divisionId arrives or changes
watch(divisionId, (newId) => {
    if (newId) fetchStats();
}, { immediate: true });

onMounted(fetchStats);
</script>

<template>
    <div class="p-6">
        <div class="flex justify-end mb-2">
            <span v-if="isStatic" class="text-[9px] font-black uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100 animate-pulse">
                Static Stats
            </span>
            <span v-else class="text-[9px] font-black uppercase text-green-500 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                Live Stats
            </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-orbit-bg p-8 rounded-3xl shadow-xl shadow-gray-200 flex flex-col justify-between min-h-[160px] transition-transform hover:scale-[1.02]">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Total Appraisals</p>
                <div class="flex items-end justify-between">
                    <h3 class="text-5xl font-black text-white italic tracking-tighter leading-none">
                        {{ stats.total_appraisals }}
                    </h3>
                    <div class="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                        <div class="h-2 w-2 rounded-full bg-white animate-ping"></div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px] transition-transform hover:scale-[1.02]">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Pending Reviews</p>
                <h3 class="text-5xl font-black text-orbit-bg italic tracking-tighter leading-none">
                    {{ stats.pending_reviews }}
                </h3>
            </div>

            <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px] transition-transform hover:scale-[1.02]">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Approved</p>
                <h3 class="text-5xl font-black text-orbit-blue italic tracking-tighter leading-none">
                    {{ stats.approved_appraisals }}
                </h3>
            </div>

            <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px] transition-transform hover:scale-[1.02]">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Division Score</p>
                <div class="flex items-baseline gap-1">
                    <h3 class="text-5xl font-black text-orbit-bg italic tracking-tighter leading-none">
                        {{ stats.average_score }}
                    </h3>
                    <span class="text-xl font-black text-orbit-blue italic">%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-orbit-bg { color: #1a1a1a; }
.bg-orbit-bg { background-color: #1a1a1a; }
.text-orbit-blue { color: #2388ff; }
</style>