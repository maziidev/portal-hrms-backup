<script setup>
import { getDetailedStaffInfo } from "@/apis/management/staff";
import {
    ArrowLeft, Award, Briefcase, Clock,
    Download, ExternalLink,
    FileText,
    GraduationCap, Mail, MapPin, Phone, Shield,
    User
} from 'lucide-vue-next';
import { NSpin, NTag, useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const message = useMessage();

const staff = ref(null);
const loading = ref(true);

const fetchStaffDetails = async () => {
    loading.value = true;
    try {
        const id = route.params.id;
        const res = await getDetailedStaffInfo(id);
        staff.value = res.data || res;
    } catch (err) {
        message.error("Executive Registry: Could not retrieve staff records");
    } finally {
        loading.value = false;
    }
};

const val = (value, fallback = '---') => value || fallback;
const goBack = () => router.back();

onMounted(fetchStaffDetails);
</script>

<template>
    <div class="min-h-screen bg-[#F8FAFC] pb-12 font-sans text-slate-900">
        <n-spin :show="loading">
            <header class="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <button @click="goBack" class="flex items-center gap-2 text-slate-500 hover:text-orbit-blue transition-colors font-medium text-sm">
                            <ArrowLeft :size="18" /> Back
                        </button>
                        <div class="h-6 w-px bg-slate-200"></div>
                        <h1 class="text-slate-800 font-bold uppercase text-[11px] tracking-[0.2em]">
                            Registry Dossier: <span class="text-orbit-blue">{{ val(staff?.staff_id) }}</span>
                        </h1>
                    </div>
                    <div class="flex items-center gap-3">
                        <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-all">
                            Manage Status
                        </button>
                        <button class="bg-orbit-blue text-white px-5 py-2 rounded-sm text-xs font-black uppercase tracking-wider shadow-md hover:bg-[#002244] transition-all flex items-center gap-2">
                            <FileText :size="14" /> Export Executive Summary
                        </button>
                    </div>
                </div>
            </header>

            <main class="max-w-7xl mx-auto p-6 space-y-6">
                <div class="bg-white border border-slate-200 rounded-sm p-8 flex items-start gap-10 shadow-sm relative overflow-hidden">
                    <Shield class="absolute -right-8 -bottom-8 text-slate-50 opacity-50" :size="200" />

                    <div class="w-40 h-40 bg-slate-100 rounded-sm border border-slate-200 overflow-hidden shrink-0 shadow-inner">
                        <img v-if="staff?.img" :src="staff.img" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
                            <User :size="64" />
                        </div>
                    </div>

                    <div class="flex-1 z-10">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase">{{ val(staff?.full_name) }}</h2>
                                <div class="flex items-center gap-3 mt-2">
                                    <p class="text-slate-500 font-bold text-sm tracking-tight italic">
                                        {{ val(staff?.rank || staff?.designation) }}
                                    </p>
                                    <span class="text-slate-300">|</span>
                                    <span class="text-xs uppercase tracking-[0.15em] font-black text-orbit-blue">{{ val(staff?.cadre || 'Academic') }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-2">
                                <n-tag type="success" :bordered="false" round class="font-black px-4 uppercase text-[10px]">
                                    Verified Active
                                </n-tag>
                                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Last Updated: 12 Mar 2026</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-8 mt-10">
                            <div class="flex items-center gap-4 group cursor-pointer">
                                <div class="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-sm border border-slate-100 group-hover:bg-orbit-blue group-hover:text-white transition-all">
                                    <Mail :size="16" />
                                </div>
                                <div>
                                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                                    <p class="text-sm font-bold text-slate-700">{{ val(staff?.email) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-sm border border-slate-100">
                                    <MapPin :size="16" />
                                </div>
                                <div>
                                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Primary Office</p>
                                    <p class="text-sm font-bold text-slate-700">{{ val(staff?.department?.name || staff?.department) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-sm border border-slate-100">
                                    <Phone :size="16" />
                                </div>
                                <div>
                                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mobile Contact</p>
                                    <p class="text-sm font-bold text-slate-700">{{ val(staff?.phone_number || staff?.phone) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-12 lg:col-span-8 space-y-6">
                        <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                            <div class="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
                                <h3 class="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Briefcase :size="16" class="text-orbit-blue" /> Career & Affiliation
                                </h3>
                                <button class="text-orbit-blue font-black text-[10px] uppercase hover:underline">Edit Registry</button>
                            </div>
                            <div class="grid grid-cols-2 divide-x divide-slate-100 divide-y">
                                <div v-for="(value, key) in {
                                    'Faculty / College': staff?.faculty?.name || staff?.faculty,
                                    'Unit / Department': staff?.department?.name || staff?.department,
                                    'Current Step/Level': staff?.step_level,
                                    'Nature of Appointment': staff?.employment_type,
                                    'Date of First Appointment': staff?.employment_date,
                                    'Specialization': staff?.specialization
                                }" :key="key" class="p-6">
                                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{{ key }}</p>
                                    <p class="text-sm font-bold text-slate-800">{{ val(value) }}</p>
                                </div>
                            </div>
                        </section>

                        <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                            <div class="bg-slate-50 px-8 py-4 border-b border-slate-200">
                                <h3 class="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Shield :size="16" class="text-emerald-600" /> Digital Credentials & Vault
                                </h3>
                            </div>
                            <div class="p-2 grid grid-cols-2 gap-2">
                                <div v-for="doc in (staff?.documents || ['Appointment_Letter.pdf', 'PG_Certificate.pdf', 'Verification_Doc.pdf'])" :key="doc"
                                    class="p-4 border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-all group">
                                    <div class="flex items-center gap-3">
                                        <FileText :size="18" class="text-slate-300 group-hover:text-orbit-blue" />
                                        <span class="text-xs font-bold text-slate-700">{{ doc.name || doc }}</span>
                                    </div>
                                    <div class="flex gap-4">
                                        <Download :size="14" class="text-slate-400 hover:text-orbit-blue cursor-pointer" />
                                        <ExternalLink :size="14" class="text-slate-400 hover:text-orbit-blue cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="col-span-12 lg:col-span-4 space-y-6">
                        <div class="bg-orbit-blue rounded-sm p-8 text-white shadow-xl relative overflow-hidden group">
                            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Award :size="80" />
                            </div>
                            <h4 class="text-[10px] font-black text-blue-200/50 uppercase tracking-[0.2em] mb-1">Institutional Appraisal</h4>
                            <div class="flex items-baseline gap-2">
                                <span class="text-5xl font-black tracking-tighter">{{ val(staff?.appraisal_score, '0') }}%</span>
                                <span class="text-emerald-400 text-xs font-black uppercase tracking-widest">Excellence</span>
                            </div>
                            <div class="mt-6 pt-6 border-t border-white/10 text-xs text-blue-100/60 leading-relaxed italic">
                                "{{ val(staff?.appraisal_note, 'Academic output and administrative leadership meet institutional benchmarks.') }}"
                            </div>
                        </div>

                        <div class="bg-white border border-slate-200 rounded-sm shadow-sm p-8">
                            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex justify-between">
                                LEAVE UTILIZATION <Clock :size="14" />
                            </h4>
                            <div class="flex justify-between items-end mb-4">
                                <span class="text-4xl font-black text-slate-900">{{ val(staff?.leave_bal, '0') }}</span>
                                <span class="text-xs font-bold text-slate-400 uppercase mb-1">Days Remaining</span>
                            </div>
                            <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                                <div class="h-full bg-orbit-blue transition-all" :style="{ width: '70%' }"></div>
                            </div>
                            <p class="text-[9px] font-bold text-slate-400 text-right uppercase">Cycle Ends: Dec 2026</p>
                        </div>

                        <div class="bg-emerald-50 border border-emerald-100 rounded-sm p-8">
                            <GraduationCap :size="24" class="text-emerald-600 mb-4" />
                            <h4 class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Career Lifecycle</h4>
                            <p class="text-lg font-black text-emerald-900 tracking-tight">Promotion Recommended</p>
                            <p class="text-xs text-emerald-700/70 mt-3 leading-relaxed font-medium">
                                Registry audits confirm completion of residency and peer-review requirements for next rank elevation.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </n-spin>
    </div>
</template>

<style scoped>
.text-orbit-blue { color: #003366; }
.bg-orbit-blue { background-color: #003366; }

main > * {
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: #003366; }
</style>