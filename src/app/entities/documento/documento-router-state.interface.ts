import { TelaOrigem } from './tela-origem-enum';
import { ProcessoDocumento } from './processo-documento-enum';

export interface IDocumentoRouterState {
  tipoProcesso: ProcessoDocumento;
  telaOrigem: TelaOrigem;
}
