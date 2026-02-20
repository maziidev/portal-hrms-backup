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
            class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
          >
            Promotion Review
          </h2>
          <p
            class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
          >
            ACD-015 (Dr. (Mrs.) Ifeoma Nwosu)
          </p>
        </div>
        <!-- <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button> -->
      </div>

      <div class="flex my-[40px] items-center gap-2">
        <span
          class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
          >Promotion Assessment</span
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
                Community Service
              </h2>
            </div>
            <div
              class="relative bg-[rgba(58,151,76,0.09)] flex justify-end py-[10px] px-[20px] items-center"
            >
              <p
                class="font-[700] text-[16px] text-[rgba(58,151,76,1)] leading-[120%] tracking-[-2%]"
              >
                Excellent
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Dean’s Recommendation
              </h2>
            </div>
            <div
              class="relative bg-[rgba(58,151,76,0.09)] flex justify-end py-[10px] px-[20px] items-center"
            >
              <p
                class="font-[700] text-[16px] text-[rgba(58,151,76,1)] leading-[120%] tracking-[-2%]"
              >
                Approved
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="">
            <input
              type="text"
              placeholder="Meets all promotion requirements"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </div>
        </div>
        <div class="py-[7px]">
          <div class="top flex justify-between">
            <h2
              class="text-[rgba(17,27,73,1)] uppercase font-[700] text-[16px] leading-[100%] tracking-[0%]"
            >
              Attached Documents:
            </h2>
            <div class="flex flex-items gap-2">
              <button class="toggle-data">
                <i class="fa fa-chevron-down"></i></button
              ><button class="toggle-data hidden">
                <i class="fa fa-chevron-up"></i>
              </button>
            </div>
          </div>
          <div
            class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
          >
            <div
              class="expected_retirement_date flex justify-between items-center"
            >
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Appraisal Summary Report
              </span>
              <div class="flex items-center gap-[10px]">
                <a href="#" download="download"
                  ><i class="fa fa-download text-[var(--sec-text)]"></i
                ></a>
                <span
                  class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                  >View</span
                >
              </div>
            </div>
            <div
              class="expected_retirement_date flex justify-between items-center"
            >
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Publication List</span
              >
              <div class="flex items-center gap-[10px]">
                <a href="#" download="download"
                  ><i class="fa fa-download text-[var(--sec-text)]"></i
                ></a>
                <span
                  class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                  >View</span
                >
              </div>
            </div>
            <div
              class="expected_retirement_date flex justify-between items-center"
            >
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Master’s Certificate</span
              >
              <div class="flex items-center gap-[10px]">
                <a href="#" download="download"
                  ><i class="fa fa-download text-[var(--sec-text)]"></i
                ></a>
                <span
                  class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                  >View</span
                >
              </div>
            </div>
            <div
              class="expected_retirement_date flex justify-between items-center"
            >
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >PHD Certificate</span
              >
              <div class="flex items-center gap-[10px]">
                <a href="#" download="download"
                  ><i class="fa fa-download text-[var(--sec-text)]"></i
                ></a>
                <span
                  class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                  >View</span
                >
              </div>
            </div>
            <div
              class="expected_retirement_date flex justify-between items-center"
            >
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Thesis Documents</span
              >
              <div class="flex items-center gap-[10px]">
                <a href="#" download="download"
                  ><i class="fa fa-download text-[var(--sec-text)]"></i
                ></a>
                <span
                  class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                  >View</span
                >
              </div>
            </div>

            <div>
              <div class="flex justify-between gap-[10px]">
                <div class="flex items-center gap-[10px]">
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                  >
                    Recommendation
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
  show1: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "closePromotionAssessment",
  "openStaffAppraisalForm",
]);
function closeModal() {
  emit("closePromotionAssessment");
}
function Previous() {
  emit("closePromotionAssessment");
  emit("openStaffAppraisalForm");
}
</script>
