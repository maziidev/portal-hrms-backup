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
      class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
    >
      Submit your research work for verification and record update
    </p>
    <div class="flex my-[40px] justify-center items-center gap-2">
      <span
        class="text-[rgba(17,27,73,1)] text-[20px] leading-[100%] tracking-[0%] font-[700]"
        >Basic Publication Details</span
      >
    </div>
    <div class="personal_information flex flex-col gap-[10px]">
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Publication Title
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="text" 
            :v-model:value="form.publication_title"
            :bordered="false"
            placeholder="Enter the full title of your publication"
            class="w-full outline-none border font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Type of Publication
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-select
            :options="journals"
            :v-model="form.type_of_publication"
            :bordered="false"

            placeholder="Journal Article"
            class="w-full outline-none border font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
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
              Date of Publication
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-date-picker
            :v-model="form.date_of_publication"
            type="date"
            placeholder="DD-MM-YYYY"
            :bordered="false"
            class="w-full outline-none border   font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>

      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Publisher / Journal Name
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            :v-model="form.publisher"
            :bordered = "false"

            placeholder="E.g. Elsevier, Springer Nature, Oxford Press"
            class="w-full outline-none border  font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              ISSN / ISBN Number (optional)
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="number"
            :v-model="form.issn"
            :bordered = "false"
            placeholder="Enter Number"
            class="w-full outline-none border   font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Volume / Issue / Page
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="text"
            :v-model="form.volume"
            :bordered="false"
            placeholder="E.g. Vol. 4, Issue 3, pp. 102–118"
            class="w-full outline-none border  font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              DOI Link / URL
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="text"
            :v-model:value="form.url"
            :bordered="false"

            placeholder="https://"
            class="w-full outline-none border   font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-[20px]">
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
  </n-modal>
</template>

<script setup>
import { reactive,ref } from "vue";

/* ✅ THIS FIXES "show is not defined" */
const { show } = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeAddNewPublication", "openContributionAndResearchContextModal"]);

const form = reactive({
  units: [],
  url: "",
  volume: "",
  issn: "",
  publisher: "",
  date_of_publication: null,
  type_of_publication: null,
  publication_title: null,
});

const journals = ref([
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
</script>

<style scoped>
.custom-select .n-base-selection,
.custom-select .n-input {
  border: 2px solid rgba(35, 136, 255, 1);
  border-radius: 8px;
  background: rgba(248, 248, 249, 1);
}
</style>
