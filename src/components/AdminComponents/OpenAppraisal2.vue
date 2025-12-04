<template>
  <!-- Open New Appraisal Cycle 2 -->
  <div
    :show="show"
    id="appraisal_cycle_2"
    class="appraisal_cycle_2 fixed overflow-y-auto border rounded-md lg:w-[50%] w-full md:w-[80%] p-10 bg-white md:top-[10%] lg:top-[10%] lg:left-[30%] left-[0%] md:left-[30%] top-[0%] h-[100vh] md:h-[80vh] lg:h-[80vh] z-[20000]"
  >
    <div class="flex justify-between items-center my-[20px]">
      <div class="flex flex-col gap-[20px] gap-[10px]">
        <h2
          class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
        >
          Open New Appraisal Cycle
        </h2>
        <p
          class="text-[rgba(152,159,176,1)] text-[16px] font-[400] leading-[120%] tracking-[0%]"
        >
          Define the details of this appraisal period. Once opened, department
          heads and units will be able to start appraising their staff
        </p>
      </div>
      <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button>
    </div>

    <div class="personal_information">
      <div class="">
        <div class="basic_information">
          <div class="grid md:grid-cols-1 gap-[20px]">
            <div class="units flex flex-col">
              <label for="units"> Departments/Units Involved </label>
              <n-select
                :options="unitOptions"
                placeholder="Select a unit"
                clearable
                class="custom-select"
              >
              </n-select>
            </div>

            <div class="Instructions flex flex-col">
              <label for="Instructions"> Instructions </label>
              <n-input
                type="textarea"
                :border="false"
                class="bg-[rgba(248,248,249,1)] p-[15px]"
                placeholder="Your message here"
                :rows="4"
              />
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-[20px]"
        >
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.custom-select .n-base-select {
  outline: none;
  background-color: rgba(248, 248, 249, 1);
  cursor: pointer;
  padding: 15px;
}
</style>
