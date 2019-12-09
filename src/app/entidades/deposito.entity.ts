export class Deposito {

  id: string;
  unidadeId: string;
  nome: string;

  constructor(
    id: string,
    unidadeId: string,
    nome: string
  ) {
    this.id = id;
    this.unidadeId = unidadeId;
    this.nome = nome;
  }

  public static vazio(): Deposito {
    return new Deposito(undefined, undefined, '');
  }
}
