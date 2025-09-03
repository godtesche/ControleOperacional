import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Check,
  Users,
  Tag,
  Briefcase
} from 'lucide-react';
import { TipoServico, Categoria, Responsavel } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockTiposServico, mockCategorias, mockResponsaveis } from '../../data/mockData';

export function ConfiguracoesView() {
  const [tiposServico, setTiposServico] = useLocalStorage<TipoServico[]>('tiposServico', mockTiposServico);
  const [categorias, setCategorias] = useLocalStorage<Categoria[]>('categorias', mockCategorias);
  const [responsaveis, setResponsaveis] = useLocalStorage<Responsavel[]>('responsaveis', mockResponsaveis);
  
  const [activeTab, setActiveTab] = useState<'tipos' | 'categorias' | 'responsaveis'>('tipos');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const tabs = [
    { id: 'tipos', label: 'Tipos de Serviço', icon: Briefcase },
    { id: 'categorias', label: 'Categorias', icon: Tag },
    { id: 'responsaveis', label: 'Responsáveis', icon: Users }
  ];

  const startEdit = (item: any, type: string) => {
    setEditingItem(`${type}-${item.id}`);
    setFormData(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({});
  };

  const saveEdit = () => {
    const [type] = editingItem!.split('-');
    
    switch (type) {
      case 'tipo':
        setTiposServico(prev => prev.map(item => 
          item.id === formData.id ? formData : item
        ));
        break;
      case 'categoria':
        setCategorias(prev => prev.map(item => 
          item.id === formData.id ? formData : item
        ));
        break;
      case 'responsavel':
        setResponsaveis(prev => prev.map(item => 
          item.id === formData.id ? formData : item
        ));
        break;
    }
    
    cancelEdit();
  };

  const toggleStatus = (id: string, type: string) => {
    switch (type) {
      case 'tipos':
        setTiposServico(prev => prev.map(item => 
          item.id === id ? { ...item, ativo: !item.ativo } : item
        ));
        break;
      case 'categorias':
        setCategorias(prev => prev.map(item => 
          item.id === id ? { ...item, ativo: !item.ativo } : item
        ));
        break;
      case 'responsaveis':
        setResponsaveis(prev => prev.map(item => 
          item.id === id ? { ...item, ativo: !item.ativo } : item
        ));
        break;
    }
  };

  const deleteItem = (id: string, type: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
    
    switch (type) {
      case 'tipos':
        setTiposServico(prev => prev.filter(item => item.id !== id));
        break;
      case 'categorias':
        setCategorias(prev => prev.filter(item => item.id !== id));
        break;
      case 'responsaveis':
        setResponsaveis(prev => prev.filter(item => item.id !== id));
        break;
    }
  };

  const addNew = (type: string) => {
    const newId = Date.now().toString();
    
    switch (type) {
      case 'tipos':
        const newTipo: TipoServico = {
          id: newId,
          nome: 'Novo Tipo de Serviço',
          descricao: 'Descrição do serviço',
          ativo: true
        };
        setTiposServico(prev => [...prev, newTipo]);
        startEdit(newTipo, 'tipo');
        break;
      case 'categorias':
        const newCategoria: Categoria = {
          id: newId,
          nome: 'Nova Categoria',
          cor: '#3B82F6',
          ativo: true
        };
        setCategorias(prev => [...prev, newCategoria]);
        startEdit(newCategoria, 'categoria');
        break;
      case 'responsaveis':
        const newResponsavel: Responsavel = {
          id: newId,
          nome: 'Novo Responsável',
          cargo: 'Cargo',
          telefone: '(00) 00000-0000',
          ativo: true
        };
        setResponsaveis(prev => [...prev, newResponsavel]);
        startEdit(newResponsavel, 'responsavel');
        break;
    }
  };

  const renderTiposServico = () => (
    <div className="space-y-4">
      {tiposServico.map((tipo) => (
        <div key={tipo.id} className="bg-gray-50 rounded-lg p-4">
          {editingItem === `tipo-${tipo.id}` ? (
            <div className="space-y-3">
              <input
                type="text"
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do tipo de serviço"
              />
              <textarea
                value={formData.descricao || ''}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descrição do serviço"
                rows={2}
              />
              <div className="flex items-center space-x-2">
                <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={cancelEdit} className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{tipo.nome}</h3>
                <p className="text-sm text-gray-600 mt-1">{tipo.descricao}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tipo.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tipo.ativo ? 'Ativo' : 'Inativo'}
                </span>
                <button 
                  onClick={() => toggleStatus(tipo.id, 'tipos')}
                  className="text-gray-400 hover:text-blue-600"
                >
                  {tipo.ativo ? '🟢' : '🔴'}
                </button>
                <button onClick={() => startEdit(tipo, 'tipo')} className="text-gray-400 hover:text-blue-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => deleteItem(tipo.id, 'tipos')} className="text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCategorias = () => (
    <div className="space-y-4">
      {categorias.map((categoria) => (
        <div key={categoria.id} className="bg-gray-50 rounded-lg p-4">
          {editingItem === `categoria-${categoria.id}` ? (
            <div className="space-y-3">
              <input
                type="text"
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nome da categoria"
              />
              <input
                type="color"
                value={formData.cor || '#3B82F6'}
                onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                className="w-16 h-10 border border-gray-300 rounded-lg"
              />
              <div className="flex items-center space-x-2">
                <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={cancelEdit} className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: categoria.cor }}
                />
                <div>
                  <h3 className="font-medium text-gray-900">{categoria.nome}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  categoria.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {categoria.ativo ? 'Ativo' : 'Inativo'}
                </span>
                <button 
                  onClick={() => toggleStatus(categoria.id, 'categorias')}
                  className="text-gray-400 hover:text-blue-600"
                >
                  {categoria.ativo ? '🟢' : '🔴'}
                </button>
                <button onClick={() => startEdit(categoria, 'categoria')} className="text-gray-400 hover:text-blue-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => deleteItem(categoria.id, 'categorias')} className="text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderResponsaveis = () => (
    <div className="space-y-4">
      {responsaveis.map((responsavel) => (
        <div key={responsavel.id} className="bg-gray-50 rounded-lg p-4">
          {editingItem === `responsavel-${responsavel.id}` ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nome completo"
              />
              <input
                type="text"
                value={formData.cargo || ''}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Cargo"
              />
              <input
                type="tel"
                value={formData.telefone || ''}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Telefone"
              />
              <div className="flex items-center space-x-2">
                <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={cancelEdit} className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{responsavel.nome}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <p>{responsavel.cargo}</p>
                  <p>{responsavel.telefone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  responsavel.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {responsavel.ativo ? 'Ativo' : 'Inativo'}
                </span>
                <button 
                  onClick={() => toggleStatus(responsavel.id, 'responsaveis')}
                  className="text-gray-400 hover:text-blue-600"
                >
                  {responsavel.ativo ? '🟢' : '🔴'}
                </button>
                <button onClick={() => startEdit(responsavel, 'responsavel')} className="text-gray-400 hover:text-blue-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => deleteItem(responsavel.id, 'responsaveis')} className="text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie tipos de serviço, categorias e responsáveis</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <button 
              onClick={() => addNew(activeTab)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Adicionar</span>
            </button>
          </div>

          {activeTab === 'tipos' && renderTiposServico()}
          {activeTab === 'categorias' && renderCategorias()}
          {activeTab === 'responsaveis' && renderResponsaveis()}
        </div>
      </div>
    </div>
  );
}