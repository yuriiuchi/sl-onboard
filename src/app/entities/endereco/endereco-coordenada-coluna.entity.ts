import { EnderecoCoordenadaColunaOrientacao } from './endereco-coordenada-coluna-orientacao.type';
import { EnderecoCoordenada } from './endereco-coordenada.entity';

export class EnderecoCoordenadaColuna extends EnderecoCoordenada {

  orientacao?: EnderecoCoordenadaColunaOrientacao;

  public static semConfiguracaoLado(valor: string) {
    return new EnderecoCoordenadaColuna(valor);
  }

  public static ladoEsquerdo(valor: string, prefixo?: string) {
    return new EnderecoCoordenadaColuna(valor, prefixo, 'LADO_ESQUERDO');
  }

  public static ladoDireito(valor: string, prefixo?: string) {
    return new EnderecoCoordenadaColuna(valor, prefixo, 'LADO_DIREITO');
  }

  private constructor(valor: string, prefixo?: string, orientacao?: EnderecoCoordenadaColunaOrientacao) {
    super(valor, prefixo);
    this.orientacao = orientacao;
  }
}
