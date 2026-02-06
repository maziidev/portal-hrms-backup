import { Award, BedDouble, BookA, ChartNoAxesColumnIncreasing, CircleUserRound, FileText, LayoutDashboard, NotepadText, School } from 'lucide-vue-next';

export const DEAN_NAV = [
    {
        name: 'Dashboard',
        path: '/dean',
        icon: LayoutDashboard
    },
    {
        name: 'Department Records',
        path: '/dean/departments',
        icon: School
    },
    {
        name: 'Staff Records',
        path: '/dean/staffs',
        icon: CircleUserRound
    },
    {
        name: 'Appraisals',
        path: '/dean/appraisals',
        icon: FileText
    },
    {
        name: 'Leave Management',
        path: '/dean/leaves',
        icon: BedDouble
    },
    {
        name: 'Promotion & Career Progression',
        path: '/dean/promotion',
        icon: Award
    },
    {
        name: 'Retirement & Exit',
        path: null,
        icon: NotepadText,
        disabled: true
    },
    {
        name: 'Reports & Analytics',
        path: null,
        icon: ChartNoAxesColumnIncreasing,
        disabled: true
    },
];



export const HOD_NAV = [
    {
        name: 'Dashboard',
        path: '/head_of_division',
        icon: LayoutDashboard
    },
    {
        name: 'Staff Records',
        path: '/head_of_division/staffs',
        icon: CircleUserRound
    },
    {
        name: 'Appraisals',
        path: '/head_of_division/appraisals',
        icon: FileText
    },
    {
        name: 'Leave Management',
        path: '/head_of_division/leaves',
        icon: BedDouble
    },
    {
        name: 'Promotion & Career Progression',
        path: '/head_of_division/promotion',
        icon: Award
    },
    {
        name: 'Retirement & Exit',
        path: null,
        icon: NotepadText,
        disabled: true
    },
    {
        name: 'Reports & Analytics',
        path: null,
        icon: ChartNoAxesColumnIncreasing,
        disabled: true
    },
];

export const HOU_NAV = [
    {
        name: 'Dashboard',
        path: '/unit_head',
        icon: LayoutDashboard
    },
    {
        name: 'Staff Records',
        path: '/unit_head/staffs',
        icon: CircleUserRound
    },
    {
        name: 'Appraisals',
        path: '/unit_head/appraisals',
        icon: FileText
    },

    {
        name: 'Leave Management',
        path: '/unit_head/leaves',
        icon: BedDouble
    },
    {
        name: 'Promotion & Career Progression',
        path: '/unit_head/promotion',
        icon: Award
    },
    {
        name: 'Retirement & Exit',
        path: null,
        icon: NotepadText,
        disabled: true
    },
    {
        name: 'Reports & Analytics',
        path: null,
        icon: ChartNoAxesColumnIncreasing,
        disabled: true
    },
];

export const VC_NAV = [
    {
        name: 'Dashboard',
        path: '/vice_chancellor',
        icon: LayoutDashboard
    },
    {
        name: 'Staff Records',
        path: '/vice_chancellor/staffs',
        icon: CircleUserRound
    },
    {
        name: 'Appraisals',
        path: '/vice_chancellor/appraisals',
        icon: FileText
    },

    {
        name: 'Leave Management',
        path: '/vice_chancellor/leaves',
        icon: BedDouble
    },
    {
        name: 'Promotions',
        path: '/vice_chancellor/promotion',
        icon: Award
    },
    {
        name: 'Research & Publications',
        path: '/vice_chancellor/research',
        icon: BookA
    },
    {
        name: 'Reports & Statistics',
        path: null,
        icon: ChartNoAxesColumnIncreasing,
        disabled: true
    },
];

export const NON_ACADEMIC_NAV = [
    {
        name: 'Dashboard',
        path: '/non_academic',
        icon: LayoutDashboard
    },
    {
        name: 'Research & Publications',
        path: '/non_academic/research',
        icon: BookA
    },
    {
        name: 'Appraisals',
        path: '/non_academic/appraisals',
        icon: FileText
    },
    {
        name: 'Leave Management',
        path: '/non_academic/leaves',
        icon: BedDouble
    },
    {
        name: 'Promotions',
        path: '/non_academic/promotion',
        icon: Award
    },

    {
        name: 'Reports & Analytics',
        path: null,
        icon: ChartNoAxesColumnIncreasing,
        disabled: true
    },
];
