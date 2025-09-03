import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Users, 
  Truck,
  TrendingUp,
  Clock,
  Package,
  Filter
} from 'lucide-react';
import { RelatorioItem } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockTarefas, mockResponsaveis, mockClientes } from '../../data/mockData';

export function RelatoriosView() {
  const [tarefas] = useLocalStorage('tarefas', mockTarefas);
  const [responsaveis] = useLocalStorage('responsaveis', mockResponsaveis);
  const [clientes] = useLocalStorage('clientes', mockClientes);
  
  const [periodo, setPeriodo] = useState('semana');
  const [tipoRelatorio, setTipoRelatorio] = useState('produtividade');

  const generateProdutividadeData = (): RelatorioItem[] => {
    return responsaveis.map(resp => {
      const tarefasResp = tarefas.filter(t => t.responsavelId === resp.id);
      const tarefasConcluidas = tarefasResp.filter(t => t.status === 'concluida');
      
      // Calcular tempo médio (exemplo)
      const tempoMedio = tarefasConcluidas.length > 0 
        ? Math.round(Math.random() * 4 + 2) // Simulado: 2-6 horas
        : 0;
      
      const clientesAtendidos = new Set(tarefasResp.map(t => t.clienteId)).size;
      
      return {
        periodo: periodo,
        responsavel: resp.nome,
        quantidadeServicos: tarefasConcluidas.length,
        tempoMedio,
        clientesAtendidos
      };
    });
  };

  const produtividadeData = generateProdutividadeData();
  
  const totalServicos = tarefas.filter(t => t.status === 'concluida').length;
  const tempoMedioGeral = produtividadeData.length > 0 
    ? Math.round(produtividadeData.reduce((acc, item) => acc + item.tempoMedio, 0) / produtividadeData.length)
    : 0;
  const clientesTotais = new Set(tarefas.map(t => t.clienteId)).size;
  const eficienciaMedia = tarefas.length > 0 
    ? Math.round((totalServicos / tarefas.length) * 100)
    : 0;

  const exportarRelatorio = (formato: 'excel' | 'pdf') => {
    // Simular exportação
    alert(`Exportando relatório em formato ${formato.toUpperCase()}...`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios & Indicadores</h1>
          <p className="text-gray-600 mt-1">Análise de produtividade e desempenho operacional</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => exportarRelatorio('excel')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Excel</span>
          </button>
          <button 
            onClick={() => exportarRelatorio('pdf')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Período:</label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dia">Hoje</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="trimestre">Trimestre</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Tipo:</label>
            <select
              value={tipoRelatorio}
              onChange={(e) => setTipoRelatorio(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="produtividade">Produtividade</option>
              <option value="clientes">Clientes</option>
              <option value="veiculos">Veículos</option>
              <option value="servicos">Tipos de Serviço</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Serviços</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalServicos}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+12% vs período anterior</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{tempoMedioGeral}h</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">-8% vs período anterior</span>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes Atendidos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{clientesTotais}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+5 novos clientes</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eficiência</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{eficienciaMedia}%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+3% vs período anterior</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Productivity Report */}
      {tipoRelatorio === 'produtividade' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Relatório de Produtividade por Funcionário</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Responsável
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviços Executados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tempo Médio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clientes Atendidos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtividadeData.map((item, index) => {
                  const performance = item.quantidadeServicos > 0 
                    ? Math.min(100, (item.quantidadeServicos / Math.max(...produtividadeData.map(p => p.quantidadeServicos))) * 100)
                    : 0;
                    
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{item.responsavel}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantidadeServicos}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.tempoMedio}h</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.clientesAtendidos}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{Math.round(performance)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Gráfico de Desempenho</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Gráfico interativo será implementado</p>
            <p className="text-xs text-gray-500">Dados atualizados em tempo real</p>
          </div>
        </div>
      </div>
    </div>
  );
}