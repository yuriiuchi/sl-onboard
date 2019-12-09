import { DadosCoordenada } from './dados-coordenada.entity';
import { EstruturaFisicaConfiguracao } from './../../entidades/estrutura-fisica-configuracao.entity';

export class DadosCoordenadaBlocoRua extends DadosCoordenada {

  configuracao: EstruturaFisicaConfiguracao;
  prefixo?: string;

  constructor(
    valorInicial: string | number,
    valorFinal: string | number,
    configuracao: EstruturaFisicaConfiguracao,
    prefixo: string
  ) {
    super(valorInicial, valorFinal);
    this.configuracao = configuracao;
    this.prefixo = prefixo;
  }
}
