import React from 'react';
import { 
  Truck, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Package,
  MapPin,
  Activity
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Tarefas Hoje',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Caçambas Ativas',
      value: '28',
      change: '+5',
      changeType: 'positive',
      icon: Package,
      color: 'green'
    },
    {
      title: 'Veículos em Rota',
      value: '8',
      change: '0',
      changeType: 'neutral',
      icon: Truck,
      color: 'yellow'
    },
    {
      title: 'Clientes Ativos',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    }
  ];

  const recentTasks = [
    { 
      id: '1', 
      title: 'Entrega - Obra Centro', 
      cliente: 'Construtora Silva', 
      status: 'concluida', 
      tempo: '2h 30min',
      responsavel: 'João Silva',
      veiculo: 'ABC-1234'
    },
    { 
      id: '2', 
      title: 'Recolhimento Urgente', 
      cliente: 'Demolidora ABC', 
      status: 'em_andamento', 
      tempo: '1h 15min',
      responsavel: 'Pedro Santos',
      veiculo: 'DEF-5678'
    },
    { 
      id: '3', 
      title: 'Transporte Especial', 
      cliente: 'Metalúrgica XYZ', 
      status: 'pendente', 
      tempo: '-',
      responsavel: 'Ana Costa',
      veiculo: 'GHI-9012'
    }
  ];

  const productivity = [
    { responsavel: 'João Silva', servicos: 15, eficiencia: '95%' },
    { responsavel: 'Pedro Santos', servicos: 12, eficiencia: '88%' },
    { responsavel: 'Ana Costa', servicos: 8, eficiencia: '92%' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'em_andamento': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pendente': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      concluida: 'bg-green-100 text-green-800',
      em_andamento: 'bg-yellow-100 text-yellow-800',
      pendente: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      concluida: 'Concluída',
      em_andamento: 'Em Andamento',
      pendente: 'Pendente'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral das operações hoje</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Nova Tarefa</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`h-3 w-3 mr-1 ${
                      stat.changeType === 'positive' ? 'text-green-500' : 
                      stat.changeType === 'negative' ? 'text-red-500' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change} hoje
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tarefas Recentes</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todas
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(task.status)}
                    <div>
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.cliente}</p>
                      <p className="text-xs text-gray-500 mt-1">Responsável: {task.responsavel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(task.status)}
                    <p className="text-xs text-gray-500 mt-1">Tempo: {task.tempo}</p>
                    <p className="text-xs text-gray-500">Veículo: {task.veiculo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Productivity Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Produtividade Semanal</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {productivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.responsavel}</p>
                    <p className="text-sm text-gray-600">{item.servicos} serviços</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{item.eficiencia}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: item.eficiencia }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
            <Calendar className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Nova Tarefa</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all">
            <Users className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Novo Cliente</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all">
            <Truck className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Cadastrar Veículo</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all">
            <Activity className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Ver Relatórios</span>
          </button>
        </div>
      </div>
    </div>
  );
}