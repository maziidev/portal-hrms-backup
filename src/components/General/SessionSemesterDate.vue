<template>
  <div class="">
    <div class="flex justify-between gap-[20px] flex-wrap md:flex-nowrap">
      <div class="session flex items-center gap-[10px]">
        <div class="session">
          <!-- Calendar with more details -->

          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="s16">Session</div>
        <div class="date mbc">{{ session }}</div>
      </div>
      <div class="semester flex items-center gap-[10px]">
        <div class="session">
          <!-- Calendar with more details -->

          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="s16">Semester</div>
        <div class="date mbc">{{ semester }}</div>
      </div>
      <div class="semester flex items-center gap-[10px]">
        <div class="session">
          <!-- Calendar with more details -->

          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="s16">{{ date.dateValue }}</div>
        <div class="date mbc flex items-center gap-5">
          <i class="fa fa-clock"></i> {{ date.time }}<span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

    const props = defineProps({
        session:{
            type: String,
            default: `2024/2025`,
            required:true
        },
        semester:{
            type: String,
            default: `First`,
            required:true
        },
        date:{
            type: String,
            default: {
                dateValue:`28th September 2025`,
                time:`6:45 AM`
            },
            required:true
        },
    })
</script>
