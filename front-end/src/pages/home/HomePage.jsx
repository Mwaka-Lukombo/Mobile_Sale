import { ShoppingBag, User } from 'lucide-react'
import React, { useEffect } from 'react'
import {MenuComponent} from '../../components/common/MenuComponent';
import { HomeWellcome } from '../../components/common/HomeWellcome';
import { useAuthStore } from '../../store/authStore';
import {motion} from 'framer-motion';
import { formatNumber } from '../../lib/formatNumbers';
import { useAnalistyc } from '../../store/analysticStore';

export const HomePage = () => {

  const {
    user
  } = useAuthStore();

  const {
    getHomeAnalustic,
    totalUsers,
    totalInvestments,
    totalProducts,
    totalCategorys
  } = useAnalistyc();

  useEffect(()=>{
   getHomeAnalustic()
  },[getHomeAnalustic])


  const cards = [
     {
      title:"Total Investido",
      information:formatNumber(totalInvestments),
      curreny:"MZN"
     },{
      title:"Total Usuarios",
      information:totalUsers,
     },
     {
      title:"Total Produtos",
      information:totalProducts,
     },
     {
      title:"Total Categorias",
      information:totalCategorys,
     }
  ];
  
  return (
    <>
    <div className='w-full'>
      <MenuComponent />
      
      <div className='my-3 px-3'>
        <div className='mt-12 px-4'>
          <motion.h1
          initial={{opacity:0,y:12}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.3}} 
          className='text-2xl font-semibold text-blue-600'>Welcome Back <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3,delay:(cards.length + 1 )* 0.3}}>👋</motion.span> <br /> <span className='font-normal text-base text-gray-700'>{user?.name}</span></motion.h1>
        </div>

        <div className='w-full  mt-10'>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {Array.isArray(cards) && cards.map((item,index) => (
              <motion.div key={index} 
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{duration:0.3,bounce:0.5,delay:index * 0.3}}
              className='col-span-1 p-4 min-h-[150px] shadow-xl border border-[#ccc]
            rounded-xl
            '>
              <div>
                <h1 className='text-xl font-semibold leading-normal mb-3'>{item.title}</h1>
                <h2 className='text-2xl font-bold'>{item.information} <b>{item.curreny}</b></h2>
                <p className='leading-normal my-3 text-verde-escuro font-semibold'>&copy; cellshoop</p>
              </div>
            </motion.div>
            ))}
          </div>
        </div>

        <motion.div
        initial={{opacity:0,scale:0.95}}
        animate={{opacity:1,scale:1}}
        transition={{duration:0.4,bounce:0.3,delay:cards.length * 0.3}}
        className='flex my-7 w-full h-[200px] bg-gradient-to-tl from-secondary-blue to-primary-blue rounded-xl'>
          <div className='w-[20%] h-full flex items-center justify-center'>
            <ShoppingBag className='text-white' size={40}/>
          </div>
          <div className='w-[80%] p-5'>
            <h1 className='text-2xl text-white'>Gerencie a sua Loja <br /> <span className='mt-7 text-sm'>e se destaque no Mercado</span></h1>
            <p className='mt-2 leading-normal text-color-white text-sm
             max-w-[500px] text-justify
            '>
              Este painel contem todos os itens necessarios de gerenciamento de uma loja virtual
              atualize o seu stock e se destaque no mercado. Venda produtos novos e diferenciados assim
              voce ira atrair mais clientes 
            </p>
          </div>
        </motion.div>
        
         
      </div>
    </div>
    </>
  )
}