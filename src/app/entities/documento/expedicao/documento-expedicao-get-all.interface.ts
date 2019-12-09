import { SituacaoDocumentoProcesso } from '../situacao-documento-processo-enum';

export interface IDocumentoExpedicaoListar {
  id: string;
  identificadorDocumento: string;
  dataEmissao: Date;
  depositanteDocumentoIdentificacao: string;
  depositanteNome: string;
  depositantePessoFisica: boolean;
  destinatarioDocumentoIdentificacao: string;
  destinatarioNome: string;
  destinatarioPessoFisica: boolean;
  transportadoraDocumentoIdentificacao: string;
  transportadoraNome: string;
  transportadoraPessoFisica: boolean;
  situacaoDocumentoProcesso: SituacaoDocumentoProcesso;
}
