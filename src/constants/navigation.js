import { Award, BedDouble, ChartNoAxesColumnIncreasing, CircleUserRound, FileText, LayoutDashboard, NotepadText, School } from 'lucide-vue-next';

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



export const HOD_NAV = [];

export const HOU_NAV = [];

export const VC_NAV = [];

export const NON_ACADEMIC_NAV = [];
