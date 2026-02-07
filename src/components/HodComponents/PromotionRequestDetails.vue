<template>
  <n-modal
    :show="show1"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div
      id="promotion_request_details"
      action="#"
      class="promotion_request_details"
    >
      <div class="flex justify-between items-center gap-[10px]">
        <div class="flex flex-col gap-[10px]">
          <h2
            class="text-[rgba(24,24,27,1)] font-bold leading-[100%] tracking-[0%] text-[20px]"
          >
            Promotion Review
          </h2>
          <p
            class="text-[rgba(30,30,30,1)] font-normal leading-[120%] tracking-[0%] text-[16px]"
          >
            ACD-015 (Dr. Helen Eze)
          </p>
        </div>
        <!-- <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button> -->
      </div>

      <div class="progress mt-[20px]">
        <div class="flex items-center justify-between w-full">
          <!-- Step 1 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(58,151,76,1)] font-bold leading-[120%] text-[11px] tracking-[0%]"
            >
              Staff Information
            </p>
          </div>

          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 2 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(141,193,255,0.27)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(141,193,255,0.27)]"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-bold leading-[120%] text-[11px] tracking-[0%]"
            >
              Promotion Request Details
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(141,193,255,0.27)]"></div>

          <!-- Step 3 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(141,193,255,0.27)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(141,193,255,0.27)]"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-bold leading-[120%] text-[11px] tracking-[0%]"
            >
              Evaluation Summary/Decision
            </p>
          </div>
        </div>
      </div>
      <div class="flex my-[40px] items-center gap-2">
        <a href="#" class="session back flex items-center gap-[10px]">
          <i class="fas fa-chevron-left"></i>

          <button
            @click="Previous"
            class="rgba(107,114,128,1) font-normal text-[14px] leading-[100%] tracking-[0%]"
          >
            Back
          </button>
        </a>
        <span
          class="text-[rgba(20,21,15,1)] text-[20px] leading-[120%] tracking-[0%] font-bold"
          >Promotion Request Details</span
        >
      </div>
      <div
        class="flex flex-col gap-[30px] border-b py-[20px] border-[rgba(240,240,240,1)]"
      >
        <div class="name flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Requested Rank</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Senior Lecturer
          </span>
        </div>
        <div class="gender flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Total Publications</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            8
          </span>
        </div>

        <div class="reason w-full flex flex-col gap-2">
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Reason</span
          >
          <input
            placeholder="Taking w-full  annual rest as per HR schedule."
            class="text-[rgba(24,24,27,0.27)] outline-none bg-[rgba(248,248,249,1)] font-[500] text-[14px] px-[15px] py-[5px] leading-[100%] h-[80px] tracking-[0%]"
          />
        </div>

        <div class="flex justify-between items-center gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Supporting Documents
            </h2>
          </div>
          <div class="flex flex-col items-center">
            <span
              class="range_value text-[rgba(35,136,255,1)] font-bold text-[16px] leading-[120%] tracking-[0%]"
              >5</span
            >
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:grid-cols-2">
          <div class="flex flex-col gap-[10px]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-5">
                <span
                  class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
                ></span>
                <p
                  class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  CV
                </p>
              </div>
              <div class="view">
                <button
                  class="view bg-[rgba(35,136,255,1)] px-[20px] py-[10px] rounded-[5px] text-[rgba(255,255,255,1)] font-bold text-[14px] leading-[100%] tracking-[0%]"
                >
                  view
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-5">
                <span
                  class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
                ></span>
                <p
                  class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  Teaching Evaluations
                </p>
              </div>
              <div class="view">
                <button
                  class="view bg-[rgba(35,136,255,1)] px-[20px] py-[10px] rounded-[5px] text-[rgba(255,255,255,1)] font-bold text-[14px] leading-[100%] tracking-[0%]"
                >
                  view
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[10px]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-5">
                <span
                  class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
                ></span>
                <p
                  class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  Publication List
                </p>
              </div>
              <div class="view">
                <button
                  class="view bg-[rgba(35,136,255,1)] px-[20px] py-[10px] rounded-[5px] text-[rgba(255,255,255,1)] font-bold text-[14px] leading-[100%] tracking-[0%]"
                >
                  view
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-5">
                <span
                  class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
                ></span>
                <p
                  class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  Appraisal Report
                </p>
              </div>
              <div class="view">
                <button
                  class="view bg-[rgba(35,136,255,1)] px-[20px] py-[10px] rounded-[5px] text-[rgba(255,255,255,1)] font-bold text-[14px] leading-[100%] tracking-[0%]"
                >
                  view
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="verified flex items-center justify-between">
          <div class="">
            <h2
              class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >
              Verified by DAP
            </h2>
          </div>
          <div class="flex items-center gap-[10px]">
            <span
              class="w-[24px] h-[24px] p-[8px] border-2 border-[rgba(58,151,76,1)] flex justify-center items-center rounded-full"
              ><i class="fa text-[14px] fa-check text-[rgba(58,151,76,1)]"></i
            ></span>
            <p
              class="text-[rgba(58,151,76,1)] font-[500] leading-[100%] tracking-[0%]"
            >
              Confirmed
            </p>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-[20px]"
      >
        <button
          class="save_as_draft border-2 border-[rgba(35,136,255,1)] text-[rgba(35,136,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Save as Draft
        </button>
        <button
          @click="Next"
          class="next border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Next
        </button>
      </div>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import Img from "@/assets/imgs/img.jpg";
const { show1 } = defineProps({
  show1: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "closePromotionRequestDetails",
  "openPromotionEvaluationSummary_Decision",
  "openPromotionReview",
]);
function closeModal() {
  emit("closePromotionRequestDetails");
}

function Next() {
  emit("closePromotionRequestDetails");
  emit("openPromotionEvaluationSummary_Decision");
}
function Previous() {
  emit("closePromotionRequestDetails");
  emit("openPromotionReview");
}
</script>
