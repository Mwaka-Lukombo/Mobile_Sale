import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Camera, ArrowLeft, Save, Home } from 'lucide-react'
import { Container } from '../../components/common/Container'
import { formatNumber } from '../../lib/formatNumbers'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { useOrderStore } from '../../store/orderStore'
import { useEffect } from 'react'

export const ProfilePage = () => {
  
  const {
   user,
   update,
   isLoading
  } = useAuthStore();

  const {
    orders,
    myOrders,
    totalSpent
  } = useOrderStore();

  useEffect(()=>{
    myOrders();
  },[myOrders])

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const [profileImage, setProfileImage] = useState(user?.profile?.url || '')
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = React.useRef(null);


  
  const purchases = orders.flatMap(order =>
  order.items.map(item => ({  
    ...item,
    orderId: order._id,
    totalOrder: order.total,
    status: order.status,
    date: new Date(order.createdAt)
      .toLocaleString("pt-mz"),
    createdAt: order.createdAt
  }))

);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    
    if (!file) return

    const reader = new FileReader()
    
    reader.onload = () => {
      const base64Image = reader.result
      setProfileImage(base64Image)
    }
    
    reader.onerror = () => {
      toast.error('Erro ao carregar a imagem')
    }
    
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    
    if (profileData.password !== profileData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    const dataUpload = {
      name: profileData.name,
      email: profileData.email,
      password: profileData.password || undefined,
      profile: profileImage || undefined
    }

    try {
      await update(dataUpload)
      toast.success('Perfil atualizado com sucesso!')
      setIsEditing(false)
      setProfileData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }))
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setProfileImage(user?.profile?.url || '')
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: ''
    })
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }



  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="hidden md:flex items-center justify-start py-4 border-b border-white/20">
            <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-blue-200 transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>
          </nav>
        </div>

        <div className="py-8 px-4">
          <div className="max-w-7xl mx-auto p-1">
            <h1 className="text-3xl font-bold mb-2 leading-normal">
              Meu Perfil
            </h1>
            <p className="text-xs font-semibold opacity-90">
              Gerencie suas informações pessoais e configurações de conta
            </p>
          </div>
        </div>
      </div>

      <Container>
        <div className="px-4 py-8">
          {/* Botão voltar mobile */}
          <Link to="/" className="md:hidden mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sidebar - Foto de Perfil */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Foto de Perfil</h2>
                
                <div className="flex flex-col items-center gap-4">
                  {/* Imagem de Perfil */}
                  <div className="relative">
                    <img 
                      src={profileImage || user?.profile?.url || "/avatar.png"} 
                      alt="Perfil" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                    />
                    
                    {isEditing && (
                      <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 bg-primary-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                        <Camera size={18} />
                        <input 
                          ref={fileInputRef}
                          id="profileImageInput"
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange} 
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {isEditing && (
                    <p className="text-xs text-gray-500 text-center">
                      Clique no ícone de câmera para alterar a foto
                    </p>
                  )}

                  <div className="w-full pt-4 border-t border-gray-200">
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full py-2 px-4 bg-primary-blue text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
                      >
                        Editar Perfil
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <button 
                          onClick={handleSave}
                          disabled={isLoading}
                          className="w-full py-2 px-4 bg-green-600 text-white rounded-xl font-medium text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <Save size={16} />
                          {isLoading ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button 
                          onClick={handleCancel}
                          disabled={isLoading}
                          className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Formulário */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Informações Pessoais</h2>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User size={16} className="text-primary-blue" />
                      Nome Completo
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Seu nome completo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail size={16} className="text-primary-blue" />
                      Email
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed text-sm"
                    />
                  </div>

                  {/* Separador */}
                  {isEditing && (
                    <>
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-4">Alterar Senha</h3>
                      </div>

                      {/* Nova Senha */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Lock size={16} className="text-primary-blue" />
                          Nova Senha
                        </label>
                        <input 
                          type="password" 
                          name="password"
                          value={profileData.password}
                          onChange={handleInputChange}
                          placeholder="Digite sua nova senha"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Deixe em branco para manter a senha atual
                        </p>
                      </div>

                      {/* Confirmar Senha */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Lock size={16} className="text-primary-blue" />
                          Confirmar Nova Senha
                        </label>
                        <input 
                          type="password" 
                          name="confirmPassword"
                          value={profileData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirme sua nova senha"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all text-sm"
                        />
                      </div>
                    </>
                  )}

                  {/* Info Box */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-xs text-blue-800">
                      <span className="font-semibold">Dica:</span> Clique no botão "Editar Perfil" para fazer alterações nas suas informações.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Seção de Compras Feitas */}
          <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Minhas Compras</h2>
              
              {/* Tabela - Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Produto</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Categoria</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Preço Unit.</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantidade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data</th>
                    </tr>
                  </thead>
                  <tbody>

                {purchases.map((purchase,index) => (

                  <tr
                    key={`${purchase.productId}-${index}`}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >

                    <td className="py-4 px-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={purchase.image}
                          alt={purchase.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />

                        <div>

                          <span className="text-sm font-medium text-gray-800 block">
                            {purchase.name}
                          </span>


                        </div>

                      </div>

                    </td>

                    <td className="py-4 px-4">

                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {purchase.type}
                      </span>

                    </td>

                    <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                      {formatNumber(purchase.price)} MZN
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                      {purchase.quantity}
                    </td>

                    <td className="py-4 px-4 text-sm text-primary-blue font-bold">
                      {formatNumber(purchase.subtotal)} MZN
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-600">
                      {purchase.date}
                    </td>

                  </tr>

                ))}

              </tbody>
                </table>
              </div>

              {/* Cards - Mobile */}
              <div className="md:hidden space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={purchase.image} 
                        alt={purchase.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800">{purchase.name}</h3>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">{purchase.category}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                      <div className="flex justify-between">
                        <span>Preço Unit.:</span>
                        <span className="font-medium text-gray-800">{formatNumber(purchase.price)} MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantidade:</span>
                        <span className="font-medium text-gray-800">{purchase.quantity}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-100">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-primary-blue">{formatNumber(purchase.total)} MZN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data:</span>
                        <span className="font-medium text-gray-800">{purchase.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center md:justify-end">
                  <span className="text-base font-semibold text-gray-800">Total Gasto:</span>
                  <span className="text-2xl font-bold text-primary-blue ml-4">
                    {/* Aqui */}
                    {formatNumber(totalSpent)} MZN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}