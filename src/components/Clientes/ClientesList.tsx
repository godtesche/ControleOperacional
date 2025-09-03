import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  MapPin,
  Edit,
  Trash2,
  History,
  User,
  Building
} from 'lucide-react';
import { Cliente } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockClientes } from '../../data/mockData';

export function ClientesList() {
  const [clientes, setClientes] = useLocalStorage<Cliente[]>('clientes', mockClientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState('all');

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.telefone.includes(searchTerm) ||
                         cliente.endereco.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = tipoFilter === 'all' || cliente.tipo === tipoFilter;
    return matchesSearch && matchesTipo;
  });

  const deleteCliente = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes & Fornecedores</h1>
          <p className="text-gray-600 mt-1">Gerencie sua base de clientes e fornecedores</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {clientes.filter(c => c.tipo === 'cliente').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fornecedores</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {clientes.filter(c => c.tipo === 'fornecedor').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Building className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cadastros Este Mês</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Plus className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Tipos</option>
              <option value="cliente">Clientes</option>
              <option value="fornecedor">Fornecedores</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClientes.map((cliente) => (
          <div key={cliente.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    cliente.tipo === 'cliente' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {cliente.tipo === 'cliente' ? 
                      <User className={`h-5 w-5 ${cliente.tipo === 'cliente' ? 'text-blue-600' : 'text-green-600'}`} /> :
                      <Building className={`h-5 w-5 ${cliente.tipo === 'cliente' ? 'text-blue-600' : 'text-green-600'}`} />
                    }
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cliente.nome}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      cliente.tipo === 'cliente' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {cliente.tipo === 'cliente' ? 'Cliente' : 'Fornecedor'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <History className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteCliente(cliente.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{cliente.telefone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{cliente.endereco}</span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Cadastrado em: {cliente.createdAt.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum cliente encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || tipoFilter !== 'all' 
              ? 'Tente ajustar os filtros de busca.' 
              : 'Comece adicionando um novo cliente.'}
          </p>
        </div>
      )}
    </div>
  );
}