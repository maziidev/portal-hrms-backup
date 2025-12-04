<template>
    <!-- Open New Appraisal Cycle -->
          <div
            id="appraisal_cycle"
            class="appraisal_cycle fixed hidden overflow-y-auto border rounded-md lg:w-[50%] w-full md:w-[80%] p-10 bg-white md:top-[10%] lg:top-[10%] lg:left-[30%] left-[0%] md:left-[30%] top-[0%] h-[100vh] md:h-[80vh] lg:h-[80vh] z-[20000]"
          >
            <div class="flex justify-between items-center my-[20px]">
              <div class="flex flex-col gap-[20px] gap-[10px]">
                <h2
                  class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
                >
                  Open New Appraisal Cycle
                </h2>
                <p
                  class="text-[rgba(152,159,176,1)] text-[16px] font-[400] leading-[120%] tracking-[0%]"
                >
                  Define the details of this appraisal period. Once opened,
                  department heads and units will be able to start appraising
                  their staff
                </p>
              </div>
              <button class="text-[rgba(30,30,30,1)] close text-[20px]">
                x
              </button>
            </div>

            <div class="personal_information">
              <div class="">
                <div class="basic_information">
                  <div class="grid md:grid-cols-1 gap-[20px]">
                    <div class="appraisal_title flex flex-col">
                      <label for="appraisal_title"> Appraisal Title </label>
                      <input
                        type="text"
                        placeholder="2025 First Quarter Appraisal"
                        class="bg-[rgba(248,248,249,1)] p-[15px]"
                      />
                    </div>
                    <div class="appraisal_type flex flex-col">
                      <label for="appraisal_type"> Appraisal Type </label>
                      <select
                        class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer p-[15px]"
                      >
                        <option value="appraisal_type">Academic Staff</option>
                      </select>
                    </div>

                    <div class="grid grid-cols-1 gap-[20px] md:grid-cols-2">
                      <div class="date_start flex flex-col">
                        <label for="date_start"> Date Start </label>
                        <input
                          type="text"
                          placeholder="DD-MM-YYYY"
                          class="bg-[rgba(248,248,249,1)] p-[15px]"
                        />
                      </div>
                      <div class="date_finish flex flex-col">
                        <label for="date_finish"> Date Finish </label>
                        <input
                          type="text"
                          placeholder="DD-MM-YYYY"
                          class="bg-[rgba(248,248,249,1)] p-[15px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-[20px]"
                >
                  <button
                    class="next border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
</template>