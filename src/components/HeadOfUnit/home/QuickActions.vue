<script setup>
import { FileText, UserPlus } from 'lucide-vue-next';
import { useRouter } from "vue-router";

const router = useRouter();

const quickActions = [
  {
    label: "New Appraisal Review",
    action: () => router.push({ name: "CreateAppraisal" }),
    icon: FileText
  },
  {
    label: "Approve Leave",
    action: () => router.push({ name: "LeaveApprovals" }),
    icon: UserPlus
  },
  {
    label: "Generate Unit Report",
    action: () => router.push({ name: "UnitReports" }),
    icon: FileText
  },
  {
    label: "Send Staff Notification",
    action: () => router.push({ name: "StaffNotifications" }),
    icon: FileText
  }
];
</script>



<template>
  <div>
    <!-- Quick Actions -->
    <section class="p-6 bg-white rounded-xl shadow-sm">
      <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="item in quickActions"
          :key="item.label"
          @click="item.action"
          class="flex items-center justify-center gap-3 bg-orbit-blue text-white p-4 rounded-xl font-medium hover:opacity-90 transition"
        >
          <!-- Render icon as component -->
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </button>
      </div>
    </section>
  </div>
</template>
