<template>
  <n-modal
    :show="show5"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div id="summary_submission" class="summary_submission">
      <div class="flex justify-between items-center gap-[10px]">
        <div class="flex flex-col gap-[10px]">
          <h2
            class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
          >
            Staff Appraisal Form - Dr. Jane Okafor
          </h2>
          <p
            class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
          >
            Department of Political Science | Appraisal Period: Jan–Dec 2025
          </p>
        </div>
        
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
              class="text-[rgba(58,151,76,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
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
              class="text-[rgba(58,151,76,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Performance Evaluation
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 3 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(58,151,76,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Teaching & Research
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 4 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(58,151,76,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Conduct & Discipline
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 5 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(58,151,76,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Goals & Development
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 6 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-blue-300 rounded-full"
            >
              <i class="fa fa-check"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Summary & Submission
            </p>
          </div>
        </div>
      </div>
      <div class="flex my-[40px] items-center gap-2">
        <!-- <a href="#" class="session block flex items-center gap-[10px]">
                <i class="fas fa-chevron-left"></i>

                <span
                  class="back rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
                  >Back</span
                >
              </a> -->
        <span
          class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
          >Summary & Submission</span
        >
      </div>
      <div class="personal_information flex flex-col gap-[10px]">
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px] mb-3">
              <!-- <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span> -->
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Staff Self-Appraisal Summary
              </h2>
            </div>

            <div class="relative w-20 h-20 flex items-center justify-center">
              <!-- Circular progress -->
              <div
                class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
              ></div>

              <!-- Inner white circle -->
              <div
                class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
              >
                <p class="text-sm font-semibold text-gray-800">4.7</p>
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
              <!-- <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span> -->
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Final HOD Remarks
              </h2>
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
        <div>
          <div class="flex justify-between w-full items-center">
            <div class="flex w-[50%] items-center gap-[10px]">
              <!-- <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span> -->
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Next Reviewer
              </h2>
            </div>
            <div class="w-[50%]">
              <input
                type="text"
                placeholder="Dean, Faculty of Social Sciences"
                class="w-full outline-none w-full border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <!-- <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span> -->
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Promotion Recommendation
              </h2>
            </div>
            <div>
              <select
                name="promotion_recommendation"
                class="px-[17px] py-[11px] border border-[rgba(240,240,240,1)] outline-none cursor-pointer"
                id="promotion_recommendation"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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
          @click="Done"
          class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Submit Appraisal
        </button>
      </div>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import Img from "@/assets/imgs/img.jpg";
const { show5 } = defineProps({
  show5: {
    type: Boolean,
  },
});

const emit = defineEmits(["closeSummarySubmission"]);
function closeModal() {
  emit("closeSummarySubmission");
}
function Done() {
  emit("closeSummarySubmission");
}
</script>
