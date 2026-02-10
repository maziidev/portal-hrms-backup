<template>
  <n-modal
    :show="show"
    preset="card"
    title="Apply for Promotion"
    class="!lg:w-[50%] md:w-[40%] h-[700px] overflow-auto rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <p
      class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
    >
      Submit a promotion request. Ensure all details are accurate before
      submission
    </p>
    <div class="flex my-[40px] justify-center items-center gap-2">
      <span
        class="text-[rgba(17,27,73,1)] text-[20px] leading-[100%] tracking-[0%] font-[700]"
        >Leave Details</span
      >
    </div>
    <div class="personal_information mt-[20px] flex flex-col gap-[10px]">
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Current Rank
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="text"
            :borderd="false"
            :v-model:value="form.current_rank"
            placeholder="Lecturer I"
            class="w-full outline-none font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Applying For
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-select
            type="text"
            :options="promotionOptions"
            :v-model-value="form.applying_for"
            :borderd="false"
            placeholder="Explain in details, press enter to start input another in cases of multiple"
          >
          </n-select>
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Date of Last Promotion
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-date-picker
            v-model:value="form.date_of_last_promotion"
            type="date"
            placeholder="Start Date"
            :bordered="false"
            class="custom-select w-full border"
          />
        </div>
      </div>
      
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Summary of Academic Contributions
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="textarea"
            :bordered="false"
            :v-model:value="form.reason_for_leave"
            placeholder="Your message here"
            class="w-full outline-none border px-[12px] py-[15px] h-[82px] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          ></n-input>
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center justify-between gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Supporting Documents
            </h2>
            <button>
              <i class="fa fa-plus text-[rgba(35,136,255,1)] text-[16px]"></i>
            </button>
          </div>
        </div>
        <div id="drop-zone" class="my-3 relative w-full">
          <n-upload
            :default-upload="false"
            directory-dnd
            accept=".pdf, .csv"
            :max="5"
            @change="handleDocumentUpload"
          >
            <n-upload-dragger
              style="border-radius: 20px; padding: 20px; text-align: center"
            >
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <div
                    class="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-2xl text-gray-600 shadow-sm"
                  >
                    <i class="fas fa-arrow-up-from-bracket"></i>
                  </div>
                </n-icon>
              </div>

              <n-text class="text-[rgba(71,84,103,1)]" style="font-size: 16px">
                <span class="text-[rgba(0,149,255,1)] text-[14px] font-[500]">
                  Click to upload
                </span>
                <p class="text-sm text-gray-500">
                  or
                  <span class="text-[14px] font-[500] text-[rgba(71,84,103,1)]"
                    >or drag and drop</span
                  ><br />
                </p>
              </n-text>

              <n-p depth="3" style="margin: 8px 0 0 0; font-weight: 500">
                <span
                  class="text-[12px] leading-[18px] font-[500] text-[rgba(71,84,103,1)]"
                >
                  supports only .pdf or .CSV
                </span>
              </n-p>
            </n-upload-dragger>
          </n-upload>
          <span v-if="documentPreview" class="block mt-2">
            <img
              :src="documentPreview"
              class="h-24 w-24 object-cover rounded-lg"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="terms flex mt-[10px] items-center gap-2">
        <input
          type="checkbox"
          name="terms"
          id="terms"
          class="w-6 accent-blue-500 border-2 border-[rgba(141,193,255,1)] cursor-pointer h-6"
        />
        <label
          for="terms"
          class="text-[rgba(24,24,27,1)] cursor-pointer font-[500] text-[16px] leading-[100%] tracking-[0%]"
        >
          I confirm that all submitted details are accurate
        </label>
      </div>
    <div class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-[20px]">
      <button
        @click="submit"
        class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
      >
        Submit Promotion Application
      </button>
    </div>
  </n-modal>
</template>

<script setup>
import { reactive, ref } from "vue";

/* ✅ THIS FIXES "show is not defined" */
const { show } = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const supportingDocument = ref(null);
const documentPreview = ref(null);

const emit = defineEmits(["closeApplyForPromotion", "openApplyForLeave"]);

const form = reactive({
  endDate: null,
  date_of_last_promotion: null,
  leave_type: null,
  phone_number: null,
  current_rank: null,
  reason_for_leave: null,
});

function handleDocumentUpload(options) {
  const file = options.file.file;
  supportingDocument.value = file;
  documentPreview.value = URL.createObjectURL(supportingDocument.value);
}

const promotionOptions = ref([
  {
    label: "Lecturer I",
    value: "Lecturer I",
  },
  {
    label: "Lectuere II",
    value: "Lectuere II",
  },
]);

const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];

function submit() {
  emit("closeApplyForPromotion");
}
function closeModal() {
  emit("closeApplyForPromotion");
  console.log("Beans");
}
function saveDraft() {
  console.log("Saving Draft:", form);
  emit("update:show", false);
}
</script>

<style scoped>
.custom-select .n-base-selection,
.custom-select .n-input {
  border: 2px solid rgba(35, 136, 255, 1);
  border-radius: 8px;
  background: rgba(248, 248, 249, 1);
}
</style>
