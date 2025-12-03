import { createRouter, createWebHistory } from "vue-router";

// ADMIN PAGES
import Admin from "../Pages/Admin/Admin.vue";
import Main from "../Layouts/Main.vue";

const router = createRouter({
    history: createWebHistory,
    routes: [
        {
            path:"/",
            component:Main,
            name:"HRMS-DASHBOARD",
            children:[

                // ADMIN ROUTES
                {

                }
            ]
        }
    ]
})