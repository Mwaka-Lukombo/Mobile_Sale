import { Lock, Eye, EyeOff, Key, CheckCircle, ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const ResetPasswordPage = () => {
  // States apenas para controle de visibilidade das senhas
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [newPassword,setNewPassword] = useState("");
    const [repeatPassword,setConfirmPassword] = useState("");
     const navigate = useNavigate();

       const {token} = useParams();

       const {
        resetPassword,
        isLoading,
        error
       } = useAuthStore();

       const resetForm = ()=>{
        setNewPassword("");
        setConfirmPassword("");
       }

    const handleSubmit = async(e)=>{
    
         if(newPassword !== repeatPassword){
            return toast.error("Password's dont mutch");
         }
         

         await resetPassword({newPassword,repeatPassword},token);
         resetForm();

         if(!error){
            setTimeout(()=>{
             navigate('/login')
            },2000) 
         }
         

    }

  return (
    <div className='w-full flex flex-col md:flex-row gap-3 min-h-screen bg-[#f7f7f7] py-8 px-[4%] md:py-12'>
      
      {/* left-side - formulário de reset senha */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='w-full md:w-[40%] shadow-xl border border-[#ccc] rounded-xl p-4 md:p-6 bg-white h-auto order-2 md:order-1'
      >
        {/* Botão voltar */}
        <Link to={'/login'} href='#' className='inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-6'>
          <ArrowLeft size={18} />
          <span className='text-sm font-medium'>Voltar para o login</span>
        </Link>

        <div className='mb-6'>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4'
          >
            <Key size={28} className='text-blue-500' />
          </motion.div>
          <h1 className='text-2xl md:text-3xl font-bold leading-normal text-gray-800'>Redefinir Senha</h1>
          <p className='text-sm md:text-base text-gray-500 mt-2'>
            Digite sua nova senha abaixo para redefinir o acesso à sua conta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          
          {/* Nova Senha */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className='form-control'
          >
            <label className='text-sm font-medium text-gray-700 mb-1 block'>Nova Senha</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type={showNewPassword ? 'text' : 'password'} 
                placeholder='Digite sua nova senha' 
                onChange={(e)=> setNewPassword(e.target.value)}
                value={newPassword}
                className='w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all'
              />
              <button
                type='button'
                onClick={() => setShowNewPassword(!showNewPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors'
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className='text-xs text-gray-500 mt-1.5'>
              A senha deve ter no mínimo 6 caracteres
            </p>
          </motion.div>

          {/* Confirmar Nova Senha */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className='form-control'
          >
            <label className='text-sm font-medium text-gray-700 mb-1 block'>Confirmar Nova Senha</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder='Confirme sua nova senha' 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={repeatPassword}
                className='w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors'
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          {/* Requisitos de senha */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className='bg-blue-50 rounded-lg p-3 space-y-1.5'
          >
            <p className='text-xs font-semibold text-blue-700 mb-1'>Sua senha deve conter:</p>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-gray-300'></div>
              <span className='text-xs text-gray-600'>Mínimo de 6 caracteres</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-gray-300'></div>
              <span className='text-xs text-gray-600'>Pelo menos uma letra maiúscula</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-gray-300'></div>
              <span className='text-xs text-gray-600'>Pelo menos um número</span>
            </div>
          </motion.div>

          {/* Botão de Redefinir */}
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg mt-2 flex items-center justify-center gap-2'
          >
            <Key size={18} />
            <span>Redefinir Senha</span>
          </motion.button>
        </form>

        {/* Divisor para mobile */}
        <div className='mt-6 pt-4 border-t border-gray-200 md:hidden'>
          <p className='text-center text-xs text-gray-400'>
            Precisa de ajuda? <a href='#' className='text-blue-500'>Fale conosco</a>
          </p>
        </div>
      </motion.div>

      {/* right-side - mockup Samsung Note 10 com animação */}
      <div className='w-full md:w-[60%] flex flex-col items-center justify-center md:block order-1 md:order-2'>
        
        {/* Container do mockup */}
        <div className='flex items-center justify-center md:justify-center'>
          
          {/* mockup container - formato pêssego com animação */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.1,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className='relative'
          >
            <div className='flex items-center justify-center w-[300px] md:w-[450px] h-[300px] md:h-[380px] rounded-tl-[150px] rounded-tr-[130px] rounded-br-[170px] rounded-bl-[150px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 -rotate-12 shadow-xl'>
              
              {/* Samsung Note 10 com animação de flutuação */}
              <motion.div 
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className='rotate-12 relative -top-10 w-[150px] h-[280px] md:w-[180px] md:h-[330px] rounded-2xl'
              >
                <div className="relative w-full h-full bg-white rounded-[28px] shadow-2xl overflow-hidden">
                  
                  {/* Borda Samsung Note 10 */}
                  <div className="absolute inset-0 rounded-[28px] border-[3px] border-gray-300 pointer-events-none"></div>
                  
                  {/* Infinity-O Display Note 10 (buraco central) - com animação de brilho */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[8px] h-[8px] md:w-[10px] md:h-[10px] bg-black rounded-full z-20"
                  ></motion.div>
                  
                  {/* Botões laterais Note 10 */}
                  <div className="absolute left-0 top-[70px] w-[2px] h-8 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute left-0 top-[110px] w-[2px] h-5 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute right-0 top-[80px] w-[2px] h-14 bg-gray-400 rounded-r-md"></div>
                  
                  {/* Botão S Pen (simulado) com animação */}
                  <motion.div 
                    animate={{ 
                      x: [0, -2, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute bottom-20 right-0 w-[2px] h-10 bg-blue-300 rounded-r-md"
                  ></motion.div>
                  
                  {/* Tela com conteúdo One UI */}
                  <div className="absolute inset-[3px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[25px] overflow-hidden">
                    
                    {/* Status Bar Note 10 */}
                    <div className="pt-8 px-2 pb-1 flex justify-between text-[7px] text-gray-500 font-medium">
                      <span className="font-bold">09:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>📶</span>
                        <span>🔋</span>
                        <motion.span 
                          animate={{ rotate: [0, 15, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >✏️</motion.span>
                      </div>
                    </div>
                    
                    {/* Header com mensagem */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="px-2 pb-2 text-center"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Key size={20} className="text-white" />
                      </div>
                      <h2 className="text-[9px] md:text-[10px] font-semibold text-gray-700">Redefinir Senha</h2>
                      <p className="text-[6px] md:text-[7px] text-gray-500 mt-1">
                        Crie uma nova senha<br />
                        para sua conta Samsung
                      </p>
                    </motion.div>
                    
                    {/* Grid de Apps One UI com animação nos ícones */}
                    <div className="px-2">
                      <div className="grid grid-cols-4 gap-1 gap-y-1.5">
                        
                        {[
                          { icon: "📱", label: "Galaxy", color: "blue", delay: 0.1 },
                          { icon: "🛒", label: "Loja", color: "green", delay: 0.2 },
                          { icon: "✏️", label: "S Pen", color: "purple", delay: 0.3 },
                          { icon: "📷", label: "Câmera", color: "pink", delay: 0.4 },
                          { icon: "💬", label: "Mensagens", color: "emerald", delay: 0.5 },
                          { icon: "🎵", label: "Música", color: "indigo", delay: 0.6 },
                          { icon: "🔐", label: "Segurança", color: "blue", delay: 0.7 },
                          { icon: "⚙️", label: "Config.", color: "cyan", delay: 0.8 }
                        ].map((app, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: app.delay }}
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center gap-0"
                          >
                            <div className={`w-6 h-6 rounded-lg bg-${app.color}-100 flex items-center justify-center text-${app.color}-500 text-[10px]`}>
                              {app.icon}
                            </div>
                            <span className="text-[5px] text-gray-500">{app.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Banner Note 10 com animação pulsante */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute bottom-12 left-2 right-2"
                    >
                      <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-1.5 text-center">
                        <p className="text-[5px] text-white font-bold">✏️ NOTE 10 | S PEN</p>
                        <p className="text-[4px] text-white/90">Anote suas ideias com precisão</p>
                      </div>
                    </motion.div>
                    
                    {/* Dock Samsung */}
                    <div className="absolute bottom-2 left-0 right-0 px-2">
                      <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl py-1 px-2 flex justify-around">
                        {["📞", "🌐", "💬", "✏️"].map((icon, idx) => (
                          <motion.div 
                            key={idx}
                            whileHover={{ y: -2 }}
                            className="flex flex-col items-center gap-0"
                          >
                            <span className="text-[8px] text-gray-500">{icon}</span>
                            <span className="text-[4px] text-gray-400">
                              {idx === 0 ? "Telefone" : idx === 1 ? "Samsung" : idx === 2 ? "Messages" : "S Pen"}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-[100px] h-[3px] bg-[#ccc] rounded-full opacity-80 z-30"></div>
                  
                  {/* Reflexo com animação de brilho */}
                  <motion.div 
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute inset-0 rounded-[28px] pointer-events-none overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/30 to-transparent"></div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Informações adicionais */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='hidden md:block mt-6 text-center'
        >
          <p className='text-xs text-gray-500'>
            Precisa de ajuda? <a href='#' className='text-blue-500 hover:text-blue-600'>Fale com o suporte</a>
          </p>
        </motion.div>
      </div>
      
    </div>
  )
}