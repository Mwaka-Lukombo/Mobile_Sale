import { User } from 'lucide-react'
import React from 'react';
import { useAuthStore } from '../../store/authStore';

export const MenuComponent = () => {

  const {
   isAdmin,
   verifyAdmin
  } = useAuthStore();

  
  return (
    
      <div className='sticky top-0 left-0 z-30 w-full h-[60px] bg-cinza-claro border border-[#ccc] flex items-center justify-end px-7'>
        
        {isAdmin && (
          <div className='flex items-center gap-3'>
          <div className='w-[35px] h-[35px] bg-cinza-claro shadow border border-[#ccc] rounded-full flex items-center justify-center'>
             <User size={15}/>
          </div>
          <div>
            <span className='text-xs font-semibold'>Admin</span>
          </div>
        </div>
        )}


      </div>
      
  )
}
