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
      id="teaching_research_performance"
      action="#"
      class="teaching_research_performance"
    >
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

          <div class="flex-1 h-[2px] bg-blue-300"></div>

          <!-- Step 2 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-blue-300 rounded-full"
            >
              <i class="fa fa-check"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Administrative & Community Service
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-blue-300"></div>

          <!-- Step 3 -->
          <div class="flex flex-col gap-[10px] items-center text-blue-600">
            <div
              class="w-10 h-10 flex items-center justify-center border-2 border-blue-300 rounded-full"
            >
              <i class="fa fa-check"></i>
            </div>
            <p
              class="text-[rgba(24,24,27,1)] font-[700] leading-[120%] text-[11px] tracking-[0%]"
            >
              Professional Development
            </p>
          </div>
          <div class="flex-1 h-[2px] bg-blue-300"></div>

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
      <div class="flex my-[40px] justify-center items-center gap-2">
        <span
          class="text-[rgba(17,27,73,1)] text-[20px] leading-[100%] tracking-[0%] font-[700]"
          >Teaching & Research Performance</span
        >
      </div>
      <n-form
        ref="formRef"
        :rules="rules"
        :model="formData"
        class="personal_information flex flex-col gap-[10px]"
      >
        <div>
          <n-form-item label="Courses Taught" path="courses_taught">
            <n-input
              v-model:value="formData.course_taught"
              class="px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
              multiple
              placeholder=""
            />
          </n-form-item>
          <div class="my-3">
            <select
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            >
              <option value="multi-select">multi-select</option>
            </select>
          </div>
        </div>
        <div>
          <n-form-item
            label="Number of Students Supervised"
            path="students_supervised"
            class=""
          >
            <n-input
              type="number"
              placeholder="Enter Number"
              v-model:value="formData.students_supervised"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item
            label="Research Publications"
            path="research_publications"
            class=""
          >
            <n-input
              type="number"
              placeholder="Enter Number"
              v-model:value="formData.research_publications"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item
            label="Conferences Attended"
            path="conferences_attended"
            class=""
          >
            <n-input
              type="number"
              placeholder="Enter Number"
              v-model:value="formData.conferences_attended"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="Grants Secured" path="grants_secured" class="">
            <n-input
              type="text"
              placeholder="Input the details of grants secured, press enter to start input another in cases of multiple"
              multiple
              v-model:value="formData.grants_secured"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item
            label="Research Impact Summary"
            path="research_impact_summary"
            class=""
          >
            <n-input
              type="text"
              placeholder="Your message here"
              multiple
              v-model:value="formData.research_impact_summary"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
      </n-form>
      <div
        class="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-[20px]"
      >
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
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { updateTeachingAndResearchPerformance } from "@/apis/academicStaff.js";
import Img from "@/assets/imgs/img.jpg";
const { show2 } = defineProps({
  show2: {
    type: Boolean,
  },
});

const formRef = ref(null);
const route = useRoute();
const id = computed(() => route.params.id);
const formData = reactive({
  students_supervised: "",
  research_publications: "",
  conferences_attended: "",
  grants_secured: null,
  research_impact_summary: null,
  appraisal: id,
  courses_taught: [0],
});

const rules = {
  courses_taught: [
    {
      type: "array",
      required: true,
      message: "Select at least a course",
      trigger: ["blur", "change"],
    },
  ],
  appraisal: [
    {
      required: true,
      message: "Appraisal is required",
      trigger: "blur",
    },
    {
      type: "number",
      message: "Appraisal must be a number",
      trigger: "blur",
    },
  ],
  research_publications: [
    {
      required: true,
      message: "Conferences Attended is required",
      trigger: "blur",
    },
    {
      type: "number",
      message: "Research Publications must be a number",
      trigger: "blur",
    },
  ],
  conferences_attended: [
    {
      required: true,
      message: "research_publications is required",
      trigger: "blur",
    },
    {
      type: "number",
      message: "Research Publications must be a number",
      trigger: "blur",
    },
  ],
  students_supervised: [
    {
      required: true,
      message: "Students Supervised is required",
      trigger: "blur",
    },
    {
      type: "number",
      message: "Students Supervised must be a number",
      trigger: "blur",
    },
  ],
  research_impact_summary: [
    {
      required: true,
      message: "Research Impact Summary is required",
      trigger: "blur",
    },
  ],
  grants_secured: [
    {
      required: true,
      message: "Grants Secured is required",
      trigger: "blur",
    },
  ],
};

const emit = defineEmits([
  "openAdministrativeAndCommunityService",
  "closeTeachingAndResearchPerformance",
]);
function closeModal() {
  emit("closeTeachingAndResearchPerformance");
}

function Next() {
  emit("closeTeachingAndResearchPerformance");
  emit("openAdministrativeAndCommunityService");
}
function Previous() {
  emit("closeTeachingResearch");
  emit("openPerformanceEvaluation");
}

const submit = async () => {
  loading.value = true;
  try {
    await form.value?.validate();
    const response = await updateTeachingAndResearchPerformance(formData, id);
    message.success("Teaching And Research Performance, updated");
  } catch (error) {
    loading.value = false;
    for (key in error?.response?.data) {
      if (
        (error?.response?.data)[key] &&
        Array.isArray((error?.response?.data)[key])
      ) {
        error?.response?.data[key].forEach((val) => {
          message.error(`${key} : ${val} `);
        });
      } else {
        message.error(
          (error?.response?.data).message ||
            "Teaching And Research Performance, not updated!",
        );
      }
    }
  }
};
</script>
