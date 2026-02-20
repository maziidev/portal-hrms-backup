<template>
  <div class="relative">
    <button
      @click="toggleSideBar"
      class="absolute md:hidden menu-bar lg:hidden z-[2000] font-[700] text-[30px] top-[20px] right-[20px] px-[4px] py-[-2px] rounded-sm"
    >
      <i class="fa fa-bars"></i>
    </button>
    <div class="dashboard w-full min-h-screen">
      <div class=" ">
        <aside
          :class="[
            `{ w-[268px] sidebar z-[3000] transition-all duration-100 ease-in-out  fixed top-0 left-0 h-screen md:flex lg:flex px-[35px] flex flex-col gap-[67px] py-[45px] bg-[var(--primary)]`,
            !toggleState ? `hidden` : `md:flex lg:flex`,
          ]"
        >
          <div class="">
            <li
              class="text-[rgba(14,253,193,1)] font-[700] text-[20px] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
            >
              Orbit <img :src="Orbit" />
            </li>
          </div>
          <div class="flex flex-col gap-[25px]">
            <li>
              <router-link
                to="/hod"
                class="text-[var(--pri-text)] font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/staff-records"
                class="text-[rgba(14,253,193,1)] font-[700] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/appraisal"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Appraisals</router-link
              >
            </li>

            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career Progression</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-calendar"></i> Retirement & Exit</a
              >
            </li>
            <li>
              <router-link
                to="/hod/report-analysis"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="Report_Analysis.html"
                ><i class="fa-solid fa-chart-column"></i>Reports &
                Analytics</router-link
              >
            </li>
          </div>

          <div class="flex flex-col gap-[25px]">
            <li>
              <a
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa fa-gear"></i> Settings</a
              >
            </li>
            <li>
              <a
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                href="#"
                ><i class="fa-solid fa-right-from-bracket"></i> Logout</a
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <i class="fa fa-bell text-[var(--pri-text)]"></i>
              <span
                class="text-[var(--pri-text)] flex items-center gap-2 font-[400] text-[16px] tracking-[-2%] leading-[120%]"
                >Notification</span
              >
            </li>
            <li class="md:hidden lg:hidden items-center gap-[10px] flex">
              <div class="user">
                <i class="fa fa-user text-xl text-[var(--pri-text)]"></i>
              </div>
              <div class="user-id mbc text-[var(--pri-text)] break-words">
                Nnamdichuzu@edu.EU.ng
              </div>
            </li>
          </div>
        </aside>
      </div>
      <main class="lg:ml-[270px] md:ml-[270px] ml-[0px] min-w-screen relative">
        <div class="header">
          <header
            class="bg-[var(--pri-bg)] py-[25px] items-center px-[25px] w-[] top-0 flex justify-between"
          >
            <div class="w-[70%]">
              <h2 class="bc mb-[7px]">Staff Detail</h2>
            </div>
            <div class="md:flex lg:flex items-center gap-[10px] hidden">
              <i class="fa fa-bell text-[var(--sec-text)]"></i>
              <div class="user">
                <i class="fa fa-user text-2xl"></i>
              </div>
              <div class="user-id mbc">Nnamdichuzu@edu.EU.ng</div>
            </div>
          </header>
        </div>

        <div class="main px-[25px] mt-[50px] flex flex-col gap-[40px]">
          <div class="">
            <div class="flex justify-between items-center gap-[10px]">
              <div class="flex items-center gap-2">
                <router-link to="/hod/staff-records"
                  class="session  flex items-center gap-[10px]"
                >
                  <i class="fas fa-chevron-left"></i>

                  <span class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]">Back</span>
                </router-link>
                <span
                  class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
                  >EUN/ACA/0231</span
                >
              </div>

              <div class="semester flex items-center gap-[10px]">
                <a href="#"
                  ><i
                    class="fa fa-ellipsis-h text-[rgba(152,159,176,1)] text-[40px]"
                  ></i
                ></a>
              </div>
            </div>
          </div>

          <!-- Personal Info -->
          <div class="flex flex-col gap-[20px]">
            <!-- Image -->

            <div class="">
              <div class="image my-[10px]">
                <img
                  :src="Img"
                  class="object-contain w-[400px] h-[284px]"
                  alt=""
                />
              </div>
              <div class="top flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Personal Information
                </h2>
                <div class="flex flex-items gap-2">
                  <button class="toggle-data" v-if="showBasicBio" @click="toggleBasicBio">
                    <i class="fa fa-chevron-down"></i></button
                  ><button class="toggle-data " v-else @click="toggleBasicBio">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div v-if="showBasicBio"
                class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
              >
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
                    >Gender</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    Female
                  </span>
                </div>
                <div class="dob flex justify-between items-center">
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Date of Birth</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    02/04/1980
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
                    >Phone</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    +234 708 564 8905
                  </span>
                </div>
                <div class="marital_status flex justify-between items-center">
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Marital Status</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    Married
                  </span>
                </div>
                <div class="marital_status flex justify-between items-center">
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Marital Status</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    Married
                  </span>
                </div>
              </div>
            </div>
            <!-- Professional Information -->
            <div class="">
              <div class="top flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Professional Information
                </h2>
                <div class="flex flex-items gap-2">
                  <button class="toggle-data" v-if="showPersonalInformation" @click="togglePersonalInformation">
                    <i class="fa fa-chevron-down"></i></button
                  ><button class="toggle-data " v-else @click="togglePersonalInformation">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div v-if="showPersonalInformation"
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
                    Academic
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
                <div
                  class="date_of_last_promotion flex justify-between items-center"
                >
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
                <div class="qualification flex justify-between items-center">
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Qualification(s)</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    PhD (2020), MSc (2014)
                  </span>
                </div>
                <div
                  class="area_of_specialization flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Area of Specialization</span
                  >
                  <span
                    class="text-[rgba(17,27,73,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    Governance & Policy Studies
                  </span>
                </div>
              </div>
            </div>

            <!-- PERFORMANCE & APPRAISAL - CAREER PROGRESSION - LEAVE & ATTENDANCE -->
            <div class="">
              <div class="top m-[12px] flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  PERFORMANCE & APPRAISAL - CAREER PROGRESSION - LEAVE &
                  ATTENDANCE
                </h2>
                <div class="flex flex-items gap-2">
                  <button class="toggle-data" v-if="performanceAndAppraisalLeaveAndAttendanceCareerProgression" @click="togglePerformanceAndAppraisalLeaveAndAttendanceCareerProgression">
                    <i class="fa fa-chevron-down"></i></button
                  ><button class="toggle-data " v-else @click="togglePerformanceAndAppraisalLeaveAndAttendanceCareerProgression">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div v-if="performanceAndAppraisalLeaveAndAttendanceCareerProgression"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                <div
                  class="flex p-[12px] flex-col justify-between gap-[30px] border-[1.5px]"
                >
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
                  >
                    Performance & Appraisal
                  </h2>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span>
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Last Appraisal Status
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        Completed – 2024
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span>
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Appraisal Score
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        87%
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span>
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Supervisor Comment
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      ></p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-center gap-[10px] bg-[rgba(141,193,255,0.13)] items-center w-full"
                    >
                      <h2
                        class="px-[12px] py-[15px] text-[rgba(161,161,170,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                      >
                        Exceeds expectations in research output.
                      </h2>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span>
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Ongoing Appraisal
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        None
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="flex p-[12px] flex-col justify-between gap-[30px] border-[1.5px]"
                >
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
                  >
                    Leave & Attendance
                  </h2>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Leave Balance
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        20 days
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Attendance Notes
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        3 Absences this semester
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span>
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Promotion History
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      ></p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex items-center border p-[5px] gap-[10px] border-[rgba(141,193,255,0.12)] items-center w-full"
                    >
                      <span
                        class="rounded-full bg-[rgba(35,136,255,1)] w-[12px] h-[12px]"
                      ></span>
                      <h2
                        class="px-[12px] py-[15px] text-[rgba(161,161,170,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                      >
                        2024 – Annual Leave (Approved)
                      </h2>
                    </div>
                  </div>
                </div>
                <div
                  class="flex p-[12px] flex-col justify-between gap-[30px] border-[1.5px]"
                >
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
                  >
                    CAREER PROGRESSION
                  </h2>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Promotion Eligibility
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        Eligible 2026
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <!-- <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span> -->
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Endorsement Status
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        Approved by HOD
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex justify-between gap-[10px] items-center w-full"
                    >
                      <div class="flex gap-4 items-center">
                        <span
                          class="w-[4px] block bg-[rgba(67,24,255,1)] h-[41px] rounded-[16px]"
                        ></span>
                        <h2
                          class="text-[rgba(27,37,89,1)] font-[700] text-[14px] leading-[120%] tracking-[-2%]"
                        >
                          Promotion History
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      ></p>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-[10px]">
                    <div
                      class="flex items-center border p-[5px] gap-[10px] border-[rgba(141,193,255,0.12)] items-center w-full"
                    >
                      <span
                        class="rounded-full bg-[rgba(35,136,255,1)] w-[12px] h-[12px]"
                      ></span>
                      <h2
                        class="px-[12px] py-[15px] text-[rgba(161,161,170,1)] font-[500] text-[14px] leading-[120%] tracking-[-2%]"
                      >
                        Lecturer II → Senior Lecturer (2022)
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RETIREMENT & EXIT -->
            <div class="py-[7px]">
              <div class="top flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  RETIREMENT & EXIT
                </h2>
                <div class="flex flex-items gap-2">
                  <button class="toggle-data" v-if="retirementAndExit" @click="toggleRetirementAndExist">
                    <i class="fa fa-chevron-down"></i></button
                  ><button class="toggle-data" v-else @click="toggleRetirementAndExist">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div v-if="retirementAndExit"
                class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
              >
                <div
                  class="expected_retirement_date flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Expected Retirement Date</span
                  >
                  <div class="">
                    <span
                      class="text-[14px] font-[700] leading-[100%] tracking-[0%] text-[var(--sec-text)] rounded-[5px]"
                      >01/12/2035</span
                    >
                  </div>
                </div>
                <div
                  class="expected_retirement_date flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Clearance Status</span
                  >
                  <div class="">
                    <span
                      class="text-[14px] font-[700] leading-[100%] tracking-[0%] text-[var(--sec-text)] rounded-[5px]"
                      >Not initiated</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- FILES / DOCUMENTS -->
            <div class="py-[7px]">
              <div class="top flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  FILES / DOCUMENTS
                </h2>
                <div class="flex flex-items gap-2">
                  <button class="toggle-data" v-if="showFiles" @click="toggleShowFiles">
                    <i class="fa fa-chevron-down"></i></button
                  ><button class="toggle-data " v-else @click="toggleShowFiles">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div v-if="showFiles"
                class="flex transition-all duration-500 ease-in-out flex-col gap-[20px] border-b py-[20px] border-[rgba(240,240,240,1)]"
              >
                <div
                  class="expected_retirement_date flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Appointment Letters</span
                  >
                  <div class="flex items-center gap-[10px]">
                    <a href="#" download="download"
                      ><i class="fa fa-download text-[var(--sec-text)]"></i
                    ></a>
                    <span
                      class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                      >View</span
                    >
                  </div>
                </div>
                <div
                  class="expected_retirement_date flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Appraisal Reports</span
                  >
                  <div class="flex items-center gap-[10px]">
                    <a href="#" download="download"
                      ><i class="fa fa-download text-[var(--sec-text)]"></i
                    ></a>
                    <span
                      class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                      >View</span
                    >
                  </div>
                </div>
                <div
                  class="expected_retirement_date flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Master’s Certificate</span
                  >
                  <div class="flex items-center gap-[10px]">
                    <a href="#" download="download"
                      ><i class="fa fa-download text-[var(--sec-text)]"></i
                    ></a>
                    <span
                      class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                      >View</span
                    >
                  </div>
                </div>
                <div
                  class="expected_retirement_date flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >PHD Certificate</span
                  >
                  <div class="flex items-center gap-[10px]">
                    <a href="#" download="download"
                      ><i class="fa fa-download text-[var(--sec-text)]"></i
                    ></a>
                    <span
                      class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                      >View</span
                    >
                  </div>
                </div>
                <div
                  class="expected_retirement_date flex justify-between items-center"
                >
                  <span
                    class="text-[rgba(152,159,176,1)] font-[500] text-[16px] leading-[100%] tracking-[0%]"
                    >Thesis Documents</span
                  >
                  <div class="flex items-center gap-[10px]">
                    <a href="#" download="download"
                      ><i class="fa fa-download text-[var(--sec-text)]"></i
                    ></a>
                    <span
                      class="view bg-[rgba(35,136,255,1)] text-[14px] font-[700] leading-[100%] tracking-[0%] text-[rgba(255,255,255,1)] py-[10px] px-[20px] rounded-[5px]"
                      >View</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import Orbit from "@/assets/imgs/Orbit.png";
import Img from "@/assets/imgs/img.jpg";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";


const router = useRouter();
const route = useRoute();

const props = defineProps({
    id:{
        type:String,
        required:true
    }
})


const data = reactive({
  department_unit: null,
  employment_type: null,
  status: null,
  date: null,
  is_active: false,
});
const activeState = ref(null);

function isActive(id) {
  activeState.value = id;
  console.log(id);
}

const retirementAndExit = ref(true);
const performanceAndAppraisalLeaveAndAttendanceCareerProgression  = ref(true);
const showFiles = ref(true);
const showBasicBio = ref(true);
const showPersonalInformation = ref(true);

function toggleRetirementAndExist() {
  retirementAndExit.value = !retirementAndExit.value;
}
function togglePerformanceAndAppraisalLeaveAndAttendanceCareerProgression() {
  performanceAndAppraisalLeaveAndAttendanceCareerProgression.value = !performanceAndAppraisalLeaveAndAttendanceCareerProgression.value;
}
function toggleShowFiles() {
  showFiles.value = !showFiles.value;
}
function toggleBasicBio() {
    showBasicBio.value = !showBasicBio.value;
}
function togglePersonalInformation() {
    showPersonalInformation.value = !showPersonalInformation.value;
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
// SET THE ACTIVE STATE TO ACTIVE STAFF
onMounted(() => {
  activeState.value = btns[0].name;
});

// Show Modals
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
function CloseAppriasalModal1() {
  show1.value = false;
}
function OpenAppriasalModal1() {
  show1.value = true;
}
function CloseAppriasalModal2() {
  show4.value = false;
}
function OpenAppriasalModal2() {
  show4.value = true;
  console.log(show4.value);
}
function CloseAddNewStaffModal() {
  show2.value = false;
}
function OpenAddNewStaffModal() {
  show2.value = true;
}
function CloseGenerateModal() {
  show3.value = false;
}
function OpenGenerateModal() {
  show3.value = true;
}
const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

// Define table columns
const columns = [
  {
    title: "Staff ID",
    key: "staff_id",
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
  { title: "Name  ", key: "name " },
  { title: "Position", key: "position" },
  { title: "Rank  ", key: "rank" },
  { title: "Role", key: "role" },
  { title: "Employment Type  ", key: "employment_type  " },
  { title: "Employment Date  ", key: "employment_date  " },
];
const pagination = {
  // pageSize:10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};
</script>

<style scoped></style>
