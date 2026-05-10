import React from 'react'
import { MenuComponent } from '../MenuComponent';
import { Pencil, Plus, Search, Trash, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FormContent = ({
    dataForm,
    subTitleForm,
    ContentInformation,
    modalElements   
}) => {
    const {
        title,
        placeholderInput,
        data,
        searchInput,
        formTitle
    } = ContentInformation;

    const {
        setShowModal,
        modal,
        modalContent
    } = modalElements;

    const formElements = modalElements?.modalContent?.inputs;
    const formData = formElements.map(element => element.handler[0]);

       console.log(formData)
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            {/* MODAL MODERNIZADO */}
            <AnimatePresence>
                {modal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto'
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className='max-w-2xl w-full mx-auto my-8 md:my-16'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className='bg-white rounded-2xl shadow-2xl overflow-hidden'>
                                {/* Header do Modal */}
                                <div className='bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center'>
                                    <div>
                                        <h1 className='text-xl font-bold text-white'>{modalContent?.title}</h1>
                                        <p className='text-blue-100 text-sm mt-1'>{modalContent?.subTitle}</p>
                                    </div>
                                    <button 
                                        onClick={() => setShowModal(false)} 
                                        className='text-white hover:bg-white/20 rounded-lg p-2 transition-colors'
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Form do Modal */}
                                <form onSubmit={handleSubmit} className='p-6'>
                                    <div className='space-y-4'>
                                        {Array.isArray(modalContent.inputs) && modalContent.inputs.map((value, index) => (
                                            <div key={index} className='form-control'>
                                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                    {value?.label}
                                                    {value?.required && <span className='text-red-500 ml-1'>*</span>}
                                                </label>
                                                
                                                {value?.select && (
                                                    <select
                                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                                                        required={value?.required}
                                                    >
                                                        <option value="">Selecione uma opção</option>
                                                        {Array.isArray(value?.select) && value?.select.map((selectValue, idx) => (
                                                            <option key={idx} value={selectValue}>{selectValue}</option>
                                                        ))}
                                                    </select>
                                                )}

                                                {value?.input && (
                                                    <input 
                                                        type={value?.input} 
                                                        placeholder={value?.placeholder}
                                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                                                        required={value?.required}
                                                        onChange={(e) => value?.handler[0](e.target.value)}
                                                        value={value?.handler[1]}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex gap-3 mt-8'>
                                        <button
                                            type="submit"
                                            className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors'
                                        >
                                            Submeter
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors'
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CONTEÚDO PRINCIPAL */}
            <div className='w-full min-h-screen bg-gray-50'>
                <MenuComponent />
                
                <div className='w-full px-4 py-6 md:px-6 lg:px-8'>
                    {/* Header com título e busca */}
                    <div className='mb-8'>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <motion.h1 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className='text-2xl md:text-3xl font-bold text-gray-800'
                            >
                                {title}
                            </motion.h1>

                            <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
                                <form onSubmit={handleSubmit} className='flex-1'>
                                    <div className='relative'>
                                        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                        <input 
                                            type='text' 
                                            placeholder={placeholderInput} 
                                            className='w-full sm:w-80 h-12 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all'
                                        />
                                    </div>
                                </form>

                                <button
                                    onClick={() => setShowModal(true)}
                                    className='flex items-center justify-center gap-2 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm'
                                >
                                    <Plus size={20} />
                                    <span>{formTitle}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TABELA RESPONSIVA */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'
                    >
                        {/* Versão Desktop - Tabela */}
                        <div className='hidden lg:block overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50 border-b border-gray-200'>
                                    <tr>
                                        {Array.isArray(subTitleForm) && subTitleForm.map((item, index) => (
                                            <th key={index} className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                                                {item}
                                            </th>
                                        ))}
                                        
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-100'>
                                    {Array.isArray(dataForm) && dataForm.map((item, index) => (
                                        <tr key={index} className='hover:bg-gray-50 transition-colors'>
                                            {title === "product" && (
                                                <td className='px-6 py-4'>
                                                    <div className='flex items-center gap-3'>
                                                        <div className='w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0'>
                                                            <img 
                                                                src={item?.image || '/mockup.jpg'} 
                                                                alt={item?.name}
                                                                className='w-full h-full object-cover'
                                                            />
                                                        </div>
                                                        <span className='font-medium text-gray-800'>{item?.name}</span>
                                                    </div>
                                                </td>
                                            )}
                                            {title !== "product" && (
                                                <td className='px-6 py-4 font-medium text-gray-800'>{item?.name}</td>
                                            )}
                                            <td className='px-6 py-4 text-gray-600'>{item?.category || item?.name}</td>
                                            <td className='px-6 py-4'>
                                                <span className='font-semibold text-gray-800'>
                                                    {item?.price || item?.email}
                                                    {title === "Products" && " MT"}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                                    ${item?.stock > 10 ? 'bg-green-100 text-green-700' : 
                                                      item?.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                                                      'bg-red-100 text-red-700'}
                                                `}>
                                                    {item?.stock || item?.accesso}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4'>
                                                {item?.sales && (
                                                    <span className='text-sm font-medium text-gray-700'>{item?.sales}</span>
                                                )}
                                                {item?.status && (
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
                                                        ${item?.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                                                          item?.status === 'Inativo' ? 'bg-red-100 text-red-700' :
                                                          'bg-gray-100 text-gray-700'}
                                                    `}>
                                                        {item?.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-3'>
                                                    <button className='text-blue-600 hover:text-blue-800 transition-colors'>
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button className='text-red-600 hover:text-red-800 transition-colors'>
                                                        <Trash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Versão Mobile - Cards */}
                        <div className='lg:hidden'>
                            {Array.isArray(dataForm) && dataForm.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className='border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors'
                                >
                                    <div className='flex items-start justify-between mb-3'>
                                        <div className='flex items-center gap-3 flex-1'>
                                            {title === "product" && (
                                                <div className='w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0'>
                                                    <img src={item?.image || '/mockup.jpg'} className='w-full h-full object-cover' />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className='font-semibold text-gray-800'>{item?.name}</h3>
                                                <p className='text-sm text-gray-500'>{item?.category || item?.name}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button className='text-blue-600 p-1'>
                                                <Pencil size={16} />
                                            </button>
                                            <button className='text-red-600 p-1'>
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className='grid grid-cols-2 gap-3 text-sm'>
                                        <div>
                                            <span className='text-gray-500'>Preço:</span>
                                            <p className='font-semibold text-gray-800'>
                                                {item?.price || item?.email}
                                                {title === "Products" && " MT"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className='text-gray-500'>Estoque:</span>
                                            <p className={`font-semibold 
                                                ${item?.stock > 10 ? 'text-green-600' : 
                                                  item?.stock > 0 ? 'text-yellow-600' : 
                                                  'text-red-600'}
                                            `}>
                                                {item?.stock || item?.accesso}
                                            </p>
                                        </div>
                                        {(item?.sales || item?.status) && (
                                            <div className='col-span-2'>
                                                <span className='text-gray-500'>Status:</span>
                                                <p>{item?.sales || item?.status}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Estado vazio */}
                        {(!dataForm || dataForm.length === 0) && (
                            <div className='text-center py-12'>
                                <div className='text-gray-400 mb-2'>Nenhum dado encontrado</div>
                                <button 
                                    onClick={() => setShowModal(true)}
                                    className='text-blue-600 hover:text-blue-700'
                                >
                                    + Adicionar novo
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    )
}