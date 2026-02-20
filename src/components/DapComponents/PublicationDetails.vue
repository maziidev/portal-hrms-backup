<template>
  <n-modal
    :show="show"
    preset="card"
    @close="closeModal"
    :closeable="true"
    :mask-closable="true"
    class="md:w-[50%] lg:w-[60%] my-[20px] w-full"
  >
    <div class="">
      <div
        class="bg-[var(--twhite)]  shadow-sm border-b mb-[10px] border-slate-100 gap-[10px] flex flex-col justify-between"
      >
        <div class="flex p-[10px] gap-[20px] items-center">
          <h2
            class="text-[rgba(27,37,89,1)] w-full mb-[20px] text-center font-[700] text-[20px] leading-[120%] tracking-[-2%]"
          >
            Publication Details
          </h2>
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
                  Title
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                AI-Driven Climate Models in West Africa
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
                  Author(s)
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Dr. Emmanuel N.
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
                  Faculty
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Science & Technology
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
                  Department
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Computer Science
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
                  Journal / Publisher
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Elsevier
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
                  Year of Publication
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                2024
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
                  Type
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Indexed International Journal
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
                  DOI / ISSN
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                10.1016/j.climres.2024.001
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
                  Document Upload
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                10.1016/j.climres.2024.001
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
                  Additional Notes
                </h2>
              </div>
              <p
                class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
              >
                Published in Elsevier Climate Research series
              </p>
            </div>
          </div>

          <div>
            <div
              class="flex justify-between flex-wrap md:flex-nowrap lg:flex-nowrap gap-[15px]"
            >
              <div class="flex items-center gap-[10px]">
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                >
                  Decision
                </h2>
              </div>
              <div class="">
                <select
                  name="approve"
                  id="approve"
                  class="cursor-pointer px-[17px] py-[11px] border border-[rgba(240,240,240,1)] text-[rgba(107,114,128,1)] text-[14px] font-[400] leading-[100%] tracking-[0%] outline-none w-[404px]"
                >
                  <option value="Approve">Approve</option>
                  <option value="Approve">Approve</option>
                </select>
              </div>
            </div>
            <div class="my-3">
              <input
                type="text"
                placeholder="Enter your comment here"
                class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(141,193,255,0.13)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
              />
            </div>
          </div>
          <div>
            <div class="">
              <div class="flex items-center justify-between gap-[10px]">
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
                >
                  Upload supporting documents
                </h2>
                <!-- <button>
                        <i
                          class="fa fa-plus text-[rgba(35,136,255,1)] text-[16px]"
                        ></i>
                      </button> -->
              </div>
            </div>
            <div
              id="drop-zone"
              class="my-3 relative w-full px-[24px] py-[14px] bg-[rgba(248,248,249,1)]"
            >
              <input
                type="file"
                id="file"
                accept=".pdf,.doc,.docx,.txt, image/* "
                aria-hidden="false"
                class="w-full absolute inset-0 opacity-0 cursor-pointer outline-none border-0 px-[12px] py-[15px] bg-[rgba(248,248,249,1)] font-[400] text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
              />
              <!-- Visual content -->
              <div class="pointer-events-none flex flex-col items-center gap-1">
                <div
                  class="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-2xl text-gray-600 shadow-sm"
                >
                  <i class="fas fa-arrow-up-from-bracket"></i>
                </div>

                <div class="flex flex-col items-center gap-[5px]">
                  <div class="flex items-center gap-[10px]">
                    <span
                      class="text-[rgba(0,149,255,1)] text-[14px] font-[500]"
                    >
                      Click to upload
                    </span>
                    <p class="text-sm text-gray-500">
                      or
                      <span
                        class="text-[14px] font-[500] text-[rgba(71,84,103,1)]"
                        >or drag and drop</span
                      ><br />
                    </p>
                  </div>
                  <span
                    class="text-[12px] leading-[18px] font-[500] text-[rgba(71,84,103,1)]"
                  >
                    supports only .pdf or .CSV
                  </span>
                </div>

                <!-- filename preview -->
                <div id="file-info" class="mt-3 text-sm text-gray-600"></div>
              </div>
            </div>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-[20px]"
          >
            <button
              class="submit border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
            >
              Submit
            </button>
          </div>
        </div>
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

const emit = defineEmits([
  "closePublicationDetails",
 
]);
function closeModal() {
  emit("closePublicationDetails");
}
function submit() {
  emit("closePublicationDetails");
}
</script>
