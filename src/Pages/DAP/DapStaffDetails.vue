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
                to="/dap"
                class="text-[var(--pri-text)] cursor-pointer font-[400] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/staff-records"
                class="text-[rgba(14,253,193,1)] font-[700] cursor-pointer text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/appraisal-management"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals Management
              </router-link>
            </li>
            <li>
              <router-link
                to="/dap/leave-analytics"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-bed"></i> Leave Analytics</router-link
              >
            </li>
            <li>
              <router-link
                to="/dap/promotion-career-progression"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>

            <li>
              <router-link
                to="/dap/report-analysis"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
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
            <div class="flex items-center gap-[10px]">
              <span
                class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
                >Staff Records</span
              >
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
                <button
                  @click="previous"
                  class="session flex items-center gap-[10px]"
                >
                  <i class="fas fa-chevron-left"></i>

                  <span
                    class="rgba(107,114,128,1) font-[400] text-[14px] leading-[100%] tracking-[0%]"
                    >Back</span
                  >
                </button>
                <span
                  class="text-[rgba(20,21,15,1)] text-[24px] leading-[120%] tracking-[0%] font-[700]"
                  >EUN/ACA/0231</span
                >
              </div>

              <div class="flex items-center gap-[10px]">
                <button
                  class="bg-[rgba(35,136,255,1)] view_performance_history text-[rgba(255,255,255,1)] text-[14px] font-[700] px-[20px] py-[10px] flex gap-[10px] rounded-[5px] items-center"
                  href="#"
                >
                  <i class="fa fa-file-text text-[rgba(255,255,255,1)]"></i>
                  Generate Staff Summary Report
                </button>
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
            <!-- Employment Details-->
            <div class="">
              <div class="top flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Employment Details
                </h2>
                <div class="flex flex-items gap-2">
                  <button
                    class="toggle-data"
                    v-if="showEmploymentDetails"
                    @click="toggleShowEmploymentDetails"
                  >
                    <i class="fa fa-chevron-down"></i></button
                  ><button
                    class="toggle-data"
                    @click="toggleShowEmploymentDetails"
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
              </div>
            </div>

            <!-- Academic Qualifications -->
            <div class="">
              <div class="top my-[12px] mr-0 flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Academic Qualifications
                </h2>
                <div class="flex flex-items gap-2">
                  <button
                    class="toggle-data"
                    v-if="academicQualifications"
                    @click="toggleAcademicQualifications"
                  >
                    <i class="fa fa-chevron-down"></i></button
                  ><button
                    class="toggle-data"
                    @click="toggleAcademicQualifications"
                    v-if="academicQualifications == false"
                  >
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div class="overflow-hidden w-full" v-if="academicQualifications">
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
            </div>
            <!-- PERFORMANCE & APPRAISAL - CAREER PROGRESSION - LEAVE & ATTENDANCE -->
            <div class="">
              <div class="top m-[12px] mr-0 flex justify-between">
                <h2
                  class="text-[rgba(17,27,73,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                >
                  Professional Memberships - Contact & Emergency
                  Information-Activity Summary
                </h2>
                <div class="flex flex-items gap-2">
                  <button
                    class="toggle-data"
                    v-if="professionalMemberships"
                    @click="toggleProfessionalMemberships"
                  >
                    <i class="fa fa-chevron-down"></i></button
                  ><button
                    class="toggle-data"
                    @click="toggleProfessionalMemberships"
                    v-if="professionalMemberships == false"
                  >
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div
                v-if="professionalMemberships"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                <div class="flex p-[12px] flex-col gap-[30px] border-[1.5px]">
                  <h2
                    class="text-[rgba(27,37,89,1)] flex justify-between items-center font-[700] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    Professional Memberships
                    <i
                      class="fas fa-pen-to-square text-[rgba(35,136,255,1)]"
                    ></i>
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
                          COREN
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        2020
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
                          NSE
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        2018
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
                          NASMSSN
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        2016
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex p-[12px] flex-col gap-[30px] border-[1.5px]">
                  <h2
                    class="text-[rgba(27,37,89,1)] flex justify-between items-center font-[700] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    Contact & Emergency Information
                    <i
                      class="fas fa-pen-to-square text-[rgba(35,136,255,1)]"
                    ></i>
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
                          Aisha Musa (Wife)
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        +234 802 223 4567
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
                          Alt Email
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        musa.ibrahim@gmail.com
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
                          Office Phone
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        +234 803 812 7734
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
                          Address
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        22A Obafemi Awolowo Street, Akoka
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex p-[12px] flex-col gap-[30px] border-[1.5px]">
                  <h2
                    class="text-[rgba(27,37,89,1)] font-[700] text-[16px] leading-[100%] tracking-[0%]"
                  >
                    Activity Summary
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
                          Total Years in Service
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        13 Years
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
                          Appraisals Completed
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        5
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
                          Publications Uploaded
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        18
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
                          Next Promotion Eligibility
                        </h2>
                      </div>
                      <p
                        class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                      >
                        March 2024
                      </p>
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
                  <button
                    class="toggle-data"
                    v-if="retirementAndExit"
                    @click="toggleRetirementAndExist"
                  >
                    <i class="fa fa-chevron-down"></i></button
                  ><button
                    class="toggle-data"
                    v-else
                    @click="toggleRetirementAndExist"
                  >
                    <i class="fa fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div
                v-if="retirementAndExit"
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
                  <button
                    class="toggle-data"
                    v-if="showFiles"
                    @click="toggleShowFiles"
                  >
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
        <form action="#" class="modals" @submit.prevent=""></form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, h, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Orbit from "@/assets/imgs/Orbit.png";
import Img from "@/assets/imgs/img.jpg";

const route = useRoute();
const router = useRouter();

function previous() {
  router.back();
}

const { id } = defineProps({
  id: {
    type: String,
  },
});
const form = reactive({
  status: null,
  date: null,
  is_active: false,
  faculty: null,
  search: "",
});

const retirementAndExit = ref(true);
const showEmploymentDetails = ref(true);
const professionalMemberships = ref(true);
const showFiles = ref(true);
const showBasicBio = ref(true);
const academicQualifications = ref(true);

function toggleRetirementAndExist() {
  retirementAndExit.value = !retirementAndExit.value;
}
function toggleShowEmploymentDetails() {
  showEmploymentDetails.value = !showEmploymentDetails.value;
}
function toggleProfessionalMemberships() {
  professionalMemberships.value = !professionalMemberships.value;
}
function toggleShowFiles() {
  showFiles.value = !showFiles.value;
}
function toggleBasicBio() {
  showBasicBio.value = !showBasicBio.value;
}
function toggleAcademicQualifications() {
  academicQualifications.value = !academicQualifications.value;
}

let statusOptions = reactive([
  {
    label: "Status One",
    value: "Status One",
  },
]);
let monthYearOptions = reactive([
  {
    label: "Month Year Option",
    value: "Month Year Option",
  },
]);
let categories = reactive([
  {
    label: "Physical Science",
    value: "Physical Science",
  },
]);

const toggleState = ref(false);
const toggleSideBar = () => {
  toggleState.value = !toggleState.value;
};

const columns = [
  {
    title: "Qualification ",
    key: "qualifications",
  },
  { title: "Institution", key: "institution" },
  { title: "Year", key: "year" },
  { title: "Discipline", key: "discipline" },

  {
    title: "Action",
    key: "action",
    render: (row) => {
      return h(
        "button",
        {
          class:
            "bg-[rgba(35,136,255,1)] view text-[rgba(255,255,255,1)] rounded-[5px] py-[10px] px-[20px] w-full",
        },
        ["View"]
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

<style scoped></style>
