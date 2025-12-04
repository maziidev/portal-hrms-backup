<template>
  <!-- Generate Report -->
  <div
    id="generate_report"
    class="generate_report fixed hidden overflow-y-auto border rounded-md lg:w-[50%] w-full md:w-[80%] p-10 bg-white md:top-[10%] lg:top-[10%] lg:left-[30%] left-[0%] md:left-[30%] top-[0%] h-[100vh] md:h-[80vh] lg:h-[80vh] z-[20000]"
  >
    <div class="flex justify-between items-center my-[20px]">
      <div class="flex flex-col gap-[20px] gap-[10px]">
        <h2
          class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
        >
          Generate Report
        </h2>
      </div>
      <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button>
    </div>

    <div class="personal_information">
      <div class="">
        <div class="basic_information">
          <div class="grid md:grid-cols-2 gap-[20px]">
            <div class="report_type flex flex-col">
              <label for="report_type"> Choose Report Type </label>
              <select
                class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer p-[15px]"
              >
                <option value="report_type">
                  Performance/Appraisal Report
                </option>
              </select>
            </div>
            <div class="unit flex flex-col">
              <label for="unit"> Department / Unit </label>
              <input
                type="text"
                placeholder="Please enter staff Department / Unit"
                class="bg-[rgba(248,248,249,1)] p-[15px]"
              />
            </div>
            <div class="status flex flex-col">
              <label for="status"> Status </label>
              <select
                class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer p-[15px]"
              >
                <option value="active">Active</option>
              </select>
            </div>

            <div class="output_format flex flex-col">
              <label for="output_format"> Select Output Format </label>
              <select
                class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer p-[15px]"
              >
                <option value="PDF">PDF</option>
              </select>
            </div>
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

        <div
          class="grid grid-cols-1 mt-5 md:grid-cols-1 lg:grid-cols-1 gap-[20px]"
        >
          <button
            class="download_report border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
