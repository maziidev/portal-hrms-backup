<template>
  <n-modal
    :show="show1"
    preset="card"
    title="Add New Publication"
    class="!lg:w-[50%] md:w-[40%] h-[700px] overflow-auto rounded-md"
    :mask-closable="true"
    :closable="true"
    @close="closeModal"
  >
    <div
      class="application_tracking absolute w-full z-[200] transition-all ease-in-out duration-500 top-0 h-full left-0 bg-white"
    >
      <div
        class="bg-[var(--twhite)] p-[20px]   mb-[10px]  gap-[10px] flex flex-col justify-between"
      >
        <div class="flex p-[10px] gap-[20px] items-center">
          <button @click="closeModal"
            class="bg-[rgba(17,27,73,1)] close text-white rounded-full px-[9px] py-[2px] flex items-center justify-center"
          >
            x
          </button>
          <h2
            class="text-[rgba(27,37,89,1)] w-full mb-[20px] text-center font-[700] text-[20px] leading-[120%] tracking-[-2%]"
          >
            Application Tracking
          </h2>
        </div>
        <div class="w-full overflow-hidden">
          <div class="overflow-x-auto">
            <n-data-table
              :columns="columns"
              :loading="loading"
              :bordered="false"
              :scroll-x="1200"
              :pagination="pagination"
            />
          </div>
        </div>
        <div class="flex flex-col gap-[30px] p-[20px]">
          <div class="flex justify-between items-center gap-[10px]">
            <div class="flex justify-between gap-[10px] items-center w-full">
              <div class="flex gap-4 items-center">
                <span
                  class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                ></span>
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  Promotion for Lecturer I → Senior Lecturer endorsed and sent
                  to Dean
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Today, 03:00 PM
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center gap-[10px]">
            <div class="flex justify-between gap-[10px] items-center w-full">
              <div class="flex gap-4 items-center">
                <span
                  class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                ></span>
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  New promotion request from Dr. Helen Eze awaiting review
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Sept 20, 03:00 PM
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center gap-[10px]">
            <div class="flex justify-between gap-[10px] items-center w-full">
              <div class="flex gap-4 items-center">
                <span
                  class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                ></span>
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  Promotion request for Dr. Iweala Nkem returned for
                  corrections.
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Sept 18, 03:00 PM
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center gap-[10px]">
            <div class="flex justify-between gap-[10px] items-center w-full">
              <div class="flex gap-4 items-center">
                <span
                  class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                ></span>
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                >
                  Promotion request for Dr. Iweala Nkem returned for
                  corrections.
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Sept 12, 03:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
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

const emit = defineEmits(["closeAcademicStaffApplicationTrackingForPromotion"]);

function closeModal() {
  emit("closeAcademicStaffApplicationTrackingForPromotion");
}

// Define table columns
const columns = [
  {
    title: "Stage",
    key: "stage",
    render(row) {
      return h(
        "a",
        {
          class: "text-blue-600 hover:underline font-semibold cursor-pointer",
          onClick: () => router.push(`/home/edit/${row.id}`),
        },
        row.id
      );
    },
  },
  { title: "Actioned By ", key: "actioned_by " },
  { title: "Actioned By ", key: "actioned_by " },
  { title: "Comment ", key: "comment " },
  {
    title: "Status ",
    key: "status ",
    render(row) {
      return h(
        "span",
        {
          style:
            row.is_active == "Completed"
              ? "rounded-[22.5px] text-[rgba(58,151,76,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(58,151,76,0.15)] w-[120px]"
              : row.is_active == "Pending"
              ? "rounded-[22.5px] text-[rgba(234,67,53,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(234,67,53,0.2)]"
              : "rounded-[22.5px] text-[rgba(251,188,4,1)] px font-[700] text-[14px] leading-[100%] tracking-[0%] px-[20px] py-[10px] bg-[rgba(251,188,4,0.2)]",
        },
        row.is_active
      );
    },
  },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
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
