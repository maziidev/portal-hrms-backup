<template>
  <n-modal
    :show="show1"
    preset="card"
    title="Open New Appraisal Cycle"
    class="!lg:w-[50%] md:w-[40%] rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <p
      class="text-[rgba(152,159,176,1)] text-[16px] font-[400] leading-[120%] tracking-[0%]"
    >
      Define the details of this appraisal period. Once opened, department heads
      and units will be able to start appraising their staff
    </p>

    <div class="personal_information mt-5">
      <div class="">
        <div class="basic_information">
          <div class="grid md:grid-cols-1 gap-[20px]">
            <div class="appraisal_title flex flex-col">
              <label for="appraisal_title"> Appraisal Title </label>
              <n-input
                :bordered="false"
                v-model:value="form.appraisalTitle"
                type="text"
                placeholder="2025 First Quarter Appraisal"
                class="bg-[rgba(248,248,249,1)] border"
              />
            </div>
            <div class="appraisal_type flex flex-col">
              <label for="appraisal_type"> Appraisal Type </label>
              <n-select
                v-model:value="form.appraisalType"
                :options="unitOptions"
                clearable
                :bordered="false"
                class="outline-none border cursor-pointer"
              >
              </n-select>
            </div>

            <div class="grid grid-cols-1 gap-[20px] md:grid-cols-2">
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
        </div>

        <div
          class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-[20px]"
        >
          <button
            @click="OpenSecondAppraisal"
            class="next border-2 border-[rgba(35,136,255,1)] rounded-md bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <!-- Units -->
  </n-modal>
</template>

<script setup>
import { reactive } from "vue";

/* ✅ THIS FIXES "show is not defined" */
const { show1, show4 } = defineProps({
  show1: {
    type: Boolean,
    required: true,
  },
  show4: {
    type: Boolean,
    required: true,
  },
});

const form = reactive({
  appraisalTitle: null,
  appraisalType: null,
  dateStarted: null,
  dateFinished: null,
});

const emit = defineEmits([
  "CloseModalForOpenAppriasal1",
  "CloseModalForOpenAppriasal2",
  "OpenAppraisalModal2",
]);

const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];

function openAppraisal() {
  console.log("Opening:", form);
  emit("update:show", false);
}
function OpenSecondAppraisal() {
  console.log("Opening:", form);

  emit("CloseModalForOpenAppriasal1");
  emit("OpenAppraisalModal2");
}
function closeModal() {
  emit("CloseModalForOpenAppriasal1");
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
