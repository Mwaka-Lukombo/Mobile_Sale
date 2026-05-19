import { Banner } from './subPages/Banner';
import {Link} from 'react-router-dom';
import {
  ArrowRight,
  Menu,
  MenuSquareIcon,
  Smartphone,
  ChevronRight,
  TableCellsMerge,
  SmartphoneNfc,
  Headphones,
  Wifi,
  Caravan,
  Van,
  CreditCard,
  Verified,
  ShieldCheck,
  RefreshCcw,
  Headset,
  Heart,
  Star,
  MailOpen,
  LogOut
} from 'lucide-react';

import {formatNumber} from '../../lib/formatNumbers';
import {
  FaCcMastercard,
  FaCcStripe,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import {
 useAuthStore
} from '../../store/authStore';
import { useState } from 'react';

export const HomeClient = () => {
  const [page,setPage] = useState("home");

  const {
   logout
  } = useAuthStore();


  const categoriesMenu = [
    { id: 1, icon: Smartphone, name: "Smartphone" },
    { id: 2, icon: SmartphoneNfc, name: "Tablets" },
    { id: 3, icon: Headphones, name: "Fones de Ouvido" },
    { id: 4, icon: Wifi, name: "Acessórios" },
  ];

  
  const benefits = [
    { id: 1, icon: Van, title: "Frete Grátis", description: "Para todo inhambane" },
    { id: 2, icon: CreditCard, title: "Parcela em até 12x", description: "Sem juros no cartão" },
    { id: 3, icon: ShieldCheck, title: "Garantia Oficial", description: "Para todo inhambane" },
    { id: 4, icon: RefreshCcw, title: "Troca e devolução", description: "Até 7 dias após recebimento" },
    { id: 5, icon: Headset, title: "Atendimento Premimum", description: "Humanizado" },
  ];

  
  const featuredCategories = [
    { id: 1, icon: Smartphone, name: "Smartphones", color: "text-primary-blue" },
    { id: 2, icon: Headphones, name: "Fones de ouvido", color: "text-primary-blue" },
    { id: 3, icon: Wifi, name: "Acessórios", color: "text-primary-blue" },
    { id: 4, icon: SmartphoneNfc, name: "Tablets", color: "text-primary-blue" },
  ];

  const featuredProducts = [
    { stock:53, stars:4, id: 1, image:"https://m.media-amazon.com/images/I/71Yp3z87X4L._AC_UF894,1000_QL80_.jpg", name: "iPhone 15 Pro", price:85000, markPrice:6000, color: "text-primary-blue",currency:"MZN" },
    { stock:34, stars:5, id: 2, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVkFle0SZjuNH2wORYyOyJdSrlESccIG0jQ&s", name: "Samsung S24", price:75000, markPrice:5000, color: "text-primary-blue",currency:"MZN" },
    { stock:12, stars:3, id: 3, image:"https://www.apple.com/v/airpods-pro/r/images/overview/welcome/hero_startframe__bfinf01b59si_large.jpg", name: "AirPods Pro", price:12500, markPrice:7300, color: "text-primary-blue",currency:"MZN" },
    { stock:7, stars:5, id: 4, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgJXRBxddDPtOEh6R85gULvMfmwNqcAS8UA&s", name: "iPad Air", price:45000, markPrice:30000, color: "text-primary-blue",currency:"MZN" },
  ];

  const navLinks = [
    { id: 1, name: "Inicio", page: "home",href:"/" },
    { id: 2, name: "Smartphones", page: "smart",href:"/smartphones" },
    { id: 3, name: "Acessorios", page: "acessorios",href:"/acessorios"},
    { id: 4, name: "Tablets", page: "tablets",href:"/tablets"},
    { id: 5, name: "Contacto", page: "contacto",href:"/contacto"},
  ];


  const footerLinks = [
    {
      id:1,icon:FaFacebook,link:"https://facebook.com",
    },
    {
      id:2,icon:FaInstagram,link:"https://facebook.com",
    },
    {
      id:3,icon:FaWhatsapp,link:"https://facebook.com",
    }
  ]
  return (
    <div className='mt-4 md:mt-10 '>
      
      <div className='flex flex-wrap gap-4 px-3'>
        {/* MENU LATERAL ESQUERDO */}
        <div className='hidden lg:block w-[15%] h-[230px] bg-white shadow-xl rounded-xl'>
          <div className='flex items-center justify-center w-full h-[40px] bg-gradient-to-r from-primary-blue to-secondary-blue rounded-tl-md rounded-tr-md'>
            <h2 className='text-md font-semibold text-white flex items-center gap-3'>
              <MenuSquareIcon />
              <span>Todas as categorias</span>
            </h2>
          </div>

          <div className='mt-4 px-2'>
            {categoriesMenu.map((category, idx) => (
              <button 
                key={category.id}
                className='w-full flex items-center justify-between gap-3 mb-3'
              >
                <div className='flex gap-3'>
                  <category.icon size={20} />
                  <span>{category.name}</span>
                </div>
                <div>
                  <ChevronRight size={16} />
                </div>  
              </button>
            ))}
          </div>
        </div>

        {/* CONTEÚDO CENTRAL */}
        <div className='w-[95%] mx-auto lg:w-[64%]'>
          
          {/* MENU DE NAVEGAÇÃO SUPERIOR */}
          <div className='flex gap-3 mb-4 justify-center md:justify-start overflow-x-auto'>
            <ul className='flex gap-8 md:gap-16'>
              {navLinks.map((link) => (
                <li key={link.id} className="flex items-center flex-col gap-2">
                  <Link
                    onClick={() => setPage(link.page)}
                    to={link?.href}
                    className={`transition-all duration-300 whitespace-nowrap ${
                      page === link.page
                        ? "text-primary-blue font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <div
                    className={`h-[5px] rounded-xl bg-primary-blue transition-all duration-300 ${
                      page === link.page ? "w-[50px] opacity-100" : "w-0 opacity-0"
                    }`}
                  ></div>
                </li>
              ))}
            </ul>
          </div>

          {/* BANNER */}
          <Banner />
        </div>

        {/* CAIXA DE BENEFÍCIOS DIREITA */}
        <div className='hidden lg:block w-[15%]'>
           <div className='grid grid-rows-5 gap-3'>
              {benefits.map((benefit, idx) => (
                <div 
                  key={benefit.id}
                  className='p-3 shadow-sm border border-[#ccc] rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-300 cursor-pointer flex items-center gap-3'
                >
                  <benefit.icon size={30} className="text-primary-blue" />
                  <div>
                    <span className='font-semibold text-md'>{benefit.title}</span>
                    <p className='text-sm text-gray-600'>{benefit.description}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* DOWN REFS */}
        <div className='w-full p-3'>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
            {Array.isArray(benefits.slice(0,4)) && benefits.slice(0,4).map((item,index) => (
              <div 
                key={index}
                className='flex items-center gap-2 col-span-1 h-[70px] border-t border border-[#ccc] px-3 rounded-lg bg-white/30 hover:bg-white/50 cursor-pointer transition-all duration-300'
              >
                <div className='flex items-center justify-center w-[15%] h-[50px]'>
                  {<item.icon size={35} className="text-primary-blue"/>}
                </div>
                <div className='flex flex-col'>
                  <h1 className='font-semibold'>{item.title}</h1>
                  <p className='text-sm text-gray-600'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* SEÇÃO DE CATEGORIAS E PRODUTOS EM DESTAQUE */}
      <div className='grid md:grid-cols-2 gap-4 mt-8 px-3'>
        
        {/* CATEGORIAS EM DESTAQUE - PRIMEIRA CAIXA COM ROW DE 4 */}
        <div 
          className='col-span-1 min-h-[200px] border border-[#ccc] rounded-xl bg-white/50 shadow-sm p-3'
        >
          <div className='flex items-center justify-between px-2 mb-3'>
            <h1 className='font-semibold text-lg'>Categorias em destaque</h1>
            <Link to={"/"} className='text-blue-400 underline hover:text-blue-600 transition'>Ver todas</Link>
          </div>

          {/* GRID COM 4 COLUNAS (ROW DE 4) */}
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
            {featuredCategories.map((category, idx) => (
              <div 
                key={category.id}
                className='p-3 border border-[#ccc] bg-cinza-claro hover:bg-white transition-all duration-300 min-h-[180px] rounded-xl flex items-center gap-3 flex-col justify-center cursor-pointer hover:shadow-lg'
              >
                <category.icon size={40} className={category.color} />
                <p className='text-sm md:text-base font-semibold text-center'>{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUTOS EM DESTAQUE - SEGUNDA CAIXA COM ROW DE 4 */}
        <div 
          className='col-span-1 min-h-[200px] border border-[#ccc] rounded-xl bg-white/50 shadow-sm p-3'
        >
          <div className='flex items-center justify-between px-2 mb-3'>
            <h1 className='font-semibold text-lg'>Produtos em destaque</h1>
            <Link to={"/"} className='text-blue-400 underline hover:text-blue-600 transition'>Ver todas</Link>
          </div>

          {/* GRID COM 4  */}
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
            {featuredProducts.map((product, idx) => (
              <div 
                key={product.id}
                className='border border-[#ccc] bg-cinza-claro hover:bg-white transition-all duration-300 h-auto rounded-xl cursor-pointer hover:shadow-lg'
              >
                <div className='relative w-full p-2 bg-white/80 rounded-tl-md rounded-tr-md flex items-center justify-center'>
                  <div className='flex items-center justify-center absolute top-2 left-1 w-[40px] h-[25px] rounded-lg bg-black/90'>
                    <span className='text-white text-xs'>14%</span>
                  </div>
                  <div className='w-[60px] h-[70px]'>
                    <img src={product.image} 
                     className='w-full h-full bg-contain bg-no-repeat bg-center rounded-tl-md rounded-tr-md'
                     alt={product.name}
                    />
                  </div>
                  <div 
                    className='flex items-center justify-center absolute top-2 right-1 w-[40px] h-[25px] rounded-lg cursor-pointer'
                  >
                    <Heart className='size-5 font-bold hover:text-red-500 transition-colors'/>
                  </div>
                </div>
                <div className='w-full p-1 rounded-bl-md rounded-br-md'>
                  <h2 className='text-md font-semibold'>{product?.name}</h2>
                  <p className='text-xl font-bold mt-1 text-primary-blue'>{formatNumber(product?.price)} {product?.currency}</p>
                  <p className='text-gray-400'><del>{product.markPrice} {product?.currency}</del></p>
                  <div className='flex gap-1'>
                  {Array.from({length:product.stars}).map((_,index) => (
                    <Star key={index} className='size-4 text-yellow-400 fill-yellow-400'/>
                  ))}
                  </div>
                </div>  
              </div>
            ))}
          </div>
        </div>
      </div>
      

      {/* NEWSLATTER */}
      <div className='grid md:grid-cols-2 gap-4 my-4 px-3'>
        <div 
          className='col-span-1 bg-gradient-to-r from-black via-secondary-blue to-primary-blue p-3 min-h-[90px] rounded-xl flex flex-col lg:flex-row items-center gap-2'
        >
            <div className='flex flex-col lg:flex-row items-center gap-2 w-full'>
              <div className='w-[60px] h-[60px] flex items-center justify-center'>
               <MailOpen className='size-7 text-white'/>
              </div>
              <div className='flex flex-col text-white'>
                 <h1 className='text-lg font-semibold'>Receba ofertas exclusivas!</h1>
                 <p className='text-sm'>Cadastre-se e receba as melhores promoções e lançamentos</p>
              </div>
            </div>

            <div className='w-full md:w-auto'>
              <form className='flex'>
                <input type='text' placeholder='Seu melhor email' className='pl-3 rounded-tl-xl rounded-bl-xl outline-none border border-[#ccc] flex-1 md:w-auto'/>
                <button 
                  className='w-[130px] h-[50px] bg-primary-blue rounded-tr-xl rounded-br-xl shadow-xl border border-primary-blue flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95'
                >
                  Cadastrar
                </button>
              </form>
            </div>
        </div>

        <div className='col-span-1 grid lg:grid-cols-2 gap-2'>
          <div 
            className='flex p-3 col-span-1 bg-gradient-to-tr from-secondary-blue to-primary-blue rounded-xl cursor-pointer transition-all duration-300 hover:scale-105'
          >
            <div className='w-[50%] flex flex-col items-start justify-center gap-4 lg:flex-row lg:block'>
              <h1 className='text-lg font-semibold text-white leading-normal'>Lançamentos 2026</h1>
              <p className='text-sm text-white leading-normal'>Confira os artigos mais desejados do ano.</p>

              <div 
                className='cursor-pointer transition duration-300 hover:bg-white/20 w-[150px] p-2 border border-[#ccc] rounded-md mt-2 flex items-center justify-center'
              >
                <span className='text-white font-semibold text-sm'>Ver lançamentos</span>
              </div>
            </div>

            <div className='w-[50%]'>
              <img src="/sales03.png"
               className='w-full h-full object-contain' 
               alt="Sales"
              />
            </div>
          </div>

          <div 
            className='flex p-3 col-span-1 bg-gradient-to-tr from-secondary-blue via-black/80 to-black rounded-xl cursor-pointer transition-all duration-300 hover:scale-105'
          >
            <div className='w-[50%] flex flex-col items-start justify-center gap-4 lg:flex-row lg:block'>
              <h1 className='text-lg font-semibold text-white leading-normal'>Acessórios até 30% <b>OFF</b></h1>
              <p className='text-sm text-white leading-normal'>Carregadores, fones e muito mais</p>

              <div 
                className='cursor-pointer transition duration-300 hover:bg-white/20 w-[150px] p-2 border border-[#ccc] rounded-md mt-2 flex items-center justify-center'
              >
                <span className='text-white font-semibold text-sm'>Ver Ofertas</span>
              </div>
            </div>

            <div className='w-[50%]'>
              <img src="/sales03.png"
               className='w-full h-full object-contain' 
               alt="Sales"
              />
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <div className='text-gray-300 grid md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-4 w-full min-h-[400px] bg-black p-7'>
        <div className='col-span-1'>
            <div className='flex items-center gap-2'>
              <div className='w-[50px] h-[80px]'>
                <Smartphone className='w-full h-full text-primary-blue'/>
              </div>
              <div>
                <h1 className='text-xl font-semibold text-white'>CellShop</h1>
                <p className='text-md font-semibold'>Seu próximo smartphone está aqui</p>
              </div>
            </div>
            
            <p className='text-justify font-semibold mt-3'>A melhor loja online de smartphones está aqui e acessórios, Qualidade, garantia e o melhor preço para você.</p>
            <div className='flex gap-7 mt-4'>
              {Array.isArray(footerLinks) && footerLinks.map((item) => (
                <a 
                  key={item.id} 
                  href={item.link} 
                  target='_blank' 
                  rel="noopener noreferrer"
                  className='w-[45px] h-[45px] bg-gray-800 flex items-center justify-center rounded-full transition duration-300 hover:bg-primary-blue cursor-pointer'
                >
                  <item.icon className='size-5 text-white'/>
                </a>
              ))}
            </div>
        </div>

        <div className='col-span-1'>
          <h1 className='text-white text-xl font-semibold'>Informações da Loja</h1>
            <ul className='flex flex-col gap-3 mt-3'>
              {["Loja de Celulares", "contato@cellshopp.com", "+258 84 123 4567", "Av. Marginal, Maputo, Moçambique", "Sua loja de confiança em dispositivos móveis"].map((text, idx) => (
                <li 
                  key={idx}
                  className='cursor-pointer hover:text-white transition-colors'
                >
                  <Link className='hover:underline'>{text}</Link>
                </li>
              ))}
            </ul>
        </div>

        <div className='col-span-1'>
          <h1 className='text-white text-xl font-semibold'>Minha Conta</h1>
          <ul className='flex flex-col gap-3 mt-3'>
            <li className='hover:translate-x-2 transition-transform duration-300'><Link className='hover:underline hover:text-white'>Meus Pedidos</Link></li>
            <li className='hover:translate-x-2 transition-transform duration-300'><Link className='hover:underline hover:text-white'>Meus Dados</Link></li>
            <li className='hover:translate-x-2 transition-transform duration-300'><Link className='hover:underline hover:text-white'>Favoritos</Link></li>
            <li className='hover:translate-x-2 transition-transform duration-300'>
              <Link className='flex gap-3'>
                <LogOut onClick={()=> logout()} className="cursor-pointer"/>
                <span>sair</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className='col-span-1'>
          <h1 className='text-white text-xl font-semibold'>Métodos de Pagamentos</h1>

          <div className='flex flex-col md:flex-row gap-3 mt-3'>
            {[FaCcVisa, FaCcMastercard, FaCcStripe].map((Icon, idx) => (
              <div 
                key={idx}
                className='lg:w-[100px] lg:h-[40px] h-[70px] bg-gray-800/70 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105'
              >
                <Icon className='text-white size-8' />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className='w-full p-4 h-[60px] bg-black/90 flex items-center justify-center text-white text-lg border-t border-gray-800'>
         <p>&copy; Todos os direitos reservados awTech</p>
      </div>
    </div>
  )
}
