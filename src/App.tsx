import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TarefasList } from './components/Tarefas/TarefasList';
import { ClientesList } from './components/Clientes/ClientesList';
import { VeiculosList } from './components/Veiculos/VeiculosList';
import { AgendaView } from './components/Agenda/AgendaView';
import { RelatoriosView } from './components/Relatorios/RelatoriosView';
import { ConfiguracoesView } from './components/Configuracoes/ConfiguracoesView';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tarefas':
        return <TarefasList />;
      case 'clientes':
        return <ClientesList />;
      case 'veiculos':
        return <VeiculosList />;
      case 'agenda':
        return <AgendaView />;
      case 'relatorios':
        return <RelatoriosView />;
      case 'configuracoes':
        return <ConfiguracoesView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;