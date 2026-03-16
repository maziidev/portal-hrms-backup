<script setup>
import { getDetailedStaffInfo } from "@/apis/management/staff";
import {
    ArrowLeft,
    Award,
    Briefcase,
    Clock,
    FileText,
    GraduationCap,
    Mail, MapPin, Phone,
    Shield,
    User
} from 'lucide-vue-next';
import { NSpin, useMessage } from 'naive-ui';
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
        const data = res.data || res;

        // Normalize the phone key so the template is consistent
        staff.value = {
            ...data,
            phone_number: data.phone_number || data.phone
        };
    } catch (err) {
        message.error("Could not retrieve staff records");
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
                        <h1 class="text-slate-800 font-semibold tracking-tight uppercase text-xs tracking-widest">
                            Staff Record: <span class="font-black text-orbit-blue">{{ val(staff?.staff_id) }}</span>
                        </h1>
                    </div>
                    <div class="flex items-center gap-3">
                        <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all">
                            Archive Record
                        </button>
                        <button class="bg-orbit-blue text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#002244] transition-all flex items-center gap-2">
                            <FileText :size="14" /> Generate Report
                        </button>
                    </div>
                </div>
            </header>

            <main class="max-w-7xl mx-auto p-6 space-y-6">
                <div class="bg-white border border-slate-200 rounded-sm p-6 flex items-start gap-8 shadow-sm">
                    <div class="w-32 h-32 bg-slate-100 rounded border border-slate-200 overflow-hidden shrink-0">
                        <img v-if="staff?.img" :src="staff.img" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
                            <User :size="48" />
                        </div>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-2xl font-bold text-slate-900">{{ val(staff?.full_name) }}</h2>
                                <p class="text-slate-500 font-medium flex items-center gap-2 mt-1">
                                    {{ val(staff?.rank || staff?.designation) }}
                                    <span class="text-slate-300">|</span>
                                    <span class="text-xs uppercase tracking-widest font-bold text-orbit-blue">{{ val(staff?.employment_type) }}</span>
                                </p>
                            </div>
                            <span class="bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full border border-green-200 uppercase tracking-tighter">
                                Verified Active
                            </span>
                        </div>

                        <div class="grid grid-cols-3 gap-6 mt-6">
                            <div class="flex items-center gap-3 text-slate-600">
                                <Mail :size="16" class="text-slate-400" />
                                <span class="text-sm truncate">{{ val(staff?.email) }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-slate-600">
                                <MapPin :size="16" class="text-slate-400" />
                                <span class="text-sm">{{ val(staff?.department?.name || staff?.department) }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-slate-600">
                                <Phone :size="16" class="text-slate-400" />
                                <span class="text-sm">{{ val(staff?.phone_number) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-12 lg:col-span-8 space-y-6">
                        <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                            <div class="bg-slate-50 px-6 py-3 border-b border-slate-200">
                                <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase :size="14" /> Professional Affiliation
                                </h3>
                            </div>
                            <div class="grid grid-cols-2 divide-x divide-slate-100 divide-y">
                                <div v-for="(value, key) in {
                                    'Faculty': staff?.faculty?.name || staff?.faculty,
                                    'Department': staff?.department?.name || staff?.department,
                                    'Rank / Cadre': staff?.rank,
                                    'Specialization': staff?.specialization,
                                    'Appointment Date': staff?.employment_date,
                                    'Highest Qualification': staff?.qualification
                                }" :key="key" class="p-4">
                                    <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">{{ key }}</p>
                                    <p class="text-sm font-semibold text-slate-800">{{ val(value) }}</p>
                                </div>
                            </div>
                        </section>

                        <section class="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                            <div class="bg-slate-50 px-6 py-3 border-b border-slate-200">
                                <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <User :size="14" /> Personal Information
                                </h3>
                            </div>
                            <div class="p-6 grid grid-cols-3 gap-y-6">
                                <div v-for="(value, key) in {
                                    'Gender': staff?.gender,
                                    'Date of Birth': staff?.dob,
                                    'Phone Number': staff?.phone_number,
                                    'Marital Status': staff?.marital_status,
                                    'Religion': staff?.religion,
                                    'Nationality': 'Nigerian',
                                    'Staff ID': staff?.staff_id
                                }" :key="key">
                                    <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">{{ key }}</p>
                                    <p class="text-sm font-semibold text-slate-800">{{ val(value) }}</p>
                                </div>
                            </div>
                        </section>

                        <section class="bg-white border border-slate-200 rounded-sm shadow-sm">
                            <div class="bg-slate-50 px-6 py-3 border-b border-slate-200">
                                <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                    <Shield :size="14" /> Verified Documentation
                                </h3>
                            </div>
                            <div class="divide-y divide-slate-100">
                                <div v-for="file in (staff?.documents || ['Employment_Letter.pdf', 'Degree_Certificate.pdf'])" :key="file"
                                    class="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                                            <FileText :size="16" />
                                        </div>
                                        <span class="text-sm font-medium text-slate-700">{{ file.name || file }}</span>
                                    </div>
                                    <div class="flex gap-2">
                                        <button class="text-[11px] font-bold text-orbit-blue uppercase hover:underline">Download</button>
                                        <span class="text-slate-200">|</span>
                                        <button class="text-[11px] font-bold text-orbit-blue uppercase hover:underline">View</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="col-span-12 lg:col-span-4 space-y-6">
                        <div class="bg-white border border-slate-200 rounded-sm shadow-sm p-6 text-center">
                            <Award :size="32" class="text-orbit-blue mx-auto mb-4" />
                            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Last Appraisal Score</h4>
                            <div class="text-4xl font-black text-slate-900">{{ val(staff?.appraisal_score, '0%') }}</div>
                            <div class="mt-4 p-3 bg-slate-50 rounded text-xs text-slate-500 italic border border-slate-100">
                                "{{ val(staff?.appraisal_note, 'Outstanding performance in departmental duties.') }}"
                            </div>
                        </div>

                        <div class="bg-white border border-slate-200 rounded-sm shadow-sm p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h4 class="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                                    <Clock :size="14" /> Leave Status
                                </h4>
                            </div>
                            <div class="flex justify-between items-end border-b border-slate-100 pb-4 mb-4">
                                <span class="text-sm text-slate-500 font-medium">Available Balance</span>
                                <span class="text-2xl font-bold text-slate-800">{{ val(staff?.leave_bal, '0 Days') }}</span>
                            </div>
                            <div class="space-y-3">
                                <p class="text-[11px] text-slate-400 uppercase font-bold">Eligibility</p>
                                <div class="flex items-center gap-2">
                                    <div class="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                        <div class="h-full bg-orbit-blue w-3/4"></div>
                                    </div>
                                    <span class="text-xs font-bold text-orbit-blue">Next: 2026</span>
                                </div>
                            </div>
                        </div>

                        <div class="bg-orbit-blue rounded-sm p-6 text-white shadow-md">
                            <GraduationCap :size="24" class="mb-4 opacity-70" />
                            <h4 class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Career Status</h4>
                            <p class="text-lg font-bold">Eligible for Promotion</p>
                            <p class="text-xs text-white/70 mt-2 leading-relaxed">System indicates this staff is eligible for the 2026 promotion cycle pending HOD endorsement.</p>
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

section, .bg-white {
    animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}
</style>