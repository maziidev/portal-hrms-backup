import { createRouter, createWebHistory } from "vue-router";

// ADMIN PAGES
import Admin from "../Pages/Admin/Admin.vue";
import Main from "../Layouts/Main.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
                {
                    path:"/",
                    component:Admin,
                    name:'home'
                },

                // ADMIN ROUTES
                {
                    path:"/admin",
                    component:Admin,
                    name:"admin"
                }
    ]
})

export default router;