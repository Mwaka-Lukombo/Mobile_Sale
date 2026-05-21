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
      
      <div className='my-2 px-2 md:px-3'>
        <div className='mt-8 px-3 md:px-4'>
          <motion.h1
          initial={{opacity:0,y:12}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.3}} 
          className='text-xl font-semibold text-blue-600'>
            Welcome Back 
            <motion.span 
              initial={{opacity:0}} 
              animate={{opacity:1}} 
              transition={{duration:0.3,delay:(cards.length + 1 )* 0.3}}
            >
              👋
            </motion.span>
            <br /> 
            <span className='font-normal text-sm text-gray-700'>{user?.name}</span>
          </motion.h1>
        </div>

        <div className='w-full mt-6 md:mt-8 px-3 md:px-4'>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4'>
            {Array.isArray(cards) && cards.map((item,index) => (
              <motion.div 
                key={index} 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:0.3,bounce:0.5,delay:index * 0.3}}
                className='col-span-1 p-4 min-h-[130px] md:min-h-[150px] shadow-lg border border-[#ccc] rounded-xl hover:shadow-xl transition-shadow'
              >
                <div>
                  <h1 className='text-base font-semibold leading-normal mb-2 text-gray-700'>{item.title}</h1>
                  <h2 className='text-xl text-gray-900'>
                    {item.information}  
                    <span className='capitalize'>{item.curreny}</span>
                  </h2>
                  <p className='leading-normal my-2 md:my-3 text-verde-escuro font-semibold text-xs md:text-sm'>&copy; cellshoop</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
        initial={{opacity:0,scale:0.95}}
        animate={{opacity:1,scale:1}}
        transition={{duration:0.4,bounce:0.3,delay:cards.length * 0.3}}
        className='flex flex-col md:flex-row my-6 md:my-8 mx-3 md:mx-4 w-auto  bg-gradient-to-tl from-secondary-blue to-primary-blue rounded-xl p-4 md:p-6'
        >
          <div className='w-full md:w-[20%] flex items-center justify-center mb-4 md:mb-0'>
            <ShoppingBag className='text-white' size={36}/>
          </div>
          <div className='w-full md:w-[80%] md:p-5'>
            <h1 className='text-lg md:text-2xl text-white font-semibold'>
              Gerencie a sua Loja 
              <br /> 
              <span className='mt-2 text-xs md:text-sm font-normal'>e se destaque no Mercado</span>
            </h1>
            <p className='mt-3 leading-normal text-white text-xs md:text-sm max-w-[500px]'>
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