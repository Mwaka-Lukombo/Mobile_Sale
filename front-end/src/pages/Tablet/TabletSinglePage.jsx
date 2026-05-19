import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { formatNumber } from '../../lib/formatNumbers'
import { useTabletStore } from '../../store/tabletsStore';
import { useEffect } from 'react';
import { useProductHome } from '../../store/productHome';

export const TabletSinglePage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {id} = useParams();
   const element = id.split("&&");
    const productId = element[0];
     const category = element[1].split("=")[1];


  const {
    acessorio,
    getProductSingle
  } = useTabletStore();

  const {
  addCart
  } = useProductHome();

  useEffect(()=>{
    getProductSingle(productId);
  },[getProductSingle])


  const handleAddToCart = async() => {
    let type = "Tablet";
    await addCart(productId,type,quantity);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* CONTENT */}
      <div className="w-full px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Botão voltar */}
        <Link to={`/tablets`}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar para produtos</span>
        </Link>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="space-y-6">
            
            <div className="w-full h-[350px] md:h-[400px] lg:h-[450px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-8">
              <img
                src={acessorio?.image?.url}
                alt={acessorio?.name}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            

            {/* Estrelas centralizadas */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
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
            </div>


            {/* Especificações técnicas */}
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Especificações Técnicas
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Câmera:</span>
                  <span className="font-medium text-gray-800">{acessorio?.infomations?.camera} MP</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">RAM:</span>
                  <span className="font-medium text-gray-800">{acessorio?.infomations?.ram}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Armazenamento:</span>
                  <span className="font-medium text-gray-800">{acessorio?.infomations?.gigas}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {acessorio?.name}
            </h1>

            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-gray-200">
              <span className="text-base text-blue-600 font-medium bg-blue-50 px-4 py-1.5 rounded-full">
                {acessorio?.category}
              </span>
              <div className="text-right">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  {formatNumber(acessorio?.price)} <span className="text-sm font-normal text-gray-600">MZN</span>
                </span>
              </div>
            </div>

            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600 font-medium">Status:</span>
              <span className="text-green-600 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                Em estoque ({acessorio?.stock} unidades)
              </span>
            </div>

            {/* Quantidade */}
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
                  onClick={() => setQuantity(Math.min(15, quantity + 1))}
                  className="w-11 h-11 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors font-semibold text-lg"
                >
                  +
                </button>
                
              </div>
            </div>

            {/* Botão adicionar ao carrinho */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-md"
            >
              <ShoppingCart size={22} />
              <span>Adicionar ao Carrinho</span>
            </button>

            {/* Descrição do produto */}
            <div className="pt-4 space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Descrição
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {acessorio?.description}
              </p>
            </div>

            {/* Benefícios */}
            <div className="pt-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Benefícios
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-700">✓ Frete grátis para todo o país</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-700">✓ Garantia de 12 meses</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-700">✓ Parcelamento em até 12x sem juros</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-700">✓ Troca grátis em até 30 dias</span>
                </li>
              </ul>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};