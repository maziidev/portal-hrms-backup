<template>
  <n-modal
    :show="show3"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div
      class="bg-[var(--twhite)] p-[20px] shadow-sm border-b mb-[10px] border-slate-100 gap-[10px] flex flex-col justify-between"
    >
      <div class="flex p-[10px] gap-[20px] items-center">
        <!-- <button
          class="bg-[rgba(17,27,73,1)] close text-white rounded-full px-[9px] py-[2px] flex items-center justify-center"
        >
          x
        </button> -->
        <h2
          class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
        >
          Staff Evaluation Form – Dr. Jane Okafor
        </h2>
        <p
          class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
        >
          Department of Education Management & Policy
        </p>
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
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Staff Information
            </p>
          </div>

          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 2 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Teaching, Research & Administrative Duties
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 3 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(30,30,30,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(30,30,30,1)]"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              External Evaluation & Submission
            </p>
          </div>
        </div>
      </div>
      <div class="personal_information flex flex-col gap-[20px]">
        <h2
          class="text-[rgba(27,37,89,1)] mt-[40px] mb-[-10px] font-[700] text-[20px] leading-[100%] tracking-[0%]"
        >
          Performance Overview
        </h2>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
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
          <div class="my-1">
            <input
              type="text"
              placeholder="Consistently achieves positive student feedback."
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
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
          <div class="my-1">
            <input
              type="text"
              placeholder="Published 3 peer-reviewed papers this session."
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
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
          <div class="my-1">
            <input
              type="text"
              placeholder="Adequate supervision record for final-year projects."
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
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
          <div class="my-1">
            <input
              type="text"
              placeholder="Supported new curriculum design committee."
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(161,161,170,1)] font-[500] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Dean’s Remark
              </h2>
            </div>
          </div>
          <div class="my-2">
            <input
              type="text"
              placeholder="Approved – replacement arranged, no academic disruption expected"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <!-- <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span> -->
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                HOD Remarks
              </h2>
            </div>
          </div>
          <div class="my-3">
            <textarea
              type="text"
              placeholder="Taking annual rest as per HR schedule."
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[77px] bg-[rgba(248,248,249,1)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            ></textarea>
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Decision
              </h2>
            </div>
            <div class="">
              <select
                name="approve"
                id="approve"
                class="cursor-pointer px-[17px] py-[11px] border border-[rgba(240,240,240,1)] text-[rgba(107,114,128,1)] text-[14px] font-[400] leading-[100%] tracking-[0%] outline-none w-[404px]"
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
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
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
  show3: {
    type: Boolean,
  },
});

const emit = defineEmits(["closeExternalEvaluationSubmissionModal"]);
function closeModal() {
  emit("closeExternalEvaluationSubmissionModal");
}
</script>
