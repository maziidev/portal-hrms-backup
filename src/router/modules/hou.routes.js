import HeadOfUnitLayout from '../../layouts/HeadOfUnitLayout.vue';

import HOUDashboard from '../../Pages/hou/HOUDashboard.vue';

// appraisals
import Appraisals from '../../Pages/hou/appraisals/Appraisals.vue';

// leave
import Leave from '../../Pages/hou/leave/Leave.vue';
import LeaveActive from '../../Pages/hou/leave/LeaveActive.vue';
import LeaveBalance from '../../Pages/hou/leave/LeaveBalance.vue';

// promotions
import Promotions from '../../Pages/hou/promotions/Promotions.vue';

// staffs
import StaffDetails from '../../Pages/hou/staffs/StaffDetails.vue';
import Staffs from '../../Pages/hou/staffs/Staffs.vue';

export const houRoutes = {
    path: '/unit_head',
    component: HeadOfUnitLayout,
    meta: { role: 'unit_head', requiresAuth: true },

    children: [
        {
            path: '', name: 'HOUDashboard', component: HOUDashboard,
            meta: { pageTitle: '', pageSubtitle: 'Overview of your unit' }

        },

        // staffs
        {
            path: 'staffs', name: 'HouStaffs', component: Staffs,
            meta: { pageTitle: 'Department Staff Records', pageSubtitle: 'Manage your unit staff' }
        },
        {
            path: 'staffs/:id', name: 'StaffDetails', component: StaffDetails,
            meta: { pageTitle: 'Staff Details', pageSubtitle: 'View and manage staff information' }
        },

        // promotion
        {
            path: 'promotion', name: 'Promotion', component: Promotions,
            meta: { pageTitle: 'Promotion & Career Progression', pageSubtitle: 'Review & endorse Department Staff Promotions and Advancement requests' }
        },

        // appraisals
        {
            path: 'appraisals', name: 'Appraisals', component: Appraisals,
            meta: { pageTitle: 'Appraisals & Performance Reviews', pageSubtitle: 'Review and endorse staff appraisals and performance reviews' }
        },

        // leave
        { path: 'leaves', name: 'Leave', component: Leave, meta: { pageTitle: 'Leave Management', pageSubtitle: 'Review and manage staff leave requests' } },
        { path: 'leave-active', name: 'LeaveActive', component: LeaveActive, meta: { pageTitle: 'Active Leaves', pageSubtitle: 'View and manage currently active leaves' } },
        { path: 'leave-balance', name: 'LeaveBalance', component: LeaveBalance, meta: { pageTitle: 'Leave Balance', pageSubtitle: 'View and manage staff leave balances' } },
    ]
};