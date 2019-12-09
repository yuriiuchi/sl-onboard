import { ProdutoSku } from './produto-sku.entity';

export class ProdutoSkuAlterar {

    descricao: string;
    quantidadeUnidadesProduto: string;
    codigosBarras: Array<string>;

  constructor(
    produtoSku: ProdutoSku
  ) {

    this.descricao = produtoSku.descricao;
    this.quantidadeUnidadesProduto = produtoSku.quantidadeUnidadesProduto;
    this.codigosBarras = produtoSku.codigosBarras;
  }
}
