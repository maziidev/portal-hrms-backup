<script setup>
import { getDetailedStaffInfo } from "@/apis/management/staff";
import {
    ArrowLeft, Award, BookOpen, Briefcase, Clock,
    Download, FileText, History, Mail, Phone,
    Shield, Trophy, User
} from 'lucide-vue-next';
import { NSpin, NTag, useMessage } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';
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

const initials = computed(() => {
    if (!staff.value?.full_name) return '??';
    return staff.value.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});

onMounted(fetchStaffDetails);
</script>

<template>
    <div class="min-h-screen bg-[#F1F5F9] pb-12 font-sans text-slate-900">
        <n-spin :show="loading">
            <header class="bg-white border-b-2 border-orbit-blue sticky top-0 z-20 shadow-md">
                <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div class="flex items-center gap-6">
                        <button @click="router.back()" class="flex items-center gap-2 text-orbit-blue font-bold text-base">
                            <ArrowLeft :size="20" /> Back
                        </button>
                        <div class="h-8 w-px bg-slate-200"></div>
                        <h1 class="text-slate-800 font-black uppercase text-sm tracking-widest">
                            Registry Dossier: <span class="text-orbit-blue">{{ val(staff?.staff_id) }}</span>
                        </h1>
                    </div>
                    <button class="bg-orbit-blue text-white px-6 py-3 rounded-md text-sm font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                        <FileText :size="18" /> Generate Full Report
                    </button>
                </div>
            </header>

            <main class="max-w-7xl mx-auto p-6 space-y-8">
                <div class="bg-white border-l-8 border-orbit-blue rounded-r-lg p-10 flex items-center gap-12 shadow-sm relative overflow-hidden">
                    <Shield class="absolute -right-10 -bottom-10 text-slate-100 opacity-40" :size="240" />

                    <div class="w-44 h-44 bg-slate-200 rounded-lg border-2 border-slate-300 overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
                        <img v-if="staff?.img" :src="staff.img" class="w-full h-full object-cover" />
                        <div v-else class="text-5xl font-black text-orbit-blue italic">{{ initials }}</div>
                    </div>

                    <div class="flex-1 z-10">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">{{ val(staff?.full_name) }}</h2>
                                <div class="flex items-center gap-4">
                                    <p class="text-orbit-blue font-bold text-lg italic">{{ val(staff?.designation) }}</p>
                                    <span class="text-slate-300">|</span>
                                    <NTag type="info" :bordered="false" class="font-black uppercase text-xs px-4 bg-blue-50 text-orbit-blue">{{ val(staff?.employment_status, 'Active') }}</NTag>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p>
                                <p class="text-lg font-bold text-slate-800">{{ val(staff?.dob) }}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-10 mt-10 border-t border-slate-100 pt-8">
                            <div class="flex items-center gap-4">
                                <div class="p-3 bg-blue-50 rounded-lg"><Mail :size="20" class="text-orbit-blue" /></div>
                                <div>
                                    <p class="text-xs font-black text-slate-400 uppercase">Official Email</p>
                                    <p class="text-base font-bold text-slate-800">{{ val(staff?.email) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="p-3 bg-blue-50 rounded-lg"><Phone :size="20" class="text-orbit-blue" /></div>
                                <div>
                                    <p class="text-xs font-black text-slate-400 uppercase">Contact Phone</p>
                                    <p class="text-base font-bold text-slate-800">{{ val(staff?.phone) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="p-3 bg-blue-50 rounded-lg"><User :size="20" class="text-orbit-blue" /></div>
                                <div>
                                    <p class="text-xs font-black text-slate-400 uppercase">Bio Information</p>
                                    <p class="text-base font-bold text-slate-800">{{ val(staff?.gender) }} / {{ val(staff?.marital_status) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="bg-white border-t-4 border-orbit-blue p-8 rounded-b-lg shadow-sm">
                        <div class="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                            <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider">Performance Record</h3>
                            <Award :size="20" class="text-orbit-blue" />
                        </div>
                        <div class="space-y-6">
                            <div v-for="record in staff?.performance_records" :key="record.year" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-base font-black text-slate-700">{{ record.year }}</span>
                                <span class="text-xs font-bold text-slate-500 uppercase">{{ record.remark }}</span>
                                <span class="text-lg font-black text-orbit-blue">{{ record.score }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border-t-4 border-orbit-blue p-8 rounded-b-lg shadow-sm">
                        <div class="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                            <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider">Progression Stage</h3>
                            <History :size="20" class="text-orbit-blue" />
                        </div>
                        <div class="space-y-6">
                            <div v-for="step in staff?.career_progression" :key="step.stage" class="p-4 border-l-4 border-orbit-blue bg-blue-50/30 flex justify-between items-center">
                                <div>
                                    <p class="text-xs font-black text-slate-900 uppercase mb-1">{{ step.stage }}</p>
                                    <p class="text-xs font-bold text-slate-400 uppercase">{{ step.date }}</p>
                                </div>
                                <NTag :type="step.status === 'Approved' ? 'success' : 'warning'" size="small" class="font-black uppercase text-[10px]">{{ step.status }}</NTag>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border-t-4 border-orbit-blue p-8 rounded-b-lg shadow-sm">
                        <div class="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                            <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider">Leave Status</h3>
                            <Clock :size="20" class="text-orbit-blue" />
                        </div>
                        <div class="space-y-6">
                            <div v-for="leave in staff?.leave_records" :key="leave.date" class="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                                <div>
                                    <p class="text-sm font-black text-slate-800">{{ leave.date }}</p>
                                    <p class="text-xs font-bold text-slate-400 uppercase">{{ leave.type }}</p>
                                </div>
                                <span :class="leave.status === 'Approved' ? 'text-emerald-600' : 'text-red-500'" class="text-xs font-black uppercase">{{ leave.status }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-8">
                    <div class="col-span-12 lg:col-span-8 space-y-8">
                        <section class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div class="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center gap-3">
                                <Briefcase :size="20" class="text-orbit-blue" />
                                <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider">Administrative Posting</h3>
                            </div>
                            <div class="grid grid-cols-2 divide-x divide-slate-100 divide-y">
                                <div v-for="(v, k) in {
                                    'Division': staff?.division,
                                    'Unit': staff?.unit,
                                    'Department': staff?.department,
                                    'Appointment Type': staff?.appointment_type,
                                    'First Appointment': staff?.date_of_first_appointment,
                                    'Last Promotion': staff?.date_of_last_promotion
                                }" :key="k" class="p-8">
                                    <p class="text-xs text-slate-400 font-black uppercase mb-2">{{ k }}</p>
                                    <p class="text-base font-bold text-slate-800">{{ val(v) }}</p>
                                </div>
                            </div>
                        </section>

                        <section class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div class="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center gap-3">
                                <BookOpen :size="20" class="text-orbit-blue" />
                                <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider">Academic Background</h3>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead class="bg-slate-50 text-xs font-black uppercase text-slate-500 border-b border-slate-200">
                                        <tr>
                                            <th class="p-6 text-left">Qualification</th>
                                            <th class="p-6 text-left">Institution</th>
                                            <th class="p-6 text-center">Year</th>
                                            <th class="p-6 text-right">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        <tr v-for="q in staff?.qualifications" :key="q.year">
                                            <td class="p-6 text-sm font-black text-slate-800">{{ q.qualification }}</td>
                                            <td class="p-6 text-sm font-medium text-slate-600">{{ q.institution }}</td>
                                            <td class="p-6 text-sm font-black text-orbit-blue text-center">{{ q.year }}</td>
                                            <td class="p-6 text-sm font-bold italic text-right">{{ q.grade }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <div class="col-span-12 lg:col-span-4 space-y-8">
                        <div class="bg-orbit-blue rounded-lg p-10 text-white shadow-xl relative overflow-hidden">
                            <Trophy class="absolute -right-6 -bottom-6 text-white opacity-10" :size="160" />
                            <h4 class="text-xs font-black text-blue-200 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Trophy :size="16" /> Awards & Recognition
                            </h4>
                            <div class="space-y-8">
                                <div v-for="award in staff?.awards" :key="award.title" class="border-l-2 border-blue-400 pl-4">
                                    <p class="text-base font-black leading-tight">{{ award.title }}</p>
                                    <p class="text-xs font-bold text-blue-300 uppercase mt-2">{{ award.date }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                            <div class="bg-slate-50 px-8 py-5 border-b border-slate-200 flex items-center justify-between">
                                <h4 class="text-sm font-black text-slate-800 uppercase tracking-wider">Registry Files</h4>
                                <Shield :size="18" class="text-orbit-blue" />
                            </div>
                            <div class="p-6 space-y-4">
                                <div v-for="doc in staff?.documents" :key="doc.name" class="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg">
                                    <div class="flex items-center gap-4">
                                        <FileText :size="20" class="text-orbit-blue" />
                                        <span class="text-sm font-bold text-slate-700">{{ doc.name }}</span>
                                    </div>
                                    <Download :size="18" class="text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </n-spin>
    </div>
</template>

