import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Headphones,
  Star,
  ShoppingCart,
  Eye,
  Heart,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  X,
  Wifi,
  Battery,
  Plug,
  Watch,
  Speaker,
  Mic,
  Keyboard,
  Mouse,
  Home
} from 'lucide-react'

import { formatNumber } from '../../lib/formatNumbers'

// Variants de animação
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

const cardHover = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeOut" }
}

export const AcessoriosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showFilter, setShowFilter] = useState(false)
  const [sortBy, setSortBy] = useState("destaque")

  // Categorias de acessórios
  const accessoryCategories = [
    { id: "todos", name: "Todos", icon: Headphones },
    { id: "fones", name: "Fones de Ouvido", icon: Headphones },
    { id: "carregadores", name: "Carregadores", icon: Plug },
    { id: "powerbanks", name: "Power Banks", icon: Battery },
    { id: "smartwatches", name: "Smartwatches", icon: Watch },
    { id: "caixas-som", name: "Caixas de Som", icon: Speaker },
    { id: "capas", name: "Capas e Películas", icon: Wifi },
    { id: "perifericos", name: "Periféricos", icon: Keyboard }
  ]

  // Dados dos acessórios
  const accessories = [
    {
      id: 1,
      name: "AirPods Pro 2",
      brand: "Apple",
      category: "fones",
      price: 18500,
      oldPrice: 22500,
      currency: "MZN",
      stars: 5,
      reviews: 1234,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero?wid=940&hei=940&fmt=png-alpha&.v=1661261865000",
      discount: 18,
      color: "Branco",
      wireless: true,
      inStock: true
    },
    {
      id: 2,
      name: "Samsung Galaxy Buds2 Pro",
      brand: "Samsung",
      category: "fones",
      price: 12500,
      oldPrice: 15900,
      currency: "MZN",
      stars: 4,
      reviews: 892,
      image: "https://images.samsung.com/africa_pt/smartphones/galaxy-buds2-pro/images/galaxy-buds2-pro-highlights-design.jpg",
      discount: 21,
      color: "Roxo",
      wireless: true,
      inStock: true
    },
    {
      id: 3,
      name: "Xiaomi 67W Turbo Charger",
      brand: "Xiaomi",
      category: "carregadores",
      price: 1850,
      oldPrice: 2500,
      currency: "MZN",
      stars: 4,
      reviews: 456,
      image: "https://i02.appmifile.com/893_operator_sg/15/03/2023/xiaomi-67w-turbo-charger.png",
      discount: 26,
      color: "Branco",
      wireless: false,
      inStock: true
    },
    {
      id: 4,
      name: "Power Bank 20000mAh",
      brand: "Xiaomi",
      category: "powerbanks",
      price: 3200,
      oldPrice: 4500,
      currency: "MZN",
      stars: 4,
      reviews: 234,
      image: "https://i02.appmifile.com/893_operator_sg/10/05/2022/xiaomi-power-bank-20000mah.png",
      discount: 29,
      color: "Prata",
      wireless: false,
      inStock: true
    },
    {
      id: 5,
      name: "Apple Watch Series 9",
      brand: "Apple",
      category: "smartwatches",
      price: 42500,
      oldPrice: 49900,
      currency: "MZN",
      stars: 5,
      reviews: 567,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-series-9-hero?wid=940&hei=940&fmt=png-alpha&.v=1693066164573",
      discount: 15,
      color: "Meia-noite",
      wireless: true,
      inStock: true
    },
    {
      id: 6,
      name: "JBL Charge 5",
      brand: "JBL",
      category: "caixas-som",
      price: 12500,
      oldPrice: 15900,
      currency: "MZN",
      stars: 4,
      reviews: 678,
      image: "https://www.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw5f5f5f5f/images/pdp/JBL_Charge5_Hero.png",
      discount: 21,
      color: "Preto",
      wireless: true,
      inStock: true
    },
    {
      id: 7,
      name: "Capa iPhone 15 Pro MagSafe",
      brand: "Apple",
      category: "capas",
      price: 1850,
      oldPrice: 2500,
      currency: "MZN",
      stars: 4,
      reviews: 345,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MRM73?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1693066164573",
      discount: 26,
      color: "Preto",
      wireless: false,
      inStock: true
    },
    {
      id: 8,
      name: "Mouse Gamer Logitech G502",
      brand: "Logitech",
      category: "perifericos",
      price: 4200,
      oldPrice: 5500,
      currency: "MZN",
      stars: 4,
      reviews: 890,
      image: "https://resource.logitechg.com/w_692,c_lpad,ar_1.0,w_692/w_692,c_lpad,ar_1.0,w_692/w_692,c_lpad,ar_1.0,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png",
      discount: 24,
      color: "Preto",
      wireless: false,
      inStock: true
    },
    {
      id: 9,
      name: "Teclado Mecânico Redragon",
      brand: "Redragon",
      category: "perifericos",
      price: 3800,
      oldPrice: 5200,
      currency: "MZN",
      stars: 4,
      reviews: 456,
      image: "https://redragonbrasil.com.br/cdn/shop/products/redragon-kumara-k552-mecanico.png",
      discount: 27,
      color: "RGB",
      wireless: false,
      inStock: true
    },
    {
      id: 10,
      name: "Carregador sem fio 15W",
      brand: "Samsung",
      category: "carregadores",
      price: 1850,
      oldPrice: 2500,
      currency: "MZN",
      stars: 4,
      reviews: 234,
      image: "https://images.samsung.com/africa_pt/smartphones/accessories/images/wireless-charger-duo.png",
      discount: 26,
      color: "Branco",
      wireless: true,
      inStock: true
    },
    {
      id: 11,
      name: "Fone de Ouvido Gamer HyperX",
      brand: "HyperX",
      category: "fones",
      price: 6200,
      oldPrice: 8500,
      currency: "MZN",
      stars: 4,
      reviews: 567,
      image: "https://hyperx.com/cdn/shop/products/cloud2_hero_800x.png",
      discount: 27,
      color: "Vermelho",
      wireless: false,
      inStock: true
    },
    {
      id: 12,
      name: "Película de Vidro iPhone 15",
      brand: "Generic",
      category: "capas",
      price: 450,
      oldPrice: 800,
      currency: "MZN",
      stars: 4,
      reviews: 1234,
      image: "https://m.media-amazon.com/images/I/71Yp3z87X4L._AC_UF894,1000_QL80_.jpg",
      discount: 44,
      color: "Transparente",
      wireless: false,
      inStock: true
    },
    {
      id: 13,
      name: "Smartwatch Amazfit GTS 4",
      brand: "Amazfit",
      category: "smartwatches",
      price: 8500,
      oldPrice: 10900,
      currency: "MZN",
      stars: 4,
      reviews: 345,
      image: "https://www.amazfit.com/file/amazfit/2022/07/22/amazfit-gts-4-hero.png",
      discount: 22,
      color: "Dourado",
      wireless: true,
      inStock: true
    },
    {
      id: 14,
      name: "Caixa de Som Sony XB43",
      brand: "Sony",
      category: "caixas-som",
      price: 18500,
      oldPrice: 24900,
      currency: "MZN",
      stars: 4,
      reviews: 234,
      image: "https://sony.scene7.com/is/image/sonyglobalsolutions/xb43-hero",
      discount: 26,
      color: "Azul",
      wireless: true,
      inStock: true
    },
    {
      id: 15,
      name: "Power Bank Anker 10000mAh",
      brand: "Anker",
      category: "powerbanks",
      price: 2200,
      oldPrice: 3500,
      currency: "MZN",
      stars: 4,
      reviews: 789,
      image: "https://cdn.shopify.com/s/files/1/0057/8935/5102/products/anker-powercore-10000.png",
      discount: 37,
      color: "Preto",
      wireless: false,
      inStock: true
    },
    {
      id: 16,
      name: "Webcam Logitech C920",
      brand: "Logitech",
      category: "perifericos",
      price: 5200,
      oldPrice: 7200,
      currency: "MZN",
      stars: 4,
      reviews: 456,
      image: "https://resource.logitech.com/w_692,c_lpad,ar_1.0,w_692/w_692,c_lpad,ar_1.0,w_692/w_692,c_lpad,ar_1.0,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/products/webcams/c920e/webcam-c920e-gallery-1.png",
      discount: 28,
      color: "Preto",
      wireless: false,
      inStock: true
    }
  ]

  // Filtrar produtos
  const filteredProducts = accessories.filter(product => {
    if (selectedCategory === "todos") return true
    return product.category === selectedCategory
  })

  // Ordenar produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "preco-menor") return a.price - b.price
    if (sortBy === "preco-maior") return b.price - a.price
    if (sortBy === "destaque") return b.stars - a.stars
    if (sortBy === "desconto") return b.discount - a.discount
    return 0
  })

  const getCategoryIcon = (categoryId) => {
    const category = accessoryCategories.find(cat => cat.id === categoryId)
    return category ? category.icon : Headphones
  }

  const addToCart = (product) => {
    console.log("Adicionado ao carrinho:", product)
  }

  const viewDetails = (product) => {
    console.log("Ver detalhes:", product)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen bg-gray-50"
    >
      {/* Header com Banner e Breadcrumb */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm mb-6"
          >
            <Link 
              to="/" 
              className="flex items-center gap-1 hover:text-green-200 transition-colors"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} />
            <span className="text-green-200">Acessórios</span>
          </motion.div>

          {/* Título e Descrição */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-3"
              >
                <Headphones size={48} />
                Acessórios
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-base md:text-lg opacity-90"
              >
                Complete sua experiência com os melhores acessórios do mercado
              </motion.p>
            </div>
            
            {/* Botão Voltar para Home */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                <Home size={18} />
                <span>Voltar para Home</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb Mobile Alternativo */}
        <div className="md:hidden flex items-center gap-2 text-sm text-gray-500 mb-4 pb-2 border-b border-gray-200">
          <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-green-600 font-medium">Acessórios</span>
        </div>

        {/* Categorias - Desktop */}
        <motion.div 
          variants={fadeInUp}
          className="hidden md:flex gap-3 mb-8 overflow-x-auto pb-2"
        >
          {accessoryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <category.icon size={18} />
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Filtros e Ordenação */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          {/* Filtro mobile button */}
          <button
            onClick={() => setShowFilter(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 w-full justify-center"
          >
            <Filter size={18} />
            <span>Filtrar por categoria</span>
          </button>

          {/* Resultados count */}
          <div className="text-gray-600">
            <span className="font-semibold">{sortedProducts.length}</span> produtos encontrados
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal size={18} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="destaque">Mais relevantes</option>
              <option value="preco-menor">Menor preço</option>
              <option value="preco-maior">Maior preço</option>
              <option value="desconto">Maior desconto</option>
            </select>
          </div>
        </motion.div>

        {/* Grid de Produtos */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              whileHover={cardHover}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Imagem do Produto */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-56 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge de Desconto */}
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}

                {/* Badge Wireless */}
                {product.wireless && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Sem fio
                  </div>
                )}

                {/* Botão Favorito */}
                <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
                  <Heart size={18} className="hover:text-red-500 transition-colors" />
                </button>

                {/* Badge de Estoque */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>

              {/* Informações do Produto */}
              <div className="p-4">
                {/* Categoria e Marca */}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-green-600 font-semibold">
                    {product.brand}
                  </div>
                  <div className="text-xs text-gray-400">
                    {accessoryCategories.find(cat => cat.id === product.category)?.name}
                  </div>
                </div>

                {/* Nome */}
                <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-2 min-h-[48px]">
                  {product.name}
                </h3>

                {/* Cor */}
                <div className="text-xs text-gray-500 mb-2">
                  Cor: {product.color}
                </div>

                {/* Avaliação com Estrelas */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={`${
                          idx < product.stars
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Preços */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-green-600">
                    {formatNumber(product.price)} {product.currency}
                  </span>
                  {product.oldPrice > product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatNumber(product.oldPrice)} {product.currency}
                    </span>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      product.inStock
                        ? "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    <span>Comprar</span>
                  </button>
                  
                  <button
                    onClick={() => viewDetails(product)}
                    className="px-3 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-green-600 hover:text-green-600 transition-all duration-300"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mensagem quando não há produtos */}
        {sortedProducts.length === 0 && (
          <motion.div 
            variants={fadeInUp}
            className="text-center py-12"
          >
            <Headphones size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum acessório encontrado
            </h3>
            <p className="text-gray-500">
              Tente selecionar outra categoria
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              <Home size={18} />
              <span>Voltar para Home</span>
            </Link>
          </motion.div>
        )}

        {/* Modal de Filtro Mobile */}
        {showFilter && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-xl"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Categorias</h3>
                <button 
                  onClick={() => setShowFilter(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                {accessoryCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setShowFilter(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                      selectedCategory === category.id
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <category.icon size={20} />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Botão Voltar no Mobile */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Home size={18} />
                  <span>Voltar para Home</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}

        {/* Banner de promoção */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Plug size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Promoção de Acessórios</h3>
                <p className="text-sm opacity-90">Compre 2 acessórios e ganhe 10% de desconto</p>
              </div>
            </div>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition">
              Aproveitar Oferta
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}