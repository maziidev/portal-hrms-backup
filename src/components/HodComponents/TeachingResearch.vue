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
      id="appraisal_form_teaching_research"
      action="#"
      class="appraisal_form_teaching_research"
    >
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
              class="w-10 h-10 flex items-center justify-center border-2 border-blue-300 rounded-full"
            >
              <i class="fa fa-check"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Teaching & Research
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-blue-300"></div>

          <!-- Step 4 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-blue-300 rounded-full"
            >
              <i class="fa fa-check"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Conduct & Discipline
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-blue-300"></div>

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
        <a href="#" class="session back block flex items-center gap-[10px]">
          <i class="fas fa-chevron-left"></i>

          <button @click="Previous"
            class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
            >Back</button
          >
        </a>
        <span
          class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
          >Teaching & Research</span
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Courses Handled
              </h2>
            </div>
            <div>
              <h3
                class="font-[700] text-[rgba(35,136,255,1)] text-[16px] leading-[120%] tracking-[0%]"
              >
                3
              </h3>
            </div>
          </div>
          <div class="my-3 flex flex-col gap-5 my-2">
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                ECO 301 – Microeconomic Theory II
              </p>
            </div>
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                ECO 411 – Development Economics
              </p>
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Student Feedback Summary
              </h2>
            </div>
            <div>
              <h3
                class="font-[700] text-[rgba(35,136,255,1)] text-[16px] leading-[120%] tracking-[0%]"
              >
                3
              </h3>
            </div>
          </div>
          <div class="my-3 flex flex-col gap-5 my-2">
            <div class="flex items-center gap-5">
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                4% positive; praised for clarity and mentorship.
              </p>
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Publications
              </h2>
            </div>
            <div>
              <h3
                class="font-[700] text-[rgba(35,136,255,1)] text-[16px] leading-[120%] tracking-[0%]"
              >
                5
              </h3>
            </div>
          </div>
          <div class="my-3 flex flex-col gap-5 my-2">
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                ECO 301 – Microeconomic Theory II
              </p>
            </div>
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                ECO 411 – Development Economics
              </p>
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Conferences Attended
              </h2>
            </div>
            <div>
              <h3
                class="font-[700] text-[rgba(35,136,255,1)] text-[16px] leading-[120%] tracking-[0%]"
              >
                2
              </h3>
            </div>
          </div>
          <div class="my-3 flex flex-col gap-5 my-2">
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                ECO 301 – Microeconomic Theory II
              </p>
            </div>
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                ECO 411 – Development Economics
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center gap-5">
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
            <div>
              <h3
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                8 undergraduate projects, 2 MSc theses.
              </h3>
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
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Community / Faculty Engagement
              </h2>
            </div>
          </div>
          <div class="my-3 flex flex-col gap-5 my-2">
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                Member, Faculty Quality Assurance Committee
              </p>
            </div>
            <div class="flex items-center gap-5">
              <span
                class="w-[12px] h-[12px] rounded-full px-[4px] py-[4px] bg-[rgba(35,136,255,1)]"
              ></span>
              <p
                class="font-[500] text-[rgba(161,161,170,1)] text-[14px] leading-[120%] tracking-[-2%]"
              >
                Secretary, National Quality Assurance Committee
              </p>
            </div>
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
const { show2 } = defineProps({
  show2: {
    type: Boolean,
  },
});

const emit = defineEmits(["openConductDiscipline", "closeTeachingResearch", "openPerformanceEvaluation"]);
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
