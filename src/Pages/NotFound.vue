<script setup>
import { ArrowLeft, Ghost, Home } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => router.back();
const goHome = () => router.push('/');
</script>

<template>
  <div class="h-screen w-full bg-orbit-bg flex flex-col items-center justify-center overflow-hidden relative">

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
    </div>

    <div class="relative z-10 text-center px-6">
      <div class="mb-8 flex justify-center">
        <div class="bg-white/5 p-8 rounded-[3rem] backdrop-blur-xl border border-white/10 animate-bounce duration-[3000ms]">
          <Ghost :size="80" class="text-orbit-cyan" />
        </div>
      </div>

      <div class="space-y-2">
        <h1 class="text-[120px] md:text-[180px] font-black leading-none italic uppercase tracking-tighter text-white opacity-20 select-none">
          404
        </h1>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 w-full">
           <h2 class="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Lost in <span class="text-orbit-cyan">Orbit.</span>
           </h2>
        </div>
      </div>

      <p class="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mt-20 mb-12 max-w-md mx-auto leading-relaxed">
        The page you are looking for has drifted out of range or no longer exists in our system.
      </p>

      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          @click="goHome"
          class="w-full md:w-auto flex items-center justify-center gap-3 bg-orbit-cyan text-orbit-bg px-10 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all active:scale-95"
        >
          <Home :size="18" stroke-width="3" />
          Return to Mission Control
        </button>

        <button
          @click="goBack"
          class="w-full md:w-auto flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-10 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-white/10 transition-all active:scale-95"
        >
          <ArrowLeft :size="18" stroke-width="3" />
          Go Back
        </button>
      </div>
    </div>

    <div class="absolute bottom-10 text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">
      Orbit HRMS // Error Code: NULL_LOCATION
    </div>
  </div>
</template>

<style scoped>
.bg-orbit-bg { background-color: #003366; }
.text-orbit-bg { color: #003366; }
.text-orbit-cyan { color: #00ffff; }

@keyframes spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Entering Animation */
.relative.z-10 {
  animation: entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes entrance {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>