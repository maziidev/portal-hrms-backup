import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + 'hrms/',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token") || "";
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


    return config;
});



export default api;