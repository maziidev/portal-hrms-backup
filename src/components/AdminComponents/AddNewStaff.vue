<template>
  
    <n-modal
      :show="show2"
      preset="card"
      title="Add New Staff"
      class="lg:w-[50%]! md:w-[40%]! rounded-md"
      :mask-closable="true"
      :closable="true"
      :loading="loading"
      :disabled="loading"
      @close="closeModal"
    >
    <n-spin size="large" class="absolute top-[50%] left-[50%]" v-if="loading"></n-spin>
      <p
        class="text-[rgba(152,159,176,1)] text-[16px] font-normal leading-[120%] tracking-[0%]"
      >
        Capture essential staff details, upload appointment documents, and
        create a unique ID instantly
      </p>
      <n-form ref="formRef" :model="form" :rules="rules">
        <div class="basic_information">
          <h2
            class="text-[rgba(24,24,27,1)] text-[16px] font-[600] leading-[120%] tracking-[0%] my-[15px]"
          >
            Basic Information
          </h2>
          <div class="grid md:grid-cols-2 my-4 gap-[10px]">
            <div class="mb-1">
              <n-form-item path="first_name" label="First Name"
                ><n-input
                  v-model:value="form.first_name"
                  type="text"
                  :bordered="false"
                  placeholder="Enter your first name"
                  class="custom-select border"
              /></n-form-item>
            </div>
            <div class="mb-1">
              <n-form-item
                path="last_name"
                label="Last Name"
                class="block mb-2"
              >
                <n-input
                  v-model:value="form.last_name"
                  :bordered="false"
                  type="text"
                  placeholder="Enter your last name"
                  class="custom-select border"
                />
              </n-form-item>
            </div>
            <div class="mb-1">
              <n-form-item path="other_name" label="Other Name"
                ><n-input
                  v-model:value="form.other_name"
                  type="text"
                  :bordered="false"
                  placeholder="Enter your other name"
                  class="custom-select border"
              /></n-form-item>
            </div>
            <div class="mb-1">
              <n-form-item
                path="phone_number"
                label="Phone Number"
                class="block mb-2"
              >
                <n-input
                  v-model:value="form.phone_number"
                  :bordered="false"
                  type="number"
                  placeholder="Your phone number"
                  class="custom-select border"
                />
              </n-form-item>
            </div>
            <div class="mb-1">
              <n-form-item path="email" label="Email"
                ><n-input
                  v-model:value="form.email"
                  type="text"
                  :bordered="false"
                  placeholder="Enter your email"
                  class="custom-select border"
              /></n-form-item>
            </div>

            <!-- Units -->
            <div class="mb-1">
              <n-form-item label="Gender" path="gender" class=""
                ><n-select
                  v-model:value="form.gender"
                  :options="gender"
                  clearable
                  :bordered="false"
                  class="custom-select border"
              /></n-form-item>
            </div>

            <div class="mb-1">
              <n-form-item
                path="dept_code"
                label="Department Code"
                class="block mb-2"
              >
                <n-input
                  v-model:value="form.dept_code"
                  :bordered="false"
                  type="text"
                  placeholder="Your department code. E.g ENG"
                  class="custom-select border"
                />
              </n-form-item>
            </div>
          </div>
        </div>
        <div class="professional_details">
          <h2
            class="text-[rgba(24,24,27,1)] text-[16px] font-[600] leading-[120%] tracking-[0%] my-[15px]"
          >
            Professional Details
          </h2>
          <div class="grid md:grid-cols-2 my-4 gap-[10px]">
            <div class="">
              <n-form-item label="Department / Unit" path="department_unit">
                <n-input
                  v-model:value="form.department_unit"
                  type="text"
                  :bordered="false"
                  placeholder="Please enter staff Department / Unit"
                  class="custom-select border"
                />
              </n-form-item>
            </div>
            <div class="">
              <n-form-item
                label="Role / Position (Optional)"
                path="role"
                class="block"
              >
                <n-input
                  v-model:value="form.role"
                  type="text"
                  :bordered="false"
                  placeholder="Please enter staff role"
                  class="custom-select border"
              /></n-form-item>
            </div>
            <!-- Units -->
            <div class="">
              <n-form-item label="Employment Type" path="employment_type">
                <n-select
                  v-model:value="form.employment_type"
                  null
                  :options="employmentTypes"
                  clearable
                  placeholder="Select Employment Type"
                  :bordered="false"
                  class="custom-select border"
                />
              </n-form-item>
            </div>
            <!-- Date Input -->
            <div class="mb-4">
              <n-form-item label="Date of Employment" path="date_of_employment">
                <n-date-picker
                  v-model:value="form.date_of_employment"
                  type="date"
                  placeholder="Select a date"
                  :bordered="false"
                  class="custom-select w-full border"
                />
              </n-form-item>
            </div>
          </div>
        </div>
      </n-form>

      <!-- Buttons -->
      <div class="grid gap-4">
        <button
          @click="AddStaff"
          class="create_staff border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Create Staff
        </button>
      </div>
    </n-modal>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { addStaff } from "@/apis/admin.js";
import { useMessage } from "naive-ui";

const loading = ref(false);
const message = useMessage();
const formRef = ref(null);
/* ✅ THIS FIXES "show is not defined" */
const { show2 } = defineProps({
  show2: {
    type: Boolean,
    required: true,
  },
});

const gender = ref([
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
]);
const employmentTypes = ref([
  { label: "Full Time", value: "Full Time" },
  { label: "Part Time", value: "Part Time" },
]);

const emit = defineEmits(["CloseModalForAddNewStaff"]);

const form = reactive({
  employment_type: null,
  gender: null,
  first_name: "",
  full_name: "",
  startDate: null,
  department_unit: "",
  role: "",
  date_of_employment: null,
  dept_code: "",
  date_of_birth: null,
  email: "",
  phone_number: "",
});

watch(
  [() => form.first_name, () => form.last_name, () => form.other_name],
  (newVal) => {
    form.full_name = `${newVal[0]} ${newVal[1]} ${newVal[2]}`;
  },
);

function openAppraisal() {
  console.log("Opening:", form);
  emit("update:show", false);
}
function closeModal() {
  emit("CloseModalForAddNewStaff");
  console.log("Beans");
}
function saveDraft() {
  console.log("Saving Draft:", form);
  emit("update:show", false);
}

const AddStaff = async () => {
  console.log("Beans");
  try {
    loading.value = true;

    await formRef.value?.validate();
    const data = await addStaff(form);
    console.log("Staff added successfully", data);
    message.success("Staff added successfully");
    loading.value = false;
  } catch (error) {
    console.log(error);
    message.error(error.message || "Staff not added");
  } finally {
    loading.value = false;
  }
};

const rules = {
  employment_type: [
    {
      required: true,
      message: "Employement type is required",
      trigger: "blur",
    },
  ],
  gender: [
    {
      required: true,
      message: "Gender is required",
      trigger: "blur",
    },
  ],
  role: [
    {
      required: true,
      message: "Role is required",
      trigger: "blur",
    },
  ],
  first_name: [
    {
      required: true,
      message: "First name is required",
      trigger: ["blur", "input"],
    },
    {
      min: 3,
      message: "First name must be at least 3 characters",
      trigger: "blur",
    },
    {
      validator: (rule, value) => {
        if (!/^[A-Za-z]{3,}$/.test(value)) {
          return new Error("First name must contain only letters");
        }
        return true;
      },
      trigger: "input",
    },
  ],
  last_name: [
    {
      required: true,
      message: "Last name is required",
      trigger: ["blur", "input"],
    },
    {
      min: 3,
      message: "Last name must be at least 3 characters",
      trigger: "blur",
    },
    {
      validator: (rule, value) => {
        if (!/^[A-Za-z]{3,}$/.test(value)) {
          return new Error("First name must contain only letters");
        }
        return true;
      },
      trigger: "input",
    },
  ],
  other_name: [
    {
      required: true,
      message: "Other name is required",
      trigger: ["blur", "input"],
    },
    {
      min: 3,
      message: "Other name must be at least 3 characters",
      trigger: "blur",
    },
    {
      validator: (rule, value) => {
        if (!/^[A-Za-z]{3,}$/.test(value)) {
          return new Error("First name must contain only letters");
        }
        return true;
      },
      trigger: "input",
    },
  ],

  dept_code: {
    required: true,
    message: "Department code is required",
    trigger: "blur",
  },
  date_of_birth: {
    validator(rule, value) {
      if (!value) {
        return new Error("Date of birth is required");
      }

      const formatted = new Date(value).toISOString().split("T")[0];

      const regex = /^\d{4}-\d{2}-\d{2}$/;

      if (!regex.test(formatted)) {
        return new Error("Date has wrong format. Use: YYYY-MM-DD");
      }

      return true;
    },
    trigger: ["change", "blur"],
  },
  email: [
    {
      type: "email",
      message: "Enter a valid email",
      trigger: "input",
    },
    {
      required: true,
      message: "Email is required",
      trigger: "blur",
    },
  ],
  phone_number: [
    {
      validator: (rule, value) => {
        if (!/^(\+234|0)[789][01]\d{8}$/.test(value)) {
          return new Error("Invalid phone number");
        }
        return true;
      },
      trigger: "input",
    },
  ],
  startDate: [
    {
      validator(rule, value) {
        if (!value) {
          return new Error("Start date is required");
        }

        // Convert to full ISO and remove milliseconds and Z
        const formatted = new Date(value).toISOString().split(".")[0]; // "YYYY-MM-DDTHH:mm:ss"

        // Regex to match exactly YYYY-MM-DDTHH:mm:ss
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

        if (!regex.test(formatted)) {
          return new Error(
            "Datetime has wrong format. Use: YYYY-MM-DDTHH:mm:ss",
          );
        }

        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
  date_of_employment: [
    {
      validator(rule, value) {
        if (!value) {
          return new Error("Date of employment is required");
        }

        // Convert to full ISO and remove milliseconds and Z
        const formatted = new Date(value).toISOString().split(".")[0]; // "YYYY-MM-DDTHH:mm:ss"

        // Regex to match exactly YYYY-MM-DDTHH:mm:ss
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

        if (!regex.test(formatted)) {
          return new Error(
            "Datetime has wrong format. Use: YYYY-MM-DDTHH:mm:ss",
          );
        }

        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
  date_of_birth: [
    {
      validator(rule, value) {
        if (!value) {
          return new Error("Date of birth is required");
        }

        // Convert to full ISO and remove milliseconds and Z
        const formatted = new Date(value).toISOString().split(".")[0]; // "YYYY-MM-DDTHH:mm:ss"

        // Regex to match exactly YYYY-MM-DDTHH:mm:ss
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

        if (!regex.test(formatted)) {
          return new Error(
            "Datetime has wrong format. Use: YYYY-MM-DDTHH:mm:ss",
          );
        }

        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
  department_unit: [
    {
      required: true,
      message: "Department / Unit is required",
      trigger: "blur",
    },
  ],
};
</script>

<style scoped>
.custom-select .n-base-selection,
.custom-select .n-input {
  border: 2px solid rgba(35, 136, 255, 1);
  border-radius: 8px;
  background: rgba(248, 248, 249, 1);
}
</style>
