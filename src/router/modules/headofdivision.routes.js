import DashboardLayout from "@/Layout/DashboardLayout.vue";

import HeadOfDivisionDashboard from '@/Pages/HeadOfDivision/HeadOfDivisionDashboard.vue';

// appraisals
import Appraisals from '@/Pages/HeadOfDivision/appraisal/Appraisals.vue';
import AppraisalsMaintenance from '@/Pages/HeadOfDivision/appraisal/AppraisalsMaintenance.vue';

// staff
import StaffDetails from '@/Pages/HeadOfDivision/staffs/StaffDetails.vue';
import Staffs from '@/Pages/HeadOfDivision/staffs/Staffs.vue';
import StaffSubunit from '@/Pages/HeadOfDivision/staffs/StaffSubunit.vue';

// promotion
import Promotion from '@/Pages/HeadOfDivision/promotion/Promotion.vue';

// leave
import LeaveManagement from '@/Pages/HeadOfDivision/leave/LeaveManagement.vue';
import Leaves from '@/Pages/HeadOfDivision/leave/Leaves.vue';

export const headOfDivisionRoutes = {
    path: '/head-of-division',
    component: DashboardLayout,
    meta: { role: 'head-of-division', requiresAuth: true },

    children: [
        { path: '', name: 'HeadOfDivisionDashboard', component: HeadOfDivisionDashboard },

        // staffs
        { path: 'staffs', name: 'Staffs', component: Staffs },
        { path: 'staff-subunit/:id', name: 'StaffSubunit', component: StaffSubunit },
        { path: 'staffs/:id', name: 'StaffDetails', component: StaffDetails },


        // promotions
        { path: 'promtion', name: 'Promotion', component: Promotion },

        // leave
        { path: 'leaves', name: 'Leaves', component: Leaves },
        { path: 'leave-management', name: 'LeaveManagement', component: LeaveManagement },

        // appraisals
        { path: 'appraisals', name: 'Appraisals', component: Appraisals },
        { path: 'appraisals-maintenance', name: 'AppraisalsMaintenance', component: AppraisalsMaintenance },
    ]
};