// HomePage.jsx - Versão Super Minimalista
import React from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const HomeWellcome = () => {
  const { user } = useAuthStore();

  const mensagens = [
    {
      icone: ShoppingBag,
      titulo: "Vendas",
      descricao: "Gerencie todas as vendas da sua loja"
    },
    {
      icone: Package,
      titulo: "Produtos",
      descricao: "Controle seu catálogo de produtos"
    },
    {
      icone: Users,
      titulo: "Clientes",
      descricao: "Gerencie seus clientes e usuários"
    },
    {
      icone: TrendingUp,
      titulo: "Métricas",
      descricao: "Acompanhe o desempenho do negócio"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Bem-vindo, {user?.name || "Admin"}!</h1>
              <p className="text-blue-100 text-sm">Sistema de Gestão CellShopp</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Este é o seu painel administrativo. Utilize o menu lateral para navegar entre as seções.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mensagens.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-blue-100 p-2 rounded-lg">
                  <msg.icone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{msg.titulo}</h3>
                  <p className="text-sm text-gray-500">{msg.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Aviso */}
          <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-700 text-center">
              ⚠️ As métricas detalhadas estarão disponíveis em breve
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};