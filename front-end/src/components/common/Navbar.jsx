import React, { useEffect, useState } from 'react'
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
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Trash
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useProductHome } from '../../store/productHome';
import { formatNumber } from '../../lib/formatNumbers';
import { useOrderStore } from '../../store/orderStore';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantities, setQuantities] = useState({});

  const { logout, isAdmin } = useAuthStore();

  const {
    getCart,
    cart,
    updateCart,
    removeCart
  } = useProductHome();

  const {
   isLoading,
   payment
  } = useOrderStore();

  useEffect(()=>{
    getCart()
  },[getCart]);

  const cartProducts = cart?.cart?.map(cart => cart);
  const totalCart = cart?.total;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm, 'Categoria:', selectedCategory);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  return (
    <>
      {isAdmin ? (
        <div className='flex items-center justify-between px-4 md:px-8 p-2 w-full h-[80px] shadow-xl border-b border-gray-400'>
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
            <div className='hidden md:flex items-center justify-between px-8 h-[80px]'>
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

              {/* Search Bar */}
              <div className='flex-1 max-w-2xl mx-4'>
                <form onSubmit={handleSearch} className='w-full flex gap-1'>
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar produto..."
                    className="flex-1 px-4 border border-gray-300 rounded-lg h-[40px] text-sm focus:outline-none focus:border-primary-blue bg-white"
                  />
                  
                  <button 
                    type="submit"
                    className="w-[80px] h-[40px] bg-primary-blue hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    Buscar
                  </button>
                </form>
              </div>

              {/* Ícones - Direita */}
              <div className='flex items-center gap-4 min-w-[200px] justify-end'>
                <div className='flex items-center cursor-pointer gap-2'>
                  <User2 size={19} />
                  <div>
                    <Link to={'/profile'} className='text-xs font-medium'>Minha Conta</Link>
                    <button onClick={() => logout()} className='flex items-center gap-1 text-xs text-gray-500 hover:text-primary-blue'>
                      <LogOut size={12} />
                      <span className='text-xs font-light'>Sair</span>
                    </button>
                  </div>
                </div>
                

                <button 
                  onClick={() => setIsCartOpen(true)}
                  className='flex items-center cursor-pointer gap-1 relative hover:text-primary-blue transition-colors'
                >
                  <ShoppingCart size={19} />
                  <span className='text-xs font-semibold hidden lg:inline'>Carrinho</span>
                  <div className='w-[15px] h-[15px] rounded-full bg-primary-blue absolute -top-2 right-0 flex items-center justify-center'>
                    <span className='text-[12px] text-white font-semibold'>{cartProducts?.length}</span>
                  </div>
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
                <Link 
                  to={'/profile'}
                  className='p-2 hover:bg-gray-100 rounded-lg'
                >
                  <User size={22} />
                </Link>



                <button 
                  onClick={() => setIsCartOpen(true)}
                  className='p-2 hover:bg-gray-100 rounded-lg relative'
                >
                  <ShoppingCart size={22} />
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
                <div className="fixed right-0 top-0 bottom-0 w-full lg:max-w-[350px] bg-white z-50 shadow-xl flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-md font-semibold flex items-center gap-2">
                      <ShoppingCart size={19} />
                      Meu Carrinho
                      <span className="text-xs text-gray-500">
                        ({cart?.cart?.length || 0} {cart?.cart?.length === 1 ? 'item' : 'itens'})
                      </span>
                    </h2>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={19} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {!cart?.cart || cart?.cart?.length === 0 ? (
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
                      <>
                        {cart.cart.map((item, index) => (
                          <div key={index} className='flex items-center gap-2 mb-3 w-full p-2 border border-gray-200 rounded-lg'>
                            <div className='w-[10%] flex items-center justify-center h-full'>
                              <img 
                                src={item?.product?.image?.url} 
                                className='w-full h-full object-contain bg-gray-50 rounded'
                                alt={item?.product?.name}
                              />
                            </div>

                            <div className='w-[90%] h-full flex flex-col '>
                              <div className='flex'>
                                <div className='flex-1'>
                                  <h2 className='text-xs font-semibold line-clamp-2'>{item?.product?.name}</h2>
                                  <p className='text-primary-blue text-xs font-bold mt-1'>
                                    {formatNumber(item?.product?.price)} <span className='text-sm'>MT</span>
                                  </p>
                                  <p className='text-xs text-gray-500 mt-1'>
                                    Quantidade: {item?.quantity}
                                  </p>
                                  <p className='text-xs font-semibold mt-1'>
                                    Subtotal: {formatNumber(item?.subtotal)} <span className='text-xs'>MT</span>
                                  </p>
                                </div>

                                <div className='flex items-center gap-2'>
                                  <form onSubmit={handleSubmit} className='flex flex-col items-end gap-2'>
                                    <div className='flex items-center gap-2'>
                                      <div className='flex items-center gap-2'>
                                        <button
                                          type='button'
                                          onClick={() => updateCart(item?.product?._id, -1)}
                                          className='w-[30px] h-[30px] bg-gray-200 rounded-md flex items-center justify-center'
                                        >
                                          <Minus size={10}/>
                                        </button>

                                        <span className='text-xs font-semibold min-w-[20px] text-center'>
                                          {item?.quantity}
                                        </span>

                                        <button
                                          type='button'
                                          onClick={() => updateCart(item?.product?._id, 1)}
                                          className='w-[30px] h-[30px] bg-primary-blue text-white rounded-md flex items-center justify-center'
                                        >
                                          <Plus size={10}/>
                                        </button>
                                      </div>
                                      <button 
                                        type="button"
                                        className='flex items-center justify-center w-[30px] rounded-md h-[30px] bg-red-500 hover:bg-red-600 transition duration-300'
                                        onClick={() => {
                                          removeCart(item?.product._id)
                                        }}
                                      >
                                        <Trash size={10} className='text-white size-4'/>
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  
                  {/* Total Card */}
                  {cart?.cart && cart?.cart?.length > 0 && (
                    <>
                      <div className='border-t border-gray-200 p-4'>
                        <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                          <p className='text-md font-semibold'>Total:</p>
                          <h1 className='text-lg font-bold text-primary-blue'>{formatNumber(cart?.total || 0)} <span className='text-sm'>MT</span></h1>
                        </div>
                      </div>
                      
                      <div className='p-4 border-t border-gray-200'>
                        <button 
                        onClick={()=> payment()}
                        disabled={isLoading} 
                        className='w-full py-2 bg-primary-blue text-sm text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors'>
                          Finalizar Compra
                        </button>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className='w-full mt-2 py-2  text-gray-600 hover:text-primary-blue transition-colors text-sm'
                        >
                          Continuar Comprando
                        </button>
                      </div>
                    </>
                  )}
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
                  <X size={19} />
                </button>
              </div>

              <nav className='p-4'>
                <ul className='flex flex-col gap-2'>
                  <li>
                    <Link 
                      to='/' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors
                      text-xs
                      '
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/smartphones' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors
                      text-xs'
                    >
                      Smartphones
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/acessorios' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors
                      text-xs'
                    >
                      Acessórios
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/tablets' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors
                      text-xs'
                    >
                      Tablets
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/contacto' 
                      onClick={() => setIsMenuOpen(false)}
                      className='block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors
                      text-xs'
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
                    <LogOut size={19} />
                    <span className='text-xs'>Sair</span>
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