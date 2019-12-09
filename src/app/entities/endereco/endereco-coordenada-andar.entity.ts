import { EnderecoCoordenada } from './endereco-coordenada.entity';

export class EnderecoCoordenadaAndar extends EnderecoCoordenada {

  acessivelAMao?: boolean;

  public static acessivelAMao(valor: string) {
    return new EnderecoCoordenadaAndar(valor, true);
  }

  public static naoAcessivelAMao(valor: string) {
    return new EnderecoCoordenadaAndar(valor, false);
  }

  public static padrao(valor: string) {
    return new EnderecoCoordenadaAndar(valor);
  }

  private constructor(valor: string, acessivelAMao?: boolean) {
    super(valor);
    this.acessivelAMao = acessivelAMao;
  }
}
