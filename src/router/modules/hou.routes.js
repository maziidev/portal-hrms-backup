import DashboardLayout from "@/Layout/DashboardLayout.vue";

import HOUDashboard from '@/Pages/HeadOfUnit/HOUDashboard.vue';

// appraisals
import Appraisals from '@/Pages/HeadOfUnit/appraisals/Appraisals.vue';

// leave
import Leave from '@/Pages/HeadOfUnit/leave/Leave.vue';
import LeaveActive from '@/Pages/HeadOfUnit/leave/LeaveActive.vue';
import LeaveBalance from '@/Pages/HeadOfUnit/leave/LeaveBalance.vue';

// promotions
import Promotions from '@/Pages/HeadOfUnit/promotions/Promotions.vue';

// staffs
import StaffDetails from '@/Pages/HeadOfUnit/staffs/StaffDetails.vue';
import Staffs from '@/Pages/HeadOfUnit/staffs/Staffs.vue';

export const houRoutes = {
    path: '/unit_head',
    component: DashboardLayout,
    meta: { role: 'unit_head', requiresAuth: true },

    children: [
        { path: '', name: 'HOUDashboard', component: HOUDashboard },

        // staffs
        { path: 'staffs', name: 'HouStaffs', component: Staffs },
        { path: 'staffs/:id', name: 'StaffDetais', component: StaffDetails },

        // promotions
        { path: 'promotions', name: 'Promotions', component: Promotions },

        // appraisals
        { path: 'appraisals', name: 'Appraisals', component: Appraisals },

        // leave
        { path: 'leaves', name: 'Leave', component: Leave },
        { path: 'leave-active', name: 'LeaveActive', component: LeaveActive },
        { path: 'leave-balance', name: 'LeaveBalance', component: LeaveBalance },
    ]
};