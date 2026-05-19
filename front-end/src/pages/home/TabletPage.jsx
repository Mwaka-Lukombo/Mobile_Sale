import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Tablet,
  Star,
  ShoppingCart,
  Eye,
  Heart,
  Filter,
  X,
  ChevronRight,
  Home,
  Menu,
  Smartphone,
  Headphones,
  Mail
} from 'lucide-react'

import { formatNumber } from '../../lib/formatNumbers'
import { useTabletStore } from '../../store/tabletsStore'
import { useProductHome } from '../../store/productHome'

export const TabletPage = () => {
  const [selectedBrand, setSelectedBrand] = useState("todos")
  const [showFilter, setShowFilter] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

   const {
    acessorios,
    getAcessories,
    getProductSingle,
   } = useTabletStore();

   const {
    addCart
   } = useProductHome();

   useEffect(()=>{
    getAcessories();
   },[getAcessories])

  
  const brands = [
    { id: "todos", name: "Todos" },
    { id: "iPad", name: "Apple" },
    { id: "Android", name: "Android" },
    { id: "Windows", name: "Windows" }
  ]

  
  const tablets = acessorios?.map(curr => curr);

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/smartphones", label: "Smartphones", icon: Smartphone },
    { path: "/acessorios", label: "Acessórios", icon: Headphones },
    { path: "/tablets", label: "Tablets", icon: Tablet },
    { path: "/contacto", label: "Contacto", icon: Mail }
  ]

  const filteredProducts = tablets.filter(product => {
    if (selectedBrand === "todos") return true
    return product?.category === selectedBrand
  })

  const addToCart = async(product) => {
    let type = 'Tablet';
    await addCart(product._id,type);
  }

  const viewDetails = (product) => {
    console.log("Ver detalhes:", product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Banner e Menu */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        {/* Menu de Navegação Desktop */}
        <div className="border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="hidden md:flex items-center justify-between">
              <div className="flex items-center space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-2 px-3 py-4 text-sm font-medium hover:text-purple-200 transition-colors border-b-2 border-transparent hover:border-purple-200"
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-3">
                  <Tablet size={48} />
                  Tablets
                </h1>
                <p className="text-base md:text-lg opacity-90">
                  Potência e portabilidade na palma da sua mão. Encontre o tablet ideal para você
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb Mobile Alternativo */}
        <div className="md:hidden flex items-center gap-2 text-sm text-gray-500 mb-4 pb-2 border-b border-gray-200">
          <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/tablets" className="hover:text-purple-600 transition-colors">Tablets</Link>
          <ChevronRight size={14} />
          <span className="text-purple-600 font-medium">Todos</span>
        </div>

        {/* Filtros Simplificados */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          
          <div className="hidden md:flex gap-3">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
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
            <span className="font-semibold">{filteredProducts.length}</span> tablets encontrados
          </div>
        </div>

        {/* Grid de Produtos - 2 produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group
              border
              "
            >
              
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-64 flex items-center justify-center">
                <img
                  src={product?.image?.url}
                  alt={product?.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />

              </div>

              <div className="p-6">
                {/* Marca */}
                <div className="text-xs text-purple-600 font-semibold mb-1">
                  {product?.category}
                </div>

                {/* Nome */}
                <h3 className="font-semibold text-gray-800 text-xl mb-3">
                  {product?.name}
                </h3>


                <div className="flex flex-wrap gap-2 mb-4">
                  <span className='text-sm text-orange-400'>({product?.stock})</span>
                </div>

                {/* Avaliação com Estrelas */}
                <div className="flex items-center gap-2 mb-4">
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
                  <span className="text-xs text-gray-500">({product.reviews} avaliações)</span>
                </div>

                {/* Preços */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-2xl font-bold text-purple-600">
                    {formatNumber(product.price)} <b>MZN</b>
                  </span>
                  
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.stock}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                      product.stock
                        ? "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    <span>Comprar</span>
                  </button>
                  
                  <Link
                    to={`${product._id}&&category=${product?.category}`}
                    className="px-5 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-purple-600 hover:text-purple-600 transition-all duration-300
                    flex items-center justify-center
                    "
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
          </div>
        )}

        {/* Modal de Filtro Mobile */}
        {showFilter && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
            <div className="absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-xl">
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

              {/* Navegação Mobile no Modal */}
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Navegação</h4>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowFilter(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <item.icon size={18} className="text-gray-600" />
                      <span className="text-gray-700">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}