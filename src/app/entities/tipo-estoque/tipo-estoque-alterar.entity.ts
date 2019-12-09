import { TipoEstoque } from './tipo-estoque.entity';

export class TipoEstoqueAlterar {

  unidadeId: string;
  descricao: string;

  constructor(
    tipoEstoque: TipoEstoque
  ) {
    this.descricao = tipoEstoque.descricao;
    this.unidadeId = tipoEstoque.unidadeId;
  }
}
