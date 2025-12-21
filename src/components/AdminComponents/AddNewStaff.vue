<template>
  <n-modal
    :show="show2"
    preset="card"
    title="Add New Staff"
    class="!lg:w-[50%] md:w-[40%] rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <p
      class="text-[rgba(152,159,176,1)] text-[16px] font-[400] leading-[120%] tracking-[0%]"
    >
      Capture essential staff details, upload appointment documents, and create
      a unique ID instantly
    </p>

    <div class="grid md:grid-cols-2 my-4 gap-[10px]">
      <div class="mb-4">
        <label class="block mb-2">Full Name</label>
        <n-input
          v-model:value="form.instructions"
          type="text"
          :bordered="false"
          placeholder="Your message here"
          class="custom-select border"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2">Phone Number</label>
        <n-input
          v-model:value="form.instructions"
          type="text"
          :bordered="false"
          placeholder="Your message here"
          class="custom-select border"
        />
      </div>
      <!-- Units -->
      <div class="mb-4">
        <label class="block mb-2">Gender</label>
        <n-select
          v-model:value="form.units"
          :options="unitOptions"
          multiple
          clearable
          :bordered="false"
          class="custom-select border"
        />
      </div>
      <!-- Date Input -->
      <div class="mb-4">
        <label class="block mb-2">Date of Birth</label>
        <n-date-picker
          v-model:value="form.startDate"
          type="date"
          placeholder="Select a date"
          :bordered="false"
          class="custom-select w-full border"
        />
      </div>
    </div>

    <!-- Buttons -->
    <div class="grid gap-4">
      <button
        class="open_appraisal border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
      >
        Open Appraisal
      </button>

      <button
        class="save_as_draft border-2 border-[rgba(35,136,255,1)] bg-[rgba(255,255,255,1)] text-[rgba(35,136,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
      >
        Save as Draft
      </button>
    </div>
  </n-modal>
</template>

<script setup>
import { reactive } from "vue";

/* ✅ THIS FIXES "show is not defined" */
const { show2 } = defineProps({
  show2: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["CloseModalForAddNewStaff"]);

const form = reactive({
  units: [],
  instructions: "",
});

const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];

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
</script>

<style scoped>
.custom-select .n-base-selection,
.custom-select .n-input {
  border: 2px solid rgba(35, 136, 255, 1);
  border-radius: 8px;
  background: rgba(248, 248, 249, 1);
}
</style>
