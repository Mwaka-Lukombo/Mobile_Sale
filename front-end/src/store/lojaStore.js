import {axiosInstance} from '../lib/axiosInstance';
import {create} from 'zustand';
import {toast} from 'react-hot-toast';




export const useLojaStore = create((set,get) => ({
 isLoading:false,
 lojaInfo:{},
 getLoja:async()=>{
    try {
        const res = await axiosInstance.get(`/loja`);
        set({lojaInfo:res.data});
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
 },
 updateLoja:async(data)=>{
    set({isLoading:true});
    try {
        const res = await axiosInstance.post(`/loja/update`,data);
        toast.success(res?.data?.message);

        await get().getLoja();
    } catch (error) {
        toast.error(error.response?.data?.message);
    }finally{
        set({isLoading:false});
    }
 }
}));







