<template>
  <n-modal
    :show="show1"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div id="leave_details" action="#" class="leave_details">
      <div class="flex justify-between items-center gap-[10px]">
        <div class="flex flex-col gap-[10px]">
          <h2
            class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
          >
            Leave Request
          </h2>
          <p
            class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
          >
            Review & Decision
          </p>
        </div>
        <!-- <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button> -->
      </div>

      <div class="progress mt-[20px]">
        <div class="flex items-center justify-between w-full">
          <!-- Step 1 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(30,30,30,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(30,30,30,1)]"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Staff Information
            </p>
          </div>

          <div class="flex-1 h-[2px] bg-[rgba(141,193,255,0.27)]"></div>

          <!-- Step 2 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(141,193,255,0.27)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(141,193,255,0.27)]"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Leave Details
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
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Leave Balance/Approval
            </p>
          </div>
        </div>
      </div>
      <div class="flex my-[40px] items-center gap-2">
        <a href="#" class="session back flex items-center gap-[10px]">
          <i class="fas fa-chevron-left"></i>

          <button
            @click="Previous"
            class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
          >
            Back
          </button>
        </a>
        <span
          class="text-[rgba(20,21,15,1)] text-[20px] leading-[120%] tracking-[0%] font-[700]"
          >Leave Details</span
        >
      </div>
      <div
        class="flex flex-col gap-[30px] border-b py-[20px] border-[rgba(240,240,240,1)]"
      >
        <div class="name flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Type</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Annual Leave
          </span>
        </div>
        <div class="gender flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Start Date</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            10 Oct 2025
          </span>
        </div>
        <div class="dob flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >End Date</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            10 Oct 2025
          </span>
        </div>
        <div class="duration flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Duration</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            30 Days
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
  "closeLeaveDetails",
  "openLeaveBalanceApproval",
  "openLeaveRequest",
]);
function closeModal() {
  emit("closeLeaveDetails");
}

function Next() {
  emit("closeLeaveDetails");
  emit("openLeaveBalanceApproval");
}
function Previous() {
  emit("closeLeaveDetails");
  emit("openLeaveRequest");
}
</script>
