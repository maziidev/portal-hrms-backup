<template>
  <div class="p-8 space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-black text-orbit-bg uppercase italic tracking-tighter">Quick Actions</h2>
      <span class="h-[1px] flex-1 mx-6 bg-gradient-to-r from-gray-200 to-transparent opacity-50"></span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <button
        v-for="(action, idx) in quickActions"
        :key="idx"
        @click="openModal(action)"
        class="group flex items-center justify-center space-x-4 bg-orbit-blue p-5 rounded-2xl text-white font-black uppercase tracking-tighter text-[13px] border border-orbit-blue transition-all duration-300 hover:bg-[#2388ff] hover:border-[#2388ff] hover:shadow-xl active:scale-95 cursor-pointer shadow-lg shadow-blue-900/10"
      >
        <div class="transition-transform duration-300 group-hover:scale-110">
           <component :is="action.icon" class="w-5 h-5 text-white/80 group-hover:text-white" />
        </div>

        <span>{{ action.title }}</span>
      </button>
    </div>

    <Transition name="fade-modal">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-orbit-blue/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative border border-white/20">
            <div class="flex flex-col items-center text-center">
                <div class="w-16 h-16 rounded-2xl bg-orbit-blue/5 flex items-center justify-center mb-6 text-orbit-bg">
                    <component :is="activeAction?.icon" class="w-8 h-8" />
                </div>

                <h3 class="text-2xl font-black text-orbit-bg uppercase italic tracking-tighter leading-none">
                    {{ activeAction?.title }}
                </h3>

                <p class="text-[11px] text-gray-400 font-bold uppercase mt-4 tracking-tight">
                    Module Synchronization in Progress
                </p>

                <div class="mt-8 pt-8 border-t border-gray-100 w-full">
                  <button
                      @click="isModalOpen = false"
                      class="w-full py-4 bg-orbit-blue text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2388ff] transition-all cursor-pointer shadow-md"
                  >
                      Close Dashboard Action
                  </button>
                </div>
            </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Lucide icons keep the SVG logic clean and high-fidelity
import {
    BarChart3,
    FileText,
    Megaphone,
    UserPlus
} from 'lucide-vue-next';

const isModalOpen = ref(false);
const activeAction = ref(null);

const quickActions = [
  { title: 'New Appraisal Report', icon: FileText },
  { title: 'Approve Leave', icon: UserPlus },
  { title: 'Generate Unit Report', icon: BarChart3 },
  { title: 'Send Staff Notification', icon: Megaphone },
];

const openModal = (action) => {
  activeAction.value = action;
  isModalOpen.value = true;
};
</script>

<style scoped>
/* Smooth Modal Transitions */
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* Ensure font is snappy */
h2, h3, button {
  -webkit-font-smoothing: antialiased;
}
</style>