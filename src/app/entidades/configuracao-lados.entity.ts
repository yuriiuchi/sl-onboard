import { IEstruturaFisicaConfiguracaoColuna } from './estrutura-fisica-configuracao-coluna.interface';
import { ConfiguracaoLado } from './configuracao-lado.entity';

export class ConfiguracaoLados {

  ladoDireito: ConfiguracaoLado;
  ladoEsquerdo: ConfiguracaoLado;

  constructor(configuracaoLados: IEstruturaFisicaConfiguracaoColuna) {
    this.ladoDireito = (configuracaoLados.ladoDireito) ? new ConfiguracaoLado(configuracaoLados.ladoDireito) : undefined;
    this.ladoEsquerdo = (configuracaoLados.ladoEsquerdo) ? new ConfiguracaoLado(configuracaoLados.ladoEsquerdo) : undefined;
  }
}
