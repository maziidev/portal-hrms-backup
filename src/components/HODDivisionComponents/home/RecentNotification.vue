<script setup>
import { getDivisionHeadStats } from "@/apis/management/divisionHead.js";
import { useAuthStore } from "@/store/auth.js";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();
const { divisionId } = storeToRefs(authStore);

// Debugging flag
const isStatic = ref(true);

const activities = ref([
    { id: 1, text: "Appraisal cycle opened for Works Division", time: "Today, 03:00 PM" },
    { id: 2, text: "Leave request from Adewale Adebayo approved", time: "Sept 20, 03:00 PM" },
    { id: 3, text: "Promotion endorsement submitted", time: "Sept 18, 03:00 PM" },
    { id: 4, text: "Two new staff added to Electrical Sub-unit", time: "Sept 18, 03:00 PM" },
    { id: 5, text: "Promotion recommendation for Dr. C. Yusuf.", time: "Sept 18, 03:00 PM" },
]);

const fetchActivities = async () => {
    if (!divisionId.value) return;

    try {
        const res = await getDivisionHeadStats(divisionId.value);
        const data = res.data || res;

        if (data && data.recent_activities && data.recent_activities.length > 0) {
            activities.value = data.recent_activities;
            isStatic.value = false; // Successfully switched to LIVE data
        }
    } catch (err) {
        console.error("Feed Error (keeping static data):", err);
        isStatic.value = true;
    }
};

watch(divisionId, (newId) => {
    if (newId) fetchActivities();
}, { immediate: true });

onMounted(fetchActivities);
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col px-10 py-8 relative">

        <div class="flex items-center justify-between mb-8">
            <h2 class="font-black text-orbit-bg text-2xl uppercase tracking-tighter italic">
                Division Activity Feed
            </h2>

            <span
                v-if="isStatic"
                class="bg-red-50 text-red-500 text-[9px] font-black px-2 py-1 rounded border border-red-100 animate-pulse uppercase"
            >
                Static Mode
            </span>
            <span
                v-else
                class="bg-green-50 text-green-500 text-[9px] font-black px-2 py-1 rounded border border-green-100 uppercase"
            >
                Live
            </span>
        </div>

        <div class="flex flex-col space-y-8">
            <div v-for="item in activities" :key="item.id" class="flex items-start justify-between group">
                <p class="max-w-[280px] font-bold border-l-4 border-orbit-blue px-4 text-orbit-bg text-sm leading-tight group-hover:border-black transition-colors">
                    {{ item.text }}
                </p>
                <span class="text-gray-400 font-bold text-[10px] uppercase whitespace-nowrap pt-1">
                    {{ item.time }}
                </span>
            </div>
        </div>
    </div>
</template>