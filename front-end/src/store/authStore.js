import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axiosInstance';
import {create} from 'zustand';



export const useAuthStore = create((set,get) => ({
    user:null,
    isAdmin:false,
    isChecking:true,
    isAuth:false,
    isLoading:false,
    error:null,
    signup:async(data)=>{
        set({isLoading:true})
        try {
            const res = await axiosInstance.post(`/auth/signup`,data);
            set({user:res.data?.user,isAuth:true});
            toast.success(res.data?.message)
        } catch (error) {
            console.log(error?.message);
            toast.error(error.response?.data.message);
            set({error:error.response?.data?.message})
        }finally{
            set({isLoading:false});
        }
    },
    login:async(data)=>{
        set({isLoading:true});

        try {
            const res = await axiosInstance.post(`/auth/login`,data);
            set({user:res.data.user,isAuth:true});
            toast.success(res.data?.message);
        } catch (error) {
            console.log(error.message);
            set({error:error.response?.data?.message})
            toast.error(error.response?.data?.message);
        }finally{
            set({isLoading:false})
        }
    },
    forgotPassword:async(email)=>{
     set({isLoading:true});
     try {
        const res = await axiosInstance.post(`/auth/forget-password`,{email});
        toast.success(res.data?.message)        
     } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message);
     }finally{
        set({isLoading:false});
     }
    },
    resetPassword:async({newPassword,repeatPassword},token)=>{
     set({isLoading:true});
     try {
         const res = await axiosInstance.post(`/auth/reset-password/${token}`,{newPassword,repeatPassword});
         toast.success(res.data.message);
     } catch (error) {
        console.log(error.message);
        set({error:error.response?.data?.message});
        toast.error(error.response?.data?.message);
     }finally{
        set({isLoading:false});
     }
    },
    check:async()=>{
        try {
            const res = await axiosInstance.get('/auth/check');
            set({user:res.data,isAuth:true});
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isChecking:false});
        }
    },
    logout:async()=>{
     try{
       const res = await axiosInstance.post(`/auth/logout`);
       toast.success(res.data.message);
       set({user:null,isAuth:false});
     }catch(error){
        console.log(error.response?.data?.message);
     }
    },
    verifyAdmin:async()=>{
      try {
         const res = await axiosInstance.get(`/auth/isAdmin`);
         set({isAdmin:res.data.admin});
      } catch (error) {
        console.log(error.message);
      }
    }
})) 










