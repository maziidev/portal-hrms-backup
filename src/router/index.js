import { createRouter, createWebHistory } from "vue-router";

// ADMIN PAGES
import Admin from "../Pages/Admin/Admin.vue";
import StaffManagment from "../Pages/Admin/StaffManagment.vue";
// import Main from "../Layouts/Main.vue";
import Login from "@/Pages/Login.vue";
import { useAuthStore } from "@/store/auth.js";
import AcademicStaffDashboard from "../Pages/Academic-Staff/AcademicStaffDashboard.vue";
import AcademicStaffPromotionCareerProgression from "../Pages/Academic-Staff/AcademicStaffPromotionCareerProgression.vue";
import AcademicStaffAppraisal from "../Pages/Academic-Staff/Appraisal.vue";
import LeaveManagement from "../Pages/Academic-Staff/LeaveManagement.vue";
import ReasearchPublication from "../Pages/Academic-Staff/ReasearchPublication.vue";
import Appraisal from "../Pages/Admin/Appraisal.vue";
import Appraisal_Details from "../Pages/Admin/Appraisal_Details.vue";
import GenerateReport from "../Pages/Admin/GenerateReport.vue";
import ReportAnalysis from "../Pages/Admin/ReportAnalysis.vue";
import Dap_Promotion_Career_Progression from "../Pages/DAP/Dap_Promotion_Career_Progression.vue";
import Dap_Promotion_Career_Progression_Department from "../Pages/DAP/Dap_Promotion_Career_Progression_Department.vue";
import Dap_Publications_Research_Verification from "../Pages/DAP/Dap_Publications_Research_Verification.vue";
import Dap_Publications_Research_Verification_Faculty from "../Pages/DAP/Dap_Publications_Research_Verification_Faculty.vue";
import DapAllStaffRecords from "../Pages/DAP/DapAllStaffRecords.vue";
import DapAppraisalManagement from "../Pages/DAP/DapAppraisalManagement.vue";
import DapDashboard from "../Pages/DAP/DapDashboard.vue";
import DapDepartmentalAppraisal from "../Pages/DAP/DapDepartmentalAppraisal.vue";
import DapDepartmentalAppraisalRecords from "../Pages/DAP/DapDepartmentalAppraisalRecords.vue";
import DapDepartmentRecords from "../Pages/DAP/DapDepartmentRecords.vue";
import DapLeaveAnalytics from "../Pages/DAP/DapLeaveAnalytics.vue";
import DapLeaveDetails from "../Pages/DAP/DapLeaveDetails.vue";
import DapStaffDetails from "../Pages/DAP/DapStaffDetails.vue";
import DapStaffRecords from "../Pages/DAP/DapStaffRecords.vue";
import AssignedStaffEvaluation from "../Pages/External-Accessor/AssignedStaffEvaluation.vue";
import Evaluation from "../Pages/External-Accessor/Evaluation.vue";
import Evaluation_Summary from "../Pages/External-Accessor/Evaluation_Summary.vue";
import ExternalAccessorDashboard from "../Pages/External-Accessor/ExternalAccessorDashboard.vue";
import HodActiveLeaves from "../Pages/HOD/HodActiveLeaves.vue";
import HodAppraisal from "../Pages/HOD/HodAppraisal.vue";
import HodDashboard from "../Pages/HOD/HodDashboard.vue";
import HodLeaveBalanceReport from "../Pages/HOD/HodLeaveBalanceReport.vue";
import HodLeaveManagment from "../Pages/HOD/HodLeaveManagment.vue";
import HodPromotion_Career_Progression from "../Pages/HOD/HodPromotion_Career_Progression.vue";
import HodPromotionSummary from "../Pages/HOD/HodPromotionSummary.vue";
import HodStaffRecordDetails from "../Pages/HOD/HodStaffRecordDetails.vue";
import HodStaffRecords from "../Pages/HOD/HodStaffRecords.vue";
import NotFound from "../Pages/NotFound.vue";

// dean, hou
import { deanRoutes } from "./modules/dean.routes";
import { houRoutes } from "./modules/hou.routes";

import AcademicStaff from "../Layout/Academic-Staff/Academic-Staff.vue";
import AdminLayout from "../Layout/AdminLayout/Admin.vue";
import HodLayout from "../Layout/HodLayout/HodLayout.vue";
import DapLayout from "../Layout/DapLayout/DapLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },

    {
      path: "/login",
      component: Login,
      name: "login",
    },

    deanRoutes,
    houRoutes,

    // ADMIN ROUTES
    {
      path: "/admin",
      component: AdminLayout,
      
      meta: {
        requiresAuth: true,
        roles: ["admin"],
      },
      children: [
        {
          path: "",
          component: Admin,
          name: "admin",
        },
        {
          path: "staff-managment",
          component: StaffManagment,
          name: "staff-managment",
        },
        {
          path: "appraisal",
          component: Appraisal,
          name: "appraisal",
        },
        {
          path: "appraisal/:id",
          component: Appraisal_Details,
          name: "appraisal-details",
          props: true,
        },
        {
          path: "report-analysis",
          component: ReportAnalysis,
          name: "report-analysis",
        },
        {
          path: "generate-report",
          component: GenerateReport,
          name: "generate-report",
        },
      ],
    },

    // EXTERNAL ACCESSOR ROUTES
    {
      path: "/external-accessor",
      component: ExternalAccessorDashboard,
      name: "external-accessor",
      meta: {
        requiresAuth: true,
        roles: ["external-accessor"],
      },
      children: [
        {
          path: "assigned-staff-evaluation",
          component: AssignedStaffEvaluation,
          name: "external-accessor-assigned-staff-evaluation",
        },
        {
          path: "evaluation",
          component: Evaluation,
          name: "external-accessor-evaluation",
        },
        {
          path: "evaluation_summary",
          component: Evaluation_Summary,
          name: "external-accessor-evaluation_summary",
        },
      ],
    },

    // ACADEMIC STAFF
    {
      path: "/lecturer",
      component: AcademicStaff,
      meta: {
        requiresAuth: true,
        roles: ["lecturer"],
      },
      children: [
        {
          path: "",
          component: AcademicStaffDashboard,
          name: "lecturer",
        },
        {
          path: "research-publication",
          component: ReasearchPublication,
          name: "research-publication",
        },
        {
          path: "appraisal",
          component: AcademicStaffAppraisal,
          name: "appraisal",
        },
        {
          path: "leave-management",
          component: LeaveManagement,
          name: "leave-management",
        },
        {
          path: "promotion-career-progression",
          component: AcademicStaffPromotionCareerProgression,
          name: "promotion-career-progression",
        },
      ],
    },

    // HOD
    {
      path: "/hod",
      component: HodLayout,
      meta: {
        requiresAuth: true,
        roles: ["hod"],
      },
      children: [
        {
          path: "",
          component: HodDashboard,
          name: "hod",
        },
        {
          path: "staff-records",
          component: HodStaffRecords,
          name: "staff-records",
        },

        {
          path: "staff-records/:id",
          component: HodStaffRecordDetails,
          name: "staff-record-details",
          props: true,
        },
        // {
        //   path: "research-publication",
        //   component: ReasearchPublication,
        //   name: "research-publication",
        // },
        {
          path: "appraisal",
          component: HodAppraisal,
          name: "appraisal",
        },
        {
          path: "leave-management",
          component: HodLeaveManagment,
          name: "leave-management",
        },
        {
          path: "leave-management/active-leaves",
          component: HodActiveLeaves,
          name: "leave-management-active-leaves",
        },
        {
          path: "leave-management/leave-balance-report",
          component: HodLeaveBalanceReport,
          name: "leave-management-leave-balance-report",
        },
        {
          path: "promotion-career-progression",
          component: HodPromotion_Career_Progression,
          name: "promotion-career-progression",
        },
        {
          path: "promotion-summary",
          component: HodPromotionSummary,
          name: "promotion-summary",
        },
      ],
    },

    // DAP
    {
      path: "/dap",
      component: DapLayout,
      meta: {
        requiresAuth: true,
        roles: ["dap"],
      },
      children: [
        {
          path: "",
          component: DapDashboard,
          name: "dap",
        },
        {
          path: "/dap/staff-records",
          component: DapStaffRecords,
          name: "dap-staff-records",
        },
        {
          path: "/dap/department-records/:id",
          component: DapDepartmentRecords,
          name: "dap-department-records",
          props: true,
        },
        {
          path: "/dap/all-staff-records/:id",
          component: DapAllStaffRecords,
          name: "dap-all-staff-records",
          props: true,
        },
        {
          path: "/dap/staff-details/:id",
          component: DapStaffDetails,
          name: "dap-staff-details",
          props: true,
        },
        {
          path: "/dap/appraisal-management",
          component: DapAppraisalManagement,
          name: "dap-appraisal-management",
        },
        {
          path: "/dap/appraisal-management/department-appraisal-records/:id",
          component: DapDepartmentalAppraisalRecords,
          name: "dap-appraisal-management-department-appraisal-records",
          props: true,
        },
        {
          path: "/dap/appraisal-management/department-appraisal/:department",
          component: DapDepartmentalAppraisal,
          name: "dap-appraisal-management-department-appraisal",
          props: true,
        },
        {
          path: "/dap/leave-analytics",
          component: DapLeaveAnalytics,
          name: "dap-leave-analytics",
        },
        {
          path: "/dap/leave-analytics/details/:faculty",
          component: DapLeaveDetails,
          name: "dap-leave-analytics-details",
          props: true,
        },
        {
          path: "/dap/promotion-career-progression",
          component: Dap_Promotion_Career_Progression,
          name: "dap-promotion-career-progression",
        },
        {
          path: "/dap/promotion-career-progression-department/:department",
          component: Dap_Promotion_Career_Progression_Department,
          name: "dap-promotion-career-progression-department",
          props: true,
        },
        {
          path: "/dap/publications-research-verification",
          component: Dap_Publications_Research_Verification,
          name: "dap-publications-research-verification",
        },
        {
          path: "/dap/publications-research-verification-faculty/:faculty",
          component: Dap_Publications_Research_Verification_Faculty,
          name: "dap-publications-research-verification-faculty",
          props: true,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const roles = to.matched
    .filter((record) => record.meta.roles)
    .flatMap((record) => record.meta.roles);

  if (requiresAuth && !auth.isLoggedIn) {
    return next("/login");
  }

  console.log(roles);
  if (roles.length && !roles.includes(auth.role)) {
    return next(`/${auth.role}`);
  }

  next();
});

export default router;
