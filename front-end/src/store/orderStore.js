import { create} from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import {useProductHome} from './productHome';
import {useAcessorioStore} from './acessoriosStore';
import {useTabletStore} from './tabletsStore';


export const useOrderStore = create((set,get) => ({
 isPayment:false,
 payment:async()=>{
    set({isPayment:true});
    try {
        const res = await axiosInstance.post(`/order/payment`);
        toast.success(res.data.message);
        
        await useProductHome.getState().getCart();
        await useProductHome.getState().getAllproductsHome();
        await useAcessorioStore.getState().getAcessories();
        await useTabletStore.getState().getAcessories();
        

    } catch (error) {
       console.log(error?.message);
       toast.error(error?.response?.data?.message);
    }finally{
      set({isPayment:false});
    }
 }
}));







