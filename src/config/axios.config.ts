import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://raw.githubusercontent.com/mohamed-mahmoud24/FrontendTask/master/data/data.json",
});

export default axiosInstance;