import { Box, Headphones, Home, LineChartIcon, LogOut, Settings, SquareChevronLeft, SquareChevronRight, Tablet, Users2 } from 'lucide-react'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation(); // Pega a rota atual
    
    const handleSideBar = () => {
        setSidebarOpen((prev) => !prev)
    }
    
    const sidebarVariants = {
        open: { width: 320 },
        closed: { width: 80 }
    }

    const { logout } = useAuthStore();

    // Função para verificar se o link está ativo
    const isActive = (path) => {
        return location.pathname === path;
    }

    // Array com os links e suas respectivas rotas
    const menuItems = [
        { icon: Home, text: "Dashboard", path: "/" },
        { icon: LineChartIcon, text: "Analytic", path: "/analytic" },
        { icon: Box, text: "Produto", path: "/products" },
        { icon: Users2, text: "Usuarios", path: "/users" },
        { icon: Headphones, text: "Acessorios", path: "/createAcessorios" },
        { icon: Tablet, text: "Tablets", path: "/createTablet" },
        { icon: Settings, text: "Configuracoes", path: "/settings" }
    ];

    return (
        <motion.div 
            variants={sidebarVariants}
            initial="open"
            animate={sidebarOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
            className='sticky top-0 left-0 h-screen border-r border-[#ccc] shadow-xl bg-white p-3 px-5 overflow-hidden'
        >
            <div className='w-full h-[50px] mt-6 flex items-center justify-center'>
                <AnimatePresence mode="wait">
                    {sidebarOpen ? (
                        <motion.h1 
                            key="logo-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
                        >
                            CellShopp
                        </motion.h1>
                    ) : (
                        <motion.div
                            key="logo-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='text-blue-600'
                        >
                            <Box size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='mt-4 w-full'>
                {menuItems.map((item, index) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`
                                w-full h-[50px] flex items-center gap-4 rounded-lg mb-3 p-2 transition-all duration-200 group
                                ${active 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                                    : 'hover:bg-blue-50 hover:text-blue-600 text-gray-700'
                                }
                            `}
                        >
                            <item.icon 
                                className={`
                                    transition-all duration-200
                                    ${active 
                                        ? 'text-white' 
                                        : 'text-gray-500 group-hover:text-blue-600'
                                    }
                                `} 
                                size={20}
                            />
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`
                                            transition-all duration-200
                                            ${active 
                                                ? 'font-semibold text-white' 
                                                : 'group-hover:text-blue-600'
                                            }
                                        `}
                                    >
                                        {item.text}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            
                            {/* Indicador de item ativo para sidebar aberta */}
                            {active && sidebarOpen && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="ml-auto w-1 h-8 bg-white rounded-full shadow-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                            
                            {/* Indicador de item ativo para sidebar fechada */}
                            {active && !sidebarOpen && (
                                <motion.div
                                    layoutId="active-indicator-mini"
                                    className="absolute right-0 w-1 h-8 bg-blue-600 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}

                            {/* Tooltip para sidebar fechada */}
                            {!sidebarOpen && !active && (
                                <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                                    {item.text}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Botão Toggle Sidebar */}
            <div className='flex items-center justify-center w-[50px] h-[50px] mx-auto mt-6'>
                <button 
                    onClick={handleSideBar} 
                    className={`
                        text-white flex items-center justify-center w-[40px] h-[40px] rounded-lg transition-all duration-200
                        ${sidebarOpen 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                            : 'bg-gray-200 hover:bg-blue-100 text-blue-600'
                        }
                    `}
                >
                    {sidebarOpen ? <SquareChevronLeft size={20} /> : <SquareChevronRight size={20} />}
                </button>
            </div>

            {/* Botão Logout */}
            <div className='w-full mt-12 absolute bottom-8 left-0 px-3'>
                <Link
                    to="/login"
                    onClick={() => logout()}
                    className={`
                        w-full h-[50px] flex items-center gap-4 rounded-lg mb-3 p-2 transition-all duration-200 group
                        hover:bg-red-50 hover:text-red-600 text-gray-700
                    `}
                >
                    <LogOut className="text-gray-500 group-hover:text-red-600 transition-colors" size={20} />
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-700 group-hover:text-red-600 transition-colors"
                            >
                                Sair
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {/* Tooltip para sidebar fechada */}
                    {!sidebarOpen && (
                        <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                            Sair
                        </div>
                    )}
                </Link>
            </div>
        </motion.div>
    )
}