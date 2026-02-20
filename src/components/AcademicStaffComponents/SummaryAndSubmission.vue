<template>
  <n-modal
    :show="show5"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div id="summary_submission" action="#" class="summary_submission">
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
        <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button>
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
              Teaching & Research Performance
            </p>
          </div>

          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 2 -->
          <div
            class="flex flex-col gap-[10px] items-center text-[rgba(58,151,76,1)]"
          >
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(58,151,76,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Administrative & Community Service
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

          <!-- Step 3 -->
          <div
            class="flex flex-col gap-[10px] items-center text-[rgba(58,151,76,1)]"
          >
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-[rgba(58,151,76,1)] rounded-full"
            >
              <i class="fa fa-check text-[rgba(58,151,76,1)]"></i>
            </div>
            <p
              class="text-[rgba(58,151,76,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Professional Development
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

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
              Summary & Submission
            </p>
          </div>
        </div>
      </div>

      <div class="flex my-[40px] items-center gap-5">
        <a href="#" class="back flex items-center gap-[10px]">
          <i class="fa fa-chevron-left"></i>
          <span
            @click="previous"
            class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
            >Back</span
          >
        </a>
        <span
          class="text-[rgba(17,27,73,1)] text-center w-full block text-[20px] leading-[100%] tracking-[0%] font-[700]"
          >Summary & Submission</span
        >
      </div>
      <n-form rules="rules" ref="form" :model="formData">
        <div class="personal_information flex flex-col gap-[10px]">
          <div>
            <div class="">
              <div class="flex items-center gap-[10px]">
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                >
                  Self-Comment
                </h2>
              </div>
            </div>
            <div class="my-3">
              <textarea
                placeholder="Your message here"
                class="w-full outline-none border-0 px-[12px] py-[15px] h-[82px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
              ></textarea>
            </div>
          </div>
          <div>
            <div class="">
              <div class="flex items-center justify-between gap-[10px]">
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                >
                  Upload supporting documents
                </h2>
                <button>
                  <i
                    class="fa fa-plus text-[rgba(35,136,255,1)] text-[16px]"
                  ></i>
                </button>
              </div>
            </div>
            <div
              id="drop-zone"
              class="my-3 relative w-full px-[24px] py-[14px] bg-[rgba(248,248,249,1)]"
            >
              <input
                type="file"
                id="file"
                accept=".pdf,.doc,.docx,.txt, image/* "
                aria-hidden="false"
                class="w-full absolute inset-0 opacity-0 cursor-pointer outline-none border-0 px-[12px] py-[15px] bg-[rgba(248,248,249,1)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
              />
              <!-- Visual content -->
              <div class="pointer-events-none flex flex-col items-center gap-1">
                <div
                  class="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-2xl text-gray-600 shadow-sm"
                >
                  <i class="fas fa-arrow-up-from-bracket"></i>
                </div>

                <div class="flex flex-col items-center gap-[5px]">
                  <div class="flex items-center gap-[10px]">
                    <span
                      class="text-[rgba(0,149,255,1)] text-[14px] font-[500]"
                    >
                      Click to upload
                    </span>
                    <p class="text-sm text-gray-500">
                      or
                      <span
                        class="text-[14px] font-[500] text-[rgba(71,84,103,1)]"
                        >or drag and drop</span
                      ><br />
                    </p>
                  </div>
                  <span
                    class="text-[12px] leading-[18px] font-[500] text-[rgba(71,84,103,1)]"
                  >
                    supports only .pdf or .CSV
                  </span>
                </div>

                <!-- filename preview -->
                <div id="file-info" class="mt-3 text-sm text-gray-600"></div>
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
            @click="comfirmSubmission"
            class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
          ></button>
        </div>

        <!-- Confirm Submission Modal -->
        <n-modal :show="showConfirmModal">
          <button
            @click="submit"
            class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
          ></button>
        </n-modal>
      </n-form>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import Img from "@/assets/imgs/img.jpg";

const showConfirmModal = ref(false);
const { show5 } = defineProps({
  show5: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "closeSummaryAndSubmission",
  "openProfessionalDevelopment",
]);
function closeModal() {
  emit("closeSummaryAndSubmission");
}
async function save() {
  loading.value = true;
  try {
    await form.value.validate();
    loading.value = false;
    message.success("Saved successfully");
  } catch (error) {
    loading.value = true;
    message.success("Data not saved");
  }
}
function comfirmSubmission() {
  emit("closeTeachingResearch");
  showConfirmModal.value = true;
}
function submit() {
  showConfirmModal.value = false;
}
function Previous() {
  emit("closeSummaryAndSubmission");
  emit("openProfessionalDevelopment");
}
</script>
