
interface IProcessoExpedicao {
  id: string;
  identificador: string;
  descricao: string;
}

interface IDocumentoExpedicao {
  id: string;
  identificadorDocumento: string;
  destinatarioFormatado: string;
  depositanteFormatado?: string;
  transportadoraFormatado?: string;
}

export interface ISelecaoEstoqueRouterState {
  expedicao: IProcessoExpedicao;
  documento?: IDocumentoExpedicao;
}
