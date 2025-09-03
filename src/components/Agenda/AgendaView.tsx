import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Plus,
  Clock,
  MapPin,
  User,
  Truck
} from 'lucide-react';
import { Tarefa } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockTarefas, mockClientes, mockResponsaveis, mockVeiculos } from '../../data/mockData';

export function AgendaView() {
  const [tarefas] = useLocalStorage<Tarefa[]>('tarefas', mockTarefas);
  const [clientes] = useLocalStorage('clientes', mockClientes);
  const [responsaveis] = useLocalStorage('responsaveis', mockResponsaveis);
  const [veiculos] = useLocalStorage('veiculos', mockVeiculos);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const getClienteName = (id: string) => 
    clientes.find(c => c.id === id)?.nome || 'Cliente não encontrado';

  const getResponsavelName = (id: string) => 
    responsaveis.find(r => r.id === id)?.nome || 'Responsável não encontrado';

  const getVeiculoPlaca = (id?: string) => 
    id ? veiculos.find(v => v.id === id)?.placa || 'N/A' : 'N/A';

  const getWeekDays = () => {
    const start = new Date(currentDate);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getTasksForDate = (date: Date) => {
    return tarefas.filter(tarefa => {
      const tarefaDate = new Date(tarefa.dataInicio);
      return tarefaDate.toDateString() === date.toDateString();
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'bg-green-100 text-green-800 border-green-200';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pendente': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (view === 'week') {
    const weekDays = getWeekDays();
    
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agenda Semanal</h1>
            <p className="text-gray-600 mt-1">Planejamento de rotas e serviços</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  view === 'week' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  view === 'month' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Mês
              </button>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nova Tarefa</span>
            </button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h2>
              <p className="text-sm text-gray-600">
                {weekDays[0].toLocaleDateString('pt-BR')} - {weekDays[6].toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <button 
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Week Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const dayTasks = getTasksForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className={`p-4 border-b border-gray-100 ${
                  isToday ? 'bg-blue-50' : ''
                }`}>
                  <h3 className={`font-semibold ${
                    isToday ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {day.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                  </h3>
                  <p className={`text-sm ${
                    isToday ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {day.getDate()}
                  </p>
                </div>
                
                <div className="p-4 space-y-2">
                  {dayTasks.map((tarefa) => (
                    <div key={tarefa.id} className={`p-3 rounded-lg border-l-4 ${getStatusColor(tarefa.status)}`}>
                      <h4 className="font-medium text-sm">{tarefa.titulo}</h4>
                      <div className="mt-2 space-y-1 text-xs">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{tarefa.horaInicio}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{getResponsavelName(tarefa.responsavelId)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Truck className="h-3 w-3" />
                          <span>{getVeiculoPlaca(tarefa.veiculoId)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {dayTasks.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">
                      Nenhuma tarefa
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo da Semana</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{tarefas.length}</p>
              <p className="text-sm text-gray-600">Total de Tarefas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {tarefas.filter(t => t.status === 'concluida').length}
              </p>
              <p className="text-sm text-gray-600">Concluídas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {tarefas.filter(t => t.status === 'em_andamento').length}
              </p>
              <p className="text-sm text-gray-600">Em Andamento</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {tarefas.filter(t => t.status === 'pendente').length}
              </p>
              <p className="text-sm text-gray-600">Pendentes</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Vista Mensal em desenvolvimento...</div>;
}