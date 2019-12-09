import { IConfiguracaoLado } from './configuracao-lado.interface';
import { IEstruturaFisicaConfiguracao } from './estrutura-fisica-configuracao.interface';

export interface IEstruturaFisicaConfiguracaoColuna extends IEstruturaFisicaConfiguracao {
  ladoEsquerdo?: IConfiguracaoLado;
  ladoDireito?: IConfiguracaoLado;
}
