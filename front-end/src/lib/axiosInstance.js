import axios from 'axios';



export const axiosInstance = axios.create({
    baseURL:"https://mobile-sale.onrender.com/api",
    withCredentials:true
})





