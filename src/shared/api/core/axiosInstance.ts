import axios from "axios";
import { parseCookies } from 'nookies';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            if (typeof window !== "undefined"){

                const {_token} = parseCookies()

                if (_token){
                    config.headers.authorization = 'Bearer'+_token
                }

            }
        } catch (error) {}
        return config;
    },
    (error) => Promise.reject(error)
);


export default axiosInstance