import { BanknoteIcon, CarIcon, Lock, Eye, EyeOff, Mail, Smartphone, User, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import {toast} from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { LoaderComponent } from '../../components/common/LoaderComponent';

export const SignupPage = () => {
  // States para controlar visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [name,setName] = useState("");
    const [email,setEmail] = useState("");
     const [password,setPassword] = useState("");
      const [confirmPassword,setConfirmPassword] = useState("");

      const {
        isLoading,
        error,
        signup
      } = useAuthStore();

  
  const mockupAnimations = {
    
    containerEntrance: {
      hidden: { opacity: 0, scale: 0.8, rotateY: -180 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        transition: { 
          duration: 0.8, 
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    },
    
    // Animação de flutuação suave do mockup
    floatAnimation: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          y: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5
          }
        }
      }
    },
    
    // Animação de rotação do fundo colorido
    rotateBackground: {
      hidden: { opacity: 0, rotate: -12, scale: 0.9 },
      visible: { 
        opacity: 1, 
        rotate: -12,
        scale: 1,
        transition: { 
          duration: 0.7,
          rotate: {
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      }
    },
    
    // Animação de aparecimento dos elementos internos
    elementsReveal: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.5,
          delay: 0.3,
          type: "spring"
        }
      }
    },
    
    // Animação de pulso para ícones específicos
    pulseIcon: {
      hidden: { opacity: 0, scale: 0 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.4,
          scale: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      }
    },
    
    // Animação de deslize para itens do grid
    gridItem: {
      hidden: { opacity: 0, x: -20 },
      visible: (custom) => ({ 
        opacity: 1, 
        x: 0,
        transition: { 
          delay: custom * 0.05,
          duration: 0.3 
        }
      })
    },
    // Animação de brilho no banner
    bannerGlow: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.6
        }
      }
    },
    // Animação de entrada para o card de informações
    infoCardEntrance: {
      hidden: { opacity: 0, x: 100 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.7, 
          delay: 0.4,
          type: "spring",
          stiffness: 80
        }
      }
    }
  }



  const resetForm = ()=>{
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
     return toast.error("Passwords's dont mutch")
    }

    const newUser = {
      name,
      email,
      password
    }

    await signup(newUser);

  }

  return (
    <div className='w-full flex flex-col md:flex-row gap-3 min-h-screen bg-[#f7f7f7] py-8 px-[4%] md:py-12 overflow-hidden'>
      
      {/* left side - mockup iPhone 15 COM ANIMAÇÃO */}
      <motion.div 
        className='w-full md:w-[60%] flex flex-col items-center justify-center md:block relative'
        variants={mockupAnimations.containerEntrance}
        initial="hidden"
        animate="visible"
      >
        
        {/* Container do mockup */}
        <div className='flex items-center justify-center md:justify-start'>
          
          {/* mockup container - formato pêssego com azul */}
          <motion.div 
            className='relative'
            variants={mockupAnimations.floatAnimation}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className='flex items-center justify-center w-[300px] md:w-[450px] h-[300px] md:h-[380px] rounded-tl-[150px] rounded-tr-[130px] rounded-br-[170px] rounded-bl-[150px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 -rotate-12 shadow-xl'
              variants={mockupAnimations.rotateBackground}
              initial="hidden"
              animate="visible"
            >
              
              {/* iPhone 15 - tamanho ajustado */}
              <motion.div 
                className='rotate-12 relative -top-10 w-[150px] h-[280px] md:w-[180px] md:h-[330px] rounded-2xl'
                variants={mockupAnimations.elementsReveal}
                initial="hidden"
                animate="visible"
              >
                <div className="relative w-full h-full bg-white rounded-[32px] shadow-2xl overflow-hidden">
                  
                  {/* Borda preta */}
                  <div className="absolute inset-0 rounded-[32px] border-[3px] border-[#cccc] pointer-events-none"></div>
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[80px] h-[24px] md:w-[90px] md:h-[28px] bg-black rounded-full z-20"></div>
                  
                  {/* Botões laterais */}
                  <div className="absolute left-0 top-[60px] w-[2px] h-6 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute left-0 top-[75px] w-[2px] h-8 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute left-0 top-[115px] w-[2px] h-5 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute right-0 top-[70px] w-[2px] h-10 bg-gray-400 rounded-r-md"></div>
                  <div className="absolute left-0 top-[160px] w-[2px] h-4 bg-gray-400 rounded-l-md"></div>
                  
                  {/* Tela com conteúdo */}
                  <div className="absolute inset-[3px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[29px] overflow-hidden">
                    
                    {/* Status Bar */}
                    <div className="pt-8 px-2 pb-1 flex justify-between text-[7px] text-gray-500 font-medium">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    
                    {/* Header */}
                    <motion.div 
                      className="px-2 pb-2 text-center"
                      variants={mockupAnimations.elementsReveal}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div 
                        className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2"
                        variants={mockupAnimations.pulseIcon}
                        initial="hidden"
                        animate="visible"
                      >
                        <UserPlus size={20} className="text-white" />
                      </motion.div>
                      <h2 className="text-[9px] md:text-[10px] font-semibold text-gray-700">Crie sua conta</h2>
                      <p className="text-[6px] md:text-[7px] text-gray-500 mt-1">
                        Junte-se a nós e<br />
                        tenha a melhor experiência
                      </p>
                    </motion.div>
                    
                    {/* Grid de Apps */}
                    <div className="px-2">
                      <div className="grid grid-cols-4 gap-1 gap-y-1.5">
                        {[
                          { emoji: "📱", name: "Loja", color: "blue" },
                          { emoji: "🛒", name: "Compras", color: "green" },
                          { emoji: "🎮", name: "Jogos", color: "purple" },
                          { emoji: "📷", name: "Fotos", color: "pink" }
                        ].map((app, index) => (
                          <motion.div 
                            key={app.name}
                            className="flex flex-col items-center gap-0"
                            custom={index}
                            variants={mockupAnimations.gridItem}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <div className={`w-6 h-6 rounded-lg bg-${app.color}-100 flex items-center justify-center text-${app.color}-500 text-[10px]`}>
                              {app.emoji}
                            </div>
                            <span className="text-[5px] text-gray-500">{app.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Banner */}
                    <motion.div 
                      className="absolute bottom-12 left-2 right-2"
                      variants={mockupAnimations.bannerGlow}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div 
                        className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-1.5 text-center"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(59,130,246,0)",
                            "0 0 10px rgba(59,130,246,0.5)",
                            "0 0 0px rgba(59,130,246,0)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <p className="text-[5px] text-white font-bold">🎉 CADASTRE-SE JÁ</p>
                        <p className="text-[4px] text-white/90">Ganhe 10% de desconto na primeira compra</p>
                      </motion.div>
                    </motion.div>
                    
                    {/* Dock */}
                    <motion.div 
                      className="absolute bottom-2 left-0 right-0 px-2"
                      variants={mockupAnimations.bannerGlow}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.7 }}
                    >
                      <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl py-1 px-2 flex justify-around">
                        {[
                          { emoji: "📱", name: "App Store" },
                          { emoji: "🌐", name: "Safari" },
                          { emoji: "💬", name: "iMessage" }
                        ].map((item, index) => (
                          <motion.div 
                            key={item.name}
                            className="flex flex-col items-center gap-0"
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <span className="text-[8px] text-gray-500">{item.emoji}</span>
                            <span className="text-[4px] text-gray-400">{item.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-[100px] h-[3px] bg-[#ccc] rounded-full opacity-80 z-30"></div>
                  
                  {/* Reflexo */}
                  <div className="absolute inset-0 rounded-[32px] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/30 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Informações da loja (apenas no register) COM ANIMAÇÃO */}
        <motion.div 
          className='hidden md:block w-full mt-6 md:absolute md:right-0 md:top-[20%] md:w-[calc(50%)] shadow-xl border border-[#ccc] rounded-xl md:rounded-none bg-white'
          variants={mockupAnimations.infoCardEntrance}
          initial="hidden"
          animate="visible"
        >
          <div className='flex flex-col p-4 px-6'>
            <h1 className='text-xl md:text-2xl leading-normal font-bold mb-3 text-gray-800'>
              Seu Próximo <br /> SmartPhone<br /> está aqui
            </h1>
            <p className='text-base md:text-lg mb-4 text-gray-600'>
              As melhores marcas<br /> com os melhores preços.
            </p>

            <div className='space-y-2'>
              <div className='flex gap-3 items-center group'>
                <CarIcon className='w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform duration-300' />
                <p className='text-sm md:text-base text-gray-700'>Entrega rápida e para todo Inhambane</p>
              </div>

              <div className='flex gap-3 items-center group'>
                <BanknoteIcon className='w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform duration-300' />
                <p className='text-sm md:text-base text-gray-700'>Parcelas em até 12x</p>
              </div>

              <div className='flex gap-3 items-center group'>
                <Lock className='w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform duration-300' />
                <p className='text-sm md:text-base text-gray-700'>Compra 100% Segura</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* right-side - formulário de cadastro SEM ANIMAÇÃO */}
      <div className='w-full md:w-[40%] min-h-[550px] shadow-xl border border-[#ccc] rounded-xl p-4 md:p-6 mt-4 md:mt-0 bg-white'>
        
        <div className='text-center md:text-left mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold leading-normal text-gray-800'>Criar Conta</h1>
          <p className='text-sm md:text-base text-gray-500 mt-1'>Preencha os dados abaixo para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          
          {/* Nome Completo */}
          <div className='form-control'>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>Nome Completo</label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type='text' 
                placeholder='Digite seu nome completo' 
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all
                bg-inherit
                '
              />
            </div>
          </div>

          {/* E-mail */}
          <div className='form-control'>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>E-mail</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type='email' 
                placeholder='seu@email.com' 
                onChange={(e)=> setEmail(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all
                bg-inherit
                '
              />
            </div>
          </div>

          {/* Senha */}
          <div className='form-control'>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>Senha</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Digite sua senha' 
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                className='w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all
                bg-inherit
                '
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                value={confirmPassword}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors'
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className='form-control'>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>Confirmar Senha</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder='Confirme sua senha' 
                onChange={(e)=> setConfirmPassword(e.target.value)}
                className='w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all
                bg-inherit
                '
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors'
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
            
            {/* Error content */}
            <div>
              <p className='text-red-500'>{error}</p>
            </div>
          {/* Botão de Cadastro */}
          <button 
          disabled={isLoading}
            type='submit'
            className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg mt-2'
          >
            {!isLoading ? "Cadastrar" : <LoaderComponent size={7} />}
          </button>

          {/* Link para login */}
          <p className='text-center text-sm text-gray-600 mt-5'>
            Já tem uma conta?{' '}
            <Link to={'/login'} className='text-blue-500 hover:text-blue-600 font-semibold hover:underline'>
              Faça login
            </Link>
          </p>
        </form>
      </div>
      
    </div>
  )
}