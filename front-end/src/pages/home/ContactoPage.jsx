import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Store,
  Home,
  Menu,
  Smartphone,
  Headphones,
  Tablet,
  ChevronRight
} from 'lucide-react'

import {
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
} from 'react-icons/fa'
import { useLojaStore } from '../../store/lojaStore'
import { Container } from '../../components/common/Container'

export const ContactoPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

     const location = useLocation();


    const url = location?.pathname;
  
  const {
    getLoja,
    lojaInfo
  } = useLojaStore();

  useEffect(()=>{
    getLoja();
  },[getLoja])

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/smartphones", label: "Smartphones", icon: Smartphone },
    { path: "/acessorios", label: "Acessórios", icon: Headphones },
    { path: "/tablets", label: "Tablets", icon: Tablet },
    { path: "/contacto", label: "Contacto", icon: Home,location:"/contacto" }
  ]

  const storeInfo = {
    name: lojaInfo?.storeName,
    address: lojaInfo?.address,
    phone: lojaInfo?.phone,
    email: lojaInfo?.email,
    schedule: {
      week: "Segunda a Sexta: 8h às 18h",
      saturday: "Sábado: 9h às 15h",
      sunday: "Domingo: Fechado"
    }
  }

  const socialLinks = [
    { icon: FaFacebook, name: "Facebook", link: "https://facebook.com/cellshop", color: "bg-blue-600" },
    { icon: FaInstagram, name: "Instagram", link: "https://instagram.com/cellshop", color: "bg-pink-600" },
    { icon: FaWhatsapp, name: "WhatsApp", link: "https://wa.me/258841234567", color: "bg-green-500" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Menu */}
      <div className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
        {/* Menu de Navegação Desktop */}
        <div className="border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="hidden md:flex items-center justify-between">
              <div className="flex items-center space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-4 text-sm font-medium ${url === item?.location && "border-b-2 border-transparent border-white"} hover:text-blue-200 transition-colors border-b-2 border-transparent hover:border-blue-200`}
                  >
                    <item.icon size={18} />
                    <span className='text-xs'>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Menu Mobile Button */}
        <div className="md:hidden px-4 py-3 flex justify-between items-center border-b border-white/20">
          <Link to="/" className="text-xl font-bold">
            TechStore
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-white/10 transition-colors border-b border-white/10"
              >
                <item.icon size={18} />
                <span className='text-xs'>{item.label}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Breadcrumb e Título */}
        <div className="py-8 px-4">
          <div className="max-w-7xl mx-auto p-1">

            <h1 className="text-3xl font-bold mb-2 leading-normal">
              Contacto
            </h1>
            <p className="text-xs font-semibold opacity-90">
              Estamos aqui para ajudar! Entre em contacto connosco
            </p>
          </div>
        </div>
      </div>

      <Container>
        <div className="px-4 py-8">
          
          {/* Informações da Loja */}
          <div className="w-full mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                  <MapPin className="text-primary-blue" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Informações da Loja</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Nome da Loja */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Store size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nome da Loja</p>
                    <p className="font-semibold text-gray-800 text-sm">{storeInfo.name}</p>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Endereço</p>
                    <p className="font-semibold text-gray-800 text-sm">{storeInfo.address}</p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-semibold text-gray-800 text-sm">{storeInfo.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800 text-sm">{storeInfo.email}</p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Horário de Funcionamento</p>
                    <p className="text-xs text-gray-800">{storeInfo.schedule.week}</p>
                    <p className="text-xs text-gray-800">{storeInfo.schedule.saturday}</p>
                    <p className="text-xs text-red-500">{storeInfo.schedule.sunday}</p>
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone size={16} className="text-primary-blue" />
                  </div>
                  <div className="w-full">
                    <p className="text-sm text-gray-500 mb-3">Redes Sociais</p>
                    <div className="flex gap-3">
                      {socialLinks.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300`}
                        >
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa Estático */}
          <div className="w-full mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Localização</h3>
              <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                  title="Mapa da loja"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d32.573419!3d-25.969248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee500e4d0cd9ed5%3A0x6b8c2c2e9f2aaee!2sAv.%20Marginal%2C%20Maputo%2C%20Mo%C3%A7ambique!5e0!3m2!1spt!2s!4v1700000000000!5m2!1spt!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Perguntas Frequentes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Qual o prazo de entrega?</h3>
                <p className="text-gray-600 text-sm">
                  O prazo de entrega varia de acordo com a localização. Em Maputo, a entrega é feita em 1-2 dias úteis.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Quais as formas de pagamento?</h3>
                <p className="text-gray-600 text-sm">
                  Aceitamos cartão de crédito, transferência bancária, M-Pesa e pagamento na entrega.
                </p>
              </div>
            </div>
          </div>

          {/* Atendimento */}
          <div className="bg-gradient-to-r from-primary-blue to-secondary-blue rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Atendimento Personalizado</h3>
                  <p className="text-xs opacity-90">Fale connosco via WhatsApp para atendimento imediato</p>
                </div>
              </div>
              
              <a
                href="https://wa.me/258841234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-blue px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100 transition whitespace-nowrap text-sm"
              >
                <FaWhatsapp size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}