import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";
import { create } from "zustand";



export const useTabletStore = create((set,get) => ({
    isLoading:false,
    acessorios:[],
    tablets:[],
    acessorio:{},
    totalPages:0,
    currentPage:0,
    getAcessories:async(page = 1)=>{
        try {
            const res = await axiosInstance.get(`/tablet?page=${page}&&limit=4`);
            set({
                acessorios:res.data.products,
                totalPages:res.data.totalPages,
                currentPage:res.data.currentPage
            });
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    },
    getProductSingle:async(id)=>{
      try {
          const res = await axiosInstance.get(`/tablet/${id}`);
          set({acessorio:res.data})        
      } catch (error) {
         console.log(error.message);
         res.status(500).json({message:"Internal Server Error", error:message.error});
      }
    },

    //Admin Routes
    createProduct:async(data)=>{
        set({isLoading:true});

        try {
            const res = await axiosInstance.post(`/tablet`,data);
            toast.success(res.data.message);

            await get().getAcessories();
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }finally{
            set({isLoading:false});
        }
    },
    updateProduct:async(productId,data)=>{
        set({isLoading:true});
     try {
        const res = await axiosInstance.post(`/tablet/${productId}`,data);
     
        toast.success(res?.data?.message)
        await get().getAcessories();
     } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message);
     }finally{
      set({isLoading:false});
     }
    },
    deleteProduct:async(productId)=>{
        try {
            const res = await axiosInstance.delete(`/tablet/${productId}`);
            toast.success(res?.data?.message);
            
            await get().getAcessories();
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    }
}))



