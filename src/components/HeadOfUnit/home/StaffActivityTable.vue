<template>


  <BaseTable
    :columns="columns"
    :data="rows"
    :loading="loading"
    enable-search
    enable-date
    :dropdown-filters="statusFilters"
    @filter-change="handleFilters"
  />
</template>

<script setup>
import BaseTable from "@/components/base/BaseTable.vue";
import { NTag } from "naive-ui";
import { computed, h, onMounted, ref } from "vue";
import { fetchStaffActivityFeed } from "../../../apis/services/hou/staffActivity.service.js";

/* ---------------------------
   State
---------------------------- */
const loading = ref(false);
const rawData = ref([]);

const filters = ref({
  search: null,
  date: null,
  dropdowns: {}
});

/* ---------------------------
   Load Data
---------------------------- */
async function loadData() {
  loading.value = true;
  try {
    rawData.value = await fetchStaffActivityFeed();
  } catch (err) {
    console.error("Failed to load staff activity", err);
  } finally {
    loading.value = false;
  }
}

onMounted(loadData);

/* ---------------------------
   Filters
---------------------------- */
function handleFilters(payload) {
  filters.value = payload;
}

/* ---------------------------
   Filtered Rows
---------------------------- */
const rows = computed(() => {
  let data = [...rawData.value];

  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    data = data.filter(
      (r) =>
        r.staff_name.toLowerCase().includes(q) ||
        r.activity.toLowerCase().includes(q)
    );
  }

  if (filters.value.date) {
    const selected = new Date(filters.value.date)
      .toISOString()
      .split("T")[0];

    data = data.filter((r) => r.date === selected);
  }

  if (filters.value.dropdowns.status) {
    data = data.filter(
      (r) => r.status === filters.value.dropdowns.status
    );
  }

  return data.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
});

/* ---------------------------
   Dropdown Filters
---------------------------- */
const statusFilters = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Approved", key: "APPROVED" },
      { label: "Pending", key: "PENDING" },
      { label: "Rejected", key: "REJECTED" },
      { label: "Reviewed", key: "REVIEWED" },

    ]
  }
];

/* ---------------------------
   Columns
---------------------------- */
const columns = [
  { title: "Staff Name", key: "staff_name" },
  { title: "Activity", key: "activity" },
  { title: "Date", key: "date" },
  {
    title: "Status",
    key: "status",
    render(row) {
      const type =
        row.status === "APPROVED" || row.status === "REVIEWED"
          ? "success"
          : row.status === "PENDING"
          ? "warning"
          : "error";

      return h(
        NTag,
        { type, bordered: false },
        { default: () => row.status }
      );
    }
  },
//   {
//     title: "Action",
//     key: "action",
//     render(row) {
//       return h(
//         NButton,
//         {
//           size: "small",
//           tertiary: true,
//           onClick: () => viewItem(row)
//         },
//         { default: () => "View" }
//       );
//     }
//   }
];

function viewItem(row) {
  console.log("Navigate based on source:", row.source, row.id);
}
</script>
