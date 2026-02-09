<template>
  <div class="bg-white p-6 rounded-2xl">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold ">{{ title }}</h2>

    <div v-if="showSwitcher" class="flex gap-2 mb-4  rounded-md p-1 border">
      <button
        v-for="range in ranges"
        :key="range"
        :class="['px-3 py-2 rounded ', currentRange === range ? 'bg-blue-500 text-white' : '']"
        @click="updateRange(range)"
      >
        {{ range }}
      </button>
    </div>
    </div>

    <apexchart
      :type="type"
      :height="height"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  type: { type: String, default: "bar" },
  height: { type: Number, default: 350 },
  series: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  showSwitcher: { type: Boolean, default: false },
  ranges: { type: Array, default: () => ["week", "month", "year"] },
  onRangeChange: { type: Function },
});

const ranges = props.ranges;
const currentRange = ref(ranges[0]);

const updateRange = (range) => {
  currentRange.value = range;
  if (props.onRangeChange) props.onRangeChange(range);
};

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
    //   borderRadius: 3,
      horizontal: false,
    },
  },
  dataLabels: { enabled: false },
  xaxis: { categories: [] },
  ...props.options,
});

// Watch for dynamic updates to options (like categories)
watch(
  () => props.options,
  (newOptions) => {
    chartOptions.value = { ...chartOptions.value, ...newOptions };
  },

  { deep: true }
);
</script>
