import {create} from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';





export const useUserStore = create((set,get) => ({
    users:[],
    user:{},
    totalPages:0,
    currentPage:0,
    isLoading:false,
    createUser:async(data)=>{
     set({isLoading:true});
     try {
         const res = await axiosInstance.post(`/user`,data);
         toast.success(res.data.message);
        await get().getUsers();
     } catch (error) {
         console.log(error.message);
         toast.error(error.response?.data?.message);
     }finally{
        set({isLoading:false});
     }
    },
    editUser:async(data,id)=>{
        set({isLoading:true})
        try {
            const res = await axiosInstance.post(`/user/edit/${id}`,data);

            toast.success(res.data.message);
            await get().getUsers();
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }finally{
            set({isLoading:false});
        }
    },
    getUsers:async(search = "",page = 1)=>{
        try {
            const res = await axiosInstance.get(`/user?page=${page}&&limit=4&&search=${search}`);
            set({
                users:res.data.users,
                totalPages:res.data.totalPages,
                currentPage:res.data.currentPage
            })
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    },
    deleteUser:async(id)=>{
        try {
            const res = await axiosInstance.delete(`/user/delete/${id}`);
            toast.success(res.data.message);
            await get().getUsers()
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    }
}))










