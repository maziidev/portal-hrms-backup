<template>
  <section
    class="mt-1 bg-white rounded-lg shadow-sm p-4"
    :style="{
      '--n-segment-tab-active-color': '#2563eb',
      '--n-segment-tab-color': '#9ca3af',
    }"
  >
    <n-tabs
      type="segment"
      animated
      :placement="tabPlacement"
      :style="tabPlacement === 'left' || tabPlacement === 'right' ? { height: 'auto' } : undefined"
    >
      <n-tab-pane name="staff" tab="Staff Records">
        <dean-tab-staff-directory />
      </n-tab-pane>
      <n-tab-pane name="appraisal" tab="Appraisal">
        <dean-tab-staff-appraisal />
      </n-tab-pane>
      <n-tab-pane name="promotions" tab="Promotions">
        <dean-tab-staff-promotion />
      </n-tab-pane>
      <n-tab-pane name="leave" tab="Leave Requests">
        <dean-tab-staff-leave-req />
      </n-tab-pane>
    </n-tabs>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import DeanTabStaffAppraisal from './Tabs/DeanTabStaffAppraisal.vue'
import DeanTabStaffDirectory from './Tabs/DeanTabStaffDirectory.vue'
import DeanTabStaffLeaveReq from './Tabs/DeanTabStaffLeaveReq.vue'
import DeanTabStaffPromotion from './Tabs/DeanTabStaffPromotion.vue'

const tabPlacement = ref('top') // default horizontal

// responsive logic
const handleResize = () => {
  tabPlacement.value = window.innerWidth < 1024 ? 'top' : 'top'
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
