import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Tablet,
  Star,
  ShoppingCart,
  Eye,
  Heart,
  Filter,
  SlidersHorizontal,
  X,
  ChevronRight,
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

export const TabletPage = () => {
  const [selectedBrand, setSelectedBrand] = useState("todos")
  const [showFilter, setShowFilter] = useState(false)
  const [sortBy, setSortBy] = useState("destaque")

  // Marcas
  const brands = [
    { id: "todos", name: "Todos" },
    { id: "apple", name: "Apple" },
    { id: "samsung", name: "Samsung" },
    { id: "xiaomi", name: "Xiaomi" },
    { id: "lenovo", name: "Lenovo" },
    { id: "huawei", name: "Huawei" }
  ]

  // Dados dos tablets
  const tablets = [
    {
      id: 1,
      name: "iPad Pro 12.9\" M2",
      brand: "apple",
      brandName: "Apple",
      price: 185000,
      oldPrice: 210000,
      currency: "MZN",
      stars: 5,
      reviews: 1245,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-9-hero?wid=940&hei=940&fmt=png-alpha&.v=1693066164573",
      discount: 12,
      specs: ["12.9\"", "M2 Chip", "256GB"],
      inStock: true
    },
    {
      id: 2,
      name: "iPad Air 10.9\" M1",
      brand: "apple",
      brandName: "Apple",
      price: 95000,
      oldPrice: 115000,
      currency: "MZN",
      stars: 5,
      reviews: 892,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-hero?wid=940&hei=940&fmt=png-alpha&.v=1693066164573",
      discount: 17,
      specs: ["10.9\"", "M1 Chip", "64GB"],
      inStock: true
    },
    {
      id: 3,
      name: "iPad 10.2\" 9ª Geração",
      brand: "apple",
      brandName: "Apple",
      price: 55000,
      oldPrice: 65000,
      currency: "MZN",
      stars: 4,
      reviews: 2341,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-9th-gen-hero?wid=940&hei=940&fmt=png-alpha&.v=1693066164573",
      discount: 15,
      specs: ["10.2\"", "A13 Chip", "64GB"],
      inStock: true
    },
    {
      id: 4,
      name: "Samsung Galaxy Tab S9 Ultra",
      brand: "samsung",
      brandName: "Samsung",
      price: 145000,
      oldPrice: 165000,
      currency: "MZN",
      stars: 5,
      reviews: 567,
      image: "https://images.samsung.com/africa_pt/smartphones/galaxy-tab-s9/images/galaxy-tab-s9-ultra-highlights-design.jpg",
      discount: 12,
      specs: ["14.6\"", "Snapdragon 8", "256GB"],
      inStock: true
    },
    {
      id: 5,
      name: "Samsung Galaxy Tab S9+",
      brand: "samsung",
      brandName: "Samsung",
      price: 105000,
      oldPrice: 125000,
      currency: "MZN",
      stars: 4,
      reviews: 345,
      image: "https://images.samsung.com/africa_pt/smartphones/galaxy-tab-s9/images/galaxy-tab-s9-plus-highlights-design.jpg",
      discount: 16,
      specs: ["12.4\"", "Snapdragon 8", "256GB"],
      inStock: true
    },
    {
      id: 6,
      name: "Samsung Galaxy Tab A9+",
      brand: "samsung",
      brandName: "Samsung",
      price: 32000,
      oldPrice: 42000,
      currency: "MZN",
      stars: 4,
      reviews: 678,
      image: "https://images.samsung.com/africa_pt/smartphones/galaxy-tab-a9/images/galaxy-tab-a9-highlights-design.jpg",
      discount: 24,
      specs: ["11\"", "Snapdragon", "128GB"],
      inStock: true
    },
    {
      id: 7,
      name: "Xiaomi Pad 6",
      brand: "xiaomi",
      brandName: "Xiaomi",
      price: 42000,
      oldPrice: 52000,
      currency: "MZN",
      stars: 4,
      reviews: 456,
      image: "https://i02.appmifile.com/893_operator_sg/15/04/2023/xiaomi-pad-6.png",
      discount: 19,
      specs: ["11\"", "Snapdragon 870", "128GB"],
      inStock: true
    },
    {
      id: 8,
      name: "Xiaomi Pad 5",
      brand: "xiaomi",
      brandName: "Xiaomi",
      price: 28000,
      oldPrice: 38000,
      currency: "MZN",
      stars: 4,
      reviews: 789,
      image: "https://i02.appmifile.com/893_operator_sg/10/08/2021/xiaomi-pad-5.png",
      discount: 26,
      specs: ["11\"", "Snapdragon 860", "128GB"],
      inStock: true
    },
    {
      id: 9,
      name: "Lenovo Tab P11 Pro",
      brand: "lenovo",
      brandName: "Lenovo",
      price: 35000,
      oldPrice: 45000,
      currency: "MZN",
      stars: 4,
      reviews: 234,
      image: "https://www.lenovo.com/medias/lenovo-tab-p11-pro-hero.png",
      discount: 22,
      specs: ["11.5\"", "Snapdragon 730", "128GB"],
      inStock: true
    },
    {
      id: 10,
      name: "Lenovo Tab M10",
      brand: "lenovo",
      brandName: "Lenovo",
      price: 18000,
      oldPrice: 25000,
      currency: "MZN",
      stars: 4,
      reviews: 567,
      image: "https://www.lenovo.com/medias/lenovo-tab-m10-hero.png",
      discount: 28,
      specs: ["10.1\"", "Helio P22", "64GB"],
      inStock: true
    },
    {
      id: 11,
      name: "Huawei MatePad Pro",
      brand: "huawei",
      brandName: "Huawei",
      price: 65000,
      oldPrice: 78000,
      currency: "MZN",
      stars: 4,
      reviews: 345,
      image: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/tablets/matepad-pro/img/hero/hero-k.png",
      discount: 17,
      specs: ["12.6\"", "Kirin 9000", "256GB"],
      inStock: true
    },
    {
      id: 12,
      name: "iPad Mini 6",
      brand: "apple",
      brandName: "Apple",
      price: 65000,
      oldPrice: 75000,
      currency: "MZN",
      stars: 5,
      reviews: 1234,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-hero?wid=940&hei=940&fmt=png-alpha&.v=1693066164573",
      discount: 13,
      specs: ["8.3\"", "A15 Chip", "64GB"],
      inStock: true
    }
  ]

  // Filtrar produtos por marca
  const filteredProducts = tablets.filter(product => {
    if (selectedBrand === "todos") return true
    return product.brand === selectedBrand
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm mb-6"
          >
            <Link 
              to="/" 
              className="flex items-center gap-1 hover:text-purple-200 transition-colors"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} />
            <span className="text-purple-200">Tablets</span>
          </motion.div>

          {/* Título e Descrição */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-3"
              >
                <Tablet size={48} />
                Tablets
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-base md:text-lg opacity-90"
              >
                Potência e portabilidade na palma da sua mão. Encontre o tablet ideal para você
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
          <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-purple-600 font-medium">Tablets</span>
        </div>

        {/* Filtros e Ordenação */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Filtro de marcas - Desktop */}
          <div className="hidden md:flex gap-2 flex-wrap">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedBrand === brand.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {brand.name}
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

          {/* Resultados count */}
          <div className="text-gray-600 text-sm">
            <span className="font-semibold">{sortedProducts.length}</span> tablets encontrados
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <SlidersHorizontal size={18} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="destaque">Mais relevantes</option>
              <option value="preco-menor">Menor preço</option>
              <option value="preco-maior">Maior preço</option>
              <option value="desconto">Maior desconto</option>
            </select>
          </div>
        </div>

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
                
                {/* Badge de Desconto */}
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}

                {/* Botão Favorito */}
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
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
                {/* Marca */}
                <div className="text-xs text-purple-600 font-semibold mb-1">
                  {product.brandName}
                </div>

                {/* Nome */}
                <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[56px]">
                  {product.name}
                </h3>

                {/* Especificações */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.specs.map((spec, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Avaliação com Estrelas */}
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

                {/* Preços */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-purple-600">
                    {formatNumber(product.price)} {product.currency}
                  </span>
                  {product.oldPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatNumber(product.oldPrice)} {product.currency}
                    </span>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      product.inStock
                        ? "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    <span>Comprar</span>
                  </button>
                  
                  <button
                    onClick={() => viewDetails(product)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
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
            <Tablet size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum tablet encontrado
            </h3>
            <p className="text-gray-500">
              Tente filtrar por outra marca
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
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
                    key={brand.id}
                    onClick={() => {
                      setSelectedBrand(brand.id)
                      setShowFilter(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
                      selectedBrand === brand.id
                        ? "bg-purple-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {brand.name}
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