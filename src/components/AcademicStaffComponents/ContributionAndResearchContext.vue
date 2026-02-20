<template>
  <n-modal
    :show="show1"
    preset="card"
    title="Add New Publication"
    class="!lg:w-[50%] md:w-[40%] rounded-md h-[700px] overflow-auto"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <p
      class="text-[rgba(30,30,30,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
    >
      Submit your research work for verification and record update
    </p>
    <div class="flex my-[40px] items-center gap-5">
      <a href="#" class=" back  w-[100px] flex items-center gap-[10px]">
        <i class="fa fa-chevron-left"></i>
        <button @click="moveToPreviousModel"
          class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
          >Back</button
        >
      </a>
      <span
        class="text-[rgba(17,27,73,1)] text-center w-full block text-[20px] leading-[100%] tracking-[0%] font-[700]"
        >Contribution and Research Context</span
      >
    </div>
    <div class="personal_information flex flex-col gap-[10px]">
      <div>
        <div class="">
          <div class="flex items-center gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Authors / Co-Authors
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="text"
            :v-model:value="form.author"
            :bordered="false"
            placeholder="Input authors, co-authors details, press enter to start input another in cases of multiple"
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
              Your Role in Publication
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-select
            :options="yearRoleInPublication"
            :v-model="form.year_in_publication"
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
              Affiliated Department / Faculty
            </h2>
          </div>
        </div>
        <div class="my-3">
          <p
            class="w-full py-[15px] h-[47px] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(24,24,27,1)]"
          >
            Department Of Automobile Engineering , Faculty of Engineering
          </p>
        </div>
      </div>
      <div>
        <div class="">
          <div class="flex items-center justify-between gap-[10px]">
            <h2
              class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Research Area / Keywords
            </h2>
            <div class="flex items-center gap-3">
              <span
                class="ml-3 ai_suggestion text-[14px] font-[400] text-gray-700"
              >
                AI Suggestion
              </span>
              <label class="relative inline-flex items-center cursor-pointer">
                <n-switch
                  id="toggle_research_area"
                  type="checkbox"
                  :v-model:value="aiSuggestion"
                  
                />
              </label>
            </div>
          </div>
        </div>
        <div class="my-3">
          <n-input
            :v-model:value="form.keywords"
            :bordered="false"

            placeholder="Press enter after every keyword to input the next one"
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
              Abstract
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="textarea"
            placeholder="Choose Date"
            :v-model="form.abstract"
            :bordered = "false"
            class="w-full outline-none border px-[12px] py-[15px]  font-[400] h-[100px] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
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
            :bordered = false
            placeholder="E.g. Elsevier, Springer Nature, Oxford Press"
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
              ISSN / ISBN Number (optional)
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="number"
            :v-model="form.issn"
            placeholder="Enter Number"
            :bordered = false
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
              Volume / Issue / Page
            </h2>
          </div>
        </div>
        <div class="my-3">
          <n-input
            type="text"
            :v-model="form.volume"
            :bordered = false

            placeholder="E.g. Vol. 4, Issue 3, pp. 102–118"
            class="w-full outline-none border font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
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
        @click="Next"
        class="next border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
      >
        Next
      </button>
    </div>
  </n-modal>
</template>

<script setup>
import { reactive, ref } from "vue";

/* ✅ THIS FIXES "show is not defined" */
const { show1 } = defineProps({
  show1: {
    type: Boolean,
    required: true,
  },
});

const aiSuggestion = ref(false);

const emit = defineEmits(["CloseModalForAddNewStaff"]);

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

const yearRoleInPublication = ref([
  {
    label: "Lead Author",
    value: "Lead Author",
  },
]);

const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];

function moveToPreviousModel() {
  emit("closeContributionAndResearchContextModal");
  emit("openAddNewPublication");

}
function closeModal() {
  emit("closeContributionAndResearchContextModal");
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
