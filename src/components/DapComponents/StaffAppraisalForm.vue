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
      id=""
      class=""
    >
      <div class="flex justify-between items-center gap-[10px]">
        <div class="flex flex-col  gap-[10px]">
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
        <!-- <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button> -->
      </div>

      <div class="personal_information">
        <div class="">
          <h2
            class="text-[rgba(17,27,73,1)] my-[20px] text-[20px] font-[700] leading-[100%] tracking-[0%]"
          >
            Personal Information
          </h2>
          <div class="image my-[10px]">
            <img
              :src="Img"
              class="object-contain w-[300px] h-[184px]"
              alt=""
            />
          </div>

          <div class="flex flex-col  gap-[20px] py-[20px]">
            <div class="name flex justify-between items-center">
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
            <div class="gender flex justify-between items-center">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Faculty</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                Faculty of Physical Science
              </span>
            </div>
            <div class="dob flex justify-between items-center">
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
            <div class="email flex justify-between items-center">
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
            <div class="phone flex justify-between items-center">
              <span
                class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                >Appraised By</span
              >
              <span
                class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >
                HOD, Computer Science
              </span>
            </div>
          </div>
          <div class="my-[10px]">
            <h2
              class="font-[700] text-[16px] leading-[120%] tracking-[-2%] text-[rgba(27,37,89,1)]"
            >
              HOD Comment
            </h2>
            <n-input
              type="text"
              :borderd="false"
              placeholder="Highly productive; excellent research and mentoring."
              class="bg-[rgba(161,161,170,0.09)] text-[rgba(161,161,170,1)] px-[12px] py-[15px] w-full mt-[10px]"
            />
          </div>
          <div class="flex justify-between gap-[10px]">
            <div class="flex items-center gap-[10px]">
              <h2
                class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
              >
                Dean’s Rating
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
                  class="cursor-pointer w-full accent-green-500"
                /><span class="max">5</span>
              </div>
            </div>
          </div>
          <div class="my-[10px]">
            <h2
              class="font-[700] text-[16px] leading-[120%] tracking-[-2%] text-[rgba(27,37,89,1)]"
            >
              Dean Comment
            </h2>
            <n-input
              type="text"
              :borderd="false"
              placeholder="Highly productive; excellent research and mentoring."
              class="bg-[rgba(161,161,170,0.09)] text-[rgba(161,161,170,1)] px-[12px] py-[15px] w-full mt-[10px]"
            />
          </div>
          <div
            class="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-[20px]"
          >
            <button
              class="save_as_draft border-2 border-[rgba(35,136,255,1)] text-[rgba(35,136,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
            >
              Save as Draft
            </button>
            <button @click="Next"
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
  show: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "closeStaffAppraisalForm",
  "openScoreBreakdown_Approval",
]);
function closeModal() {
  emit("closeStaffAppraisalForm");
  
}
function Next() {
  emit("closeStaffAppraisalForm");
  emit("openScoreBreakdown_Approval");
}
</script>
