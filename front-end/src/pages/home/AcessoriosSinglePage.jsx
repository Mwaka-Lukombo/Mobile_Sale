import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { useAcessorioStore } from '../../store/acessoriosStore';
import { formatNumber } from '../../lib/formatNumbers';
import { useProductHome } from '../../store/productHome';

export const AcessoriosSinglePage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    acessorio,
    acessoriosCategory,
    getProductSingle,
    getByCategory
  } = useAcessorioStore();

  const {
   addCart
  } = useProductHome();

 const {id} = useParams();
  const element = id.split("&&");
   const productId = element[0];
    const category = element[1].split("=")[1];


  useEffect(()=>{
    getProductSingle(productId);
  },[getProductSingle]);

  useEffect(()=>{
    getProductSingle(category);
  },[getProductSingle]);





  const handleAddToCart = async() => {
    let type = "Acessorios";
    await addCart(productId,type,quantity);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
        
        
        <Link to="/acessorios"
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar para produtos</span>
        </Link>

        {/* Container Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Coluna Esquerda */}
          <div className="space-y-6">
            
            
            <div className="w-full h-[350px] md:h-[400px] lg:h-[450px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-8">
              <img 
                src={acessorio?.image?.url} 
                alt="AirPods Pro 2" 
                className="w-full h-full object-contain drop-shadow-2xl" 
              />
            </div>



            {/* Avaliação */}
            {/* <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600">
                  (5 de 5)
                </span>
              </div>
            </div> */}

          </div>

          {/* Coluna Direita  */}
          <div className="space-y-6">
            
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
             {acessorio?.name}
            </h1>

            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <span className="text-base text-blue-600 font-medium bg-blue-50 px-4 py-1.5 rounded-full">
                {acessorio?.category}
              </span>
              <div className="text-right">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  {formatNumber(acessorio?.price)}
                </span>
                <span className="text-sm font-normal text-gray-600 ml-2">MZN</span>
              </div>
            </div>

            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600 font-medium">Status:</span>
              <span className="text-green-600 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                Em estoque ({acessorio?.stock} unidades)
              </span>
            </div>

            {/* Seletor de Quantidade */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Quantidade
              </label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors font-semibold text-lg"
                >
                  −
                </button>
                <span className="w-20 text-center text-2xl font-semibold text-gray-900">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(Math.min(25, quantity + 1))}
                  className="w-11 h-11 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors font-semibold text-lg"
                >
                  +
                </button>
                
              </div>
            </div>

            {/* carrinho */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 bg-[#16a34a] hover:bg-[#0a7a33] text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-md"
            >
              <ShoppingCart size={22} />
              <span>Adicionar ao Carrinho</span>
            </button>

            {/* Descrição */}
            <div className="pt-4 space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Descrição
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {acessorio?.description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};