import { Produto } from './produto.entity';

export class ProdutoAlterar {

    codigo: string;
    unidadesId: string[];
    depositanteId?: string;
    unidadeMedida?: string;
    descricaoComercial: string;
    descricaoInterna: string;

  constructor(
    produto: Produto
  ) {
    this.codigo = produto.codigo;
    this.unidadesId = produto.unidadesId;
    this.depositanteId = produto.depositanteId;
    this.unidadeMedida = produto.unidadeMedida;
    this.descricaoComercial = produto.descricaoComercial;
    this.descricaoInterna = produto.descricaoInterna;
  }
}
