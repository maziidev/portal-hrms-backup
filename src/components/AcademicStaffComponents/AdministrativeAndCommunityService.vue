<template>
  <n-modal
    :show="show3"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div
      id="administrative_community_service"
      action="#"
      class="administrative_community_service"
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

          <div class="flex-1 h-[2px] bg-[rgba(58,151,76,1)]"></div>

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

      <div>
        <a href="#" class="back flex items-center gap-[10px]">
          <i class="fa fa-chevron-left"></i>
          <button
            @click="Previous"
            class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
          >
            Back
          </button>
        </a>
        <span
          class="text-[rgba(17,27,73,1)] text-center w-full block text-[20px] leading-[100%] tracking-[0%] font-[700]"
          >Administrative & Community Service</span
        >
      </div>
      <n-form
        @submit="save"
        :rules="rules"
        ref="formRef"
        :model="formData"
        class="flex my-[40px] items-center gap-5"
      >
        <div class="">
          <n-form-item label="Committees Served On" path="committees_served">
            <n-select
              :options="departmentalRoles"
              v-model:value="formData.departmental_role"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            >
              <option value="Select Role">Select Role</option>
            </n-select>
          </n-form-item>
        </div>
        <div>
          <n-form-item label="Committees Served On" path="committees_served">
            <n-input
              type="text"
              v-model:value="formData.community_service"
              placeholder="Explain in details, press enter to start input another in cases of multiple"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[82px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>

        <div>
          <n-form-item label="Community Service" path="community_service">
            <n-input
              :row="3"
              type="textarea"
              v-model:value="formData.community_service"
              placeholder="Your message here"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[82px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="Awards Recognitions" path="awards_recognitions">
            <n-input
              type="text"
              placeholder="Your message here"
              v-model:value="formData.awards_recognitions"
              class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
            />
          </n-form-item>
        </div>
      </n-form>
      <div
        class="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-2 gap-[20px]"
      >
        <button
          @click="save"
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
import Img from "@/assets/imgs/img.jpg";
import { useRoute, useRouter } from "vue-router";
import { saveAdminstrativeAndCommunityService } from "@/apis/academicStaff.js";

const { show3 } = defineProps({
  show3: {
    type: Boolean,
  },
});

const formRef = ref(null);
const route = useRoute();
const id = computed(() => route.params.id);
const formData = reactive({
  departmental_role: "",
  committees_served: "",
  community_service: "",
  awards_recognitions: "",
  appraisal: id,
});

const rules = {
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
  departmental_role: [
    {
      max:100,
      required: true,
      message: "Departmental Role is required",
      trigger: "blur",
    },
  ],
  committees_served: [
    {
      required: true,
      message: "Committees Served is required",
      trigger: "blur",
    },
  ],
  community_service: [
    {
      required: true,
      message: "Community Service is required",
      trigger: "blur",
    },
  ],
  awards_recognitions: [
    {
      required: true,
      message: "Awards Recognitions is required",
      trigger: "blur",
    },
  ],
};

const emit = defineEmits([
  "closeAdministrativeAndCommunityService",
  "openProfessionalDevelopment",
  "openTeachingAndResearchPerformance",
]);
function closeModal() {
  emit("closeTeachingResearch");
}

function Next() {
  emit("closeAdministrativeAndCommunityService");
  emit("openProfessionalDevelopment");
}
function Previous() {
  emit("closeAdministrativeAndCommunityService");
  emit("openTeachingAndResearchPerformance");
}

const save = async () => {
  loading.value = true;
  try {
    await form.value?.validate();
    const response = await saveAdminstrativeAndCommunityService(formData, id);
    message.success("Adminstrative and Community Service, saved");
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
            "Adminstrative and Community Service, not saved!",
        );
      }
    }
  }
};
</script>
