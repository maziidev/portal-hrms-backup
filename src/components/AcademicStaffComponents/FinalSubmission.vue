<template>
  <n-modal
    :show="show2"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div id="final_submission" action="#" class="final_submission">
      <div class="flex my-[20px] justify-center items-center gap-5">
        <span
          class="text-[rgba(17,27,73,1)] text-center w-full block text-[20px] leading-[100%] tracking-[0%] font-[700]"
          >Final Submission</span
        >
      </div>
      <div class="personal_information flex flex-col gap-[10px]">
        <p
          class="text-[rgba(152,159,176,1)] text-center text-[16px] font-[500] leading-[100%] tracking-[0%]"
        >
          Your appraisal record directly influences promotions, research
          funding, and annual recognition. Ensure accuracy and honesty in all
          entries
        </p>
        <p
          class="text-[rgba(24,24,27,1)] text-center w-full block text-[20px] leading-[100%] tracking-[0%] font-[700]"
        >
          Are you sure you want to submit
        </p>
      </div>
      <div
        class="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-[20px]"
      >
        <button
          class="save_as_draft border-2 border-[rgba(35,136,255,1)] text-[rgba(35,136,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          No, Save as Draft
        </button>
        <button
          class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Yes, Submit
        </button>
      </div>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import Img from "@/assets/imgs/img.jpg";
const { show2 } = defineProps({
  show2: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "openConductDiscipline",
  "closeTeachingResearch",
  "openPerformanceEvaluation",
]);
function closeModal() {
  emit("closeTeachingResearch");
}

function Next() {
  emit("closeTeachingResearch");
  emit("openConductDiscipline");
}
function Previous() {
  emit("closeTeachingResearch");
  emit("openPerformanceEvaluation");
}
</script>
