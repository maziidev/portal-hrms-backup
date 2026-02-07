import HeadOfUnitLayout from "../../Layout/HeadOfUnitLayout.vue";

import HOUDashboard from "../../Pages/hou/HOUDashboard.vue";

// appraisals
import Appraisals from "../../Pages/hou/appraisals/Appraisals.vue";

// leave
import Leave from "../../Pages/hou/leave/Leave.vue";
import LeaveActive from "../../Pages/hou/leave/LeaveActive.vue";
import LeaveBalance from "../../Pages/hou/leave/LeaveBalance.vue";

// promotions
import Promotions from "../../Pages/hou/promotions/Promotions.vue";

// staffs
import StaffDetails from "../../Pages/hou/staffs/StaffDetails.vue";
import Staffs from "../../Pages/hou/staffs/Staffs.vue";

export const houRoutes = {
  path: "/unit_head",
  component: HeadOfUnitLayout,
  meta: { role: "unit_head", requiresAuth: true },

  children: [
    { path: "", name: "HOUDashboard", component: HOUDashboard },

    // staffs
    { path: "staffs", name: "HouStaffs", component: Staffs },
    { path: "staffs/:id", name: "StaffDetais", component: StaffDetails },

    // promotion
    { path: "promotion", name: "Promotion", component: Promotions },

    // appraisals
    { path: "appraisals", name: "Appraisals", component: Appraisals },

    // leave
    { path: "leaves", name: "Leave", component: Leave },
    { path: "leave-active", name: "LeaveActive", component: LeaveActive },
    { path: "leave-balance", name: "LeaveBalance", component: LeaveBalance },
  ],
};
