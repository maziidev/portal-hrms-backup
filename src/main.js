import router from "@/router/index";
import naiva from "naive-ui";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import App from "./App.vue";
import { setUpInterceptors } from "./apis";
import { useAuthStore } from "./store/auth";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// Ensures user is not logged out on page refresh
const auth = useAuthStore();
auth.refreshSession();
app.use(router);
app.use(VueApexCharts);
app.use(naiva);

setUpInterceptors(pinia, router);

app.mount("#app");
