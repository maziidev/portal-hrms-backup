<script setup lang="ts">
import { FileText, History, MousePointerClick } from 'lucide-vue-next';
import BaseButton from '../Shared/BaseButton.vue';

const handleSummary = () => console.log('Summary Clicked');
const handleHistory = () => console.log('History Clicked');
</script>

<template>
    <div class="px-6 py-10">
        <div class="flex items-center space-x-3 mb-8">
            <div class="p-2 bg-orbit-bg/5 rounded-lg">
                <MousePointerClick :size="18" class="text-orbit-bg" />
            </div>
            <div>
                <h2 class="text-2xl font-black text-orbit-bg tracking-tighter uppercase italic leading-none">
                    Shortcuts
                </h2>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                    Direct Administrative Access
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div class="flex flex-col">
                <BaseButton
                    label="View Promotion Summary"
                    @click="handleSummary"
                    class="w-full! py-6! mt-0! text-[12px]! font-black! uppercase tracking-[0.15em] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                />
                <div class="mt-3 flex items-center space-x-2 px-1">
                    <FileText :size="12" class="text-gray-400" />
                    <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">
                        Aggregate data for current session
                    </p>
                </div>
            </div>

            <div class="flex flex-col">
                <BaseButton
                    label="View Recommendation History"
                    @click="handleHistory"
                    class="w-full! py-6! mt-0! text-[12px]! font-black! uppercase tracking-[0.15em] bg-white! text-orbit-bg! border-gray-200! shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                />
                <div class="mt-3 flex items-center space-x-2 px-1">
                    <History :size="12" class="text-gray-400" />
                    <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">
                        Review archive of past decisions
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.text-orbit-bg { color: #003366; }
.bg-orbit-bg { background-color: #003366; }

/* Ensuring the "View Recommendation History" button looks premium as a ghost variant */
:deep(.btn) {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>