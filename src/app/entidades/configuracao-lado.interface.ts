import { TipoNumeracaoColuna } from './tipo-numeracao-coluna.enum';

export interface IConfiguracaoLado {
  prefixo?: string;
  tipoNumeracaoColuna?: TipoNumeracaoColuna;
}
