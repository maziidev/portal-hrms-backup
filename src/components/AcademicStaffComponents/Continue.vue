<template>
  <n-modal
    :show="show"
    preset="card"
    title="Continue Appraisal for: Dr. (Mrs.) T. Adetunji"
    class="!lg:w-[50%] md:w-[40%] h-[700px] overflow-auto rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <div id="continue_appraisal">
      <p
        class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
      >
        Last saved: 03 Oct 2025, 2:45 PM
      </p>
      <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button>
      <div class="mt-[20px]">
        <div class="">
          <h2
            class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
          >
            Tabs completed
          </h2>
        </div>
        <div class="my-3">
          <input
            type="text"
            placeholder="Staff Info, Performance, Teaching & Research"
            class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(58,151,76,1)]"
          />
        </div>
      </div>
      <div>
        <div class="">
          <h2
            class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
          >
            Tabs remaining
          </h2>
        </div>
        <div class="my-3">
          <input
            type="text"
            placeholder="Conduct, Goals & Development, Summary"
            class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(58,151,76,1)]"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-[20px]"
      >
        <button
          class="save_as_draft border-2 border-[rgba(35,136,255,1)] text-[rgba(35,136,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Discard Draft
        </button>
        <button
          class="next border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Continue
        </button>
      </div>
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
