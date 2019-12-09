import { ITipoEstoque } from './tipo-estoque.interface';

export class TipoEstoque {

  id?: string;
  unidadeId?: string;
  descricao: string;

  constructor(
    id: string,
    descricao: string,
    unidadeId?: string
  ) {
    this.id = id;
    this.descricao = descricao;
    this.unidadeId = unidadeId;
  }

  static fromDto(dto: ITipoEstoque) {
    return new TipoEstoque(
      dto.id,
      dto.descricao,
      dto.unidadeId
    );
  }
}
