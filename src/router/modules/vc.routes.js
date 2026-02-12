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
    path: '/vice-chancellor',
    component: DashboardLayout,
    meta: { role: 'vice-chancellor', requiresAuth: true },

    children: [
        { path: '', name: 'VCDashboard', component: VCDashboard },

        // staffs
        { path: 'staffs', name: 'VCStaffs', component: Staffs },
        { path: 'staffs/:id', name: 'VCStaffDetails', component: StaffDetails },
        { path: 'staff-record/:id', name: 'StaffRecord', component: StaffRecord },

        // appraisals
        { path: 'appraisals', name: 'VCAppraisals', component: Appraisals },
        { path: 'appraisal-department/:id', name: 'AppraisalsDepartment', component: AppraisalsDepartment },
        { path: 'appraisals-department-record/:id', name: 'AppraisalsDepartmentRecord', component: AppraisalsDepartmentRecord },

        // leaves
        { path: 'leaves', name: 'VCLeaves', component: Leaves },
        { path: 'leave-details/:id', name: 'LeaveDetails', component: LeaveDetails },

        // promotions
        { path: 'promotions', name: 'VCPromotions', component: Promotions },
        { path: 'promotion-department-records/:id', name: 'PromotionDepartmentRecords', component: PromotionDepartmentRecords },

        // researches
        { path: 'research-and-publications', name: 'VCResearchAndPublication', component: ResearchAndPublications },
    ]
};