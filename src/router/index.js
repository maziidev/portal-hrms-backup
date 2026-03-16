import { createRouter, createWebHistory } from "vue-router";

// ADMIN PAGES
import StaffManagment from "@/Pages/Admin/StaffManagment.vue";
// import Main from "@/Layouts/Main.vue";
import Login from "@/Pages/Login.vue";
import { useAuthStore } from "@/store/auth.js";
import AcademicStaffDashboard from "@/Pages/Academic-Staff/AcademicStaffDashboard.vue";
import AcademicStaffPromotionCareerProgression from "@/Pages/Academic-Staff/AcademicStaffPromotionCareerProgression.vue";
import AcademicStaffAppraisal from "@/Pages/Academic-Staff/Appraisal.vue";
import LeaveManagement from "@/Pages/Academic-Staff/LeaveManagement.vue";
import ReasearchPublication from "@/Pages/Academic-Staff/ReasearchPublication.vue";
import Appraisal from "@/Pages/Admin/Appraisal.vue";
import Appraisal_Details from "@/Pages/Admin/Appraisal_Details.vue";
import GenerateReport from "@/Pages/Admin/GenerateReport.vue";
import ReportAnalysis from "@/Pages/Admin/ReportAnalysis.vue";
import Dap_Promotion_Career_Progression from "@/Pages/DAP/Dap_Promotion_Career_Progression.vue";
import Dap_Promotion_Career_Progression_Department from "@/Pages/DAP/Dap_Promotion_Career_Progression_Department.vue";
import Dap_Publications_Research_Verification from "@/Pages/DAP/Dap_Publications_Research_Verification.vue";
import Dap_Publications_Research_Verification_Faculty from "@/Pages/DAP/Dap_Publications_Research_Verification_Faculty.vue";
import DapAllStaffRecords from "@/Pages/DAP/DapAllStaffRecords.vue";
import DapAppraisalManagement from "@/Pages/DAP/DapAppraisalManagement.vue";
import DapDashboard from "@/Pages/DAP/DapDashboard.vue";
import DapDepartmentalAppraisal from "@/Pages/DAP/DapDepartmentalAppraisal.vue";
import DapDepartmentalAppraisalRecords from "@/Pages/DAP/DapDepartmentalAppraisalRecords.vue";
import DapDepartmentRecords from "@/Pages/DAP/DapDepartmentRecords.vue";
import DapLeaveAnalytics from "@/Pages/DAP/DapLeaveAnalytics.vue";
import DapLeaveDetails from "@/Pages/DAP/DapLeaveDetails.vue";
import DapStaffDetails from "@/Pages/DAP/DapStaffDetails.vue";
import DapStaffRecords from "@/Pages/DAP/DapStaffRecords.vue";
import AssignedStaffEvaluation from "@/Pages/External-Accessor/AssignedStaffEvaluation.vue";
import Evaluation from "@/Pages/External-Accessor/Evaluation.vue";
import Evaluation_Summary from "@/Pages/External-Accessor/Evaluation_Summary.vue";
import ExternalAccessorDashboard from "@/Pages/External-Accessor/ExternalAccessorDashboard.vue";
import NotFound from "@/Pages/NotFound.vue";


// // dean, hou
// import { deanRoutes } from './modules/dean.routes';
// import { houRoutes } from './modules/hou.routes';

import AcademicStaff from "@/Layout/Academic-Staff/Academic-Staff.vue";
import AdminLayout from "@/Layout/AdminLayout/Admin.vue";
import ExternalAccessorLayout from "@/Layout/ExternalAccessorLayout/ExternalAccessorLayout.vue";


import { deanRoutes } from './modules/dean.routes';
import { headOfDivisionRoutes } from './modules/headofdivision.routes';
import { houRoutes } from './modules/hou.routes';
import { nonAcademicRoutes } from './modules/nonacademic.routes';
import { vcRoutes } from './modules/vc.routes';

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

    // routes from modules
    deanRoutes,
    headOfDivisionRoutes,
    houRoutes,
    nonAcademicRoutes,
    vcRoutes,


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
      path: "/external_accessor",
      component: ExternalAccessorLayout,
      meta: {
        requiresAuth: true,
        roles: ["external_accessor"],
      },
      children: [
        {
          path: "",
          component: ExternalAccessorDashboard,
          name: "external_accessor",
        },
        {
          path: "assigned-staff-evaluation",
          component: AssignedStaffEvaluation,
          name: "assigned-staff-evaluation",
        },
        {
          path: "evaluation",
          component: Evaluation,
          name: "evaluation",
        },
        {
          path: "evaluation_summary",
          component: Evaluation_Summary,
          name: "evaluation_summary",
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



    // DAP
    {
      path: "/dap",
      component: DapDashboard,
      name: "dap",
      meta: {
        requiresAuth: true,
        roles: ["dap"],
      },
      children: [
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
          path: "/dap/appraisal-management/department-appraisal-records/:faculty_id",
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
