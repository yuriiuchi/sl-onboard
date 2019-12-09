export interface IDocumentoExpedicao {
  depositanteId: string;
  dataPrevistaSaida: Date;
  numeroViagem: number;
}

export interface IDocumentoExpedicaoItem {
  sequenciaOrigem: number;
  tipoEstoqueId: string;
}

export interface IDocumentoExpedicaoNotaFiscalIncluir {
  unidadeId: string;
  documentoExpedicao: IDocumentoExpedicao;
  itens: Array<IDocumentoExpedicaoItem>;
  notaFiscal: string;
}
