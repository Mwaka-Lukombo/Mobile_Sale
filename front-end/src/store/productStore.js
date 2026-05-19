import {create} from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';





export const useProductStore = create((set,get) => ({
 products:[],
 product:{},
 categories:[],
 totalPages:0,
 currentPage:0,
 isLoading:false,
 error:false,
 success:false,
 createProduct:async(data)=>{
    set({isLoading:true});
    try {
        const res = await axiosInstance.post(`/product/create`,data);
         toast.success(res.data.message);
         
         await get().getProducts();
    } catch (error) {
        console.error(error.message);
        toast.error(error.response?.data?.message);
        set({error:error.response?.data?.message});
    }finally{
        set({isLoading:false});
    }
 },
 getProducts:async(search = "",page = 1)=>{
    try {
        const res = await axiosInstance.get(`/product?search=${search}&&page=${page}&&limit=4`);
        set({
            products:res.data.products,
            totalPages:res.data.totalPages,
            currentPage:res.data.currentPage
        });

    } catch (error) {
        console.error(error.response?.data?.message);
        set({error:error.response?.data?.message})
    }
 },
 editProduct:async(data,id)=>{
    set({isLoading:true});
    try {
        const res = await axiosInstance.post(`/product/edit/${id}`,data);
        toast.success(res?.data?.message);

        await get().getProducts();
    } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message);
    }finally{
        set({isLoading:false});
    }
 },
 deleteProduct:async(id)=>{
    try {
        const res = await axiosInstance.delete(`/product/delete/${id}`);
        toast(res.data.message);

        await get().getProducts();
    } catch (error) {
        toast.error(error.response?.data?.message);
        console.log(error.message);
    }
 },
getCategories:async()=>{
    try {
        const res = await axiosInstance.get(`/category`);
        set({categories:res.data.categories});
    } catch (error) {
        toast.error(error.response?.data?.message);
        set({error:error.response?.data?.message});
    }
}
}));


export const useAcessoriesStore = create((set, get) => ({

}));


