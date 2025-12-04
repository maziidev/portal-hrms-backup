<template>
  <!-- Add New Staff -->
  <div
    id="add_new_staff"
    class="add_new_staff fixed hidden overflow-y-auto border rounded-md lg:w-[50%] w-full md:w-[80%] p-10 bg-white md:top-[10%] lg:top-[10%] lg:left-[30%] left-[0%] md:left-[30%] top-[0%] h-[100vh] md:h-[80vh] lg:h-[80vh] z-[20000]"
  >
    <div class="flex justify-between items-center gap-[10px]">
      <div class="flex flex-col gap-[20px] gap-[10px]">
        <h2
          class="text-[rgba(24,24,27,1)] font-[700] leading-[100%] tracking-[0%] text-[20px]"
        >
          Add New Staff
        </h2>
        <p
          class="text-[rgba(152,159,176,1)] font-[400] leading-[120%] tracking-[0%] text-[16px]"
        >
          Capture essential staff details, upload appointment documents, and
          create a unique ID instantly
        </p>
      </div>
      <button class="text-[rgba(30,30,30,1)] close text-[20px]">x</button>
    </div>

    <div class="personal_information">
      <div class="">
        <div class="basic_information">
          <h2
            class="text-[rgba(24,24,27,1)] text-[16px] font-[600] leading-[120%] tracking-[0%] my-[15px]"
          >
            Basic Information
          </h2>
          <div class="grid md:grid-cols-2 gap-[20px]">
            <div class="full_name flex flex-col">
              <label for="full_name"> Full Name </label>
              <input
                type="text"
                placeholder="Please enter staff full name"
                class="bg-[rgba(248,248,249,1)] p-[15px]"
              />
            </div>
            <div class="phone_number flex flex-col">
              <label for="phone_number"> Phone Number </label>
              <input
                type="number"
                placeholder="Please enter staff phone number"
                class="bg-[rgba(248,248,249,1)] p-[15px]"
              />
            </div>
            <div class="gender flex flex-col">
              <label for="gender"> Gender </label>
              <select
                class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer p-[15px]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div class="date_of_birth flex flex-col">
              <label for="date_of_birth"> Date of Birth </label>
              <input
                type="text"
                placeholder="DD-MM-YYYY"
                class="bg-[rgba(248,248,249,1)] p-[15px]"
              />
            </div>
          </div>
        </div>
        <div class="professional_details mt-[40px]">
          <h2
            class="text-[rgba(24,24,27,1)] text-[16px] font-[600] leading-[120%] tracking-[0%] my-[15px]"
          >
            Professional Details
          </h2>
          <div class="grid md:grid-cols-2 gap-[20px]">
            <div class="department flex flex-col">
              <label for="department"> Department / Unit </label>
              <input
                type="text"
                placeholder="Please enter staff Department / Unit"
                class="bg-[rgba(248,248,249,1)] p-[15px]"
              />
            </div>
            <div class="role flex flex-col">
              <label for="role"> Role / Position (Optional) </label>
              <input
                type="text"
                placeholder="Please enter staff role"
                class="bg-[rgba(248,248,249,1)] p-[15px]"
              />
            </div>
            <div class="employment_type flex flex-col">
              <label for="employment_type"> Employment Type </label>
              <select
                class="bg-[rgba(248,248,249,1)] outline-none border-none cursor-pointer p-[15px]"
              >
                <option value="full_time">Full time</option>
                <option value="full_time">Full time</option>
              </select>
            </div>
            <div class="date_of_employment flex flex-col">
              <label for="date_of_employment"> Date of Employment </label>
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
            class="create_staff border-2 border-[rgba(35,136,255,1)] bg-[rgba(35,136,255,1)] text-[rgba(255,255,255,1)] font-[600] text-[16px] leading-[100%] tracking-[0] p-[15px]"
          >
            Create Staff
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
