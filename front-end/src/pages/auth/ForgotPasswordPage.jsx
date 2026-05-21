import { Lock, Eye, EyeOff, Mail, Smartphone, ArrowLeft, Send } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'

export const ForgotPasswordPage = () => {
  // States para控制ar o formulário
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const {
    isLoading,
    error,
    forgotPassword
  } = useAuthStore();

  // Keyframes de animação usando Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const rotateIn = {
    hidden: { opacity: 0, rotateY: -90, scale: 0.5 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring", stiffness: 100 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const bounceIn = {
    hidden: { opacity: 0, scale: 0.3, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) return
    
    try {
      await forgotPassword(email)
      
      // Se chegou aqui, deu certo
      setSubmitted(true)
    } catch (err) {
      // Se deu erro, o store já deve ter o erro
      console.error('Erro ao enviar email:', err)
    }
  }

  return (
    <div className='w-full flex flex-col md:flex-row gap-3 min-h-screen bg-[#f7f7f7] py-8 px-[4%] md:py-12 overflow-hidden'>
      
      {/* left-side - formulário de esqueceu senha - Tamanhos ajustados */}
      <motion.div 
        className='w-full md:w-[40%] shadow-xl border border-[#ccc] rounded-xl p-4 md:p-6 bg-white h-auto order-2 md:order-1'
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
      >
        
        {/* Botão voltar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Link to={'/login'} className='inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-6'>
            <ArrowLeft size={16} />
            <span className='text-xs font-medium'>Voltar para o login</span>
          </Link>
        </motion.div>

        {!submitted ? (
          <>
            <motion.div 
              className='mb-6'
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className='flex items-center justify-center'
                variants={bounceIn}
              >
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4'>
                  <Lock size={20} className='text-blue-500' />
                </div>
              </motion.div>
              
              <motion.h1 
                className='text-xl md:text-2xl font-bold leading-normal text-gray-800 text-center md:text-left'
                variants={fadeInUp}
              >
                Esqueceu a senha?
              </motion.h1>
              
              <motion.p 
                className='text-sm md:text-xs text-gray-500 mt-2 text-center md:text-left'
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.
              </motion.p>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit} 
              className='space-y-4'
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* E-mail */}
              <motion.div 
                className='form-control'
                variants={fadeInUp}
              >
                <label className='text-xs font-medium text-gray-700 mb-2 block'>E-mail</label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={17} />
                  <input 
                    type='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='seu@email.com' 
                    className='w-full pl-10 h-[40px] text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all bg-inherit'
                    required
                  />
                </div>
                
                {/* Exibir erro se houver */}
                {error && (
                  <motion.p 
                    className='text-xs text-red-500 mt-1.5'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
                
                <motion.p 
                  className='text-xs text-gray-500 mt-1.5'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Enviaremos um link de recuperação para este e-mail se a conta existir.
                </motion.p>
              </motion.div>

              {/* Botão de Enviar */}
              <motion.button 
                type='submit'
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold h-[40px] text-sm rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Enviar link de recuperação</span>
                  </>
                )}
              </motion.button>

              {/* Link para cadastro */}
              <motion.p 
                className='text-center text-xs text-gray-600 mt-5'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Não tem uma conta?{' '}
                <Link to={'/signup'} className='text-xs text-blue-500 hover:text-blue-600 font-semibold hover:underline'>
                  Cadastre-se gratuitamente
                </Link>
              </motion.p>

              {/* Divisor */}
              <div className='relative my-6'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
                <div className='relative flex justify-center text-xs'>
                  <span className='px-3 bg-white text-gray-400'>ou continue com</span>
                </div>
              </div>

              {/* Botões de redes sociais */}
              <div className='space-y-2'>
                <button className='w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors'>
                  <span className='text-xs'>&copy;</span>
                  <span className='text-xs text-gray-700'>Google</span>
                </button>
              </div>
            </motion.form>
          </>
        ) : (
          // Mensagem de sucesso - Tamanhos ajustados
          <motion.div 
            className='text-center py-8'
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className='w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'
              variants={bounceIn}
            >
              <motion.svg 
                className='w-7 h-7 text-green-500' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </motion.svg>
            </motion.div>
            <motion.h2 
              className='text-lg font-bold text-gray-800 mb-2'
              variants={fadeInUp}
            >
              E-mail enviado!
            </motion.h2>
            <motion.p 
              className='text-xs text-gray-600 mb-3'
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Enviamos um link de recuperação de senha para:
            </motion.p>
            <motion.p 
              className='text-xs text-blue-600 font-medium mb-5 break-all'
              variants={scaleIn}
              transition={{ delay: 0.2 }}
            >
              {email}
            </motion.p>
            <motion.p 
              className='text-xs text-gray-500 mb-6'
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              Por favor, verifique sua caixa de entrada e spam. O link expira em 1 hora.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={'/login'} 
                className='inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold h-[40px] px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center text-sm'
              >
                Voltar para o login
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Divisor para mobile */}
        <div className='mt-6 pt-4 border-t border-gray-200 md:hidden'>
          <p className='text-center text-xs text-gray-400'>
            Precisa de ajuda? <a href='#' className='text-blue-500'>Fale conosco</a>
          </p>
        </div>
      </motion.div>

      {/* right-side - mockup Xiaomi (mantido mas com tamanhos ajustados) */}
      <motion.div 
        className='w-full md:w-[60%] flex flex-col items-center justify-center md:block order-1 md:order-2'
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
      >
        
        {/* Container do mockup */}
        <div className='flex items-center justify-center md:justify-center'>
          
          {/* mockup container - formato pêssego com azul */}
          <motion.div 
            className='relative'
            variants={rotateIn}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className='flex items-center justify-center w-[300px] md:w-[450px] h-[300px] md:h-[380px] rounded-tl-[150px] rounded-tr-[130px] rounded-br-[170px] rounded-bl-[150px] bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 -rotate-12 shadow-xl'
              animate={{
                rotate: [-12, -10, -14, -12],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              
              {/* Xiaomi - estilo Mi 9 / Mi 10 */}
              <motion.div 
                className='rotate-12 relative -top-10 w-[150px] h-[280px] md:w-[180px] md:h-[330px] rounded-2xl'
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              >
                <div className="relative w-full h-full bg-white rounded-[28px] shadow-2xl overflow-hidden">
                  
                  {/* Borda Xiaomi (prata/azul claro) */}
                  <div className="absolute inset-0 rounded-[28px] border-[3px] border-blue-200 pointer-events-none"></div>
                  
                  {/* Notch estilo Xiaomi (gota d'água) */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40px] h-[18px] bg-black rounded-b-full z-20"></div>
                  
                  {/* Botões laterais Xiaomi */}
                  <div className="absolute left-0 top-[70px] w-[2px] h-7 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute left-0 top-[100px] w-[2px] h-9 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute right-0 top-[80px] w-[2px] h-12 bg-gray-400 rounded-r-md"></div>
                  
                  {/* Tela com conteúdo MIUI */}
                  <div className="absolute inset-[3px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[25px] overflow-hidden">
                    
                    {/* Status Bar Xiaomi */}
                    <div className="pt-8 px-2 pb-1 flex justify-between text-[7px] text-gray-500 font-medium">
                      <span className="font-bold">09:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    
                    {/* Header com mensagem CellShop */}
                    <motion.div 
                      className="px-2 pb-2 text-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div 
                        className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Smartphone size={20} className="text-white" />
                      </motion.div>
                      <h2 className="text-[9px] md:text-[10px] font-semibold text-gray-700">Recupere sua senha</h2>
                      <p className="text-[6px] md:text-[7px] text-gray-500 mt-1">
                        Enviamos um link para<br />
                        redefinir sua senha
                      </p>
                    </motion.div>
                    
                    {/* Grid de Apps MIUI */}
                    <div className="px-2">
                      <div className="grid grid-cols-4 gap-1 gap-y-1.5">
                        {[
                          { emoji: "📱", name: "Mi Store", color: "blue" },
                          { emoji: "🛒", name: "Compras", color: "green" },
                          { emoji: "🎮", name: "Jogos", color: "purple" },
                          { emoji: "📷", name: "Câmera", color: "pink" },
                          { emoji: "💬", name: "Mensagens", color: "emerald" },
                          { emoji: "🎵", name: "Música", color: "indigo" },
                          { emoji: "🔒", name: "Segurança", color: "blue" },
                          { emoji: "⚙️", name: "Config.", color: "cyan" }
                        ].map((app, index) => (
                          <motion.div 
                            key={app.name}
                            className="flex flex-col items-center gap-0"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + (index * 0.05) }}
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
                    
                    {/* Banner de recuperação */}
                    <motion.div 
                      className="absolute bottom-12 left-2 right-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-1.5 text-center">
                        <p className="text-[5px] text-white font-bold">🔐 RECUPERAÇÃO DE SENHA</p>
                        <p className="text-[4px] text-white/90">Verifique seu e-mail</p>
                      </div>
                    </motion.div>
                    
                    {/* Dock Xiaomi */}
                    <motion.div 
                      className="absolute bottom-2 left-0 right-0 px-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl py-1 px-2 flex justify-around">
                        {[
                          { emoji: "📞", name: "Telefone" },
                          { emoji: "🌐", name: "Browser" },
                          { emoji: "💬", name: "Mi Messages" },
                          { emoji: "📷", name: "Câmera" }
                        ].map((item, index) => (
                          <motion.div 
                            key={item.name}
                            className="flex flex-col items-center gap-0"
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="text-[8px] text-gray-500">{item.emoji}</span>
                            <span className="text-[4px] text-gray-400">{item.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                  </div>
                  
                  {/* Home Indicator Xiaomi */}
                  <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-[100px] h-[3px] bg-[#ccc] rounded-full opacity-80 z-30"></div>
                  
                  {/* Reflexo */}
                  <div className="absolute inset-0 rounded-[28px] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/30 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Informações adicionais (apenas desktop) */}
        <motion.div   
          className='hidden md:block mt-6 text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className='text-xs text-gray-500'>
            Precisa de ajuda? <a href='#' className='text-blue-500 hover:text-blue-600'>Fale com o suporte</a>
          </p>
        </motion.div>
      </motion.div>
      
    </div>
  )
}