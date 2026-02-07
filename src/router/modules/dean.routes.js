import DeanLayout from "../../Layout/DeanLayout.vue";

import DeanDashboard from "../../Pages/dean/DeanDashboard.vue";

// departments
import DepartmentDetails from "../../Pages/dean/departments/DepartmentDetails.vue";
import Departments from "../../Pages/dean/departments/Departments.vue";

// staffs
import Staffs from "../../Pages/dean/staffs/Staff.vue";
import StaffDepartments from "../../Pages/dean/staffs/StaffDepartments.vue";
import StaffDetails from "../../Pages/dean/staffs/StaffDetails.vue";

// appraisals
import AppraisalDepartment from "../../Pages/dean/appraisals/AppraisalDepartment.vue";
import Appraisals from "../../Pages/dean/appraisals/Appraisals.vue";

// leave management
import LeaveManagement from "../../Pages/dean/leaves/LeaveManagement.vue";

// promotions
import Promotion from "../../Pages/dean/promotion/Promotion.vue";

export const deanRoutes = {
  path: "/dean",
  component: DeanLayout,
  meta: { roles: "dean", requiresAuth: true },

  children: [
    {
      path: "",
      name: "DeanDeanDashboard",
      component: DeanDashboard,
      meta: { requiresAuth: true, roles: "dean" },
    },

    // departments
    {
      path: "departments",
      name: "DeanDepartments",
      component: Departments,
      meta: { requiresAuth: true, roles: "dean" },
    },
    {
      path: "departments/:id",
      name: "DeanDepartmentDetails",
      component: DepartmentDetails,
      meta: { requiresAuth: true, roles: "dean" },
    },

    // staffs
    {
      path: "staffs",
      name: "DeanStaffs",
      component: Staffs,
      meta: { requiresAuth: true, roles: "dean" },
    },
    {
      path: "staffs/:id",
      name: "DeanStaffsDetails",
      component: StaffDetails,
      meta: { requiresAuth: true, roles: "dean" },
    },
    {
      path: "staff-departments/:id",
      name: "DeanStaffDepartments",
      component: StaffDepartments,
      meta: { requiresAuth: true, roles: "dean" },
    },

    // appraisals
    {
      path: "appraisals",
      name: "DeanAppraisals",
      component: Appraisals,
      meta: { requiresAuth: true, roles: "dean" },
    },
    {
      path: "appraisal-department/:id",
      name: "DeanAppraisalDepartment",
      component: AppraisalDepartment,
      meta: { requiresAuth: true, roles: "dean" },
    },

    // leave
    {
      path: "leaves",
      name: "DeanLeaveManagement",
      component: LeaveManagement,
      meta: { requiresAuth: true, roles: "dean" },
    },

    // promotion
    {
      path: "promotion",
      name: "DeanPromotion",
      component: Promotion,
      meta: { requiresAuth: true, roles: "dean" },
    },
  ],
};
