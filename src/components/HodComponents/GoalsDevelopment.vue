<template>
  <n-modal
    :show="show4"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div class="goals_development">
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
              class="w-10 h-10 flex items-center justify-center border-2 border-blue-300 rounded-full"
            >
              <i class="fa fa-check"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Goals & Development
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-blue-300"></div>

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
        <a href="#" class="session block flex items-center gap-[10px]">
          <i class="fas fa-chevron-left"></i>

          <button @click="Previous"
            class="back rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
            >Back</button
          >
        </a>
        <span
          class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
          >Goals & Development</span
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
          </div>
          <div class="my-3">
            <input
              type="text"
              placeholder="This year, I focused on improving student engagement through active class discussions and integrating digital tools. I plan to secure research grants next year."
              class="w-full bg-[rgba(161,161,170,0.09)] outline-none h-[47px] border-0 px-[12px] py-[15px] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px] mb-3">
              <!-- <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span> -->
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Training Needs Identified
              </h2>
            </div>
          </div>
          <div class="my-3">
            <input
              type="file"
              placeholder="Advanced Data Analysis (STATA / R Workshop)"
              class="w-full bg-[rgba(161,161,170,0.09)] outline-none h-[47px] border-0 px-[12px] py-[15px] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
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
                Recommended Professional Development
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
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <!-- <span
                      class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
                    ></span> -->
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Suggested Next Role / Promotion
              </h2>
            </div>
            <div>
              <select
                name="suggested_next_role"
                class="px-[17px] py-[11px] border border-[rgba(240,240,240,1)] outline-none cursor-pointer"
                id="suggested_next_role"
              >
                <option value="No Recommendation at this time">
                  No Recommendation at this time
                </option>
                <option value="Recommend for Promotion">
                  Recommend for Promotion
                </option>
                <option value="No Recommendation at this time">
                  No Recommendation at this time
                </option>
                <option value="Recommend for Higher Responsibility">
                  Recommend for Higher Responsibility
                </option>
                <option value="Recommend for Training before Promotion">
                  Recommend for Training before Promotion
                </option>
                <option value="Recommend for Sabbatical Leave">
                  Recommend for Sabbatical Leave
                </option>
                <option value="Recommend for Reassignment">
                  Recommend for Reassignment
                </option>
                <option value="Recommend for Leadership Role">
                  Recommend for Leadership Role
                </option>
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
          @click="Next"
          class="finish border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Finish
        </button>
      </div>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import Img from "@/assets/imgs/img.jpg";
const { show4 } = defineProps({
  show4: {
    type: Boolean,
  },
});

const emit = defineEmits(["closeGoalsDevelopment", "openSummarySubmission", "openConductDiscipline"]);
function closeModal() {
  emit("closeGoalsDevelopment");
}
function Next() {
  emit("closeGoalsDevelopment");
  emit("openSummarySubmission");
}
function Previous() {
  emit("closeGoalsDevelopment");
  emit("openConductDiscipline");
}
</script>
