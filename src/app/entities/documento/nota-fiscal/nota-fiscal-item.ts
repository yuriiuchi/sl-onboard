import { SituacaoSaldoEnum } from '../situacao-saldo-enum';

export class NotaFiscalItemProduto {
  constructor(
    public readonly id: string,
    public readonly codigo: string,
    public readonly descricao: string
  ) {}
}

export class NotaFiscalItemTipoEstoque {
  constructor(
    public readonly id: string,
    public readonly descricao: string
  ) {}
}

export class NotaFiscalItem {
  constructor(
    public sequencia: number,
    public produto: NotaFiscalItemProduto,
    public unidadeMedida: string,
    public quantidade: number = 0,
    public valorUnitario: number = 0,
    public valorTotal: number = 0,
    public situacaoSaldo: SituacaoSaldoEnum,
    public tipoEstoque?: NotaFiscalItemTipoEstoque
  ) {}

  public get produtoId() {
    return this.produto ? this.produto.id : null;
  }

  public get produtoCodigo() {
    return this.produto ? this.produto.codigo : null;
  }

  public get produtoDescricao() {
    return this.produto ? this.produto.descricao : null;
  }

  public get tipoEstoqueId() {
    return this.tipoEstoque ? this.tipoEstoque.id : null;
  }

  public get tipoEstoqueDescricao() {
    return this.tipoEstoque ? this.tipoEstoque.descricao : null;
  }

  public get unidadeMedidaDescricao() {
    return this.unidadeMedida ? this.unidadeMedida : null;
  }
}
