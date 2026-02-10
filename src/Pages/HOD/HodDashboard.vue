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
                class="text-[rgba(14,253,193,1)] cursor-pointer font-[700] flex gap-2 items-center text-[16px] tracking-[-2%] leading-[120%]"
                ><i class="fa fa-th-large"></i>Dashboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/staff-records"
                class="text-[var(--pri-text)] cursor-pointer font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-user-circle"></i>Staff Records</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/appraisal"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-file-text"></i> Appraisals
              </router-link>
            </li>
            <li>
              <router-link
                to="/hod/leave-management"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-bed"></i> Leave Management</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/promotion-career-progression"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                href="#"
                ><i class="fa fa-award"></i> Promotions & Career
                Progression</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/retirement-exit"
                class="text-[var(--pri-text)] font-[400] text-[14px] tracking-[-2%] leading-[120%] flex items-center gap-2"
                ><i class="fa fa-calendar"></i> Retirement & Exit</router-link
              >
            </li>
            <li>
              <router-link
                to="/hod/report-analysis"
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
            <div class="w-[70%]">
              <h2 class="bc mb-[7px]">Welcome back, Prof. Adebayo</h2>
              <h5 class="sbc">Head of Department (Economics)</h5>
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
            <div
              class="flex justify-between gap-[20px] flex-wrap md:flex-nowrap"
            >
              <div class="session flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16">Session</div>
                <div class="date mbc">2024/2025</div>
              </div>
              <div class="semester flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16">Semester</div>
                <div class="date mbc">First</div>
              </div>
              <div class="semester flex items-center gap-[10px]">
                <div class="session">
                  <!-- Calendar with more details -->

                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="s16">28th September 2025</div>
                <div class="date mbc flex items-center gap-5">
                  <i class="fa fa-clock"></i><span>6:45 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]"
          >
            <div
              class="bg-[var(--twhite)] p-[12px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div
                class="rounded-[40px] shadow bg-[rgba(17,27,73,1)] flex flex-col gap-[10px] py-[20px] px-[40px]"
              >
                <h4 class="text-[rgba(141,193,255,1)] mbs">
                  Total Department Staff
                </h4>
                <div class="flex justify-between items-center gap-3">
                  <div class="balance">
                    <h2
                      class="text-[rgba(255,255,255,1)] text-[34px] font-[700] leading-[120%] tracking-[-2%]"
                    >
                      23,458
                    </h2>
                  </div>
                  <div class="flex gap-3 items-center">
                    <i class="fa fa-caret-up text-[rgba(14,253,193,1)]"></i>
                    <span class="text-[rgba(14,253,193,1)]">+12</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-[30px]">
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Active Appraisal Cycle
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      In Progress (30/58 complete)
                    </p>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(24,24,27,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      1
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Appraisals in Progress
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      Ongoing appraisal sessions awaiting completion
                    </p>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(24,24,27,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      18
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Pending Appraisals
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      Staff yet to be appraised this cycle
                    </p>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(24,24,27,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      24
                    </h2>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div class="flex justify-between flex-col gap-2">
                    <h2
                      class="text-[var(--primary)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      Pending Requests
                    </h2>
                    <p
                      class="text-[rgba(152,159,176,1)] font-[500] text-[10px] leading-[120%] tracking-[-2%]"
                    >
                      4 leave requests, 2 promotion requests
                    </p>
                  </div>
                  <div class="price">
                    <h2
                      class="text-[rgba(24,24,27,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
                    >
                      6
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-[var(--twhite)] p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div class="">
                <h2
                  class="text-[var(--primary)] font-[600] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Appraisal Progress
                </h2>
              </div>
              <div id="chart" class="items-center flex flex-col">
                <apexchart
                  type="donut"
                  height="250"
                  :options="pieChartOptions"
                  :series="pieSeries"
                />
              </div>

              <div class="flex flex-col gap-[30px]">
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[15px] block bg-[rgba(43,77,237,1)] h-[15px] rounded-full"
                      ></span>
                      <h2
                        class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
                      >
                        Staff Appraised
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      19,987
                    </p>
                  </div>
                </div>
                <div class="flex justify-between items-center gap-[10px]">
                  <div
                    class="flex justify-between gap-[10px] items-center w-full"
                  >
                    <div class="flex gap-4 items-center">
                      <span
                        class="w-[15px] block bg-[rgba(35,136,255,1)] h-[15px] rounded-full"
                      ></span>
                      <h2
                        class="text-[rgba(35,136,255,1)] font-[500] text-[14px] leading-[100%] tracking-[-2%]"
                      >
                        Pending
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(24,24,27,1)] font-[600] text-[16px] leading-[120%] tracking-[-2%]"
                    >
                      3,987
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-[var(--twhite)] p-[20px] shadow-sm border border-slate-100 rounded-[20px] gap-[10px] flex flex-col justify-between"
            >
              <div class="">
                <h2
                  class="text-[rgba(27,37,89,1)] font-[700] text-[20px] leading-[120%] tracking-[-2%]"
                >
                  Recent Activities
                </h2>
              </div>
              <div class="flex flex-col gap-[30px]">
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
                        Started 2025 Annual Appraisal Cycle
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
                        Approved leave request for Mr. John Yusuf
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
                        Endorsed promotion for Dr. Grace Bello
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
                        Completed appraisal for Prof. James Obi
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      Sept 12, 03:00 PM
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
                        Completed review for Mr. Ade
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      1 week ago
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
                        Completed appraised for Dr. Okafor
                      </h2>
                    </div>
                    <p
                      class="text-[rgba(163,174,208,1)] font-[500] text-[12px] leading-[120%] tracking-[-2%]"
                    >
                      1 week ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick_actions flex flex-col gap-[15px]">
            <h2
              class="text-[rgba(30,43,58,1)] font-[700] text-[16px] leading-[120%] tracking-[-2%]"
            >
              Quick Actions
            </h2>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white gap-[15px]"
            >
              <button
                class="flex items-center py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fa fa-file-text text-[rgba(255,255,255,1)]"></i>

                Start Appraisal
              </button>
              <button
                class="flex items-center py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fa fa-user-plus text-[rgba(255,255,255,1)]"></i>

                Approve Staff Requests
              </button>
              <button
                class="flex items-center py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i class="fas fa-file-text text-[rgba(255,255,255,1)]"></i>

                Generate Department Report
              </button>
              <button
                class="flex items-center py-[15px] px-[40px] gap-[10px] rounded-[5px] bg-[rgba(35,136,255,1)] justify-center gap-5 text-[rgba(255,255,255,1)] font-[600] text-[14px] leading-[120%] tracking-[-2%]"
              >
                <i
                  class="fa fa-volume-up nstyle text-[rgba(255,255,255,1)]"
                ></i>

                Send Staff Notification
              </button>
            </div>
          </div>

  <!-- Pending Approvals -->
  <form class="pending_requests w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-[30px]"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-[10px]"
      >
        <h2
          class="font-bold text-(--sec-text) w-[200px] text-[20px] leading-[120%] tracking-[-2%]"
        >
          Pending Appraisals
        </h2>
        <div class="relative w-[50%]">
          <div class="h-full absolute left-[10px] flex items-center">
            <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
          </div>
          <n-input
            type="search"
            name="search"
            placeholder="Search for anything..."
            id="search"
            :bordered="false"
            v-model:value="form.search"
            class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
          />
        </div>
      </div>
      <div
        class="right grid grid-cols-2 gap-[1px] md:w-[50%] w-full flex-wrap lg:grid-cols-2 md:grid-cols-2"
      >
        <n-select
          name="type"
          id="type"
          v-model:value="form.category"
          :options="categories"
          clearable
          :bordered="true"
          placeholder="Category"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-select
          v-model:value="form.status"
          :options="statusOptions"
          clearable
          :bordered="true"
          name="status"
          id="status"
          placeholder="Status"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
      </div>
    </div>
    <div class="w-full overflow-hidden mt-3">
      <div class="overflow-x-auto">
        <n-data-table
          :columns="columns"
          :loading="loading"
          :bordered="false"
          :sc
          l-x="1200"
          :pagination="pagination"
        />
      </div>
    </div>
  </form>
  <!-- Pending Staff Requests -->
  <form class="w-full mb-5">
    <div
      class="top flex justify-between w-full items-center flex-wrap md:flex-nowrap gap-7.5"
    >
      <div
        class="left flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center w-full md:w-[50%] lg:w-[50%] gap-2.5"
      >
        <h2
          class="font-bold text-(--sec-text) w-62.5 text-[20px] leading-[120%] tracking-[-2%]"
        >
          Pending Staff Requests
        </h2>
        <div class="relative w-[50%]">
          <div class="h-full absolute left-[10px] flex items-center">
            <i class="fa text-[rgba(107,114,128,1)] fa-search"></i>
          </div>
          <n-input
            type="search"
            name="search"
            placeholder="Search for anything..."
            id="search"
            :bordered="false"
            v-model:value="form.search"
            class="search w-full border outline-none rounded-[5px] border-[rgba(229,231,235,1)]"
          />
        </div>
      </div>
      <div
        class="right grid grid-cols-2 gap-[1px] md:w-[50%] w-full flex-wrap lg:grid-cols-2 md:grid-cols-2"
      >
        <n-select
          name="type"
          id="type"
          v-model:value="form.request_type"
          :options="request_types"
          clearable
          :bordered="true"
          placeholder="Request Type"
          class="cursor-pointer rounded-[10px] outline-none"
        >
        </n-select>
        <n-date-picker
          :v-model="form.date"
          type="date"
          placeholder="DD-MM-YYYY"
          :bordered="true"
          class="w-full outline-none  font-normal text-[14px] leading-[120%] tracking-[-2%] text-[rgba(161,161,170,1)]"
        />
      </div>
    </div>
    <div class="w-full overflow-hidden mt-3">
      <div class="overflow-x-auto">
        <n-data-table
          :columns="pending_requests_column"
          :loading="loading"
          :bordered="false"
          :scroll-x="1200"
          :pagination="pagination"
        />
      </div>
    </div>
  </form>
  <form action="#" class="modals" @submit.prevent="">
    <AddNewStaff :show2 @CloseModalForAddNewStaff="CloseAddNewStaffModal" />
    <OpenAppraisal1
      :show1
      @CloseModalForOpenAppriasal2="CloseAppriasalModal2"
      @CloseModalForOpenAppriasal1="CloseAppriasalModal1"
      @OpenAppraisalModal2="OpenAppriasalModal2"
    />
    <OpenAppraisal2
      :show4
      @CloseModalForOpenAppriasal2="CloseAppriasalModal2"
    />

          <GenerateReport
            :show3
            @CloseModalForGenerateReport="CloseGenerateModal"
          />
        </form>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import OpenAppraisal1 from "@/components/AdminComponents/OpenAppraisal1.vue";
import OpenAppraisal2 from "@/components/AdminComponents/OpenAppraisal2.vue";
import GenerateReport from "@/components/AdminComponents/GenerateReport.vue";
import AddNewStaff from "@/components/AdminComponents/AddNewStaff.vue";

const form = reactive({
  status: null,
  category: null,
});

// Pie Chart
const pieSeries = ref([25, 75]);
const labels = ref(["Pending", "Staff Appraised"]);
const colors = ["rgba(35,136,255,1)", "rgba(43,7,237,1)"];

const pieChartOptions = computed(() => ({
  chart: {
    type: "donut",
    toolbar: { show: true },
    animations: { enabled: true },
    events: {
      // Example: click on a slice
      dataPointSelection: (event, chartContext, config) => {
        const idx = config.dataPointIndex;
        const label = labels.value[idx];
        const value = pieSeries.value[idx];
        // You can emit or handle this event as needed
        // console.log('Slice clicked:', { label, value })
      },
    },
  },
  labels: labels.value,
  colors,
  legend: { show: false },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { width: "100%" },
        legend: { position: "bottom" },
      },
    },
    {
      breakpoint: 1024,
      options: {
        chart: { width: 380 },
      },
    },
  ],
  tooltip: {
    y: {
      formatter: (val) => `${val}`, // format value text
    },
  },
  plotOptions: {
    pie: {
      expandOnClick: true,
      donut: {
        size: "58%",
        labels: {
          show: false,
        },
      },
    },
  },
}));

const status = reactive([
  { label: "0-5 years", value: "0-5 years" },
  { label: "5-7 years", value: "5-7 years" },
  { label: "0-5 years", value: "0-5 years" },
]);
const categories = reactive([
  { label: "22-02-2024", value: "22-02-2024" },
  { label: "22-02-2024", value: "22-02-2024" },
  { label: "22-02-2024", value: "22-02-2024" },
]);
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

const btns = ref([]);
const btn1 = ref(null);
const btn2 = ref(null);
const btn3 = ref(null);

btns.value[0] = btn1;
btns.value[1] = btn2;
btns.value[2] = btn3;
const series = ref([
  {
    name: "Average Years-in-Rank",
    data: [64, 64, 76, 78, 70, 70, 50, 55],
  },
]);

const DataSets = reactive({
  week: [30, 45, 60, 25, 50, 50, 20, 40],
  month: [45, 55, 65, 40, 60, 20, 40, 65],
  year: [25, 35, 50, 20, 40, 65, 40, 60],
});
const currentDataset = ref("week");
function updateChartData(event) {
  console.log(event.target.id);
  for (let x in DataSets) {
    console.log(btns.value);
    if (event.target.id === x) {
      series.value[0].data = DataSets[x];
      event.target.classList.add("bg-[rgba(35,136,255,1)]");
      event.target.classList.add("text-[rgba(247,249,250,1)]");
      btns.value.forEach((button) => {
        if (button.value.id !== event.target.id) {
          button.value.classList.remove("bg-[rgba(35,136,255,1)]");
          button.value.classList.remove("text-[rgba(247,249,250,1)]");
          console.log(button.value);
        }
      });
    }
  }
  currentDataset.value = event.target.id;
  event.target.className;
}

const chartOptions = ref({
  chart: {
    id: "vue-chart",
  },
  xaxis: {
    categories: [
      "Arts",
      "Agriculture",
      "Biosciences",
      "Bus. Admin",
      "Education",
      "Engineering",
      "Env. Science",
      "Phy. Science",
    ],
  },
  colors: ["#2388ff"],
});



// Define table columns
const columns = [
  {
    title: "Staff Name",
    key: "staff_name",
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
  {
    title: "Category",
    key: "category",
  },
  { title: "Last Updated ", key: "last_updated" },
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
const pending_requests_column = [
  {
    title: "Staff Name",
    key: "staff_name",
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
  {
    title: "Request Type",
    key: "request_type",
  },
  { title: "Submitted", key: "submitted" },
  {
    title: "Status",
    key: "status",
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

<style scoped></style>
