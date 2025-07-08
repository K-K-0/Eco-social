import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const API = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true
})

export default API