import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";
import { create } from "zustand";



export const useAcessorioStore = create((set,get) => ({
    isLoading:false,
    acessorios:[],
    acessorio:{},
    acessoriosCategory:[],
    totalPages:0,
    currentPage:0,
    getAcessories:async(page = 1)=>{
        try {
            const res = await axiosInstance.get(`/acessories?page=${page}&&limit=4`);
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
        getByCategory:async(category)=>{
     try {
        const res = await axiosInstance.get(`/acessories/byCategory?category=${category}`);
        console.log(res.data)
        set({acessoriosCategory:res.data})
     } catch (error) {
        console.log(error?.response);
     }
    },
    getProductSingle:async(id)=>{
      try {
          const res = await axiosInstance.get(`/acessories/${id}`);
          set({acessorio:res.data})        
      } catch (error) {
         console.log(error.message);
      }
    },
    //Admin Routes
    createProduct:async(data)=>{
        set({isLoading:true});

        try {
            const res = await axiosInstance.post(`/acessories`,data);
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
        const res = await axiosInstance.post(`/acessories/${productId}`,data);
     
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
            const res = await axiosInstance.delete(`/acessories/${productId}`);
            toast.success(res?.data?.message);
            
            await get().getAcessories();
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    }
}))



