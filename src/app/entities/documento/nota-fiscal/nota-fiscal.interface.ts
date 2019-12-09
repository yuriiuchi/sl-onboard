export interface INotaFiscal {
    numero: number;
    serie: string;
    chaveNFe?: string;
    dataEmissao: Date;
    dataEntrada: Date;
    quantidadeVolumes?: number;
    naturezaOperacao?: string;
    emitente: INotaFiscalEmitente;
    destinatario: INotaFiscalDestinatario;
    transportadora?: INotaFiscalTransportadora;
    enderecoEntrega?: INotaFiscalEndereco;
    itens: Array<INotaFiscalItem>;
}

export interface INotaFiscalItem {
  sequencia: number;
  codigo: string;
  descricao: string;
  unidadeMedida: string;
  CFOP?: string;
  valorUnitario: number;
  valorTotal: number;
  quantidade: number;
}

export interface INotaFiscalEmitente {
    nome: string;
    documentoIdentificacao: string;
    inscricaoEstadual: string;
    unidadeFederativa: string;
    endereco?: INotaFiscalEndereco;
}

export interface INotaFiscalDestinatario {
    nome: string;
    documentoIdentificacao: string;
    inscricaoEstadual: string;
    unidadeFederativa: string;
    endereco?: INotaFiscalEndereco;
}

export interface INotaFiscalEndereco {
  CEP?: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade: string;
  unidadeFederativa: string;
  cidadeIBGE?: string;
  estadoIBGE?: string;
  pais?: string;
}

export interface INotaFiscalTransportadora {
  nome: string;
  documentoIdentificacao: string;
  inscricaoEstadual: string;
  unidadeFederativa: string;
  endereco?: INotaFiscalEndereco;
}
