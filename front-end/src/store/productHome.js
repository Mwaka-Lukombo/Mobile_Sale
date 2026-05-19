import {create} from 'zustand';
import {axiosInstance} from '../lib/axiosInstance';
import toast from 'react-hot-toast';





export const useProductHome = create((set,get) => ({
    products:[],
    productsCategory:[],
    cart:[],
    productSingle:{},
    categorys:[],
    isLoading:false,
    getAllproductsHome:async()=>{
        try {
            const res = await axiosInstance.get(`/product/clientProducts`);
            set({products:res.data});
        } catch (error) {
          console.log(error?.response?.data?.message);
        }
    },
    getCategorys:async()=>{
        try {
            const res = await axiosInstance.get(`/category`);
            set({categorys:res.data.categories})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    },
    getProductSingle:async(id)=>{
      try {
         const res = await axiosInstance.get(`/product/productSingle/${id}`);
         set({productSingle:res.data});
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    },
    getProductByCategory:async(category)=>{
      try {
         const res = await axiosInstance.get(`product/by-category?category=${category}`);
          set({productsCategory:res.data.products})
      } catch (error) {
        console.log(error.response?.data?.message)
        toast.error(error.response?.data?.message);
      }
    },
    addCart:async(id,type,quantity = 1)=>{ 
        try {
            const res = await axiosInstance.post(`/product/addToCart/${id}`,{quantity,type});
            toast.success(res.data.message);

            await get().getCart()
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    },
    getCart:async()=>{
        try {
            const res = await axiosInstance.get(`/product/getCart`);
            set({cart:res.data})
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message);
        }
    },
    updateCart:async(productId,quantity)=>{
        try {
            const res = await axiosInstance.post(`/product/updatedCart/${productId}`,{quantity});
            toast.success(res.data.message);

            await get().getCart();
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message);
        }
    },
    removeCart:async(id)=>{
        try {
            const res = await axiosInstance.delete(`/product/cartDelete/${id}`);
            toast.success(res.data.message);
            await get().getCart();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
}))










