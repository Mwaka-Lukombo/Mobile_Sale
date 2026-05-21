import { Box, Headphones, Home, LineChartIcon, LogOut, Settings, SquareChevronLeft, SquareChevronRight, Tablet, Users2 } from 'lucide-react'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    
    const handleSideBar = () => {
        setSidebarOpen((prev) => !prev)
    }
    
    const sidebarVariants = {
        open: { width: 280 },
        closed: { width: 70 }
    }

    const { logout } = useAuthStore();

    const isActive = (path) => {
        return location.pathname === path;
    }

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
            className='sticky top-0 left-0 h-screen border-r border-[#ccc] shadow-xl bg-white p-2 px-3 overflow-hidden'
        >
            <div className='w-full h-[45px] mt-4 flex items-center justify-center'>
                <AnimatePresence mode="wait">
                    {sidebarOpen ? (
                        <motion.h1 
                            key="logo-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
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
                            <Box size={18} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='mt-3 w-full'>
                {menuItems.map((item, index) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`
                                w-full h-[45px] flex items-center gap-3 rounded-lg mb-2 p-2 transition-all duration-200 group relative
                                ${active 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                                    : 'hover:bg-blue-50 hover:text-blue-600 text-gray-700'
                                }
                            `}
                        >
                            <item.icon 
                                className={`
                                    transition-all duration-200 flex-shrink-0
                                    ${active 
                                        ? 'text-white' 
                                        : 'text-gray-500 group-hover:text-blue-600'
                                    }
                                `} 
                                size={15}
                            />
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`
                                            transition-all duration-200 text-sm truncate
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
                                    className="ml-auto w-1 h-6 bg-white rounded-full shadow-sm flex-shrink-0"
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
                                    className="absolute right-0 w-1 h-6 bg-blue-600 rounded-full"
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
            <div className='flex items-center justify-center w-[45px] h-[45px] mx-auto mt-4'>
                <button 
                    onClick={handleSideBar} 
                    className={`
                        text-white flex items-center justify-center w-[36px] h-[36px] rounded-lg transition-all duration-200
                        ${sidebarOpen 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                            : 'bg-gray-200 hover:bg-blue-100 text-blue-600'
                        }
                    `}
                >
                    {sidebarOpen ? <SquareChevronLeft size={18} /> : <SquareChevronRight size={18} />}
                </button>
            </div>

            {/* Botão Logout */}
            <div className='w-full mt-8 absolute bottom-6 left-0 px-2'>
                <Link
                    to="/login"
                    onClick={() => logout()}
                    className={`
                        w-full h-[45px] flex items-center gap-3 rounded-lg mb-2 p-2 transition-all duration-200 group relative
                        hover:bg-red-50 hover:text-red-600 text-gray-700
                    `}
                >
                    <LogOut className="text-gray-500 group-hover:text-red-600 transition-colors flex-shrink-0" size={18} />
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-700 group-hover:text-red-600 transition-colors text-sm truncate"
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