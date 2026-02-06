<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Chart' },
  type: { type: String, default: 'bar' },
  height: { type: Number, default: 350 },
  series: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  showSwitcher: { type: Boolean, default: false },
  ranges: { type: Array, default: () => ['week', 'month', 'year'] },
  onRangeChange: { type: Function }
})

// Use props.ranges, not just ranges
const currentRange = ref(props.ranges[0])

const updateRange = (range) => {
  currentRange.value = range
  if (props.onRangeChange) props.onRangeChange(range)
}

// Merge user options with defaults
const chartOptions = ref({
  chart: { toolbar: { show: false }, zoom: { enabled: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: false } },
  dataLabels: { enabled: false },
  xaxis: { categories: [] },
  ...props.options
})
</script>
