import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { useAcessorioStore } from '../../store/acessoriosStore';
import { formatNumber } from '../../lib/formatNumbers';
import { useProductHome } from '../../store/productHome';
import { Container } from '../../components/common/Container';

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
      <Container>
        <div className="w-full px-4 py-6 md:px-0 md:py-8">
          
          <Link to="/acessorios"
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            <span>Voltar para produtos</span>
          </Link>

          {/* Container Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Coluna Esquerda */}
            <div className="space-y-6">
              
              <div className="w-full h-[300px] md:h-[350px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-6 md:p-8">
                <img 
                  src={acessorio?.image?.url} 
                  alt={acessorio?.name}
                  className="w-full h-full object-contain drop-shadow-2xl" 
                />
              </div>

              {/* Botão favoritos */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all border text-sm ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-300 text-red-600' 
                      : 'bg-white border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                  <span>Favoritos</span>
                </button>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="space-y-5">
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
               {acessorio?.name}
              </h1>

              {/* Categoria e Preço */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-gray-200">
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                  {acessorio?.category}
                </span>
                <div className="text-right">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatNumber(acessorio?.price)}
                  </span>
                  <span className="text-sm font-normal text-gray-600 ml-2">MZN</span>
                </div>
              </div>

              {/* Status de Estoque */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-600 font-medium">Status:</span>
                {acessorio?.stock > 0 ? (
                  <span className="text-green-600 font-medium text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    Em estoque ({acessorio?.stock} unidades)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Esgotado
                  </span>
                )}
              </div>

              {/* Seletor de Quantidade */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Quantidade
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors font-semibold text-sm"
                  >
                    −
                  </button>
                  <span className="w-16 text-center text-lg font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(Math.min(acessorio?.stock || 25, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors font-semibold text-sm"
                  >
                    +
                  </button>
                  <span className="text-xs text-gray-500 ml-2">
                    {acessorio?.stock || 0} disponíveis
                  </span>
                </div>
              </div>

              {/* Botão Adicionar ao Carrinho */}
              <button
                onClick={handleAddToCart}
                disabled={!acessorio?.stock}
                className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-xl transition-all transform text-sm ${
                  acessorio?.stock
                    ? 'bg-green-600 hover:bg-green-700 hover:scale-[1.02] shadow-md'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={18} />
                <span>Adicionar ao Carrinho</span>
              </button>

              {/* Descrição */}
              <div className="pt-2 space-y-3">
                <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                  Descrição
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {acessorio?.description || 'Sem descrição disponível'}
                </p>
              </div>

              {/* Benefícios */}
              <div className="pt-2 space-y-3">
                <h2 className="text-base font-semibold text-gray-800">Benefícios</h2>
                <ul className="space-y-2 text-gray-600 text-xs">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span>✓ Frete grátis para todo o país</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span>✓ Garantia de 12 meses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span>✓ Parcelamento em até 12x sem juros</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span>✓ Troca grátis em até 30 dias</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};