import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
import { Container } from '../../components/common/Container'

export const TabletPage = () => {
  const [selectedBrand, setSelectedBrand] = useState("todos")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

     const location = useLocation();


    const url = location?.pathname;

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
    { path: "/tablets", label: "Tablets", icon: Tablet,location:"/tablets" },
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
                    className={`flex items-center gap-2 px-3 py-4 text-sm font-medium ${url === item?.location && "border-b-2 border-transparent border-white"} hover:text-purple-200 transition-colors border-b-2 border-transparent hover:border-purple-200`}
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
            {/* Título e Descrição */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 leading-normal flex items-center gap-3">
                  <Tablet size={40} />
                  Tablets
                </h1>
                <p className="text-xs font-semibold opacity-90">
                  Potência e portabilidade na palma da sua mão. Encontre o tablet ideal para você
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className="px-4 py-8">
          
          {/* Breadcrumb Mobile  */}
          <div className="md:hidden flex items-center gap-2 text-sm text-gray-500 mb-4 pb-2 border-b border-gray-200">
            <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-purple-600 font-medium">Tablets</span>
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Filtro de marcas - Grid 2 colunas no mobile, flex no desktop */}
            <div className="w-full md:w-auto">
              {/* Mobile: Grid 2 colunas */}
              <div className="grid grid-cols-2 gap-2 md:hidden">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-center ${
                      selectedBrand === brand.id
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
              
              {/* Desktop: Flex wrap */}
              <div className="hidden md:flex gap-2 flex-wrap">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedBrand === brand.id
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contador de produtos */}
            <div className="text-gray-600 text-xs">
              <span className="font-semibold">{filteredProducts.length}</span> tablets encontrados
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product?._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border"
              >
                
                {/* Imagem do Produto */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 h-64 flex items-center justify-center">
                  <img
                    src={product?.image?.url}
                    alt={product?.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">
                  {/* Marca */}
                  <div className="text-xs text-purple-600 font-semibold mb-1">
                    {product?.category}
                  </div>

                  {/* Nome */}
                  <h3 className="font-semibold text-gray-800 text-md mb-2 line-clamp-2 min-h-[30px]">
                    {product?.name}
                  </h3>

                  {/* Avaliação com Estrelas */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className={`${
                            idx < (product?.stars || 4)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product?.stock || 0})</span>
                  </div>

                  {/* Preços */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-sm font-bold text-purple-600">
                      {formatNumber(product?.price)} <b>MZN</b>
                    </span>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product?.stock}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-medium transition-all duration-300 text-xs ${
                        product?.stock
                          ? "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span>Comprar</span>
                    </button>
                    
                    <Link
                      to={`${product._id}&&category=${product?.category}`}
                      onClick={() => viewDetails(product)}
                      className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
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
        </div>
      </Container>
    </div>
  )
}