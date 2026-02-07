<template>
  <n-modal
    :show="show1"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div class="">
      <div class="flex justify-between items-center gap-[10px]">
        <div class="flex flex-col gap-[10px]">
          <h2
            class="text-[rgba(24,24,27,1)] font-bold leading-[100%] tracking-[0%] text-[20px]"
          >
            Staff Appraisal Form - Dr. Jane Okafor
          </h2>
          <p
            class="text-[rgba(30,30,30,1)] font-normal leading-[120%] tracking-[0%] text-[16px]"
          >
            Department of Political Science | Appraisal Period: Jan–Dec 2025
          </p>
        </div>
        <!-- <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button> -->
      </div>

      <div class="flex my-[40px] items-center gap-2">
        <a href="#" class="session flex items-center gap-[10px]">
          <i class="fas fa-chevron-left"></i>

          <button
            @click="Previous"
            class="back rgba(107,114,128,1) font-normal text-[14px] leading-[100%] tracking-[0%]"
          >
            Back
          </button>
        </a>
        <span
          class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-bold"
          >Score Breakdown & Approval</span
        >
      </div>
      <div class="personal_information flex flex-col gap-[20px]">
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Teaching Effectiveness
              </h2>
            </div>
            <!-- Circular Rating -->
            <div class="relative w-20 h-20 flex items-center justify-center">
              <!-- Circular progress -->
              <div
                class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
              ></div>

              <!-- Inner white circle -->
              <div
                class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
              >
                <p class="text-sm font-semibold text-gray-800">75%</p>
              </div>

              <!-- Star at the end of the progress -->
              <i
                class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
                style="transform: rotate(270deg) translateX(40px)"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Research Output
              </h2>
            </div>
            <!-- Circular Rating -->
            <div class="relative w-20 h-20 flex items-center justify-center">
              <!-- Circular progress -->
              <div
                class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
              ></div>

              <!-- Inner white circle -->
              <div
                class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
              >
                <p class="text-sm font-semibold text-gray-800">75%</p>
              </div>

              <!-- Star at the end of the progress -->
              <i
                class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
                style="transform: rotate(270deg) translateX(40px)"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Supervision
              </h2>
            </div>
            <!-- Circular Rating -->
            <div class="relative w-20 h-20 flex items-center justify-center">
              <!-- Circular progress -->
              <div
                class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
              ></div>

              <!-- Inner white circle -->
              <div
                class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
              >
                <p class="text-sm font-semibold text-gray-800">75%</p>
              </div>

              <!-- Star at the end of the progress -->
              <i
                class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
                style="transform: rotate(270deg) translateX(40px)"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Contribution to Department
              </h2>
            </div>
            <!-- Circular Rating -->
            <div class="relative w-20 h-20 flex items-center justify-center">
              <!-- Circular progress -->
              <div
                class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
              ></div>

              <!-- Inner white circle -->
              <div
                class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
              >
                <p class="text-sm font-semibold text-gray-800">75%</p>
              </div>

              <!-- Star at the end of the progress -->
              <i
                class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
                style="transform: rotate(270deg) translateX(40px)"
              ></i>
            </div>
          </div>
        </div>
        <div>
          <div
            class="flex justify-between border-b flex-wrap md:flex-nowrap lg:flex-nowrap gap-[10px] my-[10px]"
          >
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(35,136,255,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Total Average
              </h2>
            </div>
            <!-- Circular Rating -->
            <div
              class="relative bg-[rgba(58,151,76,0.09)] flex justify-end p-[12px] w-[424px] items-center"
            >
              <p
                class="font-bold text-[16px] text-[rgba(58,151,76,1)] leading-[120%] tracking-[-2%]"
              >
                90%
              </p>
            </div>
          </div>
        </div>
        <div>
          <div
            class="flex justify-between flex-wrap md:flex-nowrap lg:flex-nowrap"
          >
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Supervisor’s Remarks
              </h2>
            </div>
            <div class="">
              <select
                name="approve"
                id="approve"
                class="cursor-pointer px-[17px] py-[11px] border border-[rgba(240,240,240,1)] text-[rgba(107,114,128,1)] text-[14px] font-normal leading-[100%] tracking-[0%] outline-none w-[404px]"
              >
                <option value="Approve">Approve</option>
                <option value="Approve">Approve</option>
              </select>
            </div>
          </div>
          <div class="my-3">
            <input
              type="text"
              placeholder="Enter your comment here"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
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
          class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Submit
        </button>
      </div>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import Img from "@/assets/imgs/img.jpg";
const { show } = defineProps({
  show1: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "closeScoreBreakdown_Approval",
  "openStaffAppraisalForm",
]);
function closeModal() {
  emit("closeScoreBreakdown_Approval");
}
function Previous() {
  emit("closeScoreBreakdown_Approval");
  emit("openStaffAppraisalForm");
}
</script>
