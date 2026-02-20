<template>
  <n-modal
    :show="show"
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
              Teaching, Research & Administrative Duties
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
              External Evaluation & Submission
            </p>
          </div>
        </div>
      </div>
      <div class="personal_information mt-[30px]">
        <h2
          class="text-[rgba(17,27,73,1)] font-[700] my-[10px] text-[16px] leading-[100%] tracking-[0%]"
        >
          Personal Information
        </h2>
        <div class="">
          <div class="image my-[10px]">
            <img
              src="./imgs/img.jpg"
              class="object-contain w-[300px] h-[184px]"
              alt=""
            />
          </div>
          <h2
            class="text-[rgba(24,24,27,1)] font-[500] text-[16px] leading-[100%] tracking-[0%] my-3 mt-[20px]"
          >
            ECF/ACA/0458
          </h2>
          <div
            class="flex flex-col gap-[10px] gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
          >
            <div class="name flex justify-between items-center gap-[10px]">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Full Name</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                Dr. (Mrs.) Tolulope Adetunji
              </span>
            </div>
            <div class="gender flex justify-between items-center gap-[10px]">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Position / Rank</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                Senior Lecturer
              </span>
            </div>
            <div class="flex justify-between items-center gap-[10px]">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Employment Type</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                Academic
              </span>
            </div>
            <div class="flex justify-between items-center gap-[10px]">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Date of Last Promotion</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                15th July 2021
              </span>
            </div>
            <div class="flex justify-between items-center gap-[10px]">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Year of Service</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                11 years
              </span>
            </div>
            <div class="flex justify-between items-center gap-[10px]">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Reporting Line</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                HOD, Economics (Self-supervised under Faculty of Social
                Sciences)
              </span>
            </div>
            <div class="flex justify-between items-center gap-[10px]">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Appraisal Period</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                January – December 2025
              </span>
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

const emit = defineEmits(["closeStaffInformationModal", "OpenTeachingResearchAndAdminstrativeDutiesModal"]);
function closeModal() {
  emit("closeStaffInformationModal");
  emit("OpenTeachingResearchAndAdminstrativeDutiesModal");
}
</script>
