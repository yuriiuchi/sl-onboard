import { IEstruturaFisicaConfiguracaoColuna } from './estrutura-fisica-configuracao-coluna.interface';
import { ConfiguracaoLados } from './configuracao-lados.entity';
import { EstruturaFisicaConfiguracao } from './estrutura-fisica-configuracao.entity';

export class EstruturaFisicaConfiguracaoColuna extends EstruturaFisicaConfiguracao {

  configuracaoLados: ConfiguracaoLados;

  get tipoLadoDireito(): string {
    if (
      this.configuracaoLados &&
      this.configuracaoLados.ladoDireito &&
      this.configuracaoLados.ladoDireito.tipoNumeracaoColuna
    ) {
      return this.configuracaoLados.ladoDireito.tipoNumeracaoColuna.value;
    } else {
      return undefined;
    }
  }

  get tipoLadoEsquerdo(): string {
    if (
      this.configuracaoLados &&
      this.configuracaoLados.ladoEsquerdo &&
      this.configuracaoLados.ladoEsquerdo.tipoNumeracaoColuna
    ) {
      return this.configuracaoLados.ladoEsquerdo.tipoNumeracaoColuna.value;
    } else {
      return undefined;
    }
  }

  get prefixoLadoEsquerdo(): string {
    if (
      this.configuracaoLados &&
      this.configuracaoLados.ladoEsquerdo &&
      this.configuracaoLados.ladoEsquerdo.prefixo &&
      this.configuracaoLados.ladoEsquerdo.prefixo.trim() !== ''
    ) {
      return this.configuracaoLados.ladoEsquerdo.prefixo;
    } else {
      return undefined;
    }
  }

  get prefixoLadoDireito(): string {
    if (
      this.configuracaoLados &&
      this.configuracaoLados.ladoDireito &&
      this.configuracaoLados.ladoDireito.prefixo &&
      this.configuracaoLados.ladoDireito.prefixo.trim() !== ''
    ) {
      return this.configuracaoLados.ladoDireito.prefixo;
    } else {
      return undefined;
    }
  }

  constructor(label: string, estruturaFisicaConfiguracaoColuna: IEstruturaFisicaConfiguracaoColuna) {
    super(label, estruturaFisicaConfiguracaoColuna);
    this.configuracaoLados = (
      estruturaFisicaConfiguracaoColuna.ladoDireito ||
      estruturaFisicaConfiguracaoColuna.ladoEsquerdo
    ) ?
      new ConfiguracaoLados(estruturaFisicaConfiguracaoColuna) :
      undefined;
  }
}
