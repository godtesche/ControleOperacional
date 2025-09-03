import { Cliente, TipoServico, Categoria, Responsavel, Veiculo, Tarefa } from '../types';

export const mockClientes: Cliente[] = [
  {
    id: '1',
    nome: 'Construtora Silva & Associados',
    telefone: '(11) 99999-1111',
    endereco: 'Rua das Obras, 123 - São Paulo/SP',
    tipo: 'cliente',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    nome: 'Demolidora ABC',
    telefone: '(11) 88888-2222',
    endereco: 'Av. Industrial, 456 - São Paulo/SP',
    tipo: 'cliente',
    createdAt: new Date('2024-02-01')
  }
];

export const mockTiposServico: TipoServico[] = [
  {
    id: '1',
    nome: 'Entrega de Caçamba',
    descricao: 'Entrega de caçamba no local especificado',
    ativo: true
  },
  {
    id: '2',
    nome: 'Recolhimento de Caçamba',
    descricao: 'Recolhimento de caçamba cheia',
    ativo: true
  },
  {
    id: '3',
    nome: 'Transporte Especial',
    descricao: 'Transporte de materiais específicos',
    ativo: true
  }
];

export const mockCategorias: Categoria[] = [
  {
    id: '1',
    nome: 'Operacional',
    cor: '#3B82F6',
    ativo: true
  },
  {
    id: '2',
    nome: 'Administrativo',
    cor: '#10B981',
    ativo: true
  },
  {
    id: '3',
    nome: 'Manutenção',
    cor: '#F59E0B',
    ativo: true
  }
];

export const mockResponsaveis: Responsavel[] = [
  {
    id: '1',
    nome: 'João Silva',
    cargo: 'Motorista',
    telefone: '(11) 97777-1111',
    ativo: true
  },
  {
    id: '2',
    nome: 'Pedro Santos',
    cargo: 'Motorista',
    telefone: '(11) 96666-2222',
    ativo: true
  },
  {
    id: '3',
    nome: 'Ana Costa',
    cargo: 'Coordenadora',
    telefone: '(11) 95555-3333',
    ativo: true
  }
];

export const mockVeiculos: Veiculo[] = [
  {
    id: '1',
    placa: 'ABC-1234',
    tipo: 'Caminhão Poliguindaste',
    capacidade: '5m³',
    ativo: true
  },
  {
    id: '2',
    placa: 'DEF-5678',
    tipo: 'Caminhão Poliguindaste',
    capacidade: '7m³',
    ativo: true
  }
];

export const mockTarefas: Tarefa[] = [
  {
    id: '1',
    titulo: 'Entrega de caçamba - Obra Centro',
    descricao: 'Entrega de caçamba 5m³ para remoção de entulhos',
    dataInicio: new Date('2024-12-10'),
    horaInicio: '08:00',
    status: 'concluida',
    responsavelId: '1',
    tipoServicoId: '1',
    categoriaId: '1',
    clienteId: '1',
    veiculoId: '1',
    endereco: 'Rua das Obras, 123 - São Paulo/SP',
    dataFim: new Date('2024-12-10'),
    horaFim: '09:30'
  },
  {
    id: '2',
    titulo: 'Recolhimento urgente',
    descricao: 'Recolhimento de caçamba cheia no canteiro de obras',
    dataInicio: new Date('2024-12-10'),
    horaInicio: '14:00',
    status: 'em_andamento',
    responsavelId: '2',
    tipoServicoId: '2',
    categoriaId: '1',
    clienteId: '2',
    veiculoId: '2',
    endereco: 'Av. Industrial, 456 - São Paulo/SP'
  }
];