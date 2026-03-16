import DashboardLayout from "@/Layout/DashboardLayout.vue";

// Use Dynamic Imports (Lazy Loading)
const HeadOfDivisionDashboard = () => import('@/Pages/HeadOfDivision/HeadOfDivisionDashboard.vue');

// appraisals
const Appraisals = () => import('@/Pages/HeadOfDivision/appraisal/Appraisal.vue');
const AppraisalsMaintenance = () => import('@/Pages/HeadOfDivision/appraisal/AppraisalsMaintenance.vue');

// staff
const StaffDetails = () => import('@/Pages/HeadOfDivision/staffs/StaffDetails.vue');
const Staffs = () => import('@/Pages/HeadOfDivision/staffs/Staffs.vue');
const StaffSubunit = () => import('@/Pages/HeadOfDivision/staffs/StaffSubunit.vue');

// promotion
const Promotion = () => import('@/Pages/HeadOfDivision/promotion/Promotion.vue');

// leave
const LeaveManagement = () => import('@/Pages/HeadOfDivision/leave/LeaveManagement.vue');
const Leaves = () => import('@/Pages/HeadOfDivision/leave/Leaves.vue');

export const headOfDivisionRoutes = {
    path: '/division_head',
    component: DashboardLayout,
    meta: { role: 'head-of-division', requiresAuth: true },
    children: [
        { path: '', name: 'HeadOfDivisionDashboard', component: HeadOfDivisionDashboard },
        { path: 'staffs', name: 'Staffs', component: Staffs },
        { path: 'staffs/subunit/:id', name: 'StaffSubunit', component: StaffSubunit },
        { path: 'staffs/:id', name: 'StaffDetails', component: StaffDetails },
        { path: 'promotion', name: 'Promotion', component: Promotion },
        { path: 'leaves', name: 'Leaves', component: Leaves },
        { path: 'leaves/:id', name: 'LeaveManagement', component: LeaveManagement },
        { path: 'appraisals', name: 'Appraisal', component: Appraisals },
        { path: 'appraisals/unit/:id', name: 'AppraisalsMaintenance', component: AppraisalsMaintenance },
    ]
};