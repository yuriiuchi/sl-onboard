import { IConfiguracaoLado } from './configuracao-lado.interface';
import { TipoNumeracaoColunaEnum } from './tipo-numeracao-coluna.enum';

export class ConfiguracaoLado {

  prefixo: string;
  tipoNumeracaoColuna: TipoNumeracaoColunaEnum;

  constructor(configuracaoLado: IConfiguracaoLado) {
    this.prefixo = configuracaoLado.prefixo;
    this.tipoNumeracaoColuna = TipoNumeracaoColunaEnum.values.find(e => e.value === configuracaoLado.tipoNumeracaoColuna);
  }
}
