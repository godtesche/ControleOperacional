import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Edit,
  Trash2,
  MapPin,
  User,
  Calendar
} from 'lucide-react';
import { Tarefa } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockTarefas, mockClientes, mockResponsaveis, mockVeiculos, mockTiposServico, mockCategorias } from '../../data/mockData';

export function TarefasList() {
  const [tarefas, setTarefas] = useLocalStorage<Tarefa[]>('tarefas', mockTarefas);
  const [clientes] = useLocalStorage('clientes', mockClientes);
  const [responsaveis] = useLocalStorage('responsaveis', mockResponsaveis);
  const [veiculos] = useLocalStorage('veiculos', mockVeiculos);
  const [tiposServico] = useLocalStorage('tiposServico', mockTiposServico);
  const [categorias] = useLocalStorage('categorias', mockCategorias);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTarefas = tarefas.filter(tarefa => {
    const matchesSearch = tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tarefa.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tarefa.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getClienteName = (id: string) => 
    clientes.find(c => c.id === id)?.nome || 'Cliente não encontrado';

  const getResponsavelName = (id: string) => 
    responsaveis.find(r => r.id === id)?.nome || 'Responsável não encontrado';

  const getVeiculoPlaca = (id?: string) => 
    id ? veiculos.find(v => v.id === id)?.placa || 'N/A' : 'N/A';

  const getTipoServicoName = (id: string) =>
    tiposServico.find(t => t.id === id)?.nome || 'Tipo não encontrado';

  const getCategoriaInfo = (id: string) =>
    categorias.find(c => c.id === id) || { nome: 'Categoria não encontrada', cor: '#gray-500' };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'em_andamento': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pendente': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      concluida: 'bg-green-100 text-green-800 border-green-200',
      em_andamento: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pendente: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const labels = {
      concluida: 'Concluída',
      em_andamento: 'Em Andamento',
      pendente: 'Pendente'
    };

    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const updateTarefaStatus = (id: string, newStatus: 'pendente' | 'em_andamento' | 'concluida') => {
    setTarefas(prev => prev.map(tarefa => {
      if (tarefa.id === id) {
        const updatedTarefa = { ...tarefa, status: newStatus };
        
        // Atualizar horário de conclusão automaticamente
        if (newStatus === 'concluida' && !tarefa.dataFim) {
          updatedTarefa.dataFim = new Date();
          updatedTarefa.horaFim = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
        }
        
        return updatedTarefa;
      }
      return tarefa;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Tarefas</h1>
          <p className="text-gray-600 mt-1">Acompanhe todas as atividades operacionais</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Tarefa</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tarefas..."
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
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="space-y-4">
        {filteredTarefas.map((tarefa) => {
          const categoria = getCategoriaInfo(tarefa.categoriaId);
          return (
            <div key={tarefa.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getStatusIcon(tarefa.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{tarefa.titulo}</h3>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: categoria.cor }}
                        title={categoria.nome}
                      />
                    </div>
                    
                    <p className="text-gray-600 mb-4">{tarefa.descricao}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{getResponsavelName(tarefa.responsavelId)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {tarefa.dataInicio.toLocaleDateString('pt-BR')} às {tarefa.horaInicio}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 truncate">{tarefa.endereco}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Veículo:</span>
                        <span className="text-gray-600">{getVeiculoPlaca(tarefa.veiculoId)}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {getTipoServicoName(tarefa.tipoServicoId)}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {getClienteName(tarefa.clienteId)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(tarefa.status)}
                    
                    <div className="flex items-center space-x-2">
                      {tarefa.status !== 'concluida' && (
                        <select
                          value={tarefa.status}
                          onChange={(e) => updateTarefaStatus(tarefa.id, e.target.value as any)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="pendente">Pendente</option>
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluida">Concluir</option>
                        </select>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {tarefa.observacoes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Observações: </span>
                      {tarefa.observacoes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTarefas.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma tarefa encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Tente ajustar os filtros de busca.' 
              : 'Comece criando uma nova tarefa.'}
          </p>
        </div>
      )}
    </div>
  );
}