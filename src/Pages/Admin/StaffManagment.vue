<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px]">
    <button
      :class="[
        `rounded-[20px] box cursor-pointer h-[97px] shadow  flex flex-col justify-center gap-[24px] py-[20px] px-[25px]`,
        activeState == btn.name ? `bg-[rgba(17,27,73,1)]` : `bg-white `,
      ]"
      v-for="btn in btns"
      :key="btn"
      :id="btn.name "
      @click="isActive(btn.name)"
    >
      <div>
        <div class="flex justify-between items-center gap-3 w-full">
          <h2
            :class="[
              `font-[500] text-[16px] text-[rgba(204,204,204,1)] leading-[120%] tracking-[-2%]`,
            ]"
          >
            {{ btn.name }}
          </h2>
          <h2
            :class="[
              `text-[34px] font-bold leading-[120%] tracking-[-2%]`,
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

  <!-- All Staff Directory -->
  <div
    class="quick_actions flex justify-between flex-wrap lg:flex-nowrap md:flex-nowrap items-center gap-[15px]"
  >
    <div
      class="flex items-center gap-[20px] flex-wrap lg:flex-nowrap md:flex-nowrap"
    >
      <h2
        class="text-[rgba(30,43,58,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
      >
        All Staff Directory
      </h2>
      <div class="flex items-center gap-3">
        <span
          class="ml-3 ai_suggestion text-[14px] font-[500] leading-[120%] tracking-[0.2%] text-[rgba(30,30,30,1)]"
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
      class="grid grid-cols-1 md:grid-cols-2 relative lg:grid-cols-2 items-center gap-[20px]"
    >
      <button
        class="text-[rgba(255,255,255,1)] cursor-pointer px-10 py-2.5 font-[600] text-[16px] flex gap-[10px] items-center leading-[120%] tracking-[-2%] rounded-[5px] bg-[rgba(35,136,255,1)] border-2 border-[rgba(35,136,255,1)]"
      >
        <i class="fas fa-user-plus"></i> Add New Staff
      </button>
      <button
        @click="openImportStaffModal"
        class="text-[rgba(35,136,255,1)] relative z-2 cursor-pointer bulk_upload_ px-[40px] py-[10px] font-[600] text-[16px] flex gap-[10px] items-center leading-[120%] tracking-[-2%] rounded-[5px] border-2 border-[rgba(35,136,255,1)]"
      >
        <i class="fas fa-file-import fa-flip-horizontal"></i> import staff
        records
      </button>
    </div>
  </div>

  <form class="all_staff_directory w-full">
    <div
      class="top flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between gap-[20px] items-center"
    >
      <div class="left flex items-center md:w-[50%] gap-[15px]">
        <div class="relative h-[40px] w-full">
          <div class="h-full absolute left-[10px] flex items-center">
            <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
          </div>
          <n-input
            type="search"
            name="search"
            placeholder="by Name/Staff ID/Email/Unit"
            id="search"
            @update:value="fetchStaffData"
            :bordered="false"
            class="search outline-none w-full lg:w-[50%] border rounded-[6px] border-[rgba(229,231,235,1)]"
          />
        </div>
      </div>
      <div
        class="right grid grid-cols-1 w-full items-center gap-[15px] flex-wrap lg:grid-cols-4 md:grid-cols-4"
      >
        <n-select
          :options="departmentCodes"
          clearable
          v-model:value="form.dept_code"
          @update:value="fetchStaffData"
          name="dept_code"
          id="dept_code"
          placeholder="Department Code"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-select
          clearable
          :options="employmentType"
          v-model:value="form.employment_type"
          name="employment_type"
          @update:value="fetchStaffData"
          id="employment_type"
          placeholder="Employment Type"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>

        <n-select
          clearable
          :options="status"
          v-model:value="form.status"
          name="status"
          id="status"
          placeholder="Status"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-date-picker
          v-model:value="form.date"
          type="date"
          placeholder="DD-MM-YYYY"
          :bordered="true"
          class="custom-select"
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

    <!-- Modal -->
    <n-modal
      :show="importState"
      preset="card"
      title="Bulk Upload Staff"
      class="bulk_upload lg:w-[50%]! relative md:w-[40%]! rounded-md p-10 bg-white top-[20%] w-full overflow-y-auto"
      :mask-closable="true"
      :closable="true"
      @close="closeUploadModal"
    >
      <n-spin
        size="large"
        v-if="loadingFile"
        class="absolute top-[50%] left-[50%]"
      ></n-spin>

      <n-upload
        :default-upload="false"
        directory-dnd
        accept=".csv"
        :max="1"
        @change="handleCSVFileChange"
      >
        <n-upload-dragger
          style="border-radius: 20px; padding: 20px; text-align: center"
        >
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ArchiveIcon />
            </n-icon>
          </div>

          <n-text class="text-[rgba(71,84,103,1)]" style="font-size: 16px">
            <span class="text-[rgba(80,48,229,1)] font-[600]"
              >Click to upload
            </span>
            <span class="text-[rgba(71,84,103,1)] font-[400]">
              or drag to upload</span
            >
          </n-text>

          <n-p depth="3" style="margin: 8px 0 0 0; font-weight: 500">
            supports only .xsl and .csv (max. 5mb)
          </n-p>
        </n-upload-dragger>
      </n-upload>

      <button
        @click="uploadFile"
        class="border-2 border-[rgba(35,136,255,1)] cursor-pointer bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] text-center font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px] rounded-md w-full"
      >
        Upload Staff
      </button>
    </n-modal>
  </form>
</template>
<script setup>
import { ref, reactive, onMounted, watch, computed, h } from "vue";
import { addStaff } from "@/apis/admin.js";
import { useMessage } from "naive-ui";
import Orbit from "@/assets/imgs/Orbit.png";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { getAllStaff, getStaffById, importStaff } from "@/apis/admin.js";

const message = useMessage();
const loading = ref(false);
const loadingFile = ref(false);
const csvFilePreview = ref(null);

const importState = ref(false);

const departmentCodes = ref([
  { label: "ENG", value: "2" },
  { label: "COM", value: "3" },
  { label: "BUS ADMIN", value: "4" },
]);
const employmentType = ref([
  { label: "Full Time", value: "full_time" },
  { label: "Part Time", value: "part_time" },
  { label: "Contract", value: "contract" },
]);
const status = ref([
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
]);

const csvFile = ref("");
const staffData = ref([]);
const form = reactive({
  date: null,
  search: null,
  dept_code: null,
  is_active: false,
  status: null,
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
  csvFile.value = options.file.file;
  console.log(csvFile.value);
  csvFilePreview.value = URL.createObjectURL(csvFile.value);
};

const uploadFile = async () => {
  if (!csvFile.value) {
    return;
  }
  const formData = new FormData();
  formData.append("file", csvFile.value);
  loadingFile.value = true;
  try {
    const res = await importStaff(formData);
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
    const res = await getAllStaff({
      dept_code: form.dept_code,
      employment_type: form.employment_type,
      search: form.search,
    });
    staffData.value = res;
    console.log(res, "Beans");
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
  fetchStaffData();
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
