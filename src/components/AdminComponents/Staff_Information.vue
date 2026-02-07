<template>
  <n-modal
    :show="show"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    title="Staff Information"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div
      class="bg-var(--twhite) p-[20px] shadow-sm border-b mb-[10px] border-slate-100 gap-[10px] flex flex-col justify-between"
    >
      <div class="flex p-[10px] gap-[20px] items-center">
        <!-- <button
          class="bg-[rgba(17,27,73,1)] close text-white rounded-full px-[9px] py-[2px] flex items-center justify-center"
        >
          x
        </button> -->
        <h2
          class="text-[rgba(27,37,89,1)] w-full mb-[20px] text-center font-bold text-[20px] leading-[120%] tracking-[-2%]"
        >
          Staff Information
        </h2>
        <p
          class="text-[rgba(4,183,107,1)] font-bold text-[14px] leading-[100%] rounded-[22.5px] bg-[rgba(4,183,107,0.2)] w-[200px] text-center px-[20px] py-[10px]"
        >
          Completed
        </p>
      </div>
      <div
        class="flex flex-col gap-[10px] gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
      >
        <h2
          class="font-bold text-[16px] leading-[100%] tracking-[0%] text-[rgba(17,27,73,1)]"
        >
          Staff Info
        </h2>
        <div class="name flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Name</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Mary James
          </span>
        </div>
        <div class="gender flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Role</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Finance Analyst
          </span>
        </div>
        <div class="dob flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Department</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Finance
          </span>
        </div>
        <div class="email flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Supervisor</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Mrs. A. Johnson
          </span>
        </div>
      </div>
      <!-- Appraisal Metrics -->
      <div
        class="appraisal_metrics border-b pb-[20px] border-[rgba(240,240,240,1)] my-[10px]"
      >
        <div class="flex flex-col gap-[20px]">
          <div class="phone flex justify-between items-center">
            <h2
              class="font-bold text-[16px] leading-[100%] tracking-[0%] text-[rgba(17,27,73,1)]"
            >
              Appraisal Metrics
            </h2>
            <span
              class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >Scores out of 5</span
            >
          </div>
          <div class="phone flex justify-between items-center">
            <span
              class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >Punctuality</span
            >
            <span
              class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >
              4.3
            </span>
          </div>
          <div class="flex justify-between items-center gap-[10px]">
            <span
              class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >Productivity</span
            >
            <span
              class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >
              4.5
            </span>
          </div>
          <div class="flex justify-between items-center gap-[10px]">
            <span
              class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >Teamwork</span
            >
            <span
              class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >
              4.2
            </span>
          </div>
          <div class="flex justify-between items-center gap-[10px]">
            <span
              class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >Initiative</span
            >
            <span
              class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >
              4.1
            </span>
          </div>
          <div class="flex justify-between items-center gap-[10px]">
            <span
              class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >Communication</span
            >
            <span
              class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >
              4.1
            </span>
          </div>
          <div class="phone flex justify-between items-center">
            <h2
              class="font-bold text-[16px] leading-[100%] tracking-[0%] text-[rgba(17,27,73,1)]"
            >
              Appraisal Metrics
            </h2>
            <span
              class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
              >4.2/5</span
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[10px] py-[20px]">
        <div class="flex justify-between items-center gap-[10px]">
          <span
            class="text-[rgba(17,27,73,1)] font-bold text-[16px] leading-[100%] tracking-[0%]"
          >
            Comments
          </span>
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >{{ comments?.length }}</span
          >
        </div>

        <div
          class="rounded-[12px] border p-[10px]"
          v-for="comment in paginatedData"
          :key="comment.name"
        >
          <div class="flex top justify-between gap-[10px] items-center w-full">
            <div class="left flex items-center gap-[10px]">
              <img
                :src="Img"
                alt="user"
                class="w-[48px] h-[48px] rounded-full"
              />

              <div class="flex gap-1 items-center">
                <h2
                  class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-0.09px]"
                >
                  {{ comment.name }}
                </h2>
                <p
                  class="text-[rgba(6,11,19,1)] font-normal text-[16px] leading-[120%] tracking-[-0.09px]"
                >
                  {{ comment.role }}
                </p>
              </div>
            </div>
            <p
              class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[120%] tracking-[0%]"
            >
              {{ comment.date }}
            </p>
          </div>
          <div class="body">
            <div class="top flex gap-[3px] my-[10px]">
              <h2
                class="text-[rgba(17,27,73,1)] font-[600] tracking-[-0.26px]leading-[23.8px] text-[14px] font-bold"
              >
                Stage:
              </h2>
              <span
                class="text-[rgba(34,32,32,1)] font-normal text-[14px] leading-[23.8px] tracking-[-0.09px]"
                >{{ comment.stage }}</span
              >
            </div>
            <div class="top flex gap-[3px] my-[10px]">
              <p class="text-[rgba(34,32,32,1)]">
                {{ comment.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="shadow-[1px_17px_44px_0px_rgba(3,2,41,0.07)] flex justify-between rounded-[10px] p-4"
      >
        <n-pagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :item-count="comments.length"
          :page-sizes="[5, comments.length - 5, comments.length]"
          show-size-picker
          show-total
        />
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

// Modal Pagination
const page = ref(1);
const pageSize = ref(5);

const comments = reactive([
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. Okeke James",
    role: " Dean (Economics)",
    date: "14th Sept, 2025",
    stage: "Dean Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
  {
    name: "Prof. James Okeke",
    role: " Head of Department (Economics)",
    date: "14th Sept, 2025",
    stage: "HOD Review",
    comment: `Dr. Ada has consistently delivered high-quality lectures and
                supervised research projects effectively. Her publication record
                this year is commendable. I recommend her for promotion
                consideration.`,
  },
]);

const paginatedData = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return comments.slice(start, end);
});

const emit = defineEmits(["closeModal"]);
function closeModal() {
  emit("closeModal");
}
</script>
