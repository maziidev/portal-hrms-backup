import DashboardLayout from "@/Layout/DashboardLayout.vue";

import NonAcademicDashboard from '@/Pages/NonAcademic/NonAcademicDashboard.vue';

// appraisals
import Appraisals from '@/Pages/NonAcademic/appraisals/Appraisals.vue';
import AppraisalsStaffDetails from '@/Pages/NonAcademic/appraisals/AppraisalsStaffDetails.vue';

// leaves
import Leaves from '@/Pages/NonAcademic/leaves/Leaves.vue';

// promotions
import Promotions from '@/Pages/NonAcademic/promotions/Promotions.vue';

// researches
import NonAcademicPublicationDetails from '@/Pages/NonAcademic/researches/NonAcademicPublicationDetails.vue';
import NonAcademicResearchAndPublication from '@/Pages/NonAcademic/researches/NonAcademicResearchAndPublication.vue';

export const nonAcademicRoutes = {
    path: '/non-academic',
    component: DashboardLayout,
    meta: { role: 'non-academic', requiresAuth: true },

    children: [
        { path: '', name: 'NonAcademicDashboard', component: NonAcademicDashboard },

        // appraisals
        { path: 'appraisals', name: 'NonAcademicAppraisals', component: Appraisals },
        { path: 'appraisals/staff/:id', name: 'AppraisalsStaffDetails', component: AppraisalsStaffDetails },

        // leaves
        { path: 'leaves', name: 'NonAcademicLeaves', component: Leaves },

        // promotions
        { path: 'promotions', name: 'NonAcademicPromotions', component: Promotions },

        // researches
        { path: 'research-and-publication', name: 'NonAcademicResearchAndPublication', component: NonAcademicResearchAndPublication },
        { path: 'research-and-publication/:id', name: 'NonAcademicPublicationDetails', component: NonAcademicPublicationDetails },


    ]
};