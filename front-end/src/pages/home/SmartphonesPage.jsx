import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Smartphone,
  Star,
  ShoppingCart,
  Eye,
  Heart,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  X,
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

export const SmartphonesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showFilter, setShowFilter] = useState(false)
  const [sortBy, setSortBy] = useState("destaque")

  // Dados dos smartphones
  const smartphones = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 125000,
      oldPrice: 145000,
      currency: "MZN",
      stars: 5,
      reviews: 234,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693066164573",
      discount: 14,
      specs: ["256GB", "Titânio", "48MP Camera"],
      inStock: true
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 115000,
      oldPrice: 135000,
      currency: "MZN",
      stars: 5,
      reviews: 189,
      image: "https://images.samsung.com/africa_pt/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-titanium-gray-back.jpg",
      discount: 15,
      specs: ["512GB", "S Pen", "200MP Camera"],
      inStock: true
    },
    {
      id: 3,
      name: "Xiaomi 13 Pro",
      brand: "Xiaomi",
      price: 65000,
      oldPrice: 78000,
      currency: "MZN",
      stars: 4,
      reviews: 156,
      image: "https://i02.appmifile.com/893_operator_sg/27/03/2024/db64d2b9d3f98f0e6c1b1b1b1b1b1b1b.png",
      discount: 17,
      specs: ["256GB", "Leica Camera", "120W Charging"],
      inStock: true
    },
    {
      id: 4,
      name: "Google Pixel 8 Pro",
      brand: "Google",
      price: 95000,
      oldPrice: 105000,
      currency: "MZN",
      stars: 4,
      reviews: 98,
      image: "https://lh3.googleusercontent.com/Bvpbjg0BuwF1p3BgZx8yV-9zVvVzVzVzVzVzVzVzVzVzVzVzVzVzVzVzVzVzV",
      discount: 10,
      specs: ["128GB", "AI Camera", "Tensor G3"],
      inStock: true
    },
    {
      id: 5,
      name: "Motorola Edge 40",
      brand: "Motorola",
      price: 45000,
      oldPrice: 55000,
      currency: "MZN",
      stars: 4,
      reviews: 89,
      image: "https://motorola.com.br/static/edge40/images/edge40-hero.png",
      discount: 18,
      specs: ["256GB", "144Hz Display", "68W Charging"],
      inStock: true
    }
  ]

  // Marcas para filtro
  const brands = ["todos", "Apple", "Samsung", "Xiaomi", "Motorola"]

  // Filtrar produtos
  const filteredProducts = smartphones.filter(product => {
    if (selectedCategory === "todos") return true
    return product.brand === selectedCategory
  })

  // Ordenar produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "preco-menor") return a.price - b.price
    if (sortBy === "preco-maior") return b.price - a.price
    if (sortBy === "destaque") return b.stars - a.stars
    if (sortBy === "desconto") return b.discount - a.discount
    return 0
  })

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
      <div className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm mb-6"
          >
            <Link 
              to="/" 
              className="flex items-center gap-1 hover:text-blue-200 transition-colors"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} />
            <span className="text-blue-200">Smartphones</span>
          </motion.div>

          {/* Título e Descrição */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
              >
                Smartphones
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-base md:text-lg opacity-90"
              >
                Descubra os melhores smartphones do mercado com os preços mais competitivos
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
          <Link to="/" className="hover:text-primary-blue transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-primary-blue font-medium">Smartphones</span>
        </div>

        {/* Filtros e Ordenação */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          {/* Filtro de marcas - Desktop */}
          <div className="hidden md:flex gap-2 flex-wrap">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedCategory(brand)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === brand
                    ? "bg-primary-blue text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {brand === "todos" ? "Todos" : brand}
              </button>
            ))}
          </div>

          {/* Filtro mobile button */}
          <button
            onClick={() => setShowFilter(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 w-full justify-center"
          >
            <Filter size={18} />
            <span>Filtrar por marca</span>
          </button>

          {/* Contador e Ordenação */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="text-gray-600 text-sm">
              <span className="font-semibold">{sortedProducts.length}</span> produtos encontrados
            </div>

            <div className="flex items-center gap-3">
              <SlidersHorizontal size={18} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option value="destaque">Mais relevantes</option>
                <option value="preco-menor">Menor preço</option>
                <option value="preco-maior">Maior preço</option>
                <option value="desconto">Maior desconto</option>
              </select>
            </div>
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
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-64 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}

                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
                  <Heart size={18} className="hover:text-red-500 transition-colors" />
                </button>

                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="text-xs text-primary-blue font-semibold mb-1">
                  {product.brand}
                </div>

                <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[56px]">
                  {product.name}
                </h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {product.specs.map((spec, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
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

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary-blue">
                    {formatNumber(product.price)} {product.currency}
                  </span>
                  {product.oldPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatNumber(product.oldPrice)} {product.currency}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      product.inStock
                        ? "bg-primary-blue text-white hover:bg-blue-600 active:scale-95"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    <span>Comprar</span>
                  </button>
                  
                  <button
                    onClick={() => viewDetails(product)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-primary-blue hover:text-primary-blue transition-all duration-300"
                  >
                    <Eye size={18} />
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
            <Smartphone size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Tente filtrar por outra categoria
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary-blue text-white rounded-xl hover:bg-blue-600 transition"
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
                <h3 className="font-semibold text-lg">Filtrar por marca</h3>
                <button 
                  onClick={() => setShowFilter(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedCategory(brand)
                      setShowFilter(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
                      selectedCategory === brand
                        ? "bg-primary-blue text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {brand === "todos" ? "Todos" : brand}
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
      </div>
    </motion.div>
  )
}