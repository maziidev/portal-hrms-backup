<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <button
      :class="[
        `rounded-2xl box cursor-pointer h-24 shadow flex flex-col justify-center gap-6 py-5 px-6`,
        activeState == btn.name ? `bg-[rgba(17,27,73,1)]` : `bg-white `,
      ]"
      v-for="btn in btns"
      :key="btn"
      :id="btn.name"
      @click="isActive(btn.name)"
    >
      <div>
        <div class="flex justify-between items-center gap-3 w-full">
          <h2
            :class="[
              `font-medium text-base text-[rgba(204,204,204,1)] leading-[120%] tracking-[-2%]`,
            ]"
          >
            {{ btn.name }}
          </h2>
          <h2
            :class="[
              `text-3xl font-bold leading-[120%] tracking-[-2%]`,
              activeState == btn.name
                ? `text-[rgba(255,255,255,1)]`
                : `text-(--sec-text)`,
            ]"
          >
            {{ btn.value }}
          </h2>
        </div>
      </div>
    </button>
  </div>

    <div
      class="quick_actions flex justify-between flex-wrap lg:flex-nowrap md:flex-nowrap items-center gap-4"
  >
    <div
      class="flex items-center gap-5 flex-wrap lg:flex-nowrap md:flex-nowrap"
    >
      <h2
        class="text-[rgba(30,43,58,1)] font-bold text-base leading-[120%] tracking-[-2%]"
      >
        All Staff Directory
      </h2>
      <div class="flex items-center gap-3">
        <span
          class="ml-3 ai_suggestion text-sm font-medium leading-[120%] tracking-[0.2%] text-[rgba(30,30,30,1)]"
        >
          Group by Department/Unit
        </span>
        <label class="relative inline-flex items-center cursor-pointer">
          <n-switch
            v-model:value="form.is_active"
            class="text-white h-full rounded-full p-2"
          >
          </n-switch>
        </label>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-5"
    >
      <button
        class="text-[rgba(255,255,255,1)] px-10 py-2.5 font-semibold text-base flex gap-2.5 items-center leading-[120%] tracking-[-2%] rounded px-10 bg-[rgba(35,136,255,1)] border-2 border-[rgba(35,136,255,1)]"
      >
        <i class="fas fa-user-plus"></i> Add New Staff
      </button>
      <button
        @click="openImportStaffModal"
        class="text-[rgba(35,136,255,1)] cursor-pointer bulk_upload_ px-10 py-2.5 font-semibold text-base flex gap-2.5 items-center leading-[120%] tracking-[-2%] rounded border-2 border-[rgba(35,136,255,1)]"
      >
        <i class="fas fa-file-import fa-flip-horizontal"></i> import staff
        records
      </button>
    </div>
  </div>

  <form class="all_staff_directory w-full">
    <div
      class="top flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between gap-5 items-center"
    >
      <div class="left flex items-center md:w-1/2 gap-3.75">
        <div class="relative h-10 w-full">
          <div class="h-full absolute left-2.5 flex items-center">
            <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
          </div>
          <n-input
            type="search"
            name="search"
            placeholder="by Name/Staff ID/Email/Unit"
            id="search"
            :bordered="false"
            class="search outline-none w-full lg:w-1/2 border rounded-md border-[rgba(229,231,235,1)]"
          />
        </div>
      </div>
      <div
        class="right grid grid-cols-1 w-full items-center gap-3.75 flex-wrap lg:grid-cols-4 md:grid-cols-4"
      >
        <n-select
          :options="unitOptions"
          clearable
          v-model:value="form.dept_code"
          name="department_unit"
          id="department_unit"
          placeholder="Department / Unit"
          class="cursor-pointer rounded-md outline-none"
        >
        </n-select>
        <n-select
          clearable
          v-model:value="form.employment_type"
          name="employment_type"
          id="employment_type"
          placeholder="Employment Type"
          class="cursor-pointer rounded-md outline-none"
        >
        </n-select>

        <n-select
          clearable
          :options="status"
          v-model:value="form.status"
          name="status"
          id="status"
          placeholder="Status"
          class="cursor-pointer rounded-md outline-none"
        >
        </n-select>
        <n-date-picker
          v-model:value="form.date"
          type="date"
          placeholder="DD-MM-YYYY"
          :bordered="false"
          class="custom-select border"
        />
      </div>
    </div>
    <div class="w-full overflow-hidden mt-3">
      <div class="overflow-x-auto">
        <n-data-table
          :columns="columns"
          :loading="loading"
          :data="staffData"
          :bordered="false"
          :scroll-x="1200"
          :pagination="pagination"
        />
      </div>
    </div>

    <n-modal
      :show="importState"
      preset="card"
      title="Bulk Upload Staff"
      class="bulk_upload !lg:w-[50%] md:w-[40%] rounded-md border p-10 bg-white top-[20%] w-full overflow-y-auto"
      :mask-closable="true"
      :closable="true"
      @close="closeUploadModal"
    >
      <div
        id="drop-zone"
        class="my-3 relative w-full px-6 py-3.5 bg-[rgba(248,248,249,1)]"
      >
        <input
          type="file"
          id="file"
          accept=".pdf,.doc,.docx,.txt, image/* "
          aria-hidden="false"
          class="w-full absolute inset-0 opacity-0 cursor-pointer outline-none border-0 px-3 py-3.75 bg-[rgba(248,248,249,1)] font-normal text-sm leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
        />
        <div class="pointer-events-none flex flex-col items-center gap-1">
          <div
            class="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-2xl text-gray-600 shadow-sm"
          >
            <i class="fas fa-arrow-up-from-bracket"></i>
          </div>

          <div class="flex flex-col items-center gap-1.25">
            <div class="flex items-center gap-2.5">
              <span class="text-[rgba(0,149,255,1)] text-sm font-medium">
                Upload file
              </span>
              <p class="text-sm text-gray-500">
                or
                <span class="text-sm font-medium text-[rgba(71,84,103,1)]"
                  >or drag and drop</span
                ><br />
              </p>
            </div>
            <span
              class="text-xs leading-4.5 font-medium text-[rgba(71,84,103,1)]"
            >
              supports only .xsl and .csv (max. 5mb)
            </span>
          </div>

          <div id="file-info" class="mt-3 text-sm text-gray-600"></div>
        </div>
      </div>
      <div
        class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-5"
      >
        <span class="preview"></span>
        <n-upload
          :max="1"
          accept=".csv"
          :before-upload="beforeUploadingFile"
          :custom-request="uploadFile"
          class="submit border-2 border-[rgba(35,136,255,1)] cursor-pointer bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] text-center font-semibold text-base leading-4 tracking-0 p-3.75"
        >
          Upload Staff
        </n-upload>
      </div>
    </n-modal>
  </form>
</template>
<script setup>
import { getAllStaff, importStaff } from "@/apis/admin.js";
import { useMessage } from "naive-ui";
import { h, onMounted, reactive, ref } from "vue";

const message = useMessage();
const loading = ref(false);

const importState = ref(false);

const staffData = ref([]);
const form = reactive({
  date: null,
  search: null,
  dept_code: null,
  is_active: false,
  employment_type: null,
  year_of_services: null,
});
const activeState = ref(null);

const openImportStaffModal = () => {
  importState.value = true;
};
const closeUploadModal = () => {
  importState.value = false;
};

const handleCSVFileChange = (options) => {
  const file = options.file.file;
  csvFile.value = file;
  console.log(csvFile.value);
  csvFilePreview.value = URL.createObjectURL(file);
};

const uploadFile = async () => {


  loadingFile.value = true;
  try {
    const res = await importStaff({ file: csvFile.value });
    message.success("Staff data imported successfully");
  } catch (err) {
    message.error("Staff data not imported");
  } finally {
    loadingFile.value = false;
  }
};

// Get All Staff
const fetchStaffData = async () => {
  try {
    loading.value = true;
    const { data } = await getAllStaff({
      dept_code: form.dept_code,
      employment_type: form.employment_type,
      search: form.search,
    });
    staffData.value = data;
  } catch (error) {
    message.error("Staff data could not be fetched");
    console.log(error);
  } finally {
    loading.value = false;
  }
};

function isActive(id) {
  activeState.value = id;
  console.log(id);
}
const btns = reactive([
  { name: "Active Staff", value: 20300 },
  { name: "On Probation", value: 20560 },
  { name: "On Study Leave", value: 20300 },
  { name: "Retired", value: 10300 },
]);
const departments = ref([
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
]);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

onMounted(async () => {
  isActive("Active Staff");
  loading.value = true;

  try {
    staffData.value = await getAllStaff({
      dept_code: form.dept_code,
      employment_type: form.employment_type,
      search: form.search,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    message.error("Error fetching staff data");
  }
});

// Define table columns
const columns = [
  {
    title: "Staff ID",
    key: "id",
  },
  { title: "Full Name", key: "full_name" },
  { title: "Employment Type", key: "employment_type" },
  { title: "Department", key: "department" },
  { title: "Email", key: "email" },
  { title: "Employment Date", key: "date_of_employment" },

  {
    title: "Status ",
    key: "status",
    render(row) {
      return h(
        "span",
        {
          style: {
            color: row.is_active
              ? "text-[rgba(251,188,4,1)]"
              : row.is_active == "Due in 12 mo"
                ? "red"
                : "blue",
            fontWeight: "700",
            backgroundColor: row.is_active
              ? "bg-[rgba(234,67,53,0.2)]"
              : row.is_active == "Due in 12 mo"
                ? "bg-[rgba(251,188,4,0.2)]"
                : "bg-[rgba(58,151,76,0.15)]",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "22.5px",
            lineHeight: "100%",
            wordSpacing: "0%",
          },
        },
        row.is_active,
      );
    },
  },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
