<template>
  <n-modal
    :show="show"
    preset="card"
    title="Add New Publication"
    class="!lg:w-[50%] md:w-[40%] h-[700px] overflow-auto rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <p
      class="text-[rgba(30,30,30,1)] font-normal leading-[120%] tracking-[0%] text-[16px]"
    >
      Submit your research work for verification and record update
    </p>
    <div class="flex my-[40px] justify-center items-center gap-2">
      <span
        class="text-[rgba(17,27,73,1)] text-[20px] leading-[100%] tracking-[0%] font-bold"
        >Basic Publication Details</span
      >
    </div>
    <n-form ref="form" :model="formData">
      <div class="personal_information flex flex-col gap-[10px]">
        <div>
          <n-form-item
            label="Publication Title"
            path="publication_title"
            class="my-3"
          >
            <n-input
              type="text"
              :v-model:value="formData.publication_title"
              :bordered="false"
              placeholder="Enter the full title of your publication"
              class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item
            label="Type of Publication"
            path="type_of_publication"
            class="my-3"
          >
            <n-select
              :options="types_of_publication"
              :v-model="formData.type_of_publication"
              :bordered="false"
              placeholder="Journal Article"
              class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            >
            </n-select>
          </n-form-item>
        </div>
        <div>
          <n-form-item
            label="Date of Publication"
            path="date_of_publication"
            class="my-3"
          >
            <n-date-picker
              :v-model="formData.date_of_publication"
              type="date"
              placeholder="DD-MM-YYYY"
              :bordered="false"
              class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>

        <div>
          <n-form-item
            label="Publisher / Journal Name"
            path="publisher"
            class="my-3"
          >
            <n-input
              :v-model="formData.publisher"
              :bordered="false"
              placeholder="E.g. Elsevier, Springer Nature, Oxford Press"
              class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item
            label="ISSN / ISBN Number (optional)"
            path="issn"
            class="my-3"
          >
            <n-input
              type="number"
              :v-model="formData.issn"
              :bordered="false"
              placeholder="Enter Number"
              class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="Volume / Issue / Page" path="volume" class="my-3">
            <n-input
              type="text"
              :v-model="formData.volume"
              :bordered="false"
              placeholder="E.g. Vol. 4, Issue 3, pp. 102–118"
              class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="DOI Link / URL" path="url" class="my-3">
            <n-input
              type="text"
              :v-model:value="formData.url"
              :bordered="false"
              placeholder="https://"
              class="w-full outline-none border font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
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
          @click="NextModal"
          class="next border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
        >
          Next
        </button>
      </div>
    </n-form>
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

const emit = defineEmits([
  "closeAddNewPublication",
  "openContributionAndResearchContextModal",
]);

const formData = reactive({
  units: [],
  url: "",
  volume: "",
  issn: "",
  publisher: "",
  date_of_publication: null,
  type_of_publication: null,
  publication_title: null,
});

const types_of_publication = ref([
  {
    label: "Journals Article",
    value: "Journals Article",
  },
]);

const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];

function NextModal() {
  emit("openContributionAndResearchContextModal");
  emit("closeAddNewPublication");
}
function closeModal() {
  emit("closeAddNewPublication");
  console.log("Beans");
}
function saveDraft() {
  console.log("Saving Draft:", form);
  emit("update:show", false);
}

const save = async () => {
  try {
    await form.value?.validate();

    message.success("Saved successfully");
  } catch (error) {
    message.error("Data not saved");
  }
};

const rules = {
  url: [
    {
      type: "url",
      message: "input a valid url",
      trigger: "input",
    },
    {
      required: true,
      message: "url is required",
      trigger: "blur",
    },
  ],
  type_of_publication: [
    {
      required: true,
      message: "Type of Publication is required",
      trigger: "blur",
    },
  ],
  volume: [
    {
      required: true,
      message: "Volume is required",
      trigger: "blur",
    },
  ],
  issn: [
    {
      required: true,
      message: "issn is required",
      trigger: "blur",
    },
  ],
  publisher: [
    {
      required: true,
      message: "publisher is required",
      trigger: "blur",
    },
  ],
  date_of_publication: null,
  type_of_publication: null,
  publication_title: [
    {
      required: true,
      message: "Publication Title is required",
      trigger: "blur",
    },
  ],
};
</script>

<style scoped>
.custom-select .n-base-selection,
.custom-select .n-input {
  border: 2px solid rgba(35, 136, 255, 1);
  border-radius: 8px;
  background: rgba(248, 248, 249, 1);
}
</style>
