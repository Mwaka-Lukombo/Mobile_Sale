// SettingsPage.jsx
import React, { useEffect, useState } from 'react';
import { 
    Store, 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    Send, 
    Users, 
    Settings as SettingsIcon,
    Save,
    Edit2,
    CheckCircle,
    AlertCircle,
    Mail as MailIcon,
    MessageCircle,
    Loader,
    X,
    UserCheck,
    Shield
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useLojaStore } from '../../store/lojaStore';

export const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);
    const [editingField, setEditingField] = useState(null);

    const {
      isLoading,
      getLoja,
      lojaInfo,
      updateLoja
    } = useLojaStore();

    useEffect(() => {
        getLoja();
    }, [getLoja]);

    const [generalSettings, setGeneralSettings] = useState({
        storeName: lojaInfo?.storeName,
        email: lojaInfo?.email,
        phone: lojaInfo?.phone,
        address: lojaInfo?.address,
        website: 'www.cellshopp.com',
        taxNumber: '123456789',
        description: lojaInfo?.description
    });

    const [emailSettings, setEmailSettings] = useState({
        subject: '',
        message: '',
        sendTo: 'all'
    });

    const handleSaveGeneral = async () => {
        setIsSaving(true);
        await updateLoja(generalSettings);
        setTimeout(() => {
            setIsSaving(false);
            setEditingField(null);
            toast.success('Configurações salvas com sucesso!');
        }, 1000);
    };

    const handleSendEmail = async () => {
        if (!emailSettings.subject || !emailSettings.message) {
            toast.error('Preencha o assunto e a mensagem');
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success(`Email enviado para ${emailSettings.sendTo === 'all' ? 'todos os usuários' : 
                          emailSettings.sendTo === 'customers' ? 'clientes' : 'administradores'}`);
            setEmailSettings({
                subject: '',
                message: '',
                sendTo: 'all'
            });
        }, 1500);
    };

    // Componente EditableField
    const EditableField = ({ label, value, field, type = 'text', icon: Icon }) => (
        <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-2">
                {label}
            </label>
            {editingField === field ? (
                <div className="flex gap-2">
                    {type === 'textarea' ? (
                        <textarea
                            value={value || ''}
                            onChange={(e) => setGeneralSettings({...generalSettings, [field]: e.target.value})}
                            className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            rows="3"
                            autoFocus
                        />
                    ) : (
                        <input
                            type={type}
                            value={value || ''}
                            onChange={(e) => setGeneralSettings({...generalSettings, [field]: e.target.value})}
                            className="flex-1 text-xs px-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            autoFocus
                        />
                    )}
                    <button
                        onClick={() => {
                            handleSaveGeneral();
                            setEditingField(null);
                        }}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <CheckCircle size={16} />
                    </button>
                    <button
                        onClick={() => setEditingField(null)}
                        className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
                    <div className="flex items-center gap-3">
                        <Icon className="text-gray-400 group-hover:text-blue-500 transition-colors" size={16} />
                        <span className="text-xs text-gray-700">{value || 'Não definido'}</span>
                    </div>
                    <button
                        onClick={() => setEditingField(field)}
                        className="text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <Edit2 size={14} />
                    </button>
                </div>
            )}
        </div>
    );

    const tabs = [
        { id: 'general', label: 'Geral', icon: SettingsIcon, description: 'Informações da loja' },
        { id: 'email', label: 'Email em Massa', icon: MailIcon, description: 'Comunique-se com usuários' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Configurações</h1>
                    <p className="text-xs text-gray-600">Gerencie as configurações da sua loja</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-200 relative
                                ${activeTab === tab.id 
                                    ? 'text-blue-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                                }
                            `}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Geral */}
                {activeTab === 'general' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-gray-200 bg-gray-50">
                            <div>
                                <h2 className="text-base font-semibold text-gray-800">Informações da Loja</h2>
                                <p className="text-xs text-gray-500 mt-1">Configure as informações básicas da sua loja</p>
                            </div>
                            <button
                                onClick={handleSaveGeneral}
                                disabled={isSaving}
                                className="flex items-center justify-center gap-2 h-[40px] px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm disabled:opacity-50 text-sm"
                            >
                                {isSaving ? (
                                    <Loader className="animate-spin" size={16} />
                                ) : (
                                    <Save size={16} />
                                )}
                                Salvar Alterações
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Coluna Esquerda */}
                                <div>
                                    <EditableField
                                        label="Nome da Loja"
                                        value={generalSettings.storeName}
                                        field="storeName"
                                        icon={Store}
                                    />
                                    <EditableField
                                        label="Email de Contacto"
                                        value={generalSettings.email}
                                        field="email"
                                        type="email"
                                        icon={Mail}
                                    />
                                    <EditableField
                                        label="Telefone/Contacto"
                                        value={generalSettings.phone}
                                        field="phone"
                                        type="tel"
                                        icon={Phone}
                                    />
                                    <EditableField
                                        label="NIF"
                                        value={generalSettings.taxNumber}
                                        field="taxNumber"
                                        icon={AlertCircle}
                                    />
                                </div>

                                {/* Coluna Direita */}
                                <div>
                                    <EditableField
                                        label="Endereço"
                                        value={generalSettings.address}
                                        field="address"
                                        icon={MapPin}
                                    />
                                    <EditableField
                                        label="Website"
                                        value={generalSettings.website}
                                        field="website"
                                        type="url"
                                        icon={Globe}
                                    />
                                    <EditableField
                                        label="Descrição da Loja"
                                        value={generalSettings.description}
                                        field="description"
                                        type="textarea"
                                        icon={MessageCircle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Email em Massa */}
                {activeTab === 'email' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-base font-semibold text-gray-800">Enviar Email para Usuários</h2>
                            <p className="text-xs text-gray-500 mt-1">Envie comunicações em massa para seus usuários</p>
                        </div>

                        <div className="p-6">
                            {/* Seleção de Destinatários */}
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-gray-700 mb-3">
                                    Destinatários
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {[
                                        { id: 'all', label: 'Todos os Usuários', icon: Users, color: 'blue', description: 'Enviar para todos os usuários', count: '1.247' },
                                        { id: 'customers', label: 'Apenas Clientes', icon: UserCheck, color: 'green', description: 'Enviar apenas para clientes', count: '1.089' },
                                        { id: 'admins', label: 'Apenas Administradores', icon: Shield, color: 'purple', description: 'Enviar apenas para administradores', count: '8' }
                                    ].map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => setEmailSettings({...emailSettings, sendTo: option.id})}
                                            className={`
                                                relative p-3 rounded-xl border-2 transition-all text-left group
                                                ${emailSettings.sendTo === option.id 
                                                    ? `border-${option.color}-500 bg-${option.color}-50` 
                                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                                }
                                            `}
                                        >
                                            <option.icon className={`mb-2 ${emailSettings.sendTo === option.id ? `text-${option.color}-600` : 'text-gray-400 group-hover:text-gray-600'}`} size={20} />
                                            <div className="text-xs font-semibold text-gray-800">{option.label}</div>
                                            <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                                            <div className="text-xs font-medium text-gray-400 mt-1">{option.count} usuários</div>
                                            {emailSettings.sendTo === option.id && (
                                                <div className={`absolute top-2 right-2 w-2 h-2 bg-${option.color}-500 rounded-full`} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Estatísticas */}
                            <div className="bg-blue-50 rounded-xl p-3 mb-5 border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-blue-100 p-1.5 rounded-lg">
                                            <Users className="text-blue-600" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-blue-800">Total de destinatários</p>
                                            <p className="text-sm font-bold text-blue-900">
                                                {emailSettings.sendTo === 'all' ? '1.247' : 
                                                 emailSettings.sendTo === 'customers' ? '1.089' : '8'} usuários
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-blue-600">Último envio: 15/05/2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* Formulário de Email */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Assunto
                                    </label>
                                    <input
                                        type="text"
                                        value={emailSettings.subject}
                                        onChange={(e) => setEmailSettings({...emailSettings, subject: e.target.value})}
                                        placeholder="Digite o assunto do email"
                                        className="w-full text-xs px-3 h-[40px] border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Mensagem
                                    </label>
                                    <textarea
                                        value={emailSettings.message}
                                        onChange={(e) => setEmailSettings({...emailSettings, message: e.target.value})}
                                        placeholder="Digite sua mensagem aqui..."
                                        rows="5"
                                        className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                                    />
                                </div>

                                {/* Preview do Email */}
                                {(emailSettings.subject || emailSettings.message) && (
                                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                                        <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <MailIcon size={14} />
                                            Preview do Email
                                        </h3>
                                        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                            <div className="text-xs font-semibold text-gray-800 mb-2 pb-2 border-b border-gray-100">
                                                Assunto: {emailSettings.subject || 'Sem assunto'}
                                            </div>
                                            <div className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                                                {emailSettings.message || 'Sua mensagem aparecerá aqui...'}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Botão de Envio */}
                                <button
                                    onClick={handleSendEmail}
                                    disabled={isSaving || !emailSettings.subject || !emailSettings.message}
                                    className="w-full flex items-center justify-center gap-2 h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {isSaving ? (
                                        <Loader className="animate-spin" size={16} />
                                    ) : (
                                        <Send size={16} />
                                    )}
                                    {isSaving ? 'Enviando...' : 'Enviar Email Agora'}
                                </button>

                                {/* Aviso */}
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={14} />
                                        <div className="text-xs text-amber-700">
                                            <p className="font-semibold mb-1">Aviso importante:</p>
                                            <p>O email será enviado para todos os destinatários selecionados. Esta ação não pode ser desfeita.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};