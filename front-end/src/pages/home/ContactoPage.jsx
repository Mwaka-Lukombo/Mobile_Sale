import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  User,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Store  // Adicione este
} from 'lucide-react';

import {
    FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
} from 'react-icons/fa'

// Variants de animação
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

export const ContactoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio do formulário
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }, 1500)
  }

  // Informações da loja
  const storeInfo = {
    name: "CellShop",
    address: "Av. Marginal, 1234 - Maputo, Moçambique",
    phone: "+258 84 123 4567",
    phoneSecondary: "+258 82 987 6543",
    email: "contato@cellshop.co.mz",
    emailSupport: "suporte@cellshop.co.mz",
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Contacto
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl opacity-90"
          >
            Estamos aqui para ajudar! Entre em contacto connosco
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Grid Principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Informações da Loja - Esquerda */}
          <motion.div 
            variants={fadeInLeft}
            className="lg:col-span-1 space-y-6"
          >
            {/* Card da Loja */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                  <MapPin className="text-primary-blue" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Informações da Loja</h2>
              </div>

              <div className="space-y-4">
                {/* Nome da Loja */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Store size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nome da Loja</p>
                    <p className="font-semibold text-gray-800">{storeInfo.name}</p>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Endereço</p>
                    <p className="font-semibold text-gray-800">{storeInfo.address}</p>
                  </div>
                </div>

                {/* Telefones */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-semibold text-gray-800">{storeInfo.phone}</p>
                    <p className="text-sm text-gray-600">{storeInfo.phoneSecondary}</p>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">{storeInfo.email}</p>
                    <p className="text-sm text-gray-600">{storeInfo.emailSupport}</p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock size={16} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Horário de Funcionamento</p>
                    <p className="text-sm text-gray-800">{storeInfo.schedule.week}</p>
                    <p className="text-sm text-gray-800">{storeInfo.schedule.saturday}</p>
                    <p className="text-sm text-red-500">{storeInfo.schedule.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Redes Sociais</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mapa Estático */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Localização</h3>
              <div className="w-full h-[200px] bg-gray-200 rounded-xl overflow-hidden">
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
          </motion.div>

          {/* Formulário de Contacto - Direita */}
          <motion.div 
            variants={fadeInRight}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Envie-nos uma mensagem</h2>
                <p className="text-gray-600">
                  Preencha o formulário abaixo e entraremos em contacto consigo o mais breve possível
                </p>
              </div>

              {/* Status de Submissão */}
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="text-green-500" size={20} />
                  <div>
                    <p className="font-semibold text-green-700">Mensagem enviada com sucesso!</p>
                    <p className="text-sm text-green-600">Entraremos em contacto em breve.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="text-red-500" size={20} />
                  <div>
                    <p className="font-semibold text-red-700">Erro ao enviar mensagem</p>
                    <p className="text-sm text-red-600">Tente novamente mais tarde.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome completo"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Assunto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Assunto da mensagem"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Digite sua mensagem aqui..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition resize-none"
                  ></textarea>
                </div>

                {/* Botão Enviar */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-blue hover:bg-blue-600 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Informação adicional */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Responderemos à sua mensagem dentro de 24 horas úteis
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ - Perguntas Frequentes */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Perguntas Frequentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Qual o prazo de entrega?</h3>
              <p className="text-gray-600">
                O prazo de entrega varia de acordo com a localização. Em Maputo, a entrega é feita em 1-2 dias úteis. 
                Para outras províncias, o prazo é de 3-7 dias úteis.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Quais as formas de pagamento?</h3>
              <p className="text-gray-600">
                Aceitamos pagamentos via cartão de crédito (Visa, Mastercard), transferência bancária, 
                M-Pesa e pagamento na entrega (apenas Maputo).
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Como posso trocar um produto?</h3>
              <p className="text-gray-600">
                Você tem até 7 dias após o recebimento para solicitar troca ou devolução. 
                Basta entrar em contacto connosco e informar o motivo.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">O produto tem garantia?</h3>
              <p className="text-gray-600">
                Sim, todos os produtos vendidos possuem garantia oficial do fabricante, 
                que varia de 1 a 2 anos dependendo do produto.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Atendimento 24h */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 bg-gradient-to-r from-primary-blue to-secondary-blue rounded-2xl p-8 text-white text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Phone size={32} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">Atendimento Personalizado</h3>
                <p className="text-sm opacity-90">Fale connosco via WhatsApp para atendimento imediato</p>
              </div>
            </div>
            
            <motion.a
              href="https://wa.me/258841234567"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-white text-primary-blue px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100 transition"
            >
              <FaWhatsapp size={20} />
              <span>WhatsApp: +258 84 123 4567</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}