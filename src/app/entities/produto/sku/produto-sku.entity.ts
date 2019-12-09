import { IProdutoSku } from './produto-sku.interface';

export class ProdutoSku {

  id?: string;
  descricao: string;
  ativo: boolean;
  produtoId?: string;
  quantidadeUnidadesProduto: string;
  codigosBarras: string[];

  constructor(
    id: string,
    ativo: boolean,
    descricao: string,
    quantidadeUnidadesProduto: string,
    codigosBarras: string[] = [],
    produtoId?: string
  ) {
    this.id = id;
    this.ativo = ativo;
    this.descricao = descricao;
    this.quantidadeUnidadesProduto = quantidadeUnidadesProduto;
    this.codigosBarras = codigosBarras;
    this.produtoId = produtoId;
  }

  static fromDto(dto: IProdutoSku) {

    const codigosBarras = [];

    if (dto.codigosBarras && dto.codigosBarras.length > 0) {
      dto.codigosBarras.forEach(codigoBarras => {
        codigosBarras.push(codigoBarras.codigoBarras);
      });
    }

    return new ProdutoSku(
      dto.id,
      dto.ativo,
      dto.descricao,
      dto.quantidadeUnidadesProduto,
      codigosBarras,
      dto.produtoId
    );
  }

}
