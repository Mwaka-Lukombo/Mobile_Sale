import React from 'react'
import { Link } from 'react-router-dom';
import {
  Heart,
    LogOut,
    Menu,
    Search,
    SearchAlert,
    SearchIcon,
    ShoppingCart,
    User,
    User2,
    User2Icon
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';





export const Navbar = () => {

  const {
    logout
  } = useAuthStore();

const {
  isAdmin,
  isAuth
} = useAuthStore();

  return (
    <>
      {isAdmin  ? (
        <div className='flex items-center justify-between px-[4%] md:px-0 md:justify-around  p-2 w-full h-[80px] shadow-xl border-b border-gray-400'>
        <div className='flex items-center gap-3'>
          <div className='w-[40px] h-[40px]'>
             <img src='/mockup.jpg' className='w-full h-full bg-contain bg-center'/>
          </div>

          {/* title */}
          <div>
            <h2 className='font-bold text-xl'>CellShop</h2>
          </div>
        </div>

         {/* menu */}
         <ul className='hidden md:flex gap-4'>
           <li>
            <Link>Home</Link>
           </li>

           <li>
            <Link>Produtos</Link>
           </li>
           <li>
            <Link>Categorias</Link>
           </li>
           <li>
            <Link>Ofertas</Link>
           </li>

           <li>
            <Link>Contacto</Link>
           </li>
         </ul>

         <div className='flex items-center gap-3'>
            <div className='hidden md:flex items-center justify-center w-[40px] h-[40px] cursor-pointer text-gray-500'>
              <Search />
            </div>

            <div className='flex items-center justify-center w-[40px] h-[40px] cursor-pointer text-gray-500'>
              <User />
            </div>

            <div className='flex items-center justify-center w-[40px] h-[40px] cursor-pointer text-gray-500'>
              <ShoppingCart />
            </div>
         </div>
        
     </div>
      ) :(
        <div className='sticky top-0 left-0 w-full h-[100px] bg-cinza-claro z-30  flex items-center gap-14 justify-between px-7 
        md:border-b-2 
        '>
          {/* logo */}
          <div className='hidden md:flex'>
            <div className='w-[70px] h-[70px]'>
              <img src="/mockup.jpg" 
               className='w-full h-full bg-center bg-no-repeat'
              />
            </div>
            <div className='flex flex-col'>
               <h1 className='text-xl text-left'><span className='bg-clip-text  text-gradient-to-r from-secondary-blue to-secondary-blue'>Cell</span>Shop</h1>
               <p className='text-sm'>Seu proximo celular esta aqui</p>
            </div>
          </div>

          {/* Menu */}
          <div className='flex md:hidden items-center justify-center'>
           <Menu size={30} className='cursor-pointer'/>
          </div>
          
          {/*Form  */}
          <div className='hidden md:flex flex-1'>
            <form className='w-full flex md:hidden lg:flex  gap-1'>
              <select className=' md:flex select border border-[#ccc] h-[45px] pl-3 w-[20%]'>
                <option value="">Categorias</option>
                <option value="">Iphone</option>
                <option value="">Samsung</option>
              </select>
              <input type="text" 
              placeholder="Search for you're product"
              className='pl-3 input border border-[#ccc] h-[45px] md:w-[70%]'
              />
              <button className=' w-[10%] max-w-[60px] h-[45px] bg-primary-blue hover:bg-secondary-blue transition rounded-lg md:flex items-center justify-center btn'>
                <SearchIcon size={20} className='text-white'/>
              </button>
            </form>
          </div>

          <div className='flex gap-3'>
            <div className='flex items-center cursor-pointer gap-2'>
              <Search size={30} className='lg:hidden'/>
              <User2 size={30} className='hidden lg:block'/>
              <p className='text-sm hidden md:hidden lg:block'>
                Minha Conta
                <div onClick={()=> logout()} className='flex items-center gap-2'>
                  <LogOut size={15} className='text-primary-blue'/>
                  <p className='text-sm hidden md:block'>sair</p>
                </div>
              </p>
              
            </div>
            
            <div className='flex items-center cursor-pointer gap-2 relative'>
              <Heart size={30}/>
              <p className='text-sm hidden md:block'>Favoritos</p>
              <div className='w-[15px] h-[15px] rounded-full bg-primary-blue absolute -top-2 right-0
              flex items-center justify-center
              '>
                <p className='text-xs text-white'>0</p>
              </div>
            </div>

            <div className='flex items-center relative cursor-pointer gap-2'>
              <ShoppingCart size={30}/>
              <p className='text-sm hidden md:block'>Carrinho</p>
              <div className='w-[15px] h-[15px] rounded-full bg-primary-blue absolute -top-2 right-0
              flex items-center justify-center
              '>
                <p className='text-xs text-white'>0</p>
              </div>
            </div>
            
          </div>
          
        </div>
      )}
    </>
  )
}
