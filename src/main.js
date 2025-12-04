import { createApp } from 'vue'
import './style.css'
import router from "@/router/index";
import VueApexCharts from "vue3-apexcharts"
import naiva from "naive-ui";
import App from './App.vue'

const app = createApp(App)

app.use(router);
app.use(VueApexCharts);
app.use(naiva);

app.mount('#app');
