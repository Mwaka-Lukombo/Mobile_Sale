import { useState } from 'react';
import { Banner } from './subPages/Banner';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ChevronRight,
  SmartphoneNfc,
  Headphones,
  Wifi,
  Van,
  CreditCard,
  ShieldCheck,
  RefreshCcw,
  Headset,
  Heart,
  Star,
  MailOpen,
  LogOut
} from 'lucide-react';

import { formatNumber } from '../../lib/formatNumbers';
import {
  FaCcMastercard,
  FaCcStripe,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { Container } from '../../components/common/Container';

export const HomeClient = () => {
  const [page, setPage] = useState("home");
  const { logout } = useAuthStore();

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
    { stock: 53, stars: 4, id: 1, image: "https://m.media-amazon.com/images/I/71Yp3z87X4L._AC_UF894,1000_QL80_.jpg", name: "iPhone 15 Pro", price: 85000, markPrice: 6000, color: "text-primary-blue", currency: "MZN" },
    { stock: 34, stars: 5, id: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVkFle0SZjuNH2wORYyOyJdSrlESccIG0jQ&s", name: "Samsung S24", price: 75000, markPrice: 5000, color: "text-primary-blue", currency: "MZN" },
    { stock: 12, stars: 3, id: 3, image: "https://www.apple.com/v/airpods-pro/r/images/overview/welcome/hero_startframe__bfinf01b59si_large.jpg", name: "AirPods Pro", price: 12500, markPrice: 7300, color: "text-primary-blue", currency: "MZN" },
    { stock: 7, stars: 5, id: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgJXRBxddDPtOEh6R85gULvMfmwNqcAS8UA&s", name: "iPad Air", price: 45000, markPrice: 30000, color: "text-primary-blue", currency: "MZN" },
  ];

  const navLinks = [
    { id: 1, name: "Inicio", page: "home", href: "/" },
    { id: 2, name: "Smartphones", page: "smart", href: "/smartphones" },
    { id: 3, name: "Acessorios", page: "acessorios", href: "/acessorios" },
    { id: 4, name: "Tablets", page: "tablets", href: "/tablets" },
    { id: 5, name: "Contacto", page: "contacto", href: "/contacto" },
  ];

  const footerLinks = [
    { id: 1, icon: FaFacebook, link: "https://facebook.com" },
    { id: 2, icon: FaInstagram, link: "https://facebook.com" },
    { id: 3, icon: FaWhatsapp, link: "https://facebook.com" }
  ];

  return (
    <div className='mt-8 md:mt-12'>
      
      <Container>
        {/* MENU DE NAVEGAÇÃO SUPERIOR */}
      <div className='flex gap-3 mb-8 justify-center md:justify-start overflow-x-auto px-5'>
        <ul className='flex gap-7'>
          {navLinks.map((link) => (
            <li key={link.id} className="flex items-center flex-col gap-1">
              <Link
                onClick={() => setPage(link.page)}
                to={link?.href}
                className={`transition-all text-sm duration-300 whitespace-nowrap ${
                  page === link.page
                    ? "text-primary-blue font-semibold"
                    : "text-gray-500"
                }`}
              >
                {link.name}
              </Link>
              {page === link.page && (
                <div className='h-[5px] w-[50px] rounded-xl bg-primary-blue'></div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* BANNER - FULL WIDTH WITH 650px HEIGHT */}
      <div className='px-3 mb-8'>
        <div className=' lg:h-[450px]'>
          <Banner />
        </div>
      </div>

      {/* BENEFÍCIOS - ROW DE 4 */}
      <div className='px-3 mb-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {benefits.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-3 p-4 border border-[#ccc] rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer'
            >
              <div className='flex items-center justify-center w-[50px] h-[50px] flex-shrink-0'>
                {<item.icon size={32} className="text-primary-blue" />}
              </div>
              <div className='flex flex-col'>
                <h1 className='font-semibold text-sm'>{item.title}</h1>
                <p className='text-xs text-gray-600'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIAS E PRODUTOS EM DESTAQUE */}
      <div className='grid md:grid-cols-2 gap-6 px-3 mb-8'>
        {/* CATEGORIAS EM DESTAQUE */}
        <div className='col-span-1 border border-[#ccc] rounded-xl bg-white p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='font-semibold text-sm'>Categorias em destaque</h1>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {featuredCategories.map((category) => (
              <div
                key={category.id}
                className='p-4 border  hover:bg-white transition-colors rounded-xl flex items-center gap-3 flex-col justify-center cursor-pointer hover:shadow-md'
              >
                <category.icon size={32} className={category.color} />
                <p className='text-xs font-semibold text-center'>{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUTOS EM DESTAQUE */}
        <div className='col-span-1 border border-[#ccc] rounded-xl bg-white p-6'>
  <div className='mb-6'>
    <h1 className='font-semibold text-sm'>Produtos em destaque</h1>
  </div>

  <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
    {featuredProducts.map((product) => (
      <div
        key={product.id}
        className='border border-[#ccc] bg-white hover:shadow-md transition-shadow rounded-xl cursor-pointer 
        flex flex-col
        '
      >
        <div className='relative w-full p-3  rounded-tl-md rounded-tr-md flex items-center justify-center'>
          <div className='w-[40px] h-[70px]'>
            <img src={product?.image}
              className='w-full h-full object-contain rounded-tl-md rounded-tr-md'
              alt={product.name}
            />
          </div>
        </div>
        <div className='w-full p-3 rounded-bl-md rounded-br-md'>
          <h2 className='text-xs font-semibold text-center'>{product?.name}</h2>
        </div>
      </div>
    ))}
  </div>
        </div>
      </div>

      {/* NEWSLETTER E PROMOÇÕES */}
      <div className='grid gap-6 px-3 mb-8'>
        <div className='col-span-1 min-h-[200px] bg-gradient-to-r from-black via-secondary-blue to-primary-blue p-6 rounded-xl flex flex-col lg:flex-row items-center gap-4'>
          
          <div className='flex flex-col lg:flex-row items-center gap-4 lg:w-[60%]'>
            <div className='w-[60px] h-[60px] flex items-center justify-center flex-shrink-0'>
              <MailOpen className='size-8 text-white' />
            </div>
            <div className='flex flex-col text-white text-center lg:text-left'>
              <h1 className='text-2xl font-semibold leading-10'>Receba ofertas exclusivas!</h1>
              <p className='text-md opacity-90'>Cadastre-se e receba as melhores promoções e lançamentos</p>
            </div>
          </div>

          <div className='w-full lg:w-[40%]'>
            <form className='flex'>
              <input type='text' placeholder='Seu melhor email' className='pl-4 py-3 rounded-l-xl outline-none border border-[#ccc] flex-1 lg:w-auto h-[40px] text-xs' />
              <button className='h-[40px] text-xs px-6 py-3 bg-primary-blue rounded-r-xl shadow-xl border border-primary-blue text-white font-semibold hover:bg-blue-700 transition-colors'>
                Cadastrar
              </button>
            </form>
          </div>
        </div>

        <div className='col-span-1 grid lg:grid-cols-2 gap-4'>
          <div className='flex p-4 col-span-1 bg-gradient-to-tr from-secondary-blue to-primary-blue rounded-xl cursor-pointer hover:shadow-lg transition-shadow'>
            <div className='w-1/2 flex flex-col items-start justify-center gap-3'>
              <h1 className='text-base font-semibold text-white'>Lançamentos 2026</h1>
              <p className='text-xs text-white'>Confira os artigos mais desejados do ano.</p>
              <div className='p-2 border border-[#ccc] rounded-md hover:bg-white/20 transition-colors'>
                <span className='text-white font-semibold text-xs'>Ver lançamentos</span>
              </div>
            </div>
            <div className='w-1/2'>
              <img src="/sales03.png" className='w-full h-full object-contain' alt="Sales" />
            </div>
          </div>

          <div className='flex p-4 col-span-1 bg-gradient-to-tr from-secondary-blue via-black/80 to-black rounded-xl cursor-pointer hover:shadow-lg transition-shadow'>
            <div className='w-1/2 flex flex-col items-start justify-center gap-3'>
              <h1 className='text-base font-semibold text-white'>Acessórios até 30% <b>OFF</b></h1>
              <p className='text-xs text-white'>Carregadores, fones e muito mais</p>
              <div className='p-2 border border-[#ccc] rounded-md hover:bg-white/20 transition-colors'>
                <span className='text-white font-semibold text-xs'>Ver Ofertas</span>
              </div>
            </div>
            <div className='w-1/2'>
              <img src="/sales03.png" className='w-full h-full object-contain' alt="Sales" />
            </div>
          </div>
        </div>
      </div>
      </Container>

      {/* FOOTER */}
      <div className='text-gray-300 min-h-[450px] grid md:grid-cols-2 lg:grid-cols-4 gap-12 w-full bg-black p-9 items-center mb-0 '>
        <div className='col-span-1'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-[50px] h-[50px]'>
              <Smartphone  className='w-full h-full text-primary-blue' />
            </div>
            <div>
              <h1 className='text-sm font-semibold text-white leading-10'>CellShop</h1>
              <p className='text-xs font-semibold'>Seu próximo smartphone está aqui</p>
            </div>
          </div>

          <p className='text-justify text-xs font-semibold mb-4 leading-6 '>A melhor loja online de smartphones está aqui e acessórios, Qualidade, garantia e o melhor preço para você.</p>
          <div className='flex gap-4'>
            {footerLinks.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target='_blank'
                rel="noopener noreferrer"
                className='w-[45px] h-[45px] bg-gray-800 flex items-center justify-center rounded-full hover:bg-primary-blue transition-colors cursor-pointer'
              >
                <item.icon className='size-5 text-white' />
              </a>
            ))}
          </div>
        </div>

        <div className='col-span-1'>
          <h1 className='text-white text-sm font-semibold mb-4'>Informações da Loja</h1>
          <ul className='flex flex-col gap-3'>
            {["Loja de Celulares", "contato@cellshopp.com", "+258 84 123 4567", "Av. Marginal, Maputo, Moçambique", "Sua loja de confiança em dispositivos móveis"].map((text, idx) => (
              <li key={idx} className='cursor-pointer hover:text-white transition-colors text-xs'>
                <Link className='hover:underline'>{text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='col-span-1'>
          <h1 className='text-white text-sm font-semibold mb-4'>Minha Conta</h1>
          <ul className='flex flex-col gap-3'>
            <li className='text-xs'><Link className='hover:underline hover:text-white'>Meus Pedidos</Link></li>
            <li className='text-xs'><Link className='hover:underline hover:text-white'>Meus Dados</Link></li>
            <li className='text-xs'><Link className='hover:underline hover:text-white'>Favoritos</Link></li>
            <li className='text-xs'>
              <Link className='flex gap-3 hover:text-white'>
                <LogOut size={17} onClick={() => logout()} className="cursor-pointer" />
                <span className='text-xs'>Sair</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className='col-span-1'>
          <h1 className='text-white text-lg font-semibold mb-4'>Métodos de Pagamentos</h1>
          <div className='flex flex-wrap gap-3'>
            {[FaCcVisa, FaCcMastercard, FaCcStripe].map((Icon, idx) => (
              <div
                key={idx}
                className='w-[80px] h-[40px] bg-gray-800/70 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors'
              >
                <Icon className='text-white size-7' />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full p-3 h-[50px] bg-black/90 flex items-center justify-center text-white border-t border-gray-800'>
        <p className='text-xs'>&copy; Todos os direitos reservados awTech</p>
      </div>
    </div>
  )
}