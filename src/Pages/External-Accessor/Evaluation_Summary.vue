<template>
  <div class="">
    <div
      class="flex justify-between flex-wrap md:flex-nowrap lg:flex-nowrap items-center gap-[20px]"
    >
      <div class="flex items-center gap-2">
        <button @click="previousPage" class="flex items-center gap-[10px]">
          <i class="fa fa-chevron-left"></i> Back
        </button>
        <span
          class="text-[rgba(20,21,15,1)] text-[16px] md:text-[20px] leading-[120%] tracking-[0%] font-bold"
          >Dr. Chinedu Okafor | Department of Mechanical Engineering |
          UNILAG</span
        >
      </div>

      <div class="flex items-center w-full md:w-[50%] justify-end gap-[10px]">
        <button
          class="bg-[rgba(35,136,255,1)] view_performance_history text-[rgba(255,255,255,1)] text-[14px] font-bold px-[20px] py-[10px] flex gap-[10px] rounded-[5px] items-center"
          href="#"
        >
          Evaluation Decision
        </button>
      </div>
    </div>
  </div>

  <!-- Personal Info -->
  <div class="flex flex-col gap-[20px]">
    <!-- Image -->

    <div class="">
      <div class="image my-[10px]">
        <img :src="Img" class="object-contain w-[400px] h-[284px]" alt="" />
      </div>
      <div class="top flex justify-between">
        <h2
          class="text-[rgba(17,27,73,1)] font-bold text-[16px] leading-[100%] tracking-[0%]"
        >
          ECF/ACA/0458
        </h2>
        <div class="flex flex-items gap-2">
          <button
            class="toggle-data"
            @click="toggleBasicBio"
            v-if="showBasicBio"
          >
            <i class="fa fa-chevron-down"></i></button
          ><button class="toggle-data" @click="toggleBasicBio" v-else>
            <i class="fa fa-chevron-up"></i>
          </button>
        </div>
      </div>
      <div
        v-if="showBasicBio"
        class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
      >
        <div class="name flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Full Name</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Dr. (Mrs.) Tolulope Adetunji
          </span>
        </div>
        <div class="gender flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Position / Rank</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Senior Lecturer
          </span>
        </div>
        <div class="dob flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Employment Type</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Academic
          </span>
        </div>
        <div class="email flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Email</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            jane.doe@eun.edu.ng
          </span>
        </div>
        <div class="phone flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Date of Last Promotion</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            15th July 2021
          </span>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Year of Service</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            11 years
          </span>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Reporting Line</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            HOD, Economics (Self-supervised under Faculty of Social Sciences)
          </span>
        </div>
        <div class="flex justify-between items-center gap-[10px]">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Appraisal Period</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            January – December 2025
          </span>
        </div>
      </div>
    </div>
    <!-- Employment Details-->
    <div class="">
      <div class="top flex justify-between">
        <h2
          class="text-[rgba(17,27,73,1)] font-bold text-[16px] leading-[100%] tracking-[0%]"
        >
          Employment Details
        </h2>
        <div class="flex flex-items gap-2">
          <button
            class="toggle-data"
            v-if="showEmploymentDetails"
            @click="toggleEmploymentDetails"
          >
            <i class="fa fa-chevron-down"></i></button
          ><button
            class="toggle-data"
            @click="toggleEmploymentDetails"
            v-if="showEmploymentDetails == false"
          >
            <i class="fa fa-chevron-up"></i>
          </button>
        </div>
      </div>
      <div
        v-if="showEmploymentDetails"
        class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
      >
        <div class="cadre flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Cadre</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Senior Lecturer
          </span>
        </div>
        <div class="current_level flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Current Level</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            GL 13
          </span>
        </div>
        <div class="designation flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Designation</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Exam Officer
          </span>
        </div>
        <div class="department flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Department</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Political Science
          </span>
        </div>
        <div class="faculty flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Faculty</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Social Sciences
          </span>
        </div>
        <div
          class="date_of_first_appointment flex justify-between items-center"
        >
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Date of First Appointment</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            10/01/2010
          </span>
        </div>
        <div class="date_of_last_promotion flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Date of Last Promotion</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            05/09/2022
          </span>
        </div>
        <div class="appointment_type flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Appointment Type</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            Full-Time
          </span>
        </div>
      </div>
    </div>

    <div
      class="bg-var(--twhite) mt-[1px] py-[20px] gap-[10px] flex flex-col justify-between"
    >
      <div class="w-full overflow-hidden">
        <h2
          class="text-[rgba(27,37,89,1)] mb-[-20px] font-bold text-[16px] leading-[100%] tracking-[0%]"
        >
          Teaching & Research Breakdown
        </h2>
        <div class="overflow-x-auto">
          <n-data-table
            :columns="Research_Breakdown_columns"
            :loading="loading"
            :bordered="false"
            :scroll-x="1200"
            :pagination="pagination"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-var(--twhite) mt-[1px] py-[0px] mb-[10px] gap-[10px] flex flex-col justify-between"
    >
      <div class="w-full overflow-hidden">
        <h2
          class="text-[rgba(27,37,89,1)] mb-[-20px] font-bold text-[16px] leading-[100%] tracking-[0%]"
        >
          Research Contributions
        </h2>
        <div class="overflow-x-auto">
          <n-data-table
            :columns="Research_Contributions_columns"
            :loading="loading"
            :bordered="false"
            :scroll-x="1200"
            :pagination="pagination"
          />
        </div>
      </div>
      <div class="top flex justify-between">
        <h2
          class="text-[rgba(17,27,73,1)] font-bold text-[16px] leading-[100%] tracking-[0%]"
        >
          Administrative Duties
        </h2>
        <div class="flex flex-items gap-2">
          <button
            v-if="adminDuties"
            class="toggle-data"
            @click="toggleAdminDuties"
          >
            <i class="fa fa-chevron-down"></i>
          </button>
          <button class="toggle-data" @click="toggleAdminDuties" v-else>
            <i class="fa fa-chevron-up"></i>
          </button>
        </div>
      </div>
      <div
        v-if="adminDuties"
        class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
      >
        <div class="name flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Departmental Examinations Officer</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            2019–2022
          </span>
        </div>
        <div class="gender flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Faculty Representative (Curriculum Board)</span
          >
          <span
            class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
          >
            2021–Present
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
      <div>
        <div class="flex justify-between gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Teaching Effectiveness
            </h2>
          </div>
          <!-- Circular Rating -->
          <div class="relative w-20 h-20 flex items-center justify-center">
            <!-- Circular progress -->
            <div
              class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
            ></div>

            <!-- Inner white circle -->
            <div
              class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
            >
              <p class="text-sm font-semibold text-gray-800">75%</p>
            </div>

            <!-- Star at the end of the progress -->
            <i
              class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
              style="transform: rotate(270deg) translateX(40px)"
            ></i>
          </div>
        </div>
        <div class="my-1">
          <input
            type="text"
            placeholder="Consistently achieves positive student feedback."
            class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="flex justify-between gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Research Output
            </h2>
          </div>
          <!-- Circular Rating -->
          <div class="relative w-20 h-20 flex items-center justify-center">
            <!-- Circular progress -->
            <div
              class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
            ></div>

            <!-- Inner white circle -->
            <div
              class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
            >
              <p class="text-sm font-semibold text-gray-800">75%</p>
            </div>

            <!-- Star at the end of the progress -->
            <i
              class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
              style="transform: rotate(270deg) translateX(40px)"
            ></i>
          </div>
        </div>
        <div class="my-1">
          <input
            type="text"
            placeholder="Published 3 peer-reviewed papers this session."
            class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="flex justify-between gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Supervision
            </h2>
          </div>
          <!-- Circular Rating -->
          <div class="relative w-20 h-20 flex items-center justify-center">
            <!-- Circular progress -->
            <div
              class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
            ></div>

            <!-- Inner white circle -->
            <div
              class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
            >
              <p class="text-sm font-semibold text-gray-800">75%</p>
            </div>

            <!-- Star at the end of the progress -->
            <i
              class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
              style="transform: rotate(270deg) translateX(40px)"
            ></i>
          </div>
        </div>
        <div class="my-1">
          <input
            type="text"
            placeholder="Adequate supervision record for final-year projects."
            class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
      <div>
        <div class="flex justify-between gap-[10px]">
          <div class="flex items-center gap-[10px]">
            <span
              class="h-[41px] rounded-[16px] w-[4px] bg-[rgba(35,136,255,1)]"
            ></span>
            <h2
              class="text-[rgba(27,37,89,1)] font-bold text-[16px] leading-[120%] tracking-[-2%]"
            >
              Contribution to Department
            </h2>
          </div>
          <!-- Circular Rating -->
          <div class="relative w-20 h-20 flex items-center justify-center">
            <!-- Circular progress -->
            <div
              class="absolute inset-0 rounded-full bg-[conic-gradient(#fbbf24_0deg_270deg,#e5e7eb_270deg_360deg)]"
            ></div>

            <!-- Inner white circle -->
            <div
              class="absolute w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center"
            >
              <p class="text-sm font-semibold text-gray-800">75%</p>
            </div>

            <!-- Star at the end of the progress -->
            <i
              class="fa fa-star text-yellow-400 text-xs top-[33px] absolute"
              style="transform: rotate(270deg) translateX(40px)"
            ></i>
          </div>
        </div>
        <div class="my-1">
          <input
            type="text"
            placeholder="Supported new curriculum design committee."
            class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
          />
        </div>
      </div>
    </div>

    <div>
      <div class="flex justify-between gap-[10px]">
        <div class="flex items-center gap-[10px]">
          <h2
            class="text-[rgba(161,161,170,1)] font-[500] text-[16px] leading-[120%] tracking-[-2%]"
          >
            Dean’s Remark
          </h2>
        </div>
      </div>
      <div class="my-2">
        <input
          type="text"
          placeholder="Approved – replacement arranged, no academic disruption expected"
          class="w-full outline-none border-0 px-[12px] py-[15px] h-[47px] bg-[rgba(161,161,170,0.09)] font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
        />
      </div>
    </div>

    <!-- FILES / DOCUMENTS -->
    <div class="py-[7px]">
      <div class="top flex justify-between">
        <h2
          class="text-[rgba(17,27,73,1)] font-bold text-[16px] leading-[100%] tracking-[0%]"
        >
          FILES / DOCUMENTS
        </h2>
        <div class="flex flex-items gap-2">
          <button class="toggle-data" v-if="showFiles" @click="toggleShowFiles">
            <i class="fa fa-chevron-down"></i></button
          ><button class="toggle-data" v-else @click="toggleShowFiles">
            <i class="fa fa-chevron-up"></i>
          </button>
        </div>
      </div>
      <div
        v-if="showFiles"
        class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
      >
        <div class="expected_retirement_date flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Appointment Letters</span
          >
          <div class="flex items-center gap-[10px]">
            <a href="#" download="download"
              ><i class="fa fa-download text-(--sec-text)"></i
            ></a>
            <span
              class="view bg-[rgba(35,136,255,1)] cursor-pointer text-[14px] font-bold leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
              >View</span
            >
          </div>
        </div>
        <div class="expected_retirement_date flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Appraisal Reports</span
          >
          <div class="flex items-center gap-[10px]">
            <a href="#" download="download"
              ><i class="fa fa-download text-(--sec-text)"></i
            ></a>
            <span
              class="view bg-[rgba(35,136,255,1)] cursor-pointer text-[14px] font-bold leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
              >View</span
            >
          </div>
        </div>
        <div class="expected_retirement_date flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Master’s Certificate</span
          >
          <div class="flex items-center gap-[10px]">
            <a href="#" download="download"
              ><i class="fa fa-download text-(--sec-text)"></i
            ></a>
            <span
              class="view bg-[rgba(35,136,255,1)] cursor-pointer text-[14px] font-bold leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
              >View</span
            >
          </div>
        </div>
        <div class="expected_retirement_date flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >PHD Certificate</span
          >
          <div class="flex items-center gap-[10px]">
            <a href="#" download="download"
              ><i class="fa fa-download text-(--sec-text)"></i
            ></a>
            <span
              class="view bg-[rgba(35,136,255,1)] cursor-pointer text-[14px] font-bold leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
              >View</span
            >
          </div>
        </div>
        <div class="expected_retirement_date flex justify-between items-center">
          <span
            class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
            >Thesis Documents</span
          >
          <div class="flex items-center gap-[10px]">
            <a href="#" download="download"
              ><i class="fa fa-download text-(--sec-text)"></i
            ></a>
            <span
              class="view bg-[rgba(35,136,255,1)] cursor-pointer text-[14px] font-bold leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
              >View</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Promotion History -->
  <div
    class="promotion_history hidden absolute transition-all ease-in-out duration-500 top-0 min-h-screen w-[100%] bg-white"
  >
    <div
      class="bg-var(--twhite) p-[20px] shadow-sm border-b mb-[10px] border-slate-100 gap-[10px] flex flex-col justify-between"
    >
      <div class="flex p-[10px] gap-[20px] items-center">
        <button
          class="bg-[rgba(17,27,73,1)] close text-white rounded-full px-[9px] py-[2px] flex items-center justify-center"
        >
          x
        </button>
        <h2
          class="text-[rgba(27,37,89,1)] w-full mb-[20px] text-center font-bold text-[20px] leading-[120%] tracking-[-2%]"
        >
          Promotion History
        </h2>
      </div>
      <div class="w-full overflow-hidden">
        <div class="overflow-x-auto">
          <table
            class="min-w-full text-left whitespace-nowrap border-spacing-y-[20px] border-separate"
          >
            <thead>
              <tr>
                <th class="p-5">
                  Qualification <i class="fa fa-caret-down"></i>
                </th>
                <th class="p-5">
                  Institution <i class="fa fa-caret-down"></i>
                </th>
                <th class="p-5">Year <i class="fa fa-caret-down"></i></th>
                <th class="p-5">Discipline <i class="fa fa-caret-down"></i></th>
                <th class="p-5">Action <i class="fa fa-caret-down"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  B.Eng.
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  University of Lagos
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  2024
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  Mechanical Engineering
                </td>
                <td
                  class="p-5 font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  <button
                    class="bg-[rgba(35,136,255,1)] view text-[rgba(255,255,255,1)] rounded-[5px] py-[10px] px-[20px] w-full"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  B.Eng.
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  University of Lagos
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  2024
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  Mechanical Engineering
                </td>
                <td
                  class="p-5 font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  <button
                    class="bg-[rgba(35,136,255,1)] view text-[rgba(255,255,255,1)] rounded-[5px] py-[10px] px-[20px] w-full"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  B.Eng.
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  University of Lagos
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  2024
                </td>
                <td
                  class="p-5 text-[rgba(30,30,30,1)] font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  Mechanical Engineering
                </td>
                <td
                  class="p-5 font-normal text-[14px] leading-[100%] tracking-[0%]"
                >
                  <button
                    class="bg-[rgba(35,136,255,1)] view text-[rgba(255,255,255,1)] rounded-[5px] py-[10px] px-[20px] w-full"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
              >
                Promotion for Lecturer I → Senior Lecturer endorsed and sent to
                Dean
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
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
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
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
              >
                Promotion request for Dr. Iweala Nkem returned for corrections.
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
                class="text-[rgba(27,37,89,1)] font-bold text-[14px] leading-[120%] tracking-[-2%]"
              >
                Promotion request for Dr. Iweala Nkem returned for corrections.
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
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Orbit from "@/assets/imgs/Orbit.png";
import Img from "@/assets/imgs/img.jpg";

const router = useRouter();

function previousPage() {
  router.back();
}

const data = reactive({
  faculty: null,
  rank_applied: null,
  status: null,
  search: null,
});
const activeState = ref(null);
const adminDuties = ref(true);
const showFiles = ref(true);
const showBasicBio = ref(true); 
const showEmploymentDetails = ref(true); 

function toggleAdminDuties() {
  adminDuties.value = !adminDuties.value;
  console.log(adminDuties.value);
}
function toggleShowFiles() {
  showFiles.value = !showFiles.value;
  console.log("Clicked");
}
function toggleBasicBio() {
    showBasicBio.value = !showBasicBio.value;
}
function toggleEmploymentDetails() {
    showEmploymentDetails.value = !showEmploymentDetails.value;
}

function isActive(id) {
  activeState.value = id;
  console.log(id);
}
const btns = reactive([
  { name: "Active Staff", value: 20300 },
  { name: "On Probation", value: 20560 },
  { name: "On Study Leave", value: 20300 },
  { name: "Retired", value: 10300 },
]);
const unitOptions = [
  { label: "HR", value: "hr" },
  { label: "IT", value: "it" },
  { label: "Finance", value: "finance" },
];

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns
const Research_Contributions_columns = [
  {
    title: "Year",
    key: "year",
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
  { title: "Publications ", key: "publications " },
  { title: "Citation Count ", key: "citation_count " },
  { title: "Avg Impact Factor", key: "avg_impact_factor " },
];
const Research_Breakdown_columns = [
  {
    title: "Course Code",
    key: "course_code",
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
  { title: "Course Title ", key: "course_title " },
  { title: "Session ", key: "session " },
  { title: "Semester", key: "semester " },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
