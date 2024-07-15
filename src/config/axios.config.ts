import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://json-server-blush-ten.vercel.app/",
});

export default axiosInstance;