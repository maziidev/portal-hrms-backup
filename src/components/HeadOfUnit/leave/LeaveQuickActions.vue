<template>
  <div class="p-6">
    <div>
      <h3 class="font-bold text-xl tracking-wide mb-6">Quick Actions / Shortcuts</h3>
    </div>
    <div class="grid  lg:grid-cols-3 gap-4">
      <RouterLink
        :to="{name: 'LeaveActive'}"
        class="bg-orbit-blue rounded-sm text-white p-4 flex items-center justify-center space-x-4 text-[18px]"
      >
          <UserPlus />
        <span>View Active Leaves</span>
      </RouterLink>

      <RouterLink
        :to="{name: 'LeaveBalance'}"
        class="bg-orbit-blue rounded-sm text-white p-4 flex items-center justify-center space-x-4 text-[18px]"
      >
        <FileText />

        <span>Leaves Balance Report</span>
      </RouterLink>

      <button
        @click="exportPDF"
        class="bg-orbit-blue rounded-sm text-white p-4 flex items-center justify-center space-x-4 text-[18px]"
      >
          <Upload />

        <span>Export Summary (PDF)</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { getLeaveTypeStats } from '@/apis/services/hou/leave.services.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // for tables
import { FileText, Upload, UserPlus } from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

const exportPDF = async () => {
  try {
    // Fetch leave stats from API
    const data = await getLeaveTypeStats();

    // Fallback data if API returns nothing
    const fallback = [
      { label: 'Annual Leave', value: 5 },
      { label: 'Maternity Leave', value: 10 },
      { label: 'Study Leave', value: 8 },
      { label: 'Sick Leave', value: 4 },
      { label: 'Other', value: 5 },
    ];
    const stats = data.length ? data : fallback;

    // Create a PDF
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Leave Summary Report', 14, 22);

    // Table content
    const tableData = stats.map(item => [item.label, item.value]);
    doc.autoTable({
      head: [['Leave Type', 'Count']],
      body: tableData,
      startY: 30,
    });

    // Trigger download
    doc.save('leave-summary.pdf');
  } catch (err) {
    alert('Could not export PDF at this time.');
  }
};
</script>

