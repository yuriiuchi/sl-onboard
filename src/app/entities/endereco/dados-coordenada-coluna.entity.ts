import { DadosCoordenada } from './dados-coordenada.entity';
import { EstruturaFisicaConfiguracaoColuna } from './../../entidades/estrutura-fisica-configuracao-coluna.entity';

export class DadosCoordenadaColuna extends DadosCoordenada {

  configuracao: EstruturaFisicaConfiguracaoColuna;
  esquerda?: boolean;
  direita?: boolean;

  constructor(
    valorInicial: string | number,
    valorFinal: string | number,
    configuracao: EstruturaFisicaConfiguracaoColuna,
    esquerda: boolean,
    direita: boolean
  ) {
    super(valorInicial, valorFinal);
    this.configuracao = configuracao;
    this.esquerda = esquerda;
    this.direita = direita;
  }
}
