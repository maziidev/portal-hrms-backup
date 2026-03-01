<template>
  <section class="px-2 lg:px-8 pb-16">

    <!-- Top Bar -->
    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <button
          @click="router.back()"
          class="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-orbit-bg transition-colors"
        >
          <ChevronLeft :size="16" /> Back
        </button>
        <span class="font-black text-orbit-bg text-lg tracking-tight">EUN/ACA/0231</span>
      </div>
      <button class="text-gray-400 hover:text-orbit-bg transition-colors">
        <MoreHorizontal :size="20" />
      </button>
    </div>

    <div class="px-6 space-y-6">

      <!-- Profile Photo -->
      <div class="w-44 h-52 rounded-2xl overflow-hidden bg-gray-100 shadow">
        <img
          src="https://i.pravatar.cc/300?img=12"
          alt="Staff photo"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Personal Information -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          class="w-full flex items-center justify-between px-6 py-4 text-left"
          @click="toggle('personal')"
        >
          <span class="text-sm font-black text-orbit-bg">Personal Information</span>
          <ChevronUp v-if="open.personal" :size="16" class="text-gray-400" />
          <ChevronDown v-else :size="16" class="text-gray-400" />
        </button>
        <div v-show="open.personal" class="border-t border-gray-50 px-6 pb-2">
          <div v-for="row in personalInfo" :key="row.label" class="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <span class="text-sm text-gray-400 font-medium">{{ row.label }}</span>
            <span class="text-sm font-semibold text-orbit-bg text-right">{{ row.value }}</span>
          </div>
        </div>
      </div>

      <!-- Professional Information -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          class="w-full flex items-center justify-between px-6 py-4 text-left"
          @click="toggle('professional')"
        >
          <span class="text-sm font-black text-orbit-bg">Professional Information</span>
          <ChevronUp v-if="open.professional" :size="16" class="text-gray-400" />
          <ChevronDown v-else :size="16" class="text-gray-400" />
        </button>
        <div v-show="open.professional" class="border-t border-gray-50 px-6 pb-2">
          <div v-for="row in professionalInfo" :key="row.label" class="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <span class="text-sm text-gray-400 font-medium">{{ row.label }}</span>
            <span class="text-sm font-semibold text-orbit-bg text-right">{{ row.value }}</span>
          </div>
        </div>
      </div>

      <!-- Performance & Appraisal -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          class="w-full flex items-center justify-between px-6 py-4 text-left"
          @click="toggle('appraisal')"
        >
          <span class="text-sm font-black text-orbit-bg">Performance & Appraisal - Career Progression - Leave</span>
          <ChevronUp v-if="open.appraisal" :size="16" class="text-gray-400 shrink-0" />
          <ChevronDown v-else :size="16" class="text-gray-400 shrink-0" />
        </button>
        <div v-show="open.appraisal" class="border-t border-gray-100">
          <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 p-6 gap-6 md:gap-0">

            <!-- Performance Records -->
            <div class="md:pr-6">
              <h4 class="text-[10px] font-black text-orbit-bg uppercase tracking-widest mb-4">Performance Records</h4>
              <table class="w-full text-xs">
                <thead>
                  <tr class="text-[10px] font-bold text-gray-400 uppercase">
                    <th class="text-left pb-3">Appraisal Year</th>
                    <th class="text-left pb-3">Remark</th>
                    <th class="text-left pb-3">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in performanceRecords" :key="r.year">
                    <td class="py-2.5 pr-2">
                      <div class="flex items-center gap-1.5">
                        <span class="w-0.5 h-5 rounded-full bg-orbit-blue shrink-0"></span>
                        <span class="font-black text-orbit-bg">{{ r.year }}</span>
                      </div>
                    </td>
                    <td class="py-2.5 pr-2 text-gray-400 font-medium">{{ r.remark }}</td>
                    <td class="py-2.5 font-bold text-gray-600">{{ r.score }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Promotion & Career Progression -->
            <div class="md:px-6 pt-6 md:pt-0">
              <h4 class="text-[10px] font-black text-orbit-bg uppercase tracking-widest mb-4">Promotion & Career Progression</h4>
              <table class="w-full text-xs">
                <thead>
                  <tr class="text-[10px] font-bold text-gray-400 uppercase">
                    <th class="text-left pb-3">Stage/Year</th>
                    <th class="text-left pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in promotionRecords" :key="r.stage" class="align-top">
                    <td class="py-2.5 pr-2">
                      <div class="flex items-start gap-1.5">
                        <span class="w-0.5 min-h-5 h-full rounded-full bg-orbit-blue shrink-0 mt-0.5"></span>
                        <span class="font-semibold text-orbit-bg leading-snug">{{ r.stage }}</span>
                      </div>
                    </td>
                    <td class="py-2.5">
                      <span :class="promotionStatusClass(r.status)" class="font-bold text-xs">{{ r.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Leave Records -->
            <div class="md:pl-6 pt-6 md:pt-0">
              <h4 class="text-[10px] font-black text-orbit-bg uppercase tracking-widest mb-4">Leave Records</h4>
              <table class="w-full text-xs">
                <thead>
                  <tr class="text-[10px] font-bold text-gray-400 uppercase">
                    <th class="text-left pb-3">Period</th>
                    <th class="text-left pb-3">Type</th>
                    <th class="text-left pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in leaveRecords" :key="r.period" class="align-top">
                    <td class="py-2.5 pr-2">
                      <div class="flex items-start gap-1.5">
                        <span class="w-0.5 min-h-5 h-full rounded-full bg-orbit-blue shrink-0 mt-0.5"></span>
                        <span class="font-semibold text-orbit-bg leading-snug">{{ r.period }}</span>
                      </div>
                    </td>
                    <td class="py-2.5 pr-2 text-gray-500 font-medium">{{ r.type }}</td>
                    <td class="py-2.5">
                      <span :class="leaveStatusClass(r.status)" class="font-bold">{{ r.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <!-- Retirement & Exit -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          class="w-full flex items-center justify-between px-6 py-4 text-left"
          @click="toggle('retirement')"
        >
          <span class="text-sm font-black text-orbit-bg">Retirement & Exit</span>
          <ChevronUp v-if="open.retirement" :size="16" class="text-gray-400" />
          <ChevronDown v-else :size="16" class="text-gray-400" />
        </button>
        <div v-show="open.retirement" class="border-t border-gray-50 px-6 pb-2">
          <div class="flex items-center justify-between py-3 border-b border-gray-50">
            <span class="text-sm text-gray-400 font-medium">Expected Retirement Date</span>
            <span class="text-sm font-semibold text-orbit-bg">01/12/2035</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-sm text-gray-400 font-medium">Clearance Status</span>
            <span class="text-sm font-semibold text-orbit-bg">Not initiated</span>
          </div>
        </div>
      </div>

      <!-- Files / Documents -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          class="w-full flex items-center justify-between px-6 py-4 text-left"
          @click="toggle('documents')"
        >
          <span class="text-sm font-black text-orbit-bg">Files / Documents</span>
          <ChevronUp v-if="open.documents" :size="16" class="text-gray-400" />
          <ChevronDown v-else :size="16" class="text-gray-400" />
        </button>
        <div v-show="open.documents" class="border-t border-gray-50 px-6 pb-2">
          <div
            v-for="doc in documents"
            :key="doc.name"
            class="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0"
          >
            <span class="text-sm text-gray-500 font-medium">{{ doc.name }}</span>
            <div class="flex items-center gap-3">
              <button class="text-gray-400 hover:text-orbit-blue transition-colors">
                <Download :size="17" />
              </button>
              <button class="bg-orbit-blue text-white text-sm font-bold px-5 py-1.5 rounded-lg hover:bg-orbit-bgSec transition-colors">
                View
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ChevronDown, ChevronLeft, ChevronUp, Download, MoreHorizontal } from 'lucide-vue-next'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ── Accordion state ───────────────────────────────────────────────────────────
const open = reactive({
  personal:     true,
  professional: true,
  appraisal:    true,
  retirement:   true,
  documents:    true,
})

const toggle = (key) => { open[key] = !open[key] }

// ── Personal Info ─────────────────────────────────────────────────────────────
const personalInfo = [
  { label: 'Name',           value: 'Mary James'          },
  { label: 'Gender',         value: 'Female'              },
  { label: 'Date of Birth',  value: '02/04/1980'          },
  { label: 'Email',          value: 'jane.doe@eun.edu.ng' },
  { label: 'Phone',          value: '+234 708 564 8905'   },
  { label: 'Marital Status', value: 'Married'             },
]

// ── Professional Info ─────────────────────────────────────────────────────────
const professionalInfo = [
  { label: 'Cadre',                     value: 'Senior'                  },
  { label: 'Department',                value: 'Registry'                },
  { label: 'Subunit',                   value: 'Records'                 },
  { label: 'Type of Employment',        value: 'Permanent & Pensionable' },
  { label: 'Date of First Appointment', value: '10/01/2010'              },
  { label: 'Date of Last Promotion',    value: '05/09/2022'              },
  { label: 'Qualification(s)',          value: 'MSC (2020), BSc (2014)'  },
]

// ── Performance Records ───────────────────────────────────────────────────────
const performanceRecords = [
  { year: '2024', remark: 'Excellent', score: '87%' },
  { year: '2023', remark: 'Excellent', score: '87%' },
  { year: '2022', remark: 'Excellent', score: '87%' },
]

// ── Promotion Records ─────────────────────────────────────────────────────────
const promotionRecords = [
  { stage: 'Internal Review – Sept, 2024',    status: 'Eligible'    },
  { stage: 'Division Review – May, 2023',     status: 'Approved'    },
  { stage: 'Management Approval – Jun, 2022', status: 'Recommended' },
]

const promotionStatusClass = (status) => {
  if (status === 'Eligible') return 'text-orbit-blue'
  return 'text-gray-400'
}

// ── Leave Records ─────────────────────────────────────────────────────────────
const leaveRecords = [
  { period: 'Aug 3–14, 2024',  type: 'Annual Leave',    status: 'Approved' },
  { period: 'Feb 10–12, 2025', type: 'Emergency Leave', status: 'Approved' },
  { period: 'Aug 3–14, 2021',  type: 'Sick Leave',      status: 'Rejected' },
]

const leaveStatusClass = (status) => {
  if (status === 'Approved') return 'text-orbit-green'
  if (status === 'Rejected') return 'text-orbit-red'
  return 'text-gray-400'
}

// ── Documents ─────────────────────────────────────────────────────────────────
const documents = [
  { name: 'Appointment Letters'           },
  { name: 'Appraisal Reports'             },
  { name: "Master's Certificate"          },
  { name: "Bachelor's Degree Certificate" },
]
</script>
