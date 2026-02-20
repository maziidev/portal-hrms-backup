<script setup>
import { getDeanFacultyStats } from "@/apis/management/dean";
import { useAuthStore } from '@/store/auth';
import { NSpin, useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const message = useMessage();

const stats = ref({
    total_appraisals: 0,
    pending_reviews: 0,
    approved_appraisals: 0,
    total_departments: 0
});
const loading = ref(true);

const fetchStats = async () => {
    const fId = authStore.facultyId;

    if (!fId) {
        loading.value = false;
        return;
    }

    loading.value = true;
    try {
        const { data } = await getDeanFacultyStats(fId);

        // Mapping directly to the backend response keys provided
        stats.value = {
            total_appraisals: data.total_appraisals || 0,
            pending_reviews: data.active_appraisals || 0, // Backend calls it active_appraisals
            approved_appraisals: data.approved_appraisals || 0,
            total_departments: data.total_departments || 0 // Backend calls it total_departments
        };
    } catch (err) {
        console.error("Stats Error:", err);
        message.error("Failed to load dashboard statistics");
    } finally {
        loading.value = false;
    }
};

onMounted(fetchStats);
</script>

<template>
    <div class="p-6">
        <n-spin :show="loading">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div class="bg-orbit-bg px-6 py-8 flex items-center justify-between rounded-2xl text-white shadow-sm border border-orbit-bg">
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold opacity-80">Total Appraisals</p>
                        <p class="text-3xl font-bold mt-1">{{ stats.total_appraisals }}</p>
                    </div>
                    <div class="text-2xl opacity-20 font-black">#</div>
                </div>

                <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Pending Reviews</p>
                        <p class="text-3xl font-bold text-orbit-bg mt-1">{{ stats.pending_reviews }}</p>
                    </div>
                    <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                </div>

                <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Approved Appraisals</p>
                        <p class="text-3xl font-bold text-orbit-bg mt-1">{{ stats.approved_appraisals }}</p>
                    </div>
                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                </div>

                <div class="bg-white px-6 py-8 flex items-center justify-between rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Departments</p>
                        <p class="text-3xl font-bold text-orbit-bg mt-1">{{ stats.total_departments }}</p>
                    </div>
                    <div class="px-2 py-1 bg-gray-100 rounded text-[10px] font-black text-gray-400">DEPT</div>
                </div>

            </div>
        </n-spin>
    </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }

.grid > div {
    animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>