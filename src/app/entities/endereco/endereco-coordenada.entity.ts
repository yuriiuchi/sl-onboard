export class EnderecoCoordenada {

  prefixo?: string;
  valor: string;

  get valorApresentacao() {
    return `${(this.prefixo) ? this.prefixo : ''}${this.valor}`;
  }

  public static comPrefixo(valor: string, prefixo: string) {
    return new EnderecoCoordenada(valor.toUpperCase(), prefixo.toUpperCase());
  }

  public static semPrefixo(valor: string) {
    return new EnderecoCoordenada(valor.toUpperCase());
  }

  protected constructor(valor: string, prefixo?: string) {
    this.valor = valor;
    this.prefixo = prefixo;
  }
}
