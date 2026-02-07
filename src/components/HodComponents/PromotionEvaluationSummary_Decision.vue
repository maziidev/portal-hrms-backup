<template>
  <n-modal
    :show="show2"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div
      id="evaluation_summary_decision"
      action="#"
      class="evaluation_summary_decision"
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
        <!-- <button class="text-[rgba(30,30,30,1)] close text-[20px]">
                  x
                </button> -->
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
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(58,151,76,1)] font-bold leading-[120%] text-[11px] tracking-[0%]"
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
          >Evaluation Summary/Decision</span
        >
      </div>
      <div class="personal_information flex flex-col gap-[10px]">
        <div>
          <div class="flex justify-between items-center gap-[10px]">
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
            <div class="flex flex-col items-center">
              <span class="range_value">3</span>
              <div class="flex items-center gap-[3px]">
                <span class="min">0</span
                ><input
                  type="range"
                  min="0"
                  max="5"
                  value="3"
                  step="1"
                  name="scale"
                  id="scale"
                  class="cursor-pointer text-green-500 bg-green-500"
                /><span class="max">5</span>
              </div>
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
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Research / Publications
              </h2>
            </div>
            <div class="flex flex-col items-center">
              <span class="range_value">3</span>
              <div class="flex items-center gap-[3px]">
                <span class="min">0</span
                ><input
                  type="range"
                  min="0"
                  max="5"
                  value="3"
                  step="1"
                  name="scale"
                  id="scale"
                  class="cursor-pointer text-green-500 bg-green-500"
                /><span class="max">5</span>
              </div>
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
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Community Service
              </h2>
            </div>
            <div class="flex flex-col items-center">
              <span class="range_value">3</span>
              <div class="flex items-center gap-[3px]">
                <span class="min">0</span
                ><input
                  type="range"
                  min="0"
                  max="5"
                  value="3"
                  step="1"
                  name="scale"
                  id="scale"
                  class="cursor-pointer text-green-500 bg-green-500"
                /><span class="max">5</span>
              </div>
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
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <span
                class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Conduct / Discipline
              </h2>
            </div>
            <div class="flex flex-col items-center">
              <span class="range_value">3</span>
              <div class="flex items-center gap-[3px]">
                <span class="min">0</span
                ><input
                  type="range"
                  min="0"
                  max="5"
                  value="3"
                  step="1"
                  name="scale"
                  id="scale"
                  class="cursor-pointer text-green-500 bg-green-500"
                /><span class="max">5</span>
              </div>
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
        <div class="mb-[15px]">
          <div class="grid grid-cols-2 gap-[10px] items-center">
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Total Score
              </h2>
            </div>
            <div class="flex flex-col items-center">
              <input
                type="number"
                placeholder="60/100"
                class="cursor-pointer w-full px-[12px] py-[15px] text-[rgba(161,161,170,1)] bg-[rgba(161,161,170,0.09)]"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-[10px] items-center">
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
              >
                Decision
              </h2>
            </div>
            <div class="flex flex-col items-center">
              <select
                class="cursor-pointer w-full px-[17px] py-[11px] border text-[rgba(107,114,128,1)] bg-[rgba(255,255,255,1)] font-normal text-[14px]"
              >
                <option value="Endorse">Endorse</option>
                <option value="Reject">Reject</option>
                <option value="Return for Review">Return for Review</option>
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
        class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-[20px]"
      >
        <button
          class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Submit Decision
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
  "closePromotionEvaluationSummary_Decision",
  "openPromotionRequestDetails",
]);
function closeModal() {
  emit("closePromotionEvaluationSummary_Decision");
}

function Next() {}
function Previous() {
  emit("closePromotionEvaluationSummary_Decision");
  emit("openPromotionRequestDetails");
}
</script>
