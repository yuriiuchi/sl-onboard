import { SituacaoDocumentoProcesso } from '../situacao-documento-processo-enum';

export interface IDocumentoExpedicaoPessoa {
  id?: string;
  nome: string;
  documentoIdentificacao: string;
  pessoaFisica: boolean;
}

export interface IDocumentoExpedicaoItemProduto {
  id: string;
  codigo: string;
  descricaoInterna: string;
  unidadeMedida: string;
}

export interface IDocumentoExpedicaoItem {
  id: string;
  origemId: string;
  sequencia: string;
  produto: IDocumentoExpedicaoItemProduto;
  tipoEstoqueId: string;
  tipoEstoqueDescricao: string;
  quantidade: number;
}

export interface IDocumentoExpedicao {
  id: string;
  unidadeId: string;
  identificadorDocumento: string;
  dataEmissao: string;
  dataPrevistaSaida: string;
  quantidadeVolumes: string;
  numeroViagem: string;
  depositante: IDocumentoExpedicaoPessoa;
  cliente: IDocumentoExpedicaoPessoa;
  transportadora: IDocumentoExpedicaoPessoa;
  itens: Array<IDocumentoExpedicaoItem>;
  situacaoDocumentoProcesso: SituacaoDocumentoProcesso;
}
