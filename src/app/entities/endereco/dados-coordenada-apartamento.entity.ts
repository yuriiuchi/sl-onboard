import { DadosCoordenada } from './dados-coordenada.entity';
import { EstruturaFisicaConfiguracao } from './../../entidades/estrutura-fisica-configuracao.entity';

export class DadosCoordenadaApartamento extends DadosCoordenada {

  configuracao: EstruturaFisicaConfiguracao;

  constructor(
    valorInicial: string | number,
    valorFinal: string | number,
    configuracao: EstruturaFisicaConfiguracao
  ) {
    super(valorInicial, valorFinal);
    this.configuracao = configuracao;
  }

}
