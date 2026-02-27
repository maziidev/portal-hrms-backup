import DashboardLayout from "@/Layout/DashboardLayout.vue";

import VCDashboard from '@/Pages/VC/VCDashboard.vue';

// APPRAIsALS
import Appraisals from '@/Pages/VC/appraisals/Appraisals.vue';
import AppraisalsDepartment from '@/Pages/VC/appraisals/AppraisalsDepartment.vue';
import AppraisalsDepartmentRecord from '@/Pages/VC/appraisals/AppraisalsDepartmentRecord.vue';

// Leaves
import LeaveDetails from '@/Pages/VC/leaves/LeaveDetails.vue';
import Leaves from '@/Pages/VC/leaves/Leaves.vue';

// Promotions
import PromotionDepartmentRecords from '@/Pages/VC/promotions/PromotionDepartmentRecords.vue';
import Promotions from '@/Pages/VC/promotions/Promotions.vue';


// researchs
import ResearchAndPublications from '@/Pages/VC/researches/ResearchAndPublications.vue';


// Staff
import StaffDetails from '@/Pages/VC/staffs/StaffDetails.vue';
import StaffRecord from '@/Pages/VC/staffs/StaffRecord.vue';
import Staffs from '@/Pages/VC/staffs/Staffs.vue';

export const vcRoutes = {
    path: '/vc',
    component: DashboardLayout,
    meta: { role: 'vc', requiresAuth: true },

    children: [
        { path: '', name: 'VCDashboard', component: VCDashboard, subtitle: "Vice Chancellor" },

        // staffs
        { path: 'staffs', name: 'VCStaffs', component: Staffs, title: 'Staffs', subtitle: 'Manage and oversee all staff members' },
        { path: 'staffs/:id', name: 'VCStaffDetails', component: StaffDetails, title: 'Staff Details', subtitle: 'View detailed information about a specific staff member' },
        { path: 'staff-record/:id', name: 'StaffRecord', component: StaffRecord, title: 'Staff Departments', subtitle: 'View the departments associated with a specific staff member' },

        // appraisals
        { path: 'appraisals', name: 'VCAppraisals', component: Appraisals, title: "Appraisal Management", subtitle: "Manage and oversee staff appraisals within your institution" },
        { path: 'appraisals-department/:id', name: 'AppraisalsDepartment', component: AppraisalsDepartment, title: 'Appraisal Department', subtitle: 'View appraisals for a specific department within your institution' },
        { path: 'appraisals-department-record/:id', name: 'AppraisalsDepartmentRecord', component: AppraisalsDepartmentRecord, title: 'Appraisal Department Record', subtitle: 'View appraisals records for a department within your institution' },

        // leaves
        { path: 'leaves', name: 'VCLeaves', component: Leaves, title: "Leave Management", subtitle: "View staff on leave" },
        { path: 'leave-details/:id', name: 'LeaveDetails', component: LeaveDetails, title: "Leave Detail", subtitle: "Detailed Information for academic leave" },

        // promotions
        { path: 'promotions', name: 'VCPromotions', component: Promotions, title: "Promotions", subtitle: "View and manage all promotions in your institutioni" },
        { path: 'promotions-department-records/:id', name: 'PromotionDepartmentRecords', component: PromotionDepartmentRecords, title: "Departmental Promotions", subtitle: "Manage and view all departmental promotion" },

        // researches
        { path: 'research-and-publications', name: 'VCResearchAndPublication', component: ResearchAndPublications, title: "Researches and Publications", subtitle: "Manage all staff publications and researches" },
    ]
};