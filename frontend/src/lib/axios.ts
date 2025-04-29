import axios from "axios";

axios.defaults.withCredentials = true;


const API = axios.create({
    baseURL: " http://localhost:5000/api",
    withCredentials: true
})

export default API