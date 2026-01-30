<template>
  <n-modal
    :show="show1"
    preset="card"
    title="Create Appraisal"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <ClipLoader :loading="loading" color="#034a03" size="35" />
    <n-form ref="form" :model="formData" :rules="rules">
      <n-form-items label="Appraisal Period" path="appraisal_period">
        <n-input placeholder="Enter Appraisal Period" class=""></n-input>
      </n-form-items>
      <n-form-items label="Self Comments" path="self_comments">
        <n-input placeholder="Enter Self Comments" class=""></n-input>
      </n-form-items>
    </n-form>
  </n-modal>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { useMessage } from "naive-ui";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { createAppraisal } from "@/apis/academicStaff.js";
import Img from "@/assets/imgs/img.jpg";
const { show } = defineProps({
  show: {
    type: Boolean,
  },
});

const message = useMessage();
const loading = ref(false);
const form = ref(null);
const formData = reactive({
  appraisal_period: null,
  self_comments: null,
});

const submit = async () => {
  loading.value = true;
  try {
    form.value?.validate((errors) => {
      if (!errors) {
      } else {
        message.error("Fill the form correctly!");
        loading.value = false;
      }
    });
    const response = await createAppraisal(formData);
    message.success("Appraisal created");
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
          (error?.response?.data).message || "Appraisal not created!",
        );
      }
    }
  }
};

const rules = {
  appraisal_period: {
    required: true,
    message: "Appraisal Period is required",
    trigger: "blur",
  },
};

const emit = defineEmits([
  "openConductDiscipline",
  "closeTeachingResearch",
  "openPerformanceEvaluation",
]);
function closeModal() {
  emit("closeTeachingResearch");
}

function Next() {
  emit("closeTeachingResearch");
  emit("openConductDiscipline");
}
function Previous() {
  emit("closeTeachingResearch");
  emit("openPerformanceEvaluation");
}
</script>
