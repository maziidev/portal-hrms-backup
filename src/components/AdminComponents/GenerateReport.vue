<template>
  <n-modal
    :show="show3"
    preset="card"
    title="Generate Report"
    class="!lg:w-[50%] md:w-[40%] rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    

    <div class="personal_information">
      <div class="">
        <div class="basic_information">
          <div class="grid md:grid-cols-2 gap-[20px]">
            <div class="report_type flex flex-col">
              <label for="report_type"> Choose Report Type </label>
              <n-select :border="false" :v-modal:value="form.appraisal" :options="unitOptions"
                class=" outline-none border-none cursor-pointer "
              >
                
              </n-select>
            </div>
            <div class="unit flex flex-col">
              <label for="unit"> Department / Unit </label>
              <n-input :border="false" :v-modal:value="form.unit"
                type="text"
                placeholder="Please enter staff Department / Unit"
                class="bg-[rgba(248,248,249,1)] border-none"
              />
            </div>
            <div class="status flex flex-col">
              <label for="status"> Status </label>
              <n-select :border="false" :v-modal:value="form.status" :options="unitOptions"
                class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer "
              >
              </n-select>
            </div>

            <div class="output_format flex flex-col">
              <label for="output_format"> Select Output Format </label>
              <n-select :border="false" :v-modal:value="form.status" :options="unitOptions"
                class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer "
              >
                <option value="PDF">PDF</option>
              </n-select>
            </div>
            <div class="date_start flex flex-col">
                <label for="date_start"> Date Start </label>
                <n-date-picker
                  v-model:value="form.startDate"
                  type="date"
                  placeholder="DD-MM-YYYY"
                  :bordered="false"
                  class="custom-select w-full border"
                />
              </div>
              <div class="date_finish flex flex-col">
                <label for="date_finish"> Date Finish </label>
                <n-date-picker
                  v-model:value="form.startDate"
                  type="date"
                  placeholder="DD-MM-YYYY"
                  :bordered="false"
                  class="custom-select w-full border"
                />
              </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-[20px]"
        >
          <button
            class="download_report border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
          >
            Download Report
          </button>
        </div>
      </div>
    </div>

    
  </n-modal>
</template>

<script setup>
import { reactive } from "vue";

/* ✅ THIS FIXES "show is not defined" */
const { show3 } = defineProps({
  show3: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["CloseModalForGenerateReport"]);

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
  emit("CloseModalForGenerateReport");
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


