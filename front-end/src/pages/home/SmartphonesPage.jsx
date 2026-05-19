import React, { useEffect, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import {
  Smartphone,
  Star,
  ShoppingCart,
  Eye,
  Heart,
  ChevronRight,
  Home,
  Menu,
  Headphones,
  Tablet,
  Mail
} from 'lucide-react'

import { formatNumber } from '../../lib/formatNumbers'
import { useProductHome } from '../../store/productHome'

export const SmartphonesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const location = useLocation();


   const {
     products,
     getAllproductsHome,
     getCategorys,
     categorys,
     addCart,
   } = useProductHome();

   useEffect(()=>{
    getAllproductsHome();
   },[getAllproductsHome]);

   useEffect(()=>{
     getCategorys();
   },[getCategorys]);

  const smartphones = products?.map(product => product)

  // Categorias para filtro
  const categories = ["todos",...(categorys?.map(cat => cat?.name) || [])];

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/smartphones", label: "Smartphones", icon: Smartphone,location:"/smartphones" },
    { path: "/acessorios", label: "Acessórios", icon: Headphones },
    { path: "/tablets", label: "Tablets", icon: Tablet },
    { path: "/descontos", label: "Descontos", icon: Home },
    { path: "/contacto", label: "Contacto", icon: Mail }
  ]

  // Filtrar produtos por categoria
  const filteredProducts = smartphones?.filter(product => {
    if (selectedCategory === "todos") return true
    return product.category === selectedCategory
  }) || []

  const addToCart = async(product) => {
    let type = "Product";
     
     await addCart(product._id,type);
  }

  const viewDetails = (product) => {
    console.log("Ver detalhes:", product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Banner e Breadcrumb */}
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
                    className={`flex items-center gap-2 px-3 py-4 text-sm font-medium ${location === item?.location && "border-b-2 border-orange-400"}  hover:text-blue-200 transition-colors hover:border-b-2 border-transparent hover:border-blue-200`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
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
            <Menu size={24} />
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
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Breadcrumb e Título */}
        <div className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Título e Descrição */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  Smartphones
                </h1>
                <p className="text-base md:text-lg opacity-90">
                  Descubra os melhores smartphones do mercado com os preços mais competitivos
                </p>
              </div>
            </div>
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

        {/* Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Filtro de categorias - Grid 2 colunas no mobile, flex no desktop */}
          <div className="w-full md:w-auto">
            {/* Mobile: Grid 2 colunas */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-center ${
                    selectedCategory === category
                      ? "bg-primary-blue text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category === "todos" ? "Todos" : category}
                </button>
              ))}
            </div>
            
            {/* Desktop: Flex wrap */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary-blue text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category === "todos" ? "Todos" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Contador de produtos */}
          <div className="text-gray-600 text-sm">
            <span className="font-semibold">{filteredProducts.length}</span> produtos encontrados
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Imagem do Produto */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-64 flex items-center justify-center">
                <img
                  src={product?.image?.url}
                  alt={product?.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                
                

                {!product.stock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="text-xs text-primary-blue font-semibold mb-1">
                  {product?.category}
                </div>

                <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[56px]">
                  {product?.name}
                </h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {product?.informations?.map((info, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Gigas {info.gigas}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        RAM {info.ram}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        CAMERA {info.camera} MP
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={`${
                          idx < (product.stars || 4)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews || 0})</span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary-blue">
                    {formatNumber(product.price)} <b>MZN</b>
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      product.stock
                        ? "bg-primary-blue text-white hover:bg-secondary-blue active:scale-95"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    <span>Comprar</span>
                  </button>
                  
                  <Link to={`${product._id}&&category=${product?.category}`}
                    onClick={() => viewDetails(product)}
                    className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-primary-blue hover:text-primary-blue transition-all duration-300"
                  >
                    <Eye size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há produtos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
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
          </div>
        )}
      </div>
    </div>
  )
}