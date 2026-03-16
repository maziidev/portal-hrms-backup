<template>
  <section class="px-2 lg:px-8 space-y-8">

    <!-- Session / Semester / Date / Time -->
    <SessionSemesterCard />

    <!-- Stats + Chart -->
    <HOUStatAndChartHome/>

    <!-- Quick Action -->
     <QuickActionHome/>

     <!-- Activity Table -->
      <HOUActivityTableHome/>

  </section>
</template>

<script setup>
import SessionSemesterCard from '@/components/SessionSemesterCard.vue';
import HOUStatAndChartHome from '@/components/HouComponents/HOUStatAndChartHome.vue';
import QuickActionHome from '@/components/HouComponents/QuickActionHome.vue';
import HOUActivityTableHome from '@/components/HouComponents/HOUActivityTableHome.vue';


</script>
