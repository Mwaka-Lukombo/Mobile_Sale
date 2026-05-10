import { BanknoteIcon, CarIcon, Lock, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ContainerAuth = () => {
  // States para controlar visibilidade das senhas
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className='w-full flex flex-col md:flex-row gap-3 min-h-screen bg-[#f7f7f7] py-8 px-[4%] md:py-12'>
      
      {/* left side - mockup */}
      <div className='w-full md:w-[60%] flex flex-col items-center justify-center md:block relative'>
        
        {/* Container do mockup menor */}
        <div className='flex items-center justify-center md:justify-start'>
          
          {/* mockup container - tamanho reduzido */}
          <div className='relative'>
            <div className='flex items-center justify-center w-[300px] md:w-[400px] h-[300px] md:h-[350px] rounded-tl-[150px] rounded-tr-[130px] rounded-br-[170px] rounded-bl-[150px] bg-gradient-to-br from-secondary-blue  to-primary-blue -rotate-12 shadow-xl'>
              
              {/* iPhone X - tamanho reduzido */}
              <div className='rotate-12 relative -top-10 w-[140px] h-[270px] md:w-[160px] md:h-[310px] rounded-2xl'>
                <div className="relative w-full h-full bg-white rounded-[28px] shadow-2xl overflow-hidden">
                  
                  {/* Borda */}
                  <div className="absolute inset-0 rounded-[28px] border-[4px] border-[#cccc] pointer-events-none"></div>
                  
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[22px] bg-[#ccc] rounded-b-xl z-20"></div>
                  
                  {/* Botões laterais */}
                  <div className="absolute left-0 top-[60px] w-[2px] h-5 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute left-0 top-[75px] w-[2px] h-8 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute left-0 top-[115px] w-[2px] h-4 bg-gray-400 rounded-l-md"></div>
                  <div className="absolute right-0 top-[70px] w-[2px] h-9 bg-gray-400 rounded-r-md"></div>
                  
                  {/* Tela */}
                  <div className="absolute inset-[4px] bg-gray-50 rounded-[24px] overflow-hidden">
                    
                    {/* Status Bar */}
                    <div className="pt-8 px-2 pb-1 flex justify-between text-[7px] text-gray-400">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    
                    {/* Header */}
                    <div className="px-2 pb-1">
                      <h2 className="text-[8px] font-semibold text-gray-500">Segunda, 5 Maio</h2>
                    </div>
                    
                    {/* Grid Apps */}
                    <div className="px-2 pb-2">
                      <div className="grid grid-cols-4 gap-1">
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 text-[10px]">☀️</div>
                          <span className="text-[5px] text-gray-500">Tempo</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center text-green-500 text-[10px]">👤</div>
                          <span className="text-[5px] text-gray-500">Contatos</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-500 text-[10px]">💬</div>
                          <span className="text-[5px] text-gray-500">WhatsApp</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center text-green-500 text-[10px]">📞</div>
                          <span className="text-[5px] text-gray-500">Telefone</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 text-[10px]">💬</div>
                          <span className="text-[5px] text-gray-500">Mensagens</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-pink-500 text-[10px]">📷</div>
                          <span className="text-[5px] text-gray-500">Instagram</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-purple-500 text-[10px]">🗺️</div>
                          <span className="text-[5px] text-gray-500">Mapas</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-0">
                          <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-[10px]">📸</div>
                          <span className="text-[5px] text-gray-500">Câmera</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dock */}
                    <div className="absolute bottom-6 left-0 right-0 px-2">
                      <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl py-1 px-2 flex justify-around">
                        <div className="flex flex-col items-center gap-0">
                          <span className="text-[10px] text-gray-500">📱</span>
                          <span className="text-[5px] text-gray-400">Telefone</span>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                          <span className="text-[10px] text-gray-500">🌐</span>
                          <span className="text-[5px] text-gray-400">Safari</span>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                          <span className="text-[10px] text-gray-500">💬</span>
                          <span className="text-[5px] text-gray-400">Mensagens</span>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                          <span className="text-[10px] text-gray-500">🎵</span>
                          <span className="text-[5px] text-gray-400">Música</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-[100px] h-[3px] bg-[#ccc] rounded-full opacity-80 z-30"></div>
                  
                  {/* Reflexo */}
                  <div className="absolute inset-0 rounded-[28px] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right-side-information - movido para baixo no mobile */}
        <div className='hidden md:block w-full mt-6 md:absolute md:right-0 md:top-[30%] md:w-[calc(50%)] shadow-xl border border-[#ccc] rounded-xl md:rounded-none'>
          <div className='flex flex-col p-4 px-6'>
            <h1 className='text-xl md:text-2xl leading-normal font-bold mb-3'>
              Seu Próximo <br /> SmartPhone<br /> está aqui
            </h1>
            <p className='text-base md:text-lg mb-4'>
              As melhores marcas<br /> com os melhores preços.
            </p>

            <div className='space-y-2'>
              <div className='flex gap-3 items-center'>
                <CarIcon className='w-5 h-5 text-gray-600' />
                <p className='text-sm md:text-base'>Entrega rápida e para todo Inhambane</p>
              </div>

              <div className='flex gap-3 items-center'>
                <BanknoteIcon className='w-5 h-5 text-gray-600' />
                <p className='text-sm md:text-base'>Parcelas em até 12x</p>
              </div>

              <div className='flex gap-3 items-center'>
                <Lock className='w-5 h-5 text-gray-600' />
                <p className='text-sm md:text-base'>Compra 100% Segura</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right-side - formulário */}
      <div className='w-full md:w-[40%] min-h-[500px] shadow-xl border border-[#ccc] rounded-xl p-4 md:p-5 mt-4 md:mt-0'>
        
        <div className='p-2'>
          <h1 className='text-xl md:text-2xl font-bold leading-normal'>Criar Conta</h1>
          <p className='text-sm md:text-base font-normal'>Preencha os dados abaixo para cadastrar</p>
        </div>

        <form className='my-4 md:my-5 space-y-4'>
          
          {/* Nome Completo */}
          <div className='form-control'>
            <div className='label mb-1'>
              <p className='text-sm font-medium'>Nome Completo:</p>
            </div>
            <input 
              type='text' 
              placeholder='Digite o seu nome' 
              className='w-full input pl-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:border-orange-400 transition-colors'
            />
          </div>

          {/* E-mail */}
          <div className='form-control'>
            <div className='label mb-1'>
              <p className='text-sm font-medium'>E-mail:</p>
            </div>
            <input 
              type='email' 
              placeholder='Digite o seu email' 
              className='w-full input pl-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:border-orange-400 transition-colors'
            />
          </div>

          {/* Password com ícone de olho */}
          <div className='form-control'>
            <div className='label mb-1'>
              <p className='text-sm font-medium'>Password:</p>
            </div>
            <div className='relative'>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Digite a sua senha' 
                className='w-full input pl-4 pr-10 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:border-orange-400 transition-colors'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors'
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirmar Password com ícone de olho */}
          <div className='form-control'>
            <div className='label mb-1'>
              <p className='text-sm font-medium'>Confirmar Password:</p>
            </div>
            <div className='relative'>
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder='Confirme a sua senha' 
                className='w-full input pl-4 pr-10 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:border-primary-blue transition-colors'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-blue transition-colors'
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Botão de Cadastro */}
          <button 
            type='submit'
            className='w-full bg-gradient-to-r from-secondary-blue to-primary-blue text-white font-semibold py-2 rounded-lg hover:from-primary-blue hover:to-secondary-blue transition-all duration-300 mt-4'
          >
            Cadastrar
          </button>

          {/* Link para login */}
          <p className='text-center text-sm text-gray-600 mt-3'>
            Já tem uma conta?{' '}
            <Link to={'/login'} className='text-primary-blue hover:text-secondary-blue font-medium'>
              Faça login
            </Link>
          </p>
        </form>
      </div>
      
    </div>
  )
}