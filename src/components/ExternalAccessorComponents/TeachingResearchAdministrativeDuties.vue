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
                <div
                  class="flex flex-col gap-[10px] items-center text-blue-600"
                >
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
                <div
                  class="flex flex-col gap-[10px] items-center text-blue-600"
                >
                  <div
                    class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(30,30,30,1)] rounded-full"
                  >
                    <i class="fa fa-check text-[rgba(30,30,30,1)]"></i>
                  </div>
                  <p
                    class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
                  >
                    Teaching, Research & Administrative Duties
                  </p>
                </div>
                <div class="flex-1 h-[2px] bg-[rgba(141,193,255,0.27)]"></div>

                <!-- Step 3 -->
                <div
                  class="flex flex-col gap-[10px] items-center text-blue-600"
                >
                  <div
                    class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(141,193,255,0.27)] rounded-full"
                  >
                    <i class="fa fa-check text-[rgba(141,193,255,0.27)]"></i>
                  </div>
                  <p
                    class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
                  >
                    External Evaluation & Submission
                  </p>
                </div>
              </div>
            </div>
            <div
              class="bg-[var(--twhite)] mt-[20px] py-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div class="w-full overflow-hidden">
                <h2
                  class="text-[rgba(27,37,89,1)] mb-[-20px] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Teaching & Research Breakdown
                </h2>
                <div class="overflow-x-auto">
                  <table
                    class="min-w-full text-left whitespace-nowrap border-spacing-y-[20px] border-separate"
                  >
                    <thead>
                      <tr class="p-5">
                        <th class="p-5">
                          Course Code <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Course Title <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Session <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Semester <i class="fa fa-caret-down"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="p-5">
                        <td class="p-5">MEE 421</td>

                        <td class="p-5">Thermodynamics I</td>
                        <td class="p-5">2024/2025</td>

                        <td class="p-5">1st</td>
                      </tr>
                      <tr class="p-5">
                        <td class="p-5">MEE 421</td>

                        <td class="p-5">Thermodynamics I</td>
                        <td class="p-5">2024/2025</td>

                        <td class="p-5">1st</td>
                      </tr>
                      <tr class="p-5">
                        <td class="p-5">MEE 421</td>

                        <td class="p-5">Thermodynamics I</td>
                        <td class="p-5">2024/2025</td>

                        <td class="p-5">1st</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="bg-[var(--twhite)] mt-[1px] py-[0px] mb-[10px] gap-[10px] flex flex-col justify-between"
            >
              <div class="w-full overflow-hidden">
                <h2
                  class="text-[rgba(27,37,89,1)] mb-[-20px] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Research Contributions
                </h2>
                <div class="overflow-x-auto">
                  <table
                    class="min-w-full text-left whitespace-nowrap border-spacing-y-[20px] border-separate"
                  >
                    <thead>
                      <tr class="">
                        <th class="p-5">
                          year <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Publications <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Citation Count <i class="fa fa-caret-down"></i>
                        </th>
                        <th class="p-5">
                          Avg Impact Factor <i class="fa fa-caret-down"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="p-5">
                        <td class="p-5">2025</td>

                        <td class="p-5">Thermodynamics I</td>
                        <td class="p-5">421</td>

                        <td class="p-5">3.2</td>
                      </tr>
                      <tr class="p-5">
                        <td class="p-5">2025</td>

                        <td class="p-5">Thermodynamics I</td>
                        <td class="p-5">421</td>

                        <td class="p-5">3.2</td>
                      </tr>
                      <tr class="p-5">
                        <td class="p-5">2025</td>

                        <td class="p-5">Thermodynamics I</td>
                        <td class="p-5">421</td>

                        <td class="p-5">3.2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="top flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Administrative Duties
                </h2>
                <div class="flex flex-items gap-2">
                  <button class="toggle-data hidden">
                    <i class="fa fa-chevron-down"></i></button
                  ><button class="toggle-data">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div
                class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
              >
                <div class="name flex justify-between items-center gap-[10px]">
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Departmental Examinations Officer</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    2019–2022
                  </span>
                </div>
                <div
                  class="gender flex justify-between items-center gap-[10px]"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Faculty Representative (Curriculum Board)</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    2021–Present
                  </span>
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




const { show } = defineProps({
  show2: {
    type: Boolean,
  },
});

const emit = defineEmits(["closeTeachingResearchAndAdminstrativeDutiesModal", "OpenExternalEvaluationSubmissionModal"]);
function closeModal() {
  emit("closeTeachingResearchAndAdminstrativeDutiesModal");
  emit("OpenExternalEvaluationSubmissionModal");
}
</script>
