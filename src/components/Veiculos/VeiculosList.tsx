import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Truck, 
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { Veiculo } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockVeiculos } from '../../data/mockData';

export function VeiculosList() {
  const [veiculos, setVeiculos] = useLocalStorage<Veiculo[]>('veiculos', mockVeiculos);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVeiculos = veiculos.filter(veiculo => {
    const matchesSearch = veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         veiculo.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         veiculo.capacidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'ativo' && veiculo.ativo) ||
                         (statusFilter === 'inativo' && !veiculo.ativo);
    return matchesSearch && matchesStatus;
  });

  const toggleVeiculoStatus = (id: string) => {
    setVeiculos(prev => prev.map(veiculo => 
      veiculo.id === id ? { ...veiculo, ativo: !veiculo.ativo } : veiculo
    ));
  };

  const deleteVeiculo = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
      setVeiculos(prev => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Veículos</h1>
          <p className="text-gray-600 mt-1">Controle sua frota de veículos</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Veículo</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Veículos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{veiculos.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Veículos Ativos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {veiculos.filter(v => v.ativo).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Manutenção</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {veiculos.filter(v => !v.ativo).length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilizados Hoje</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
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
              placeholder="Buscar por placa, tipo ou capacidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVeiculos.map((veiculo) => (
          <div key={veiculo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    veiculo.ativo ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <Truck className={`h-6 w-6 ${
                      veiculo.ativo ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{veiculo.placa}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      veiculo.ativo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {veiculo.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => toggleVeiculoStatus(veiculo.id)}
                    className={`p-1 transition-colors ${
                      veiculo.ativo 
                        ? 'text-gray-400 hover:text-red-600' 
                        : 'text-gray-400 hover:text-green-600'
                    }`}
                  >
                    {veiculo.ativo ? 
                      <AlertTriangle className="h-4 w-4" /> : 
                      <CheckCircle className="h-4 w-4" />
                    }
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteVeiculo(veiculo.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Tipo de Veículo</p>
                  <p className="text-gray-900 font-medium">{veiculo.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Capacidade</p>
                  <p className="text-gray-900 font-medium">{veiculo.capacidade}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Serviços hoje:</span>
                    <span className="font-medium text-gray-900">3</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Última utilização:</span>
                    <span className="text-gray-600">Hoje, 14:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVeiculos.length === 0 && (
        <div className="text-center py-12">
          <Truck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum veículo encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Tente ajustar os filtros de busca.' 
              : 'Comece cadastrando um novo veículo.'}
          </p>
        </div>
      )}
    </div>
  );
}