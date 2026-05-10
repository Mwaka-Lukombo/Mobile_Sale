import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Heart,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  User2,
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { formatNumber } from '../../lib/formatNumbers';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { logout, isAdmin, isAuth } = useAuthStore();

  // Dados de exemplo para o carrinho
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 125000,
      quantity: 1,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693066164573",
      currency: "MZN"
    },
    {
      id: 2,
      name: "AirPods Pro 2",
      price: 18500,
      quantity: 2,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero?wid=940&hei=940&fmt=png-alpha&.v=1661261865000",
      currency: "MZN"
    }
  ]);

  // Dados de exemplo para favoritos
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      price: 115000,
      oldPrice: 135000,
      image: "https://images.samsung.com/africa_pt/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-titanium-gray-back.jpg",
      currency: "MZN",
      discount: 15,
      inStock: true
    },
    {
      id: 4,
      name: "iPad Air 10.9\" M1",
      price: 95000,
      oldPrice: 115000,
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-hero?wid=940&hei=940&fmt=png-alpha&.v=1693066164573",
      currency: "MZN",
      discount: 17,
      inStock: true
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm, 'Categoria:', selectedCategory);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsWishlistOpen(false);
  };

  const totalCartValue = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      {isAdmin ? (
        <div className='flex items-center justify-between px-[4%] md:px-0 md:justify-around p-2 w-full h-[80px] shadow-xl border-b border-gray-400'>
          <div className='flex items-center gap-3'>
            <div className='w-[40px] h-[40px]'>
              <img src='/mockup.jpg' className='w-full h-full bg-contain bg-center' alt='Logo' />
            </div>
            <div>
              <h2 className='font-bold text-xl'>CellShop</h2>
            </div>
          </div>

          <ul className='hidden md:flex gap-4'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/produtos'>Produtos</Link></li>
            <li><Link to='/categorias'>Categorias</Link></li>
            <li><Link to='/ofertas'>Ofertas</Link></li>
            <li><Link to='/contacto'>Contacto</Link></li>
          </ul>

          <div className='flex items-center gap-3'>
            <div className='hidden md:flex items-center justify-center w-[40px] h-[40px] cursor-pointer text-gray-500'>
              <Search />
            </div>
            <div className='flex items-center justify-center w-[40px] h-[40px] cursor-pointer text-gray-500'>
              <User />
            </div>
            <div className='flex items-center justify-center w-[40px] h-[40px] cursor-pointer text-gray-500'>
              <ShoppingCart />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='sticky top-0 left-0 w-full bg-cinza-claro z-30 border-b border-gray-200'>
            
            {/* Desktop Layout */}
            <div className='hidden md:flex items-center justify-between px-7 h-[80px]'>
              {/* Logo - Esquerda */}
              <Link to={'/'} className='flex items-center gap-2 min-w-[180px]'>
                <div className='w-[50px] h-[50px]'>
                  <img src="/mockup.jpg" className='w-full h-full object-contain' alt='Logo' />
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-xl font-bold'>
                    <span className='text-primary-blue'>Cell</span>Shop
                  </h1>
                  <p className='text-xs text-gray-500'>Seu próximo celular está aqui</p>
                </div>
              </Link>

              {/* Search Bar - Centro */}
              <div className='flex-1 max-w-2xl mx-4'>
                <form onSubmit={handleSearch} className='w-full flex gap-1'>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='border border-gray-300 rounded-lg px-3 h-[45px] w-[130px] text-sm focus:outline-none focus:border-primary-blue bg-white'
                  >
                    <option value="">Categorias</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="xiaomi">Xiaomi</option>
                    <option value="acessorios">Acessórios</option>
                  </select>
                  
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar produto..."
                    className="flex-1 px-4 border border-gray-300 rounded-lg h-[45px] text-sm focus:outline-none focus:border-primary-blue bg-white"
                  />
                  
                  <button 
                    type="submit"
                    className="w-[100px] h-[45px] bg-primary-blue hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    Buscar
                  </button>
                </form>
              </div>

              {/* Ícones - Direita */}
              <div className='flex items-center gap-4 min-w-[200px] justify-end'>
                <div className='flex items-center cursor-pointer gap-2'>
                  <User2 size={22} />
                  <div>
                    <p className='text-sm font-medium'>Minha Conta</p>
                    <button onClick={() => logout()} className='flex items-center gap-1 text-xs text-gray-500 hover:text-primary-blue'>
                      <LogOut size={12} />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsWishlistOpen(true)}
                  className='flex items-center cursor-pointer gap-1 relative hover:text-primary-blue transition-colors'
                >
                  <Heart size={22} />
                  <span className='text-sm hidden lg:inline'>Favoritos</span>
                  {wishlistItems.length > 0 && (
                    <span className='absolute -top-2 -right-2 w-5 h-5 bg-primary-blue rounded-full text-white text-xs flex items-center justify-center'>
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => setIsCartOpen(true)}
                  className='flex items-center cursor-pointer gap-1 relative hover:text-primary-blue transition-colors'
                >
                  <ShoppingCart size={22} />
                  <span className='text-sm hidden lg:inline'>Carrinho</span>
                  {cartItems.length > 0 && (
                    <span className='absolute -top-2 -right-2 w-5 h-5 bg-primary-blue rounded-full text-white text-xs flex items-center justify-center'>
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className='flex md:hidden items-center justify-between px-4 h-[70px]'>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg'
              >
                <Menu size={24} />
              </button>

              <Link to={'/'} className='flex items-center gap-2'>
                <div className='w-[40px] h-[40px]'>
                  <img src="/mockup.jpg" className='w-full h-full object-contain' alt='Logo' />
                </div>
                <h1 className='text-lg font-bold'>
                  <span className='text-primary-blue'>Cell</span>Shop
                </h1>
              </Link>

              <div className='flex items-center gap-2'>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className='p-2 hover:bg-gray-100 rounded-lg'
                >
                  <Search size={22} />
                </button>

                <button 
                  onClick={() => setIsWishlistOpen(true)}
                  className='p-2 hover:bg-gray-100 rounded-lg relative'
                >
                  <Heart size={22} />
                  {wishlistItems.length > 0 && (
                    <span className='absolute -top-1 -right-1 w-4 h-4 bg-primary-blue rounded-full text-white text-[10px] flex items-center justify-center'>
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => setIsCartOpen(true)}
                  className='p-2 hover:bg-gray-100 rounded-lg relative'
                >
                  <ShoppingCart size={22} />
                  {cartItems.length > 0 && (
                    <span className='absolute -top-1 -right-1 w-4 h-4 bg-primary-blue rounded-full text-white text-[10px] flex items-center justify-center'>
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Search Bar Mobile */}
            {isSearchOpen && (
              <div className='md:hidden bg-white p-4 shadow-lg border-b border-gray-200'>
                <form onSubmit={handleSearch} className='flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className='flex-1 border border-gray-300 rounded-lg px-3 h-[45px] text-sm focus:outline-none focus:border-primary-blue bg-white'
                    >
                      <option value="">Categorias</option>
                      <option value="iphone">iPhone</option>
                      <option value="samsung">Samsung</option>
                      <option value="xiaomi">Xiaomi</option>
                      <option value="acessorios">Acessórios</option>
                    </select>
                    <button 
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className='p-2 hover:bg-gray-100 rounded-lg'
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className='flex gap-2'>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar produto..."
                      className="flex-1 px-4 border border-gray-300 rounded-lg h-[45px] text-sm focus:outline-none focus:border-primary-blue bg-white"
                      autoFocus
                    />
                    <button 
                      type="submit"
                      className="px-6 h-[45px] bg-primary-blue hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors"
                    >
                      Buscar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Modal do Carrinho */}
            {isCartOpen && (
              <>
                <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsCartOpen(false)} />
                <div className="fixed right-0 top-0 bottom-0 w-full max-w-[450px] bg-white z-50 shadow-xl flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <ShoppingCart size={24} />
                      Meu Carrinho
                      <span className="text-sm text-gray-500">({cartItems.length} itens)</span>
                    </h2>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Seu carrinho está vazio</p>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="mt-4 px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
                        >
                          Continuar Comprando
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-3 border border-gray-100 rounded-lg">
                            <div className="w-[80px] h-[80px] bg-gray-50 rounded-lg flex items-center justify-center">
                              <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{item.name}</h3>
                              <p className="text-primary-blue font-bold">{formatNumber(item.price)} {item.currency}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 border rounded hover:bg-gray-100"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 border rounded hover:bg-gray-100"
                                >
                                  <Plus size={14} />
                                </button>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-primary-blue">
                          {formatNumber(totalCartValue)} MZN
                        </span>
                      </div>
                      <button className="w-full py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                        Finalizar Compra
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Modal de Favoritos */}
            {isWishlistOpen && (
              <>
                <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsWishlistOpen(false)} />
                <div className="fixed right-0 top-0 bottom-0 w-full max-w-[450px] bg-white z-50 shadow-xl flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Heart size={24} />
                      Meus Favoritos
                      <span className="text-sm text-gray-500">({wishlistItems.length} itens)</span>
                    </h2>
                    <button 
                      onClick={() => setIsWishlistOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Sua lista de favoritos está vazia</p>
                        <button 
                          onClick={() => setIsWishlistOpen(false)}
                          className="mt-4 px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
                        >
                          Explorar Produtos
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-3 border border-gray-100 rounded-lg">
                            <div className="w-[80px] h-[80px] bg-gray-50 rounded-lg flex items-center justify-center">
                              <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{item.name}</h3>
                              <div className="flex items-baseline gap-2">
                                <span className="text-primary-blue font-bold">{formatNumber(item.price)} {item.currency}</span>
                                {item.oldPrice && (
                                  <span className="text-xs text-gray-400 line-through">
                                    {formatNumber(item.oldPrice)} {item.currency}
                                  </span>
                                )}
                              </div>
                              {item.discount && (
                                <span className="text-xs text-green-600">-{item.discount}%</span>
                              )}
                              <div className="flex gap-2 mt-2">
                                <button 
                                  onClick={() => {
                                    addToCart(item);
                                    removeFromWishlist(item.id);
                                  }}
                                  className="flex-1 px-3 py-1.5 bg-primary-blue text-white text-sm rounded-lg hover:bg-blue-600"
                                >
                                  Adicionar ao Carrinho
                                </button>
                                <button 
                                  onClick={() => removeFromWishlist(item.id)}
                                  className="px-3 py-1.5 border border-red-500 text-red-500 text-sm rounded-lg hover:bg-red-50"
                                >
                                  Remover
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Menu Mobile - Lateral */}
            <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                <div className='flex items-center gap-2'>
                  <div className='w-[40px] h-[40px]'>
                    <img src="/mockup.jpg" className='w-full h-full object-contain' alt='Logo' />
                  </div>
                  <span className='font-bold text-primary-blue'>CellShop</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className='p-2 hover:bg-gray-100 rounded-lg'
                >
                  <X size={24} />
                </button>
              </div>

              <nav className='p-4'>
                <ul className='flex flex-col gap-2'>
                  <li>
                    <Link 
                      to='/' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors'
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/smartphones' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors'
                    >
                      Smartphones
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/acessorios' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors'
                    >
                      Acessórios
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/tablets' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors'
                    >
                      Tablets
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/contacto' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors'
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>

                <div className='border-t border-gray-200 mt-4 pt-4'>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className='w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-red-600'
                  >
                    <LogOut size={20} />
                    <span>Sair</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Overlay do Menu Mobile */}
            {isMenuOpen && (
              <div 
                className='fixed inset-0 bg-black/50 z-40 md:hidden'
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};