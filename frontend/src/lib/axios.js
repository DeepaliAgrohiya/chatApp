import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.NODE === "developement" ?  "http://localhost:4000/api" : "/api",
    withCredentials:true,
})