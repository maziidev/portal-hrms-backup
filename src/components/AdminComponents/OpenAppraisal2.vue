<template>
  <n-modal
    :show="show4"
    preset="card"
    title="Open New Appraisal Cycle"
    class="lg:w-[50%]! md:w-[40%]! rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <p
      class="text-[rgba(152,159,176,1)] text-[16px] font-normal leading-[120%] tracking-[0%]"
    >
      Define the details of this appraisal period. Once opened, department heads
      and units will be able to start appraising their staff
    </p>

    <!-- Units -->
    <div class="mt-4">
      <label class="block mb-2">Departments / Units</label>
      <n-select
        v-model:value="form.units"
        :options="unitOptions"
        clearable
        multiple
        :bordered="false"
        class="custom-select border rounded"
      />
    </div>

    <!-- Instructions -->
    <div class="mt-4">
      <label class="block mb-2">Instructions</label>
      <n-input
        v-model:value="form.instructions"
        type="textarea"
        :bordered="false"
        placeholder="Your message here"
        class="custom-select border"
      />
    </div>

    <!-- Buttons -->
    <div class="grid gap-4 mt-5">
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
const { show4 } = defineProps({
  show4: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["CloseModalForOpenAppriasal2"]);

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
  emit("CloseModalForOpenAppriasal2");
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
