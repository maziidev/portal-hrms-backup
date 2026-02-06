<template>
  <div class="space-y-4">


      <!-- 🔍 Filters -->
      <div class="space-y-3">

        <div class="flex flex-col md:flex-row md:items-center gap-4">
            <h2 class="text-2xl font-semibold mb-4 w-70">Staff Activity Feed</h2>
      <!-- Search -->
      <n-input
        v-if="enableSearch"
        v-model:value="localFilters.search"
        placeholder="Search..."
        clearable
        @update:value="emitFilters"
        class="w-20 p-2 rounded-2xl"
      />
    </div>

     <div class="flex flex-end flex-wrap items-center justify-end gap-4">
         <!-- Date Range -->
      <n-date-picker
        v-if="enableDate"
        v-model:value="localFilters.date"
        type="date"
        clearable
        @update:value="emitFilters"
        class="py-3"
      />

      <!-- Dropdown Filters -->
      <n-dropdown
        v-for="dropdown in dropdownFilters"
        :key="dropdown.key"
        trigger="click"
        :options="dropdown.options"
        @select="(key) => handleDropdownSelect(dropdown.key, key)"
        class=""
      >
        <n-button size="small" class="bg-white rounded-md border py-2 px-3">
          {{ dropdown.label }}
        </n-button>
      </n-dropdown>
     </div>
    </div>

    <!-- 📊 Table -->
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination || false"
      :bordered="false"
      :max-height="maxHeight"
      :scroll-x="scrollX"
    />
  </div>
</template>
import { reactive } from "vue";
<script setup>
import { reactive } from "vue";

const props = defineProps({
  columns: { type: Array, required: true },
  data: { type: Array, required: true },
  loading: { type: Boolean, default: false },

  pagination: { type: [Object, Boolean], default: false },

  enableSearch: { type: Boolean, default: false },
  enableDate: { type: Boolean, default: false },

  dropdownFilters: {
    type: Array,
    default: () => []
    /*
      [
        {
          key: 'status',
          label: 'Status',
          options: [{ label: 'Approved', key: 'APPROVED' }]
        }
      ]
    */
  },

  maxHeight: { type: Number, default: 400 },
  scrollX: { type: Number, default: 1200 }
});

const emit = defineEmits(["filter-change"]);

const localFilters = reactive({
  search: null,
  date: null,
  dropdowns: {}
});

function emitFilters() {
  emit("filter-change", { ...localFilters });
}

function handleDropdownSelect(filterKey, value) {
  localFilters.dropdowns[filterKey] = value;
  emitFilters();
}
</script>
