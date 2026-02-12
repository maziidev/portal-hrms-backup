import DashboardLayout from "@/Layout/DashboardLayout.vue";
import DeanDashboard from '@/Pages/Dean/DeanDashboard.vue';

// departments
import DepartmentDetails from '@/Pages/Dean/departments/DepartmentDetails.vue';
import Departments from '@/Pages/Dean/departments/Departments.vue';

// staffs
import Staffs from '@/Pages/Dean/staffs/Staff.vue';
import StaffDepartments from '@/Pages/Dean/staffs/StaffDepartments.vue';
import StaffDetails from '@/Pages/Dean/staffs/StaffDetails.vue';

// appraisals
import AppraisalDepartment from '@/Pages/Dean/appraisals/AppraisalDepartment.vue';
import Appraisals from '@/Pages/Dean/appraisals/Appraisals.vue';

// leave management
import LeaveManagement from '@/Pages/Dean/leaves/LeaveManagement.vue';

// promotions
import Promotion from '@/Pages/Dean/promotion/Promotion.vue';

export const deanRoutes = {
    path: '/dean',
    component: DashboardLayout,
    meta: { role: 'dean', requiresAuth: true },

    children: [
        {
            path: '',
            name: 'DeanDeanDashboard',
            component: DeanDashboard,
            meta: { requiresAuth: true, role: 'dean', subtitle: 'Manage your faculty operations' }
        },

        // departments
        {
            path: 'departments',
            name: 'DeanDepartments',
            component: Departments,
            meta: { requiresAuth: true, role: 'dean', subtitle: 'Oversee and manage your faculty departments', title: 'Departments' }
        },
        {
            path: 'departments/:id',
            name: 'DeanDepartmentDetails',
            component: DepartmentDetails,
            meta: { requiresAuth: true, role: 'dean', subtitle: 'View detailed information about a specific department', title: 'Department Details' }
        },

        // staffs
        {
            path: 'staffs',
            name: 'DeanStaffs',
            component: Staffs,
            meta: { requiresAuth: true, role: 'dean', title: 'Staffs', subtitle: 'Manage and oversee faculty staff members' }
        },
        {
            path: 'staffs/:id',
            name: 'DeanStaffsDetails',
            component: StaffDetails,
            meta: { requiresAuth: true, role: 'dean', title: 'Staff Details', subtitle: 'View detailed information about a specific staff member' }
        },
        {
            path: 'staff-departments/:id',
            name: 'DeanStaffDepartments',
            component: StaffDepartments,
            meta: { requiresAuth: true, role: 'dean', title: 'Staff Departments', subtitle: 'View the departments associated with a specific staff member' }
        },

        // appraisals
        {
            path: 'appraisals',
            name: 'DeanAppraisals',
            component: Appraisals,
            meta: { requiresAuth: true, role: 'dean', title: 'Appraisals', subtitle: 'Manage and oversee staff appraisals within your faculty' }
        },
        {
            path: 'appraisal-department/:id',
            name: 'DeanAppraisalDepartment',
            component: AppraisalDepartment,
            meta: { requiresAuth: true, role: 'dean', title: 'Appraisal Department', subtitle: 'View appraisals for a specific department within your faculty' }
        },

        // leave
        {
            path: 'leaves',
            name: 'DeanLeaveManagement',
            component: LeaveManagement,
            meta: { requiresAuth: true, role: 'dean', title: 'Leave Management', subtitle: 'Manage and oversee staff leave requests within your faculty' }
        },

        // promotion
        {
            path: 'promotion',
            name: 'DeanPromotion',
            component: Promotion,
            meta: { requiresAuth: true, role: 'dean', title: 'Promotion', subtitle: 'Manage and oversee staff promotions within your faculty' }
        },
    ]
};
