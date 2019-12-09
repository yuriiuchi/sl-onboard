export interface ISaldoEstoqueSelecaoListar {
  id: string;
  endereco: {
    id: string;
    descricao: string;
    deposito: {
      id: string;
      descricao: string;
    },
    estruturaFisica: {
      id: string;
      tipo: string;
    }
  };
  sku: {
    id: string;
    descricao: string;
    quantidadeUnidadesProduto: number;
  };
  tipoEstoque: {
    id: string;
    descricao: string;
  };
  unitizador: {
    id: string;
    valor: string;
  };
  saldoDisponivel: number;
  saldoDisponivelSKU: number;
  avariado: boolean;
}

