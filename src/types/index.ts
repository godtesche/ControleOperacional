export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  tipo: 'cliente' | 'fornecedor';
  createdAt: Date;
}

export interface TipoServico {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
}

export interface Categoria {
  id: string;
  nome: string;
  cor: string;
  ativo: boolean;
}

export interface Responsavel {
  id: string;
  nome: string;
  cargo: string;
  telefone: string;
  ativo: boolean;
}

export interface Veiculo {
  id: string;
  placa: string;
  tipo: string;
  capacidade: string;
  ativo: boolean;
}

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  horaInicio: string;
  dataFim?: Date;
  horaFim?: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  responsavelId: string;
  tipoServicoId: string;
  categoriaId: string;
  clienteId: string;
  veiculoId?: string;
  endereco: string;
  observacoes?: string;
}

export interface RelatorioItem {
  periodo: string;
  responsavel: string;
  quantidadeServicos: number;
  tempoMedio: number;
  clientesAtendidos: number;
}