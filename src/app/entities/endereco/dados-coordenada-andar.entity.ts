import { DadosCoordenada } from './dados-coordenada.entity';
import { EstruturaFisicaConfiguracao } from './../../entidades/estrutura-fisica-configuracao.entity';

export class DadosCoordenadaAndar extends DadosCoordenada {

  configuracao: EstruturaFisicaConfiguracao;
  acessiveisAMao?: string[];

  constructor(
    valorInicial: number,
    valorFinal: number,
    configuracao: EstruturaFisicaConfiguracao,
    acessiveisAMao?: string[]) {
    super(valorInicial, valorFinal);
    this.configuracao = configuracao;
    this.acessiveisAMao = acessiveisAMao;
  }
}
