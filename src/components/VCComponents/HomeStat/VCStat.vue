<script setup>
import {
  getAppraisalCompletionRateByFaculty,
  getPublicationStats,
  getVCDashboardStats
} from "@/apis/management/vc";
import { NSpin, useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';

import CompletionChart from './CompletionChart.vue';
import InstitutionalStats from './InstitutionalStats.vue';
import ResearchMetrics from './ResearchMetrics.vue';

const message = useMessage();
const loading = ref(false);
const mainStats = ref({ faculties_count: 0, divisions_count: 0, total_staff: 0, pending_promotions: 0, avg_appraisal_rate: 0 });
const publications = ref({ total_count: 0 });

const loadData = async () => {
  loading.value = true;
  try {
    const [statsRes, appraisalRes, pubRes] = await Promise.all([
      getVCDashboardStats().catch(err => {
        if (err.response?.status === 401) message.error("Session expired. Please login again.");
        if (err.response?.data?.error) message.warning("Stats: No active appraisal period.");
        return { data: {} };
      }),
      getAppraisalCompletionRateByFaculty().catch(() => ({ data: [] })),
      getPublicationStats().catch(() => ({ data: { total_count: 0 } }))
    ]);

    // Merge results with default 0 values to prevent "undefined" errors
    mainStats.value = { ...mainStats.value, ...statsRes.data };
    publications.value = pubRes.data || { total_count: 0 };
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
</script>

<template>
  <div class="">
    <n-spin :show="loading">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InstitutionalStats :stats="mainStats" />
        <ResearchMetrics :stats="mainStats" :publications="publications" />
        <CompletionChart />
      </div>
    </n-spin>
  </div>
</template>