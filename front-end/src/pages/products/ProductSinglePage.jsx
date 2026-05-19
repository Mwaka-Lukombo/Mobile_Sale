import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Home, Heart } from 'lucide-react';
import { useProductHome } from '../../store/productHome';
import { useParams } from 'react-router-dom';
import {formatNumber} from '../../lib/formatNumbers'

export const ProductSinglePage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    id
  } = useParams();

  const element = id?.split("&&") || [];
  const idProduct = element[0];
  const category = element[1]?.split("=")[1];

  const {
     getProductSingle,
     productSingle,
     getProductByCategory,
     productsCategory,
     addCart
  } = useProductHome();

  useEffect(() => {
    if (idProduct) {
      getProductSingle(idProduct)
    }
  }, [id, getProductSingle]);

  useEffect(()=>{
    if (category) {
      getProductByCategory(category);
    }
  },[category, getProductByCategory]);

  // Filtrar produtos relacionados - remove o produto atual da lista
  const relatedProducts = productsCategory?.filter(
    (item) => item?._id !== idProduct
  ) || [];

  const product = {
    id: productSingle?._id,
    name: productSingle?.name,
    category: productSingle?.category,
    price: productSingle?.price,
    rating: productSingle?.stars ?? 0,
    stock: productSingle?.stock,
    description: productSingle?.description,
    camera: productSingle?.informations && productSingle?.informations[0] ? productSingle?.informations[0]?.camera : 'N/A',
    ram: productSingle?.informations && productSingle?.informations[0] ? productSingle?.informations[0]?.ram : 'N/A',
    storage: productSingle?.informations && productSingle?.informations[0] ? productSingle?.informations[0]?.gigas : 'N/A',
    images: [
      productSingle?.image?.url
    ]
  };

  // Função para renderizar as estrelas
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={18} className="fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star size={18} className="text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {Array.isArray(emptyStars) && emptyStars.map((_, i) => (
          <Star key={`empty-${i}`} size={18} className="text-gray-300" />
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    alert(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  if (!productSingle) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* CONTENT */}
      <div className="w-full px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Botão voltar */}
        <button
          onClick={() => navigate('/smartphones')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar para produtos</span>
        </button>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* COLUNA ESQUERDA - Imagem e estrelas */}
          <div className="space-y-4">
            {/* Imagem principal do celular */}
            <div className="w-full h-[350px] md:h-[400px] lg:h-[450px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-8">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Miniaturas das imagens */}
            <div className="flex gap-2 justify-center">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className="w-16 h-16 rounded-lg border-2 border-gray-200 hover:border-blue-500 overflow-hidden"
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Estrelas centralizadas */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600">
                  ({product.rating} de 5)
                </span>
              </div>
            </div>

            {/* Botão favoritos */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all border ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-300 text-red-600' 
                    : 'bg-white border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600'
                }`}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                <span>Favoritos</span>
              </button>
            </div>

            {/* Especificações técnicas */}
            <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Especificações Técnicas
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Câmera:</span>
                  <span className="font-medium text-gray-800">{product.camera}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">RAM:</span>
                  <span className="font-medium text-gray-800">{product.ram}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Armazenamento:</span>
                  <span className="font-medium text-gray-800">{product.storage}</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA - Informações do produto */}
          <div className="space-y-5">
            {/* Nome do produto */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Categoria e preço */}
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-gray-200">
              <span className="text-base text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="text-right">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  {formatNumber(product.price)} <span className="text-sm font-normal text-gray-600">MZN</span>
                </span>
              </div>
            </div>

            {/* Estoque */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Status:</span>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  Em estoque ({product.stock} unidades)
                </span>
              ) : (
                <span className="text-red-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Esgotado
                </span>
              )}
            </div>

            {/* Quantidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {product.stock} disponíveis
                </span>
              </div>
            </div>

            {/* Botão adicionar ao carrinho */}
            <button
              onClick={()=> addCart(product.id,quantity)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-md"
            >
              <ShoppingCart size={20} />
              <span>Adicionar ao Carrinho</span>
            </button>

            {/* Descrição do produto */}
            <div className="pt-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Descrição
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Sem descrição disponível'}
              </p>
            </div>

            {/* Benefícios */}
            <div className="pt-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Benefícios</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>✓ Frete grátis para todo o país</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>✓ Garantia de 12 meses</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>✓ Parcelamento em até 12x sem juros</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>✓ Troca grátis em até 30 dias</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção de produtos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Você também pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item?._id}
                  to={`/smartphones/${item?._id}&&category=${item?.category}`}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <img 
                      src={item?.image?.url} 
                      alt={item?.name}
                      className='w-full h-full object-contain p-2'
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item?.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{formatNumber(item?.price)} MZN</p>
                  <div className="flex items-center gap-1 mt-2">
                    {renderStars(item?.stars || 0)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};