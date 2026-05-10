import {create} from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';




export const useAnalistyc = create((set,get) => ({
    totalUsers:0,
    totalInvestments:0,
    totalProducts:0,
    totalCategorys:0,
   getHomeAnalustic:async()=>{
    try {
        const res = await axiosInstance.get(`/analystic/home`);
        set({
            totalUsers:res.data.totalUsers,
            totalCategorys:res.data.totalCategorys,
            totalInvestments:res.data.totalInventsment,
            totalProducts:res.data.totalProducts
        })
    } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message);
    }
   }
}));



